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

    try{
        const formData= await req.json();
        //console.log("Data received ------------------           ",formData);
        const {assetId, assetModelId,pomasterId, locationId, belongsToUser, hddCapacity, monitorSize, ramGBOptions,processorMasterId,
        osMasterId, status,purposeRemarks, guaranteeStatus, assetSerialNumber
     } = formData;

     //console.log("Asset Model Id received ------------------ ",assetModelId);
     //console.log("guarantee Id received ------------------ ",guaranteeStatus);
     const aid=await sql.query`
     SELECT MAX(AssetID) AS LastAssetID
FROM dbo.AssetMaster;    
     `;
     
     
     // Extract the last AssetID
    const lastAssetID = aid.recordset[0].LastAssetID;

    // Increment the last AssetID by 1
    const nextAssetID = lastAssetID + 1;
     await sql.query`
    INSERT INTO dbo.AssetMaster (AssetID,AssetModelID, POMasterID, LocationID, BelongsToUserID,
         HDDCapacityGB, MonitorSizeInch,RAMMB,ProcessorMasterID, OSMasterID, Status, PurposeRemarks, PurchaseDate, WarrantyStatus, AssetSerialNo)
    VALUES (${nextAssetID}, ${assetModelId}, ${pomasterId}, ${locationId}, ${user}, 
        ${hddCapacity},${monitorSize}, ${ramGBOptions},${processorMasterId}, ${osMasterId}, ${status}, ${purposeRemarks},
        GETDATE(), ${guaranteeStatus}, ${assetSerialNumber})
    `;
    }catch(error){
    console.log("Error -------------         ",error);
    return new NextResponse("Database Error", { status: 500 });
    }

    



    return new NextResponse(JSON.stringify("Data Added Successfully"), { status: 200});
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};