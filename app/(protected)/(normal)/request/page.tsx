"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import FormError from "@/components/form-error";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserData } from "@/schemas";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/table/data-table";
import { PrinterDataProps } from "@/schemas/printerSchema";
import CatridgeForm from "./_components/catridge-form";
import { PendingCatridgeRequestProps } from "@/schemas/requests";
import { parseToken } from "@/lib/parseToken";

// Function to update the display property based on transactions
function updateCartridgeDisplay(
  transactions: PendingCatridgeRequestProps[],
  printerData: PrinterDataProps[]
): PrinterDataProps[] {
  // Step 1: Create a Set of cartridge IDs with statusId 202
  const cartridgeIdsWithStatus202 = new Set(
    transactions
      .filter(transaction => transaction.statusId === 201) // statusId as string
      .map(transaction => transaction.cartridgeId) // cartridgeId as number
  );

  // Step 2: Map through each printer and update cartridges
  return printerData.map(printer => ({
    ...printer,
    cartridges: printer.cartridges.map(cartridge => ({
      ...cartridge,
      display: cartridgeIdsWithStatus202.has(cartridge.cartridgeId) ? false : true
    }))
  }));
}
export default function Home() {
  const [error, setError] = useState<string>(""); // State for error message
  const [assetData, setAssetData] = useState<PrinterDataProps[]>([]); // State for asset data
  const [userData, setUserData] = useState<UserData | null>(null); // State for user data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading indicator
  const [cartridgeHistory, setCartridgeHistory] = useState<PendingCatridgeRequestProps[]>([]);

  const[oldCartrridgeHasReturned, setOldCartridgeReturned]= useState<boolean>(true);

  useEffect(() => {
    //console.log('Fetching token...');
    const token = Cookies.get('token');
    if (!token) {
      setError("Token is missing or expired, Please reload");
      //console.error("Token is missing or expired.");
      return;
    }
    //console.log("Token found:", token);
    const parsedUserData = parseToken(token);
    //console.log("Parsed user data:", parsedUserData); // Log parsed user data
    setUserData(parsedUserData);
  }, []);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      //console.log('Fetching asset data...');
      const assetResponse = await axios.post('/api/requestcatridge', { token: Cookies.get('token') });
      console.log("Asset response:", assetResponse); // Log full asset response
      if (assetResponse.data.message === 'Success') {
        setAssetData(assetResponse.data.data);
      } else {
        //console.error(`Error ${assetResponse.status}:`, assetResponse.data.message || 'No asset data'); // Log error response
        setError(`Error ${assetResponse.status}: ${assetResponse.data.message || 'No asset data'}`);
      }
    } catch (error) {
      //console.error('Error fetching asset data:', error); // Log error if any
      setError("Failed to fetch asset data, Please reload again");
    }

    try {
      console.log('Fetching cartridge history...');
      const historyResponse = await axios.post('/api/cartridgehistory', { token: Cookies.get('token') });
      console.log("Cartridge history response:", historyResponse); // Log full history response
      setCartridgeHistory(historyResponse.data);
      console.log("history", historyResponse.data);
    } catch (error) {
      //console.error('Error fetching history data:', error); // Log error if any
      setError("Failed to fetch history data. Please reload");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) return; // Skip if user data is not yet fetched

    

    fetchData();
  }, [userData]); // Only re-run when userData changes
  const filteredData=updateCartridgeDisplay(cartridgeHistory, assetData);
  // Check if any entry of cartridgeReturn from the history and set boolean
  useEffect(() => {
    let hasReturned = true;

    for (let i = 0; i < cartridgeHistory.length; i++) {
      console.log("Cartridge Returned:", cartridgeHistory[i].cartridgeReturned);
      if (cartridgeHistory[i].cartridgeReturned === false) {
        hasReturned = false;
        break; // Exit early if a cartridge has been returned
      }
    }

    setOldCartridgeReturned(hasReturned);
    console.log("Old cartridges returned:", hasReturned);
  }, [cartridgeHistory]);
  //console.log("filtered data", filteredData);

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
                    <Input id="designation" defaultValue={userData?.userDesignation} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" type="text" defaultValue={userData?.userDepartment} disabled />
                  </div>
                </div>
                <CatridgeForm printers={filteredData} hasReturned={oldCartrridgeHasReturned}/>
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
