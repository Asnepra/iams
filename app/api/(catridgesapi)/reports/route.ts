import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest) => {
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token, month, year } = body;

    // Check if token or required parameters are missing
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

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

      // Check token expiration
      if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
        response.message = 'Token expired';
        return new NextResponse(JSON.stringify(response), { status: 401 });
      }

      // Token is valid
      userId = decoded.userId;
      isAdmin = decoded.isAdmin;
      response.isAdmin = isAdmin; // Update response with isAdmin
    } catch (err) {
      // Token verification failed
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

      try {
        // Execute the query with month and year parameters
        const result = await transaction.request()
          .input('month', sql.Int, parseInt(month))
          .input('year', sql.Int, parseInt(year))
          .query(`
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
              u.[EmployeeName],
              u.[EmpDepartment] AS [Department],
              u.[UserRole],
              u.[DESIGNATION],
              u.[DESIGNATION_NAME],
              m.[CARTRIDGE_DESC] AS [CartridgeDescription], -- Added Cartridge Description
              s.[STATUS_DESC] AS [StatusDescription] -- Added Status Description
            FROM 
              [IAMS].[dbo].[IAMS_X_CARTRIDGE] c
            INNER JOIN 
              [IAMS].[dbo].[UserMaster] u
            ON 
              c.[REQUESTED_BY] = u.[EmployeeNumber]
            INNER JOIN 
              [IAMS].[dbo].[IAMS_M_CARTRIDGE] m
            ON 
              c.[CARTRIDGE_ID] = m.[CARTRIDGE_ID] -- Join with the cartridge master table
            INNER JOIN 
              [IAMS].[dbo].[IAMS_P_ASSET_STATUS] s
            ON 
              c.[STATUS_ID] = s.[STATUS_ID] -- Join with the status table
            WHERE 
              DATEPART(MONTH, c.[REQUESTED_ON]) = @month
              AND DATEPART(YEAR, c.[REQUESTED_ON]) = @year
          `);

        // Commit the transaction
        await transaction.commit();

        // Format the result as JSON
        const formattedResult = result.recordset;

        // Return successful response with data
        return new NextResponse(JSON.stringify({ message: 'Query successful', data: formattedResult }), { status: 200 });

      } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();
        console.error("Error querying database", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
      }

    } catch (error) {
      console.error("Error establishing MSSQL connection", error);
      return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }

  } catch (error) {
    // Handle errors and send an error response
    console.error("API Calling error", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
