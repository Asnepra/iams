import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');

export const POST = async (req: NextRequest) => {
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token, transId } = body;

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
        // Update the status of the cartridges to 'returned'
        await transaction.request()
          .input('TransId', sql.Int, transId)
          .query(`
            UPDATE [IAMS].[dbo].[IAMS_X_CARTRIDGE]
            SET [CARTRIDGE_RETURNED] = 1
            WHERE 
              [TRANS_ID] = @TransId;
          `);

        

        // Commit the transaction if everything is successful
        await transaction.commit();
        response.message = 'Success';
        return new NextResponse(JSON.stringify("Success"), { status: 200 });

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
