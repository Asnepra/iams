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
  
    
    await mssqlconnect();
    //Fetch all the  data

    
        

     //console.log("Asset Model Id received ------------------ ",assetModelId);
     //console.log("guarantee Id received ------------------ ",guaranteeStatus);
     //const { TRANS_ID, CARTRIDGE_ID, QTY, UPDATED_ON } = data;

     const cartridgeHistory=await sql.query`
                  UPDATE [IAMS].[dbo].[IAMS_M_CARTRIDGE]
                SET 
                    STOCK = ${cartridgeQuantity},
                    UPDATED_ON = GETDATE(),
                    UPDATE_BY_USERID = ${user}
                WHERE 
                    CARTRIDGE_ID = ${catridgeId}


    
     `;
     return new NextResponse(JSON.stringify(cartridgeHistory), { status: 200 });
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};