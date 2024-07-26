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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CartridgeProps, UserData } from "@/schemas";
import { Input } from "@/components/ui/input";
import { CartridgeSchema, CartridgeType } from "@/schemas/printerSchema";


interface AddStockCatridgeFormProps {
  data: CartridgeType[];
}

const AddStockCatridgeForm = ({ data }: AddStockCatridgeFormProps) => {
  //console.log("passed data", data);
  const token = Cookies.get('token');
  const form = useForm<z.infer<typeof CartridgeSchema>>({
    resolver: zodResolver(CartridgeSchema),
    defaultValues: {
      assetId: "",
      assetPrinterCatridgeMessage: "",
      assetPrinterCatridgeQuantity: "",
    },
  });


  function onCategoryChange(value:any) {
   
    }

  const onSubmit = async (values: z.infer<typeof CartridgeSchema>) => {
    try {
      const data = {
        assetPrinterId: values.assetId,
        assetPrinterCartridgeMessage: values.assetPrinterCatridgeMessage,
        assetPrinterCartridgeQuantity: Number(values.assetPrinterCatridgeQuantity) // Ensure quantity is parsed to number
        // Add more fields as needed
      };

      // Simulate API call
      // const response = await axios.post(`/api/assetmaster`, data);
      toast.success("Data Added Successfully!");
      console.log("Success!", data);

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
                <FormLabel>Asset List</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                     onCategoryChange(value); 
                    }
                  }
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a category..."
                        defaultValue={field.value || ""} // Set default value to an empty string
                      />
                      <SelectContent>
                        {data?.map((category) => (
                          <SelectItem
                            key={category.catridgeId}
                            value={category.catridgeId.toString()}
                          >
                            {category.catridgeDescription}
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
              name="assetPrinterCatridgeQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1"
                      {...field}
                      type="number"
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="assetPrinterCatridgeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            
          <Button type="submit" className="w-full">
            Add to Stock Cartridge
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddStockCatridgeForm;
