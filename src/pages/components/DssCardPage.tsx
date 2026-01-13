import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { 
  Copy, Check, Layers, Code, FileText, 
  LayoutDashboard, Image, CreditCard, User, Settings,
  ChevronRight, MoreHorizontal, Heart, Share2, Bookmark,
  Loader2, Mail, Star, Bell
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ============================================================================
// TOKENS REAIS DO DSS - Extraídos de index.css e globals.scss
// ============================================================================

// Variantes Visuais do DssCard
const variants = [
  { name: "elevated", label: "Elevated", desc: "Card com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Sem elevação, apenas background", hasElevation: false },
  { name: "bordered", label: "Bordered", desc: "Com borda + elevação", hasElevation: true },
  { name: "outlined", label: "Outlined", desc: "Com borda, sem elevação", hasElevation: false },
];

// ============================================================================
// CORES SEMÂNTICAS DSS - Padrão Quasar
// ============================================================================
const semanticColors = {
  primary: {
    name: "primary",
    label: "Primary",
    icon: "🔵",
    bg: "var(--dss-action-primary)",
    hover: "var(--dss-action-primary-hover)",
    light: "var(--dss-action-primary-light)",
    deep: "var(--dss-action-primary-deep)",
    disable: "var(--dss-action-primary-disable)",
    textColor: "#ffffff",
    // Fallback values
    bgFallback: "#1f86de",
    hoverFallback: "#1a70c2",
    lightFallback: "#e5f0ff",
    deepFallback: "#0d5aa0"
  },
  secondary: {
    name: "secondary",
    label: "Secondary",
    icon: "🟣",
    bg: "var(--dss-action-secondary)",
    hover: "var(--dss-action-secondary-hover)",
    light: "var(--dss-action-secondary-light)",
    deep: "var(--dss-action-secondary-deep)",
    disable: "var(--dss-action-secondary-disable)",
    textColor: "#ffffff",
    bgFallback: "#26a69a",
    hoverFallback: "#1e8e82",
    lightFallback: "#e0f2f1",
    deepFallback: "#00695c"
  },
  positive: {
    name: "positive",
    label: "Positive",
    icon: "✅",
    bg: "var(--dss-feedback-success)",
    hover: "var(--dss-feedback-success-hover)",
    light: "var(--dss-feedback-success-light)",
    deep: "var(--dss-feedback-success-deep)",
    disable: "var(--dss-feedback-success-disable)",
    textColor: "#ffffff",
    bgFallback: "#21ba45",
    hoverFallback: "#1aa23c",
    lightFallback: "#e8f5e9",
    deepFallback: "#0f7a26"
  },
  negative: {
    name: "negative",
    label: "Negative",
    icon: "❌",
    bg: "var(--dss-feedback-error)",
    hover: "var(--dss-feedback-error-hover)",
    light: "var(--dss-feedback-error-light)",
    deep: "var(--dss-feedback-error-deep)",
    disable: "var(--dss-feedback-error-disable)",
    textColor: "#ffffff",
    bgFallback: "#c10015",
    hoverFallback: "#a60013",
    lightFallback: "#ffebee",
    deepFallback: "#8a000e"
  },
  warning: {
    name: "warning",
    label: "Warning",
    icon: "⚠️",
    bg: "var(--dss-feedback-warning)",
    hover: "var(--dss-feedback-warning-hover)",
    light: "var(--dss-feedback-warning-light)",
    deep: "var(--dss-feedback-warning-deep)",
    disable: "var(--dss-feedback-warning-disable)",
    textColor: "#1a1a1a",
    bgFallback: "#f2c037",
    hoverFallback: "#d9a82f",
    lightFallback: "#fff8e1",
    deepFallback: "#c49a12"
  },
  info: {
    name: "info",
    label: "Info",
    icon: "ℹ️",
    bg: "var(--dss-feedback-info)",
    hover: "var(--dss-feedback-info-hover)",
    light: "var(--dss-feedback-info-light)",
    deep: "var(--dss-feedback-info-deep)",
    disable: "var(--dss-feedback-info-disable)",
    textColor: "#ffffff",
    bgFallback: "#31ccec",
    hoverFallback: "#27b8d5",
    lightFallback: "#e1f5fe",
    deepFallback: "#1fa3bf"
  }
};

// Paletas de Marca REAIS do DSS (Veolia Brands)
const brandColors = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",
    scale: {
      50: "#fff9ed", 100: "#fef2d6", 200: "#fde2ab", 300: "#fbcb76", 
      400: "#f8aa3f", 500: "#f5911a", 600: "#ef7a11", 700: "#bf590f", 
      800: "#984614", 900: "#7a3614", 950: "#421d08"
    },
    tokens: {
      principal: "--dss-hub-600",
      hover: "--dss-hub-700",
      light: "--dss-hub-300",
      disable: "--dss-hub-200"
    }
  },
  water: {
    name: "water",
    label: "Water",
    icon: "🔵",
    principal: "#0e88e4",
    scale: {
      50: "#f0f7ff", 100: "#e0eefe", 200: "#badefd", 300: "#7dc4fc", 
      400: "#38a6f8", 500: "#0e88e4", 600: "#026cc7", 700: "#0356a1", 
      800: "#074a85", 900: "#0c3e6e", 950: "#082749"
    },
    tokens: {
      principal: "--dss-water-500",
      hover: "--dss-water-600",
      light: "--dss-water-300",
      disable: "--dss-water-200"
    }
  },
  waste: {
    name: "waste",
    label: "Waste",
    icon: "🟢",
    principal: "#18b173",
    scale: {
      50: "#edfcf4", 100: "#d3f8e2", 200: "#abefcb", 300: "#74e1ae", 
      400: "#3ccb8d", 500: "#18b173", 600: "#0b8154", 700: "#0a724e", 
      800: "#0a5b3e", 900: "#0a4a34", 950: "#042a1e"
    },
    tokens: {
      principal: "--dss-waste-500",
      hover: "--dss-waste-600",
      light: "--dss-waste-300",
      disable: "--dss-waste-200"
    }
  }
};

// Props API do DssCard
const propsData = [
  { category: "Visual", prop: "variant", type: "'elevated' | 'flat' | 'bordered' | 'outlined'", default: "'elevated'", description: "Estilo visual do card" },
  { category: "Visual", prop: "square", type: "Boolean", default: "false", description: "Remove border-radius (cantos quadrados)" },
  { category: "Interação", prop: "clickable", type: "Boolean", default: "false", description: "Torna o card interativo (hover/focus)" },
  { category: "Tema", prop: "dark", type: "Boolean", default: "false", description: "Aplica modo escuro ao card" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Veolia" },
];

// Props do DssCardSection
const sectionPropsData = [
  { prop: "horizontal", type: "Boolean", default: "false", description: "Layout horizontal (flex-row)" },
];

// Props do DssCardActions
const actionsPropsData = [
  { prop: "align", type: "'left' | 'center' | 'right' | 'between' | 'around'", default: "'right'", description: "Alinhamento dos botões" },
  { prop: "vertical", type: "Boolean", default: "false", description: "Layout vertical para ações" },
];

// Tokens utilizados pelo DssCard
const tokensUsed = [
  { category: "Surface", token: "--dss-surface-default", value: "#ffffff", usage: "Background padrão" },
  { category: "Surface", token: "--dss-surface-dark", value: "#2a2a2a", usage: "Background dark mode" },
  { category: "Surface", token: "--dss-surface-hover", value: "rgba(0,0,0,0.04)", usage: "Hover em cards flat" },
  { category: "Elevation", token: "--dss-elevation-1", value: "0 1px 3px rgba(0,0,0,0.1)", usage: "Elevação padrão" },
  { category: "Elevation", token: "--dss-elevation-2", value: "0 4px 6px rgba(0,0,0,0.12)", usage: "Hover elevation" },
  { category: "Border", token: "--dss-gray-300", value: "#d4d4d4", usage: "Borda bordered/outlined" },
  { category: "Border", token: "--dss-gray-400", value: "#a3a3a3", usage: "Borda hover" },
  { category: "Border Radius", token: "--dss-radius-lg", value: "12px", usage: "Border-radius padrão" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding actions" },
  { category: "Spacing", token: "--dss-spacing-6", value: "24px", usage: "Padding sections" },
  { category: "Brands", token: "--dss-hub-600", value: "#ef7a11", usage: "Brand Hub border" },
  { category: "Brands", token: "--dss-water-500", value: "#0e88e4", usage: "Brand Water border" },
  { category: "Brands", token: "--dss-waste-500", value: "#18b173", usage: "Brand Waste border" },
];

// Anatomia 4 Camadas DSS
const anatomyLayers = [
  { layer: 1, name: "Structure", file: "1-structure/DssCard.vue", desc: "Template Vue + Props + Slots", color: "#ef7a11" },
  { layer: 2, name: "Composition", file: "2-composition/_base.scss", desc: "Layout, padding, overflow", color: "#0e88e4" },
  { layer: 3, name: "Variants", file: "3-variants/*.scss", desc: "elevated, flat, bordered, outlined", color: "#18b173" },
  { layer: 4, name: "Output", file: "4-output/*.scss", desc: "Dark mode, brands, estados", color: "#ff6607" },
];

// ============================================================================
// DSS INNER COMPONENTS - Componentes Internos Reais do DSS
// ============================================================================

// Utility para obter cores com base em colorKey ou brand
function getColorConfig(colorKey?: string | null, brand?: string | null) {
  if (colorKey && semanticColors[colorKey as keyof typeof semanticColors]) {
    const color = semanticColors[colorKey as keyof typeof semanticColors];
    return {
      bg: color.bgFallback,
      hover: color.hoverFallback,
      light: color.lightFallback,
      deep: color.deepFallback,
      text: color.textColor,
      token: `--dss-action-${colorKey}`
    };
  }
  if (brand && brandColors[brand as keyof typeof brandColors]) {
    const b = brandColors[brand as keyof typeof brandColors];
    return {
      bg: b.principal,
      hover: b.scale[700],
      light: b.scale[100],
      deep: b.scale[800],
      text: "#ffffff",
      token: `--dss-${brand}-600`
    };
  }
  return {
    bg: "#1f86de",
    hover: "#1a70c2",
    light: "#e5f0ff",
    deep: "#0d5aa0",
    text: "#ffffff",
    token: "--dss-action-primary"
  };
}

// ============================================================================
// DssAvatarPreview - Componente Avatar DSS com tokens reais
// ============================================================================
interface DssAvatarPreviewProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorKey?: string | null;
  brand?: string | null;
  icon?: React.ReactNode;
  src?: string;
  initials?: string;
  square?: boolean;
  dark?: boolean;
}

function DssAvatarPreview({
  size = "md",
  colorKey = "primary",
  brand = null,
  icon,
  src,
  initials,
  square = false,
  dark = false,
}: DssAvatarPreviewProps) {
  const colors = getColorConfig(colorKey, brand);
  
  const sizeMap = {
    xs: { container: 24, font: 10, icon: 12 },
    sm: { container: 32, font: 12, icon: 16 },
    md: { container: 40, font: 14, icon: 20 },
    lg: { container: 56, font: 18, icon: 28 },
    xl: { container: 72, font: 24, icon: 36 },
  };
  
  const s = sizeMap[size];
  
  return (
    <div
      style={{
        width: s.container,
        height: s.container,
        borderRadius: square ? "8px" : "50%",
        backgroundColor: colors.light,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
      title="DssAvatar"
    >
      {src ? (
        <img 
          src={src} 
          alt="Avatar" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : icon ? (
        <span style={{ color: colors.bg, width: s.icon, height: s.icon, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </span>
      ) : initials ? (
        <span style={{ color: colors.bg, fontSize: s.font, fontWeight: 600 }}>
          {initials}
        </span>
      ) : (
        <User style={{ color: colors.bg, width: s.icon, height: s.icon }} />
      )}
    </div>
  );
}

// ============================================================================
// DssBadgePreview - Componente Badge DSS com tokens reais
// ============================================================================
interface DssBadgePreviewProps {
  label: string;
  colorKey?: string | null;
  brand?: string | null;
  variant?: "filled" | "outline" | "soft";
  size?: "xs" | "sm" | "md";
  rounded?: boolean;
  dark?: boolean;
}

function DssBadgePreview({
  label,
  colorKey = "primary",
  brand = null,
  variant = "filled",
  size = "sm",
  rounded = false,
  dark = false,
}: DssBadgePreviewProps) {
  const colors = getColorConfig(colorKey, brand);
  
  const sizeStyles = {
    xs: { padding: "2px 6px", fontSize: "9px" },
    sm: { padding: "3px 8px", fontSize: "10px" },
    md: { padding: "4px 10px", fontSize: "11px" },
  };
  
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          color: colors.bg,
          border: `1px solid ${colors.bg}`,
        };
      case "soft":
        return {
          backgroundColor: colors.light,
          color: colors.deep,
          border: "none",
        };
      case "filled":
      default:
        return {
          backgroundColor: colors.bg,
          color: colors.text,
          border: "none",
        };
    }
  };
  
  return (
    <span
      style={{
        ...sizeStyles[size],
        ...getVariantStyles(),
        display: "inline-flex",
        alignItems: "center",
        borderRadius: rounded ? "9999px" : "4px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
      title="DssBadge"
    >
      {label}
    </span>
  );
}

// ============================================================================
// DssButtonPreview - Componente Button DSS com tokens reais (para uso interno)
// ============================================================================
interface DssButtonPreviewProps {
  label?: string;
  colorKey?: string | null;
  brand?: string | null;
  variant?: "elevated" | "flat" | "outline" | "unelevated";
  size?: "xs" | "sm" | "md";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  dark?: boolean;
}

function DssButtonPreview({
  label = "Button",
  colorKey = "primary",
  brand = null,
  variant = "elevated",
  size = "sm",
  disabled = false,
  loading = false,
  icon,
  iconOnly = false,
  dark = false,
}: DssButtonPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = getColorConfig(colorKey, brand);
  
  const sizeStyles = {
    xs: { height: 24, padding: iconOnly ? "0 6px" : "0 8px", fontSize: 10, iconSize: 12 },
    sm: { height: 28, padding: iconOnly ? "0 8px" : "0 12px", fontSize: 11, iconSize: 14 },
    md: { height: 36, padding: iconOnly ? "0 10px" : "0 16px", fontSize: 12, iconSize: 16 },
  };
  
  const s = sizeStyles[size];
  
  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderRadius: "4px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      whiteSpace: "nowrap",
    };
    
    switch (variant) {
      case "flat":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.light : "transparent",
          color: isHovered && !disabled ? colors.hover : colors.bg,
          border: "none",
          boxShadow: "none",
        };
      case "outline":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.light : "transparent",
          color: isHovered && !disabled ? colors.hover : colors.bg,
          border: `1px solid ${isHovered && !disabled ? colors.hover : colors.bg}`,
          boxShadow: "none",
        };
      case "unelevated":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.text,
          border: "none",
          boxShadow: "none",
        };
      case "elevated":
      default:
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.text,
          border: "none",
          boxShadow: isHovered && !disabled 
            ? "0 3px 6px rgba(0,0,0,0.16)" 
            : "0 1px 3px rgba(0,0,0,0.12)",
        };
    }
  };
  
  return (
    <button
      style={getVariantStyles()}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="DssButton"
    >
      {loading ? (
        <Loader2 style={{ width: s.iconSize, height: s.iconSize }} className="animate-spin" />
      ) : (
        <>
          {icon && <span style={{ width: s.iconSize, height: s.iconSize, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>}
          {!iconOnly && label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

// ============================================================================
// DssSeparatorPreview - Componente Separator DSS com tokens reais
// ============================================================================
interface DssSeparatorPreviewProps {
  orientation?: "horizontal" | "vertical";
  colorKey?: string | null;
  brand?: string | null;
  inset?: boolean;
  dark?: boolean;
}

function DssSeparatorPreview({
  orientation = "horizontal",
  colorKey = null,
  brand = null,
  inset = false,
  dark = false,
}: DssSeparatorPreviewProps) {
  const colors = colorKey || brand ? getColorConfig(colorKey, brand) : null;
  const borderColor = colors ? colors.light : (dark ? "rgba(255,255,255,0.12)" : "#e5e5e5");
  
  return (
    <div
      style={{
        width: orientation === "horizontal" ? "100%" : "1px",
        height: orientation === "horizontal" ? "1px" : "100%",
        backgroundColor: borderColor,
        margin: inset ? (orientation === "horizontal" ? "0 16px" : "16px 0") : 0,
        flexShrink: 0,
      }}
      title="DssSeparator"
    />
  );
}

// ============================================================================
// DssIconPreview - Componente Icon DSS com tokens reais
// ============================================================================
interface DssIconPreviewProps {
  icon: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  colorKey?: string | null;
  brand?: string | null;
  dark?: boolean;
}

function DssIconPreview({
  icon,
  size = "md",
  colorKey = "primary",
  brand = null,
  dark = false,
}: DssIconPreviewProps) {
  const colors = getColorConfig(colorKey, brand);
  
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const s = sizeMap[size];
  
  return (
    <span
      style={{
        width: s,
        height: s,
        color: colors.bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title="DssIcon"
    >
      {icon}
    </span>
  );
}

// ============================================================================
// COMPONENTE CARD PREVIEW COM TOKENS REAIS E COMPONENTES INTERNOS DSS
// ============================================================================

interface DssCardPreviewProps {
  variant?: string;
  clickable?: boolean;
  square?: boolean;
  dark?: boolean;
  brand?: string | null;
  semanticColor?: string | null;
  children?: React.ReactNode;
  showToken?: boolean;
}

function DssCardPreview({
  variant = "elevated",
  clickable = false,
  square = false,
  dark = false,
  brand = null,
  semanticColor = null,
  children,
  showToken = false,
}: DssCardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Obter cor (semântica tem prioridade sobre brand)
  const getCardColorConfig = () => {
    if (semanticColor && semanticColors[semanticColor as keyof typeof semanticColors]) {
      const color = semanticColors[semanticColor as keyof typeof semanticColors];
      return {
        border: color.bgFallback,
        light: color.lightFallback,
        hover: color.hoverFallback,
        text: color.textColor,
        bg: color.bgFallback,
        token: `--dss-action-${semanticColor}`
      };
    }
    if (brand && brandColors[brand as keyof typeof brandColors]) {
      const brandData = brandColors[brand as keyof typeof brandColors];
      return {
        border: brandData.principal,
        light: brandData.scale[100],
        hover: brandData.scale[700],
        text: "#ffffff",
        bg: brandData.principal,
        token: `--dss-${brand}-600`
      };
    }
    return null;
  };

  const colorConfig = getCardColorConfig();

  // Estilos baseados na variante COM suporte a hover dinâmico e cores semânticas
  const getVariantStyles = (): React.CSSProperties => {
    const borderColor = colorConfig?.border || undefined;
    const lightBg = colorConfig?.light || undefined;
    
    const base: React.CSSProperties = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      backgroundColor: dark ? "#2a2a2a" : "#ffffff",
      color: dark ? "#ffffff" : "#1a1a1a",
      borderRadius: square ? "0" : "12px",
      overflow: "hidden",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: clickable ? "pointer" : "default",
      borderLeft: colorConfig ? `4px solid ${borderColor}` : undefined,
    };

    switch (variant) {
      case "flat":
        return {
          ...base,
          boxShadow: "none",
          backgroundColor: isHovered && clickable 
            ? (colorConfig ? lightBg : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"))
            : (dark ? "#2a2a2a" : "#ffffff"),
        };
      case "bordered":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? (colorConfig ? colorConfig.hover : "#a3a3a3") : "#d4d4d4"}`,
          borderLeftWidth: colorConfig ? "4px" : "1px",
          borderLeftColor: colorConfig ? (isHovered && clickable ? colorConfig.hover : borderColor) : (isHovered && clickable ? "#a3a3a3" : "#d4d4d4"),
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.1)",
        };
      case "outlined":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? (colorConfig ? colorConfig.hover : "#1f86de") : "#d4d4d4"}`,
          borderLeftWidth: colorConfig ? "4px" : "1px",
          borderLeftColor: colorConfig ? (isHovered && clickable ? colorConfig.hover : borderColor) : (isHovered && clickable ? "#1f86de" : "#d4d4d4"),
          boxShadow: "none",
          backgroundColor: isHovered && clickable 
            ? (colorConfig ? lightBg : "rgba(31, 134, 222, 0.05)") 
            : (dark ? "#2a2a2a" : "#ffffff"),
        };
      case "elevated":
      default:
        return {
          ...base,
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.1)",
        };
    }
  };

  const tokenName = colorConfig?.token || `--dss-elevation-${variant === "elevated" ? "1" : "0"}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        style={getVariantStyles()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? "button" : undefined}
      >
        {children}
      </div>
      {showToken && (
        <code 
          className="text-[10px] font-mono mt-2"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {tokenName}
        </code>
      )}
    </div>
  );
}

// Card Section Component
function CardSection({ 
  children, 
  horizontal = false,
  className = "",
  style = {},
  isFirst = false,
  brand = null,
  semanticColor = null
}: { 
  children: React.ReactNode; 
  horizontal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isFirst?: boolean;
  brand?: string | null;
  semanticColor?: string | null;
}) {
  // Cor semântica tem prioridade
  let bgColor: string | undefined;
  if (isFirst) {
    if (semanticColor && semanticColors[semanticColor as keyof typeof semanticColors]) {
      bgColor = semanticColors[semanticColor as keyof typeof semanticColors].lightFallback;
    } else if (brand && brandColors[brand as keyof typeof brandColors]) {
      bgColor = `${brandColors[brand as keyof typeof brandColors].principal}0d`;
    }
  }
  
  return (
    <div 
      className={`p-6 ${horizontal ? "flex items-center gap-4" : ""} ${className}`}
      style={{
        ...style,
        backgroundColor: bgColor,
      }}
    >
      {children}
    </div>
  );
}

// Card Actions Component
function CardActions({ 
  children, 
  align = "right" 
}: { 
  children: React.ReactNode; 
  align?: "left" | "center" | "right" | "between" | "around";
}) {
  const justifyMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
    between: "space-between",
    around: "space-around",
  };

  return (
    <div 
      className="flex gap-2 p-4"
      style={{
        justifyContent: justifyMap[align],
        borderTop: "1px solid #e5e5e5",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// TOKEN ROW COMPONENT (Jtech Style)
// ============================================================================

function TokenRow({ token, value, usage }: { token: string; value: string; usage: string }) {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = value.startsWith("#") || value.startsWith("rgb");

  return (
    <div 
      className="group flex items-center gap-4 py-3 px-4 rounded-lg transition-all cursor-pointer"
      onClick={copyToken}
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)',
        border: '1px solid var(--jtech-card-border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-hover-border)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {isColor && (
        <div 
          className="w-8 h-8 rounded-md flex-shrink-0"
          style={{ backgroundColor: value, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        />
      )}
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono" style={{ color: 'var(--jtech-heading-secondary)' }}>
          {token}
        </code>
        <p className="text-xs mt-0.5" style={{ color: 'var(--jtech-text-body)' }}>{usage}</p>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-[10px] font-mono" style={{ color: 'var(--jtech-text-muted)' }}>
          {value}
        </code>
        {copied ? (
          <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} />
        ) : (
          <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--jtech-text-muted)' }} />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssCardPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSemanticColor, setSelectedSemanticColor] = useState<string | null>(null);
  const [isClickable, setIsClickable] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  // Determina qual cor usar (semântica tem prioridade sobre brand)
  const activeColorType = selectedSemanticColor ? 'semantic' : (selectedBrand ? 'brand' : null);
  const activeColor = selectedSemanticColor || selectedBrand;

  const codeExample = `<DssCard
  variant="${selectedVariant}"${selectedSemanticColor ? `\n  color="${selectedSemanticColor}"` : ""}${selectedBrand && !selectedSemanticColor ? `\n  brand="${selectedBrand}"` : ""}${isClickable ? "\n  clickable" : ""}${isSquare ? "\n  square" : ""}${isDark ? "\n  dark" : ""}
>
  <DssCardSection>
    <h3>Título do Card</h3>
    <p>Conteúdo do card aqui.</p>
  </DssCardSection>
  <DssCardActions>
    <DssButton variant="flat">Cancelar</DssButton>
    <DssButton>Confirmar</DssButton>
  </DssCardActions>
</DssCard>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokensByCategory = tokensUsed.reduce((acc, token) => {
    if (!acc[token.category]) acc[token.category] = [];
    acc[token.category].push(token);
    return acc;
  }, {} as Record<string, typeof tokensUsed>);

  // Obter cor ativa (semântica ou brand)
  const getActiveColorStyles = () => {
    if (selectedSemanticColor && semanticColors[selectedSemanticColor as keyof typeof semanticColors]) {
      const color = semanticColors[selectedSemanticColor as keyof typeof semanticColors];
      return {
        border: color.bgFallback,
        light: color.lightFallback,
        hover: color.hoverFallback,
        text: color.textColor,
        bg: color.bgFallback
      };
    }
    if (selectedBrand && brandColors[selectedBrand as keyof typeof brandColors]) {
      const brand = brandColors[selectedBrand as keyof typeof brandColors];
      return {
        border: brand.principal,
        light: brand.scale[100],
        hover: brand.scale[700],
        text: "#ffffff",
        bg: brand.principal
      };
    }
    return null;
  };

  const colorStyles = getActiveColorStyles();

  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Header - Jtech Style */}
      <PageHeader
        icon={LayoutDashboard}
        badge="DSS Component"
        badgeVariant="default"
        title="Componente"
        titleAccent="DssCard"
        subtitle="Container flexível para agrupamento de conteúdo. Implementa tokens genéricos DSS, arquitetura 4 camadas, brandability completa e acessibilidade WCAG 2.1 AA."
        subtitleHighlights={["tokens genéricos DSS", "arquitetura 4 camadas", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* Quick Stats - Jtech Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "4", label: "Variantes", color: "#1f86de" },
          { value: "3", label: "Subcomponentes", color: "#26a69a" },
          { value: "3", label: "Brands Veolia", color: brandColors.hub.principal },
          { value: "2", label: "Temas", color: brandColors.waste.principal },
        ].map((stat, i) => (
          <Card 
            key={i}
            className="transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Playground - Jtech Style */}
      <SectionHeader
        title="Playground"
        titleAccent="Interativo"
        badge="Live Preview"
      />

      <Card 
        className="overflow-hidden"
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--dss-jtech-accent)',
          borderWidth: '2px'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
            <Code className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
            Configure o Card
          </CardTitle>
          <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
            Selecione as props e veja o resultado em tempo real com tokens DSS reais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div 
            className="p-8 rounded-lg flex items-center justify-center min-h-[280px] relative"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.3)',
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          >
            <DssCardPreview
              variant={selectedVariant}
              clickable={isClickable}
              square={isSquare}
              dark={isDark}
              brand={selectedSemanticColor ? null : selectedBrand}
              semanticColor={selectedSemanticColor}
              showToken={true}
            >
              <CardSection isFirst={true} brand={selectedSemanticColor ? null : selectedBrand} semanticColor={selectedSemanticColor}>
                {/* Header com DssAvatar + DssBadge */}
                <div className="flex items-center gap-3 mb-3">
                  <DssAvatarPreview 
                    size="md" 
                    colorKey={selectedSemanticColor}
                    brand={selectedSemanticColor ? null : selectedBrand}
                    icon={<User style={{ width: 20, height: 20 }} />}
                    dark={isDark}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm" style={{ color: isDark ? '#ffffff' : '#1a1a1a' }}>
                        Título do Card
                      </h4>
                      <DssBadgePreview 
                        label="NOVO" 
                        colorKey={selectedSemanticColor}
                        brand={selectedSemanticColor ? null : selectedBrand}
                        variant="soft"
                        size="xs"
                        dark={isDark}
                      />
                    </div>
                    <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#666' }}>
                      Subtítulo ou descrição
                    </p>
                  </div>
                  <DssIconPreview 
                    icon={<MoreHorizontal style={{ width: "100%", height: "100%" }} />}
                    size="md"
                    colorKey={isDark ? null : "primary"}
                    dark={isDark}
                  />
                </div>
                
                {/* DssSeparator */}
                <DssSeparatorPreview 
                  orientation="horizontal"
                  colorKey={selectedSemanticColor}
                  brand={selectedSemanticColor ? null : selectedBrand}
                  dark={isDark}
                />
                
                {/* Content */}
                <p className="text-sm mt-3" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : '#444' }}>
                  Este é um exemplo de conteúdo dentro do DssCard usando componentes DSS reais: DssAvatar, DssBadge, DssSeparator, DssButton e DssIcon.
                </p>
              </CardSection>
              
              {/* CardActions com DssButtons */}
              <CardActions align="right">
                <DssButtonPreview 
                  label="Cancelar"
                  variant="flat"
                  colorKey={selectedSemanticColor}
                  brand={selectedSemanticColor ? null : selectedBrand}
                  size="sm"
                  dark={isDark}
                />
                <DssButtonPreview 
                  label="Confirmar"
                  variant="elevated"
                  colorKey={selectedSemanticColor}
                  brand={selectedSemanticColor ? null : selectedBrand}
                  size="sm"
                  dark={isDark}
                />
              </CardActions>
            </DssCardPreview>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Variant</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v.name)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: selectedVariant === v.name ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                      color: selectedVariant === v.name ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedVariant === v.name ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Semantic Colors */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Cores Semânticas</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSemanticColor(null)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    backgroundColor: !selectedSemanticColor ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                    color: !selectedSemanticColor ? '#ffffff' : 'var(--jtech-text-body)',
                    border: `1px solid ${!selectedSemanticColor ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                  }}
                >
                  Nenhum
                </button>
                {Object.values(semanticColors).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedSemanticColor(c.name);
                      setSelectedBrand(null); // Limpa brand ao selecionar cor semântica
                    }}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedSemanticColor === c.name ? c.bgFallback : 'rgba(255,255,255,0.05)',
                      color: selectedSemanticColor === c.name ? c.textColor : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedSemanticColor === c.name ? c.bgFallback : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <span>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Brand (Veolia)</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    backgroundColor: !selectedBrand && !selectedSemanticColor ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                    color: !selectedBrand && !selectedSemanticColor ? '#ffffff' : 'var(--jtech-text-body)',
                    border: `1px solid ${!selectedBrand && !selectedSemanticColor ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                  }}
                >
                  Nenhum
                </button>
                {Object.values(brandColors).map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedSemanticColor(null); // Limpa semântica ao selecionar brand
                    }}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedBrand === b.name ? b.principal : 'rgba(255,255,255,0.05)',
                      color: selectedBrand === b.name ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedBrand === b.name ? b.principal : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <span>{b.icon}</span>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* States */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Estados & Opções</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'clickable', label: 'Clickable', active: isClickable, toggle: () => setIsClickable(!isClickable) },
                  { key: 'square', label: 'Square', active: isSquare, toggle: () => setIsSquare(!isSquare) },
                  { key: 'dark', label: 'Dark', active: isDark, toggle: () => setIsDark(!isDark) },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={item.toggle}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: item.active ? 'var(--dss-positive)' : 'rgba(255,255,255,0.05)',
                      color: item.active ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${item.active ? 'var(--dss-positive)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    {item.active && "✓ "}{item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="relative">
            <pre 
              className="p-4 overflow-x-auto rounded-lg font-mono text-sm"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)', 
                color: 'var(--jtech-heading-secondary)',
                border: '1px solid var(--jtech-card-border)'
              }}
            >
              <code>{codeExample}</code>
            </pre>
            <button
              className="absolute top-2 right-2 p-2 rounded hover:bg-white/10 transition-colors"
              onClick={copyCode}
              style={{ color: 'var(--jtech-text-muted)' }}
            >
              {copied ? <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Galeria Tabs - Jtech Style */}
      <SectionHeader
        title="Galeria de"
        titleAccent="Variantes"
        badge="4 variantes • 3 brands"
      />

      <Tabs defaultValue="variantes" className="space-y-4">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}
        >
          {["Variantes", "Brands", "Exemplos", "Dark Mode"].map((tab) => (
            <TabsTrigger 
              key={tab.toLowerCase().replace(" ", "-")}
              value={tab.toLowerCase().replace(" ", "-")}
              className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Variantes Tab */}
        <TabsContent value="variantes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variants.map((v) => (
              <Card 
                key={v.name}
                className="transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Badge 
                      className="text-xs"
                      style={{ backgroundColor: 'var(--dss-jtech-accent)', color: 'white' }}
                    >
                      {v.name}
                    </Badge>
                    <span className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{v.desc}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <DssCardPreview variant={v.name} clickable={true}>
                      <CardSection>
                        <h4 className="font-semibold text-sm mb-2">Card {v.label}</h4>
                        <p className="text-xs" style={{ color: '#666' }}>
                          Passe o mouse para ver o efeito de hover.
                        </p>
                      </CardSection>
                    </DssCardPreview>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(brandColors).map((b) => (
              <Card 
                key={b.name}
                className="transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{b.icon}</span>
                    <Badge 
                      className="text-xs"
                      style={{ backgroundColor: b.principal, color: 'white' }}
                    >
                      {b.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <DssCardPreview variant="bordered" brand={b.name} clickable={true}>
                      <CardSection isFirst={true} brand={b.name}>
                        <h4 className="font-semibold text-sm mb-2">Brand {b.label}</h4>
                        <p className="text-xs" style={{ color: '#666' }}>
                          Card com identidade visual {b.label}.
                        </p>
                      </CardSection>
                      <CardActions align="right">
                        <button 
                          className="px-3 py-1.5 text-xs font-medium rounded"
                          style={{ color: b.principal }}
                        >
                          Ver mais
                        </button>
                      </CardActions>
                    </DssCardPreview>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exemplos Tab */}
        <TabsContent value="exemplos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Card */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-2">
                <Badge className="w-fit text-xs" style={{ backgroundColor: '#1f86de', color: 'white' }}>
                  Product Card
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <DssCardPreview variant="elevated" clickable={true}>
                    <div 
                      className="h-32 flex items-center justify-center"
                      style={{ backgroundColor: '#f5f5f5' }}
                    >
                      <Image className="w-12 h-12" style={{ color: '#ccc' }} />
                    </div>
                    <CardSection>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">Produto Premium</h4>
                        <span className="font-bold text-sm" style={{ color: '#1f86de' }}>R$ 299</span>
                      </div>
                      <p className="text-xs mb-3" style={{ color: '#666' }}>
                        Descrição breve do produto.
                      </p>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-3 py-2 text-xs font-medium text-white rounded"
                          style={{ backgroundColor: '#1f86de' }}
                        >
                          Comprar
                        </button>
                        <button 
                          className="p-2 rounded"
                          style={{ backgroundColor: '#f5f5f5' }}
                        >
                          <Heart className="w-4 h-4" style={{ color: '#666' }} />
                        </button>
                      </div>
                    </CardSection>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>

            {/* User Profile Card */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-2">
                <Badge className="w-fit text-xs" style={{ backgroundColor: '#26a69a', color: 'white' }}>
                  Profile Card
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <DssCardPreview variant="bordered">
                    <CardSection horizontal={true}>
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#e5f0ff' }}
                      >
                        <User className="w-8 h-8" style={{ color: '#1f86de' }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">João Silva</h4>
                        <p className="text-xs" style={{ color: '#666' }}>Desenvolvedor Senior</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="text-[10px]" variant="secondary">React</Badge>
                          <Badge className="text-[10px]" variant="secondary">TypeScript</Badge>
                        </div>
                      </div>
                      <button className="p-2 rounded-full" style={{ backgroundColor: '#f5f5f5' }}>
                        <MoreHorizontal className="w-4 h-4" style={{ color: '#666' }} />
                      </button>
                    </CardSection>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-2">
                <Badge className="w-fit text-xs" style={{ backgroundColor: '#18b173', color: 'white' }}>
                  Stats Card
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <DssCardPreview variant="flat" brand="waste">
                    <CardSection isFirst={true} brand="waste">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium" style={{ color: '#666' }}>
                          ECONOMIA MENSAL
                        </span>
                        <Settings className="w-4 h-4" style={{ color: '#666' }} />
                      </div>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#18b173' }}>
                        42.5%
                      </div>
                      <p className="text-xs" style={{ color: '#666' }}>
                        <span style={{ color: '#18b173' }}>↑ 12%</span> vs mês anterior
                      </p>
                    </CardSection>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Dark Mode Tab */}
        <TabsContent value="dark-mode" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light vs Dark comparison */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Badge className="text-xs" variant="outline">Light Mode</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#f5f5f5' }}>
                  <DssCardPreview variant="elevated" clickable={true} dark={false}>
                    <CardSection>
                      <h4 className="font-semibold text-sm mb-2">Card Light</h4>
                      <p className="text-xs" style={{ color: '#666' }}>
                        Visualização no tema claro padrão.
                      </p>
                    </CardSection>
                    <CardActions>
                      <button className="px-3 py-1.5 text-xs font-medium text-white rounded" style={{ backgroundColor: '#1f86de' }}>
                        Ação
                      </button>
                    </CardActions>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Badge className="text-xs" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Dark Mode</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
                  <DssCardPreview variant="elevated" clickable={true} dark={true}>
                    <CardSection>
                      <h4 className="font-semibold text-sm mb-2">Card Dark</h4>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Visualização no tema escuro.
                      </p>
                    </CardSection>
                    <CardActions>
                      <button className="px-3 py-1.5 text-xs font-medium text-white rounded" style={{ backgroundColor: '#1f86de' }}>
                        Ação
                      </button>
                    </CardActions>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Arquitetura 4 Camadas */}
      <SectionHeader
        title="Arquitetura"
        titleAccent="4 Camadas"
        badge="DSS Pattern"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {anatomyLayers.map((layer) => (
              <div 
                key={layer.layer}
                className="p-4 rounded-lg transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderLeft: `4px solid ${layer.color}`
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.layer}
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--jtech-heading-secondary)' }}>
                    {layer.name}
                  </span>
                </div>
                <code className="text-xs block mb-2" style={{ color: layer.color }}>
                  {layer.file}
                </code>
                <p className="text-xs" style={{ color: 'var(--jtech-text-muted)' }}>
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Props Table */}
      <SectionHeader
        title="Public"
        titleAccent="API"
        badge="Props Reference"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg" style={{ color: 'var(--jtech-heading-secondary)' }}>
            <FileText className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
            DssCard Props
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Categoria</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Prop</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Tipo</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Default</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propsData.map((row) => (
                  <TableRow key={row.prop}>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{row.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--dss-jtech-accent)' }}>{row.prop}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.type}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.default}</code>
                    </TableCell>
                    <TableCell style={{ color: 'var(--jtech-text-body)' }}>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Subcomponents Props */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg" style={{ color: 'var(--jtech-heading-secondary)' }}>
              <Layers className="h-5 w-5" style={{ color: '#26a69a' }} />
              DssCardSection Props
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Prop</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Tipo</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionPropsData.map((row) => (
                  <TableRow key={row.prop}>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: '#26a69a' }}>{row.prop}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.type}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.default}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs mt-3" style={{ color: 'var(--jtech-text-muted)' }}>
              {sectionPropsData[0].description}
            </p>
          </CardContent>
        </Card>

        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg" style={{ color: 'var(--jtech-heading-secondary)' }}>
              <Layers className="h-5 w-5" style={{ color: '#ff6607' }} />
              DssCardActions Props
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Prop</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Tipo</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actionsPropsData.map((row) => (
                  <TableRow key={row.prop}>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: '#ff6607' }}>{row.prop}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.type}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.default}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs mt-3" style={{ color: 'var(--jtech-text-muted)' }}>
              {actionsPropsData[0].description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tokens Reference */}
      <SectionHeader
        title="Tokens"
        titleAccent="Utilizados"
        badge={`${tokensUsed.length} tokens`}
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardContent className="p-6">
          <div className="space-y-6">
            {Object.entries(tokensByCategory).map(([category, tokens]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--jtech-heading-tertiary)' }}>
                  {category}
                </h4>
                <div className="grid gap-2">
                  {tokens.map((token) => (
                    <TokenRow key={token.token} {...token} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acessibilidade */}
      <SectionHeader
        title="Acessibilidade"
        titleAccent="WCAG 2.1 AA"
        badge="A11y"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>
                Navegação por Teclado
              </h4>
              <div className="space-y-2">
                {[
                  { key: "Tab", action: "Move focus para o card (se clickable)" },
                  { key: "Enter/Space", action: "Ativa o card clickable" },
                  { key: "Escape", action: "Remove focus do card" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <kbd 
                      className="px-2 py-1 text-xs font-mono rounded"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--jtech-card-border)'
                      }}
                    >
                      {item.key}
                    </kbd>
                    <span className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{item.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>
                Atributos ARIA
              </h4>
              <div className="space-y-2">
                {[
                  { attr: "role='button'", desc: "Aplicado quando clickable" },
                  { attr: "tabindex='0'", desc: "Permite focus em cards clickable" },
                  { attr: "aria-label", desc: "Descrição acessível (quando necessário)" },
                ].map((item) => (
                  <div key={item.attr} className="flex items-start gap-3">
                    <code 
                      className="px-2 py-1 text-xs font-mono rounded flex-shrink-0"
                      style={{ 
                        backgroundColor: 'rgba(31, 134, 222, 0.1)',
                        color: '#1f86de'
                      }}
                    >
                      {item.attr}
                    </code>
                    <span className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
