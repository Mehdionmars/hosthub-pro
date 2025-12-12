import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HostingHeader } from "@/components/hosting/dashboard/HostingHeader";
import { HostingSidebar } from "@/components/hosting/dashboard/HostingSidebar";

export default function Hosting() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <HostingHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <HostingSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64 pt-16">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}