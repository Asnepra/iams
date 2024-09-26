// Normal user routes
import { CheckCircledIcon, CrossCircledIcon, CubeIcon, QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { Box, CheckCheck, Home, Kanban, LineChart, Package, Printer, Settings, UploadCloudIcon, Users2, BoxesIcon, CircleIcon, Album } from "lucide-react";
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
      href: "/reports",
      label: "Reports",
    },
    {
      icon: CheckCheck,
      href: "/approve",
      label: "Approve Cartridge",
    },
  ];
  
  // IT Admin routes
  export const itAdminRoutes = [
    ...normalRoutes,
    {
      icon: BoxesIcon,
      href: "/addstock",
      label: "Add Cartridges",
    },
    {
      icon: CheckCheck,
      href: "/approve",
      label: "Approve Cartridge",
    },
    {
      icon: Album,
      href: "/reports",
      label: "Reports",
    },
    // {
    //   icon: Package,
    //   href: "/assets",
    //   label: "Manage Assets",
    // },
    // {
    //   icon: UploadCloudIcon,
    //   href: "/upload",
    //   label: "Add / Upload",
    // },
    
    {
      icon: Users2,
      href: "/users",
      label: "Users",
  },
  // {
  //     icon: LineChart,
  //     href: "/analytics",
  //     label: "Analytics",
  // },
  // {
  //     icon: Settings,
  //     href: "/settings",
  //     label: "Settings",
  // },
    
  ];
  
  // Admin routes combining HR Admin and IT Admin routes
//   export const adminRoutes = [
//     {
//       icon: Home,
//       href: "/home",
//       label: "Home",
//     },
//     {
//       icon: Printer,
//       href: "/request",
//       label: "Request Cartridge",
//     },
//     {
//       icon: CheckCheck,
//       href: "/approve",
//       label: "Approve Cartridge",
//     },
//     {
//       icon: Kanban,
//       href: "/complaint",
//       label: "Raise a complaint",
//     },
//     {
//       icon: Box,
//       href: "/admin",
//       label: "Assign ticket",
//     },
//     ...hrAdminRoutes,
//     ...itAdminRoutes,
//     {
//         icon: Users2,
//         href: "/users",
//         label: "Users",
//     },
//     {
//         icon: LineChart,
//         href: "/analytics",
//         label: "Analytics",
//     },
//     {
//         icon: Settings,
//         href: "/settings",
//         label: "Settings",
//     },
//   ];
  