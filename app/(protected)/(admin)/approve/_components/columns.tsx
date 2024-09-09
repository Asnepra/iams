import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { formatDate } from "@/lib/utils";
import { PendingCatridgeRequestProps } from "@/schemas/requests";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

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
    cell: ({ row }) => <div className="text-sm md:text-base">{row.getValue('transId')}</div>,
    
  },
  {
    accessorKey: 'assetName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Name" />
    ),
    cell: ({ row }) => <div className="text-sm md:text-base">{row.getValue('assetName')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'cartridgeDescription',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cartridge Description" />
    ),
    cell: ({ row }) => <div className="text-sm md:text-base">{row.getValue('cartridgeDescription')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'requestedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested By" />
    ),
    cell: ({ row }) => <div className="text-sm md:text-base">{row.getValue('requestedBy')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'requestedOn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested On" />
    ),
    cell: ({ row }) => <div className="text-sm md:text-base">{formatDate(row.getValue('requestedOn'))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'availableQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available Quantity" />
    ),
    cell: ({ row }) => <div className="text-sm md:text-base">{row.getValue('availableQuantity')}</div>,
  },
  {
    accessorKey: 'cartridgeReturned',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cartridge Returned" />
    ),
    cell: ({ row }) => <div className="text-sm md:text-base">{row.getValue('cartridgeReturned') ? 'Yes' : 'No'}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original;
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(request.transId.toString())}
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem>Reject</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(request.transId.toString())}
            >
              Old Cartridge Returned 
            </DropdownMenuItem>
            
            {/* Add more actions here */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
