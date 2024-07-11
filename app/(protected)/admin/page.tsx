"use client"
import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SetStateAction, useState } from "react"
import { Pagination } from "@/components/ui/pagination"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts"

export default function Admin() {
    const [tickets, setTickets] = useState([
        {
          id: "TKT001",
          subject: "Website not loading",
          status: "open",
          priority: "high",
          assignee: "John Doe",
          created: "2023-06-01",
          updated: "2023-06-02",
        },
        {
          id: "TKT002",
          subject: "Checkout process not working",
          status: "open",
          priority: "medium",
          assignee: "Jane Smith",
          created: "2023-06-03",
          updated: "2023-06-04",
        },
        {
          id: "TKT003",
          subject: "Unable to log in",
          status: "resolved",
          priority: "high",
          assignee: "John Doe",
          created: "2023-06-05",
          updated: "2023-06-07",
        },
        {
          id: "TKT004",
          subject: "Slow page load times",
          status: "closed",
          priority: "low",
          assignee: "Jane Smith",
          created: "2023-06-08",
          updated: "2023-06-10",
        },
        {
          id: "TKT005",
          subject: "Broken image on homepage",
          status: "open",
          priority: "medium",
          assignee: "John Doe",
          created: "2023-06-11",
          updated: "2023-06-12",
        },
        {
          id: "TKT006",
          subject: "Incorrect product pricing",
          status: "resolved",
          priority: "high",
          assignee: "Jane Smith",
          created: "2023-06-13",
          updated: "2023-06-15",
        },
        {
          id: "TKT007",
          subject: "Unable to place order",
          status: "closed",
          priority: "low",
          assignee: "John Doe",
          created: "2023-06-16",
          updated: "2023-06-18",
        },
        {
          id: "TKT008",
          subject: "Broken search functionality",
          status: "open",
          priority: "high",
          assignee: "Jane Smith",
          created: "2023-06-19",
          updated: "2023-06-20",
        },
      ])
      const [filteredTickets, setFilteredTickets] = useState(tickets)
      const [currentPage, setCurrentPage] = useState(1)
      const [ticketsPerPage] = useState(10)
      const [filterStatus, setFilterStatus] = useState("all")
      const handleFilterStatus = (status: SetStateAction<string>) => {
        setFilterStatus(status)
        if (status === "all") {
          setFilteredTickets(tickets)
        } else {
          setFilteredTickets(tickets.filter((ticket) => ticket.status === status))
        }
        setCurrentPage(1)
      }
      const indexOfLastTicket = currentPage * ticketsPerPage
      const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage
      const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket)
      const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage)
      const handlePageChange = (pageNumber: SetStateAction<number>) => {
        setCurrentPage(pageNumber)
      }
      const [escalationData, setEscalationData] = useState([
        { date: "2023-06-01", escalations: 2 },
        { date: "2023-06-02", escalations: 1 },
        { date: "2023-06-03", escalations: 3 },
        { date: "2023-06-04", escalations: 1 },
        { date: "2023-06-05", escalations: 2 },
        { date: "2023-06-06", escalations: 1 },
        { date: "2023-06-07", escalations: 2 },
      ])
      const [ticketCounts, setTicketCounts] = useState({
        open: 3,
        resolved: 2,
        closed: 2,
      })
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Ticket Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h2 className="text-lg font-bold">Overview</h2>
                  <p className="text-2xl">1,552</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                  <h2 className="text-lg font-bold">Campaigns</h2>
                  <p className="text-2xl">1,552</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h2 className="text-lg font-bold">Ad Group</h2>
                  <p className="text-2xl">1,552</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h2 className="text-lg font-bold">Keywords</h2>
                  <p className="text-2xl">1,552</p>
                </div>
              </div>
          </CardContent>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ticket Escalations</CardTitle>
          </CardHeader>
          <CardContent>
            <LinechartChart className="aspect-[9/4]" />
          </CardContent>
        </Card>
        <Card className="bg-white">
              <CardHeader>
                <CardTitle>Top 5 products by spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,985</div>
                <PiechartChart className="w-full aspect-[4/3]" />
              </CardContent>
            </Card>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>All Tickets</CardTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FilterIcon className="w-4 h-4" />
                    <span>Filter by status</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => handleFilterStatus("all")}
                    className={filterStatus === "all" ? "bg-primary text-primary-foreground" : ""}
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleFilterStatus("open")}
                    className={filterStatus === "open" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleFilterStatus("resolved")}
                    className={filterStatus === "resolved" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleFilterStatus("closed")}
                    className={filterStatus === "closed" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Closed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="gap-1">
                <ListOrderedIcon className="w-4 h-4" />
                <span>Sort</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        <Link href="#" className="hover:underline" prefetch={false}>
                          {ticket.id}
                        </Link>
                      </TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticket.status === "open" ? "default" : ticket.status === "resolved" ? "secondary" : "outline"
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticket.priority === "high" ? "destructive" : ticket.priority === "medium" ? "secondary" : "outline"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.assignee}</TableCell>
                      <TableCell>{ticket.created}</TableCell>
                      <TableCell>{ticket.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </CardFooter>
        </Card>
      </div>
    
  







     
    </div>
  )
}



function FilterIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    )
  }
  
  
  function LinechartChart(props:any) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            accessibilityLayer
            data={[
              { month: "January", desktop: 186 },
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
            ]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
    )
  }
  
  
  function ListOrderedIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="10" x2="21" y1="6" y2="6" />
        <line x1="10" x2="21" y1="12" y2="12" />
        <line x1="10" x2="21" y1="18" y2="18" />
        <path d="M4 6h1v4" />
        <path d="M4 10h2" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    )
  }
  
  
  function XIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }


  function BarchartChart(props:any) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="min-h-[300px]"
        >
          <BarChart
            accessibilityLayer
            data={[
              { month: "January", desktop: 186 },
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
            ]}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </div>
    )
  }

  function PiechartChart(props) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
            },
            chrome: {
              label: "Chrome",
              color: "hsl(var(--chart-1))",
            },
            safari: {
              label: "Safari",
              color: "hsl(var(--chart-2))",
            },
            firefox: {
              label: "Firefox",
              color: "hsl(var(--chart-3))",
            },
            edge: {
              label: "Edge",
              color: "hsl(var(--chart-4))",
            },
            other: {
              label: "Other",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={[
                { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
                { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                { browser: "other", visitors: 90, fill: "var(--color-other)" },
              ]}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </div>
    )
  }