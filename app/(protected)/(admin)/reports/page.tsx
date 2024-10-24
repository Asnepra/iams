"use client"
import { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Papa from "papaparse";

import { formatDate } from '@/lib/utils';
import { columns } from './_components/columns';
import { CartridgeDataReport } from '@/schemas/printerSchema';
import { DataTable } from './_components/data-table';
import { statuses } from '@/schemas/meta-data';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const COLORS = {
  requested: "#8884d8",
  approved: "#82ca9d",
  pending: "#ffc658",
  rejected: "#ff6f61"
};

const DEPARTMENT_COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F9F",
  "#7AD0F5", "#F7B500", "#1CC6B2", "#A178FF", "#FF6F61", "#87CEEB",
  "#FF7F50", "#008080", "#9B59B6"
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const startYear = 2020;
const yearList = Array.from({ length: 101 }, (_, i) => (startYear + i).toString());

export default function ComprehensiveCartridgeReports() {
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear().toString();

  const [data, setData] = useState<CartridgeDataReport[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Number(currentYear), currentDate.getMonth(), 1),
    to: new Date(Number(currentYear), currentDate.getMonth() + 1, 0)
  });

  // Update dateRange whenever selectedMonth or selectedYear changes
  useEffect(() => {
    const monthIndex = months.indexOf(selectedMonth);
    const year = Number(selectedYear);
    if (monthIndex !== -1) {
      setDateRange({
        from: new Date(year, monthIndex, 1),
        to: new Date(year, monthIndex + 1, 0)
      });
    }
  }, [selectedMonth, selectedYear]);

  const fetchData = async () => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error("Token Error");
      router.push("/");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`/api/reports`, {
        token,
        startDate: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : null,
        endDate: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : null
      });
      setData(response.data.detailedData);
    } catch (error) {
      toast.error("Error fetching data, Please reload");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange, router]);

  const filterDataByStatus = (status: string) => data.filter(item => item.statusDescription === status);
  const requestedData = filterDataByStatus("Pending");
  const approvedData = filterDataByStatus("Issued");
  const rejectedData = filterDataByStatus("Rejected");

  const pieData = [
    { name: "Pending", value: requestedData.length },
    { name: "Approved", value: approvedData.length },
    { name: "Rejected", value: rejectedData.length }
  ];

  const departmentData = data.reduce((acc: { name: string; value: number }[], item) => {
    const existingDept = acc.find(d => d.name === item.department);
    if (existingDept) {
      existingDept.value += item.requestedQty;
    } else {
      acc.push({ name: item.department, value: item.requestedQty });
    }
    return acc;
  }, []);

  const exportToExcel = () => {
    const csvData = data.map(item => ({
      TransactionID: item.transId ?? 'N/A',
      CartridgeNo: item.cartridgeNo ?? 'N/A',
      RequestedBy: item.requestedByName ?? 'N/A',
      Department: item.department ?? 'N/A',
      RequestedOn: item.requestedOn ? formatDate(item.requestedOn) : 'N/A',
      StatusID: statuses.find(label => label.label === item.statusDescription)?.label ?? 'N/A',
      ActionBy: item.approvedByName ?? 'N/A',
      ActionOn: item.approvedOn ? formatDate(item.approvedOn) : 'N/A',
      ActionReason: item.approvingReason ?? 'N/A',
      OldCartridgeReturned: item.cartridgeReturned ? 'Yes' : 'No',
      UserRole: item.userRole ?? 'N/A',
      CartridgeName: item.cartridgeDescription ?? 'N/A',
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Cartridge_Reports_${selectedMonth}_${selectedYear}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              {yearList.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DatePickerWithRange
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
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
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS] || "#000000"} />
                  ))}
                </Pie>
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
          <DataTable data={data} columns={columns} filterKey='employeeName' filterString='Name' />
        </CardContent>
      </Card>
    </div>
  );
}
