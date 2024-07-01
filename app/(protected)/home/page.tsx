"use client";
import {
  DeleteIcon,
  Trash2Icon,
  ComputerIcon,
  LaptopIcon,
  ServerIcon,
  PrinterIcon,
} from "lucide-react";



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import { useEffect, useState } from "react";
import axios from "axios";
import FormError from "@/components/form-error";

export default function Dashboard() {


  const [error, setError] = useState<string | undefined>("");
  const [assets, setAssets] = useState([]);
     // Map categories to respective icon components
  const imageCategoryMap: Record<string, JSX.Element> = {
    Computer: <ComputerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Laptop: <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Printer: <PrinterIcon className="w-4 4 text-gray-500 dark:text-gray-400" />,
    Server: <ServerIcon className="w-4 4 text-gray-500 dark:text-gray-400" />,
    // Add more mappings as needed
  };

  const [computerCount, setComputerCount] = useState<number>(1);
  const [printerCount, setPrinterCount] = useState<number>(1);
  const [laptopCount, setLaptopCount] = useState<number>(1);
  const [serverCount, setServerCount] = useState<number>(1);

  const router= useRouter();

  useEffect(()=>{
    getData();
  },[])



  const getData = async () => {
    const token = Cookies.get('token');

  

    try {
      const body={
        token:token
      }
      
      const res = await axios.post('/api/getassets',body)
      const data=res.data;
      // if(data.message==='Success'){
        
      // }
      // else{
      //   router.push("/");
      // }
      console.log("data response",data);
      
      setAssets(res.data); // Assuming res.data is an array of assets
      console.log(res.data);
      // Calculate counts for each category
      let compCount = 0;
      let printCount = 0;
      let lapCount = 0;
      let servCount = 0;

      res.data.forEach((asset: any) => {
        if (asset.category === "Computer") compCount++;
        else if (asset.category === "Printer") printCount++;
        else if (asset.category === "Laptop") lapCount++;
        else if (asset.category === "Server") servCount++;
      });

      // Set counts
      setComputerCount(compCount || 1); // Default to 1 if compCount is 0
      setPrinterCount(printCount || 0); // Default to 1 if printCount is 0
      setLaptopCount(lapCount || 0); // Default to 1 if lapCount is 0
      setServerCount(servCount || 0); // Default to 1 if servCount is 0
    } catch (error) {
      router.push("/")
      setError("Something happend, Please reload")
      console.error(error);
    }
  };

  
  

  return (
    <div className="mt-16 h-auto flex flex-col  md:ml-48 bg-muted/40">
      <div className="flex">
      <FormError message={error} />
        <main className="flex-1 p-4 ">
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
                <PrinterIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6D28D9]">120</div>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Laptops</CardTitle>
                <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#4338CA]">650</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued: 600 | Requested: 50
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Servers</CardTitle>
                <ServerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6D28D9]">25</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued: 20 | Requested: 5
                </p>
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
                  {assets.map((asset:any, index:any) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {/* Replace with actual image or icon */}
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
