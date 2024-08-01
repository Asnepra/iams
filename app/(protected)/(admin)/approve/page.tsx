
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {DataTable} from "../../(normal)/request/_components/data-table";
import { columns } from "../../(normal)/request/_components/columns";

import { CartridgeApprovalProps } from "@/schemas/printerSchema";

import { parseToken } from "@/lib/parsetoken";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { UserDataType } from "@/schemas";
import axios from "axios";
import { PendingCatridgeRequestProps } from "@/schemas/requests";

export default function CatridgeScreen() {

  const router=useRouter();

  const [userData, setUserData]= useState<UserDataType | null>(null);
  const [pendingRequests, setPendingRequests] = useState<PendingCatridgeRequestProps | null>(null);


  const handleApprove = (id: string) => {
    
    
  };

  const handleReject = (id: string) => {
    
  };
  const handleHistory = (id: string) => {
    
  };


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
        console.log("Pending Requests", response);
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
                        <TableHead>Cartridge</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* {pendingRequests?.map((request) => (
                        <TableRow key={request.ca}>
                          <TableCell className="font-medium">{request.cartridgeDescription}</TableCell>
                          <TableCell>{request.requesterName}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleApprove(request.requestId)}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="ml-2" onClick={() => handleReject(request.requestId)}>
                              Reject
                            </Button>
                            
                          </TableCell>
                        </TableRow>
                      ))} */}
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
