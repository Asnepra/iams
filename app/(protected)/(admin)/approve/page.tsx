/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DkxSxs2XjqJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts"
import { Pie, PieChart } from "recharts"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DataTable } from "../../(normal)/request/_components/data-table"
import { columns } from "../../(normal)/request/_components/columns"
import { useState } from "react"


export default function ApproveScreen() {
  const [cartridgeHistory, setCartridgeHistory] = useState([
    {
      id: "1",
      printerModel: "HP LaserJet Pro",
      quantity: "2",
      reason: "Printer ran out of ink",
      requestedOn: "2023-05-15",
      status: "Fulfilled",
    },
    {
      id: "2",
      printerModel: "Canon PIXMA",
      quantity: "1",
      reason: "Printer cartridge is low",
      requestedOn: "2023-03-20",
      status: "Fulfilled",
    },
    {
      id:"3",
      printerModel: "Epson WorkForce",
      quantity: "4",
      reason: "Printer cartridge is empty",
      requestedOn: "2023-01-10",
      status: "Pending",
    },
    {
      id: "4",
      printerModel: "Brother MFC",
      quantity: "1",
      reason: "Printer cartridge is low",
      requestedOn: "2022-11-05",
      status: "Fulfilled",
    },
  ]);
  return (
    <div className="">
      <div>
      
      
        
        <main className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-2">
            <div className="">
            
            </div>
            <h1 className="font-semibold text-lg md:text-xl">Printer Cartridge Approvals</h1>
           
          </div>
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="grid md:grid-cols-1 gap-2">
                    <Card className="bg-purple-100">
                        <CardHeader>
                            <CardTitle>Pending Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">2</div>
                        </CardContent>
                        </Card>
                        
                        <Card className="bg-orange-100">
                        <CardHeader>
                            <CardTitle>Total Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                            10
                            </div>
                        </CardContent>
                    </Card>
                </div>
                    <Card className="p-2 bg-white rounded-lg shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                        <span>Approved so far</span>
                        <span>1,552</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-purple-100 rounded-lg">
                        <span>Requested So far</span>
                        <span>1,552</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-pink-100 rounded-lg">
                        <span>Request Declined So far</span>
                        <span>1,552</span>
                        </div>
                        
                    </CardContent>
                    </Card>
            
            

              
            </div>
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cartridge</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">HP 123A Black Toner</TableCell>
                        <TableCell>Sophia Anderson</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Submitted</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Canon 045 Cyan Toner</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Submitted</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Brother TN-760 Black Toner</TableCell>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Submitted</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            <Card>
                <CardHeader>
                  <CardTitle>History of</CardTitle>
                </CardHeader>
                <CardContent>
                <DataTable columns={columns} data={cartridgeHistory}/>

                </CardContent>
              </Card>
              
            </div>
          </div>
        </main>
      </div>
    </div>
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

