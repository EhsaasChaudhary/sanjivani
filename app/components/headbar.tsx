"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import { motion } from "framer-motion";

export function Headbar() {
  return (
    <header className="flex h-16 items-center gap-4 border-b pb-2 pt-2 justify-between bg-muted/40 px-4 lg:h-[70px] lg:px-6">
      {/* Left: Software name with icon */}
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
          <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium text-black dark:text-white whitespace-pre"
          ></motion.span>
        </div>
        <span>Sanjivani</span>
      </Link>

      {/* Center: Menubar */}

        <Menubar className="bg-muted/40 border-none flex justify-center">
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-muted/50">File</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-muted/50">Edit</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-muted/50">View</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      

      {/* Right: User profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Image
              src="https://assets.aceternity.com/manu.png"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
              alt="User Avatar"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            <span>Manu Arora</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
