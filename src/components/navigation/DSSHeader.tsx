import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function DSSHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <header 
      className="h-14 flex items-center justify-between px-4 gap-4 relative overflow-hidden"
      style={{ 
        backgroundColor: 'var(--dss-header-bg)',
        borderBottom: '1px solid var(--dss-header-border)'
      }}
    >
      {/* Subtle animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(196, 30, 58, 0.05) 50%, transparent 100%)',
        }}
      />

      <div className="flex items-center gap-3 relative z-10">
        {/* Sidebar trigger with enhanced hover */}
        <SidebarTrigger 
          className={cn(
            "transition-all duration-200 ease-out rounded-md p-2",
            "hover:bg-white/10 hover:scale-105 active:scale-95"
          )}
          style={{ color: 'var(--dss-header-text)' }} 
        />

        {/* Animated separator */}
        <div 
          className="h-5 w-px transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--dss-header-border)',
            opacity: isLogoHovered ? 0.3 : 0.6,
          }} 
        />
        
        {/* Logo/Brand - Jtech Style with micro-interactions */}
        <div 
          className="flex items-center gap-2.5 group cursor-pointer"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div 
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center relative",
              "transition-all duration-300 ease-out",
              "group-hover:shadow-lg group-hover:scale-110"
            )}
            style={{ 
              backgroundColor: 'var(--dss-jtech-accent)',
              boxShadow: isLogoHovered 
                ? '0 4px 16px rgba(196, 30, 58, 0.4)' 
                : '0 2px 8px rgba(196, 30, 58, 0.2)',
            }}
          >
            <span 
              className={cn(
                "text-white font-bold text-xs",
                "transition-transform duration-200",
                "group-hover:scale-110"
              )}
            >
              JT
            </span>
            {/* Subtle glow ring on hover */}
            <div 
              className={cn(
                "absolute inset-0 rounded-lg transition-opacity duration-300",
                isLogoHovered ? "opacity-100" : "opacity-0"
              )}
              style={{
                boxShadow: '0 0 0 2px rgba(196, 30, 58, 0.3)',
              }}
            />
          </div>

          <div className="flex flex-col">
            <span 
              className={cn(
                "text-sm font-semibold hidden sm:block",
                "transition-all duration-200"
              )}
              style={{ 
                color: 'var(--dss-header-text)',
                transform: isLogoHovered ? 'translateX(2px)' : 'translateX(0)',
              }}
            >
              Design System Sansys
            </span>
            {/* Animated underline on hover */}
            <div 
              className="hidden sm:block h-[1px] transition-all duration-300 ease-out"
              style={{
                width: isLogoHovered ? '100%' : '0%',
                backgroundColor: 'var(--dss-jtech-accent)',
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 max-w-md flex-1 justify-end relative z-10">
        {/* Enhanced search input */}
        <div 
          className={cn(
            "relative flex-1 max-w-xs transition-all duration-300 ease-out",
            isSearchFocused && "max-w-sm"
          )}
        >
          {/* Search icon with animation */}
          <Search 
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
              "transition-all duration-200"
            )}
            style={{ 
              color: isSearchFocused ? 'var(--dss-jtech-accent-light)' : 'var(--dss-header-muted)',
              transform: isSearchFocused ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Buscar componentes, tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={cn(
              "pl-9 pr-12 h-9 border-0 rounded-lg",
              "transition-all duration-300 ease-out",
              "placeholder:transition-colors placeholder:duration-200"
            )}
            style={{ 
              backgroundColor: isSearchFocused 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(255, 255, 255, 0.08)',
              color: 'var(--dss-header-text)',
              boxShadow: isSearchFocused 
                ? '0 0 0 2px rgba(196, 30, 58, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)' 
                : 'none',
            }}
          />

          {/* Keyboard shortcut hint */}
          <div 
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "flex items-center gap-1 text-[10px] font-medium",
              "transition-all duration-200",
              isSearchFocused ? "opacity-0 scale-90" : "opacity-60 scale-100"
            )}
            style={{ color: 'var(--dss-header-muted)' }}
          >
            <kbd 
              className="px-1.5 py-0.5 rounded text-[9px] font-mono"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              ⌘K
            </kbd>
          </div>
        </div>
        
        {/* Version badge with hover effect */}
        <span 
          className={cn(
            "text-xs px-3 py-1.5 rounded-md hidden md:flex items-center gap-2",
            "transition-all duration-200 ease-out cursor-pointer",
            "hover:scale-105 active:scale-95"
          )}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--dss-header-muted)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(196, 30, 58, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
          }}
        >
          <div 
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--dss-positive)' }}
          />
          v2.0.0
        </span>
      </div>
    </header>
  );
}