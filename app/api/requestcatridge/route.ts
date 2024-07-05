import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";

const sql = require('mssql')
import jwt, { JwtPayload } from 'jsonwebtoken';


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


    let j={
            message:"Failure",
            isAdmin:"False",
            userId:"Dummy",
            userName:"Name",
            mail:"abc@gmail.com"
        }

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
            //console.log("decoded token", decoded);

            // Check token expiration
            if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
                j.message="Token expired"
                return new NextResponse(
                    JSON.stringify(j),
                    { status: 401 }
                );
            }

            // Ensure decoded contains expected properties
            const { userId, isAdmin, userName, userMail } = decoded;
            //console.log("data", userMail);
            j.message="Success";
            j.isAdmin=isAdmin;
            j.userId=userId;
            j.userName=userName;
            j.mail=userMail;

            
            await mssqlconnect();
            //Fetch all the countries data
            const result = await sql.query`SELECT 
              am.[AssetID],
              am.[AssetModelID],
              am.[BelongsToUserID],

              am.[Status],

              am.[WarrantyStatus],
              am.[AssetSerialNo],

              asm.[AssetModelName],
              asm.[CategoryID]
          FROM 
              [IAMS].[dbo].[AssetMaster] am
          INNER JOIN 
              [IAMS].[dbo].[AssetModel] asm ON am.[AssetModelID] = asm.[AssetModelID]
          WHERE 
              am.[BelongsToUserID] = ${userId}
              AND asm.[CategoryID] = 2;
          `;
            // Map the result to a JSON format
            const countryData = result.recordset.map((record: any) => ({
              assetId:record.AssetID,
              assetModelId: record.AssetModelID,
              status: record.Status,
              assetModelName:record.AssetModelName
              // Add more fields as needed
            }));
        
            //console.log(countryData);
        
            return new NextResponse(JSON.stringify(countryData), { status: 200});
          
             
           
        } catch (error) {
            console.error("Error:", error);
            j.message="Server Error"
            return new NextResponse(
                JSON.stringify(j),
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Catch error:", error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
    
};