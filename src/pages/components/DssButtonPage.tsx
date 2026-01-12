import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { 
  Copy, Check, Layers, Code, FileText, Palette, Box,
  Loader2, ChevronRight, Save, Send, Upload, Plus, Trash2, 
  Settings, Menu, ArrowRight, Download, Eye, EyeOff, Heart,
  Zap, AlertTriangle, CheckCircle, XCircle, Info
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ============================================================================
// TOKENS REAIS DO DSS - Extraídos de index.css e globals.scss
// ============================================================================

// Cores Semânticas REAIS do DSS
const semanticColors = {
  primary: { 
    name: "primary", 
    label: "Primary", 
    bg: "#1f86de", 
    hover: "#0f5295", 
    light: "#86c0f3",
    disable: "#b3dcff",
    deep: "#0a3a6a",
    focus: "#006AC5",
    tokens: {
      base: "--dss-primary",
      hover: "--dss-primary-hover",
      light: "--dss-primary-light",
      disable: "--dss-primary-disable",
      deep: "--dss-primary-deep"
    }
  },
  secondary: { 
    name: "secondary", 
    label: "Secondary", 
    bg: "#26a69a", 
    hover: "#1c857e",
    light: "#6ddbcb",
    disable: "#b5ece4",
    deep: "#116761",
    focus: "#009C8D",
    tokens: {
      base: "--dss-secondary",
      hover: "--dss-secondary-hover"
    }
  },
  tertiary: { 
    name: "tertiary", 
    label: "Tertiary", 
    bg: "#ff6607", 
    hover: "#de5500",
    light: "#ff9452",
    disable: "#ffd2b5",
    deep: "#ad4200",
    focus: "#E95900",
    tokens: {
      base: "--dss-tertiary",
      hover: "--dss-tertiary-hover"
    }
  },
  accent: { 
    name: "accent", 
    label: "Accent", 
    bg: "#b454c4", 
    hover: "#883b90",
    light: "#e3bceb",
    disable: "#f0ddf4",
    deep: "#642f6a",
    focus: "#B02EC5",
    tokens: {
      base: "--dss-accent",
      hover: "--dss-accent-hover"
    }
  },
  dark: { 
    name: "dark", 
    label: "Dark", 
    bg: "#454545", 
    hover: "#313131",
    light: "#b0b0b0",
    disable: "#d7d7d7",
    deep: "#1d1d1d",
    focus: "#3E3E3E",
    tokens: {
      base: "--dss-dark",
      hover: "--dss-dark-hover"
    }
  },
};

// Cores de Feedback REAIS do DSS
const feedbackColors = {
  positive: { 
    name: "positive", 
    label: "Positive", 
    icon: CheckCircle,
    bg: "#4dd228", 
    hover: "#27910D",
    light: "#b9f2a4",
    disable: "#dbf8d1",
    deep: "#246714",
    tokens: {
      base: "--dss-positive",
      hover: "--dss-positive-hover"
    }
  },
  negative: { 
    name: "negative", 
    label: "Negative", 
    icon: XCircle,
    bg: "#d8182e", 
    hover: "#a01424",
    light: "#ffa0ab",
    disable: "#ffcfd4",
    deep: "#720e19",
    tokens: {
      base: "--dss-negative",
      hover: "--dss-negative-hover"
    }
  },
  warning: { 
    name: "warning", 
    label: "Warning", 
    icon: AlertTriangle,
    bg: "#fabd14", 
    hover: "#dd8e02",
    light: "#fff488",
    disable: "#fff9c3",
    deep: "#a66d08",
    tokens: {
      base: "--dss-warning",
      hover: "--dss-warning-hover"
    }
  },
  info: { 
    name: "info", 
    label: "Info", 
    icon: Info,
    bg: "#0cc4e9", 
    hover: "#0c8bae",
    light: "#a7effa",
    disable: "#d2f6fc",
    deep: "#0d7491",
    tokens: {
      base: "--dss-info",
      hover: "--dss-info-hover"
    }
  },
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

// Variantes Visuais do DssButton
const variants = [
  { name: "elevated", label: "Elevated", desc: "Botão com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Background transparente, apenas texto", hasElevation: false },
  { name: "outline", label: "Outline", desc: "Background transparente com borda", hasElevation: false },
  { name: "unelevated", label: "Unelevated", desc: "Botão sólido sem shadow", hasElevation: false },
  { name: "push", label: "Push", desc: "Efeito 3D pressionável", hasElevation: true },
  { name: "glossy", label: "Glossy", desc: "Efeito brilhante/glossy", hasElevation: true },
];

// Tamanhos REAIS baseados em Touch Targets DSS (WCAG 2.1 AA)
const sizes = [
  { name: "xs", label: "XS", height: "32px", padding: "4px 8px", fontSize: "12px", minWidth: "48px", token: "--dss-touch-target-xs" },
  { name: "sm", label: "SM", height: "36px", padding: "6px 12px", fontSize: "13px", minWidth: "56px", token: "--dss-touch-target-sm" },
  { name: "md", label: "MD", height: "44px", padding: "8px 16px", fontSize: "14px", minWidth: "64px", token: "--dss-touch-target-md", isDefault: true },
  { name: "lg", label: "LG", height: "52px", padding: "12px 20px", fontSize: "16px", minWidth: "80px", token: "--dss-touch-target-lg" },
  { name: "xl", label: "XL", height: "64px", padding: "16px 24px", fontSize: "18px", minWidth: "96px", token: "--dss-touch-target-xl" },
];

// Props API do DssButton
const propsData = [
  { category: "Conteúdo", prop: "label", type: "String", default: "''", description: "Texto do botão" },
  { category: "Conteúdo", prop: "icon", type: "String", default: "''", description: "Ícone à esquerda (Material Icons)" },
  { category: "Conteúdo", prop: "icon-right", type: "String", default: "''", description: "Ícone à direita (Material Icons)" },
  { category: "Variantes", prop: "variant", type: "'elevated' | 'flat' | 'outline' | 'unelevated' | 'push' | 'glossy'", default: "'elevated'", description: "Estilo visual do botão" },
  { category: "Variantes", prop: "color", type: "'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info'", default: "'primary'", description: "Cor semântica" },
  { category: "Tamanhos", prop: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Tamanho (baseado em touch targets)" },
  { category: "Tamanhos", prop: "round", type: "Boolean", default: "false", description: "Bordas completamente arredondadas" },
  { category: "Tamanhos", prop: "square", type: "Boolean", default: "false", description: "Bordas quadradas (sem border-radius)" },
  { category: "Tamanhos", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta" },
  { category: "Estados", prop: "loading", type: "Boolean", default: "false", description: "Exibe spinner de carregamento" },
  { category: "Estados", prop: "percentage", type: "Number", default: "null", description: "Barra de progresso (0-100)" },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Estado desabilitado" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Veolia" },
];

// Tokens utilizados pelo DssButton
const tokensUsed = [
  { category: "Cores Semânticas", token: "--dss-primary", value: "#1f86de", usage: "Background primary" },
  { category: "Cores Semânticas", token: "--dss-primary-hover", value: "#0f5295", usage: "Hover primary" },
  { category: "Cores Semânticas", token: "--dss-secondary", value: "#26a69a", usage: "Background secondary" },
  { category: "Cores Semânticas", token: "--dss-tertiary", value: "#ff6607", usage: "Background tertiary" },
  { category: "Cores Semânticas", token: "--dss-accent", value: "#b454c4", usage: "Background accent" },
  { category: "Feedback", token: "--dss-positive", value: "#4dd228", usage: "Sucesso" },
  { category: "Feedback", token: "--dss-negative", value: "#d8182e", usage: "Erro/Exclusão" },
  { category: "Feedback", token: "--dss-warning", value: "#fabd14", usage: "Atenção" },
  { category: "Feedback", token: "--dss-info", value: "#0cc4e9", usage: "Informativo" },
  { category: "Brands", token: "--dss-hub-600", value: "#ef7a11", usage: "Brand Hub" },
  { category: "Brands", token: "--dss-water-500", value: "#0e88e4", usage: "Brand Water" },
  { category: "Brands", token: "--dss-waste-500", value: "#18b173", usage: "Brand Waste" },
  { category: "Touch Targets", token: "--dss-touch-target-md", value: "44px", usage: "Altura mínima WCAG" },
  { category: "Border Radius", token: "--dss-radius-sm", value: "4px", usage: "Border-radius padrão" },
  { category: "Border Radius", token: "--dss-radius-full", value: "9999px", usage: "Botão round" },
  { category: "Shadows", token: "--dss-shadow-sm", value: "0 1px 3px rgba(0,0,0,0.25)", usage: "Elevated" },
  { category: "Opacity", token: "--dss-opacity-disabled", value: "0.4", usage: "Estado disabled" },
];

// Anatomia 4 Camadas DSS
const anatomyLayers = [
  { layer: 1, name: "Structure", file: "1-structure/DssButton.vue", desc: "Template Vue + Props + Lógica", color: "#ef7a11" },
  { layer: 2, name: "Composition", file: "2-composition/_base.scss", desc: "Layout, tipografia, reset", color: "#0e88e4" },
  { layer: 3, name: "Variants", file: "3-variants/*.scss", desc: "elevated, flat, outline, push, glossy", color: "#18b173" },
  { layer: 4, name: "Output", file: "4-output/*.scss", desc: "Cores finais, brands, estados", color: "#ff6607" },
];

// ============================================================================
// COMPONENTE BUTTON PREVIEW COM TOKENS REAIS
// ============================================================================

interface DssButtonPreviewProps {
  label?: string;
  variant?: string;
  colorKey?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  brand?: string;
  showToken?: boolean;
}

function DssButtonPreview({
  label = "Button",
  variant = "elevated",
  colorKey = "primary",
  size = "md",
  disabled = false,
  loading = false,
  round = false,
  icon,
  iconRight,
  brand,
  showToken = false,
}: DssButtonPreviewProps) {
  // Obter cores REAIS do DSS
  const getColors = () => {
    if (brand && brandColors[brand as keyof typeof brandColors]) {
      const b = brandColors[brand as keyof typeof brandColors];
      return { bg: b.principal, hover: b.scale[700] || b.scale[600], textColor: "#ffffff" };
    }
    
    if (feedbackColors[colorKey as keyof typeof feedbackColors]) {
      const f = feedbackColors[colorKey as keyof typeof feedbackColors];
      // Warning precisa de texto escuro
      const textColor = colorKey === "warning" ? "#1a1a1a" : "#ffffff";
      return { bg: f.bg, hover: f.hover, textColor };
    }
    
    if (semanticColors[colorKey as keyof typeof semanticColors]) {
      const s = semanticColors[colorKey as keyof typeof semanticColors];
      return { bg: s.bg, hover: s.hover, textColor: "#ffffff" };
    }
    
    return { bg: "#1f86de", hover: "#0f5295", textColor: "#ffffff" };
  };

  const getSizeStyles = () => {
    const sizeData = sizes.find(s => s.name === size) || sizes[2];
    return {
      height: sizeData.height,
      padding: sizeData.padding,
      fontSize: sizeData.fontSize,
    };
  };

  const colors = getColors();
  const sizeStyles = getSizeStyles();

  // Estilos baseados na variante
  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.0892857143em",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      borderRadius: round ? "9999px" : "4px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: sizeStyles.height,
      padding: sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      fontFamily: "system-ui, -apple-system, sans-serif",
    };

    switch (variant) {
      case "flat":
        return {
          ...base,
          backgroundColor: "transparent",
          color: colors.bg,
          border: "none",
          boxShadow: "none",
        };
      case "outline":
        return {
          ...base,
          backgroundColor: "transparent",
          color: colors.bg,
          border: `1px solid ${colors.bg}`,
          boxShadow: "none",
        };
      case "unelevated":
        return {
          ...base,
          backgroundColor: colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "none",
        };
      case "push":
        return {
          ...base,
          backgroundColor: colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: `0 4px 0 ${colors.hover}`,
          transform: "translateY(-2px)",
        };
      case "glossy":
        return {
          ...base,
          backgroundColor: colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.12) 51%, transparent 100%)",
        };
      case "elevated":
      default:
        return {
          ...base,
          backgroundColor: colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        };
    }
  };

  const tokenName = brand 
    ? brandColors[brand as keyof typeof brandColors]?.tokens.principal 
    : semanticColors[colorKey as keyof typeof semanticColors]?.tokens.base || feedbackColors[colorKey as keyof typeof feedbackColors]?.tokens.base;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        style={getVariantStyles()}
        disabled={disabled || loading}
        className="hover:brightness-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" style={{ width: sizeStyles.fontSize, height: sizeStyles.fontSize }} />
        ) : (
          <>
            {icon}
            {label && <span>{label}</span>}
            {iconRight}
          </>
        )}
      </button>
      {showToken && tokenName && (
        <code 
          className="text-[10px] font-mono mt-1"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {tokenName}
        </code>
      )}
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

export default function DssButtonPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRound, setIsRound] = useState(false);
  const [hasIcon, setHasIcon] = useState(false);
  const [hasIconRight, setHasIconRight] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeExample = `<DssButton
  label="Clique aqui"
  variant="${selectedVariant}"
  color="${selectedColor}"
  size="${selectedSize}"${selectedBrand ? `\n  brand="${selectedBrand}"` : ""}${isDisabled ? "\n  disabled" : ""}${isLoading ? "\n  loading" : ""}${isRound ? "\n  round" : ""}${hasIcon ? '\n  icon="save"' : ""}${hasIconRight ? '\n  icon-right="arrow_forward"' : ""}
/>`;

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

  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Header - Jtech Style */}
      <PageHeader
        icon={Box}
        badge="Golden Sample"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssButton"
        subtitle="Botão interativo 100% compatível com a API do Quasar Framework. Implementa tokens DSS, brandability completa, estados avançados e acessibilidade WCAG 2.1 AA."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.1.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* Quick Stats - Jtech Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "6", label: "Variantes", color: semanticColors.primary.bg },
          { value: "8", label: "Cores Semânticas", color: semanticColors.secondary.bg },
          { value: "3", label: "Brands Veolia", color: brandColors.hub.principal },
          { value: "5", label: "Tamanhos", color: brandColors.waste.principal },
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
            Configure o Botão
          </CardTitle>
          <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
            Selecione as props e veja o resultado em tempo real com tokens DSS reais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div 
            className="p-8 rounded-lg flex items-center justify-center min-h-[140px] relative"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.3)',
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          >
            <DssButtonPreview
              label="Clique aqui"
              variant={selectedVariant}
              colorKey={selectedColor}
              size={selectedSize}
              disabled={isDisabled}
              loading={isLoading}
              round={isRound}
              brand={selectedBrand || undefined}
              icon={hasIcon ? <Save className="w-4 h-4" /> : undefined}
              iconRight={hasIconRight ? <ChevronRight className="w-4 h-4" /> : undefined}
              showToken={true}
            />
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

            {/* Color */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Color</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(semanticColors).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setSelectedColor(c.name); setSelectedBrand(null); }}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedColor === c.name && !selectedBrand ? c.bg : 'rgba(255,255,255,0.05)',
                      color: selectedColor === c.name && !selectedBrand ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedColor === c.name && !selectedBrand ? c.bg : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.bg }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Colors */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Feedback</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(feedbackColors).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setSelectedColor(c.name); setSelectedBrand(null); }}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedColor === c.name && !selectedBrand ? c.bg : 'rgba(255,255,255,0.05)',
                      color: selectedColor === c.name && !selectedBrand ? (c.name === 'warning' ? '#1a1a1a' : '#ffffff') : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedColor === c.name && !selectedBrand ? c.bg : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.bg }} />
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
                    backgroundColor: !selectedBrand ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                    color: !selectedBrand ? '#ffffff' : 'var(--jtech-text-body)',
                    border: `1px solid ${!selectedBrand ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                  }}
                >
                  Nenhum
                </button>
                {Object.values(brandColors).map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBrand(b.name)}
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

            {/* Size */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: selectedSize === s.name ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                      color: selectedSize === s.name ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedSize === s.name ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    {s.label}
                    {s.isDefault && <span className="ml-1 opacity-50">•</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* States & Icons */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Estados & Ícones</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'disabled', label: 'Disabled', active: isDisabled, toggle: () => setIsDisabled(!isDisabled) },
                  { key: 'loading', label: 'Loading', active: isLoading, toggle: () => setIsLoading(!isLoading) },
                  { key: 'round', label: 'Round', active: isRound, toggle: () => setIsRound(!isRound) },
                  { key: 'icon', label: 'Icon Left', active: hasIcon, toggle: () => setHasIcon(!hasIcon) },
                  { key: 'iconRight', label: 'Icon Right', active: hasIconRight, toggle: () => setHasIconRight(!hasIconRight) },
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
        badge="6 variantes • 8 cores • 3 brands"
      />

      <Tabs defaultValue="variants" className="space-y-4">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}
        >
          {["Variantes", "Cores", "Brands", "Tamanhos", "Estados", "Ícones"].map((tab) => (
            <TabsTrigger 
              key={tab.toLowerCase()}
              value={tab.toLowerCase()}
              className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Variantes Tab */}
        <TabsContent value="variantes" className="space-y-4">
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
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  {Object.values(semanticColors).map((c) => (
                    <DssButtonPreview key={c.name} label={c.label} variant={v.name} colorKey={c.name} showToken />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Cores Tab */}
        <TabsContent value="cores" className="space-y-6">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>Cores Semânticas</CardTitle>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Cores de ação baseadas nos tokens DSS reais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="flex flex-wrap gap-4 p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                {Object.values(semanticColors).map((c) => (
                  <DssButtonPreview key={c.name} label={c.label} colorKey={c.name} showToken />
                ))}
              </div>
              
              <h4 className="font-medium pt-4" style={{ color: 'var(--jtech-heading-tertiary)' }}>Versão Outline</h4>
              <div 
                className="flex flex-wrap gap-4 p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                {Object.values(semanticColors).map((c) => (
                  <DssButtonPreview key={c.name} label={c.label} colorKey={c.name} variant="outline" showToken />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>Cores de Feedback</CardTitle>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Positive, Negative, Warning, Info - para ações de feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="flex flex-wrap gap-4 p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                {Object.values(feedbackColors).map((c) => (
                  <DssButtonPreview key={c.name} label={c.label} colorKey={c.name} showToken />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-4">
          {Object.values(brandColors).map((b) => (
            <Card 
              key={b.name}
              className="overflow-hidden"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)',
                borderTopWidth: '3px',
                borderTopColor: b.principal
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{b.icon}</span>
                  <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>{b.label}</CardTitle>
                  <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>
                    {b.tokens.principal}
                  </code>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Color Scale Preview */}
                <div className="flex rounded-lg overflow-hidden h-3">
                  {Object.entries(b.scale).map(([level, color]) => (
                    <div 
                      key={level}
                      className="flex-1 transition-all duration-200 hover:flex-[2]"
                      style={{ backgroundColor: color }}
                      title={`${level}: ${color}`}
                    />
                  ))}
                </div>
                
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  {variants.map((v) => (
                    <DssButtonPreview key={v.name} label={v.label} variant={v.name} brand={b.name} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tamanhos Tab */}
        <TabsContent value="tamanhos">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>5 Tamanhos (Touch Targets WCAG)</CardTitle>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Mínimo 44px para MD (WCAG 2.5.5). Tokens: --dss-touch-target-*
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className="flex flex-wrap items-end gap-6 p-6 rounded-lg"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                {sizes.map((s) => (
                  <DssButtonPreview key={s.name} label={s.label} size={s.name} showToken />
                ))}
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: 'var(--jtech-card-border)' }}>
                    <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Size</TableHead>
                    <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Height</TableHead>
                    <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Padding</TableHead>
                    <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Font</TableHead>
                    <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Token</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizes.map((s) => (
                    <TableRow key={s.name} style={{ borderColor: 'var(--jtech-card-border)' }}>
                      <TableCell className="font-medium" style={{ color: 'var(--jtech-heading-secondary)' }}>
                        {s.label}
                        {s.isDefault && <Badge variant="outline" className="ml-2 text-[10px]">default</Badge>}
                      </TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: 'var(--jtech-text-body)' }}>{s.height}</TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: 'var(--jtech-text-body)' }}>{s.padding}</TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: 'var(--jtech-text-body)' }}>{s.fontSize}</TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: 'var(--dss-jtech-accent)' }}>{s.token}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estados Tab */}
        <TabsContent value="estados">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>Estados Interativos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>Normal, Disabled, Loading</h4>
                <div 
                  className="flex flex-wrap gap-6 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <DssButtonPreview label="Normal" />
                  <DssButtonPreview label="Disabled" disabled />
                  <DssButtonPreview label="Loading" loading />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>Formas: Default, Round, FAB</h4>
                <div 
                  className="flex flex-wrap items-center gap-6 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <DssButtonPreview label="Default" />
                  <DssButtonPreview label="Round" round />
                  <DssButtonPreview label="" round icon={<Plus className="w-5 h-5" />} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ícones Tab */}
        <TabsContent value="ícones">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>Botões com Ícones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>Posição do Ícone</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <DssButtonPreview label="Salvar" icon={<Save className="w-4 h-4" />} />
                  <DssButtonPreview label="Enviar" iconRight={<Send className="w-4 h-4" />} />
                  <DssButtonPreview label="Download" icon={<Download className="w-4 h-4" />} iconRight={<ChevronRight className="w-4 h-4" />} />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>Apenas Ícone</h4>
                <div 
                  className="flex flex-wrap items-center gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <DssButtonPreview label="" icon={<Plus className="w-4 h-4" />} size="xs" />
                  <DssButtonPreview label="" icon={<Settings className="w-4 h-4" />} size="sm" />
                  <DssButtonPreview label="" icon={<Menu className="w-5 h-5" />} size="md" />
                  <DssButtonPreview label="" icon={<Heart className="w-5 h-5" />} size="lg" colorKey="negative" />
                  <DssButtonPreview label="" icon={<Trash2 className="w-6 h-6" />} size="xl" variant="outline" colorKey="negative" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>Padrões Comuns</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <DssButtonPreview label="Upload" icon={<Upload className="w-4 h-4" />} colorKey="info" />
                  <DssButtonPreview label="Continuar" iconRight={<ArrowRight className="w-4 h-4" />} />
                  <DssButtonPreview label="Excluir" icon={<Trash2 className="w-4 h-4" />} colorKey="negative" variant="outline" />
                  <DssButtonPreview label="Ver" icon={<Eye className="w-4 h-4" />} variant="flat" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tokens Section */}
      <SectionHeader
        title="Tokens DSS"
        titleAccent="Utilizados"
        badge={`${tokensUsed.length} tokens`}
      />

      <div className="space-y-4">
        {Object.entries(tokensByCategory).map(([category, tokens]) => (
          <Card 
            key={category}
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" style={{ color: 'var(--dss-jtech-accent)' }} />
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>{category}</CardTitle>
                <Badge variant="outline" className="text-xs">{tokens.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {tokens.map((t) => (
                <TokenRow key={t.token} token={t.token} value={t.value} usage={t.usage} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Anatomia */}
      <SectionHeader
        title="Anatomia"
        titleAccent="4 Camadas"
        badge="Arquitetura DSS"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
            <Layers className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
            Arquitetura Modular DSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {anatomyLayers.map((layer) => (
            <div 
              key={layer.layer}
              className="p-4 rounded-lg border-l-4 transition-all hover:translate-x-1"
              style={{ 
                backgroundColor: `${layer.color}15`,
                borderLeftColor: layer.color
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Badge style={{ backgroundColor: layer.color, color: '#ffffff' }}>
                  Layer {layer.layer}
                </Badge>
                <span className="font-semibold" style={{ color: 'var(--jtech-heading-secondary)' }}>{layer.name}</span>
              </div>
              <code className="text-sm block mb-1" style={{ color: layer.color }}>{layer.file}</code>
              <p className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{layer.desc}</p>
            </div>
          ))}

          {/* File structure */}
          <div className="mt-6">
            <h4 className="font-medium mb-3" style={{ color: 'var(--jtech-heading-tertiary)' }}>Estrutura de Arquivos</h4>
            <pre 
              className="p-4 rounded-lg text-sm font-mono overflow-x-auto"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)', 
                color: 'var(--jtech-text-body)',
                border: '1px solid var(--jtech-card-border)'
              }}
            >
{`components/base/DssButton/
├── 1-structure/
│   └── DssButton.vue          # Template + Props + Logic
├── 2-composition/
│   └── _base.scss             # Layout, typography, states
├── 3-variants/
│   ├── _elevated.scss         # box-shadow
│   ├── _flat.scss             # transparent bg
│   ├── _outline.scss          # border
│   ├── _unelevated.scss       # no shadow
│   ├── _push.scss             # 3D effect
│   └── _glossy.scss           # gradient shine
├── 4-output/
│   ├── _colors.scss           # Semantic colors
│   ├── _brands.scss           # Hub, Water, Waste
│   └── _states.scss           # Hover, active, focus
├── DssButton.module.scss      # Entry point (@use layers)
└── index.js                   # Export`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)',
          borderTopWidth: '3px',
          borderTopColor: 'var(--dss-positive)'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
            <FileText className="h-5 w-5" style={{ color: 'var(--dss-positive)' }} />
            Acessibilidade WCAG 2.1 AA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>✅ Implementado</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                {[
                  "Touch target mínimo 44x44px (WCAG 2.5.5)",
                  "Focus ring visível com :focus-visible",
                  "Contraste mínimo 4.5:1 em todas as cores",
                  "Respeita prefers-reduced-motion",
                  "Suporte a prefers-contrast: high"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--dss-positive)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium" style={{ color: 'var(--jtech-heading-tertiary)' }}>📋 Media Queries</h4>
              <pre 
                className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.4)', 
                  color: 'var(--jtech-text-body)',
                  border: '1px solid var(--jtech-card-border)'
                }}
              >
{`/* High contrast mode */
@media (prefers-contrast: high) {
  .dss-button {
    border-width: 2px !important;
    font-weight: 600;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dss-button {
    transition: none !important;
  }
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
