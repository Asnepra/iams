"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterOptions {
  [key: string]: FilterOption[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterOptions?: FilterOptions;
}

export function DataTableToolbar<TData>({
  table,
  filterOptions = {},
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  console.log("filter options", filterOptions)

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
        {Object.keys(filterOptions).map((key) => {
          const column = table.getColumn(key);
          console.log("Column for key:", key, column); // Added debug log
          const options = filterOptions[key];
          console.log("Options for key:", key, options); // Added debug log
          

          return column ? (
            <DataTableFacetedFilter<TData, any> // Replace 'any' with the appropriate type for the second argument
              key={key}
              column={column}
              title={key}
              options={options.map(option => ({
                label: option.label,
                value: option.value,
                // Render the icon if needed
              }))}
            />
          ) : (
            <div key={key}>Column not found for {key}</div> // Added error handling
          );
        })}
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
  );
}
