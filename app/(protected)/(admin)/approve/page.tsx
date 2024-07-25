
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {DataTable} from "../../(normal)/request/_components/data-table";
import { columns } from "../../(normal)/request/_components/columns";
import TicketCard from "./_components/ticketinformation";
import { CartridgeApprovalProps } from "@/schemas/printerSchema";
import { HistoryDialog } from "./_components/dialog-history";
import { useNewAccount } from "./_components/hooks/use-new-accounts";

export default function ApproveScreen() {
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any>(null); 
  const [cartridgeHistory, setCartridgeHistory] = useState([
    {
      id: "1",
      printerModel: "HP LaserJet Pro",
      quantity: "2",
      reason: "Printer ran out of ink",
      requestedOn: "2023-05-15",
      status: "Fulfilled",
    },
    {
      id: "2",
      printerModel: "Canon PIXMA",
      quantity: "1",
      reason: "Printer cartridge is low",
      requestedOn: "2023-03-20",
      status: "Fulfilled",
    },
    {
      id: "3",
      printerModel: "Epson WorkForce",
      quantity: "4",
      reason: "Printer cartridge is empty",
      requestedOn: "2023-01-10",
      status: "Pending",
    },
    {
      id: "4",
      printerModel: "Brother MFC",
      quantity: "1",
      reason: "Printer cartridge is low",
      requestedOn: "2022-11-05",
      status: "Fulfilled",
    },
  ]);

  const [pendingRequests, setPendingRequests] = useState<CartridgeApprovalProps[]>([
    {
      requestId: "REQ001",
      cartridgeId: 123,
      cartridgeDescription: "CYAN 25X15X2",
      requesterName: "John Doe",
      profilePic: "https://example.com/profile-pic.jpg",
      requesterGrade: "Senior Engineer",
      requestedOn: "2024-07-25T09:00:00Z",
      reason: "Need replacement cartridge for urgent printing tasks.",
      reqeusterGrade: ""
    },
    {
      requestId: "REQ002",
      cartridgeId: 456,
      cartridgeDescription: "MAGENTA 30X20X2",
      requesterName: "Jane Smith",
      profilePic: "https://example.com/jane-profile-pic.jpg",
      requesterGrade: "Junior Developer",
      requestedOn: "2024-07-24T14:30:00Z",
      reason: "Running low on ink, need additional cartridge for upcoming project.",
      reqeusterGrade: ""
    },
    // Add more dummy data objects as needed
  ]);

  const handleApprove = (id: string) => {
    
    // Assuming you want to remove the request from pending after approval
    const updatedRequests = pendingRequests.filter((request) => request.requestId !== id);
    setPendingRequests(updatedRequests);

    // Add the approved request to history
    const approvedRequest = pendingRequests.find((request) => request.requestId === id);
    if (approvedRequest) {
      setCartridgeHistory([...cartridgeHistory, {
        ...approvedRequest, status: "Approved",
        id: "",
        printerModel: "",
        quantity: ""
      }]);
    }
  };

  const handleReject = (id: string) => {
    // Assuming you want to remove the request from pending after rejection
    const updatedRequests = pendingRequests.filter((request) => request.requestId !== id);
    setPendingRequests(updatedRequests);

    // Add the rejected request to history
    const rejectedRequest = pendingRequests.find((request) => request.requestId === id);
    if (rejectedRequest) {
      setCartridgeHistory([...cartridgeHistory, {
        ...rejectedRequest, status: "Rejected",
        id: "",
        printerModel: "",
        quantity: ""
      }]);
    }
  };
  const handleHistory = (id: string) => {
    const selected = cartridgeHistory.find((item) => item.id === id);
    if (selected) {
      setSelectedHistory(selected);
      setIsHistoryDialogOpen(true);
    }
  };
  const {onOpen} = useNewAccount();

  return (
    <div className="">
      <div>
        <main className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-2">
            <div>
              <TicketCard />
              <Button onClick={onOpen}>Sheet</Button>
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
                      {pendingRequests.map((request) => (
                        <TableRow key={request.requestId}>
                          <TableCell className="font-medium">{request.cartridgeDescription}</TableCell>
                          <TableCell>{request.requesterName}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleApprove(request.requestId)}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="ml-2" onClick={() => handleReject(request.requestId)}>
                              Reject
                            </Button>
                            <Button variant="outline" size="sm" className="ml-2" onClick={() => handleHistory(request.requestId)}>
                              History
                            </Button>
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
                  <DataTable columns={columns} data={cartridgeHistory} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <HistoryDialog />

    </div>
  );
}
