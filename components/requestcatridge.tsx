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
import { UserData } from "@/schemas";

interface AssetFormProps {
  assetData?: {
    assetId: number;
    assetModelId: number;
    status: string;
    assetModelName: string;
  }[];
  userData?: UserData | null;
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

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ];

  

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
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select catridge type</FormLabel>
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
                          placeholder="Select a catridge..."
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you need a new cartridge"
              {...form.register("assetPrinterCatridgeMessage")}
            />
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
