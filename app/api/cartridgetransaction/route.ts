import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const sql = require('mssql')


export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Extract token from request body
    const { dataToUpdate , token } = await req.json();
        
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

     const cartridgeHistory=await sql.query`
                UPDATE [dbo].[IAMS_X_CARTRIDGE]
      SET [ASSET_ID] = ${dataToUpdate.assetId},
          [CARTRIDGE_ID] = ${dataToUpdate.cartridgeId},
          [REQUESTED_QTY] = ${dataToUpdate.requestedQty},
          [APPROVED_QTY] = ${dataToUpdate.approvedQty},
          [STATUS_ID] = ${dataToUpdate.statusId},
          [REQUESTED_BY] = ${dataToUpdate.requestedBy},
          [REQUESTED_ON] = ${dataToUpdate.requestedOn},
          [APPROVED_BY] = ${dataToUpdate.approvedBy},
          [APPROVED_ON] = ${dataToUpdate.approvedOn}
      WHERE [TRANS_ID] = ${dataToUpdate.transId};
    
     `;
     return new NextResponse(JSON.stringify(cartridgeHistory), { status: 500 });
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};