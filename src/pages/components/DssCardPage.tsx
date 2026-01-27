import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DssTabs, DssTabsList, DssTabsTrigger, DssTabsContent } from "@/components/ui/dss-tabs";
import {
  Copy,
  Check,
  Layers,
  Code,
  FileText,
  LayoutDashboard,
  Sun,
  Moon,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS OBRIGATÓRIOS - CORES SEMÂNTICAS DSS
// ============================================================================
const semanticColors = {
  primary: {
    name: "primary",
    label: "Primary",
    bg: "#1f86de",
    hover: "#0f5295",
    light: "#86c0f3",
    disable: "#b3dcff",
    deep: "#0a3a6a",
    tokens: {
      base: "--dss-action-primary",
      hover: "--dss-action-primary-hover",
      light: "--dss-action-primary-light",
    },
  },
  secondary: {
    name: "secondary",
    label: "Secondary",
    bg: "#26a69a",
    hover: "#1c857e",
    light: "#6ddbcb",
    disable: "#b5ece4",
    deep: "#116761",
    tokens: {
      base: "--dss-action-secondary",
      hover: "--dss-action-secondary-hover",
    },
  },
};

// ============================================================================
// DADOS OBRIGATÓRIOS - CORES DE FEEDBACK DSS
// ============================================================================
const feedbackColors = {
  positive: {
    name: "positive",
    label: "Positive",
    icon: CheckCircle,
    bg: "#4dd228",
    hover: "#27910D",
    light: "#b9f2a4",
    tokens: { base: "--dss-feedback-success", hover: "--dss-feedback-success-hover" },
  },
  negative: {
    name: "negative",
    label: "Negative",
    icon: XCircle,
    bg: "#d8182e",
    hover: "#a01424",
    light: "#ffa0ab",
    tokens: { base: "--dss-feedback-error", hover: "--dss-feedback-error-hover" },
  },
  warning: {
    name: "warning",
    label: "Warning",
    icon: AlertTriangle,
    bg: "#fabd14",
    hover: "#dd8e02",
    light: "#fff488",
    tokens: { base: "--dss-feedback-warning", hover: "--dss-feedback-warning-hover" },
  },
  info: {
    name: "info",
    label: "Info",
    icon: Info,
    bg: "#0cc4e9",
    hover: "#0c8bae",
    light: "#a7effa",
    tokens: { base: "--dss-feedback-info", hover: "--dss-feedback-info-hover" },
  },
};

// ============================================================================
// DADOS OBRIGATÓRIOS - PALETAS DE MARCA (BRANDABILITY)
// ============================================================================
const brandColors = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",
    scale: {
      50: "#fff9ed", 100: "#fef2d6", 200: "#fde2ab", 300: "#fbcb76",
      400: "#f8aa3f", 500: "#f5911a", 600: "#ef7a11", 700: "#bf590f",
      800: "#984614", 900: "#7a3614", 950: "#421d08",
    },
    tokens: { principal: "--dss-hub-600", hover: "--dss-hub-700", light: "--dss-hub-300" },
  },
  water: {
    name: "water",
    label: "Water",
    icon: "🔵",
    principal: "#0e88e4",
    scale: {
      50: "#f0f7ff", 100: "#e0eefe", 200: "#badefd", 300: "#7dc4fc",
      400: "#38a6f8", 500: "#0e88e4", 600: "#026cc7", 700: "#0356a1",
      800: "#074a85", 900: "#0c3e6e", 950: "#082749",
    },
    tokens: { principal: "--dss-water-500", hover: "--dss-water-600", light: "--dss-water-300" },
  },
  waste: {
    name: "waste",
    label: "Waste",
    icon: "🟢",
    principal: "#18b173",
    scale: {
      50: "#edfcf4", 100: "#d3f8e2", 200: "#abefcb", 300: "#74e1ae",
      400: "#3ccb8d", 500: "#18b173", 600: "#0b8154", 700: "#0a724e",
      800: "#0a5b3e", 900: "#0a4a34", 950: "#042a1e",
    },
    tokens: { principal: "--dss-waste-500", hover: "--dss-waste-600", light: "--dss-waste-300" },
  },
};

// ============================================================================
// VARIANTES DO DSSCARD
// ============================================================================
const variants = [
  { name: "elevated", label: "Elevated", desc: "Card com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Sem elevação, apenas background", hasElevation: false },
  { name: "bordered", label: "Bordered", desc: "Com borda + elevação", hasElevation: true },
  { name: "outlined", label: "Outlined", desc: "Com borda, sem elevação", hasElevation: false },
];

// ============================================================================
// ESTADOS DO CARD
// ============================================================================
const states = [
  { name: "default", label: "Default", active: true },
  { name: "clickable", label: "Clickable", active: false },
  { name: "square", label: "Square", active: false },
  { name: "dark", label: "Dark", active: false },
];

// ============================================================================
// PROPS API DO DSSCARD
// ============================================================================
const propsData = [
  { category: "Visual", prop: "variant", type: "'elevated' | 'flat' | 'bordered' | 'outlined'", default: "'elevated'", description: "Estilo visual do card" },
  { category: "Visual", prop: "square", type: "Boolean", default: "false", description: "Remove border-radius (cantos quadrados)" },
  { category: "Interação", prop: "clickable", type: "Boolean", default: "false", description: "Torna o card interativo (hover/focus)" },
  { category: "Tema", prop: "dark", type: "Boolean", default: "false", description: "Aplica modo escuro ao card" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Sansys" },
];

const sectionPropsData = [
  { prop: "horizontal", type: "Boolean", default: "false", description: "Layout horizontal (flex-row)" },
];

const actionsPropsData = [
  { prop: "align", type: "'left' | 'center' | 'right' | 'between' | 'around'", default: "'right'", description: "Alinhamento dos botões" },
  { prop: "vertical", type: "Boolean", default: "false", description: "Layout vertical para ações" },
];

// ============================================================================
// TOKENS UTILIZADOS - ORGANIZADOS POR CATEGORIA (14 CATEGORIAS)
// ============================================================================
const tokensUsed = [
  // Surface
  { category: "Surface", token: "--dss-surface-default", value: "#ffffff", usage: "Background padrão do card" },
  { category: "Surface", token: "--dss-surface-hover", value: "rgba(0,0,0,0.04)", usage: "Hover em cards flat" },
  { category: "Surface", token: "--dss-surface-dark", value: "#2a2a2a", usage: "Background dark mode" },
  
  // Elevation
  { category: "Elevation", token: "--dss-elevation-1", value: "0 1px 3px rgba(0,0,0,0.25)", usage: "Elevação padrão" },
  { category: "Elevation", token: "--dss-elevation-2", value: "0 4px 6px rgba(0,0,0,0.30)", usage: "Hover elevation" },
  { category: "Elevation", token: "--dss-focus-shadow-primary", value: "0 0 0 3px rgba(31,134,222,0.5)", usage: "Focus ring" },
  
  // Border Radius
  { category: "Border Radius", token: "--dss-radius-lg", value: "12px", usage: "Radius padrão do card" },
  { category: "Border Radius", token: "--dss-radius-none", value: "0", usage: "Square mode" },
  
  // Borders
  { category: "Borders", token: "--dss-gray-300", value: "#d4d4d4", usage: "Borda bordered/outlined" },
  { category: "Borders", token: "--dss-gray-400", value: "#a3a3a3", usage: "Borda hover" },
  
  // Spacing
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding actions" },
  { category: "Spacing", token: "--dss-spacing-5", value: "20px", usage: "Padding padrão" },
  
  // Action
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Border active primary" },
  
  // Text
  { category: "Text", token: "--dss-text-body", value: "#454545", usage: "Texto principal" },
  { category: "Text", token: "--dss-text-inverse", value: "#ffffff", usage: "Texto sobre dark" },
  
  // Motion
  { category: "Motion", token: "--dss-duration-base", value: "250ms", usage: "Transição padrão" },
  { category: "Motion", token: "--dss-easing-standard", value: "cubic-bezier(0.4,0,0.2,1)", usage: "Easing padrão" },
  
  // Brand Hub
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Brand Hub border/accent" },
  
  // Brand Water
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Brand Water border/accent" },
  
  // Brand Waste
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Brand Waste border/accent" },
  
  // States
  { category: "States", token: "--dss-state-disabled-opacity", value: "0.4", usage: "Opacity disabled" },
  
  // Gray Scale
  { category: "Gray Scale", token: "--dss-gray-200", value: "#e5e5e5", usage: "Section dividers" },
];

// ============================================================================
// ANATOMIA 4 CAMADAS
// ============================================================================
const anatomyData = {
  structure: {
    files: ["DssCard.ts.vue", "DssCardSection.ts.vue", "DssCardActions.ts.vue"],
    description: "Estrutura base em Vue 3 + Composition API com TypeScript. Define template, props e lógica de composição usando composables dedicados.",
    responsibilities: ["Template HTML semântico", "Props TypeScript tipadas", "Composables para lógica"],
    tokens: [],
    codeExample: `<DssCard variant="elevated" clickable>
  <DssCardSection>Content</DssCardSection>
  <DssCardActions>Buttons</DssCardActions>
</DssCard>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Layout base, tipografia e reset CSS. Define a estrutura visual fundamental do card antes de qualquer variante.",
    responsibilities: ["Flex layout", "Reset de estilos", "Tipografia base"],
    tokens: ["--dss-radius-lg", "--dss-spacing-5"],
    codeExample: `.dss-card {
  border-radius: var(--dss-radius-lg);
  overflow: hidden;
}`,
  },
  variants: {
    files: ["3-variants/_elevated.scss", "_flat.scss", "_bordered.scss", "_outlined.scss"],
    description: "Variações visuais agnósticas de cor: apenas estrutura de shadow, border e background.",
    responsibilities: ["Elevated (shadow)", "Flat (no shadow)", "Bordered/Outlined"],
    tokens: ["--dss-elevation-1", "--dss-elevation-2", "--dss-gray-300"],
    codeExample: `.dss-card--elevated {
  box-shadow: var(--dss-elevation-1);
}`,
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss"],
    description: "Estados finais: dark mode, focus, brands. Camada de orquestração final.",
    responsibilities: ["Dark mode", "Focus states", "Brand theming"],
    tokens: ["--dss-surface-dark", "--dss-hub-600", "--dss-water-500"],
    codeExample: `.dss-card--dark {
  background-color: var(--dss-surface-dark);
  color: var(--dss-text-inverse);
}`,
  },
};

// ============================================================================
// COMPONENTE INTERNO: DssCardPreview (com hover logic)
// ============================================================================
interface DssCardPreviewProps {
  variant?: string;
  clickable?: boolean;
  square?: boolean;
  dark?: boolean;
  brand?: string | null;
  semanticColor?: string | null;
  children?: React.ReactNode;
}

function DssCardPreview({
  variant = "elevated",
  clickable = false,
  square = false,
  dark = false,
  brand = null,
  semanticColor = null,
  children,
}: DssCardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determinar cores baseado em brand ou semantic
  const getColors = () => {
    if (brand && brandColors[brand as keyof typeof brandColors]) {
      const b = brandColors[brand as keyof typeof brandColors];
      return { primary: b.principal, hover: b.scale[700], light: b.scale[300] };
    }
    if (semanticColor) {
      const allColors = { ...semanticColors, ...feedbackColors };
      const c = allColors[semanticColor as keyof typeof allColors];
      if (c) return { primary: c.bg, hover: c.hover, light: c.light };
    }
    return { primary: "#1f86de", hover: "#0f5295", light: "#86c0f3" };
  };

  const colors = getColors();

  // Estilos baseados na variante
  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      backgroundColor: dark ? "#2a2a2a" : "#ffffff",
      color: dark ? "#ffffff" : "#454545",
      borderRadius: square ? "0" : "12px",
      transition: "all 250ms cubic-bezier(0.4,0,0.2,1)",
      cursor: clickable ? "pointer" : "default",
      transform: clickable && isHovered ? "translateY(-2px)" : "translateY(0)",
    };

    switch (variant) {
      case "elevated":
        return {
          ...base,
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.30)"
            : "0 1px 3px rgba(0,0,0,0.25)",
        };
      case "flat":
        return {
          ...base,
          boxShadow: "none",
          backgroundColor: isHovered && clickable
            ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)")
            : (dark ? "#2a2a2a" : "#ffffff"),
        };
      case "bordered":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? colors.primary : (dark ? "rgba(255,255,255,0.2)" : "#d4d4d4")}`,
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.30)"
            : "0 1px 3px rgba(0,0,0,0.25)",
        };
      case "outlined":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? colors.primary : (dark ? "rgba(255,255,255,0.2)" : "#d4d4d4")}`,
          boxShadow: "none",
          backgroundColor: isHovered && clickable
            ? `${colors.light}20`
            : (dark ? "#2a2a2a" : "#ffffff"),
        };
      default:
        return base;
    }
  };

  return (
    <div
      style={getVariantStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTE: CardSection
// ============================================================================
function CardSection({ children, horizontal = false }: { children: React.ReactNode; horizontal?: boolean }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        display: horizontal ? "flex" : "block",
        flexDirection: horizontal ? "row" : undefined,
        alignItems: horizontal ? "center" : undefined,
        gap: horizontal ? "12px" : undefined,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTE: CardActions
// ============================================================================
function CardActions({
  children,
  align = "right",
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
      style={{
        padding: "12px 16px",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: justifyMap[align],
        gap: "8px",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: DssCardPage
// ============================================================================
export default function DssCardPage() {
  // Estados do Playground
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isClickable, setIsClickable] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Exclusividade Brand vs Cor
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedColor(null);
  };

  // Geração de código
  const generateCode = () => {
    const props: string[] = [];
    if (selectedVariant !== "elevated") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    if (isClickable) props.push("clickable");
    if (isSquare) props.push("square");
    if (isDarkMode) props.push("dark");

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
    return `<DssCard${propsStr}>
  <DssCardSection>
    Card content here
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton label="Action" />
  </DssCardActions>
</DssCard>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Todas as cores para seleção
  const allColors = [
    ...Object.values(semanticColors),
    ...Object.values(feedbackColors),
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* SEÇÃO 1: BADGES + TÍTULO */}
      <PageHeader
        icon={LayoutDashboard}
        badge="Golden Sample"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssCard"
        subtitle="Container visual para agrupar conteúdo relacionado. Suporta seções, ações, variantes visuais e branding Sansys com hover states nativos."
        subtitleHighlights={["seções", "ações", "variantes", "branding"]}
        extraBadges={[
          { label: "v2.2.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
          { label: "TypeScript", variant: "info" },
        ]}
      />

      {/* SEÇÃO 2: PLAYGROUND INTERATIVO */}
      <SectionHeader
        title="Playground"
        titleAccent="Interativo"
        badge="Configurador"
        icon={Zap}
      />

      <Card
        style={{
          backgroundColor: "var(--jtech-card-bg)",
          borderColor: "var(--jtech-card-border)",
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Área de Preview */}
            <div
              className="rounded-lg p-8 flex items-center justify-center min-h-[300px] transition-all duration-300"
              style={{
                backgroundColor: isDarkMode ? "#1a1a2e" : "#f5f5f5",
                backgroundImage: isDarkMode
                  ? "radial-gradient(circle, #2d2d44 1px, transparent 1px)"
                  : "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                border: `1px solid ${isDarkMode ? "#2d2d44" : "#e5e5e5"}`,
              }}
            >
              <DssCardPreview
                variant={selectedVariant}
                clickable={isClickable}
                square={isSquare}
                dark={isDarkMode}
                brand={selectedBrand}
                semanticColor={selectedColor}
              >
                <CardSection>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: isDarkMode ? "#ffffff" : "#1a1a1a" }}
                  >
                    Card Title
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: isDarkMode ? "rgba(255,255,255,0.7)" : "#666" }}
                  >
                    This is an example card content with the current configuration applied.
                  </p>
                </CardSection>
                <CardActions align="right">
                  <button
                    className="px-3 py-1.5 text-xs rounded transition-all"
                    style={{
                      backgroundColor: "transparent",
                      color: isDarkMode ? "#86c0f3" : "#1f86de",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs rounded transition-all"
                    style={{
                      backgroundColor: selectedBrand
                        ? brandColors[selectedBrand as keyof typeof brandColors]?.principal
                        : selectedColor
                        ? { ...semanticColors, ...feedbackColors }[selectedColor as keyof typeof semanticColors]?.bg
                        : "#1f86de",
                      color: "#ffffff",
                    }}
                  >
                    Confirm
                  </button>
                </CardActions>
              </DssCardPreview>
            </div>

            {/* Controles */}
            <div className="space-y-5">
              {/* Toggle Light/Dark */}
              <div className="flex justify-end">
                <PlaygroundButton
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  isSelected={isDarkMode}
                  selectedColor="var(--dss-jtech-accent)"
                >
                  <div className="flex items-center gap-2">
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDarkMode ? "Light" : "Dark"}</span>
                  </div>
                </PlaygroundButton>
              </div>

              {/* Variantes */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--jtech-text-muted)" }}>
                  Variante
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <PlaygroundButton
                      key={v.name}
                      onClick={() => setSelectedVariant(v.name)}
                      isSelected={selectedVariant === v.name}
                      selectedColor="var(--dss-jtech-accent)"
                    >
                      {v.label}
                    </PlaygroundButton>
                  ))}
                </div>
              </div>

              {/* Cores Semânticas */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--jtech-text-muted)" }}>
                  Cor Semântica
                </label>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((c) => (
                    <PlaygroundButton
                      key={c.name}
                      onClick={() => handleColorChange(c.name)}
                      isSelected={selectedColor === c.name}
                      selectedColor={c.bg}
                    >
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: c.bg }}
                        />
                        <span>{c.label}</span>
                      </div>
                    </PlaygroundButton>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--jtech-text-muted)" }}>
                  Brand
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(brandColors).map((b) => (
                    <PlaygroundButton
                      key={b.name}
                      onClick={() => handleBrandChange(b.name)}
                      isSelected={selectedBrand === b.name}
                      selectedColor={b.principal}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{b.icon}</span>
                        <span>{b.label}</span>
                      </div>
                    </PlaygroundButton>
                  ))}
                </div>
              </div>

              {/* Estados */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--jtech-text-muted)" }}>
                  Estados
                </label>
                <div className="flex flex-wrap gap-2">
                  <PlaygroundButton
                    onClick={() => setIsClickable(!isClickable)}
                    isSelected={isClickable}
                    selectedColor="var(--dss-jtech-accent)"
                  >
                    Clickable
                  </PlaygroundButton>
                  <PlaygroundButton
                    onClick={() => setIsSquare(!isSquare)}
                    isSelected={isSquare}
                    selectedColor="var(--dss-jtech-accent)"
                  >
                    Square
                  </PlaygroundButton>
                </div>
              </div>

              {/* Code Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium" style={{ color: "var(--jtech-text-muted)" }}>
                    Código
                  </label>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-all hover:bg-white/10"
                    style={{ color: "var(--dss-jtech-accent)" }}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
                <pre
                  className="p-3 rounded-lg text-xs overflow-x-auto"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    color: "var(--dss-jtech-accent-light)",
                  }}
                >
                  <code>{generateCode()}</code>
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 3: ANATOMIA 4 CAMADAS */}
      <SectionHeader
        title="Anatomia"
        titleAccent="4 Camadas"
        badge="DSS Pattern"
        icon={Layers}
      />

      <AnatomySection componentName="DssCard" layers={anatomyData} />

      {/* SEÇÃO 4: DOCUMENTAÇÃO TÉCNICA (COLAPSÁVEL) */}
      <CollapsibleSection icon={FileText} title="Props" titleAccent="API">
        <DssTabs defaultValue="dsscard" className="w-full">
          <DssTabsList>
            <DssTabsTrigger value="dsscard">DssCard</DssTabsTrigger>
            <DssTabsTrigger value="section">DssCardSection</DssTabsTrigger>
            <DssTabsTrigger value="actions">DssCardActions</DssTabsTrigger>
          </DssTabsList>

          <DssTabsContent value="dsscard">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Categoria</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propsData.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge variant="outline" style={{ borderColor: "var(--dss-jtech-accent)", color: "var(--dss-jtech-accent)" }}>
                          {p.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: "var(--dss-jtech-accent-light)" }}>{p.prop}</TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.type}</TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: "#4dd228" }}>{p.default}</TableCell>
                      <TableCell style={{ color: "var(--jtech-text-secondary)" }}>{p.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DssTabsContent>

          <DssTabsContent value="section">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionPropsData.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-sm" style={{ color: "var(--dss-jtech-accent-light)" }}>{p.prop}</TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.type}</TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: "#4dd228" }}>{p.default}</TableCell>
                      <TableCell style={{ color: "var(--jtech-text-secondary)" }}>{p.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DssTabsContent>

          <DssTabsContent value="actions">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actionsPropsData.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-sm" style={{ color: "var(--dss-jtech-accent-light)" }}>{p.prop}</TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.type}</TableCell>
                      <TableCell className="font-mono text-xs" style={{ color: "#4dd228" }}>{p.default}</TableCell>
                      <TableCell style={{ color: "var(--jtech-text-secondary)" }}>{p.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DssTabsContent>
        </DssTabs>
      </CollapsibleSection>

      <CollapsibleSection icon={Code} title="Tokens" titleAccent="DSS">
        <DssTabs defaultValue="surface" className="w-full">
          <DssTabsList className="flex-wrap">
            {["Surface", "Elevation", "Border Radius", "Borders", "Spacing", "Action", "Text", "Motion", "Brand Hub", "Brand Water", "Brand Waste", "States", "Gray Scale"].map((cat) => (
              <DssTabsTrigger key={cat} value={cat.toLowerCase().replace(" ", "-")}>
                {cat}
              </DssTabsTrigger>
            ))}
          </DssTabsList>

          {["Surface", "Elevation", "Border Radius", "Borders", "Spacing", "Action", "Text", "Motion", "Brand Hub", "Brand Water", "Brand Waste", "States", "Gray Scale"].map((cat) => (
            <DssTabsContent key={cat} value={cat.toLowerCase().replace(" ", "-")}>
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Token</TableHead>
                      <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Value</TableHead>
                      <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokensUsed
                      .filter((t) => t.category === cat)
                      .map((t, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono text-sm" style={{ color: "var(--dss-jtech-accent-light)" }}>{t.token}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {t.value.startsWith("#") && (
                                <div
                                  className="w-4 h-4 rounded border border-white/20"
                                  style={{ backgroundColor: t.value }}
                                />
                              )}
                              <code className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>{t.value}</code>
                            </div>
                          </TableCell>
                          <TableCell style={{ color: "var(--jtech-text-secondary)" }}>{t.usage}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </DssTabsContent>
          ))}
        </DssTabs>
      </CollapsibleSection>
    </div>
  );
}
