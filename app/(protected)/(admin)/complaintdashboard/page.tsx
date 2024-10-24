"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCcw, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { COMPLAINTS_COLUMN, TicketCatProps } from "@/schemas/ticket";
import { departments } from "@/schemas/meta-data";
import { CreateTicketDialog} from "./addTicketDialog";
import FormError from "@/components/form-error";
import toast from "react-hot-toast";

export default function TicketManagement() {
  const [tickets, setTickets] = useState<COMPLAINTS_COLUMN[]>([]);
  //const [modalOpen, setModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<TicketCatProps[]>([]);
  //const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [t, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token);
    fetchTickets(token as string);
    getTicketData(token as string);
  }, []);

  const fetchTickets = async (token:string) => {
    
    try {
      const response = await axios.post(`/api/getTickets`, { token });
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const getTicketData = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/getTicketCat`, { token });
      setTicketData(response.data);
      console.log("Get Ticet cat", response.data)
    } catch (error) {
      toast.error("Something gone vron, reload");
      setError("Error fetching ticket data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchTickets(t as string);
  };


  const getComplaintsCountByDepartment = (deptName: string, statusId: number) => {
    return tickets.filter(ticket => ticket.EMP_DEPARTMENT === deptName && ticket.TICKET_STATUS_ID === statusId).length;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Tickets</h1>
          <FormError message={error}/>
          <div className="flex space-x-2">
            <Button onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-600 text-white">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <CreateTicketDialog ticketCat={ticketData}/>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Complaints Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center">
                <Ticket className="text-green-600 h-6 w-6 mr-2" />
                <div className="text-2xl font-bold">{tickets.length}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Complaints Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center">
                <Ticket className="text-yellow-500 h-6 w-6 mr-2" />
                <div className="text-2xl font-bold">{tickets.filter(ticket => ticket.TICKET_STATUS_DESCRIPTION === "Open").length}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Complaints Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center">
                <Ticket className="text-red-600 h-6 w-6 mr-2" />
                <div className="text-2xl font-bold">{tickets.filter(ticket => ticket.TICKET_STATUS_DESCRIPTION === "Closed").length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        
        <Card className="p-2">
          <DataTable data={tickets} columns={columns} filterKey="employeeName" filterString="Employee Name" />
        </Card>
      </main>
    </div>
  );
}
