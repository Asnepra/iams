import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

// Define the type for your ticket data
export type Ticket = {
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
};

// Define columns array with ColumnDef<Ticket> type
export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "TicketID",
    header: "Ticket ID",
  },
  {
    accessorKey: "AssetModalID",
    header: "Asset Modal ID",
  },
  {
    accessorKey: "Issue",
    header: "Issue",
  },
  {
    accessorKey: "Priority",
    header: "Priority",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    accessorKey: "Created By",
    header: "Employee Number",
  },
  {
    accessorKey: "AssignedToEmployeeNumber",
    header: "Assigned To Employee Number",
  },
  {
    accessorKey: "AssignedOn",
    header: "Assigned On",
  },
  {
    accessorKey: "CreatedAt",
    header: "Created At",
  },
  {
    accessorKey: "ResolutionTime",
    header: "Resolution Time",
  },
  {
    accessorKey: "ResolvedOn",
    header: "Resolved On",
  },
  {
    accessorKey: "ResolutionDetails",
    header: "Resolution Details",
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
  },
];
