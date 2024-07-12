/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HevcNTHd59M
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CogIcon, CommandIcon, ComputerIcon, Container, ContainerIcon, DiamondIcon, LaptopIcon, PrinterIcon, ServerIcon, Tally1, Tally2, Tally3, Tally4Icon } from "lucide-react";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ComplaintForm from "@/components/complaintForm";

interface Asset {
    assetId:string;
    assetModalId:string;
  assetModalName: string;
  categoryName: string;
}

interface UserData {
  userId: string;
  userName: string;
  isAdmin: string;
  userMail: string;
  userDepartment:string;
  // Add other fields as needed
}

function parseToken(token: string): UserData | null {
  try {
    const [, payloadBase64] = token.split(".");
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

interface TicketFormData {
  assetId: string;
  assetModalName:string;
  ticketPriority: string;
  ticketDetails: string;
}

const ticketSchema = z.object({
  assetId: z.string({
    message: "Please select a device.",
  }),
  ticketPriority: z.string({
    message: "Please select the priority",
  }),
  ticketDetails: z.string().min(10, {
    message: "Please enter details of your concern",
  }),
});

interface Priority {
  priorityId: number;
  priorityName: string;
  priorityIcon: JSX.Element;
  priorityColor: string; // Add priority color type
}

const priorityList: Priority[] = [
  { priorityId: 1, priorityName: "Low", priorityIcon: <CommandIcon className="w-4 h-4 text-blue-400 dark:text-gray-400" />, priorityColor: "bg-blue-400" },
  { priorityId: 2, priorityName: "Medium", priorityIcon: <CogIcon className="w-4 h-4 text-yellow-400 dark:text-gray-400" />, priorityColor: "bg-yellow-500" },
  { priorityId: 3, priorityName: "High", priorityIcon: <ContainerIcon className="w-4 h-4 text-orange-400 dark:text-gray-400" />, priorityColor: "bg-orange-500" },
  { priorityId: 4, priorityName: "Urgent", priorityIcon: <DiamondIcon className="w-4 h-4 text-red-500 dark:text-gray-400" />, priorityColor: "bg-red-500" },
];

export default function ComplaintPage() {
  const [error, setError] = useState<string>(""); // State for error message
  const [ticketData, setTicketData] = useState<any[]>([]); // State for ticket data
  const [userData, setUserData] = useState<UserData | null>(null); // State for user data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading indicator
  const [assets, setAssets] = useState<Asset[]>([]); // State for user assets

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      assetId: "",
      ticketPriority: "",
      ticketDetails: "",
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Token is missing or expired.");
      return;
    }
    setUserData(parseToken(token));

    // Fetch ticket data
    getTicketData(token);
    // Fetch user assets
    getUserAssets(token);
  }, []);

  const getUserAssets = async (token: string) => {
    try {
      const response = await axios.post("/api/getassets", { token });
      const data: Asset[] = response.data;
      setAssets(data);
      console.log("User asset data:", data);
    } catch (error) {
      console.error("Error fetching user assets:", error);
      setError("Error fetching user assets.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTicketData = async (token: string) => {
    try {
      const response = await axios.post(`/api/gettickets`, { token });
      const data: any[] = response.data; // Update with your TicketData type
      setTicketData(data);
      console.log("Ticket data:", data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
      setError("Error fetching ticket data.");
    } finally {
      setIsLoading(false);
    }
  };

  const imageCategoryMap: Record<string, JSX.Element> = {
    Computer: <ComputerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Laptop: <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Printer: <PrinterIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Server: <ServerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
  };

  return (
    
      <div className="grid min-h-screen w-full ">
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex flex-row justify-aroundn space-x-2 gap-2">
              <Card className="w-1/2">
                <CardHeader>
                  <CardTitle>Raise a Complaint</CardTitle>
                  <CardDescription>Fill out the form below to register you complain regarding the asset.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={userData?.userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Employee Number</Label>
                        <Input id="email" type="email" defaultValue={userData?.userId} disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Designation</Label>
                        <Input id="name" defaultValue={userData?.userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Department</Label>
                        <Input id="email" type="email" defaultValue={userData?.userDepartment} disabled />
                      </div>
                    </div>
                  
                  <ComplaintForm assets={assets} priorityList={priorityList}/>
                  
                </CardContent>
               
              </Card>
              <Card className="w-1/2">
                <CardHeader>
                  <CardTitle>Ticket Timeline</CardTitle>
                  <CardDescription>History of your last ticket</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Example timeline items */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          <div className="flex items-center justify-around m-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>View the status of your previously raised tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Resolution Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ticketData.map((ticket) => (
                      <TableRow key={ticket.ticketId}>
                        <TableCell>
                          <Link href="#" className="font-medium" prefetch={false}>
                            #{ticket.ticketId}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {imageCategoryMap[ticket.categoryName]}
                            <span>{ticket.assetModelName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.issue}</div>
                            <div className="text-sm text-muted-foreground">{ticket.issue}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityList.find((priority) => priority.priorityName === ticket.priority)?.priorityColor}>
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border">
                              <AvatarImage src="/user_profile.jpeg" />
                              <AvatarFallback>{ticket.assignedToEmployeeName}</AvatarFallback>
                            </Avatar>
                            <span>{ticket.assignedToEmployeeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <time dateTime={ticket.createdAt}>
                            {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </TableCell>
                        <TableCell>{ticket.resolutionTime}</TableCell>
                        {/* Action buttons could go here */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

  );
}
