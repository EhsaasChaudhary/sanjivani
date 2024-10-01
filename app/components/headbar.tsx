"use client"; // Make sure to include this at the top of your component

// import React, { useState } from "react";
import {
  // HoveredLink,
  Menu,
  // MenuItem,
  // ProductItem,
} from "@/components/ui/navbar-menu"; // Make sure to import your Navbar components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Import your Dropdown components
import { Button } from "@/components/ui/button"; // Import Button component
import Image from "next/image"; // Import Image component
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar />
    </div>
  );
}

function Navbar() {
  // const [active, setActive] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Home",
      links: [
        { href: "/", label: "Home" },
      ],
    },
    {
      title: "Dashboard",
      links: [
        { href: "/Dashboard", label: "Dashboard" },
      ],
    },
    {
      title: "About",
      links: [
        { href: "/about", label: "About" },
      ],
    },
  ];

  return (
    <div className="fixed top-10 inset-x-0 max-w-2xl z-50 p flex items-center justify-between">
      <Menu>
        <div className="flex-grow flex items-center justify-start">
          <span className="text-black font-bold text-lg">Sanjivani Care</span>
        </div>
        {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col space-y-4 text-sm">
              {item.links &&
                item.links.map((link, linkIndex) => (
                  <Link key={linkIndex} href={link.href}>{link.label}</Link>
                ))}
            </div>
        ))}
        <div className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                aria-haspopup="true"
                aria-expanded="false"
              >
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
        </div>
      </Menu>
    </div>
  );
}

export default NavbarDemo; // Ensure you're exporting the NavbarDemo for use in other parts of your app
