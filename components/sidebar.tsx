"use client";
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, Home, LineChart, Package, PanelLeft, PlusCircle, Search, Settings, ShoppingCart, Upload, Users2, GitPullRequest, Plus, Package2Icon } from "lucide-react"

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onNavigate = (url: string) => {
    return router.push(url);
  };

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
    },
    {
      icon: GitPullRequest,
      href: "/requests",
      label: "Requests",
    },
    {
      icon: Package,
      href: "/assets",
      label: "Assets",
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

  return (
    <div className={`space-y-4 flex flex-col h-full text-primary bg-secondary ${className}`}>
      <aside>
        <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold " href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">IT Assets</span>
            </Link>
            
          </div>
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {routes.map((route) => (
              <Tooltip key={route.href}>
                <TooltipTrigger asChild>
                  <Link href={route.href} className={`group flex h-9 w-36 shrink-0 items-center px-2
                   gap-2 rounded-full ${pathname === route.href ? 'bg-primary text-primary-foreground font-semibold' : 'bg-secondary text-muted-foreground'} text-lg  md:h-8 md:w-36 md:text-base`}>
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
    </div>
  );
};

export default Sidebar;
