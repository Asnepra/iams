import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
import jwt, { JwtPayload } from 'jsonwebtoken';
const sql = require('mssql');
import mssqlconnect from "@/lib/mssqlconnect"; // Import your MSSQL connection function

// Define the POST request handler for raising tickets
export const POST = async (req: NextRequest) => {    
    try {
        // Extract token and ticket data from request body
        const formData = await req.formData();
        const token = formData.get('token');
        const asset_id=formData.get('asset_id');
        const ticket_cat_id=formData.get('ticket_cat_id');
        const assetComplaintMessage = formData.get('assetComplaintMessage');
        const assetImage = formData.get('assetImage') as File | null; // Ensure type

        console.log("data api", { token, asset_id, ticket_cat_id, assetComplaintMessage, assetImage });

        // Check if token is missing
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing token' }),
                { status: 400 }
            );
        }
        let user = null;
        let isAdmin = false; // Assuming isAdmin is a boolean

        // Verify JWT token
        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(token as string, `${process.env.JWT_SECRET}`) as JwtPayload;
        } catch (error) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid or expired token' }),
                { status: 401 }
            );
        }

        // Connect to MSSQL database
        await mssqlconnect();

        // Prepare ticket data
        user = decoded.userId;
        //const personalNo = decoded.personalNo; // Assuming personalNo is in the token payload
        const ticketRaisedOn = new Date();

        // Handle image upload if assetImage is provided
        let imagePath: string | null = null;
        if (assetImage) {
            const buffer = Buffer.from(await assetImage.arrayBuffer());
            const dir = path.join(process.cwd(), 'ticket');

            // Create directory if it doesn't exist
            await fs.mkdir(dir, { recursive: true });

            imagePath = path.join(dir, `${Date.now()}_${user}.png`); // Create a unique filename
            await fs.writeFile(imagePath, buffer); // Save the image to the directory
        }

        // Insert ticket details into the database
        await sql.query`
            INSERT INTO [IAMS].[dbo].[IAMS_X_TICKET] (
                ASSET_ID, 
                TICKET_CAT_ID, 
                TICKET_DESC, 
                TICKET_STATUS_ID, 
                TICKET_RAISED_ON, 
                TICKET_RAISED_BY, 
                TICKET_IMAGE_LOCATION
            ) VALUES (
                ${asset_id}, 
                 
                ${ticket_cat_id}, 
                ${assetComplaintMessage}, 
                1, -- Assuming 1 is the default status ID
                GETDATE(), 
                ${user}, 
                ${imagePath ? imagePath : null}
            )
        `;

        // Return success response
        return new NextResponse(
            JSON.stringify({ message: 'Ticket raised successfully' }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error raising ticket:", error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
};
