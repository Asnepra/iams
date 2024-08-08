import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

const sql = require('mssql');

export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Extract token and data from request body
    const body = await req.json();
    const {token, } = body; // Corrected variable name: cartridgeId
    
    //console.log("Received in API:", cartridgeQuantity, catridgeId, token);
        
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
        // Query to retrieve cartridge details and insert into history
        const query = await transaction.request()
          .query(`
                      SELECT

                      CI.[CARTRIDGE_ID],
                      CI.[QTY],
                      CI.[UPDATED_ON],

                      C.[CARTRIDGE_DESC],
                      C.[UPDATE_BY_USERID],
                      C.[ASSET_BATCH_ID]
                  FROM 
                      [IAMS].[dbo].[IAMS_M_CARTRIDGE_INVENTORY] CI
                  JOIN
                      [IAMS].[dbo].[IAMS_M_CARTRIDGE] C ON CI.[CARTRIDGE_ID] = C.[CARTRIDGE_ID];
          `);
    
        // Check if insertion into history was successful or handle accordingly
        if (query.rowsAffected[0] === 0) {
          console.log("no insertion");
          // Rollback the transaction and return an error response if no rows were inserted
          await transaction.rollback();
          return new NextResponse(JSON.stringify({ message: 'No rows inserted into history' }), { status: 404 });
        }



        // Map the result to a JSON format
        const countryData = query.recordset.map((record: any) => ({
          id: record.CARTRIDGE_ID,
          catrdigeDescription: record.CARTRIDGE_DESC,
          stock: record.QTY,
          updatedOn:record.UPDATED_ON,
          updatedBy:record.UPDATE_BY_USERID,
          assetBatchId:record.ASSET_BATCH_ID
          // Add more fields as needed
        }));

        // Commit the transaction if everything is successful
        await transaction.commit();
      return new NextResponse(JSON.stringify(countryData), { status: 200 });

      
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
