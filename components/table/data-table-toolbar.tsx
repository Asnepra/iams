"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterKey?:string
  filterString?:string
  department?: FilterOption[]
  statusFilter?: FilterOption[]
}

export function DataTableToolbar<TData>({
  table,
  filterKey,
  filterString,
  statusFilter = [], // Default to empty array
  department = [], // Default to empty array
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${filterString}`}
          value={(table.getColumn(`${filterKey}`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`${filterString}`)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Department") && department.length > 0 && (
          <DataTableFacetedFilter
            column={table.getColumn("Department")}
            title="Department"
            options={department}
          />
        )}
        {table.getColumn("StatusDescription") && statusFilter.length > 0 && (
          <DataTableFacetedFilter
            column={table.getColumn("StatusDescription")}
            title="Status"
            options={statusFilter}
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
