
"use client"
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema using zod for form validation
const schema = z.object({
  printerModel: z.string().nonempty(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  reason: z.string().min(10, { message: "Reason must be at least 10 characters long" }),
});

export default function Component() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const [cartridgeHistory, setCartridgeHistory] = useState([
    {
      id: 1,
      printerModel: "HP LaserJet Pro",
      quantity: 2,
      reason: "Printer ran out of ink",
      requestedAt: "2023-05-15",
      status: "Fulfilled",
    },
    {
      id: 2,
      printerModel: "Canon PIXMA",
      quantity: 1,
      reason: "Printer cartridge is low",
      requestedAt: "2023-03-20",
      status: "Fulfilled",
    },
    {
      id: 3,
      printerModel: "Epson WorkForce",
      quantity: 3,
      reason: "Printer cartridge is empty",
      requestedAt: "2023-01-10",
      status: "Pending",
    },
    {
      id: 4,
      printerModel: "Brother MFC",
      quantity: 1,
      reason: "Printer cartridge is low",
      requestedAt: "2022-11-05",
      status: "Fulfilled",
    },
  ]);

  const onSubmit = (data: { printerModel: any; quantity: string; reason: any; }) => {
    console.log(data); // Replace with your submission logic
    // Example logic to add new request to history (for demonstration)
    const newRequest = {
      id: cartridgeHistory.length + 1,
      printerModel: data.printerModel,
      quantity: parseInt(data.quantity),
      reason: data.reason,
      requestedAt: new Date().toLocaleDateString(),
      status: "Pending",
    };
    setCartridgeHistory([...cartridgeHistory, newRequest]);
  };

  return (
    <div className="mt-16 p-4 flex flex-col md:ml-48 justify-center items-center space-y-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">Request Printer Cartridge</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Fill out the form below to request a new printer cartridge for your IT assets.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="printer-model">Printer Model</Label>
                <Select id="printer-model" {...register("printerModel")} error={errors?.printerModel?.message}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select printer model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hp-laserjet-pro">HP LaserJet Pro</SelectItem>
                    <SelectItem value="canon-pixma">Canon PIXMA</SelectItem>
                    <SelectItem value="epson-workforce">Epson WorkForce</SelectItem>
                    <SelectItem value="brother-mfc">Brother MFC</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.printerModel && <span className="text-red-500">{errors.printerModel.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  {...register("quantity")}
                  error={errors?.quantity?.message}
                />
                {errors?.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request</Label>
              <Textarea
                id="reason"
                placeholder="Explain why you need a new cartridge"
                {...register("reason")}
                error={errors?.reason?.message}
              />
              {errors?.reason && <span className="text-red-500">{errors.reason.message}</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 w-full max-w-screen-xl">
        <h2 className="text-lg font-medium mb-4">Cartridge Request History</h2>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Printer Model</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartridgeHistory.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.printerModel}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.requestedAt}</TableCell>
                <TableCell>
                  <Badge
                    variant={request.status === "Fulfilled" ? "success" : "warning"}
                    className={`text-white ${
                      request.status === "Fulfilled" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
