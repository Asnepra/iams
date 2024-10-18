"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, Calendar, ChevronRight, Clock, Filter, Home, Layers, MessageCircle, Phone, Plus, Search, Settings, Users, X, AlertCircle, HelpCircle, AlertTriangle, Zap } from "lucide-react"
import { Mail } from "./mail"
import { mails } from "./_components/data"

const initialTickets = [
  { id: "#TC-192", subject: "Unrecognized Charges on My Account", type: "Incident", priority: "Medium", date: "2023-11-01", department: "Billing" },
  { id: "#TC-191", subject: "Defective Item Received", type: "Problem", priority: "High", date: "2023-11-01", department: "Support" },
  { id: "#TC-190", subject: "Unable to Access My Account", type: "Incident", priority: "High", date: "2023-11-01", department: "IT" },
  { id: "#TC-189", subject: "Missing Item in Order, Need Replacement", type: "Problem", priority: "Medium", date: "2023-10-31", department: "Shipping" },
  { id: "#TC-188", subject: "Order Assistance Needed, Customization Request", type: "Question", priority: "Low", date: "2023-10-30", department: "Sales" },
  { id: "#TC-187", subject: "Tracking Order #12345", type: "Question", priority: "Low", date: "2023-10-30", department: "Shipping" },
  { id: "#TC-186", subject: "Tracking Order #4567", type: "Question", priority: "Low", date: "2023-10-30", department: "Shipping" },
  { id: "#TC-185", subject: "Card Declined for Order #98765", type: "Incident", priority: "High", date: "2023-10-30", department: "Billing" },
  { id: "#TC-184", subject: "Help me cancel my order", type: "Problem", priority: "Medium", date: "2023-10-30", department: "Support" },
  { id: "#TC-183", subject: "Out-of-Stock Item in Order", type: "Incident", priority: "High", date: "2023-10-29", department: "Inventory" },
]

const assignees = [
  { name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Charlie Brown", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Diana Prince", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function TicketManagement() {
 

  const defaultLayout = undefined
  const defaultCollapsed =undefined
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [openMenu, setOpenMenu] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [tickets, setTickets] = useState(initialTickets)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterType, setFilterType] = useState({
    Incident: false,
    Question: false,
    Problem: false,
    Suggestion: false,
  })
  const [filterPriority, setFilterPriority] = useState({
    Low: false,
    Medium: false,
    High: false,
  })
  const sidebarRef = useRef(null)

  const handleMenuHover = (menu: string) => {
    setOpenMenu(menu)
  }

  const handleSidebarMouseLeave = () => {
    setOpenMenu("")
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  type TicketType = 'Incident' | 'Question' | 'Problem' | 'Suggestion';

  const handleFilterTypeChange = (type: TicketType) => {
    setFilterType(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const handleFilterPriorityChange = (priority: string) => {
    setFilterPriority(prev => ({ ...prev, [priority]: !prev[priority] }))
  }

  const resetFilter = () => {
    setFilterType({
      Incident: false,
      Question: false,
      Problem: false,
      Suggestion: false,
    })
    setFilterPriority({
      Low: false,
      Medium: false,
      High: false,
    })
  }

  const applyFilter = () => {
    filterTickets()
    setFilterOpen(false)
  }

  useEffect(() => {
    filterTickets()
  }, [searchTerm, filterType, filterPriority])

  const filterTickets = () => {
    const filtered = initialTickets.filter(ticket => 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (Object.values(filterType).every(v => !v) || filterType[ticket.type]) &&
      (Object.values(filterPriority).every(v => !v) || filterPriority[ticket.priority])
    )
    setTickets(filtered)
  }

  const activeFilterCount = Object.values(filterType).filter(Boolean).length + Object.values(filterPriority).filter(Boolean).length

  return (
    <div className="flex h-screen bg-gray-100">
      

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Tickets</h1>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add new ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TICKETS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">OVERDUE TICKET</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AVG. RESPONSE TIME</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25:00</div>
              <p className="text-xs text-muted-foreground">2% Faster</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TOTAL RESPONSE TIME</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1:32:08</div>
            </CardContent>
          </Card>
        </div>
        <Card className="">

          <Mail mails={mails} defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed}/>
        </Card>
      </main>

     
    </div>
  )
}