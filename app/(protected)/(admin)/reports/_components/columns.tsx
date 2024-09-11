import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, statuses } from "./data/meta-data"
import { CartridgeDataReport } from "@/schemas/printerSchema"
import { formatDate } from "@/lib/utils"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

export const columns: ColumnDef<CartridgeDataReport>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "TRANS_ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("TRANS_ID")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "CartridgeDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cartridge Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("CartridgeDescription")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "REQUESTED_BY",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested By" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("REQUESTED_BY")}</div>
    ),
  },
  {
    accessorKey: "REQUESTED_ON",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested On" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{formatDate(row.getValue("REQUESTED_ON"))}</div>
    ),
  },
  {
    accessorKey: "APPROVED_BY",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved By" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("APPROVED_BY")}</div>
    ),
  },
  {
    accessorKey: "APPROVED_ON",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved On" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        {row.getValue("APPROVED_ON") ? new Date(row.getValue("APPROVED_ON")).toLocaleDateString() : 'N/A'}
      </div>
    ),
  },
  {
    accessorKey: "APPROVING_REASON",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approving Reason" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("APPROVING_REASON")}</div>
    ),
  },
  {
    accessorKey: "CARTRIDGE_RETURNED",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Returned" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] text-center">
        {row.getValue("CARTRIDGE_RETURNED") ? 'Yes' : 'No'}
      </div>
    ),
  },
  {
    accessorKey: "EmployeeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("EmployeeName")}
          </span>
        </div>
      )
    },
  },
  
  {
    accessorKey: "Department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      const status = labels.find(
        (status) => status.label === row.getValue("Department")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[120px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  // Other column definitions...
  {
    accessorKey: "StatusDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Description" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.label === row.getValue("StatusDescription")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[120px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  
]
