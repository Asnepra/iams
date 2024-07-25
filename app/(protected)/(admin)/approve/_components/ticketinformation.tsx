import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TicketCard() {
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

  const handleApprove = (id: string) => {
    // Logic for approving the request
    console.log(`Approving request with ID ${id}`);
  };

  const handleReject = (id: string) => {
    // Logic for rejecting the request
    console.log(`Rejecting request with ID ${id}`);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="grid md:grid-cols-1 gap-2">
                    <Card className="bg-purple-100">
                        <CardHeader>
                            <CardTitle>Pending Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">2</div>
                        </CardContent>
                        </Card>
                        
                        <Card className="bg-orange-100">
                        <CardHeader>
                            <CardTitle>Total Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                            10
                            </div>
                        </CardContent>
                    </Card>
                </div>
                    <Card className="p-2 bg-white rounded-lg shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                        <span>Approved so far</span>
                        <span>1,552</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-purple-100 rounded-lg">
                        <span>Requested So far</span>
                        <span>1,552</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-pink-100 rounded-lg">
                        <span>Request Declined So far</span>
                        <span>1,552</span>
                        </div>
                        
                    </CardContent>
                    </Card>
            
            

              
            </div>
    </div>
  );
}
