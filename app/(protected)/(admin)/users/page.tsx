
"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Metadata } from 'next';

import { columns } from './_components/columns';
import { Card } from '@/components/ui/card';
import { User } from './_components/data/schema';
import LineChartComponent from './_components/line-chart';
import { EMPLOYEENAME_STRING } from '@/schemas';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/table/data-table';



interface EmpResultItem {
  empDepartment: string;
  employeeCount: number;
}


const UsersPage = () => {
  const [empList, setEmpList] = useState<User[]>([]);
  const [empDepartment, setEmpDepartment] = useState<string>('');
  const [empResult, setEmpResult] = useState<EmpResultItem[]>([]);
  const router= useRouter();

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
         router.push('/home');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render


  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
           
          </div>
          
        </div>
        <div className='grid grid-cols-2'>
          <LineChartComponent empResult={empResult}/>
        </div>
        <Card className="p-2">
          <DataTable data={empList} columns={columns} filterKey={EMPLOYEENAME_STRING}/>
        </Card>
      </div>
    </>
  );
};

export default UsersPage;
