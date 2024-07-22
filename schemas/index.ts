// Import necessary icons from lucide-react
import { CubeIcon } from "@radix-ui/react-icons";
import { Box, CheckCheck, Home, Kanban, LineChart, Package, Printer, Settings, UploadCloudIcon, Users2, BoxesIcon } from "lucide-react";
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

export const NORMAL_USER_ROLE="Normal";
export const IT_ADMIN_USER_ROLE="IT Admin";
export const HR_ADMIN_USER_ROLE="HR Admin";

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
