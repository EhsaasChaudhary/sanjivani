"use client";
import React, { useState } from "react";
import {
  IconBrandTabler,
  IconHospital,
  IconPill,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5" />,
    },
    {
      label: "Resource",
      href: "/resources",
      icon: <IconPill className="h-5 w-5" />,
    },
    {
      label: "Hospitals",
      href: "/hospitals",
      icon: <IconHospital className="h-5 w-5" />, // Changed to hospital icon
    },
  ];
  

  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false); // Close the sidebar
  };

  return (
    <div
      className={cn(
        "flex h-full rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <span></span> : <LogoIcon />}
            <div className="flex pt-20 flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{ ...link }}
                  onClick={handleLinkClick} 
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
    >
      {/* Add your logo or text here */}
    </Link>
  );
};
