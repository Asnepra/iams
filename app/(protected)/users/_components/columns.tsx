import { ColumnDef } from "@tanstack/react-table";
import { User } from "./data/schema"; // Assuming User type is imported from your schema
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "empNumber", // Use the corresponding key from your User type
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Number" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("empNumber")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "empName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={row.getValue("empProfilePicture")}
          alt="Profile"
          className="h-8 w-8 rounded-full mr-2"
        />
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("empName")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "empDepartment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Department" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue("empDepartment")}</span>
    ),
  },
  {
    accessorKey: "empMail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Email" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue("empMail")}</span>
    ),
  },
  {
    accessorKey: "empRole",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Role" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue("empRole")}</span>
    ),
  },
  {
    accessorKey: "empProfilePicture",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile Picture" />
    ),
    cell: ({ row }) => (
      <img src={row.getValue("empProfilePicture")} alt="Profile" className="h-8 w-8 rounded-full" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
