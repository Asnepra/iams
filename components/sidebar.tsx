// "use client"
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  ChevronLeft, Home, LineChart, Package,
  PanelLeft, PlusCircle, Search,
  Settings, ShoppingCart, Upload,
  Users2, GitPullRequest, Plus,
  Package2Icon, UploadCloudIcon, Printer,
  Kanban
} from "lucide-react";
import { Separator } from './ui/separator';

interface SidebarProps {
  className?: string;
  isAdmin: boolean; // Accept isAdmin as a prop
}

const Sidebar = ({ className, isAdmin }: SidebarProps) => {

  const pathname = usePathname();

  const normalRoutes = [
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
      label: "Raise a concern",
    }
  ];

  const adminRoutes = [
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
      icon: Kanban,
      href: "/complaint",
      label: "Raise a concern",
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
    }
  ];

  const routesToRender = isAdmin ? adminRoutes : normalRoutes;

  return (
    <div className={`space-y-4 flex flex-col h-full text-primary bg-secondary ${className}`}>
      <aside>
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/home">
            <Package2Icon className="h-6 w-6" />
            <span className="">IT Assets</span>
          </Link>
        </div>
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {routesToRender.map((route) => (
              <Tooltip key={route.href}>
                <TooltipTrigger asChild>
                  <Link href={route.href} className={`group flex h-9 w-48 shrink-0 items-center px-2 gap-2 rounded-full 
                    ${pathname === route.href ? 'bg-primary text-primary-foreground font-semibold' : 'bg-secondary text-muted-foreground'} text-lg  md:h-8 md:w-48 md:text-base`}>
                    <route.icon className="h-5 w-5" />
                    <span className="px-2">{route.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{route.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </aside>
      <Separator orientation='vertical'/>
    </div>
  );
};

export default Sidebar;
