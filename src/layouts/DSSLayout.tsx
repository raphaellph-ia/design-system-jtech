import { SidebarProvider } from "@/components/ui/sidebar";
import { DSSSidebar } from "@/components/navigation/DSSSidebar";
import { DSSHeader } from "@/components/navigation/DSSHeader";
import { Outlet } from "react-router-dom";

export function DSSLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <DSSSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DSSHeader />
          <main 
            className="flex-1 overflow-x-hidden overflow-y-auto"
            style={{ backgroundColor: 'var(--dss-page-bg)' }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
