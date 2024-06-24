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
    let verified=false;
    let j={
      message:'Token verified',
      status:401
    }

    jwt.verify(token, `${process.env.JWT_SECRET}`, (err:any, decoded:any) => {
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
      
        // Token is valid
        // Proceed with your logic using `decoded` data
        
        //console.log("token abckend verified");
      }); 
    await mssqlconnect();
    //Fetch all the countries data
    const result = await sql.query`SELECT * FROM AssetMaster`;
    // Map the result to a JSON format
    const countryData = result.recordset.map((record: any) => ({
      categoryId: record.CategoryMasterID,
      categoryName: record.CategoryName,
      // Add more fields as needed
    }));

    //console.log(countryData);

    return new NextResponse(JSON.stringify(j), { status: 200 });
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};