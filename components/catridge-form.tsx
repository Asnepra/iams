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

interface CatridgeFormProps {
  isUpdate: boolean;
  catrdigeName?:string;
}

const CatridgeForm = ({ isUpdate, catrdigeName }: CatridgeFormProps) => {
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
console.log("values from form", values);
    const url = isUpdate ? "/api/updateStock" : "/api/addCartridge";

    // try {
    //   const response = await axios.post(url, values);
    //   const data = response.data;
    //   if (data.message === 'Login Failed') {
    //     setError("Login Failed");
    //   } else {
    //     const { token } = data;
    //     document.cookie = `token=${token}; path=/`;
    //     router.push('/home');
    //     setSuccess("Operation successful");
    //     form.reset();
    //   }
    // } catch (err) {
    //   setError("Something went wrong.");
    // } finally {
    //   setIsPending(false);
    // }
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

        {error && <FormMessage>{error}</FormMessage>}
        {success && <FormMessage>{success}</FormMessage>}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isUpdate ? "Update Stock" : "Add Cartridge to Inventory"}
        </Button>
      </form>
    </Form>
  );
};

export default CatridgeForm;
