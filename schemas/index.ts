import { Box, CheckCheck, Home, Kanban, LineChart, Package, Printer, Settings, UploadCloudIcon, Users2 } from "lucide-react";
import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod.string().min(6,{message:"Emoployee Number 6 digit is required"}),
  password: zod.string().min(1, { message: "Password is required" }),
});


// Define the interface for user data
export interface UserData {
  userId: string;
  userName: string;
  isAdmin: boolean;
  userMail: string;
  userProfilePic: string;
  // Add other fields as needed
}



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

export const adminRoutes = [
  {
      icon: Home,
      href: "/home",
      label: "Home",
  },
  {
      icon: Package,
      href: "/assets",
      label: "Assets",
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
  {
      icon: UploadCloudIcon,
      href: "/upload",
      label: "Add / Upload",
  },
  {
      icon: Users2,
      href: "/users",
      label: "Users",
  },
  {
      icon: LineChart,
      href: "/analytics",
      label: "Analytics",
  },
  {
      icon: Settings,
      href: "/settings",
      label: "Settings",
  },
];
