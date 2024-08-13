import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PrinterDataProps } from "@/schemas/printerSchema";
import { useState } from "react";

const CartridgeFormSchema = z.object({
  printerId: z.string().min(1, "Select a printer"),
  assetPrinterCartridgeMessage: z.string().min(1, "Please enter a message"),
});

interface CartridgeFormProps {
  printers: PrinterDataProps[];
}

type CartridgeKeys = "blackCartridge" | "cyanCartridge" | "magentaCartridge" | "yellowCartridge";

const CartridgeForm: React.FC<CartridgeFormProps> = ({ printers }) => {
  const token = Cookies.get('token');
  const form = useForm<z.infer<typeof CartridgeFormSchema>>({
    resolver: zodResolver(CartridgeFormSchema),
    defaultValues: {
      printerId: "1",
      assetPrinterCartridgeMessage: "",
    },
  });

  const [selectedPrinterId, setSelectedPrinterId] = useState<string | undefined>(form.getValues().printerId);
  const selectedPrinter = printers.find(printer => printer.assetBatchId.toString() === selectedPrinterId);
  const [catrdiDoeID, setCatrodgeValue]= useState([]);// for each catridgeId and catridgeValue set the response for the selected printer

  const onSubmit = async (values: z.infer<typeof CartridgeFormSchema>) => {
    try {
      const data = {
        printerId: values.printerId,
        catridges:[selectedIdValue]
        assetPrinterCartridgeMessage: values.assetPrinterCartridgeMessage,
      };

      console.log("data", data);

      // Uncomment to make the API request
      // await axios.post(`/api/assetmaster`, data, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      toast.success("Data Added Successfully!");

      // Optional page reload or redirect
      // setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error("Failed to add asset. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="printerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select A Printer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedPrinterId(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a printer..." />
                    <SelectContent>
                      {printers.map(printer => (
                        <SelectItem
                          key={printer.assetBatchId}
                          value={printer.assetBatchId.toString()}
                        >
                          {printer.assetModel}
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

        {selectedPrinter && (
          <>
            <div className="grid grid-cols-2 gap-6 justify-around">
              {selectedPrinter.cartridges.map(cartridge => (
                <FormField
                  key={cartridge.cartridgeId}
                  control={form.control}
                  name={`${cartridge.cartridgeId}Cartridge` as CartridgeKeys}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(value) => field.onChange(value === true)}
                          />
                        </FormControl>
                        <div className="flex-1 space-x-2">
                          <FormLabel className="inline">{cartridge.cartridgeDescription}</FormLabel>
                          <span className="text-sm text-gray-500">({cartridge.stock})</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="assetPrinterCartridgeMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain why you need a new cartridge"
                        {...field}
                        className="textarea"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          Request Cartridge
        </Button>
      </form>
    </Form>
  );
};

export default CartridgeForm;
