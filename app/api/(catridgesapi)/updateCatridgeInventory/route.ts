import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'

const sql = require('mssql')


export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Extract token from request body
    const body = await req.json();
    //Extract data
    const {cartridgeQuantity, token, catridgeId}= body;
    
    console.log("received in api", cartridgeQuantity, catridgeId, token);
        
    // Check if token is missing
    //console.log(token);
    if (!token) {
        return new NextResponse(
            JSON.stringify({ message: 'Missing token' }),
            { status: 400 }
        );
    }



    let response = {
      message: 'Failure',
      isAdmin: 'False',
      userId: 'Dummy',
      userName: 'Name',
      mail: 'abc@gmail.com',
      data: [],
      maxPages: 0
    };
    let user=null;
    let admin=null;

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

      // Check token expiration
      if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
        response.message = 'Token expired';
        console.log("token expired");
        return new NextResponse(JSON.stringify(response), { status: 401 });
      }
    
      // Token is valid
      const { userId, isAdmin } = decoded;
      user = userId;
      admin = isAdmin;
    } catch (err) {
      // Token verification failed
      return new NextResponse(
        JSON.stringify({ message: 'Invalid Token' }),
        { status: 401 }
      );
    }
    try {
      await mssqlconnect(); // Ensure mssql connection is correctly established
    
      // Start a transaction
      const transaction = new sql.Transaction();
    
      // Begin the transaction
      await transaction.begin();
    
      try {
        // Query to retrieve cartridge details and insert into history
        const query = await transaction.request()
          .query(`
            DECLARE @CartridgeDesc NVARCHAR(255);
            DECLARE @AssetBatchId INT;
    
            -- Retrieve Cartridge Description and Asset Batch ID based on Cartridge ID
            SELECT 
                @CartridgeDesc = CARTRIDGE_DESC,
                @AssetBatchId = ASSET_BATCH_ID
            FROM [IAMS].[dbo].[IAMS_M_CARTRIDGE]
            WHERE CARTRIDGE_ID = ${catridgeId}; -- Replace ${catridgeId} with the actual cartridge ID you want to query
    
            -- Insert into Cartridge History Table
            INSERT INTO [IAMS].[dbo].[IAMS_M_CARTRIDGE] (
                [CARTRIDGE_ID],
                [CARTRIDGE_DESC],
                [STOCK],
                [UPDATED_ON],
                [UPDATE_BY_USERID],
                [ASSET_BATCH_ID]
            )
            VALUES (
                ${catridgeId}, -- Replace with the actual cartridge ID you are inserting
                @CartridgeDesc,
                ${cartridgeQuantity}, -- Example: Inserting with stock value 0 (adjust as per your requirement)
                GETDATE(),
                ${user}, -- Assuming 'user' variable holds the user ID
                @AssetBatchId
            );
          `);
    
        // Commit the transaction
        await transaction.commit();
    
        // Check if insertion into history was successful or handle accordingly
        if (query.rowsAffected[0] > 0) {
          return new NextResponse(JSON.stringify({ message: 'Insert into history successful' }), { status: 200 });
        } else {
          return new NextResponse(JSON.stringify({ message: 'No rows inserted into history' }), { status: 404 });
        }
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
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};