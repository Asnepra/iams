"use client";
import {
  DeleteIcon,
  Trash2Icon,
  ComputerIcon,
  LaptopIcon,
  ServerIcon,
  PrinterIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import { useEffect } from "react";

export default function Dashboard() {

  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) {
      router.replace('/') // If no token is found, redirect to login page
      return
    }

    // Validate the token by making an API call
    const validateToken = async () => {
      try {
        const res = await fetch('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error('Token validation failed')
      } catch (error) {
        console.error(error)
        router.replace('/') // Redirect to login if token validation fails
      }
    }

    validateToken()
  }, [router])
  return (
    <div className="flex flex-col bg-muted/40">
      <header
        className="flex h-14 items-center gap-4 border-b bg-gradient-to-r from-[#4338CA] to-[#6D28D9] 
    px-6 text-white dark:bg-gradient-to-r dark:from-[#4338CA] dark:to-[#6D28D9]"
      >
        <h1 className="text-lg font-semibold md:text-xl">My Assets</h1>
      
      </header>

      <div className="flex">
        <main className="flex-1 p-4 ">
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">PCs</CardTitle>
                <ComputerIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#4338CA]">850</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued: 750 | Requested: 100
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Printers</CardTitle>
                <PrinterIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6D28D9]">120</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued: 100 | Requested: 20
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Laptops</CardTitle>
                <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#4338CA]">650</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued: 600 | Requested: 50
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Servers</CardTitle>
                <ServerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6D28D9]">25</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued: 20 | Requested: 5
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 md:mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Laptop"
                          className="rounded-md"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        Laptop 1
                      </div>
                    </TableCell>
                    <TableCell>Laptop</TableCell>
                    <TableCell>HQ - New York</TableCell>
                    <TableCell>
                      <Badge variant="outline">In Use</Badge>
                    </TableCell>
                    <TableCell>2023-04-15</TableCell>
                    <TableCell>2023-04-10</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Desktop"
                          className="rounded-md"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        Desktop 1
                      </div>
                    </TableCell>
                    <TableCell>Desktop</TableCell>
                    <TableCell>HQ - New York</TableCell>
                    <TableCell>
                      <Badge variant="default">In Use</Badge>
                    </TableCell>
                    <TableCell>2023-03-20</TableCell>
                    <TableCell>2023-03-15</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Tablet"
                          className="rounded-md"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        Tablet 1
                      </div>
                    </TableCell>
                    <TableCell>Tablet</TableCell>
                    <TableCell>Remote - San Francisco</TableCell>
                    <TableCell>
                      <Badge variant="default">In Use</Badge>
                    </TableCell>
                    <TableCell>2023-05-01</TableCell>
                    <TableCell>2023-04-28</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Printer"
                          className="rounded-md"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        Printer 1
                      </div>
                    </TableCell>
                    <TableCell>Printer</TableCell>
                    <TableCell>HQ - New York</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Maintenance</Badge>
                    </TableCell>
                    <TableCell>2023-02-10</TableCell>
                    <TableCell>2023-02-05</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Server"
                          className="rounded-md"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        Server 1
                      </div>
                    </TableCell>
                    <TableCell>Server</TableCell>
                    <TableCell>Data Center - New York</TableCell>
                    <TableCell>
                      <Badge variant="default">In Use</Badge>
                    </TableCell>
                    <TableCell>2023-01-15</TableCell>
                    <TableCell>2023-01-10</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Monitor"
                          className="rounded-md"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        Monitor 1
                      </div>
                    </TableCell>
                    <TableCell>Monitor</TableCell>
                    <TableCell>Remote - San Francisco</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Retired</Badge>
                    </TableCell>
                    <TableCell>2022-12-01</TableCell>
                    <TableCell>2022-11-25</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
