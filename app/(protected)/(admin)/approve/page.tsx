"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CartridgeApprovalProps } from "@/schemas/printerSchema";
import { getFullProfileUrl, parseToken } from "@/lib/parseToken";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { UserDataType } from "@/schemas";
import axios from "axios";
import { PendingCatridgeRequestProps } from "@/schemas/requests";
import { DialogButton } from "./_components/custom-dialog";
import { formatDate } from "@/lib/utils";

export default function CatridgeScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [pendingRequests, setPendingRequests] = useState<PendingCatridgeRequestProps[] | null>([]);

  const getToken = (): string | null => {
    const token = Cookies.get('token');
    return token ?? null; // Return null if token is undefined
  };
  

  const getData = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      const parsedToken = parseToken(token);
      if (!parsedToken) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      setUserData(parsedToken); // Set user data in state

      const response = await axios.post('/api/pendingRequest', { token });
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      toast.error("Error fetching pending requests");
    }
  };
  

  const handleApprove = async (id: string, reason: string) => {
    try {
      //console.log("id and then reason",id, reason);

      const token = getToken();
      if (!token) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      const response = await axios.post('/api/approveCatridges', {
        token,
        transId: id,
        reason,
        rejected: false // Indicating this is an approval request
      });

      if (response.status === 200) {
        toast.success("Request approved successfully");
        getData(); // Refresh pending requests
      } else {
        toast.error("Failed to approve request");
      }
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error("Error approving request");
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {

      console.log("id and then reason",id, reason);
      const token = getToken();
      if (!token) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      const response = await axios.post('/api/approveCatridges', {
        token,
        transId: id,
        reason,
        rejected: true // Indicating this is a rejection request
      });

      if (response.status === 200) {
        toast.success("Request rejected successfully");
        getData(); // Refresh pending requests
      } else {
        toast.error("Failed to reject request");
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error("Error rejecting request");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div>
        <main className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-2">
            <div className="font-bold text-2xl">
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
                          <TableCell className="flex items-center p-3 font-semibold">
                            <img
                              alt="employee Pic"
                              src={getFullProfileUrl(request.requestedBy)}
                              width={40}
                              height={40}
                              className="w-12 h-12 rounded-full"
                            />
                            {request.requesterName}
                          </TableCell>
                          <TableCell>{formatDate(request.requestedOn)}</TableCell>
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
                              onClose={handleReject}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
