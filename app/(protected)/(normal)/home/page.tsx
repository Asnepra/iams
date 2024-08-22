"use client"



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
import toast from "react-hot-toast";

interface Asset {
  assetBatchId: number;
  assetMake: string;
  assetModel: string;
  categoryName: string;
}

interface UserData {
  userId: string;
  userName: string;
  isAdmin: string;
  userMail: string;
}

export default function Dashboard() {
  const [error, setError] = useState<string | undefined>("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [computerCount, setComputerCount] = useState<number>(0);
  const [printerCount, setPrinterCount] = useState<number>(0);
  const [userData, setUserData] = useState<UserData | null>(null);

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
        toast.error("Token Error");
        router.push("/");
        throw new Error('Token not found in cookies');
      }

      const parsedToken = parseToken(token);
      if (!parsedToken) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      setUserData(parsedToken);

      const body = { token: token };
      const response = await axios.post('/api/getassets', body)
      .then((response)=>{
        if(response.data.length>0){
        const assetData=response.data;
        //console.log("resopnse", response.data);
        setAssets(response.data);
        // Count the number of computers and printers
        const computerCount = assetData.filter((asset: { categoryName: string; }) => asset.categoryName === "COMPUTER").length;
        const printerCount = assetData.filter((asset: { categoryName: string; }) => asset.categoryName === "PRINTER").length;
        setComputerCount(computerCount);
        setPrinterCount(printerCount);
        }
        else{
          toast("There is not asset assigned to you");
        }
      })
      //console.log("response", response);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast.error("Error, Please try again");
      
    }
  };

  const imageCategoryMap: Record<string, JSX.Element> = {
    Computer: <ComputerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Printer: <PrinterIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Laptop: <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Server: <ServerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
  };

  return (
    <div className="h-auto flex flex-col bg-muted/40">
      <div className="text-2xl rounded-md px-4 text-white/90 
         bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        My Assets
        {userData && (
          <p className="text-lg flex justify-between text-white/90 dark:text-gray-400 gap-4">
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
          </div>
          <div className="flex items-center justify-around m-8">
            <Card className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Id</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead>Asset Model Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset: Asset, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {imageCategoryMap[asset.categoryName] || null}
                          #0000{asset.assetBatchId}
                        </div>
                      </TableCell>
                      <TableCell>{asset.categoryName}</TableCell>
                      <TableCell>{asset.assetMake}</TableCell>
                      <TableCell>{asset.assetModel}</TableCell>
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
