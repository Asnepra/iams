import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest) => {
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token, transId, reason, rejected } = body;
    //console.log(rejected, reason);

    // Check if token or transId is missing
    if (!token || !transId) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing token or transaction ID' }),
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
    let userId: string | null = null;
    let isAdmin = false;

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
      userId = decoded.userId;
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
        if (rejected) {
          // If rejected, only update the STATUS_ID
          await transaction.request()
            .input('transId', sql.Int, transId)
            .input('statusId', sql.Int, 203) // Assuming 203 is the status ID for rejected
            .input('approvingReason', sql.VarChar, reason || null)
            .query(`
              UPDATE [IAMS].[dbo].[IAMS_X_CARTRIDGE]
              SET 
                [STATUS_ID] = @statusId,
                [APPROVING_REASON] = @approvingReason
              WHERE [TRANS_ID] = @transId;
            `);
        } else {
          // Approved
          await transaction.request()
            .input('transId', sql.Int, transId)
            .input('approvedQty', sql.Int, 1)  // Approved Quantity is set to 1
            .input('approvedBy', sql.VarChar, userId)  // Approved By is set to the current user
            .input('approvedOn', sql.DateTime, new Date())  // Approved On is set to the current date/time
            .input('statusId', sql.Int, 202)  // Status ID is set to 202
            .input('approvingReason', sql.VarChar, reason || null)
            .query(`
              UPDATE [IAMS].[dbo].[IAMS_X_CARTRIDGE]
              SET 
                [APPROVED_QTY] = @approvedQty,
                [APPROVED_BY] = @approvedBy,
                [APPROVED_ON] = @approvedOn,
                [STATUS_ID] = @statusId,
                [APPROVING_REASON] = @approvingReason
              WHERE [TRANS_ID] = @transId;
            `);

          // Reduce quantity in [IAMS_M_CARTRIDGE_INVENTORY] table
          await transaction.request()
            .input('transId', sql.Int, transId)
            .query(`
              UPDATE [IAMS].[dbo].[IAMS_M_CARTRIDGE_INVENTORY]
              SET [QTY] = [QTY] - 1
              WHERE [CARTRIDGE_ID] = (
                SELECT [CARTRIDGE_ID]
                FROM [IAMS].[dbo].[IAMS_X_CARTRIDGE]
                WHERE [TRANS_ID] = @transId
              ) AND [QTY] > 0;
            `);

          // Reduce stock in [IAMS_M_CARTRIDGE] table
          await transaction.request()
            .input('transId', sql.Int, transId)
            .query(`
              UPDATE [IAMS].[dbo].[IAMS_M_CARTRIDGE]
              SET [STOCK] = [STOCK] - 1
              WHERE [CARTRIDGE_ID] = (
                SELECT [CARTRIDGE_ID]
                FROM [IAMS].[dbo].[IAMS_X_CARTRIDGE]
                WHERE [TRANS_ID] = @transId
              ) AND [STOCK] > 0;
            `);
        }

        // Commit the transaction if everything is successful
        await transaction.commit();

        return new NextResponse(JSON.stringify({ message: 'Transaction successful' }), { status: 200 });
      
      } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();
        console.error("Error querying/inserting database", error);
        return new NextResponse("Internal Server Error", { status: 500 });
      }
      
    } catch (error) {
      console.error("Error establishing MSSQL connection", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    console.error("API Calling error", error);
    return new NextResponse("API Calling error internal Error", { status: 500 });
  }
};
