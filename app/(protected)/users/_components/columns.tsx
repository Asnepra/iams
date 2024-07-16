import { ColumnDef } from "@tanstack/react-table";
import { User } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import Image from "next/image";

// Import icons from radix-ui/react-icons
import {
  Shield,
  ShieldEllipsis
} from "lucide-react";

// Import labels array defining user types and corresponding icons and colors
import { labels } from "./data/data";
import FallbackImage from "@/components/fallback-Image";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "empNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Number" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("empNumber")}</div>,
  },
  {
    accessorKey: "empProfilePicture",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Picture" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center ">
        <FallbackImage
          src={row.getValue("empProfilePicture") || "/user_profile.jpeg"}
          alt="Profile"
          className="h-8 w-8 rounded-full mr-2"
          width={40}
          height={40}
        />
      </div>
    ),
  },
  {
    accessorKey: "empName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
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
    cell: ({ row }) => {
      const userType = row.getValue("empRole") as string;
      const label = labels.find((label) => label.value === userType);
      const Icon = label?.icon || ShieldEllipsis;
      const color = label?.color || "gray";

      return (
        <div className="flex items-center space-x-2">
          <Icon size={22} color={color} /> {/* Adjust size and other styles as needed */}
          <span className="">{userType}</span>
        </div>
      );
    },
  },

  

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
