// Import necessary modules and functions
import { NextRequest, NextResponse } from "next/server";
const sql = require('mssql')
import jwt, { JwtPayload } from 'jsonwebtoken';
import mssqlconnect from "@/lib/mssqlconnect"; // Import your MSSQL connection function

// Define the POST request handler
export const POST = async (req: NextRequest, res: NextResponse) => {
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

        // Object to store response data
        let response = {
            message: "Failure",
            isAdmin: "False",
            userId: "Dummy",
            userName: "Name",
            mail: "abc@gmail.com"
        };

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

            // Check token expiration
            if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
                response.message = "Token expired";
                return new NextResponse(
                    JSON.stringify(response),
                    { status: 401 }
                );
            }

            // Ensure decoded contains expected properties
            const { userId, isAdmin, userName, userMail } = decoded;
            response.message = "Success";
            response.isAdmin = isAdmin;
            response.userId = userId;
            response.userName = userName;
            response.mail = userMail;

            // Connect to MSSQL database
            await mssqlconnect();

            // Fetch ticket details along with associated asset model and category names
            const result = await sql.query`
                SELECT 
                        t.[TicketID],
                        t.[Issue],
                        t.[Priority],
                        t.[Status],
                        t.[EmployeeNumber],
                        t.[AssignedToEmployeeNumber],
                        t.[AssignedOn],
                        t.[CreatedAt],
                        t.[ResolutionTime],
                        t.[ResolvedOn],
                        t.[ResolutionDetails],
                        cm.[CategoryName],
                        am.[AssetModelName],
                        am.AssetModelID,
                        um.[EmployeeName] AS AssignedToEmployeeName  -- Add the name field from userMaster table
                    FROM 
                        [IAMS].[dbo].[Tickets] t
                    INNER JOIN 
                        [IAMS].[dbo].[AssetModel] am ON t.[AssetID] = am.[AssetModelID]
                    INNER JOIN 
                        [IAMS].[dbo].[CategoryMaster] cm ON am.[CategoryID] = cm.[CategoryMasterID]
                    INNER JOIN 
                        [IAMS].[dbo].[userMaster] um ON t.[AssignedToEmployeeNumber] = um.[EmployeeNumber]
                    WHERE 
                        t.[EmployeeNumber] = ${userId}`;


            // Map the SQL result to JSON format
            const ticketData = result.recordset.map((record: any) => ({
                ticketId: record.TicketID,
                assetId: record.AssetID,
                issue: record.Issue,
                priority: record.Priority,
                status: record.Status,
                assignedToEmployeeNumber: record.AssignedToEmployeeNumber,
                assignedToEmployeeName:record.AssignedToEmployeeName,
                assignedOn: record.AssignedOn,
                createdAt: record.CreatedAt,
                resolutionTime: record.ResolutionTime,
                resolvedOn: record.ResolvedOn,
                resolutionDetails: record.ResolutionDetails,
                assetModelId: record.AssetModelID,
                assetModelName: record.AssetModelName,
                categoryName: record.CategoryName
                // Add more fields as needed
            }));
            console.log("result ----------- ticket data", ticketData);

            // Send JSON response with ticket data
            return new NextResponse(JSON.stringify(ticketData), { status: 200 });
        } catch (error) {
            console.error("Error:", error);
            response.message = "Server Error";
            return new NextResponse(
                JSON.stringify(response),
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
