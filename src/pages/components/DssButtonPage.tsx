import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Copy, Check, Star, Layers, Palette, Code, FileText, 
  Loader2, ChevronRight, Save, Send, Upload, Plus, Trash2, 
  Settings, Menu, ArrowRight, Download, Eye, EyeOff, Heart
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ============================================================================
// DADOS REAIS DO DSS - BASEADOS NA DOCUMENTAÇÃO
// ============================================================================

// Cores Semânticas do DSS
const semanticColors = [
  { name: "primary", label: "Primary", cssVar: "--dss-primary", hoverVar: "--dss-primary-hover", description: "Ação principal" },
  { name: "secondary", label: "Secondary", cssVar: "--dss-secondary", hoverVar: "--dss-secondary-hover", description: "Ação secundária" },
  { name: "tertiary", label: "Tertiary", cssVar: "--dss-tertiary", hoverVar: "--dss-tertiary-hover", description: "Ação terciária" },
  { name: "accent", label: "Accent", cssVar: "--dss-accent", hoverVar: "--dss-accent-hover", description: "Destaque" },
];

const feedbackColors = [
  { name: "positive", label: "Positive", cssVar: "--dss-waste-600", hoverVar: "--dss-waste-700", description: "Sucesso/Confirmação" },
  { name: "negative", label: "Negative", cssVar: "--dss-negative", hoverVar: "--dss-negative-hover", description: "Erro/Exclusão" },
  { name: "warning", label: "Warning", cssVar: "--dss-tertiary", hoverVar: "--dss-tertiary-hover", description: "Atenção/Cuidado" },
  { name: "info", label: "Info", cssVar: "--dss-water-500", hoverVar: "--dss-water-600", description: "Informativo" },
];

// Brands Veolia
const brandColors = [
  { name: "hub", label: "Hub", cssVar: "--dss-hub-600", hoverVar: "--dss-hub-700", icon: "🟠", description: "Brand Hub (Laranja)" },
  { name: "water", label: "Water", cssVar: "--dss-water-500", hoverVar: "--dss-water-600", icon: "🔵", description: "Brand Water (Azul)" },
  { name: "waste", label: "Waste", cssVar: "--dss-waste-600", hoverVar: "--dss-waste-800", icon: "🟢", description: "Brand Waste (Verde)" },
];

// Variantes Visuais
const variants = [
  { name: "elevated", label: "Elevated", description: "Botão com elevação/shadow (padrão)", shadow: true },
  { name: "flat", label: "Flat", description: "Background transparente, sem elevação", shadow: false },
  { name: "outline", label: "Outline", description: "Background transparente com borda", shadow: false },
  { name: "unelevated", label: "Unelevated", description: "Botão sólido sem shadow", shadow: false },
  { name: "push", label: "Push", description: "Efeito 3D pressionável", shadow: true },
  { name: "glossy", label: "Glossy", description: "Efeito brilhante/glossy", shadow: true },
];

// Tamanhos
const sizes = [
  { name: "xs", label: "XS", height: "32px", padding: "4px 8px", fontSize: "12px", minWidth: "48px" },
  { name: "sm", label: "SM", height: "36px", padding: "6px 12px", fontSize: "13px", minWidth: "56px" },
  { name: "md", label: "MD", height: "44px", padding: "8px 16px", fontSize: "14px", minWidth: "64px" },
  { name: "lg", label: "LG", height: "52px", padding: "12px 20px", fontSize: "16px", minWidth: "80px" },
  { name: "xl", label: "XL", height: "64px", padding: "16px 24px", fontSize: "18px", minWidth: "96px" },
];

// Props Completas do DssButton
const propsData = [
  // Conteúdo
  { category: "Conteúdo", prop: "label", type: "String", default: "''", description: "Texto do botão" },
  { category: "Conteúdo", prop: "icon", type: "String", default: "''", description: "Ícone à esquerda (Material Icons)" },
  { category: "Conteúdo", prop: "icon-right", type: "String", default: "''", description: "Ícone à direita (Material Icons)" },
  // Variantes
  { category: "Variantes", prop: "variant", type: "'elevated' | 'flat' | 'outline' | 'unelevated' | 'push' | 'glossy'", default: "'elevated'", description: "Estilo visual do botão" },
  { category: "Variantes", prop: "color", type: "'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info'", default: "'primary'", description: "Cor semântica do botão" },
  // Tamanhos
  { category: "Tamanhos", prop: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Tamanho do botão" },
  { category: "Tamanhos", prop: "round", type: "Boolean", default: "false", description: "Bordas completamente arredondadas" },
  { category: "Tamanhos", prop: "square", type: "Boolean", default: "false", description: "Bordas quadradas (sem border-radius)" },
  { category: "Tamanhos", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta do botão" },
  // Estados
  { category: "Estados", prop: "loading", type: "Boolean", default: "false", description: "Exibe spinner de carregamento" },
  { category: "Estados", prop: "percentage", type: "Number", default: "null", description: "Barra de progresso (0-100)" },
  { category: "Estados", prop: "dark-percentage", type: "Boolean", default: "false", description: "Estilo escuro da barra de progresso" },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Estado desabilitado" },
  // Interação
  { category: "Interação", prop: "ripple", type: "Boolean | Object", default: "true", description: "Efeito ripple Material Design" },
  { category: "Interação", prop: "tabindex", type: "Number | String", default: "null", description: "Ordem de navegação por teclado" },
  // Layout
  { category: "Layout", prop: "align", type: "'left' | 'center' | 'right' | 'between' | 'around' | 'evenly'", default: "'center'", description: "Alinhamento horizontal do conteúdo" },
  { category: "Layout", prop: "stack", type: "Boolean", default: "false", description: "Layout vertical (ícone acima do label)" },
  { category: "Layout", prop: "stretch", type: "Boolean", default: "false", description: "Expande para largura total" },
  { category: "Layout", prop: "no-wrap", type: "Boolean", default: "false", description: "Previne quebra de texto" },
  { category: "Layout", prop: "padding", type: "String", default: "null", description: "Padding customizado (CSS)" },
  // Comportamento
  { category: "Comportamento", prop: "type", type: "'button' | 'submit' | 'reset'", default: "'button'", description: "Tipo nativo do button HTML" },
  { category: "Comportamento", prop: "no-caps", type: "Boolean", default: "false", description: "Desabilita uppercase" },
  // Router
  { category: "Router", prop: "to", type: "String | Object", default: "null", description: "Rota de navegação (Vue Router)" },
  { category: "Router", prop: "replace", type: "Boolean", default: "false", description: "Usa router.replace" },
  // Brandabilidade
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Veolia" },
];

// Eventos
const eventsData = [
  { event: "@click", payload: "MouseEvent", description: "Emitido ao clicar (se não disabled/loading)" },
  { event: "@focus", payload: "FocusEvent", description: "Emitido ao focar no botão" },
  { event: "@blur", payload: "FocusEvent", description: "Emitido ao perder foco" },
];

// Tokens Utilizados
const tokensUsed = [
  // Cores
  { category: "Cores", token: "--dss-primary", value: "#1f86de", usage: "Background primary" },
  { category: "Cores", token: "--dss-primary-hover", value: "#0f5295", usage: "Hover do primary" },
  { category: "Cores", token: "--dss-secondary", value: "#26a69a", usage: "Background secondary" },
  { category: "Cores", token: "--dss-tertiary", value: "#ff6f00", usage: "Warning e tertiary" },
  { category: "Cores", token: "--dss-accent", value: "#9c27b0", usage: "Destaque" },
  // Feedback
  { category: "Feedback", token: "--dss-positive", value: "#4caf50", usage: "Sucesso" },
  { category: "Feedback", token: "--dss-negative", value: "#dc2626", usage: "Erro/Exclusão" },
  { category: "Feedback", token: "--dss-warning", value: "#ff9800", usage: "Atenção" },
  { category: "Feedback", token: "--dss-info", value: "#2196f3", usage: "Informativo" },
  // Brands
  { category: "Brands", token: "--dss-hub-600", value: "#f97316", usage: "Brand Hub" },
  { category: "Brands", token: "--dss-water-500", value: "#0099ff", usage: "Brand Water" },
  { category: "Brands", token: "--dss-waste-600", value: "#00b27a", usage: "Brand Waste" },
  // Spacing
  { category: "Spacing", token: "--dss-spacing-1", value: "0.25rem (4px)", usage: "Padding XS, gaps" },
  { category: "Spacing", token: "--dss-spacing-2", value: "0.5rem (8px)", usage: "Padding vertical default" },
  { category: "Spacing", token: "--dss-spacing-3", value: "0.75rem (12px)", usage: "Padding SM" },
  { category: "Spacing", token: "--dss-spacing-4", value: "1rem (16px)", usage: "Padding horizontal default" },
  { category: "Spacing", token: "--dss-spacing-5", value: "1.25rem (20px)", usage: "Padding LG" },
  { category: "Spacing", token: "--dss-spacing-6", value: "1.5rem (24px)", usage: "Padding XL" },
  // Touch Targets (Acessibilidade)
  { category: "Touch Targets", token: "--dss-touch-target-xs", value: "32px", usage: "Min-height XS" },
  { category: "Touch Targets", token: "--dss-touch-target-sm", value: "36px", usage: "Min-height SM" },
  { category: "Touch Targets", token: "--dss-touch-target-md", value: "44px", usage: "Min-height MD (WCAG AA)" },
  { category: "Touch Targets", token: "--dss-touch-target-lg", value: "52px", usage: "Min-height LG" },
  { category: "Touch Targets", token: "--dss-touch-target-xl", value: "64px", usage: "Min-height XL" },
  // Radius
  { category: "Border Radius", token: "--dss-radius-sm", value: "4px", usage: "Border-radius padrão" },
  { category: "Border Radius", token: "--dss-radius-full", value: "9999px", usage: "Botão round" },
  // Typography
  { category: "Typography", token: "--dss-font-size-xs", value: "0.75rem", usage: "Fonte XS" },
  { category: "Typography", token: "--dss-font-size-sm", value: "0.8125rem", usage: "Fonte SM" },
  { category: "Typography", token: "--dss-font-size-md", value: "0.875rem", usage: "Fonte MD (default)" },
  { category: "Typography", token: "--dss-font-size-lg", value: "1rem", usage: "Fonte LG" },
  { category: "Typography", token: "--dss-font-size-xl", value: "1.125rem", usage: "Fonte XL" },
  // Outros
  { category: "Outros", token: "--dss-border-width-thin", value: "1px", usage: "Borda outline" },
  { category: "Outros", token: "--dss-border-width-md", value: "2px", usage: "Focus ring" },
  { category: "Outros", token: "--dss-focus-ring", value: "currentColor", usage: "Cor do focus ring" },
  { category: "Outros", token: "--dss-opacity-disabled", value: "0.5", usage: "Opacidade disabled" },
  { category: "Outros", token: "--dss-gradient-glossy", value: "linear-gradient(...)", usage: "Efeito glossy" },
];

// Anatomia das 4 Camadas
const anatomyLayers = [
  {
    layer: 1,
    name: "Structure",
    file: "1-structure/DssButton.vue",
    description: "Template Vue com props, slots e lógica de eventos",
    tokens: ["Props: label, icon, variant, color, size, loading, disabled..."],
    color: "var(--dss-hub-100)"
  },
  {
    layer: 2,
    name: "Composition",
    file: "2-composition/_base.scss",
    description: "Estilos base usando APENAS tokens genéricos. Reset, layout, tipografia.",
    tokens: ["--dss-spacing-*", "--dss-radius-*", "--dss-font-*", "--dss-touch-target-*"],
    color: "var(--dss-water-100)"
  },
  {
    layer: 3,
    name: "Variants",
    file: "3-variants/",
    description: "Variantes visuais: elevated, flat, outline, unelevated, push, glossy",
    tokens: ["box-shadow", "filter: brightness()", "--dss-gradient-glossy"],
    color: "var(--dss-waste-100)"
  },
  {
    layer: 4,
    name: "Output",
    file: "4-output/",
    description: "Cores semânticas, feedback, brands. Classes finais para consumo.",
    tokens: ["--dss-primary", "--dss-hub-*", "--dss-water-*", "--dss-waste-*"],
    color: "var(--dss-tertiary-light)"
  },
];

// ============================================================================
// COMPONENTE TOKEN ROW COM COPY
// ============================================================================

function TokenRow({ token, value, usage, category }: { token: string; value: string; usage: string; category?: string }) {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl");

  return (
    <TableRow className="group hover:bg-[var(--dss-surface-subtle)] transition-colors">
      <TableCell className="font-mono text-sm">
        <button
          onClick={copyToken}
          className="flex items-center gap-2 hover:text-[var(--dss-primary)] transition-colors"
        >
          <code style={{ color: 'var(--dss-primary)' }}>{token}</code>
          {copied ? (
            <Check className="h-3 w-3 text-[var(--dss-positive)]" />
          ) : (
            <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </TableCell>
      <TableCell className="font-mono text-sm">
        <div className="flex items-center gap-2">
          {isColor && (
            <span
              className="w-4 h-4 rounded border border-[var(--dss-gray-300)] flex-shrink-0"
              style={{ backgroundColor: value }}
            />
          )}
          <span style={{ color: 'var(--dss-text-subtle)' }}>{value}</span>
        </div>
      </TableCell>
      <TableCell style={{ color: 'var(--dss-text-body)' }}>{usage}</TableCell>
    </TableRow>
  );
}

// ============================================================================
// COMPONENTE BUTTON PREVIEW (simula DssButton)
// ============================================================================

interface DssButtonPreviewProps {
  label?: string;
  variant?: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  brand?: string;
  onClick?: () => void;
  className?: string;
}

function DssButtonPreview({
  label = "Button",
  variant = "elevated",
  color = "primary",
  size = "md",
  disabled = false,
  loading = false,
  round = false,
  icon,
  iconRight,
  brand,
  onClick,
  className = ""
}: DssButtonPreviewProps) {
  // Mapear cores para CSS vars
  const getColorStyles = () => {
    if (brand) {
      const brandMap: Record<string, { bg: string; hover: string }> = {
        hub: { bg: "var(--dss-hub-600)", hover: "var(--dss-hub-700)" },
        water: { bg: "var(--dss-water-500)", hover: "var(--dss-water-600)" },
        waste: { bg: "var(--dss-waste-600)", hover: "var(--dss-waste-700)" },
      };
      return brandMap[brand] || brandMap.hub;
    }

    const colorMap: Record<string, { bg: string; hover: string }> = {
      primary: { bg: "var(--dss-primary)", hover: "var(--dss-primary-hover)" },
      secondary: { bg: "var(--dss-secondary)", hover: "var(--dss-secondary-hover)" },
      tertiary: { bg: "var(--dss-tertiary)", hover: "var(--dss-tertiary-hover)" },
      accent: { bg: "var(--dss-accent)", hover: "var(--dss-accent-hover)" },
      positive: { bg: "var(--dss-waste-600)", hover: "var(--dss-waste-700)" },
      negative: { bg: "#dc2626", hover: "#b91c1c" },
      warning: { bg: "var(--dss-tertiary)", hover: "var(--dss-tertiary-hover)" },
      info: { bg: "var(--dss-water-500)", hover: "var(--dss-water-600)" },
    };
    return colorMap[color] || colorMap.primary;
  };

  const getSizeStyles = () => {
    const sizeMap: Record<string, { height: string; padding: string; fontSize: string }> = {
      xs: { height: "32px", padding: "4px 8px", fontSize: "12px" },
      sm: { height: "36px", padding: "6px 12px", fontSize: "13px" },
      md: { height: "44px", padding: "8px 16px", fontSize: "14px" },
      lg: { height: "52px", padding: "12px 20px", fontSize: "16px" },
      xl: { height: "64px", padding: "16px 24px", fontSize: "18px" },
    };
    return sizeMap[size] || sizeMap.md;
  };

  const getVariantStyles = () => {
    const colors = getColorStyles();
    const isFlat = variant === "flat";
    const isOutline = variant === "outline";

    if (isFlat) {
      return {
        backgroundColor: "transparent",
        color: colors.bg,
        border: "none",
        boxShadow: "none",
      };
    }

    if (isOutline) {
      return {
        backgroundColor: "transparent",
        color: colors.bg,
        border: `1px solid ${colors.bg}`,
        boxShadow: "none",
      };
    }

    let boxShadow = "none";
    if (variant === "elevated") {
      boxShadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)";
    } else if (variant === "push") {
      boxShadow = "0 3px 0 rgba(0,0,0,0.15)";
    } else if (variant === "glossy") {
      boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
    }

    return {
      backgroundColor: colors.bg,
      color: "white",
      border: "none",
      boxShadow,
    };
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.0892857143em",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    borderRadius: round ? "9999px" : "4px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: sizeStyles.height,
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    ...variantStyles,
  };

  if (variant === "glossy") {
    baseStyles.backgroundImage = "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.12) 51%, transparent 100%)";
  }

  return (
    <button
      style={baseStyles}
      disabled={disabled || loading}
      onClick={onClick}
      className={`hover:brightness-95 active:brightness-90 ${className}`}
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

  // Agrupar props por categoria
  const propsByCategory = propsData.reduce((acc, prop) => {
    if (!acc[prop.category]) acc[prop.category] = [];
    acc[prop.category].push(prop);
    return acc;
  }, {} as Record<string, typeof propsData>);

  // Agrupar tokens por categoria
  const tokensByCategory = tokensUsed.reduce((acc, token) => {
    if (!acc[token.category]) acc[token.category] = [];
    acc[token.category].push(token);
    return acc;
  }, {} as Record<string, typeof tokensUsed>);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8" style={{ backgroundColor: 'var(--dss-surface-default)' }}>
      {/* Header */}
      <PageHeader
        title="DssButton"
        description="Botão interativo 100% compatível com a API do Quasar Framework. Implementa tokens DSS, brandability, estados avançados e acessibilidade WCAG 2.1 AA."
        badgeText="Golden Sample"
        badgeVariant="warning"
        extraBadges={[
          { label: "v2.1.0", variant: "outline" },
          { label: "Quasar Compatible", variant: "info" },
        ]}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--dss-primary)' }}>6</div>
            <div className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>Variantes</div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--dss-secondary)' }}>8</div>
            <div className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>Cores</div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--dss-hub-600)' }}>3</div>
            <div className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>Brands</div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--dss-waste-600)' }}>5</div>
            <div className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>Tamanhos</div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Playground */}
      <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-primary)', borderWidth: '2px' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" style={{ color: 'var(--dss-primary)' }} />
            Playground Interativo
          </CardTitle>
          <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
            Configure todas as props e veja o resultado em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div 
            className="p-8 rounded-lg flex items-center justify-center min-h-[140px] relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--dss-surface-subtle)',
              backgroundImage: 'radial-gradient(circle at 1px 1px, var(--dss-gray-300) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          >
            <DssButtonPreview
              label="Clique aqui"
              variant={selectedVariant}
              color={selectedColor}
              size={selectedSize}
              disabled={isDisabled}
              loading={isLoading}
              round={isRound}
              brand={selectedBrand || undefined}
              icon={hasIcon ? <Save className="w-4 h-4" /> : undefined}
              iconRight={hasIconRight ? <ChevronRight className="w-4 h-4" /> : undefined}
            />
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--dss-text-body)' }}>Variant</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <Button
                    key={v.name}
                    variant={selectedVariant === v.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVariant(v.name)}
                    className="text-xs"
                  >
                    {v.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--dss-text-body)' }}>Color</label>
              <div className="flex flex-wrap gap-2">
                {[...semanticColors, ...feedbackColors].map((c) => (
                  <Button
                    key={c.name}
                    variant={selectedColor === c.name && !selectedBrand ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setSelectedColor(c.name); setSelectedBrand(null); }}
                    className="text-xs"
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--dss-text-body)' }}>Brand (Veolia)</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedBrand ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBrand(null)}
                  className="text-xs"
                >
                  Nenhum
                </Button>
                {brandColors.map((b) => (
                  <Button
                    key={b.name}
                    variant={selectedBrand === b.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedBrand(b.name)}
                    className="text-xs"
                  >
                    {b.icon} {b.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--dss-text-body)' }}>Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <Button
                    key={s.name}
                    variant={selectedSize === s.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(s.name)}
                    className="text-xs"
                  >
                    {s.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* States */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--dss-text-body)' }}>Estados</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={isDisabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsDisabled(!isDisabled)}
                  className="text-xs"
                >
                  {isDisabled ? "✓ " : ""}Disabled
                </Button>
                <Button
                  variant={isLoading ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsLoading(!isLoading)}
                  className="text-xs"
                >
                  {isLoading ? "✓ " : ""}Loading
                </Button>
                <Button
                  variant={isRound ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsRound(!isRound)}
                  className="text-xs"
                >
                  {isRound ? "✓ " : ""}Round
                </Button>
              </div>
            </div>

            {/* Icons */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--dss-text-body)' }}>Ícones</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={hasIcon ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHasIcon(!hasIcon)}
                  className="text-xs"
                >
                  {hasIcon ? "✓ " : ""}Icon Left
                </Button>
                <Button
                  variant={hasIconRight ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHasIconRight(!hasIconRight)}
                  className="text-xs"
                >
                  {hasIconRight ? "✓ " : ""}Icon Right
                </Button>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="relative">
            <pre 
              className="p-4 overflow-x-auto rounded-lg font-mono text-sm"
              style={{ 
                backgroundColor: 'var(--dss-gray-900)', 
                color: 'var(--dss-gray-100)',
                border: '1px solid var(--dss-gray-700)'
              }}
            >
              <code>{codeExample}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={copyCode}
              style={{ color: 'var(--dss-gray-400)' }}
            >
              {copied ? <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} /> : <Copy className="h-4 w-4" />}
              <span className="ml-1 text-xs">{copied ? "Copiado!" : "Copiar"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Variants Showcase */}
      <SectionHeader
        title="Galeria de Variantes"
        description="Todas as combinações possíveis de variantes, cores e brands"
      />

      <Tabs defaultValue="variants" className="space-y-4">
        <TabsList style={{ backgroundColor: 'var(--dss-surface-subtle)' }} className="flex-wrap h-auto p-1">
          <TabsTrigger value="variants">Variantes</TabsTrigger>
          <TabsTrigger value="colors">Cores</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="sizes">Tamanhos</TabsTrigger>
          <TabsTrigger value="states">Estados</TabsTrigger>
          <TabsTrigger value="icons">Ícones</TabsTrigger>
        </TabsList>

        {/* Variantes */}
        <TabsContent value="variants">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>6 Variantes Visuais</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Cada variante define o estilo visual do botão: elevação, bordas, transparência.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {variants.map((v) => (
                <div key={v.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{v.name}</Badge>
                    <span className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{v.description}</span>
                  </div>
                  <div 
                    className="flex flex-wrap gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                  >
                    <DssButtonPreview label="Primary" variant={v.name} color="primary" />
                    <DssButtonPreview label="Secondary" variant={v.name} color="secondary" />
                    <DssButtonPreview label="Tertiary" variant={v.name} color="tertiary" />
                    <DssButtonPreview label="Accent" variant={v.name} color="accent" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cores */}
        <TabsContent value="colors">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>8 Cores Semânticas + Feedback</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Cores semânticas para ações e feedback visual.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Semânticas */}
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Cores de Ação</h4>
                <div 
                  className="flex flex-wrap gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  {semanticColors.map((c) => (
                    <div key={c.name} className="text-center">
                      <DssButtonPreview label={c.label} color={c.name} />
                      <code className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>{c.cssVar}</code>
                    </div>
                  ))}
                </div>
              </div>
              {/* Feedback */}
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Cores de Feedback</h4>
                <div 
                  className="flex flex-wrap gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  {feedbackColors.map((c) => (
                    <div key={c.name} className="text-center">
                      <DssButtonPreview label={c.label} color={c.name} />
                      <code className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>{c.cssVar}</code>
                    </div>
                  ))}
                </div>
              </div>
              {/* Outline versions */}
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Versão Outline</h4>
                <div 
                  className="flex flex-wrap gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  {[...semanticColors, ...feedbackColors].map((c) => (
                    <DssButtonPreview key={c.name} label={c.label} color={c.name} variant="outline" />
                  ))}
                </div>
              </div>
              {/* Flat versions */}
              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Versão Flat</h4>
                <div 
                  className="flex flex-wrap gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  {[...semanticColors, ...feedbackColors].map((c) => (
                    <DssButtonPreview key={c.name} label={c.label} color={c.name} variant="flat" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brands */}
        <TabsContent value="brands">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Brandability Veolia</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Temas de marca exclusivos: Hub (🟠), Water (🔵), Waste (🟢)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {brandColors.map((brand) => (
                <div key={brand.name} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{brand.icon}</span>
                    <h4 className="font-semibold" style={{ color: 'var(--dss-text-body)' }}>{brand.label}</h4>
                    <Badge variant="outline">{brand.cssVar}</Badge>
                  </div>
                  <div 
                    className="p-4 rounded-lg space-y-3"
                    style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                  >
                    <div className="flex flex-wrap gap-3">
                      <DssButtonPreview label="Elevated" brand={brand.name} variant="elevated" />
                      <DssButtonPreview label="Unelevated" brand={brand.name} variant="unelevated" />
                      <DssButtonPreview label="Outline" brand={brand.name} variant="outline" />
                      <DssButtonPreview label="Flat" brand={brand.name} variant="flat" />
                      <DssButtonPreview label="Push" brand={brand.name} variant="push" />
                      <DssButtonPreview label="Glossy" brand={brand.name} variant="glossy" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tamanhos */}
        <TabsContent value="sizes">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>5 Tamanhos</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Tamanhos baseados em touch targets WCAG 2.1 AA (mínimo 44px para MD)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comparison */}
              <div 
                className="flex flex-wrap items-end gap-4 p-6 rounded-lg"
                style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
              >
                {sizes.map((s) => (
                  <div key={s.name} className="text-center">
                    <DssButtonPreview label={s.label} size={s.name} />
                    <div className="mt-2 text-xs" style={{ color: 'var(--dss-text-subtle)' }}>
                      <div>{s.height}</div>
                      <div className="font-mono">{s.fontSize}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Specs Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Height</TableHead>
                    <TableHead>Padding</TableHead>
                    <TableHead>Font Size</TableHead>
                    <TableHead>Min Width</TableHead>
                    <TableHead>Token</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizes.map((s) => (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.label}</TableCell>
                      <TableCell className="font-mono text-sm">{s.height}</TableCell>
                      <TableCell className="font-mono text-sm">{s.padding}</TableCell>
                      <TableCell className="font-mono text-sm">{s.fontSize}</TableCell>
                      <TableCell className="font-mono text-sm">{s.minWidth}</TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: 'var(--dss-primary)' }}>
                        --dss-touch-target-{s.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estados */}
        <TabsContent value="states">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Estados Interativos</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Estados visuais para feedback de interação do usuário.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Normal, Hover, Active, Focus */}
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Estados Base</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  <div className="text-center">
                    <DssButtonPreview label="Normal" />
                    <span className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>default</span>
                  </div>
                  <div className="text-center">
                    <DssButtonPreview label="Disabled" disabled />
                    <span className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>disabled</span>
                  </div>
                  <div className="text-center">
                    <DssButtonPreview label="Loading" loading />
                    <span className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>loading</span>
                  </div>
                </div>
              </div>
              {/* Loading with progress simulation */}
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Loading com Progresso</h4>
                <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>
                  Use a prop <code className="px-1 py-0.5 rounded" style={{ backgroundColor: 'var(--dss-surface-subtle)' }}>percentage</code> para mostrar progresso determinístico.
                </p>
                <pre className="p-3 rounded-lg text-sm font-mono" style={{ backgroundColor: 'var(--dss-gray-900)', color: 'var(--dss-gray-100)' }}>
{`<DssButton :loading="true" :percentage="45">
  45% Completo
</DssButton>`}
                </pre>
              </div>
              {/* Shapes */}
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Formas</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg items-center"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  <div className="text-center">
                    <DssButtonPreview label="Default" />
                    <span className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>border-radius: 4px</span>
                  </div>
                  <div className="text-center">
                    <DssButtonPreview label="Round" round />
                    <span className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>round</span>
                  </div>
                  <div className="text-center">
                    <DssButtonPreview 
                      label="" 
                      round 
                      icon={<Plus className="w-5 h-5" />} 
                    />
                    <span className="text-xs block mt-1" style={{ color: 'var(--dss-text-subtle)' }}>FAB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ícones */}
        <TabsContent value="icons">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Botões com Ícones</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Use ícones Material Icons com as props <code>icon</code> e <code>icon-right</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Icon positions */}
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Posição do Ícone</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  <DssButtonPreview label="Salvar" icon={<Save className="w-4 h-4" />} />
                  <DssButtonPreview label="Enviar" iconRight={<Send className="w-4 h-4" />} />
                  <DssButtonPreview label="Download" icon={<Download className="w-4 h-4" />} iconRight={<ChevronRight className="w-4 h-4" />} />
                </div>
              </div>
              {/* Icon only */}
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Apenas Ícone</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg items-center"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  <DssButtonPreview label="" icon={<Plus className="w-4 h-4" />} size="xs" />
                  <DssButtonPreview label="" icon={<Settings className="w-4 h-4" />} size="sm" />
                  <DssButtonPreview label="" icon={<Menu className="w-5 h-5" />} size="md" />
                  <DssButtonPreview label="" icon={<Heart className="w-5 h-5" />} size="lg" color="negative" />
                  <DssButtonPreview label="" icon={<Trash2 className="w-6 h-6" />} size="xl" variant="outline" color="negative" />
                </div>
              </div>
              {/* Common patterns */}
              <div className="space-y-3">
                <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>Padrões Comuns</h4>
                <div 
                  className="flex flex-wrap gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                >
                  <DssButtonPreview label="Upload" icon={<Upload className="w-4 h-4" />} color="info" />
                  <DssButtonPreview label="Continuar" iconRight={<ArrowRight className="w-4 h-4" />} />
                  <DssButtonPreview label="Excluir" icon={<Trash2 className="w-4 h-4" />} color="negative" variant="outline" />
                  <DssButtonPreview label="Ver" icon={<Eye className="w-4 h-4" />} variant="flat" />
                  <DssButtonPreview label="Ocultar" icon={<EyeOff className="w-4 h-4" />} variant="flat" color="secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Documentation Tabs */}
      <SectionHeader
        title="Documentação Técnica"
        description="Props, eventos, tokens e anatomia do componente"
      />

      <Tabs defaultValue="props" className="space-y-4">
        <TabsList style={{ backgroundColor: 'var(--dss-surface-subtle)' }}>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="anatomy">Anatomia</TabsTrigger>
        </TabsList>

        {/* Props */}
        <TabsContent value="props">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Props Completas ({propsData.length})</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                100% compatível com a API do Quasar QBtn + extensões DSS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(propsByCategory).map(([category, props]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2" style={{ color: 'var(--dss-text-body)' }}>
                    <Badge variant="outline">{category}</Badge>
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ width: '150px' }}>Prop</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead style={{ width: '100px' }}>Default</TableHead>
                        <TableHead>Descrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {props.map((row) => (
                        <TableRow key={row.prop}>
                          <TableCell className="font-mono" style={{ color: 'var(--dss-primary)' }}>{row.prop}</TableCell>
                          <TableCell className="font-mono text-xs" style={{ color: 'var(--dss-text-subtle)' }}>{row.type}</TableCell>
                          <TableCell className="font-mono text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{row.default}</TableCell>
                          <TableCell>{row.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events */}
        <TabsContent value="events">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>Eventos emitidos pelo componente.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Payload</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsData.map((row) => (
                    <TableRow key={row.event}>
                      <TableCell className="font-mono" style={{ color: 'var(--dss-primary)' }}>{row.event}</TableCell>
                      <TableCell className="font-mono text-sm">{row.payload}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* Example */}
              <div className="mt-6">
                <h4 className="font-medium mb-2" style={{ color: 'var(--dss-text-body)' }}>Exemplo de Uso</h4>
                <pre className="p-4 rounded-lg text-sm font-mono" style={{ backgroundColor: 'var(--dss-gray-900)', color: 'var(--dss-gray-100)' }}>
{`<DssButton @click="handleClick" label="Clique" />

<script setup>
function handleClick(event) {
  console.log('Botão clicado!', event)
}
</script>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tokens */}
        <TabsContent value="tokens">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Tokens DSS Utilizados ({tokensUsed.length})</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Design tokens aplicados neste componente. Zero hardcoding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(tokensByCategory).map(([category, tokens]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2" style={{ color: 'var(--dss-text-body)' }}>
                    <Badge variant="outline">{category}</Badge>
                    <span className="text-sm font-normal" style={{ color: 'var(--dss-text-subtle)' }}>({tokens.length} tokens)</span>
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ width: '250px' }}>Token</TableHead>
                        <TableHead style={{ width: '200px' }}>Valor</TableHead>
                        <TableHead>Uso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokens.map((t) => (
                        <TokenRow key={t.token} token={t.token} value={t.value} usage={t.usage} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anatomy */}
        <TabsContent value="anatomy">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" style={{ color: 'var(--dss-primary)' }} />
                Anatomia - 4 Camadas DSS
              </CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                Arquitetura modular do componente seguindo as 4 camadas DSS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {anatomyLayers.map((layer) => (
                <div 
                  key={layer.layer}
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: layer.color, 
                    borderLeftColor: layer.layer === 1 ? 'var(--dss-hub-500)' : 
                                     layer.layer === 2 ? 'var(--dss-water-500)' : 
                                     layer.layer === 3 ? 'var(--dss-waste-500)' : 'var(--dss-tertiary)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Badge style={{ 
                      backgroundColor: layer.layer === 1 ? 'var(--dss-hub-500)' : 
                                       layer.layer === 2 ? 'var(--dss-water-500)' : 
                                       layer.layer === 3 ? 'var(--dss-waste-500)' : 'var(--dss-tertiary)',
                      color: 'white'
                    }}>
                      Layer {layer.layer}
                    </Badge>
                    <span className="font-semibold" style={{ color: 'var(--dss-text-body)' }}>{layer.name}</span>
                  </div>
                  <code className="text-sm block mb-2" style={{ color: 'var(--dss-primary)' }}>{layer.file}</code>
                  <p className="text-sm mb-2" style={{ color: 'var(--dss-text-subtle)' }}>{layer.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {layer.tokens.map((token, i) => (
                      <code 
                        key={i} 
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'var(--dss-surface-default)', color: 'var(--dss-text-subtle)' }}
                      >
                        {token}
                      </code>
                    ))}
                  </div>
                </div>
              ))}

              {/* File structure */}
              <div className="mt-6">
                <h4 className="font-medium mb-3" style={{ color: 'var(--dss-text-body)' }}>Estrutura de Arquivos</h4>
                <pre className="p-4 rounded-lg text-sm font-mono" style={{ backgroundColor: 'var(--dss-gray-900)', color: 'var(--dss-gray-100)' }}>
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
        </TabsContent>
      </Tabs>

      {/* Accessibility */}
      <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" style={{ color: 'var(--dss-positive)' }} />
            Acessibilidade WCAG 2.1 AA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>✅ Implementado</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--dss-text-subtle)' }}>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--dss-positive)]" />
                  <span>Touch target mínimo 44x44px (WCAG 2.5.5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--dss-positive)]" />
                  <span>Focus ring visível com <code>:focus-visible</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--dss-positive)]" />
                  <span>Contraste mínimo 4.5:1 em todas as cores</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--dss-positive)]" />
                  <span>Respeita <code>prefers-reduced-motion</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--dss-positive)]" />
                  <span>Suporte a <code>prefers-contrast: high</code></span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium" style={{ color: 'var(--dss-text-body)' }}>📋 Media Queries</h4>
              <pre className="p-3 rounded-lg text-xs font-mono" style={{ backgroundColor: 'var(--dss-gray-900)', color: 'var(--dss-gray-100)' }}>
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
    animation: none !important;
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
