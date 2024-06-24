import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";

const sql = require('mssql')

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Set CORS headers
    const headers = new Headers(req.headers)
    headers.set(
      'Access-Control-Allow-Origin', '*');
      headers.set(
      'Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    await mssqlconnect();
    //Fetch all the  data

    try{
        const formData= await req.json();
        //console.log("Data received ------------------           ",formData);
        const {assetId, assetModelId,pomasterId, locationId, belongsToUser, hddCapacity, monitorSize, ramGBOptions,processorMasterId,
        osMasterId, status,purposeRemarks, guaranteeStatus, assetSerialNumber
     } = formData;

     console.log("Asset Model Id received ------------------ ",assetModelId);
     console.log("guarantee Id received ------------------ ",guaranteeStatus);
     await sql.query`
    INSERT INTO dbo.AssetMaster (AssetModelID, POMasterID, LocationID, BelongsToUserID,
         HDDCapacityGB, MonitorSizeInch,RAMMB,ProcessorMasterID, OSMasterID, Status, PurposeRemarks, PurchaseDate, WarrantyStatus, AssetSerialNo)
    VALUES (${assetId}, ${assetModelId}, ${pomasterId}, ${locationId}, ${belongsToUser}, 
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