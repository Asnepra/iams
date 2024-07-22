/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CbMQC2XOvCw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CartesianGrid, XAxis, Bar, BarChart, Pie, PieChart, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/charts"
import { BadgeAlertIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Devices in Use</CardTitle>
              <ComputerIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Software Licenses</CardTitle>
              <ComputerIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hardware Inventory</CardTitle>
              <WarehouseIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,234</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expired Licenses</CardTitle>
              <BadgeAlertIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Device Usage</CardTitle>
              <BarChartIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <BarchartChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Software Licenses</CardTitle>
              <BarChartIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <PiechartcustomChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hardware Inventory</CardTitle>
              <BarChartIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <LinechartChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="px-7 pb-2">
            <CardTitle>IT Asset Inventory</CardTitle>
            <CardDescription>Detailed information about all IT assets in your organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                  <TableHead className="hidden md:table-cell">Warranty</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">IT-0001</TableCell>
                  <TableCell>
                    <div className="font-medium">MacBook Pro</div>
                    <div className="text-sm text-muted-foreground">Apple M1 Chip, 16GB RAM, 512GB SSD</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">Engineering</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">San Francisco, CA</TableCell>
                  <TableCell className="hidden md:table-cell">2022-03-15</TableCell>
                  <TableCell className="hidden md:table-cell">1 year remaining</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">In Use</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">IT-0002</TableCell>
                  <TableCell>
                    <div className="font-medium">Dell Latitude</div>
                    <div className="text-sm text-muted-foreground">Intel Core i7, 8GB RAM, 256GB SSD</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">Marketing</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">New York, NY</TableCell>
                  <TableCell className="hidden md:table-cell">2021-09-01</TableCell>
                  <TableCell className="hidden md:table-cell">6 months remaining</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">Expiring Soon</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">IT-0003</TableCell>
                  <TableCell>
                    <div className="font-medium">HP EliteBook</div>
                    <div className="text-sm text-muted-foreground">Intel Core i5, 16GB RAM, 512GB SSD</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">Finance</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">Chicago, IL</TableCell>
                  <TableCell className="hidden md:table-cell">2020-11-20</TableCell>
                  <TableCell className="hidden md:table-cell">Expired</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="destructive">Expired</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">IT-0004</TableCell>
                  <TableCell>
                    <div className="font-medium">Lenovo ThinkPad</div>
                    <div className="text-sm text-muted-foreground">Intel Core i7, 32GB RAM, 1TB SSD</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Sarah Lee</div>
                    <div className="text-sm text-muted-foreground">HR</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">Seattle, WA</TableCell>
                  <TableCell className="hidden md:table-cell">2023-01-01</TableCell>
                  <TableCell className="hidden md:table-cell">2 years remaining</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">In Use</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">IT-0005</TableCell>
                  <TableCell>
                    <div className="font-medium">Microsoft Surface Pro</div>
                    <div className="text-sm text-muted-foreground">Intel Core i5, 8GB RAM, 256GB SSD</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">David Kim</div>
                    <div className="text-sm text-muted-foreground">Sales</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">Miami, FL</TableCell>
                  <TableCell className="hidden md:table-cell">2022-06-30</TableCell>
                  <TableCell className="hidden md:table-cell">1 year remaining</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">In Use</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong>
              assets
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}




function BarChartIcon(props:any) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
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


function ComputerIcon(props:any) {
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
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
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


function Package2Icon(props:any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function PiechartcustomChart(props:any) {
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
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}


function SearchIcon(props:any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function WarehouseIcon(props:any) {
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
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
      <path d="M6 18h12" />
      <path d="M6 14h12" />
      <rect width="12" height="12" x="6" y="10" />
    </svg>
  )
}


