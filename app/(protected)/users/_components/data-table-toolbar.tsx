    "use client"

import { X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table-view-options"

import { priorities, statuses } from "./data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("EmployeeName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("EmployeeName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("EmpDepartment") && (
          <DataTableFacetedFilter
            column={table.getColumn("EmpDepartment")}
            title="Employee Department"
            options={statuses}
          />
        )}
        {table.getColumn("UserRole") && (
          <DataTableFacetedFilter
            column={table.getColumn("UserRole")}
            title="User Role"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}