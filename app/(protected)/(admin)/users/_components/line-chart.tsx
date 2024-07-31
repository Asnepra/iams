import { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList, Rectangle } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/charts';

interface EmpResultItem {
  empDepartment: string;
  employeeCount: number;
}

interface BarChartProps {
  empResult: EmpResultItem[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ empResult }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Update chartData whenever empResult changes
    if (empResult && empResult.length > 0) {
      const newData = empResult.map((item) => ({
        department: item.empDepartment,
        employeeCount: item.employeeCount,
      }));
      setChartData(newData);
    }
  }, [empResult]);

  return (
    <Card className="flex flex-col lg:max-w-3xl h-full">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 flex-1">
        <div>
          <CardDescription>Total Employees</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {empResult.length > 0 ? empResult.reduce((acc, curr) => acc + curr.employeeCount, 0) : 'Loading...'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            resting: {
              label: 'Resting',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="w-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="employeeCount" fill="var(--color-resting)"
                  
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}>
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
