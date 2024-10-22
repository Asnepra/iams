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
import { UserCircle, Briefcase, Mail, Phone, Laptop, Monitor, Armchair, Keyboard, Mouse, Headphones, Plus } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Mock function to simulate fetching employee data
const fetchEmployeeData = async (employeeNumber: string) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock data
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    designation: "Software Engineer",
    department: "Info. Systems",
    assets: ["Laptop", "Monitor", "Ergonomic Chair", "Keyboard", "Mouse", "Headset"]
  }
}

const assetIcons: { [key: string]: React.ReactNode } = {
  "Laptop": <Laptop className="h-5 w-5" />,
  "Monitor": <Monitor className="h-5 w-5" />,
  "Ergonomic Chair": <Armchair className="h-5 w-5" />,
  "Keyboard": <Keyboard className="h-5 w-5" />,
  "Mouse": <Mouse className="h-5 w-5" />,
  "Headset": <Headphones className="h-5 w-5" />,
}

const assignees = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Ethan Hunt"]

const formSchema = z.object({
  employeeNumber: z.string().min(1, { message: "Employee number is required" }),
  asset: z.string().min(1, { message: "Asset selection is required" }),
  complaint: z.string().min(10, { message: "Complaint must be at least 10 characters long" }),
  assignedTo: z.string().min(1, { message: "Assignee selection is required" }),
})

export function CreateTicketDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeNumber: "",
      asset: "",
      complaint: "",
      assignedTo: "",
    },
  })

  const handleFetchEmployee = async (employeeNumber: string) => {
    setIsLoading(true)
    try {
      const data = await fetchEmployeeData(employeeNumber)
      setEmployeeData(data)
    } catch (error) {
      console.error("Error fetching employee data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the form data to your backend
    setIsOpen(false)
  }

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
                            onClick={() => handleFetchEmployee(form.getValues("employeeNumber"))}
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
                      <UserCircle className="h-5 w-5" />
                      <span className="font-semibold">Name</span>
                      <span>{employeeData.name}</span>
                    </div>
                    
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      <span className="font-semibold">Email</span>
                      <span>{employeeData.email}</span>
                    </div>
                    
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      <span className="font-semibold">Designation</span>
                      <span>{employeeData.designation}</span>
                    </div>
                    
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">Department</span>
                      <span>{employeeData.department}</span>
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
                          {employeeData.assets.map((asset: string, index: number) => (
                            <SelectItem key={index} value={asset}>
                              <div className="flex items-center gap-2">
                                {assetIcons[asset]}
                                {asset}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          {assignees.map((assignee, index) => (
                            <SelectItem key={index} value={assignee}>
                              {assignee}
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