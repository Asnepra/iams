"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { columns } from "./columns";




import { DataTable } from "@/components/table/data-table";

import axios from "axios";
import { UserData } from "@/schemas";
import { IAMS_CATRIDGE } from "@/schemas/printerSchema";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { UpdateDialog } from "@/components/update-dialog";
import { parseToken } from "@/lib/parseToken";
import { useRouter } from "next/navigation";
import { DownloadIcon } from "lucide-react";
import Papa from "papaparse";
import { formatDate } from "@/lib/utils";


const AccountsPage = () => {
  //const newAccount = useNewAccount();
  //const deleteAccounts = useBulkDeleteAccounts()
  //const accountsQuery = useGetAccounts();
  const [error, setError] = useState<string | undefined>("");
    const [assets, setAssets] = useState<IAMS_CATRIDGE[]>([]);
    const [userData, setUserData] = useState<UserData | null>(null); // State for user data
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    

    useEffect(() => {
      getData();
    }, []);

    const exportToExcel = () => {
      const csvData = assets.map(item => ({
        CartridgeID: item.id ?? 'N/A',
        CartridgeName: item.catrdigeDescription ?? 'N/A',
        Stock: item.stock ?? 'N/A',
        UpdatedByEmp:item.updatedBy,
        UpdatedByName: item.updatedByName ?? 'N/A',
        UpdatedOn: item.updatedOn ? formatDate(item.updatedOn) : 'N/A'

      }));
    
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `Cartridge_Reports.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    

    const getData = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) {
            toast.error("Token Error")
            //router.push("/");
            //throw new Error('Token not found in cookies');
          }
    
          const parsedToken = parseToken(token as string);
          if (!parsedToken) {
            toast.error("Token Error")
            router.push("/");
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
            //setError("Error fetching assets. Please try again.");
            //router.push("/");
            toast.error("Error fetching assets");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
        }catch(error) {
          console.error('Error fetching assets:', error);
          toast.error("Error fetching assets");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          //setError("Error fetching assets. Please try again.");
          //router.push("/");
        }
      }
      


 

  return (
    <div className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Add Catridge Stock page</CardTitle>
          <div className="flex items-center space-x-2">
            <UpdateDialog title={"Add Catridge"} add={true}/>
            <Button onClick={exportToExcel} className="bg-sky-500 hover:bg-sky-800">
            <DownloadIcon className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
          </div>
          
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={assets}
            filterKey="catrdigeDescription"
            filterString="Catridge Name"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;