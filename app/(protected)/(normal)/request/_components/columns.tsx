
"use client"

import { ColumnDef } from "@tanstack/react-table"





import { CartridgeProps, ID_CARTRIDGE_STRING, PRINTER_MODAL_STRING, QUANTITY_STRING, REASON_STRING, REQUESTED_ON_STRING, STATUS_STRING, statuses } from "@/schemas"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

export const columns: ColumnDef<CartridgeProps>[] = [
 
  {
    accessorKey: ID_CARTRIDGE_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Printer Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue(ID_CARTRIDGE_STRING)}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: PRINTER_MODAL_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Printer Model" />
    ),
    cell: ({ row }) => {
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue(PRINTER_MODAL_STRING)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: QUANTITY_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      

      return (
        <div className="flex w-[100px] items-center">
          
          <span>{row.getValue(QUANTITY_STRING)}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: REASON_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: ({ row }) => {
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue(REASON_STRING)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: REQUESTED_ON_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested On" />
    ),
    cell: ({ row }) => {
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue(REQUESTED_ON_STRING)}
          </span>
        </div>
      )
    },
  },
  
  {
    accessorKey: STATUS_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // const status = statuses.find(
      //   (status) => status.value === row.getValue(STATUS_STRING)
      // )

      // if (!status) {
      //   return null
      // }
      
      return (
        <div className="flex items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
        <Badge variant={row.getValue(STATUS_STRING) === "Fulfilled" ? "default" : row.getValue(STATUS_STRING)==="Pending"? "secondary":"destructive"}>{row.getValue(STATUS_STRING)}</Badge>

          
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  
]
