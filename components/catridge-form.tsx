import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartridgeSchemaStockAdd, CartridgeSchemaStockUpdate } from "@/schemas/printerSchema";
import { useState } from "react";
import { Label } from "./ui/label";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

interface CatridgeFormProps {
  isUpdate: boolean;
  catrdigeName?:string;
  catridgeId?:string;
  oldValue?:number;
}

const CatridgeForm = ({ isUpdate, catrdigeName, catridgeId, oldValue }: CatridgeFormProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  

  const form = useForm({
    resolver: isUpdate ? zodResolver(CartridgeSchemaStockUpdate) : zodResolver(CartridgeSchemaStockAdd),
    defaultValues: isUpdate ? { cartridgeQuantity: "" } : { cartridgeName: "", cartridgeQuantity: "" },
  });

  const onSubmit = async (values: any) => {
    setIsPending(true);
  
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Token not found in cookies');
      }
  
      // Build the body object based on whether it's an update or add operation
      const body = isUpdate
        ? { cartridgeQuantity: values.cartridgeQuantity, token, catridgeId }
        : { cartridgeName: values.cartridgeName, cartridgeQuantity: values.cartridgeQuantity, token };
      const url = isUpdate ? `/api/updateCatridgeInventory` : `/api/addCatridgeModel`;
      console.log("body",body);
  
      const response = await axios.post(url, body)
      .then((response)=>{
        toast.success("Successfully added");
        //reload page after 3 seconds
        // Delayed page reload after 3 seconds
      setTimeout(() => {
        location.reload();

      }, 2000);

      }).catch((error)=>{
        console.log('error',error);
        toast.error("Something unexpected Happen, redirecting...");
        setTimeout(() => {
          location.reload();

        }, 2000);
      });
      //console.log("API response", response.data);
  
      //setSuccess("Operation successful");
      form.reset();
  
    } catch (error) {
      //console.error("Error in Axios request", error);
      //setError("Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {isUpdate ? (
          <>
          <div className="grid grid-cols-4 items-center gap-4">

          <Label>Cartridge Name</Label>
          
            <Label className="md:col-span-3">{catrdigeName}</Label>
                       
          </div>
          <FormField
            control={form.control}
            name="cartridgeQuantity"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Cartridge Quantity</FormLabel>
                <FormControl>
                  <Input className="md:col-span-3"
                    placeholder={`Enter quantity, existing quantity ${oldValue} is going to be added to entered Value`}
                    {...field}
                    type="number"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                </div>
              </FormItem>
            )}
          />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="cartridgeName"
              render={({ field }) => (

                <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">

                  <FormLabel>Cartridge Name</FormLabel>
                  <FormControl>
                    <Input className="md:col-span-3"
                      placeholder="Enter name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  </div>
                </FormItem>
                
              )}
            />
            <FormField
              control={form.control}
              name="cartridgeQuantity"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Cartridge Quantity</FormLabel>
                  <FormControl>
                    <Input className="md:col-span-3"
                      placeholder="Enter quantity"
                      {...field}
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isUpdate ? "Add Stock" : "Add Cartridge to Inventory"}
        </Button>
      </form>
    </Form>
  );
};

export default CatridgeForm;
