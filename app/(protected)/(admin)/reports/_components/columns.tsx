import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { labels} from "./data/meta-data";
import { CartridgeDataReport } from "@/schemas/printerSchema";
import { formatDate } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { STATUS_COLORS_S, statuses } from "@/schemas/meta-data";
import { Badge } from "@/components/ui/badge";

// Column Definitions
export const columns: ColumnDef<CartridgeDataReport>[] = [
  {
    accessorKey: "transId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trans ID" />,
    cell: ({ row }) => (
      <div className="max-w-[100px] text-sm md:max-w-[120px] truncate">{row.getValue("transId")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cartridgeDescription",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cartridge Name" />,
    cell: ({ row }) => (
      <div className="max-w-[200px] text-sm md:max-w-[200px] lg:max-w-[250px] truncate font-medium">{row.getValue("cartridgeDescription")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requestor Name" />,
    cell: ({ row }) => (
      <div className="max-w-[150px] md:max-w-[200px] lg:max-w-[250px] text-sm truncate font-medium">{row.getValue("employeeName")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Department" />,
    cell: ({ row }) => {
      const department = labels.find(label => label.label === row.getValue("department"));
      return (
        <div className="flex items-center max-w-[100px] text-sm truncate">
          {department?.icon && <department.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{department?.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "requestedOn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested On" />,
    cell: ({ row }) => (
      <div className="max-w-[120px] text-sm truncate">{formatDate(row.getValue("requestedOn"))}</div>
    ),
  },
  {
    accessorKey: "approvedByName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action By" />,
    cell: ({ row }) => (
      <div className="max-w-[120px] text-sm truncate">{row.getValue("approvedByName")}</div>
    ),
  },
  {
    accessorKey: "approvedOn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action On" />,
    cell: ({ row }) => (
      <div className="max-w-[120px] text-sm truncate">
        {row.getValue("approvedOn") ? new Date(row.getValue("approvedOn")).toLocaleDateString() : 'N/A'}
      </div>
    ),
  },
  {
    accessorKey: "approvingReason",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action Reason" />,
    cell: ({ row }) => (
      <div className="max-w-[150px] text-sm truncate">{row.getValue("approvingReason")}</div>
    ),
  },
  {
    accessorKey: "cartridgeReturned",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Old Returned" />,
    cell: ({ row }) => (
      <div className="w-[80px] text-center text-sm">{row.getValue("cartridgeReturned") ? 'Yes' : 'No'}</div>
    ),
  },
  {
    accessorKey: "statusDescription",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status Description" />,
    cell: ({ row }) => {
      const status = statuses.find(label => label.label === row.getValue("statusDescription"));
      //console.log("statuvs value ghjnk", status?.value)
      const badgeColorClass = status ? STATUS_COLORS_S[status.value] : "bg-gray-200 text-gray-800";


      return (
        <div className="flex items-center">
          <Badge className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${badgeColorClass}`}>
            {status?.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
