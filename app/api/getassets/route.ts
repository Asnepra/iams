import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

const sql = require('mssql');

export const POST = async (req: NextRequest) => {
    try {
        // Parse JSON body
        const { token } = await req.json();

        // Check if token is provided
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing token' }),
                { status: 400 }
            );
        }

        // Verify JWT token
        let user = null;
        try {
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

            if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
                return new NextResponse(
                    JSON.stringify({ message: 'Token expired' }),
                    { status: 401 }
                );
            }

            user = decoded.userId;
        } catch (error) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid token' }),
                { status: 401 }
            );
        }

        // Connect to the database
        await mssqlconnect();

        // Fetch asset data
        const result = await sql.query`SELECT 
            cat.CATEGORY_NAME,
            subcat.SUB_CATEGORY_NAME,
            ad.ASSET_ID,
            ad.ASSET_BATCH_ID,
            ma.ASSET_MAKE,
            ma.ASSET_MODEL
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
        WHERE 
            aas.PERSONAL_NO = ${user};`
        

        if (result.recordset.length > 0) {
            const assetData = result.recordset.map((record: any) => ({
                assetModel: record.ASSET_MODEL,
                assetMake: record.ASSET_MAKE,
                assetBatchId: record.ASSET_BATCH_ID,
                categoryName: record.CATEGORY_NAME,
                subCategoryName: record.SUB_CATEGORY_NAME
            }));

            return NextResponse.json(assetData, { status: 200 });
        } else {
            const assetData: any[]=[];
            return NextResponse.json(assetData, { status: 200 });

        }

    } catch (error) {
        console.error('API Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
