import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mssqlconnect from "@/lib/mssqlconnect"; // Import your MSSQL connection function
import { HELPDESK_USER, TICKET_FOR_USER } from "@/schemas/ticket";

// Define the expected request body type
interface RequestBody {
    token: string;
    employeeNumber: number;
}

// Define the POST request handler
export const POST = async (req: NextRequest) => {
    try {
        // Extract token and employee number from request body
        const { token, employeeNumber }: RequestBody = await req.json();
        //console.log("empNumber", employeeNumber);

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

        // Fetch asset details for the specified employee number
        const assetResult = await sql.query`
            SELECT DISTINCT
                EMP.EmployeeNumber,
                EMP.EmployeeName,
                EMP.EmpDepartment,
                EMP.EmpMail,
                EMP.UserRole,
                EMP.DESIGNATION,
                S.STATUS_DESC,
                ASSET_M.ASSET_MAKE,
                ASSET_M.ASSET_MODEL,
                CAT.CATEGORY_NAME
            FROM 
                [IAMS].[dbo].[UserMaster] AS EMP
            JOIN 
                [IAMS].[dbo].[IAMS_X_ASSET_ASSIGN] AS ASSIGN ON EMP.EmployeeNumber = ASSIGN.PERSONAL_NO
            JOIN 
                [IAMS].[dbo].[IAMS_X_ASSET_DETAILS] AS ASSET_D ON ASSIGN.ASSET_ID = ASSET_D.ASSET_ID
            JOIN 
                [IAMS].[dbo].[IAMS_M_ASSET] AS ASSET_M ON ASSET_D.ASSET_BATCH_ID = ASSET_M.ASSET_BATCH_ID
            LEFT JOIN 
                [IAMS].[dbo].[IAMS_P_ASSET_CAT] AS CAT ON ASSET_M.CATEGORY_ID = CAT.CATEGORY_ID
            LEFT JOIN 
                [IAMS].[dbo].[IAMS_P_ASSET_STATUS] AS S ON ASSIGN.STATUS_ID = S.STATUS_ID
            WHERE 
                EMP.EmployeeNumber = ${employeeNumber}; 
        `;

        // Fetch users in the IT Helpdesk department
        const userResult = await sql.query`
            SELECT 
                EmployeeNumber,
                EmployeeName,
                EmpDepartment,
                EmpMail,
                EmpProfilePic,
                UserRole,
                DESIGNATION,
                DESIGNATION_NAME
            FROM 
                [IAMS].[dbo].[UserMaster]
            WHERE 
                EmpDepartment = 'IT Helpdesk';
        `;

        // Map the SQL results to JSON format
        const assets: TICKET_FOR_USER[] = assetResult.recordset.map((record: any) => ({
            employeeNumber: record.EmployeeNumber,
            employeeName: record.EmployeeName,
            empDepartment: record.EmpDepartment,
            empMail: record.EmpMail,
            userRole: record.UserRole,
            designation: record.DESIGNATION,
            statusDescription: record.STATUS_DESC,
            assetMake: record.ASSET_MAKE,
            assetModel: record.ASSET_MODEL,
            categoryName: record.CATEGORY_NAME,
        }));

        const users:HELPDESK_USER[] = userResult.recordset.map((record: any) => ({
            employeeNumber: record.EmployeeNumber,
            employeeName: record.EmployeeName,
            empDepartment: record.EmpDepartment,
            empMail: record.EmpMail,
            empProfilePic: record.EmpProfilePic,
            userRole: record.UserRole,
            designation: record.DESIGNATION,
            designationName: record.DESIGNATION_NAME,
        }));

        // Create a single JSON response
        const response = {
            assets,
            helpdeskUsers: users, // Renamed for clarity
        };

        // Send JSON response
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
};
