import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Extract token from request body
    const body = await req.json();
    const { token } = body;
    
    console.log("Received token:", token);
    
    // Check if token is missing
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing token' }),
        { status: 400 }
      );
    }
    
    // Verify JWT token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid Token' }),
        { status: 401 }
      );
    }
    
    // Check token expiration
    if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
      return new NextResponse(
        JSON.stringify({ message: 'Token expired' }),
        { status: 401 }
      );
    }
    
    // Token is valid
    const userId = decoded.userId;
    const isAdmin = decoded.isAdmin;
    
    try {
      // Ensure MSSQL connection is correctly established
      await mssqlconnect();
    
      // Start a transaction
      const transaction = new sql.Transaction();
      await transaction.begin();
    
      try {
        // Query to fetch records with STATUS_ID = 201
        const result = await transaction.request()
          .query(`
            	 SELECT 
                r.[TRANS_ID],
                r.[CARTRIDGE_ID],
                r.[REQUESTED_QTY],
                r.[APPROVED_QTY],
                r.[STATUS_ID],
                r.[REQUESTED_BY],
                r.[REQUESTED_ON],
                r.[APPROVED_BY],
                r.[APPROVED_ON],
                u.[EMPLOYEE_NAME] AS RequesterName,
                c.[CARTRIDGE_DESC] AS CartridgeDescription,
                a.[ASSET_MODEL]  -- Ensure this field is selected
              FROM 
                [IAMS].[dbo].[IAMS_X_CARTRIDGE] r
                INNER JOIN [IAMS].[dbo].[IAMS_M_USER] u 
                  ON r.[REQUESTED_BY] = u.[PERSONAL_NO]
                INNER JOIN [IAMS].[dbo].[IAMS_M_CARTRIDGE] c 
                  ON r.[CARTRIDGE_ID] = c.[CARTRIDGE_ID]
                INNER JOIN [IAMS].[dbo].[IAMS_M_ASSET] a 
                  ON r.[ASSET_ID] = a.[ASSET_BATCH_ID]
              WHERE 
                r.[STATUS_ID] = 201;
          `);
    
        // Map the result to JSON format
        const data = result.recordset.map((record:any) => ({
          transId: record.TRANS_ID,
          assetName: record.ASSET_MODEL,
          cartridgeId: record.CARTRIDGE_ID,
          requestedQty: record.REQUESTED_QTY,
          approvedQty: record.APPROVED_QTY,
          statusId: record.STATUS_ID,
          requestedBy: record.REQUESTED_BY,
          requestedOn: record.REQUESTED_ON,
          approvedBy: record.APPROVED_BY,
          approvedOn: record.APPROVED_ON,
          requesterName: record.RequesterName,
          cartridgeDescription: record.CartridgeDescription
        }));
    
        // Commit the transaction
        await transaction.commit();
    
        // Return a successful response with data
        return new NextResponse(
          JSON.stringify(data),
          { status: 200 }
        );
      } catch (queryError) {
        // Rollback transaction if any error occurs
        await transaction.rollback();
        console.error("Database query error:", queryError);
        return new NextResponse(
          JSON.stringify({ message: 'Error querying the database' }),
          { status: 500 }
        );
      }
    } catch (dbConnectError) {
      console.error("Database connection error:", dbConnectError);
      return new NextResponse(
        JSON.stringify({ message: 'Error connecting to the database' }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
};
