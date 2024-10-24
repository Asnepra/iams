"use client"

import * as React from "react"
import { format, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRange | undefined; // Prop to receive date range from parent
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  dateRange, // Accepting dateRange from the parent
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  
  // Initialize state with the incoming dateRange
  const [date, setDate] = React.useState<DateRange | undefined>(dateRange);

  React.useEffect(() => {
    setDate(dateRange); // Update local state when parent dateRange changes
  }, [dateRange]);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setDate(selectedRange);
    onDateRangeChange(selectedRange); // Pass the selected range to the parent
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[320px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="pr-2"/>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            defaultMonth={date?.from} // Set the default month to the start of the selected range
             // Disable future dates
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
