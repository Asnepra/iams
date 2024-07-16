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

export default function Component() {
  return (
    <div className="">
      
      <div className="flex flex-col">
        
        <main className="flex flex-1 flex-col gap-2 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-2">
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
            <Card className="p-4 bg-white rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Top 5 products by spend</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <PiechartcustomChart className="w-full h-[200px]" />
              </CardContent>
            </Card>
            
          <Card>
                <div>
                  <CardHeader className="flex flex-row items-center space-y-0">
                    <CardTitle>Top Requesters</CardTitle>
                    <Button variant="secondary" className="ml-auto">
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="border w-11 h-11">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                          <div className="font-semibold">Sophia Anderson</div>
                          <div className="text-muted-foreground">5 requests</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Avatar className="border w-11 h-11">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                          <div className="font-semibold">John Doe</div>
                          <div className="text-muted-foreground">3 requests</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Avatar className="border w-11 h-11">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                          <div className="font-semibold">Jane Smith</div>
                          <div className="text-muted-foreground">2 requests</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
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
                <div>
                  <CardHeader className="flex flex-row items-center space-y-0">
                    <CardTitle>Approval Statistics</CardTitle>
                    <Button variant="secondary" className="ml-auto">
                      View Report
                    </Button>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>Pending Requests</div>
                        <div className="font-medium">3</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Approved Requests</div>
                        <div className="font-medium">12</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Rejected Requests</div>
                        <div className="font-medium">5</div>
                      </div>
                    </div>
                  </CardContent>
                </div>
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

