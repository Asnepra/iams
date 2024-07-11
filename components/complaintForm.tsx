import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComputerIcon, LaptopIcon, PrinterIcon, ServerIcon } from "lucide-react";
import { useState } from "react";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";

interface Asset {
  assetId: string;
  assetModalId:string;
  assetModalName: string;
  categoryName: string;
}

interface TicketFormData {
  assetModalId: string; // Correct type for assetId
  ticketPriority: string;
  ticketDetails: string;
}

const ticketSchema = z.object({
  assetModalId: z.string().min(1,{
    message: "Please select a device.",
  }),
  ticketPriority: z.string().min(1,{
    message: "Please select the priority",
  }),
  ticketDetails: z.string().min(10, {
    message: "Please enter details of your concern, atleast 10 characters",
  }),
});

interface Priority {
  priorityId: number;
  priorityName: string;
  priorityIcon: JSX.Element;
  priorityColor: string; // Add priority color type
}

interface ComplaintFormProps {
  assets: Asset[];
  priorityList: Priority[];
}

const imageCategoryMap: Record<string, JSX.Element> = {
  Computer: <ComputerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
  Laptop: <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
  Printer: <PrinterIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
  Server: <ServerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
};

const ComplaintForm: React.FC<ComplaintFormProps> = ({ assets, priorityList }) => {
  const token = Cookies.get('token');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      assetModalId:"",
      ticketPriority: "",
      ticketDetails: "",
    },
  });

  const findIdFromAssetName = (assetName: string): string => {
    const foundAsset = assets.find(asset => asset.assetModalName === assetName);
    return foundAsset ? foundAsset.assetModalId : '';
  };

  const onSubmit = async (values: TicketFormData) => {
    setIsPending(true);
    try {
      const assetIds = findIdFromAssetName(values.assetModalId); // Find assetId from asset name
      const data = {
        token: token,
        assetModalId: assetIds, // Correctly submit assetId from form values
        ticketPriority: values.ticketPriority || "Low",
        ticketDetails: values.ticketDetails || "Null"
      };

      //const response = await axios.post(`/api/assetmaster`, data);
      
      console.log("Success!", data);

      await axios.post(`/api/raiseticket`,data)
     .then(response => {
      toast.success("Ticket Raised Successfully!");
      console.log("Success!", response);
      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3000 milliseconds = 3 seconds
    }).catch(error=>{
      console.log("Error ", error)
    })
      //Optionally, you can reload the page after successful submission
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Failed to raise ticket. Please try again.");
      setError("Failed to raise ticket. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <FormField
            control={form.control}
            name="assetModalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Asset</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select an asset..." />
                    <SelectContent>
                      {assets?.map((asset) => (
                        <SelectItem key={asset.assetModalId} value={asset.assetModalName}>
                          <div className="flex items-center gap-2">
                            {imageCategoryMap[asset.categoryName]}
                            <span>{asset.assetModalName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ticketPriority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Priority</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select priority..." defaultValue={field.value || ""} />
                    <SelectContent>
                      {priorityList.map((priority) => (
                        <SelectItem key={priority.priorityId} value={priority.priorityName}>
                          <div className={`flex items-center gap-4 `}>
                            {priority.priorityIcon}
                            <span>{priority.priorityName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="ticketDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...field} // Register the textarea field with react-hook-form
                placeholder="Provide details about your request"
                className="min-h-[150px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Query'}
        </Button>
      </form>
    </Form>
  );
};

export default ComplaintForm;
