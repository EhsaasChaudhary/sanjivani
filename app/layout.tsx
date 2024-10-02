"use client";

import React from "react";
// import { Headbar } from "./components/headbar";
import SidebarDemo from "./components/sidebar";
import Footer from "./components/footer";
import "./globals.css";
import { NavbarDemo } from "./components/headbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        {/* <Headbar/> */}
        <NavbarDemo />
        <div className="flex flex-1">
          {pathname !== "/" && <SidebarDemo />}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 min-h-screen">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
