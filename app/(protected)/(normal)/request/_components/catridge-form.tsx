import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PrinterDataProps } from "@/schemas/printerSchema";
import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import axios from "axios";
import FormError from "@/components/form-error";

const CartridgeFormSchema = z.object({
  printerId: z.number().min(1, "Select a printer"),
  assetPrinterCartridgeMessage: z.string().min(1, "Please enter a message"),
});

interface CartridgeFormProps {
  printers: PrinterDataProps[];
  hasReturned?:boolean;
}

const CartridgeForm: React.FC<CartridgeFormProps> = ({ printers, hasReturned }) => {
  const { control, handleSubmit, setValue, watch } = useForm<z.infer<typeof CartridgeFormSchema>>({
    resolver: zodResolver(CartridgeFormSchema),
    defaultValues: {
      printerId: -1,
      assetPrinterCartridgeMessage: "",
    },
  });

  const selectedPrinterId = watch("printerId");
  const [cartridgesState, setCartridgesState] = useState<Record<number, boolean>>({});

  // Update cartridges state when selected printer changes
  useEffect(() => {
    if (selectedPrinterId === -1) return;

    const selectedPrinter = printers.find(printer => printer.assetBatchId === selectedPrinterId);
    if (selectedPrinter) {
      const updatedState = selectedPrinter.cartridges.reduce((acc, cartridge) => {
        acc[cartridge.cartridgeId] = false; // Initialize checkboxes as unchecked
        return acc;
      }, {} as Record<number, boolean>);
      setCartridgesState(updatedState);
    }
  }, [selectedPrinterId, printers]);

  // Handle checkbox state change
  const handleCheckboxChange = useCallback((cartridgeId: number, checked: boolean) => {
    setCartridgesState(prevState => ({
      ...prevState,
      [cartridgeId]: checked,
    }));
  }, []);

  // Form submit handler
  const onSubmit = async (values: z.infer<typeof CartridgeFormSchema>) => {
    const token = Cookies.get('token');
    const data = {
      token,
      printerId: values.printerId,
      cartridges: Object.entries(cartridgesState)
        .filter(([_, isChecked]) => isChecked)
        .map(([cartridgeId]) => ({ cartridgeId })),
      assetPrinterCartridgeMessage: values.assetPrinterCartridgeMessage,
    };

    try {
      const response = await axios.post('/api/requestedCatridges', data);
      toast.success("Request raised Successfully!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      toast.error("Some issue please try again");
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      { !hasReturned ?
      (<FormError message="You have not returned old cartridges , Please return Old first"/>) :
      (<><Controller
        name="printerId"
        control={control}
        render={({ field }) => (
          <div>
            <Label>Select A Printer</Label>
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
              </SelectTrigger>
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
                  checked={cartridgesState[cartridge.cartridgeId] || false}
                  onCheckedChange={(value) => handleCheckboxChange(cartridge.cartridgeId, value === true)}
                  disabled={cartridge.display === false || cartridge.stock===0}  // Disable checkbox if display is false
                />
                <div className="flex-1 space-x-2">
                  <Label>{cartridge.cartridgeDescription}</Label>
                  <span>({cartridge.stock})</span>
                  {!cartridge.display && <span className="text-rose-500"> ({"Previous request is pending"})</span>}
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
                  <Label className="pb-2">Reason for Request</Label>
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
      </>
    )}
    </form>
  );
};

export default CartridgeForm;
