
"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Metadata } from 'next';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Card } from '@/components/ui/card';

interface Employee {
  empDepartment: string;
  empMail: string;
  empName: string;
  empNumber: number;
  empProfilePicture: string;
  empRole: string;
}

interface EmpResultItem {
  empDepartment: string;
  employeeCount: number;
}

interface ApiResponse {
  empList: Employee[];
  empDepartment: string;
  empResult: EmpResultItem[];
}

const UsersPage = () => {
  const [empList, setEmpList] = useState<Employee[]>([]);
  const [empDepartment, setEmpDepartment] = useState<string>('');
  const [empResult, setEmpResult] = useState<EmpResultItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      
      try {
        const response = await axios.post('/api/users', { token }); // Replace '/api/tasks' with your actual API endpoint
        //setTasks(response.data.tasks); // Assuming the API returns an object with a 'tasks' property containing the array of tasks
        console.log("data", response);
        const data = response.data; // Assuming response.data matches ApiResponse structure
        setEmpList(data.empList);
        setEmpDepartment(data.empDepartment);
        setEmpResult(data.empResult);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., redirect to home page
        // router.push('/home');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Map empList to match DataTable expected format
  const mappedEmpList = empList.map(employee => ({
    id: employee.empNumber.toString(), // Example: Using empNumber as id
    title: employee.empName,
    status: employee.empDepartment, // Example: Assuming status is always 'Active'
    label: 'Employee', // Example: Default label
    priority: employee.empMail // Example: Default priority
    // You may add more fields depending on your columns configuration
  }));

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <Card className="p-2">
          <DataTable data={mappedEmpList} columns={columns} />
        </Card>
      </div>
    </>
  );
};

export default UsersPage;
