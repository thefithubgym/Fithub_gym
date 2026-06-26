"use client";

import { useState } from "react";
import SideNavBar from "@/components/SideNavBar";
import TopNavBar from "@/components/TopNavBar";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminName?: string;
}

export default function AdminLayoutClient({ children, adminName }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background flex font-body-md antialiased overflow-x-hidden">
      <SideNavBar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        adminName={adminName}
      />
      <div className="flex-1 flex flex-col min-h-screen md:ml-72 bg-background min-w-0">
        <TopNavBar 
          onMenuClick={() => setSidebarOpen(true)} 
          adminName={adminName}
        />
        <main className="flex-1 p-md md:p-lg lg:p-xl flex flex-col gap-lg overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
