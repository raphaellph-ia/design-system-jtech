import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CollapsibleSectionProps {
  icon?: LucideIcon;
  title: string;
  titleAccent?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  icon: Icon,
  title,
  titleAccent,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className="rounded-xl border overflow-hidden transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)',
        borderColor: isOpen ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'
      }}
    >
      {/* Header clicável */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon 
              className="h-5 w-5" 
              style={{ color: 'var(--dss-jtech-accent)' }} 
            />
          )}
          <h3 
            className="text-lg font-semibold"
            style={{ color: 'var(--jtech-heading-primary)' }}
          >
            {title}
            {titleAccent && (
              <span style={{ color: 'var(--dss-jtech-accent)' }}>
                {" "}{titleAccent}
              </span>
            )}
          </h3>
        </div>
        
        <div 
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          <span>{isOpen ? 'Recolher' : 'Expandir'}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {/* Conteúdo expansível */}
      <div 
        className={`
          transition-all duration-300 ease-out overflow-hidden
          ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-4 pt-0 border-t" style={{ borderColor: 'var(--jtech-card-border)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
