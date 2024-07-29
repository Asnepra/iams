import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const sql = require('mssql');

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Extract token and data from request body
    const  body  = await req.json();
    //console.log("body",body);
    const { token, cartridgeQuantity, cartridgeName } = body;
    //console.log("Values in API", cartridgeName, cartridgeQuantity);

    // Check if token is missing
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing token' }),
        { status: 400 }
      );
    }

    // Verify the JWT token
    let user = null;
    let admin;

    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, decoded: any) => {
      if (err) {
        // Token verification failed
        return new NextResponse(
          JSON.stringify({ message: 'Invalid Token' }),
          { status: 401 }
        );
      }

      // Check token expiration
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return new NextResponse(
          JSON.stringify({ message: 'Token expired' }),
          { status: 401 }
        );
      }

      // Token is valid
      const { userId, isAdmin } = decoded;
      user = userId;
      admin = isAdmin;
    });

    // Uncomment and complete your database logic
     await mssqlconnect(); // Ensure mssql connection is correctly established

    // Example database query (replace with your actual query)
    const cartridgeHistory = await sql.query`
    -- Determine the next CARTRIDGE_ID value to insert
        DECLARE @NextCartridgeId INT;

        SELECT @NextCartridgeId = ISNULL(MAX([CARTRIDGE_ID]), 0) + 1
        FROM [IAMS].[dbo].[IAMS_M_CARTRIDGE];
        INSERT INTO [IAMS].[dbo].[IAMS_M_CARTRIDGE] (
            [CARTRIDGE_ID],
            [CARTRIDGE_DESC],
            [STOCK],
            [UPDATED_ON],
            [UPDATE_BY_USERID]
        ) VALUES ( @NextCartridgeId, ${cartridgeName}, ${cartridgeQuantity}, GETDATE(),${user})
    `;

    // Return a response (replace with your actual response logic)
    return new NextResponse(JSON.stringify(cartridgeHistory), { status: 200 });
  } catch (error) {
    console.error("Error in API", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
