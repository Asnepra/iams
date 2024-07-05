"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import RequestCatridgeForm from "@/components/requestcatridge";
import FormError from "@/components/form-error";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface UserData {
  userId: string;
  userName: string;
  isAdmin: string;
  userMail: string;
  // Add other fields as needed
}

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

  return (
    <main className="mt-16 h-auto md:ml-48">
      <div className="text-2xl rounded-md px-4 text-white/90 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        Add Assets
        <p className="text-base text-white/90 dark:text-gray-400">
          Fill out the form to request a new laptop, printer, or other asset. Or Upload the CSV file
        </p>
      </div>
      <div className="p-4 space-4 flex">
        <div className="w-1/2 space-y-4">
          <div className="h-full p-2 space-y-2 max-w-3xl mx-auto">
            {error && <FormError message={error} />}
            <RequestCatridgeForm assetData={assetData} userData={userData} />
          </div>
        </div>
        <h2 className="text-lg font-medium mb-4">Cartridge Request History</h2>
        <Table>
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
      </div>
    </main>
  );
}
