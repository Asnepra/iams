import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { headers } from "next/headers";

const sql = require('mssql')


export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // // Set CORS headers
    // const headers = new Headers(req.headers)
    // headers.set(
    //   'Access-Control-Allow-Origin', '*');
    //   headers.set(
    //   'Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // Connect to the MongoDB database
    //await connectMongoDb();

    

    // //const headersInstance = headers()
    // const authHeader = req.headers.get('authorization')
    // //console.log("auth header", authHeader);

    // const token = authHeader?.split(' ')[1] 
    //console.log("token 0----- ", token)
    const token1 = await req.json(); // Assuming the token is sent in the request body
        

        // Check if token is missing
        const {token} = token1;
        //console.log("token ------------", token);

    
    // Check if token is undefined or null
    if (!token) {
        return NextResponse.json(
        { message: 'Missing token' },
        { status: 400 }
        );
    }
    let user=null;
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
      //console.log("decoded token", decoded);

      // Check token expiration
      if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
          return new NextResponse(
              JSON.stringify({ message: 'Token expired' }),
              { status: 401 }
          );
      }

      // Ensure decoded contains expected properties
      const { userId, isAdmin } = decoded;

      //set user
      user=userId;
      console.log("user",user);
       
     
  } catch (error) {
      console.error("Error:", error);
      return new NextResponse(
          JSON.stringify({ message: 'Invalid token or database error' }),
          { status: 500 }
      );
  }
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
    


    
    //console.log("asdasfasf --------------",assetData)
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
          assetId:asset.assetId,
          assetModalId:asset.assetModalId,
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
      console.log(responseData);

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
