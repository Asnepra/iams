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

    

    //const headersInstance = headers()
    const authHeader = req.headers.get('authorization')
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
          return NextResponse.json(
            j
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
    //Fetch all the countries data
    if(user!==null){
    const result = await sql.query`SELECT * FROM AssetMaster WHERE BelongsToUserID = ${user}`;
    // Map the result to a JSON format
    const assetData = result.recordset.map((record: any) => ({
      assetId: record.AssetID,
      assetModelId: record.AssetModelID,
      //poMasterId: record.POMasterID,
      locationId: record.LocationID,
      belongsToUserId: record.BelongsToUserID,
      hddCapacityGB: record.HDDCapacityGB,
      monitorSizeInch: record.MonitorSizeInch,
      ramMB: record.RAMMB,
      processorMasterId: record.ProcessorMasterID,
      osMasterId: record.OSMasterID,
      status: record.Status,
      //purposeRemarks: record.PurposeRemarks,
      //purchaseDate: record.PurchaseDate,
      warrantyStatus: record.WarrantyStatus,
      assetSerialNo: record.AssetSerialNo,
    }));
    


    
    console.log("asdasfasf --------------",assetData)
    const responseData = [];

      for (let i = 0; i < assetData.length; i++) {
        const asset = assetData[i];
        //console.log("assetss single ",asset)

        const a = await sql.query`SELECT * FROM AssetModel WHERE AssetModelID = ${asset.assetModelId}`;
        const aData = a.recordset[0]; // Assuming you expect only one record, adjust if necessary
        //console.log("adata",aData);

        const b = await sql.query`SELECT * FROM CategoryMaster WHERE CategoryMasterID = ${aData.CategoryID}`;
        const bData = b.recordset[0]; // Assuming you expect only one record, adjust if necessary
        //console.log("bdata",bData);

        const c = await sql.query`SELECT * FROM SubcategoryMaster WHERE SubcategoryID = ${aData.SubcategoryID}`;
        const cData = c.recordset[0]; // Assuming you expect only one record, adjust if necessary

        const d = await sql.query`SELECT * FROM LocationMaster WHERE LocationID = ${asset.locationId}`;
        const dData = d.recordset[0]; // Assuming you expect only one record, adjust if necessary

        const osresult = await sql.query`SELECT * FROM OSMaster WHERE OSMasterID = ${asset.osMasterId}`;
        const osData = osresult.recordset[0]; // Assuming you expect only one record, adjust if necessary

        const processorresult = await sql.query`SELECT * FROM ProcessorMaster WHERE ProcessorMasterID = ${asset.processorMasterId}`;
        const processorData = processorresult.recordset[0]; // Assuming you expect only one record, adjust if necessary

        const assetResponse = {
          serialNumber: asset.AssetSerialNo,
          status: asset.Status,
          assetModalName: aData.AssetModelName,
          category: bData.CategoryName,
          subcategory: cData.SubcategoryName,
          locationName: dData.LocationName,
          belongsToUser: user,
          hdd: asset.HDDCapacityGB,
          monitor: asset.MonitorSizeInch,
          ram: asset.RAMMB,
          os: osData.OSName,
          processor: processorData.ProcessorName
        };

        responseData.push(assetResponse);
      }

    return new NextResponse(JSON.stringify(responseData), { status: 200 });
  }
  else{
    return new NextResponse("Server Side Error in parsinsg", { status: 500 });
  }
  } catch (error) {
    console.log(error)
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};
