"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/charts"

export default function LineChartComponent() {
  return (
    <Card className="flex flex-col lg:max-w-md">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Total Employees</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {empResult.length > 0 ? empResult[0].employeeCount : 'Loading...'}
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
          <LineChart
            accessibilityLayer
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
            data={empResult.map((item) => ({
              date: item.empDepartment, // Assuming empDepartment is date field
              resting: item.employeeCount, // Assuming employeeCount is resting field
            }))}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value} // Assuming empDepartment is in a suitable format
            />
            <Line
              dataKey="resting"
              type="natural"
              fill="var(--color-resting)"
              stroke="var(--color-resting)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: 'var(--color-resting)',
                stroke: 'var(--color-resting)',
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => value} // Customize label as needed
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
