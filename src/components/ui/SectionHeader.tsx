import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  titleAccent?: string;
  badge?: string;
  icon?: LucideIcon;
  variant?: "default" | "accent";
}

export function SectionHeader({
  title,
  titleAccent,
  badge,
  icon: Icon,
  variant = "default",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      {Icon && (
        <Icon 
          className="h-5 w-5" 
          style={{ 
            color: variant === "accent" 
              ? 'var(--dss-jtech-accent)' 
              : 'var(--jtech-heading-tertiary)' 
          }} 
        />
      )}
      <h2 
        className="text-xl font-semibold"
        style={{ color: 'var(--jtech-heading-secondary)' }}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span style={{ color: 'var(--dss-jtech-accent)' }}>
              {titleAccent}
            </span>
          </>
        )}
      </h2>
      {badge && (
        <Badge 
          variant="outline" 
          className="text-xs"
          style={{ 
            borderColor: variant === "accent"
              ? 'var(--dss-jtech-accent)'
              : 'var(--jtech-card-border)',
            color: variant === "accent"
              ? 'var(--dss-jtech-accent-light)'
              : 'var(--jtech-heading-tertiary)'
          }}
        >
          {badge}
        </Badge>
      )}
    </div>
  );
}
