import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Shield, ShieldEllipsis } from "lucide-react";
import FallbackImage from "@/components/fallback-Image";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { getFullProfileUrl } from "@/lib/parseToken";

import { Checkbox } from "@/components/ui/checkbox";
import { PendingCatridgeRequestProps } from "@/schemas/requests";

export const columns: ColumnDef<PendingCatridgeRequestProps>[] = [
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
    accessorKey: 'transId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('transId')}</div>,
  },


  {
    accessorKey: 'requestedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested By" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('requestedBy')}</div>,
  },
  {
    accessorKey: 'requestedOn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested On" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue('requestedOn')}</div>,
  },
  {
    accessorKey: 'assetName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Name" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue('assetName')}</div>,
  },
  {
    accessorKey: 'cartridgeDescription',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cartridge Description" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue('cartridgeDescription')}</div>,
  },
  {
    accessorKey: 'requesterName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requester Name" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue('requesterName')}</div>,
  },
];
