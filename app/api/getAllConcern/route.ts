// Import necessary libraries and modules
import { NextRequest, NextResponse } from 'next/server';
const sql = require('mssql');
import jwt, { JwtPayload } from 'jsonwebtoken';
import mssqlconnect from '@/lib/mssqlconnect'; // Adjust the import path as per your project structure

// Define the POST handler function
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Extract token, year, and page from request body
    const { token, year, page } = await req.json();

    // Check if token is missing
    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'Missing token' }), { status: 400 });
    }

    // Initialize a response object
    let response = {
      message: 'Failure',
      isAdmin: 'False',
      userId: 'Dummy',
      userName: 'Name',
      mail: 'abc@gmail.com',
      data: [],
      maxPages: 0
    };

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

      // Check token expiration
      if (typeof decoded.exp === 'number' && decoded.exp < Math.floor(Date.now() / 1000)) {
        response.message = 'Token expired';
        return new NextResponse(JSON.stringify(response), { status: 401 });
      }

      // Ensure decoded contains expected properties
      const { userId, isAdmin, userName, userMail } = decoded;
      response.message = 'Success';
      response.isAdmin = isAdmin;
      response.userId = userId;
      response.userName = userName;
      response.mail = userMail;

      // Connect to MSSQL database
      await mssqlconnect();

      // Query to fetch tickets for the specified year and page
      const pageSize = 10; // Number of entries per page
      const offset = (page - 1) * pageSize;
      const query = `
        SELECT COUNT(*) AS TotalCount FROM [IAMS].[dbo].[Tickets] WHERE YEAR([CreatedAt]) = ${year};
        SELECT TOP (${pageSize}) [TicketID], [AssetModalID], [Issue], [Priority], [Status], 
          [EmployeeNumber], [AssignedToEmployeeNumber], [AssignedOn], [CreatedAt], 
          [ResolutionTime], [ResolvedOn], [ResolutionDetails]
        FROM [IAMS].[dbo].[Tickets]
        WHERE YEAR([CreatedAt]) = ${year}
        ORDER BY [CreatedAt] DESC
        OFFSET ${offset} ROWS;
      `;

      // Execute the query
      const result = await sql.query(query);

      // Extract total count from the first result set
      const totalCount = result.recordsets[0][0].TotalCount;
      response.maxPages = Math.ceil(totalCount / pageSize);

      // Extract ticket data from the second result set
      const tickets = result.recordsets[1];
      response.data = tickets;

      console.log('Fetched data:', tickets);

      return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      response.message = 'Server Error';
      return new NextResponse(JSON.stringify(response), { status: 500 });
    }
  } catch (error) {
    console.error('Catch error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};
