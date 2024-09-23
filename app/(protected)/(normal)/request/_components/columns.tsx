"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { PendingCatridgeRequestProps } from "@/schemas/requests"

// Import constants
import {
  TRANS_ID,
  ASSET_NAME,
  CARTRIDGE_ID,
  REQUESTED_QTY,
  APPROVED_QTY,
  STATUS_ID,
  REQUESTED_BY,
  REQUESTED_ON,
  APPROVED_BY,
  APPROVED_ON,
  REQUESTER_NAME,
  CARTRIDGE_DESCRIPTION
} from "@/schemas/requests"
import { formatDate } from "@/lib/utils"

// Define status mapping with descriptions
const STATUS_DESCRIPTIONS: Record<number, string> = {
  102: "Assigned",
  201: "Pending",
  202: "Issued",
  203: "Rejected",
}

// Define status color mapping using Tailwind CSS classes
const STATUS_COLORS: Record<number, string> = {
  102: "bg-gray-200 text-gray-800", // Assigned
  201: "bg-yellow-200 text-yellow-800", // Pending
  202: "bg-green-200 text-green-800", // Issued
  203: "bg-red-200 text-red-800", // Rejected
}

export const columns: ColumnDef<PendingCatridgeRequestProps>[] = [
  {
    accessorKey: TRANS_ID,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => (
      <div className="truncate w-full max-w-[120px]">{row.getValue(TRANS_ID)}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: ASSET_NAME,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Printer Model" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate max-w-[200px] md:max-w-[300px] lg:max-w-[400px] font-medium">
          {row.getValue(ASSET_NAME)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: CARTRIDGE_DESCRIPTION,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cartridge" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate max-w-[300px] md:max-w-[400px] lg:max-w-[500px] font-medium">
          {row.getValue(CARTRIDGE_DESCRIPTION)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: REQUESTED_ON,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested On" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate max-w-[150px] md:max-w-[200px] lg:max-w-[250px] font-medium">
          {formatDate(row.getValue(REQUESTED_ON))}
        </span>
      </div>
    ),
  },
  {
    accessorKey: STATUS_ID,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusId = row.getValue(STATUS_ID) as number;
      const statusDescription = STATUS_DESCRIPTIONS[statusId] || "Unknown";
      const badgeColorClass = STATUS_COLORS[statusId] || "bg-gray-200 text-gray-800";

      return (
        <div className="flex items-center">
          <Badge className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${badgeColorClass}`}>
            {statusDescription}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
]
