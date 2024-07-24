
"use client"

import { ColumnDef } from "@tanstack/react-table"





import { ASSET_STRING, ASSIGNED_TO_STRING, CartridgeProps, COMPLAINT_ID_STRING,  CREATED_ON_STRING,  ID_CARTRIDGE_STRING, 
  ISSUE_STRING, PRINTER_MODAL_STRING, QUANTITY_STRING, REASON_STRING, REQUESTED_ON_STRING, 
  RESOLUTION_TIME_STRING, 
  STATUS_STRING, statuses,TicketProps } from "@/schemas"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

export const columns: ColumnDef<TicketProps>[] = [
 
  {
    accessorKey: COMPLAINT_ID_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Complaint Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue(COMPLAINT_ID_STRING)}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: ASSET_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset" />
    ),
    cell: ({ row }) => {
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue(ASSET_STRING)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: ISSUE_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Issue" />
    ),
    cell: ({ row }) => {
      

      return (
        <div className="flex w-[100px] items-center">
          
          <span>{row.getValue(ISSUE_STRING)}</span>
        </div>
        
      )
     
    },
    enableSorting:false
  },
  {
    accessorKey: STATUS_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
          <Badge variant={row.getValue(STATUS_STRING) === "Open" ? "default" : row.getValue(STATUS_STRING)==="Pending"? "secondary":"destructive"}>{row.getValue(STATUS_STRING)}</Badge>

            
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: ASSIGNED_TO_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue(ASSIGNED_TO_STRING)}
          </span>
        </div>
      )
    },
  },
  
  {
    accessorKey: CREATED_ON_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
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
  {
    accessorKey: RESOLUTION_TIME_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolution Time" />
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

        {row.getValue(RESOLUTION_TIME_STRING)}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  
]
