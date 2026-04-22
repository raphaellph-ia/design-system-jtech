import { SidebarProvider } from "@/components/ui/sidebar";
import { DSSSidebar } from "@/components/navigation/DSSSidebar";
import { DSSHeader } from "@/components/navigation/DSSHeader";
import { Outlet } from "react-router-dom";

export function DSSLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <DSSSidebar />
        <div className="flex min-w-0 flex-1 flex-col h-screen overflow-hidden">
          <DSSHeader />
          <main
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{ backgroundColor: 'var(--dss-page-bg)' }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
