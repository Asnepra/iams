import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
const sql = require('mssql')

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const token1 = await req.json(); // Assuming the token is sent in the request body
        //console.log("token ------------", token1);

        // Check if token is missing
        const {token} = token1;
        //console.log(token);
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing token' }),
                { status: 400 }
            );
        }

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

            // Check token expiration
            if (decoded.exp < Math.floor(Date.now() / 1000)) {
                return new NextResponse(
                    JSON.stringify({ message: 'Token expired' }),
                    { status: 401 }
                );
            }
            try{
                const { userId, isAdmin } = decoded;
            

            
            //console.log("User ID:", userId);
            //console.log("Is Admin:", isAdmin);
            if(isAdmin!=='Admin'){
                return new NextResponse(JSON.stringify("Unauthorized Access"),{status:401});
            }
        }catch(error){
            return new NextResponse(
                JSON.stringify({ message: 'Invalid token or database error' }),
                { status: 500 }
            );
        }

            // Connect to MSSQL database
            await mssqlconnect();

           

            // Example SQL query (uncomment and modify as per your table structure)
            // const result = await sql.query`
            //     INSERT INTO dbo.AssetMaster (columns)
            //     VALUES (values)
            // `;

            const empResult= await sql.query`SELECT EmpDepartment, COUNT(*) AS EmployeeCount
            FROM [IAMS].[dbo].[UserMaster]
            GROUP BY EmpDepartment
            ORDER BY EmpDepartment;`

            const empList= await sql.query`Select [EmployeeNumber]
            ,[EmployeeName]
            ,[EmpDepartment]
        FROM [IAMS].[dbo].[UserMaster]`

        const response = {
            empResult: empResult.recordset, // Array of departments with employee count
            empList: empList.recordset // Array of employee details
        };
        //console.log(response);
            

            // Return success response
            return new NextResponse(
                JSON.stringify(response),
                { status: 200 }
            );
        } catch (error) {
            console.error("Error:", error);
            return new NextResponse(
                JSON.stringify({ message: 'Invalid token or database error' }),
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
