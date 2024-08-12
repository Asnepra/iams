import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PrinterDataProps } from "@/schemas/printerSchema";



const CartridgeFormSchema = z.object({
  printerId: z.string().min(1, "Select a printer"),
  blackCartridge: z.boolean().default(false).optional(),
  cyanCartridge: z.boolean().default(false).optional(),
  magentaCartridge: z.boolean().default(false).optional(),
  yellowCartridge: z.boolean().default(false).optional(),
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
      blackCartridge: false,
      cyanCartridge: false,
      magentaCartridge: false,
      yellowCartridge: false,
      assetPrinterCartridgeMessage: "",
    },
  });

  const { watch, handleSubmit, setValue, control } = form;
  const selectedPrinterId = watch("printerId");
  const selectedPrinter = printers.find(printer => printer.printerId === selectedPrinterId);

  const onSubmit = async (values: z.infer<typeof CartridgeFormSchema>) => {
    try {
      const data = {
        printerId: values.printerId,
        cartridges: {
          blackCartridge: values.blackCartridge,
          cyanCartridge: values.cyanCartridge,
          magentaCartridge: values.magentaCartridge,
          yellowCartridge: values.yellowCartridge,
        },
        assetPrinterCartridgeMessage: values.assetPrinterCartridgeMessage,
      };
      console.log("data", data);

    //   await axios.post(`/api/assetmaster`, data);
    //   toast.success("Data Added Successfully!");

    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 3000); // Refresh page after 3 seconds
    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error("Failed to add asset. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <FormField
          control={control}
          name="printerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select A Printer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue("printerId", value); // Ensure value is set correctly
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a printer..." />
                    <SelectContent>
                      {printers.map(printer => (
                        <SelectItem
                          key={printer.printerId}
                          value={printer.printerId}
                        >
                          {printer.printerName}
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
                  control={control}
                  name={`${cartridge.cartridgeId}Cartridge` as CartridgeKeys}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex-1 space-x-2">
                          <FormLabel className="inline">{cartridge.cartridgeName}</FormLabel>
                          <span className="text-sm text-gray-500">({cartridge.quantity})</span>
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
              control={control}
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
