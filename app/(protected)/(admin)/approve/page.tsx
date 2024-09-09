"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getFullProfileUrl, parseToken } from "@/lib/parseToken";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { UserDataType } from "@/schemas";
import axios from "axios";
import { PendingCatridgeRequestProps } from "@/schemas/requests";
import { DialogButton } from "./_components/custom-dialog";
import { formatDate } from "@/lib/utils";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CatridgeScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [pendingRequests, setPendingRequests] = useState<PendingCatridgeRequestProps[]>([]);

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

      //console.log

      console.log("pending", response.data);
      setPendingRequests(response.data);
    } catch (error) {
      toast.error("Error fetching pending requests");
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      const response = await axios.post('/api/approveCatridges', {
        token,
        transId: id,
        reason: "Approved",
        rejected: false // Indicating this is an approval request
      });

      if (response.status === 200) {
        toast.success("Request approved successfully");
        getData(); // Refresh pending requests
      } else {
        toast.error("Failed to approve request");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      toast.error("Error approving request");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
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
      toast.error("Error rejecting request");
    }
  };
  const handleChangeStatus = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Token Error");
        router.push("/");
        return;
      }

      const response = await axios.post('/api/catridgeReturnedYes', {
        token,
        transId: id,
      });

      if (response.status === 200) {
        toast.success("Status Changed successfully");
        //getData(); // Refresh pending requests
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error("Failed to change Status");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      toast.error("Error changing status");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <main className="flex flex-col gap-4">
        <div className="text-xl font-bold md:text-2xl">{userData?.userName}</div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pending ID</TableHead>
                    <TableHead>Printer</TableHead>
                    <TableHead>Cartridge</TableHead>
                    <TableHead>Avl. Qty</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Requested On</TableHead>
                    <TableHead>Returned Old</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.transId}>
                      <TableCell className="text-sm md:text-sm font-medium">P#00{request.transId}</TableCell>
                      <TableCell className="text-sm md:text-sm">{request.assetName}</TableCell>
                      <TableCell className="text-sm md:text-sm">{request.cartridgeDescription}</TableCell>
                      <TableCell className="text-sm md:text-sm">{request.availableQuantity}</TableCell>
                      <TableCell className="flex items-center space-x-2">
                        <img
                          alt="employee Pic"
                          src={getFullProfileUrl(request.requestedBy)}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="hidden sm:inline">{request.requesterName}</span>
                      </TableCell>
                      <TableCell className="text-sm md:text-sm">{formatDate(request.requestedOn)}</TableCell>
                      <TableCell className="text-sm md:text-sm mr-1 space-x-1">{request.cartridgeReturned ?"Yes": "No"}
                      <Badge
                          
                          onClick={() => handleChangeStatus(request.transId)}
                          className="ml-1"
                          variant="outline"
                        >
                          Change status
                        </Badge>
                      </TableCell>
                      <TableCell className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                          title="Approve"
                          onClick={() => handleApprove(request.transId)}
                          className="w-full sm:w-auto"
                        >
                          Approve
                        </Button>
                        <DialogButton
                          title="Reject"
                          id={request.transId}
                          description="Please provide a reason"
                          onClose={ handleReject}
                          
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-md">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                            >
                              Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
