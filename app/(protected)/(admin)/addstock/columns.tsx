import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { UpdateDialog } from "@/components/update-dialog"
import { IAMS_CATRIDGE, STOCK_STRING } from "@/schemas/printerSchema"
import { formatDate } from "@/lib/utils"

export const columns: ColumnDef<IAMS_CATRIDGE>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catridge Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "catrdigeDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catridge Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("catrdigeDescription")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: STOCK_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue(STOCK_STRING)}</span>
      </div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "updatedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated On" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span>{formatDate(row.getValue("updatedOn"))}</span>
      </div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "updatedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated By" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span>{row.getValue("updatedBy")}</span>
      </div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: ({ row }) => <UpdateDialog row={row} add={false} title="Add Quantity"/>,
  },
]
