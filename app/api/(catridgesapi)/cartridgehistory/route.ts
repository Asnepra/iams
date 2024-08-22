import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { PendingCatridgeRequestProps } from "@/schemas/requests";

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
     const cartridgeHistory=await sql.query`
                SELECT 
                r.[TRANS_ID],
                r.[CARTRIDGE_ID],
                r.[REQUESTED_QTY],
                r.[APPROVED_QTY],
                r.[STATUS_ID],
                r.[REQUESTED_BY],
                r.[REQUESTED_ON],
                r.[APPROVED_BY],
                r.[APPROVED_ON],
                u.[EMPLOYEE_NAME] AS RequesterName,
                c.[CARTRIDGE_DESC] AS CartridgeDescription,
                a.[ASSET_MODEL] AS AssetName  -- Ensure this field is selected
            FROM 
                [IAMS].[dbo].[IAMS_X_CARTRIDGE] r
                INNER JOIN [IAMS].[dbo].[IAMS_M_USER] u 
                    ON r.[REQUESTED_BY] = u.[PERSONAL_NO]
                INNER JOIN [IAMS].[dbo].[IAMS_M_CARTRIDGE] c 
                    ON r.[CARTRIDGE_ID] = c.[CARTRIDGE_ID]
                INNER JOIN [IAMS].[dbo].[IAMS_M_ASSET] a 
                    ON r.[ASSET_ID] = a.[ASSET_BATCH_ID]
            WHERE 
               
                 r.[REQUESTED_BY] = ${user};

    
     `;
     // Transform the result to match the interface
    const c: PendingCatridgeRequestProps[] = cartridgeHistory.recordset.map((item: any) => ({
      transId: item.TRANS_ID,
      assetName: item.AssetName,
      cartridgeId: item.CARTRIDGE_ID,
      requestedQty: item.REQUESTED_QTY,
      approvedQty: item.APPROVED_QTY,
      statusId: item.STATUS_ID,
      requestedBy: item.REQUESTED_BY,
      requestedOn: item.REQUESTED_ON,
      approvedBy: item.APPROVED_BY,
      approvedOn: item.APPROVED_ON,
      requesterName: item.RequesterName,
      cartridgeDescription: item.CartridgeDescription
    }));

    return new NextResponse(JSON.stringify(c), { status: 200 });
     //return new NextResponse(JSON.stringify(cartridgeHistory), { status: 200 });
    
  } catch (error) {
    // Handle errors and send an error response with status code 500
    return new NextResponse("IN Api Calling error internal Error", { status: 500 });
  }
};