"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"


//import { Actions } from "./actions"
import { CARTRIDGE_DESCRIPTION_STRING, CARTRIDGE_ID_STRING, CartridgeApprovalProps, IAMS_CATRIDGE, STATUS_STRING, STOCK_STRING } from "@/schemas/printerSchema"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

//export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>["data"][0]

export const columns: ColumnDef<IAMS_CATRIDGE>[] = [
  {
    id: "select",
    accessorKey: CARTRIDGE_ID_STRING,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "catridgeDescription",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Catridge Name" />

    },
    cell: ({ row }) => (
      <span>{row.getValue(CARTRIDGE_DESCRIPTION_STRING)}</span>
    ),
  },
  {
    accessorKey: STOCK_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue(STOCK_STRING)}</span>
    ),
  },
  {
    accessorKey: "updatedBy",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Last Updated By" />

    },
    cell: ({ row }) => (
      <span>{row.getValue(CARTRIDGE_DESCRIPTION_STRING)}</span>
    ),
  },
  {
    accessorKey: "updatedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated On" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue(STOCK_STRING)}</span>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <Actions id={row.original.cartridgeId}/>
  // },
]