import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest) => {
  try {
    // Extract token and parameters from request body
    const body = await req.json();
    const { token, month, year } = body;

    // Check if token, month, or year is missing
    if (!token || !month || !year) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing token, month, or year' }),
        { status: 400 }
      );
    }

    // Initialize response object
    let response = {
      message: 'Failure',
      isAdmin: false,
      userId: 'Dummy',
      userName: 'Name',
      mail: 'abc@gmail.com',
      data: [],
      maxPages: 0
    };

    let userId: string | null = null;
    let isAdmin = false;

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

      // Check token expiration
      if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
        response.message = 'Token expired';
        return new NextResponse(JSON.stringify(response), { status: 401 });
      }

      userId = decoded.userId;
      isAdmin = decoded.isAdmin;
      response.isAdmin = isAdmin; // Update response with isAdmin
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid Token' }),
        { status: 401 }
      );
    }

    try {
      await mssqlconnect(); // Ensure MSSQL connection is correctly established

      // Start a transaction
      const transaction = new sql.Transaction();
      await transaction.begin();

      // Combined SQL query
      const combinedQuery = `
        SELECT 
          c.[TRANS_ID],
          c.[ASSET_ID],
          c.[CARTRIDGE_ID],
          c.[REQUESTED_QTY],
          c.[APPROVED_QTY],
          c.[STATUS_ID],
          c.[REQUESTED_BY],
          c.[REQUESTED_ON],
          c.[APPROVED_BY],
          c.[APPROVED_ON],
          c.[APPROVING_REASON],
          c.[CARTRIDGE_RETURNED],
          u1.[EmployeeName] AS [employeeName],
          u1.[EmpDepartment] AS [department],
          u1.[UserRole] AS [userRole],
          u1.[DESIGNATION] AS [designation],
          u1.[DESIGNATION_NAME] AS [designationName],
          m.[CARTRIDGE_DESC] AS [cartridgeDescription],
          s.[STATUS_DESC] AS [statusDescription],
          u2.[EmployeeName] AS [approvedByName],
          u3.[EmployeeName] AS [requestedByName]
        FROM 
          [IAMS].[dbo].[IAMS_X_CARTRIDGE] c
        INNER JOIN 
          [IAMS].[dbo].[UserMaster] u1 ON c.[REQUESTED_BY] = u1.[EmployeeNumber]
        INNER JOIN 
          [IAMS].[dbo].[IAMS_M_CARTRIDGE] m ON c.[CARTRIDGE_ID] = m.[CARTRIDGE_ID]
        INNER JOIN 
          [IAMS].[dbo].[IAMS_P_ASSET_STATUS] s ON c.[STATUS_ID] = s.[STATUS_ID]
        LEFT JOIN 
          [IAMS].[dbo].[UserMaster] u2 ON c.[APPROVED_BY] = u2.[EmployeeNumber]
          LEFT JOIN 
          [IAMS].[dbo].[UserMaster] u3 ON c.[REQUESTED_BY] = u3.[EmployeeNumber]
        WHERE 
          DATEPART(MONTH, c.[REQUESTED_ON]) = @month
          AND DATEPART(YEAR, c.[REQUESTED_ON]) = @year
      `;

      // Execute the combined query
      const detailedResult = await transaction.request()
        .input('month', sql.Int, parseInt(month))
        .input('year', sql.Int, parseInt(year))
        .query(combinedQuery);

      // Commit the transaction
      await transaction.commit();

      // Format the result as JSON
      const detailedData = detailedResult.recordset.map((item: any) => ({
        transId: item.TRANS_ID,
        assetId: item.ASSET_ID,
        cartridgeId: item.CARTRIDGE_ID,
        requestedQty: item.REQUESTED_QTY,
        approvedQty: item.APPROVED_QTY,
        statusId: item.STATUS_ID,
        requestedBy: item.REQUESTED_BY,
        requestedOn: item.REQUESTED_ON,
        approvedBy: item.APPROVED_BY,
        approvedOn: item.APPROVED_ON,
        approvingReason: item.APPROVING_REASON,
        cartridgeReturned: item.CARTRIDGE_RETURNED,
        employeeName: item.employeeName,
        department: item.department,
        userRole: item.userRole,
        designation: item.designation,
        designationName: item.designationName,
        cartridgeDescription: item.cartridgeDescription,
        statusDescription: item.statusDescription,
        approvedByName: item.approvedByName, // Added approvedByName
        requestedByName:item.requestedByName
      }));

      

      // Return successful response with data
      return new NextResponse(JSON.stringify({
        message: 'Query successful',
        detailedData,

      }), { status: 200 });

    } catch (error) {
      // Rollback the transaction in case of error
      //await transaction.rollback();
      console.error("Error querying database", error);
      return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }

  } catch (error) {
    // Handle errors and send an error response
    console.error("API Calling error", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
