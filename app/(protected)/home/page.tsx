"use client";
import {
  ComputerIcon,
  LaptopIcon,
  ServerIcon,
  PrinterIcon,
} from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FormError from "@/components/form-error";

interface Asset {
  category: string;
  locationName: string;
  assetModalName: string;
  status: string;
}

interface UserData {
  userId: string;
  userName: string;
  isAdmin:string;
  userMail: string;
  // Add other fields as needed
}

export default function Dashboard() {
  const [error, setError] = useState<string | undefined>("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [computerCount, setComputerCount] = useState<number>(0);
  const [printerCount, setPrinterCount] = useState<number>(0);
  const [laptopCount, setLaptopCount] = useState<number>(0);
  const [serverCount, setServerCount] = useState<number>(0);
  const [userData, setUserData] = useState<UserData | null>(null); // State for user data

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

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

  const getData = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Token not found in cookies');
      }

      const parsedToken = parseToken(token);
      if (!parsedToken) {
        throw new Error('Unable to parse token');
      }

      setUserData(parsedToken); // Set user data in state

      const body = { token: token };
      const response = await axios.post('/api/getassets', body);

      if (response.data && Array.isArray(response.data)) {
        const assetData = response.data;
        setAssets(assetData);

        // Calculate counts for each category
        let compCount = 0;
        let printCount = 0;
        let lapCount = 0;
        let servCount = 0;

        assetData.forEach((asset: Asset) => {
          if (asset.category === "Computer") compCount++;
          else if (asset.category === "Printer") printCount++;
          else if (asset.category === "Laptop") lapCount++;
          else if (asset.category === "Server") servCount++;
        });

        // Set counts
        setComputerCount(compCount);
        setPrinterCount(printCount);
        setLaptopCount(lapCount);
        setServerCount(servCount);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
      setError("Error fetching assets. Please try again.");
      router.push("/");
    }
  };

  // Map categories to respective icon components
  const imageCategoryMap: Record<string, JSX.Element> = {
    Computer: <ComputerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Laptop: <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Printer: <PrinterIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Server: <ServerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
  };

  return (
    <div className="mt-16 h-auto flex flex-col md:ml-48 bg-muted/40">
        
        
         <div className="text-2xl rounded-md px-4 text-white/90 
         bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        My Assets
        {userData && (
          <p className="text-base justify-around items-start text-white/90 dark:text-gray-400 flex gap-4">
            <span className="font-bold">Name: &nbsp;{userData.userName}  </span>
            <span className="font-bold">Employee Number:  &nbsp;{userData.userId} </span> 
            <span className="font-bold">Email: &nbsp;{userData.userMail.toLowerCase()} </span>
            
          </p>
        )}
      </div>
      

      <div className="flex">
        <FormError message={error} />
        <main className="flex-1 p-4">
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">PCs</CardTitle>
                <ComputerIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#4338CA]">{computerCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Printers</CardTitle>
                <PrinterIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6D28D9]">{printerCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Laptops</CardTitle>
                <LaptopIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#4338CA]">{laptopCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Servers</CardTitle>
                <ServerIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6D28D9]">{serverCount}</div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 md:mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Asset Model Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset: Asset, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {imageCategoryMap[asset.category]}
                          {asset.category}
                        </div>
                      </TableCell>
                      <TableCell>{asset.category}</TableCell>
                      <TableCell>{asset.locationName}</TableCell>
                      <TableCell>{asset.assetModalName}</TableCell>
                      <TableCell>{asset.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
