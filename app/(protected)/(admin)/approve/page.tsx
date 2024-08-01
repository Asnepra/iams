
"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {DataTable} from "../../(normal)/request/_components/data-table";
import { columns } from "../../(normal)/request/_components/columns";

import { CartridgeApprovalProps } from "@/schemas/printerSchema";

import { getFullProfileUrl, parseToken } from "@/lib/parseToken";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { UserDataType } from "@/schemas";
import axios from "axios";
import { PendingCatridgeRequestProps } from "@/schemas/requests";
import { url } from "inspector";
import { DialogButton } from "./_components/custom-dialog";

export default function CatridgeScreen() {

  const router=useRouter();

  const [userData, setUserData]= useState<UserDataType | null>(null);
  const [pendingRequests, setPendingRequests] = useState<PendingCatridgeRequestProps[] | null>([]);



  const handleApprove = (id: string, reason:string) => {
    console.log("cliecke on trbnas id ---", id, reason);
    
  };

  const handleReject = (id: string) => {
    
  };
  const handleHistory = (id: string) => {
    
  };

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Error")
        router.push("/");
        throw new Error('Token not found in cookies');
      }

      const parsedToken = parseToken(token);
      if (!parsedToken) {
        toast.error("Token Error")
        router.push("/");
        //throw new Error('Unable to parse token');
      }

      setUserData(parsedToken); // Set user data in state

      const body = { token: token };
      const response = await axios.post('/api/pendingRequest', body)
      .then((response)=>{
        console.log("Pending Requests", response.data);
        setPendingRequests(response.data);
      });
    } catch (error) {
      console.error('Error fetching assets:', error);
      //setError("Error fetching assets. Please try again.");
      //router.push("/");
    }
  };
  

  return (
    <div className="">
      <div>
        <main className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-2">
            <div>
              {userData?.userName}
            </div>
          </div>
          <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-4">
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                  <TableHeader>
                      <TableRow>
                        <TableHead>Pending ID</TableHead>
                        <TableHead>Asset Name</TableHead>
                        <TableHead>Cartridge</TableHead>
                        <TableHead>Requested Qty</TableHead>
                        <TableHead>Requested By</TableHead>
                        <TableHead>Requested On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {pendingRequests?.map((request) => (
                        <TableRow key={request.transId}>
                          <TableCell className="font-medium">P#0000{request.transId}</TableCell>
                          <TableCell>{request.assetId}</TableCell>
                          <TableCell>{request.cartridgeDescription}</TableCell>
                          <TableCell>{request.requestedQty}</TableCell>
                          <TableCell className="flex items-center p-3">
                          <img
                              alt="employee Pic"
                              src={getFullProfileUrl(request.requestedBy)} // Correct URL for employee image
                              //correct url is url+erequestorID
                              width={40} // Adjust size as needed
                              height={40}
                              className="w-12 h-12 rounded-full"                            />
                          
                            {request.requesterName}
                          </TableCell>
                          <TableCell>{request.requestedOn}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <DialogButton
                              title={'Approve'}
                              id={request.transId}
                              description={`Please provide a reason`}
                              onClose={handleApprove}
                            />
                            <DialogButton
                              title={'Reject'}
                              id={request.transId}
                              description={`Please provide a reason`}
                              onClose={handleApprove}
                            />
                            
                            
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>History of Cartridges</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <DataTable columns={columns} data={cartridgeHistory} /> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      

    </div>
  );
}
