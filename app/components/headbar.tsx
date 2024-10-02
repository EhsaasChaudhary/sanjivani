"use client"; // Ensure this is at the top of your component for Next.js

import { Button } from "@/components/ui/button"; // Import Button component
import Image from "next/image"; // Import Image component
import Link from "next/link"; // Import Link component
import { usePathname } from "next/navigation";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar />
    </div>
  );
}

function Navbar() {
  const pathname = usePathname(); // Get the current pathname
  const menuItems = [
    {
      title: "Home",
      links: [{ href: "/", label: "Home" }],
    },
    {
      title: "Dashboard",
      links: [{ href: "/dashboard", label: "Dashboard" }],
    },
    {
      title: "About",
      links: [{ href: "/about", label: "About" }],
    },
  ];

  // Determine the text color for the left heading
  const textColor = pathname === "/" ? 'text-white' : 'text-black'; // White for home, black for others

  return (
    <div className="fixed top-0 left-0 w-full bg-white/30 dark:bg-black/30 backdrop-blur-md backdrop-saturate-150 border border-transparent dark:border-white/[0.2] shadow-md flex justify-between items-center px-8 py-4 z-50">
      {/* Left section: Logo */}
      <div className="flex items-center">
        <span className={`font-bold text-lg ${textColor}`}>Sanjivani Care</span>
      </div>

      {/* Center section: Menu Items */}
      <nav className="flex-grow flex justify-center">
        <div className="flex space-x-8">
          {menuItems.map((item, index) => (
            <div key={index} className="text-sm">
              {item.links.map((link, linkIndex) => {
                // Determine if the link is active based on the current pathname
                // const isActive = pathname === link.href;

                return (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className={`font-bold px-3 py-2 transition-colors duration-200 rounded-md ${textColor} hover:bg-gray-700 hover:text-white`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      {/* Right section: User Avatar */}
      <div className="flex-shrink-0">
        <Link href="/profile"> {/* Navigate to the profile page on click */}
          <Button
            variant="ghost"
            size="icon"
            className="p-0 rounded-full outline-none focus:outline-none" // Remove outline on focus
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
            <span className="sr-only">Go to profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NavbarDemo;
