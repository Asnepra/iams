import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PrinterDataProps } from "@/schemas/printerSchema";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import axios from "axios";


const CartridgeFormSchema = z.object({
  printerId: z.number().min(1, "Select a printer"),
  assetPrinterCartridgeMessage: z.string().min(1, "Please enter a message"),
});

interface CartridgeFormProps {
  printers: PrinterDataProps[];
}

const CartridgeForm: React.FC<CartridgeFormProps> = ({ printers }) => {
  const { control, handleSubmit, setValue, watch } = useForm<z.infer<typeof CartridgeFormSchema>>({
    resolver: zodResolver(CartridgeFormSchema),
    defaultValues: {
      printerId: -1,
      assetPrinterCartridgeMessage: "",
    },
  });

  const selectedPrinterId = watch("printerId");
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
    const token = Cookies.get('token');
    // Implement form submission logic here
    try {
      const data = {
        token:token,
        printerId: values.printerId,
        cartridges: Object.entries(catrdiDoeID)
          .filter(([_, isChecked]) => isChecked)
          .map(([cartridgeId]) => ({ cartridgeId })),
        assetPrinterCartridgeMessage: values.assetPrinterCartridgeMessage,
      };

      console.log("data", data);
      axios.post('/api/requestedCatridges', data )
      .then(response => {
        const data = response.data;
        console.log("data", data);
        //setAssetData(data);
        toast.success("Request raised Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        //console.error('Error fetching asset data:', error);
        //setError("Failed to fetch asset data.");
        toast.error("Some issue please try again")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .finally(() => {
        //setIsLoading(false);
      });
      

    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error("Failed to add asset. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="printerId"
        control={control}
        render={({ field }) => (
          <div>
            <label>Select A Printer</label>
            <Select
              onValueChange={(value) => {
                const valueAsNumber = Number(value);
                field.onChange(valueAsNumber);
                setValue("printerId", valueAsNumber);
              }}
              value={field.value.toString()}
            >
              <SelectTrigger>
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
          </div>
        )}
      />

      {selectedPrinterId !== -1 && (
        <>
          <div className="grid grid-cols-2 gap-6">
            {printers.find(printer => printer.assetBatchId === selectedPrinterId)?.cartridges.map(cartridge => (
              <div key={cartridge.cartridgeId} className="flex items-center space-x-3">
                <Checkbox
                  checked={catrdiDoeID[cartridge.cartridgeId] || false}
                  onCheckedChange={(value) => setCatrdiDoeID(prevState => ({
                    ...prevState,
                    [cartridge.cartridgeId]: value === true
                  }))}
                  disabled={cartridge.stock === 0}  // Disable checkbox if stock is 0
                />
                <div className="flex-1 space-x-2">
                  <Label>{cartridge.cartridgeDescription}</Label>
                  <span>({cartridge.stock})</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Controller
              name="assetPrinterCartridgeMessage"
              control={control}
              render={({ field }) => (
                <div>
                  <label>Reason for Request</label>
                  <Textarea
                    placeholder="Request for a new cartridge"
                    {...field}
                  />
                </div>
              )}
            />
          </div>
        </>
      )}

      <Button type="submit">Request Cartridge</Button>
    </form>
  );
};

export default CartridgeForm;
