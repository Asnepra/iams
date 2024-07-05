import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface AssetFormProps {
  assetData?: {
    assetId: number;
    assetModelId: number;
    status: string;
    assetModelName: string;
  }[];
  userData?: {
    userId: string;
    userName: string;
    isAdmin: string;
    userMail: string;
    // Add other fields as needed
  } | null;
}

const assetSchema = z.object({
  assetId: z.string().min(1, {
    message: "Please select a printer.",
  }),
  assetQuantityNumber: z.number({
    message: "Please enter a valid asset serial number.",
  }),
  assetPrinterCatridgeMessage: z.string().min(2, {
    message: "Please enter a valid asset serial number.",
  }),
});

const RequestCatridgeForm = ({ assetData, userData }: AssetFormProps) => {
  const token = Cookies.get('token');
  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      assetId: "",
      assetQuantityNumber: 1,
      assetPrinterCatridgeMessage:"",
    },
  });

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

  const onCategoryChange = (value: any) => {
    // Implement your logic for category change
    // Ensure subcategoryData, setFilteredSubCategoryData, setSelectedCategory are defined
  };

  const onSubmit = async (values: z.infer<typeof assetSchema>) => {
    try {
      const data = {
        assetPrinterId: values.assetId,
        assetCatridgeNumber: values.assetQuantityNumber,
        // Add more fields as needed
      };

      const response = await axios.post(`/api/assetmaster`, data);
      toast.success("Data Added Successfully!");
      console.log("Success!", response);

      // Example: Refreshing history after successful submission
      setCartridgeHistory([...cartridgeHistory, {
        id: cartridgeHistory.length + 1,
        printerModel: assetData?.find(ad => ad.assetId === parseInt(values.assetId))?.assetModelName || "Unknown",
        quantity: parseInt(values.assetId),
        reason: "Requested new cartridge",
        requestedAt: new Date().toISOString().split('T')[0],
        status: "Pending",
      }]);

      setTimeout(() => {
        window.location.reload();
      }, 3000); // Refresh page after 3 seconds
    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error("Failed to add asset. Please try again.");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select A Printer</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onCategoryChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          placeholder="Select a printer..."
                          defaultValue={field.value || ""}
                        />
                        <SelectContent>
                          {assetData?.map((category) => (
                            <SelectItem
                              key={category.assetId}
                              value={category.assetModelName}
                            >
                              {category.assetModelName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assetQuantityNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you need a new cartridge"
              {...form.register("assetPrinterCatridgeMessage")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={userData?.userName} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={userData?.userMail?.toLowerCase()} disabled />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Request Cartridge
          </Button>
        </form>
      </Form>

    </>
  );
};

export default RequestCatridgeForm;
