import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const sql = require('mssql')


export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Extract token from request body
    const { token } = await req.json();
        
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
     //const { TRANS_ID, CARTRIDGE_ID, QTY, UPDATED_ON } = data;

     const cartridgeInventory=await sql.query`
                Select * from [IAMS].[dbo].[IAMS_M_CARTRIDGE];
    
     `;

     // Map the result to a JSON format
    const countryData = cartridgeInventory.recordset.map((record: any) => ({
        id: record.CARTRIDGE_ID,
        catrdigeDescription: record.CARTRIDGE_DESC,
        stock: record.STOCK,
        updatedOn:record.UPDATED_ON,
        updatedBy:record.UPDATE_BY_USERID,
        assetBatchId:record.ASSET_BATCH_ID
        // Add more fields as needed
      }));
     return new NextResponse(JSON.stringify(countryData), { status: 200 });
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};