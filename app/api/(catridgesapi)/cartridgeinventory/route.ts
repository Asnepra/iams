import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const sql = require('mssql')


export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Extract token from request body
    const { data, token } = await req.json();
        
    // Check if token is missing
    //console.log(token);
    if (!token) {
        return new NextResponse(
            JSON.stringify({ message: 'Missing token' }),
            { status: 400 }
        );
    }

    
    // Check if token is undefined or null
    if (!token) {
        return NextResponse.json(
        { message: 'Missing token' },
        { status: 200 }
        );
    }
    let verified=false;
    let j={
      message:'Token verified',
      status:401
    }
    let user=null;
    let admin;

    const decode=jwt.verify(token, `${process.env.JWT_SECRET}`, (err:any, decoded:any) => {
        if (err) {
          // Token verification failed
          j.message="Invalid Token";
          j.status=401;
          return NextResponse.json(
            j
          );
        }
      
        // Check expiration
        if (decoded.exp < Math.floor(Date.now() / 1000)) {
          j.message="Invalid Token";
            j.status=400;
            return new NextResponse(
              JSON.stringify({ message: 'Token expired' }),
              { status: 401 }
          );
        }

        const { userId, isAdmin } = decoded;
        //console.log(userId, isAdmin)
        user=userId;
        admin = isAdmin;

      
        // Token is valid
        // Proceed with your logic using `decoded` data
        
        //console.log("token abckend verified");
    }); 
    
    await mssqlconnect();
    //Fetch all the  data

    
        

     //console.log("Asset Model Id received ------------------ ",assetModelId);
     //console.log("guarantee Id received ------------------ ",guaranteeStatus);
     const { TRANS_ID, CARTRIDGE_ID, QTY, UPDATED_ON } = data;

     const cartridgeHistory=await sql.query`
                UPDATE [dbo].[IAMS_M_CARTRIDGE_INVENTORY]
      SET [QTY] = ${QTY}, [UPDATED_ON] = '${UPDATED_ON}'
      WHERE [TRANS_ID] = ${TRANS_ID} AND [CARTRIDGE_ID] = ${CARTRIDGE_ID};
    
     `;
     return new NextResponse(JSON.stringify(cartridgeHistory), { status: 500 });
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};