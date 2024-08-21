"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import RequestCatridgeForm from "@/components/requestcatridge";
import FormError from "@/components/form-error";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserData } from "@/schemas";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/table/data-table";
import { CartridgeApprovalProps, PRINTER_MODAL_STRING, PrinterDataProps } from "@/schemas/printerSchema";
import CatridgeForm from "./_components/catridge-form";
import { PendingCatridgeRequestProps } from "@/schemas/requests";

function parseToken(token: string): UserData | null {
  try {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
}

export default function Home() {
  const [error, setError] = useState<string>(""); // State for error message
  const [assetData, setAssetData] = useState<PrinterDataProps[]>([]); // State for asset data
  const [userData, setUserData] = useState<UserData | null>(null); // State for user data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading indicator
  const [cartridgeHistory, setCartridgeHistory] = useState<PendingCatridgeRequestProps[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setError("Token is missing or expired.");
      return;
    }
    const parsedUserData = parseToken(token);
    setUserData(parsedUserData);
  }, []);

  useEffect(() => {
    if (!userData) return; // Skip if user data is not yet fetched

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const assetResponse = await axios.post('/api/requestcatridge', { token: Cookies.get('token') });
        setAssetData(assetResponse.data);
      } catch (error) {
        console.error('Error fetching asset data:', error);
        setError("Failed to fetch asset data, Please reload again");
      }

      try {
        const historyResponse = await axios.post('/api/cartridgehistory', { token: Cookies.get('token') });
        setCartridgeHistory(historyResponse.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
        setError("Failed to fetch history data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData]); // Only re-run when userData changes

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-2 p-4 md:p-6">
          <div className="flex flex-row justify-around space-x-2 gap-2">
            <Card className="w-full md:w-1/2">
              <div className="h-full p-2 space-y-2 max-w-4xl">
                {error && <FormError message={error} />}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" defaultValue={userData?.userName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Employee Number</Label>
                    <Input id="email" type="number" defaultValue={userData?.userId} disabled />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" defaultValue={userData?.userName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" type="text" defaultValue={userData?.userDepartment} disabled />
                  </div>
                </div>
                <CatridgeForm printers={assetData} />
              </div>
            </Card>
          </div>
        </main>
        <div className="flex items-center justify-around m-8">
          <Card className="w-full md:max-w-screen-md lg:max-w-screen-xl xl:max-w-screen-2xl">
            <CardHeader>
              <CardTitle>Cartridge History</CardTitle>
              <CardDescription>View your history of Cartridge.</CardDescription>
            </CardHeader>
            <Separator />
            <div className="p-2">
              <DataTable columns={columns} data={cartridgeHistory} filterKey={"cartridgeDescription"} filterString="Cartridge" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
