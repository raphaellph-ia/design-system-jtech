import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon?: LucideIcon;
  badge?: string;
  badgeVariant?: "default" | "accent";
  title: string;
  titleAccent?: string;
  subtitle?: string;
  subtitleHighlights?: string[];
  extraBadges?: Array<{ label: string; variant?: "info" | "success" | "warning" }>;
}

export function PageHeader({
  icon: Icon,
  badge,
  badgeVariant = "default",
  title,
  titleAccent,
  subtitle,
  subtitleHighlights = [],
  extraBadges = [],
}: PageHeaderProps) {
  // Função para renderizar subtitle com highlights
  const renderSubtitle = () => {
    if (!subtitle) return null;
    
    if (subtitleHighlights.length === 0) {
      return subtitle;
    }

    let result = subtitle;
    subtitleHighlights.forEach((highlight) => {
      result = result.replace(
        highlight,
        `<strong style="color: var(--jtech-heading-secondary)">${highlight}</strong>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section className="space-y-4">
      {/* Badges */}
      {(badge || extraBadges.length > 0) && (
        <div className="flex items-center gap-2 flex-wrap">
          {badge && (
            <Badge 
              variant="outline"
              className="text-xs font-medium"
              style={{ 
                borderColor: badgeVariant === "accent" 
                  ? 'var(--dss-jtech-accent)' 
                  : 'var(--jtech-card-border)',
                color: badgeVariant === "accent" 
                  ? 'var(--dss-jtech-accent-light)' 
                  : 'var(--jtech-heading-tertiary)',
                backgroundColor: badgeVariant === "accent"
                  ? 'var(--jtech-badge-bg)'
                  : 'transparent'
              }}
            >
              {badge}
            </Badge>
          )}
          {extraBadges.map((eb, index) => {
            const variants = {
              info: {
                bg: 'rgba(12, 196, 233, 0.1)',
                color: '#0cc4e9',
              },
              success: {
                bg: 'rgba(77, 210, 40, 0.1)',
                color: '#4dd228',
              },
              warning: {
                bg: 'rgba(250, 189, 20, 0.1)',
                color: '#fabd14',
              },
            };
            const v = variants[eb.variant || "info"];
            return (
              <Badge 
                key={index}
                className="text-xs font-medium"
                style={{ 
                  backgroundColor: v.bg,
                  color: v.color
                }}
              >
                {eb.label}
              </Badge>
            );
          })}
        </div>
      )}
      
      {/* Title */}
      <h1 
        className="text-3xl lg:text-4xl font-bold flex items-center gap-3"
        style={{ color: 'var(--jtech-heading-primary)' }}
      >
        {Icon && (
          <Icon 
            className="h-8 w-8" 
            style={{ color: 'var(--dss-jtech-accent)' }} 
          />
        )}
        <span>
          {title}
          {titleAccent && (
            <>
              {" "}
              <span style={{ color: 'var(--dss-jtech-accent)' }}>
                {titleAccent}
              </span>
            </>
          )}
        </span>
      </h1>
      
      {/* Subtitle */}
      {subtitle && (
        <p 
          className="text-lg max-w-3xl leading-relaxed"
          style={{ color: 'var(--jtech-text-body)' }}
        >
          {renderSubtitle()}
        </p>
      )}
    </section>
  );
}
