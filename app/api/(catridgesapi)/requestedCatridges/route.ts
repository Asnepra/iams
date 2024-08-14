import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest) => {
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token, printerId, cartridges } = body;

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
    let userId: string | null = null;
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
        // Iterate over cartridges and perform operations
        for (const cartridge of cartridges) {
          const { cartridgeId } = cartridge;

          // Insert into Cartridge Table
          await transaction.request()
            .input('assetId', sql.Int, printerId)
            .input('cartridgeId', sql.VarChar, cartridgeId)
            .input('requestedQty', sql.Int, 1)  // Requested Quantity is set to 1
            .input('approvedQty', sql.Int, -1)  // Approved Quantity is set to null
            .input('statusId', sql.Int, 201)      // Status ID is set to 201
            .input('requestedBy', sql.VarChar, userId)
            .input('requestedOn', sql.DateTime, new Date())
            .input('approvedBy', sql.VarChar, null)  // Approved By is null
            .input('approvedOn', sql.DateTime, null) // Approved On is null
            .query(`
              INSERT INTO [IAMS].[dbo].[IAMS_X_CARTRIDGE] (
                [ASSET_ID],
                [CARTRIDGE_ID],
                [REQUESTED_QTY],
                [APPROVED_QTY],
                [STATUS_ID],
                [REQUESTED_BY],
                [REQUESTED_ON],
                [APPROVED_BY],
                [APPROVED_ON]
              )
              VALUES (
                @assetId,
                @cartridgeId,
                @requestedQty,
                @approvedQty,
                @statusId,
                @requestedBy,
                @requestedOn,
                @approvedBy,
                @approvedOn
              );
            `);
        }

        // Commit the transaction if everything is successful
        await transaction.commit();

        return new NextResponse(JSON.stringify({ message: 'Insert into history successful' }), { status: 200 });
      
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
