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
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

const CartridgeFormSchema = z.object({
  printerId: z.number().min("Select a printer"),
  assetPrinterCartridgeMessage: z.string().min(1, "Please enter a message"),
});

interface CartridgeFormProps {
  printers: PrinterDataProps[];
}

const CartridgeForm: React.FC<CartridgeFormProps> = ({ printers }) => {
  const token = Cookies.get('token');
  const form = useForm<z.infer<typeof CartridgeFormSchema>>({
    resolver: zodResolver(CartridgeFormSchema),
    defaultValues: {
      printerId: -1,
      assetPrinterCartridgeMessage: "",
    },
  });

  const [selectedPrinterId, setSelectedPrinterId] = useState<number | undefined>(form.getValues().printerId);
  const [catrdiDoeID, setCatrdiDoeID] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const selectedPrinter = printers.find(printer => printer.assetBatchId === selectedPrinterId);
    if (selectedPrinter) {
      const initialCartridgesState = selectedPrinter.cartridges.reduce((acc, cartridge) => {
        acc[cartridge.cartridgeId] = false;
        return acc;
      }, {} as Record<number, boolean>);
      setCatrdiDoeID(initialCartridgesState);
    }
  }, [selectedPrinterId, printers]);

  const onSubmit = async (values: z.infer<typeof CartridgeFormSchema>) => {
    try {
      const data = {
        printerId: values.printerId,
        cartridges: Object.entries(catrdiDoeID)
          .filter(([_, isChecked]) => isChecked)
          .map(([cartridgeId]) => ({ cartridgeId })),
        assetPrinterCartridgeMessage: values.assetPrinterCartridgeMessage,
      };

      console.log("data", data);

      // Uncomment to make the API request
      // await axios.post(`/api/assetmaster`, data, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      toast.success("Data Added Successfully!");

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
          name="printerId" // Ensure this matches the schema
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select A Printer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const valueAsNumber = Number(value); // Convert to number
                    field.onChange(valueAsNumber);
                    setSelectedPrinterId(valueAsNumber);
                  }}
                  value={field.value.toString()} // Convert to string for Select component
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a printer..." />
                    <SelectContent>
                      {printers.map(printer => (
                        <SelectItem
                          key={printer.assetBatchId}
                          value={printer.assetBatchId.toString()} // Convert to string
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

        {selectedPrinterId !== undefined && (
          <>
            <div className="grid grid-cols-2 gap-6 justify-around">
              {printers.find(printer => printer.assetBatchId === selectedPrinterId)?.cartridges.map(cartridge => (
                <div key={cartridge.cartridgeId} className="flex items-center space-x-3">
                  <Checkbox
                    checked={catrdiDoeID[cartridge.cartridgeId] || false}
                    onCheckedChange={(value) => setCatrdiDoeID(prevState => ({
                      ...prevState,
                      [cartridge.cartridgeId]: value === true
                    }))}
                  />
                  <div className="flex-1 space-x-2">
                    <Label className="inline">{cartridge.cartridgeDescription}</Label>
                    <span className="text-sm text-gray-500">({cartridge.stock})</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="assetPrinterCartridgeMessage" // Ensure this matches the schema
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
