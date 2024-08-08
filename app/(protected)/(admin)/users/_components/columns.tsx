import { ColumnDef } from "@tanstack/react-table";
import { User } from "./data/schema";

import Image from "next/image";

// Import icons from radix-ui/react-icons
import {
  Shield,
  ShieldEllipsis
} from "lucide-react";

// Import labels array defining user types and corresponding icons and colors
import { labels } from "./data/data";
import FallbackImage from "@/components/fallback-Image";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { EMPDEPARTMENT_STRING, EMPLOYEENAME_STRING, EMPLOYEENUMBER_STRING, EMPMAIL_STRING, EMPPROFILEPIC_STRING, USERROLE_STRING } from "@/schemas";
import { getFullProfileUrl } from "@/lib/parseToken";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: EMPLOYEENUMBER_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Number" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue(EMPLOYEENUMBER_STRING)}</div>,

  },
  {
    accessorKey: EMPLOYEENAME_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center ">
      <FallbackImage
        src={getFullProfileUrl(row.getValue(EMPLOYEENUMBER_STRING)) || "/user_profile.jpeg"}
        alt="Profile"
        className="h-8 w-8 rounded-full mr-2"
        width={40}
        height={40}
      />
      {row.getValue(EMPLOYEENAME_STRING)}
    </div>
    ),
  },
  {
    accessorKey: EMPDEPARTMENT_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Department" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue(EMPDEPARTMENT_STRING)}</span>
    ),
  },
  {
    accessorKey: EMPMAIL_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Email" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue(EMPMAIL_STRING)}</span>
    ),
  },
  {
    accessorKey: USERROLE_STRING,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Role" />
    ),
    cell: ({ row }) => {
      const userType = row.getValue(USERROLE_STRING) as string;
      const label = labels.find((label) => label.value === userType);
      const Icon = label?.icon || ShieldEllipsis;
      const color = label?.color || "gray";

      return (
        <div className={`flex items-center space-x-2`}>
          <Icon size={22} fill={color} /> {/* Adjust size and other styles as needed */}
          <span className="">{userType}</span>
        </div>
      );
    },
  },

  

  
];
