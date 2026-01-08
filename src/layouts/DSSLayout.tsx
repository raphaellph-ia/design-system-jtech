import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DSSSidebar } from "@/components/navigation/DSSSidebar";
import { DSSHeader } from "@/components/navigation/DSSHeader";
import { Outlet } from "react-router-dom";

export function DSSLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DSSSidebar />
        <div className="flex-1 flex flex-col">
          <DSSHeader />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
