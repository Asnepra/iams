// app/api/ticketCategories/route.ts

import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mssqlconnect from "@/lib/mssqlconnect"; // Import your MSSQL connection function

// Define the expected request body type
interface RequestBody {
    token: string;
}

// Define the POST request handler
export const POST = async (req: NextRequest) => {
    try {
        // Extract token from request body
        const { token }: RequestBody = await req.json();

        // Check if token is missing
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing token' }),
                { status: 400 }
            );
        }

        // Verify JWT token
        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
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
                TICKET.TICKET_ID,
                TICKET.TICKET_DESC,
                TICKET.TICKET_STATUS_ID,
                TICKET.TICKET_RAISED_ON,
                TICKET.TICKET_CAT_ID,
                TICKET_ASSIGNED_TO,
                TICKET_ASSIGNED_ON,
                EMP.EmployeeNumber,
                EMP.EmployeeName,
                EMP.EmpDepartment,
                EMP.EmpMail,
                EMP.DESIGNATION,
                ASSET.ASSET_MAKE,
                ASSET.ASSET_MODEL,
                S.TICKET_STATUS_DESCRIPTION,
                C.MAIN_CAT_ID,
                C.MAIN_CAT_NAME,
                C.SUB_CAT_ID,
                C.SUB_CAT_NAME
            FROM 
                [IAMS].[dbo].[IAMS_X_TICKET] AS TICKET
            JOIN 
                [IAMS].[dbo].[UserMaster] AS EMP ON TICKET.TICKET_RAISED_BY = EMP.EmployeeNumber
            JOIN 
                [IAMS].[dbo].[IAMS_M_ASSET] AS ASSET ON TICKET.ASSET_ID = ASSET.ASSET_BATCH_ID
            JOIN 
                [IAMS].[dbo].[IAMS_P_TICKET_STATUS] AS S ON TICKET.TICKET_STATUS_ID = S.TICKET_STATUS_ID
            JOIN 
                [IAMS].[dbo].[IAMS_P_TICKET_CAT] AS C ON TICKET.TICKET_CAT_ID = C.TICKET_CAT_ID
        `;

        // Map the SQL result to JSON format
        const categories = result.recordset.map((record: any) => ({
            ticketId: record.TICKET_ID,
            ticketDesc: record.TICKET_DESC,
            ticketStatusId: record.TICKET_STATUS_ID,
            ticketRaisedOn: record.TICKET_RAISED_ON,
            ticketCatId: record.TICKET_CAT_ID,
            assignedTo: record.TICKET_ASSIGNED_TO,
            assignedOn: record.TICKET_ASSIGNED_ON,
            employeeNumber: record.EmployeeNumber,
            employeeName: record.EmployeeName,
            empDepartment: record.EmpDepartment,
            empMail: record.EmpMail,
            designation: record.DESIGNATION,
            assetMake: record.ASSET_MAKE,
            assetModel: record.ASSET_MODEL,
            ticketStatusDescription: record.TICKET_STATUS_DESCRIPTION,
            mainCatId: record.MAIN_CAT_ID,
            mainCatName: record.MAIN_CAT_NAME,
            subCatId: record.SUB_CAT_ID,
            subCatName: record.SUB_CAT_NAME,
        }));

        // Send JSON response with categories
        return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error); // Improved error logging
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
};
