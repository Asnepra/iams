import { ColumnDef } from "@tanstack/react-table";
import { User } from "./data/schema"; // Assuming User type is imported from your schema
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import Image from "next/image";

// Import icons from radix-ui/react-icons
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

// Import icons from lucide-react
import {
  Shield,
  ShieldEllipsis
} from "lucide-react";

// Import labels array defining user types and corresponding icons and colors
import { labels } from "./data/data";

// Create a map of gradient colors for each user type
const gradientColorMap:Record<string,string> = {
  Admin: "linear-gradient(to right, #30cfd0, #330867)",
  Normal: "linear-gradient(to right, #4facfe, #00f2fe)",
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "empNumber",
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
        <Image
          src={row.getValue("empProfilePicture") || "/user_profile.jpeg"}
          alt="Profile"
          width={40}
          height={40}
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
    cell: ({ row }) => {
      const userType = row.getValue("empRole") as string; // Assuming empType determines Admin or Normal
      const label = labels.find((label) => label.value === userType);
      const Icon = label?.icon || ShieldEllipsis; // Default to ShieldEllipsis if userType not found
      const color = label?.color || "gray"; // Default color
      const gradientColor = gradientColorMap[userType] || "gray"; // Default gradient color

      
      return (
        <div className={`flex items-center} space-x-2`} >
          <Icon size={22} color={`${color}`} /> {/* Adjust size and other styles as needed */}
          <span className="">{row.getValue("empRole")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
