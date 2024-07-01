import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

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
        let j={
            message:"Failure",
            isAdmin:"False",
            userId:"Dummy",
            userName:"Name",
            mail:"abc@gmail.com"
        }

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
            //console.log("decoded token", decoded);

            // Check token expiration
            if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
                j.message="Token expired"
                return new NextResponse(
                    JSON.stringify(j),
                    { status: 401 }
                );
            }

            // Ensure decoded contains expected properties
            const { userId, isAdmin, userName, userMail } = decoded;
            //console.log("data", userMail);
            j.message="Success";
            j.isAdmin=isAdmin;
            j.userId=userId;
            j.userName=userName;
            j.mail=userMail;

            
                return new NextResponse(
                    JSON.stringify(j),
                    { status: 200 }
                );
             
           
        } catch (error) {
            console.error("Error:", error);
            j.message="Server Error"
            return new NextResponse(
                JSON.stringify(j),
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
