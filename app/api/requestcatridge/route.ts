import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

const sql = require('mssql');

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Extract token and data from request body
    const body = await req.json();
    const { token } = body;
    
    // Check if token is missing
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing token' }),
        { status: 400 }
      );
    }

    // Initialize response object
    let response = {
      message: 'Failure',
      isAdmin: false,
      userId: 'Dummy',
      userName: 'Name',
      mail: 'abc@gmail.com',
      data: [],
      maxPages: 0
    };
    let user = null;
    let isAdmin = false;

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

      // Check token expiration
      if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
        response.message = 'Token expired';
        return new NextResponse(JSON.stringify(response), { status: 401 });
      }

      // Token is valid
      user = decoded.userId;
      isAdmin = decoded.isAdmin;
    } catch (err) {
      // Token verification failed
      return new NextResponse(
        JSON.stringify({ message: 'Invalid Token' }),
        { status: 401 }
      );
    }

    try {
      const pool = await mssqlconnect(); // Ensure MSSQL connection is correctly established
      const transaction = new sql.Transaction(pool);

      // Begin the transaction
      await transaction.begin();

      try {
        // Query to retrieve cartridge details
        const result = await transaction.request().query(`
          SELECT 
              ad.ASSET_ID,
              ad.ASSET_BATCH_ID,
              cat.CATEGORY_NAME,
              subcat.SUB_CATEGORY_NAME,
              ma.ASSET_MAKE,
              ma.ASSET_MODEL,
              mapping.CATRIDGE_ID,
              cartr.CARTRIDGE_NO,
              cartr.CARTRIDGE_DESC,
              cartr.STOCK
          FROM 
              [IAMS].[dbo].[IAMS_X_ASSET_ASSIGN] aas
          INNER JOIN 
              [IAMS].[dbo].[IAMS_X_ASSET_DETAILS] ad 
              ON aas.ASSET_ID = ad.ASSET_ID
          LEFT JOIN 
              [IAMS].[dbo].[IAMS_P_ASSET_CAT] cat 
              ON ad.CATEGORY_ID = cat.CATEGORY_ID
          LEFT JOIN 
              [IAMS].[dbo].[IAMS_P_ASSET_SUBCAT] subcat 
              ON ad.SUB_CATEGORY_ID = subcat.SUB_CATEGORY_ID
          LEFT JOIN 
              [IAMS].[dbo].[IAMS_M_ASSET] ma 
              ON ad.ASSET_BATCH_ID = ma.ASSET_BATCH_ID
          LEFT JOIN 
              [IAMS].[dbo].[IAMS_P_CATRIDGE_PRINTER_MAPPING] mapping
              ON ad.ASSET_BATCH_ID = mapping.ASSET_BATCH_ID
          LEFT JOIN 
              [IAMS].[dbo].[IAMS_M_CARTRIDGE] cartr
              ON mapping.CATRIDGE_ID = cartr.CARTRIDGE_ID
          WHERE 
              aas.PERSONAL_NO = ${user} 
              AND ad.CATEGORY_ID = 40
        `, {
          userId: user
        });

        // Check if any rows were returned
        if (result.recordset.length === 0) {
          await transaction.rollback();
          return new NextResponse(JSON.stringify({ message: 'No records found' }), { status: 404 });
        }

        // Reconstruct JSON response by grouping details by ASSET_BATCH_ID
        const groupedData = result.recordset.reduce((acc: any, record: any) => {
            if (!acc[record.ASSET_BATCH_ID]) {
              acc[record.ASSET_BATCH_ID] = {
                assetId: record.ASSET_ID,
                assetBatchId: record.ASSET_BATCH_ID,
                categoryName: record.CATEGORY_NAME,
                subCategoryName: record.SUB_CATEGORY_NAME,
                assetMake: record.ASSET_MAKE,
                assetModel: record.ASSET_MODEL,
                cartridges: []
              };
            }
  
            if (record.CATRIDGE_ID) {
              acc[record.ASSET_BATCH_ID].cartridges.push({
                cartridgeId: record.CATRIDGE_ID,
                cartridgeNo: record.CARTRIDGE_NO,
                cartridgeDescription: record.CARTRIDGE_DESC,
                stock: record.STOCK
              });
            }
  
            return acc;
          }, {});
  
          const data = Object.values(groupedData);

        //reconstruct json. for all same assetBatchId, club the details of name, make model stock etc.

        // Commit the transaction
        await transaction.commit();

        // Send response with data
        return new NextResponse(JSON.stringify( data ), { status: 200 });

      } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();
        console.error("Error querying database", error);
        return new NextResponse(JSON.stringify({ message: 'Database query failed' }), { status: 500 });
      }

    } catch (error) {
      console.error("Error establishing MSSQL connection", error);
      return new NextResponse(JSON.stringify({ message: 'Database connection error' }), { status: 500 });
    }

  } catch (error) {
    // Handle errors and send an error response
    console.error("API handling error", error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};
