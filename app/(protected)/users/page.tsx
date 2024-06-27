"use client";
import {
  DeleteIcon,
  Trash2Icon,
  ComputerIcon,
  LaptopIcon,
  ServerIcon,
  PrinterIcon,
  SquareUser
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

import { useEffect, useState } from "react";
import axios from "axios";
import FormError from "@/components/form-error";
import toast from "react-hot-toast";

interface User{
    EmployeeNumber:string;
    EmployeeName:string;
    EmpDepartment:string;
}

interface UserDeptCount{
    EmpDepartment:string;
    EmployeeCount:string;
}
export default function Dashboard() {


  const [error, setError] = useState<string | undefined>("");
  const [assets, setAssets] = useState([]);
  const [users,setUsers]= useState<User[]>([]);
  const [dept,setDept]=useState<UserDeptCount[]>([]);
     // Map categories to respective icon components
  const imageCategoryMap: Record<string, JSX.Element> = {
    Computer: <ComputerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Laptop: <LaptopIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />,
    Printer: <PrinterIcon className="w-4 4 text-gray-500 dark:text-gray-400" />,
    Server: <ServerIcon className="w-4 4 text-gray-500 dark:text-gray-400" />,
    // Add more mappings as needed
  };

  const [computerCount, setComputerCount] = useState<number>(1);
  const [printerCount, setPrinterCount] = useState<number>(1);
  const [laptopCount, setLaptopCount] = useState<number>(1);
  const [serverCount, setServerCount] = useState<number>(1);

  const router= useRouter();

  useEffect(()=>{
    getData();
  },[])



  const getData = async () => {
    const token = Cookies.get('token');

  

    try {
      
      const res = await axios.get('/api/getassets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response=>{
        setAssets(response.data);
        console.log("assets data",response.data);
      }).catch(error=>{
        console.log("Error in getting Assets",error);
        setError("Error in Getting Assets");
        toast.error("Error in getting Assets")
      });
    const data={
        token:token
    }
      
     await axios.post(`/api/users`,data)
            .then(response => {
                const userData=response.data.empList;
                const empdept=response.data.empResult;
            setUsers(userData);
            setDept(empdept)
            console.log("users", response)
            })
            .catch(error => {
                console.log(error);
                setError("Error getting Users")
                toast.error("Error in getting Users");
            });
            //console.log("subutmiited values:", data);
            
        
      
      
      // Calculate counts for each category
      let compCount = 0;
      let printCount = 0;
      let lapCount = 0;
      let servCount = 0;

      assets.forEach((asset: any) => {
        if (asset.category === "Computer") compCount++;
        else if (asset.category === "Printer") printCount++;
        else if (asset.category === "Laptop") lapCount++;
        else if (asset.category === "Server") servCount++;
      });

      // Set counts
      setComputerCount(compCount || 1); // Default to 1 if compCount is 0
      setPrinterCount(printCount || 0); // Default to 1 if printCount is 0
      setLaptopCount(lapCount || 0); // Default to 1 if lapCount is 0
      setServerCount(servCount || 0); // Default to 1 if servCount is 0
      
    } catch (error) {
      router.push("/")
      setError("Something happend, Please reload")
      console.error(error);
    }
  };

  
  

  return (
    <div className="mt-16 h-auto flex flex-col  md:ml-48 bg-muted/40">
      <div className="flex">
      <FormError message={error} />
        <main className="flex-1 p-4 ">
          <div className="grid gap-2 md:grid-cols-6 lg:grid-cols-8">
          {dept.map((dept, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between pb-2">
                  <div className="text-base font-medium">{dept.EmpDepartment}</div>
                  <SquareUser className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="">Employees &nbsp;
                <span className="text-lg font-bold text-[#4338CA]">{dept.EmployeeCount}</span>
                </div>
              </Card>
            ))}
           
            
          </div>
          <div className="mt-4 md:mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee Department</TableHead>
                    <TableHead>Grade</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.EmployeeNumber}</TableCell>
                            <TableCell>{user.EmployeeName}</TableCell>
                            <TableCell>{user.EmpDepartment}</TableCell>
                            {/* Assuming `asset.status` is a property of each user */}
                            {/* <TableCell>{user.status}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
