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
  const [assetData, setAssetData] = useState<any[]>([]); // State for asset data
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
      id: 1,
      printerModel: "HP LaserJet Pro",
      quantity: 2,
      reason: "Printer ran out of ink",
      requestedAt: "2023-05-15",
      status: "Fulfilled",
    },
    {
      id: 2,
      printerModel: "Canon PIXMA",
      quantity: 1,
      reason: "Printer cartridge is low",
      requestedAt: "2023-03-20",
      status: "Fulfilled",
    },
    {
      id: 3,
      printerModel: "Epson WorkForce",
      quantity: 3,
      reason: "Printer cartridge is empty",
      requestedAt: "2023-01-10",
      status: "Pending",
    },
    {
      id: 4,
      printerModel: "Brother MFC",
      quantity: 1,
      reason: "Printer cartridge is low",
      requestedAt: "2022-11-05",
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
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex flex-row justify-aroundn space-x-2 gap-2">
              <Card className="w-1/2">
          <div className="h-full p-2 space-y-2 max-w-3xl mx-auto">
            {error && <FormError message={error} />}
            <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name : {userData?.userName}</Label>
                        <Input id="email" type="email" defaultValue={userData?.userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Employee Number</Label>
                        <Input id="email" type="email" defaultValue={userData?.userId} disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Designation</Label>
                        <Input id="name" defaultValue={userData?.userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Department</Label>
                        <Input id="email" type="email" defaultValue={userData?.userDepartment} disabled />
                      </div>
                    </div>
            <RequestCatridgeForm assetData={assetData} userData={userData} />
          </div>
          </Card>
          <Card className="w-1/2">
          <div className="bg-background rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Approval Timeline</h2>
          <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-10">
            {filteredRequests.map((request, index) => (
              <div key={request.id} className="grid gap-1 text-sm relative">
                <div
                  className={`aspect-square w-3 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 ${
                    request.status === "Pending"
                      ? "bg-muted-foreground"
                      : request.status === "Approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <div className="font-medium">{request.requestedAt}</div>
                <div className="text-muted-foreground">
                  {request.printerModel} requested {request.printerModel} ({request.status})
                </div>
              </div>
            ))}
          </div>
        </div>
              </Card>
        </div>
        </main>
        <div className="flex items-center justify-around m-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Catridge History</CardTitle>
                <CardDescription>View your history of Cartridge.</CardDescription>
              </CardHeader>
              <Separator/>
        <Table className="items-center">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Printer Model</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartridgeHistory.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.printerModel}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.requestedAt}</TableCell>
                <TableCell>
                  <Badge variant={request.status === "Fulfilled" ? "default" : request.status==="Pending"? "secondary":"destructive"}>{request.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        </Card>

        
    </div>
    </div>
    </div>
    
  );
}
