import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
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

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

            // Check token expiration
            if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
                return new NextResponse(
                    JSON.stringify({ message: 'Token expired' }),
                    { status: 401 }
                );
            }
            try{
              
            

            

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

            const empResult= await sql.query`SELECT empDepartment, COUNT(*) AS employeeCount
            FROM [IAMS].[dbo].[UserMaster]
            GROUP BY EmpDepartment
            ORDER BY EmpDepartment;`

            const empList= await sql.query`SELECT 
                [EmployeeNumber] ,
                [EmployeeName] ,
                [EmpDepartment] ,
                [EmpMail] ,             
                [EmpProfilePic] ,
                [UserRole] 
                FROM [IAMS].[dbo].[UserMaster]
                ORDER BY [EmployeeName];`

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
