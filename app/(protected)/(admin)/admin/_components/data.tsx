import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Define your Ticket interface
export interface Ticket {
  TicketID: string;
  AssetModalID: string;
  Issue: string;
  Priority: string;
  Status: string;
  EmployeeNumber: string;
  AssignedToEmployeeNumber: string;
  AssignedOn: string;
  CreatedAt: string;
  ResolutionTime: string;
  ResolvedOn: string;
  ResolutionDetails: string;
}

// Define DataTableProps interface for clarity
interface DataTableProps {
  columns: ColumnDef<Ticket, any>[]; // Assuming 'any' for TValue for simplicity
  data: Ticket[];
}

// DataTable component
export function DataTable({ columns, data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [employeeNumberFilter, setEmployeeNumberFilter] = useState<string>("");

  // Initialize useReactTable hook with data and columns
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  // Function to apply filter across multiple columns
  const applyFilter = () => {
    table.setGlobalFilter((filterValue: string) => {
      return (rows: any[]) => {
        return rows.filter((row) => {
          return (
            row.values.Status.toLowerCase().includes(statusFilter.toLowerCase()) &&
            row.values.EmployeeNumber.toLowerCase().includes(employeeNumberFilter.toLowerCase())
            // Add more conditions for other filters as needed
          );
        });
      };
    });
  };

  return (
    <div className="backdrop-blur-lg hover:backdrop-blur-xl">
      <div className="flex items-center py-4 space-x-4">
        {/* Input for filtering by Ticket Status */}
        <Input
          placeholder="Filter by Ticket Status..."
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          onBlur={applyFilter} // Apply filter on blur or button click
          className="max-w-md"
        />
        {/* Input for filtering by Employee Number */}
        <Input
          placeholder="Filter by Employee Number..."
          value={employeeNumberFilter}
          onChange={(event) => setEmployeeNumberFilter(event.target.value)}
          onBlur={applyFilter} // Apply filter on blur or button click
          className="max-w-md"
        />
        {/* Add more inputs for other filters */}
      </div>

      <div className="rounded-md border">
        <Table>
          {/* Render table headers */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* Render table body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : ""}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
