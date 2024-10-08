
"use client"
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Package2Icon } from "lucide-react";
import { Separator } from './ui/separator';



interface SidebarProps {
  className?: string;
  routes: { icon: React.ComponentType<any>; href: string; label: string }[]; // Include routes prop
}

const Sidebar = ({ className, routes }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className={`flex h-full ${className}`}>
      {/* Sidebar */}
      <aside className="flex flex-col text-primary bg-secondary">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/home"
             className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span>IT Assets</span>
            
          </Link>
        </div>
        <TooltipProvider>
          <nav className="flex flex-col items-start gap-2 px-2 py-2 sm:py-5">
            {routes.map((route, index) => (
              <React.Fragment key={route.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={route.href} className={`group flex h-8 w-full items-center px-2 gap-2 rounded-full 
                      ${pathname === route.href ? 'bg-primary text-primary-foreground font-semibold'
                       : 'bg-secondary text-muted-foreground'} text-lg  md:h-8 md:w-52 md:text-base`}>
                      <route.icon className="h-5 w-5" />
                      <span className="px-2">{route.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">{route.label}</TooltipContent>
                </Tooltip>
                <Separator />
              </React.Fragment>
            ))}
          </nav>
        </TooltipProvider>
      </aside>
      
      {/* Vertical Separator */}
      <div className="border-l border-gray-300 "></div>
    </div>
  );
};

export default Sidebar;
