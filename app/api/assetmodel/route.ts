import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";

const sql = require('mssql')


export const POST = async (req: NextRequest, res: NextResponse) => {
  
  try {
    // Set CORS headers
    // const headers = new Headers(req.headers)
    // headers.set(
    //   'Access-Control-Allow-Origin', '*');
    //   headers.set(
    //   'Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // Connect to the MongoDB database
    //await connectMongoDb();
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

    
    await mssqlconnect();
    //Fetch all the countries data
    const result = await sql.query`SELECT * FROM AssetModel`;
    // Map the result to a JSON format
    const countryData = result.recordset.map((record: any) => ({
      assetModelId: record.AssetModelID,
      manufacturerId: record.ManufacturerID,
      subcategoryId: record.SubcategoryID,
      assetModelName:record.AssetModelName
      // Add more fields as needed
    }));

    //console.log(countryData);

    return new NextResponse(JSON.stringify(countryData), { status: 200});
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};