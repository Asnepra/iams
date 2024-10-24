'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UserCircle, Briefcase, Mail, Phone, Laptop, Monitor, Headphones, Plus, Printer } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios'
import Cookies from 'js-cookie'
import { HELPDESK_USER, TICKET_FOR_USER, TicketCatProps } from '@/schemas/ticket'
import toast from 'react-hot-toast'


export interface DialogProps{
  ticketCat:TicketCatProps[]
}
// Asset icons mapping with colors
const assetIcons: { [key: string]: React.ReactNode } = {
  "LAPTP": <Laptop className="h-5 w-5 text-blue-500" />,
  "MONITOR": <Monitor className="h-5 w-5 text-green-500" />,
  "PRINTER": <Printer className="h-5 w-5 text-red-500" />,
  "HEADPHONES": <Headphones className="h-5 w-5 text-purple-500" />,
};

// Form schema
const formSchema = z.object({
  employeeNumber: z.string().min(1, { message: "Employee number is required" }),
  asset: z.string().min(1, { message: "Asset selection is required" }),
  mainCategory: z.string().min(1, { message: "Main category selection is required" }),
  subCategory: z.string().min(1, { message: "Subcategory selection is required" }),
  complaint: z.string().min(10, { message: "Complaint must be at least 10 characters long" }),
  assignedTo: z.string().min(1, { message: "Assignee selection is required" }),
});

export function CreateTicketDialog({ ticketCat }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [assignees, setAssignees] = useState<HELPDESK_USER[]>([]);
  const [assets, setAssets] = useState<TICKET_FOR_USER[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState<TicketCatProps[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeNumber: "",
      asset: "",
      mainCategory: "",
      subCategory: "",
      complaint: "",
      assignedTo: "",
    },
  });

  const handleFetchEmployee = async (employeeNumber: string) => {
    const token = Cookies.get("token");
    setIsLoading(true);
    try {
      const response = await axios.post("/api/getUserDetails", {
        token,
        employeeNumber,
      });

      setEmployeeData(response.data);
      setAssignees(response.data.helpdeskUsers || []);
      setAssets(response.data.assets || []);
    } catch (error) {
      toast.error("Something went wrong, kindly reload");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMainCategoryChange = (mainCategoryId: string) => {
    const filteredSubCategories = ticketCat.filter(cat => cat.mainCatId.toString() === mainCategoryId);
    setSubCategories(filteredSubCategories);
    form.setValue("subCategory", ""); // Reset subcategory selection
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);
    // Submit the form values to your backend here
    setIsOpen(false);
  };

    // Get unique main categories
    const uniqueMainCategories = Array.from(new Set(ticketCat.map(cat => cat.mainCatId.toString())))
    .map(id => ticketCat.find(cat => cat.mainCatId.toString() === id));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add new ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>
            Enter the employee number to fetch details and create a ticket
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center space-x-2">
                    <FormLabel className='basis-1/4'>Employee Number</FormLabel>
                    <FormControl className='basis-2/4'>
                      <Input {...field} />
                    </FormControl>
                    <Button
                      className='basis-1/4'
                      onClick={() => handleFetchEmployee(field.value)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Fetching..." : "Fetch Employee Details"}
                    </Button>
                  </div>
                  <FormDescription>
                    Enter the employee number and click Fetch Employee Details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {employeeData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">Name</span>
                      <span>{assets[0].employeeName}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-red-600" />
                      <span className="font-semibold">Email</span>
                      <span>{assets[0].empMail.toLowerCase()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">Designation</span>
                      <span>{assets[0].designation}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold">Department</span>
                      <span>{assets[0].empDepartment}</span>
                    </div>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="asset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Assets</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an asset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {assets.map((asset: TICKET_FOR_USER, index: number) => (
                            <SelectItem key={index} value={asset.assetModel}>
                              <div className="flex gap-2">
                                {assetIcons[asset.categoryName] || <span>{asset.assetMake}</span>}
                                {asset.assetModel}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name="mainCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Category</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          handleMainCategoryChange(value);
                        }}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a main category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {uniqueMainCategories.map((cat, index) => (
                              cat ? (
                                <SelectItem key={index} value={cat.mainCatId.toString()}>
                                  {cat.mainCatName}
                                </SelectItem>
                              ) : null
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategory</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subcategory" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories.map((subCat, index) => (
                              <SelectItem key={index} value={subCat.subCatName}>
                                {subCat.subCatName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="complaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complaint Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the issue..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Ticket To</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an assignee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {assignees.map((assignee: HELPDESK_USER, index: number) => (
                            <SelectItem key={index} value={assignee.employeeName}>
                              <div className='flex items-center'>
                                <div
                                  className="h-6 w-6 rounded-full mr-2 flex items-center justify-center text-white font-bold"
                                  style={{
                                    background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Customize your gradient here
                                  }}
                                >
                                  <span>{assignee.employeeName ? assignee.employeeName.charAt(0).toUpperCase() : '?'}</span>
                                </div>
                                {assignee.employeeName}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <DialogFooter>
              <Button type="submit">Create Ticket</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
