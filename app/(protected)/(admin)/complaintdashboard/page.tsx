'use client'

import { useState, useEffect } from 'react'
//import { ResizableBox } from 'react-resizable'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, ChevronDown, DownloadIcon, Grid, List, Menu, MessageSquare, Search, Send, Settings, Users, X } from "lucide-react"
import TicketSummary from '@/components/ticket-summary'
import TicketList from '@/components/ticket-list'
import TicketDetails from '@/components/ticket-details'
import Papa from 'papaparse'

const tickets = [
  { 
    id: 1, 
    title: "Solar panel malfunction", 
    status: "open", 
    priority: "high",
    user: {
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "/placeholder-avatar-1.jpg"
    },
    description: "Customer reported that their solar panels are not generating expected power output.",
    date: "2023-05-15",
    chat: [
      { sender: "Alice Johnson", message: "My solar panels aren't working properly.", timestamp: "2023-05-15T10:00:00" },
      { sender: "Support", message: "I'm sorry to hear that. Can you provide more details?", timestamp: "2023-05-15T10:05:00" },
      { sender: "Alice Johnson", message: "They're not generating as much power as usual.", timestamp: "2023-05-15T10:10:00" },
    ]
  },
  { 
    id: 2, 
    title: "Battery replacement needed", 
    status: "pending", 
    priority: "medium",
    user: {
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "/placeholder-avatar-2.jpg"
    },
    description: "Regular maintenance check revealed that the battery system needs replacement.",
    date: "2023-06-20",
    chat: [
      { sender: "Bob Smith", message: "When can you replace my battery?", timestamp: "2023-06-20T14:00:00" },
      { sender: "Support", message: "We can schedule it for next week. Is Tuesday good for you?", timestamp: "2023-06-20T14:15:00" },
    ]
  },
  { 
    id: 3, 
    title: "Inverter configuration issue", 
    status: "closed", 
    priority: "low",
    user: {
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "/placeholder-avatar-3.jpg"
    },
    description: "Inverter is not properly configured, causing intermittent power supply issues.",
    date: "2023-07-05",
    chat: [
      { sender: "Charlie Brown", message: "My power supply is inconsistent.", timestamp: "2023-07-05T09:00:00" },
      { sender: "Support", message: "It sounds like an inverter issue. We'll send a technician to check.", timestamp: "2023-07-05T09:10:00" },
      { sender: "Charlie Brown", message: "Great, thank you!", timestamp: "2023-07-05T09:15:00" },
    ]
  },
]

const ticketSummary = {
  open: 37,
  pending: 56,
  closed: 324
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const years = ["2024", "2023", "2022"];

const monthToNumber = (month: string) => {
  const index = months.indexOf(month);
  return index >= 0 ? index + 1 : 0; // Months are 1-based
};

const startYear = 2020;
const yearList = Array.from({ length: 101 }, (_, i) => (startYear + i).toString());

export default function Dashboard() {
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()]; // Get current month
const currentYear = currentDate.getFullYear().toString(); // Get current year
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const selectedTicket = selectedTicketId ? tickets.find(ticket => ticket.id === selectedTicketId) : null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  //const [selectedTicket, setSelectedTicket] = useState(tickets[0])
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  const [filteredTickets, setFilteredTickets] = useState(tickets)
  const [chatMessage, setChatMessage] = useState("")
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  
  const [selectedYear, setSelectedYear] = useState<string>(currentYear); // Set default to 2024

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const filtered = tickets.filter(ticket => {
      const ticketDate = new Date(ticket.date)
      return (
        (!selectedMonth || ticketDate.getMonth() === months.indexOf(selectedMonth)) &&
        (!selectedYear || ticketDate.getFullYear().toString() === selectedYear)
      )
    })
    setFilteredTickets(filtered)
  }, [selectedMonth, selectedYear])

  const closeTicket = (ticketId: number) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: 'closed' } : ticket
    )
    //setSelectedTicket({ ...selectedTicket, status: 'closed' })
    // In a real application, you would update the tickets state and possibly send an API request here
  }

  // const sendChatMessage = () => {
  //   if (chatMessage.trim()) {
  //     const newMessage = {
  //       sender: "Support",
  //       message: chatMessage,
  //       timestamp: new Date().toISOString()
  //     }
  //     setSelectedTicket({
  //       ...selectedTicket,
  //       chat: [...selectedTicket.chat, newMessage]
  //     })
  //     setChatMessage("")
  //   }
  // }
  const exportToExcel = () => {
    // const csvData = data.map(item => ({
    //   TransactionID: item.transId,
    //   AssetID: item.assetId,
    //   CartridgeID: item.cartridgeId,
    //   RequestedQty: item.requestedQty,
    //   ApprovedQty: item.approvedQty,
    //   StatusID: item.statusId,
    //   RequestedBy: item.requestedBy,
    //   RequestedOn: formatDate(item.requestedOn), // Format the date as needed
    //   ApprovedBy: item.approvedBy,
    //   ApprovedOn: item.approvedOn ? formatDate(item.approvedOn) : '-', // Handle null
    //   ApprovingReason: item.approvingReason,
    //   CartridgeReturned: item.cartridgeReturned ? 'Yes' : 'No',
    //   EmployeeName: item.employeeName,
    //   Department: item.department,
    //   UserRole: item.userRole,
    //   Designation: item.designation,
    //   DesignationName: item.designationName,
    //   StatusDescription: item.statusDescription,
    //   CartridgeDescription: item.cartridgeDescription,
    //   ApprovedByName: item.approvedByName,
    //   RequestedByName: item.requestedByName,
    // }));
  
    // const csv = Papa.unparse("csvData");
    // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // const link = document.createElement('a');
    // const url = URL.createObjectURL(blob);
    
    // link.setAttribute('href', url);
    // link.setAttribute('download', `Cartridge_Reports_${selectedMonth}_${selectedYear}.csv`);
    // link.style.visibility = 'hidden';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cartridge Request Reports for {selectedMonth}, {selectedYear}</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {yearList.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={exportToExcel}>
            <DownloadIcon className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
        </div>
      </div>
      

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Resizable Left Panel */}
        {/* <ResizableBox
          width={windowWidth > 768 ? 300 : windowWidth - 64}
          height={Infinity}
          minConstraints={[200, Infinity]}
          maxConstraints={[500, Infinity]}
          className="bg-white border-r"
        > */}
          <div className="h-full flex flex-col">
            {/* Ticket Summary */}
            <TicketSummary summary={ticketSummary} />
            {/* Filters */}
            <div className="p-4 border-b">
              <div className="flex space-x-2">
                
              </div>
            </div>
            {/* Ticket List */}
            <TicketList tickets={filteredTickets} selectedTicketId={selectedTicketId} onSelectTicket={setSelectedTicketId} />
          </div>
        {/* </ResizableBox> */}

        {/* Ticket Details */}
        {/* <TicketDetails ticket={selectedTicket} onCloseTicket={() => setSelectedTicketId(null)}/> */}
      </div>
    </div>
  )
}