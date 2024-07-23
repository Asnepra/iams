// Import necessary icons from lucide-react
import { CheckCircledIcon, CrossCircledIcon, CubeIcon, QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { Box, CheckCheck, Home, Kanban, LineChart, Package, Printer, Settings, UploadCloudIcon, Users2, BoxesIcon, CircleIcon } from "lucide-react";
import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod.string().min(6, { message: "Employee Number 6 digit is required" }),
  password: zod.string().min(1, { message: "Password is required" }),
});

// Define the interface for user data
export interface UserData {
  userId: string;
  userName: string;
  userRole: string;
  userMail: string;
  userProfilePic: string;
  userDepartment:string;
  // Add other fields as needed
}

export interface PrinterCartridgeProps{
  assetData?: {
    assetId: number;
    assetModelId: number;
    status: string;
    assetModelName: string;
  }[];
  userData?: UserData | null;
}

export interface PrinterHistoryProps{
  printerId:string;
  printerModel:string;
  quantity:string; //but its number in DB
  reason:string;
  requestedOn:string; //date format in DB
  currentStatus:string; //approved etc.
}
export interface ColumnsStringArray{
  columnName:string;
}

export interface CartridgeProps{
  id: string;
  printerModel: string;
  quantity:string;
  reason: string;
  requestedOn: string;
  status: string;
}





export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const NORMAL_USER_ROLE="Normal";
export const IT_ADMIN_USER_ROLE="IT Admin";
export const HR_ADMIN_USER_ROLE="HR Admin";

export const ID_CARTRIDGE_STRING="id";
export const PRINTER_MODAL_STRING="printerModel";
export const QUANTITY_STRING="quantity";
export const REASON_STRING="reason";
export const REQUESTED_ON_STRING="requestedOn";
export const STATUS_STRING="status";

// Normal user routes
export const normalRoutes = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  {
    icon: Printer,
    href: "/request",
    label: "Request Cartridge",
  },
  {
    icon: Kanban,
    href: "/complaint",
    label: "Raise a complaint",
  },
];

// HR Admin routes
export const hrAdminRoutes = [
  ...normalRoutes,
  {
    icon: BoxesIcon,
    href: "/addstock",
    label: "Add Stocks",
  },
];

// IT Admin routes
export const itAdminRoutes = [
  ...normalRoutes,
  {
    icon: Package,
    href: "/assets",
    label: "Manage Assets",
  },
  {
    icon: UploadCloudIcon,
    href: "/upload",
    label: "Add / Upload",
  },
];

// Admin routes combining HR Admin and IT Admin routes
export const adminRoutes = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  {
    icon: Printer,
    href: "/request",
    label: "Request Cartridge",
  },
  {
    icon: CheckCheck,
    href: "/approve",
    label: "Approve Cartridge",
  },
  {
    icon: Kanban,
    href: "/complaint",
    label: "Raise a complaint",
  },
  {
    icon: Box,
    href: "/admin",
    label: "Assign ticket",
  },
  ...hrAdminRoutes,
  ...itAdminRoutes,
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
  },
];
