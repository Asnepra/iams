import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { UpdateDialog } from "@/components/update-dialog";
import { formatDate } from "@/lib/utils";
import FallbackImage from "@/components/fallback-Image";
import { getFullProfileUrl } from "@/lib/parseToken";
import { Badge } from "@/components/ui/badge";
import { COMPLAINTS_COLUMN } from "@/schemas/ticket";

export const columns: ColumnDef<COMPLAINTS_COLUMN>[] = [
  {
    accessorKey: "ticketId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticket ID" />
    ),
    cell: ({ row }) => <div className="text-xs sm:text-sm">{row.getValue("ticketId") || "Not Available"}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ticketDesc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 overflow-hidden">
        <span className="max-w-[300px] truncate text-xs sm:text-sm font-medium">
          {row.getValue("ticketDesc") || "Not Available"}
          {/* <TicketDialogCloseButton row={row} /> */}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "ticketStatusDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status:string = row.getValue("ticketStatusDescription") || "Not Available";
      const statusClass = status === "Open" ? 'bg-red-400 text-white' : 'bg-green-400 text-white';

      return (
        <div className="flex w-[100px] items-center">
          <Badge variant="outline" className={`space-x-2 font-bold text-xs sm:text-sm ${statusClass}`}>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "ticketRaisedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Raised On" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{formatDate(row.getValue("ticketRaisedOn")) || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "ticketAssignedTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      const assignedTo = row.getValue("ticketAssignedTo");
      const assignedClass = assignedTo ? "text-black" : "text-red-500 font-bold";

      return (
        <div className="flex items-center">
          <span className={`${assignedClass} text-xs sm:text-sm`}>
          {assignedTo ? assignedTo.toString() : "Not Assigned"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "employeeNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Number" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{row.getValue("employeeNumber") || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Raised By" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <FallbackImage
          src={getFullProfileUrl(row.getValue("employeeNumber")) || "/user_profile.jpeg"}
          alt="Profile"
          className="h-8 w-8 rounded-full mr-2"
          width={32}
          height={32}
        />
        <span className="text-xs sm:text-sm">{row.getValue("employeeName") || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{row.getValue("designation") || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "empDepartment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{row.getValue("empDepartment") || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "mainCatName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticket Category" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{row.getValue("mainCatName") || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "subCatName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticket Subcategory" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{row.getValue("subCatName") || "Not Available"}</span>
      </div>
    ),
  },
  {
    accessorKey: "assetModel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Model" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-xs sm:text-sm">{row.getValue("assetModel") || "Not Available"}</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <UpdateDialog row={row} add={false} title="Update Ticket" />,
  },
];
