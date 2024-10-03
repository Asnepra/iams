import mssqlconnect from "@/lib/mssqlconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { PendingCatridgeRequestProps } from "@/schemas/requests";

const sql = require('mssql');

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

    let user = null;
    let admin = null;

    // Verify the JWT token
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, decoded: any) => {
      if (err) {
        return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), { status: 401 });
      }

      // Check expiration
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return new NextResponse(JSON.stringify({ message: 'Token expired' }), { status: 401 });
      }

      user = decoded.userId;
      admin = decoded.isAdmin;
      return decoded; // Token is valid
    });

    await mssqlconnect();

    // Fetch all the data
    const cartridgeHistory = await sql.query`
      SELECT 
        r.[TRANS_ID],
        r.[ASSET_ID],
        r.[CARTRIDGE_ID],
        r.[REQUESTED_QTY],
        r.[APPROVED_QTY],
        r.[STATUS_ID],
        r.[REQUESTED_BY],
        r.[REQUESTED_ON],
        r.[APPROVED_BY],
        r.[APPROVED_ON],
        r.[APPROVING_REASON],
        r.[CARTRIDGE_RETURNED],
        u.[EMPLOYEE_NAME] AS RequesterName,
        c.[CARTRIDGE_DESC] AS CartridgeDescription,
        a.[ASSET_MODEL] AS AssetName
      FROM 
        [IAMS].[dbo].[IAMS_X_CARTRIDGE] r
        INNER JOIN [IAMS].[dbo].[IAMS_M_USER] u 
          ON r.[REQUESTED_BY] = u.[PERSONAL_NO]
        INNER JOIN [IAMS].[dbo].[IAMS_M_CARTRIDGE] c 
          ON r.[CARTRIDGE_ID] = c.[CARTRIDGE_ID]
        INNER JOIN [IAMS].[dbo].[IAMS_M_ASSET] a 
          ON r.[ASSET_ID] = a.[ASSET_BATCH_ID]
      WHERE 
        r.[REQUESTED_BY] = ${user};
    `;

    // Transform the result to match the interface
    const cartridgeRequests: PendingCatridgeRequestProps[] = cartridgeHistory.recordset.map((item: any) => ({
      transId: item.TRANS_ID,
      assetId: item.ASSET_ID,
      cartridgeId: item.CARTRIDGE_ID,
      requestedQty: item.REQUESTED_QTY,
      approvedQty: item.APPROVED_QTY,
      statusId: item.STATUS_ID,
      requestedBy: item.REQUESTED_BY,
      requestedOn: item.REQUESTED_ON,
      approvedBy: item.APPROVED_BY,
      approvedOn: item.APPROVED_ON,
      approvingReason: item.APPROVING_REASON,
      cartridgeReturned: item.CARTRIDGE_RETURNED,
      requesterName: item.RequesterName,
      cartridgeDescription: item.CartridgeDescription,
      assetName: item.AssetName,
    }));

    return new NextResponse(JSON.stringify(cartridgeRequests), { status: 200 });

  } catch (error) {
    console.error("Error in API call:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
