// app/api/ticketCategories/route.ts

import { NextRequest, NextResponse } from "next/server";
const sql = require('mssql');
import jwt, { JwtPayload } from 'jsonwebtoken';
import mssqlconnect from "@/lib/mssqlconnect"; // Import your MSSQL connection function

// Define the POST request handler
export const POST = async (req: NextRequest) => {
    try {
        // Extract token from request body
        const { token } = await req.json();

        // Check if token is missing
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing token' }),
                { status: 400 }
            );
        }

        // Verify JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
        } catch (error) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid or expired token' }),
                { status: 401 }
            );
        }

        // Connect to MSSQL database
        await mssqlconnect();

        // Fetch ticket categories and subcategories
        const result = await sql.query`
            SELECT 
                TICKET_CAT_ID,
                MAIN_CAT_ID,
                MAIN_CAT_NAME,
                SUB_CAT_ID,
                SUB_CAT_NAME
            FROM 
                [IAMS].[dbo].[IAMS_P_TICKET_CAT]
        `;

        // Map the SQL result to JSON format
        const categories = result.recordset.map((record: any) => ({
            ticketCatId: record.TICKET_CAT_ID,
            mainCatId: record.MAIN_CAT_ID,
            mainCatName: record.MAIN_CAT_NAME,
            subCatId: record.SUB_CAT_ID,
            subCatName: record.SUB_CAT_NAME,
        }));

        // Send JSON response with categories
        return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
};
