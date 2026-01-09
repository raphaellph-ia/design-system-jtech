import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DSSHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header 
      className="h-14 flex items-center justify-between px-4 gap-4"
      style={{ 
        backgroundColor: 'var(--dss-header-bg)',
        borderBottom: '1px solid var(--dss-header-border)'
      }}
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger 
          className="hover:bg-white/10 transition-colors"
          style={{ color: 'var(--dss-header-text)' }} 
        />
        <div className="h-5 w-px" style={{ backgroundColor: 'var(--dss-header-border)' }} />
        
        {/* Logo/Brand - Jtech Style */}
        <div className="flex items-center gap-2">
          <div 
            className="h-7 w-7 rounded flex items-center justify-center"
            style={{ backgroundColor: 'var(--dss-jtech-accent)' }}
          >
            <span className="text-white font-bold text-xs">JT</span>
          </div>
          <span className="text-sm font-semibold hidden sm:block" style={{ color: 'var(--dss-header-text)' }}>
            Design System Sansys
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 max-w-md flex-1 justify-end">
        <div className="relative flex-1 max-w-xs">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: 'var(--dss-header-muted)' }}
          />
          <Input
            type="search"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 border-0 focus-visible:ring-1 focus-visible:ring-white/30"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--dss-header-text)',
            }}
          />
        </div>
        
        {/* Version badge */}
        <span 
          className="text-xs px-2 py-1 rounded hidden md:block"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--dss-header-muted)'
          }}
        >
          v2.0.0
        </span>
      </div>
    </header>
  );
}
