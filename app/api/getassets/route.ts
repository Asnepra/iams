import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { headers } from "next/headers";

const sql = require('mssql')


export const GET = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // // Set CORS headers
    // const headers = new Headers(req.headers)
    // headers.set(
    //   'Access-Control-Allow-Origin', '*');
    //   headers.set(
    //   'Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // Connect to the MongoDB database
    //await connectMongoDb();

    

    const headersInstance = headers()
    const authHeader = headersInstance.get('authorization')
    //console.log("auth header", authHeader);

    const token = authHeader?.split(' ')[1] 
    //console.log("token 0----- ", token)

    
    // Check if token is undefined or null
    if (!token) {
        return NextResponse.json(
        { message: 'Missing token' },
        { status: 200 }
        );
    }
    let userID;
    let verified=false;
    let j={
      message:'Token verified',
      status:401
    }

    //const k=process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
      // At this point, decoded contains the validated payload of the JWT
      const { userId, isAdmin } = decoded;
      userID=userId;
    
      console.log(userId, isAdmin);
    } catch (error) {
      console.error('JWT verification failed:', error);
      // Handle JWT verification error (e.g., token expired, invalid signature)
    }
    
// Output: "00518699" "Admin" (assuming these are extracted correctly)


    
    await mssqlconnect();
    //Fetch all the countries data
    const result = await sql.query`SELECT * FROM AssetMaster Where BelongsToUserID=${userID}`;
      // Map the SQL query result to JSON format
      const assetData = result.recordset.map((record: any) => ({
        assetId: record.AssetID,
        assetModelId: record.AssetModelID,
        poMasterId: record.POMasterID,
        locationId: record.LocationID,
        belongsToUserId: record.BelongsToUserID,
        hddCapacityGB: record.HDDCapacityGB,
        monitorSizeInch: record.MonitorSizeInch,
        ramMB: record.RAMMB,
        processorMasterId: record.ProcessorMasterID,
        osMasterId: record.OSMasterID,
        status: record.Status,
        purposeRemarks: record.PurposeRemarks,
        purchaseDate: record.PurchaseDate,
        warrantyStatus: record.WarrantyStatus,
        assetSerialNo: record.AssetSerialNo,
      }));

    //console.log(assetData);

    return new NextResponse(JSON.stringify(assetData), { status: 200 });
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};