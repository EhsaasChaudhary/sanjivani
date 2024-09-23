"use client";

import React, { useState } from "react";
import { Headbar } from "./components/headbar";
import SidebarDemo from "./components/sidebar";
import Footer from "./components/footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Headbar/>
        <div className="flex flex-1">
          <SidebarDemo />
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 min-h-screen">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
