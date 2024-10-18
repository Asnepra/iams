"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronRight, Package2Icon } from "lucide-react";
import { Separator } from './ui/separator';

interface SidebarProps {
  className?: string;
  routes: { 
    icon: React.ComponentType<any>; 
    href: string; 
    label: string; 
    subMenu?: { href: string; label: string }[] 
  }[];
}

const Sidebar = ({ className, routes }: SidebarProps) => {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true); // State to manage sidebar visibility

  return (
    <div className={`flex h-full ${className}`}>
      <aside className={`flex flex-col text-primary bg-secondary transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/home" className="flex items-center gap-2 font-semibold">
            <Package2Icon className="h-6 w-6" />
            <span>IT Assets</span>
          </Link>
          <button 
            className="ml-auto md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Sidebar"
          >
            {isOpen ? "Close" : "Open"}
          </button>
        </div>
        <TooltipProvider>
          <nav className="flex flex-col items-start gap-2 px-2 py-2 sm:py-5">
            {routes.map((route) => (
              <React.Fragment key={route.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='w-full'>
                      <Link 
                        href={route.subMenu ? '#' : route.href} // Link to '#' if it has a subMenu
                        className={`group flex h-8 w-full items-center px-2 gap-2 hover:bg-primary/20 hover:text-primary rounded-full cursor-pointer
                          ${pathname === route.href ? 'bg-primary text-primary-foreground font-semibold' : 'bg-secondary text-muted-foreground'} 
                          text-lg md:h-8 px-2 md:text-base whitespace-nowrap overflow-hidden`}
                        onClick={() => {
                          if (route.subMenu) {
                            setOpenSubMenu(openSubMenu === route.href ? null : route.href);
                          }
                        }}
                      >
                        <route.icon className="h-5 w-5" />
                        <span className="px-2">{route.label}</span>
                        {route.subMenu && <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${openSubMenu === route.href ? "transform rotate-90" : ""}`} />}
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">{route.label}</TooltipContent>
                </Tooltip>
                <Separator />

                {/* Render submenu if it exists and is open */}
                {openSubMenu === route.href && route.subMenu && (
                  <div className="pl-8">
                    {route.subMenu.map((subItem) => (
                      <Tooltip key={subItem.href}>
                        <TooltipTrigger asChild>
                          <Link 
                            href={subItem.href} 
                            className={`group flex h-8 items-center px-2 rounded-full hover:bg-primary/10 hover:text-primary
                              ${pathname === subItem.href ? 'bg-primary text-primary-foreground font-semibold' : 'bg-secondary text-muted-foreground'} 
                              text-lg md:h-8 px-2 md:text-base`}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top">{subItem.label}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
        </TooltipProvider>
      </aside>

      {/* Vertical Separator */}
      <div className="border-l border-gray-300"></div>
    </div>
  );
};

export default Sidebar;
