"use client"
import { useEffect, useMemo, useState } from "react";
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
import ApprovalTimeline from "./_components/data-timeline";
import { DataTable } from "@/components/table/data-table";
import { PRINTER_MODAL_STRING, PrinterDataProps } from "@/schemas/printerSchema";
import CatridgeForm from "./_components/catridge-form";





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

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setError("Token is missing or expired.");
      return;
    }
    setUserData(parseToken(token));
  }, []);

  useEffect(() => {
    if (!userData) return; // Skip if user data is not yet fetched

    setIsLoading(true);
    axios.post('/api/requestcatridge', { token: Cookies.get('token') })
      .then(response => {
        const data = response.data;
        console.log("data", data);
        setAssetData(data);
      })
      .catch(error => {
        //console.error('Error fetching asset data:', error);
        setError("Failed to fetch asset data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userData]); // Fetch data whenever userData changes

  const [cartridgeHistory, setCartridgeHistory] = useState([
    {
      id: "1",
      printerModel: "HP LaserJet Pro",
      quantity: "2",
      reason: "Printer ran out of ink",
      requestedOn: "2023-05-15",
      status: "Fulfilled",
    },
    {
      id: "2",
      printerModel: "Canon PIXMA",
      quantity: "1",
      reason: "Printer cartridge is low",
      requestedOn: "2023-03-20",
      status: "Fulfilled",
    },
    {
      id:"3",
      printerModel: "Epson WorkForce",
      quantity: "4",
      reason: "Printer cartridge is empty",
      requestedOn: "2023-01-10",
      status: "Pending",
    },
    {
      id: "4",
      printerModel: "Brother MFC",
      quantity: "1",
      reason: "Printer cartridge is low",
      requestedOn: "2022-11-05",
      status: "Fulfilled",
    },
  ]);


  const [selectedStatus, setSelectedStatus] = useState("Fulfilled")

  const filteredRequests = useMemo(() => {
    if (selectedStatus === "Fuldilled") {
      return cartridgeHistory
    } else {
      return cartridgeHistory.filter((request) => request.status === selectedStatus)
    }
  }, [selectedStatus, cartridgeHistory])

  return (
    <div className="grid min-h-screen w-full ">
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-2 p-4 md:p-6">
            <div className="flex flex-row justify-around space-x-2 gap-2">
              <Card className="w-1/2">
            <div className="h-full p-2 space-y-2 max-w-4xl">
            {error && <FormError message={error} />}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name </Label>
                        <Input id="email" type="text" defaultValue={userData?.userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Employee Number</Label>
                        <Input id="email" type="number" defaultValue={userData?.userId} disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Designation</Label>
                        <Input id="name" defaultValue={userData?.userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Department</Label>
                        <Input id="email" type="text" defaultValue={userData?.userDepartment} disabled />
                      </div>
                    </div>
            {/* <RequestCatridgeForm assetData={assetData} userData={userData} /> */}
            <CatridgeForm printers={assetData}/>
          </div>
          </Card>
          {/* <Card className="w-1/2">
            <ApprovalTimeline filteredRequests={cartridgeHistory}/>
          </Card> */}
        </div>
        </main>
        {/* <div className="flex items-center justify-around m-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Catridge History</CardTitle>
                <CardDescription>View your history of Cartridge.</CardDescription>
              </CardHeader>
              <Separator/>
              <div className="p-2">
                <DataTable columns={columns} data={cartridgeHistory} filterKey={PRINTER_MODAL_STRING} filterString={"Printer Modal"}/>
              </div>
            </Card>
        </div> */}
    </div>
    </div>
    
  );
}
