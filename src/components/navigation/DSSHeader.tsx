import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DSSHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header 
      className="h-14 border-b flex items-center justify-between px-4 gap-4"
      style={{ 
        borderColor: 'var(--dss-gray-200)',
        backgroundColor: 'var(--dss-surface-default)'
      }}
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger style={{ color: 'var(--dss-dark-light)' }} />
        <div className="h-5 w-px" style={{ backgroundColor: 'var(--dss-gray-300)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--dss-dark-light)' }}>
          Design System Sansys
        </span>
      </div>

      <div className="flex items-center gap-4 max-w-md flex-1 justify-end">
        <div className="relative flex-1 max-w-xs">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: 'var(--dss-dark-light)' }}
          />
          <Input
            type="search"
            placeholder="Buscar componentes, tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
            style={{ 
              backgroundColor: 'var(--dss-surface-subtle)',
              borderColor: 'var(--dss-gray-300)',
              color: 'var(--dss-text-body)'
            }}
          />
        </div>
      </div>
    </header>
  );
}
