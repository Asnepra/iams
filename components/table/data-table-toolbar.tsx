"use client"

import { X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  filterKey: string, // Ensure you pass this as a prop
}

export function DataTableToolbar<TData>({
  table,
  filterKey, // Accept filterKey as a prop
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const column = table.getColumn(filterKey)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 py-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${filterKey}...`}
          value={(column?.getFilterValue() as string) ?? ""}
          onChange={(event) => column?.setFilterValue(event.target.value)}
          className="w-full rounded-lg bg-background md:w-[200px] lg:w-[336px]"
        />

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
