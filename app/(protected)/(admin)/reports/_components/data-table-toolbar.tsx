"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"

import { statuses, departments } from "@/schemas/meta-data"
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  deparment?: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  status?: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  filterKey:string,
  filterString?:string // Accept filterKey as a prop
}

export function DataTableToolbar<TData>({
  table,
  filterKey,
  filterString // Accept filterKey as a prop
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const column = table.getColumn(filterKey)
  

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter name..."
          value={(table.getColumn("EmployeeName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("EmployeeName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        <Input
          placeholder={`Filter ${filterString}...`}
          value={(column?.getFilterValue() as string) ?? ""}
          onChange={(event) => column?.setFilterValue(event.target.value)}
          className="w-full rounded-lg bg-background md:w-[200px] lg:w-[336px]"
        />
        {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={departments}
          />
        )}
        {table.getColumn("statusDescription") && (
          <DataTableFacetedFilter
            column={table.getColumn("statusDescription")}
            title="Status"
            options={statuses}
          />
        )}
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}