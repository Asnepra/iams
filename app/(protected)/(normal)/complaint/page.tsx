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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ComplaintForm from "@/components/complaintForm";

import { parseToken } from "@/lib/parseToken";
import { UserData } from "@/schemas";
import { TicketCatProps, USER_ASSET } from "@/schemas/ticket";
import TicketTimeline from "./_components/data-timeline";

export default function ComplaintPage() {
  const [error, setError] = useState<string>("");
  const [ticketData, setTicketData] = useState<TicketCatProps[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<USER_ASSET[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Token is missing or expired.");
      return;
    }
    setUserData(parseToken(token));
    getTicketData(token);
    getUserAssets(token);
  }, []);

  const getUserAssets = async (token: string) => {
    try {
      const response = await axios.post("/api/getassets", { token });
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching user assets:", error);
      setError("Error fetching user assets.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTicketData = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/getTicketCat`, { token });
      setTicketData(response.data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
      setError("Error fetching ticket data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col md:flex-row md:space-x-4 p-4">
        <main className="flex flex-col w-full md:flex-1 gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Raise a Complaint</CardTitle>
                <CardDescription>Fill out the form below to register your complaint regarding the asset.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={userData?.userName} disabled />
                  </div>
                  <div>
                    <Label htmlFor="employeeNumber">Employee Number</Label>
                    <Input id="employeeNumber" defaultValue={userData?.userId} disabled />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" defaultValue={userData?.userDesignation} disabled />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={userData?.userDepartment} disabled />
                  </div>
                </div>
                <ComplaintForm assets={assets} ticketCat={ticketData} />
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Ticket Timeline</CardTitle>
                <CardDescription>Status of your Ticket</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketTimeline />
              </CardContent>
            </Card>
          </div>
        </main>
        
      </div>
      <div className="flex p-2 space-x-2 m-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>View the status of your previously raised tickets.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <DataTable columns={columns} data={ticketData} filterKey={""}/> */}
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
