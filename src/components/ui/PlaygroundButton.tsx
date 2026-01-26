import React, { useState } from "react";

interface PlaygroundButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
  selectedBg?: string;
  selectedColor?: string;
  selectedBorder?: string;
  selectedShadow?: string;
  className?: string;
}

export function PlaygroundButton({
  children,
  onClick,
  isSelected,
  selectedBg = "var(--dss-jtech-accent)",
  selectedColor = "#ffffff",
  selectedBorder = "var(--dss-jtech-accent)",
  selectedShadow,
  className = "",
}: PlaygroundButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultBg = "rgba(255,255,255,0.05)";
  const hoverBg = "rgba(255,255,255,0.15)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
        ${className}`}
      style={{
        backgroundColor: isSelected 
          ? selectedBg 
          : isHovered 
            ? hoverBg 
            : defaultBg,
        color: isSelected ? selectedColor : "var(--jtech-text-body)",
        border: `1px solid ${isSelected ? selectedBorder : isHovered ? "rgba(255,255,255,0.3)" : "var(--jtech-card-border)"}`,
        boxShadow: isSelected 
          ? selectedShadow || `0 10px 15px -3px ${selectedBg}40`
          : isHovered 
            ? "0 4px 12px rgba(0,0,0,0.15)" 
            : undefined,
        transform: isHovered && !isSelected ? "scale(1.05)" : undefined,
      }}
    >
      {children}
    </button>
  );
}
