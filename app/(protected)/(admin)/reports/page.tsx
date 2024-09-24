
"use client"
import { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { formatDate } from '@/lib/utils';

import { columns } from './_components/columns';
import { CartridgeDataReport } from '@/schemas/printerSchema';
import { DataTable } from './_components/data-table';

const COLORS: { [key: string]: string } = {
  requested: "#8884d8",
  approved: "#82ca9d",
  pending: "#ffc658",  // Add a color for pending
  rejected: "#ff6f61"  // Add a color for rejected
};

const DEPARTMENT_COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F9F", "#7AD0F5",
  "#F7B500", "#1CC6B2", "#A178FF", "#FF6F61", "#87CEEB", "#FF7F50", "#008080", "#9B59B6"
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const years = ["2024", "2023", "2022"];

const monthToNumber = (month: string) => {
  const index = months.indexOf(month);
  return index >= 0 ? index + 1 : 0; // Months are 1-based
};



export default function ComprehensiveCartridgeReports() {
  const [data, setData] = useState<CartridgeDataReport[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("Aug");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error("Token Error");
      router.push("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`/api/reports`, {
          token,
          month: monthToNumber(selectedMonth),
          year: selectedYear
        });
        console.log("data", response.data);
        setData(response.data.detailedData); // Assuming the API returns { data: CartridgeData[] }
      } catch (error) {
        toast.error("Error fetching data, Please reload");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear, router]);

  // Filter data by status codes
  const filterDataByStatus = (status: string) => data.filter(item => item.statusDescription === status);

  const requestedData = filterDataByStatus("Pending");  // Pending
  const approvedData = filterDataByStatus("Issued");  // Approved
  const rejectedData = filterDataByStatus("Rejected");  // Rejected

  const totalPending = requestedData.length;
  const totalApproved = approvedData.length;
  const totalRejected = rejectedData.length;  // Count of rejected items
  

  const pieData = [
    {name:"Pending", value:totalPending},
    { name: "Approved", value: totalApproved },
    { name: "Rejected", value: totalRejected }
  ];
  console.log("re", pieData);

  const departmentData = data.reduce((acc: { name: string; value: number }[], item) => {
    const existingDept = acc.find(d => d.name === item.department); // Change to Department
    if (existingDept) {
      existingDept.value += item.requestedQty;
    } else {
      acc.push({ name: item.department, value: item.requestedQty }); // Change to Department
    }
    return acc;
  }, []);

  const exportToExcel = () => {
    // to be implemented
  };

  if (loading) {
    return <div className='container mx-auto p-1'>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
              {years.map((year) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Cartridge Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || "#000000"} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requests by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

     

      <Card>
        <CardHeader>
          <CardTitle>Detailed Cartridge Request Data</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <Table>
            <TableHead>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Asset ID</TableHead>
                <TableHead>Cartridge ID</TableHead>
                <TableHead>Requested Qty</TableHead>
                <TableHead>Approved Qty</TableHead>
                <TableHead>Status ID</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Approved On</TableHead>
                <TableHead>Approving Reason</TableHead>
                <TableHead>Cartridge Returned</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>User Role</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Designation Name</TableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.TRANS_ID}>
                  <TableCell>{item.TRANS_ID}</TableCell>
                  <TableCell>{item.ASSET_ID}</TableCell>
                  <TableCell>{item.CARTRIDGE_ID}</TableCell>
                  <TableCell>{item.REQUESTED_QTY}</TableCell>
                  <TableCell>{item.APPROVED_QTY}</TableCell>
                  <TableCell>{item.STATUS_ID}</TableCell>
                  <TableCell>{item.REQUESTED_BY}</TableCell>
                  <TableCell>{formatDate(item.REQUESTED_ON)}</TableCell>
                  <TableCell>{item.APPROVED_BY}</TableCell>
                  <TableCell>{item.APPROVED_ON ? formatDate(item.APPROVED_ON) : '-'}</TableCell>
                  <TableCell>{item.APPROVING_REASON}</TableCell>
                  <TableCell>{item.CARTRIDGE_RETURNED ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{item.EmployeeName}</TableCell>
                  <TableCell>{item.Department}</TableCell>
                  <TableCell>{item.UserRole}</TableCell>
                  <TableCell>{item.DESIGNATION}</TableCell>
                  <TableCell>{item.DESIGNATION_NAME}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <DataTable data={data} columns={columns} filterKey='employeeName' filterString='Name'/>
        </CardContent>
      </Card>
    </div>
  );
}
