import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

const sql = require('mssql');

export const POST = async (req: NextRequest) => {
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token } = body;

    // Check if token is missing
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing token' }),
        { status: 400 }
      );
    }

    // Initialize response object
    let response = {
        message: 'Failure',
        isAdmin: 'False',
        userId: 'Dummy',
        userName: 'Name',
        mail: 'abc@gmail.com',
        data: [],
        maxPages: 0
      };
      let user = null;
      let isAdmin = false; // Assuming isAdmin is a boolean
  
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
  
        // Check token expiration
        if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
          response.message = 'Token expired';
          console.log("Token expired");
          return new NextResponse(JSON.stringify(response), { status: 401 });
        }
      
        // Token is valid
        user = decoded.userId;
        isAdmin = decoded.isAdmin;
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
        // Query to retrieve cartridges with specific status and return status
        const query = await transaction.request()
          .input('UserId', sql.VarChar, user) // Pass userId as input parameter
          .query(`
            SELECT
              [TRANS_ID],
              [ASSET_ID],
              [CARTRIDGE_ID],
              [REQUESTED_QTY],
              [APPROVED_QTY],
              [STATUS_ID],
              [REQUESTED_BY],
              [REQUESTED_ON],
              [APPROVED_BY],
              [APPROVED_ON],
              [APPROVING_REASON],
              [CARTRIDGE_RETURNED]
            FROM [IAMS].[dbo].[IAMS_X_CARTRIDGE]
            WHERE [STATUS_ID] = 202
              AND [CARTRIDGE_RETURNED] = 0
              AND [REQUESTED_BY] = @UserId;
          `);

        // Map the result to a JSON format
        const cartridgeData = query.recordset.map((record: any) => ({
          transId: record.TRANS_ID,
          assetId: record.ASSET_ID,
          cartridgeId: record.CARTRIDGE_ID,
          requestedQty: record.REQUESTED_QTY,
          approvedQty: record.APPROVED_QTY,
          statusId: record.STATUS_ID,
          requestedBy: record.REQUESTED_BY,
          requestedOn: record.REQUESTED_ON,
          approvedBy: record.APPROVED_BY,
          approvedOn: record.APPROVED_ON,
          approvingReason: record.APPROVING_REASON,
          cartridgeReturned: record.CARTRIDGE_RETURNED === 1, // Convert to boolean
        }));

        // Commit the transaction if everything is successful
        await transaction.commit();
        response.message = 'Success';
        response.data = cartridgeData;
        return new NextResponse(JSON.stringify(response.data), { status: 200 });

      } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();
        console.error("Error during transaction", error);
        return new NextResponse("Internal Server Error", { status: 500 });
      }

    } catch (error) {
      console.error("Error connecting to or querying database", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }

  } catch (error) {
    // Handle errors and send an error response with status code 500
    console.error("API internal error", error);
    return new NextResponse("API Internal Error", { status: 500 });
  }
};
