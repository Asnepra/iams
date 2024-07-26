"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";

import { columns } from "./columns";


import { Skeleton } from "@/components/ui/skeleton";

import { DataTable } from "@/components/table/data-table";
import { useNewAccount } from "@/hooks/use-new-accounts";
import axios from "axios";
import { UserData } from "@/schemas";
import { CARTRIDGE_DESCRIPTION_STRING, CartridgeApprovalProps, CartridgeType, IAMS_CATRIDGE } from "@/schemas/printerSchema";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';


const AccountsPage = () => {
  const newAccount = useNewAccount();
  //const deleteAccounts = useBulkDeleteAccounts()
  //const accountsQuery = useGetAccounts();
  const [error, setError] = useState<string | undefined>("");
    const [assets, setAssets] = useState<IAMS_CATRIDGE[]>([]);
    const [userData, setUserData] = useState<UserData | null>(null); // State for user data
    const [isLoading, setIsLoading] = useState(true);
    

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
            toast.error("Token Error")
            //router.push("/");
            throw new Error('Token not found in cookies');
          }
    
          const parsedToken = parseToken(token);
          if (!parsedToken) {
            toast.error("Token Error")
           // router.push("/");
            //throw new Error('Unable to parse token');
          }
          setUserData(parsedToken); // Set user data in state
    
          const body = { token: token };


          axios.post('/api/getCatridgeInventory', body)
          .then(async (response:any) => {
            const data = response.data;
            // Use camelCase keys in data processing
            setAssets(data);
            console.log("data cartridge", data);
          })
          .catch(error => {
            console.error('Error fetching assets:', error);
            setError("Error fetching assets. Please try again.");
            //router.push("/");
          });
        }catch(error) {
          console.error('Error fetching assets:', error);
          setError("Error fetching assets. Please try again.");
          //router.push("/");
        }
      }


 

  return (
    <div className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Add Catridge Stock page</CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={assets}
            filterKey={CARTRIDGE_DESCRIPTION_STRING}
            // onDelete={(row) => {
            //   const ids = row.map((r) =>  r.original.id)
            //   deleteAccounts.mutate({ ids })
            // }}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;