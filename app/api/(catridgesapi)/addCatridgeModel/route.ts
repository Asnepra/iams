import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token, cartridgeQuantity, cartridgeName } = body; // Corrected variable name: cartridgeId
    
    console.log("Received in API:", cartridgeQuantity, cartridgeName, token);
        
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
    
      // Begin the transaction
      await transaction.begin();
    
      try {
        // Determine the next CARTRIDGE_ID value to insert
        let nextCartridgeIdQuery = await transaction.request()
          .query(`
            DECLARE @NextCartridgeId INT;
            SELECT @NextCartridgeId = ISNULL(MAX([CARTRIDGE_ID]), 0) + 1
            FROM [IAMS].[dbo].[IAMS_M_CARTRIDGE];
            SELECT @NextCartridgeId AS NextCartridgeId;
          `);

        const nextCartridgeId = nextCartridgeIdQuery.recordset[0].NextCartridgeId;

        // Insert into cartridge table
        const insertCartridgeQuery = await transaction.request()
          .query(`
            INSERT INTO [IAMS].[dbo].[IAMS_M_CARTRIDGE] (
                [CARTRIDGE_ID],
                [CARTRIDGE_DESC],
                [STOCK],
                [UPDATED_ON],
                [UPDATE_BY_USERID]
            ) VALUES (
                ${nextCartridgeId},
                '${cartridgeName}',
                ${cartridgeQuantity},
                GETDATE(),
                ${user}
            );
          `);
    
        // Check if insertion into cartridge table was successful
        if (insertCartridgeQuery.rowsAffected[0] === 0) {
          // Rollback the transaction and return an error response if no rows were inserted
          await transaction.rollback();
          return new NextResponse(JSON.stringify({ message: 'No rows inserted into cartridge table' }), { status: 404 });
        }
        
        // Insert into inventory table
        const insertInventoryQuery = await transaction.request()
          .query(`
            INSERT INTO [IAMS].[dbo].[IAMS_M_CARTRIDGE_INVENTORY] (
                [CARTRIDGE_ID],
                [QTY],
                [UPDATED_ON]
            ) VALUES (
                ${nextCartridgeId},
                ${cartridgeQuantity},
                GETDATE()
            );
          `);
    
        // Check if insertion into inventory table was successful
        if (insertInventoryQuery.rowsAffected[0] === 0) {
          // Rollback the transaction and return an error response if no rows were inserted
          await transaction.rollback();
          return new NextResponse(JSON.stringify({ message: 'No rows inserted into inventory table' }), { status: 404 });
        }

        // Commit the transaction if everything is successful
        await transaction.commit();

        return new NextResponse(JSON.stringify({ message: 'Insert into history and update inventory successful' }), { status: 200 });
      
      } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();
        throw error;
      }
      
    } catch (error) {
      console.error("Error querying/inserting database", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("API Calling error internal Error", { status: 500 });
  }
};
