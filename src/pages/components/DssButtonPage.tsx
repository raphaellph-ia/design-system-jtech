import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Layers,
  Code,
  FileText,
  Box,
  Loader2,
  ChevronRight,
  Save,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

// Importar sistema de Playground UNIFICADO
import {
  DssPlayground,
  ControlGrid,
  ControlSection,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
  type FeedbackColor,
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS ESPECÍFICOS DO DSSBUTTON
// ============================================================================

// Cores de Feedback com ícones
const feedbackColors: Record<string, FeedbackColor> = {
  positive: {
    ...DSS_FEEDBACK_COLORS.positive,
    icon: CheckCircle,
  },
  negative: {
    ...DSS_FEEDBACK_COLORS.negative,
    icon: XCircle,
  },
  warning: {
    ...DSS_FEEDBACK_COLORS.warning,
    icon: AlertTriangle,
  },
  info: {
    ...DSS_FEEDBACK_COLORS.info,
    icon: Info,
  },
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
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Sansys" },
  { category: "Layout", prop: "stack", type: "Boolean", default: "false", description: "Empilha ícone e label verticalmente" },
  { category: "Layout", prop: "stretch", type: "Boolean", default: "false", description: "Ocupa largura total do container" },
  { category: "Layout", prop: "no-caps", type: "Boolean", default: "false", description: "Desativa uppercase no label" },
  { category: "Layout", prop: "no-wrap", type: "Boolean", default: "false", description: "Impede quebra de linha no label" },
  { category: "Layout", prop: "padding", type: "String", default: "null", description: "Padding customizado (CSS)" },
  { category: "Layout", prop: "align", type: "'left' | 'center' | 'right'", default: "'center'", description: "Alinhamento do conteúdo" },
  { category: "Navegação", prop: "type", type: "'button' | 'submit' | 'reset'", default: "'button'", description: "Tipo nativo do botão" },
  { category: "Navegação", prop: "to", type: "String | Object", default: "null", description: "Rota Vue Router (transforma em router-link)" },
  { category: "Navegação", prop: "replace", type: "Boolean", default: "false", description: "Usa router.replace em vez de push" },
  { category: "Interação", prop: "ripple", type: "Boolean", default: "false", description: "Efeito ripple no clique" },
  { category: "Interação", prop: "tabindex", type: "Number | String", default: "null", description: "Tabindex customizado" },
  { category: "Acessibilidade", prop: "aria-label", type: "String", default: "undefined", description: "Label ARIA para screen readers" },
];

// Anatomia 4 Camadas DSS
const anatomyData = {
  structure: {
    files: ["DssButton.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Definição do template HTML semântico (<button> ou <router-link>)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (@click)",
      "Binding de slots (default, icon, icon-right)",
      "Composables useButtonClasses, useButtonComponent, useButtonProgress",
    ],
    tokens: [],
    codeExample: `<template>
  <component
    :is="componentType"
    :type="nativeType"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="dss-button__loading">
      <span class="dss-button__spinner" />
    </span>
    <span v-if="icon" class="dss-button__icon--left">
      {{ icon }}
    </span>
    <span class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss", "_reset.scss", "_layout.scss"],
    description: "Estilos fundamentais que definem o layout, tipografia e reset do componente.",
    responsibilities: [
      "Reset de estilos nativos do browser",
      "Display flex e alinhamento de conteúdo",
      "Tipografia base (font-family, font-weight, letter-spacing)",
      "Espaçamentos internos via tokens --dss-spacing-*",
    ],
    tokens: ["--dss-font-size-md", "--dss-font-weight-medium", "--dss-spacing-2", "--dss-spacing-4"],
    codeExample: `.dss-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);
  font-weight: var(--dss-font-weight-medium);
  cursor: pointer;
  transition: all var(--dss-duration-fast) var(--dss-easing-standard);
}`,
  },
  variants: {
    files: ["3-variants/_elevated.scss", "_flat.scss", "_outline.scss", "_unelevated.scss", "_push.scss", "_glossy.scss"],
    description: "Define as variações visuais do componente sem incluir cores.",
    responsibilities: [
      "Elevated: box-shadow com --dss-elevation-1",
      "Flat: background transparent, sem borda",
      "Outline: borda 1px, background transparent",
      "Push: efeito 3D com sombra inferior",
      "Glossy: gradiente linear brilhante",
      "Unelevated: sólido sem shadow",
    ],
    tokens: ["--dss-elevation-0", "--dss-elevation-1", "--dss-elevation-2", "--dss-radius-sm"],
    codeExample: `.dss-button--elevated {
  box-shadow: var(--dss-elevation-1);
  
  &:hover {
    box-shadow: var(--dss-elevation-2);
  }
}`,
  },
  output: {
    files: ["4-output/_colors.scss", "_brands.scss", "_states.scss", "_sizes.scss"],
    description: "Camada final que aplica cores semânticas, temas de brand e estados interativos.",
    responsibilities: [
      "Aplicação de cores semânticas (primary, secondary, etc.)",
      "Brandability completa (Hub, Water, Waste)",
      "Estados hover, focus, active, disabled",
      "Focus ring com --dss-shadow-focus",
      "Suporte a prefers-reduced-motion e forced-colors",
    ],
    tokens: ["--dss-action-primary", "--dss-hub-600", "--dss-water-500", "--dss-waste-500"],
    codeExample: `.dss-button--primary {
  background: var(--dss-action-primary);
  color: var(--dss-text-inverse);
  
  &:hover {
    background: var(--dss-action-primary-hover);
  }
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO BUTTON
// ============================================================================

interface DssButtonPreviewProps {
  label?: string;
  variant?: string;
  colorKey?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  square?: boolean;
  dense?: boolean;
  noCaps?: boolean;
  stack?: boolean;
  stretch?: boolean;
  noWrap?: boolean;
  ripple?: boolean;
  align?: string;
  padding?: string;
  percentage?: number | null;
  darkPercentage?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  brand?: string | null;
}

function DssButtonPreview({
  label = "Button",
  variant = "elevated",
  colorKey = "primary",
  size = "md",
  disabled = false,
  loading = false,
  round = false,
  square = false,
  dense = false,
  noCaps = false,
  stack = false,
  stretch = false,
  noWrap = false,
  ripple = false,
  align = "center",
  padding: customPadding,
  percentage = null,
  darkPercentage = false,
  icon,
  iconRight,
  brand = null,
}: DssButtonPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getColors = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      const b = DSS_BRAND_COLORS[brand];
      return {
        bg: b.principal,
        hover: b.scale[700] || b.scale[600],
        light: b.scale[100],
        deep: b.scale[800],
        textColor: "#ffffff",
      };
    }

    if (feedbackColors[colorKey]) {
      const f = feedbackColors[colorKey];
      const textColor = colorKey === "warning" ? "#1a1a1a" : "#ffffff";
      return {
        bg: f.bg,
        hover: f.hover,
        light: f.light,
        deep: f.deep || f.hover,
        textColor,
      };
    }

    if (DSS_SEMANTIC_COLORS[colorKey]) {
      const s = DSS_SEMANTIC_COLORS[colorKey];
      return {
        bg: s.bg,
        hover: s.hover,
        light: s.light,
        deep: s.deep || s.hover,
        textColor: "#ffffff",
      };
    }

    return {
      bg: "#1f86de",
      hover: "#0f5295",
      light: "#86c0f3",
      deep: "#0a3a6a",
      textColor: "#ffffff",
    };
  };

  const getSizeStyles = () => {
    const sizeData = sizes.find((s) => s.name === size) || sizes[2];
    return {
      height: sizeData.height,
      padding: sizeData.padding,
      fontSize: sizeData.fontSize,
    };
  };

  const colors = getColors();
  const sizeStyles = getSizeStyles();

  const getVariantStyles = (): React.CSSProperties => {
    const densePadding = dense ? { padding: "2px 6px" } : {};
    const alignMap: Record<string, string> = {
      left: "flex-start", center: "center", right: "flex-end",
      between: "space-between", around: "space-around", evenly: "space-evenly",
    };

    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: alignMap[align] || "center",
      gap: "8px",
      fontWeight: 500,
      textTransform: noCaps ? "none" : "uppercase",
      letterSpacing: noCaps ? "normal" : "0.0892857143em",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      borderRadius: round ? "9999px" : square ? "0" : "4px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: sizeStyles.height,
      padding: customPadding || sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      fontFamily: "system-ui, -apple-system, sans-serif",
      flexDirection: stack ? "column" : "row",
      width: stretch ? "100%" : undefined,
      whiteSpace: noWrap ? "nowrap" : undefined,
      ...densePadding,
      position: "relative",
      overflow: "hidden",
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
          color: colors.textColor,
          border: "none",
          boxShadow: "none",
        };
      case "push":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: isHovered && !disabled ? `0 2px 0 ${colors.deep}` : `0 4px 0 ${colors.hover}`,
          transform: isHovered && !disabled ? "translateY(0px)" : "translateY(-2px)",
        };
      case "glossy":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.12) 51%, transparent 100%)",
        };
      case "elevated":
      default:
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow:
            isHovered && !disabled
              ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.12)"
              : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        };
    }
  };

  return (
    <div style={{ width: stretch ? "100%" : "auto" }}>
      <button
        style={getVariantStyles()}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {/* Percentage bar */}
        {percentage !== null && loading && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: "3px", width: "100%",
            backgroundColor: darkPercentage ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)",
          }}>
            <div style={{
              height: "100%", width: `${percentage}%`,
              backgroundColor: darkPercentage ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
              transition: "width 0.3s ease",
            }} />
          </div>
        )}
        {loading ? (
          <Loader2 className="animate-spin" style={{ width: sizeStyles.fontSize, height: sizeStyles.fontSize }} />
        ) : (
          <>
            {icon}
            {label && <span>{label}</span>}
            {iconRight}
          </>
        )}
        {/* Ripple indicator */}
        {ripple && (
          <span style={{
            position: "absolute", top: 2, right: 2, width: 6, height: 6,
            borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)",
          }} />
        )}
      </button>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL — Reconstruído conforme Addendum v1.0
// Baseline: DssAvatarPage | Guia: COMPONENT_PAGE_STRUCTURE.md v2.3
// ============================================================================

export default function DssButtonPage() {
  // Estados do Playground (padrão unificado)
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedAlign, setSelectedAlign] = useState("center");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [customPadding, setCustomPadding] = useState("");
  const [booleanStates, setBooleanStates] = useState({
    disabled: false,
    loading: false,
    round: false,
    square: false,
    dense: false,
    noCaps: false,
    stack: false,
    stretch: false,
    noWrap: false,
    ripple: false,
    darkPercentage: false,
    iconLeft: false,
    iconRight: false,
  });

  // Exclusividade Color × Brand (PLAYGROUND_STANDARD v3.1)
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    if (brand) {
      setSelectedBrand(brand);
      setSelectedColor(null);
    }
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  // Geração de código (PLAYGROUND_STANDARD v3.2: código de produção real)
  const generateCode = () => {
    const props: string[] = [];
    props.push('label="Clique aqui"');
    if (selectedVariant !== "elevated") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor && selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    if (selectedSize !== "md") props.push(`size="${selectedSize}"`);
    if (booleanStates.disabled) props.push("disabled");
    if (booleanStates.loading) props.push("loading");
    if (booleanStates.round) props.push("round");
    if (booleanStates.square) props.push("square");
    if (booleanStates.dense) props.push("dense");
    if (booleanStates.noCaps) props.push("no-caps");
    if (booleanStates.stack) props.push("stack");
    if (booleanStates.stretch) props.push("stretch");
    if (booleanStates.noWrap) props.push("no-wrap");
    if (booleanStates.ripple) props.push("ripple");
    if (selectedAlign !== "center") props.push(`align="${selectedAlign}"`);
    if (customPadding) props.push(`padding="${customPadding}"`);
    if (booleanStates.iconLeft) props.push('icon="save"');
    if (booleanStates.iconRight) props.push('icon-right="arrow_forward"');
    if (percentage !== null) {
      props.push(`:percentage="${percentage}"`);
      if (booleanStates.darkPercentage) props.push("dark-percentage");
    }

    return `<DssButton\n  ${props.join("\n  ")}\n/>`;
  };

  const stateToggles = [
    { name: "disabled", label: "Disabled" },
    { name: "loading", label: "Loading" },
    { name: "iconLeft", label: "Icon Left" },
    { name: "iconRight", label: "Icon Right" },
  ];

  const shapeToggles = [
    { name: "round", label: "Round" },
    { name: "square", label: "Square" },
    { name: "dense", label: "Dense" },
  ];

  const layoutToggles = [
    { name: "noCaps", label: "No Caps" },
    { name: "stack", label: "Stack" },
    { name: "stretch", label: "Stretch" },
    { name: "noWrap", label: "No Wrap" },
    { name: "ripple", label: "Ripple" },
  ];

  const alignOptions = [
    { name: "left", label: "Left" },
    { name: "center", label: "Center", isDefault: true },
    { name: "right", label: "Right" },
    { name: "between", label: "Between" },
    { name: "around", label: "Around" },
    { name: "evenly", label: "Evenly" },
  ];

  const percentageOptions = [
    { name: "none", label: "Off" },
    { name: "25", label: "25%" },
    { name: "50", label: "50%" },
    { name: "75", label: "75%" },
    { name: "100", label: "100%" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (COMPONENT_PAGE_STRUCTURE §1, §2)
       * ================================================================ */}
      <PageHeader
        icon={Box}
        badge="Golden Component"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssButton"
        subtitle="DssButton é o componente utilizado para representar ações na interface, como confirmar, cancelar, enviar ou navegar. Ele oferece variações visuais e comportamentais bem definidas para diferentes contextos de uso, podendo ser utilizado de forma isolada ou aninhado dentro de outros componentes interativos."
        subtitleHighlights={["brandabilidade multi-marca", "6 variantes visuais", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2.0", variant: "info" },
          { label: "DSS Selo Aprovado", variant: "success" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / QUANDO NÃO USAR (§3)
       * ================================================================ */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-lg border"
          style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", borderColor: "var(--dss-positive)" }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" />
            Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Ações primárias como salvar, enviar, confirmar ou criar",
              "Ações secundárias como cancelar, voltar ou descartar",
              "Navegação principal via router-link (prop to)",
              "Ações de formulário (submit, reset)",
              "Ações com feedback de loading/progresso",
              "Toolbars, dialogs, cards e footers de página",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="p-5 rounded-lg border"
          style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", borderColor: "var(--dss-negative)" }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <XCircle className="h-5 w-5" />
            Quando NÃO Usar
          </h4>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Cenário</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Alternativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { scenario: "Links de navegação inline no texto", alt: "DssLink ou <a>" },
                { scenario: "Toggles on/off de estado", alt: "DssToggle ou DssCheckbox" },
                { scenario: "Tags ou labels informativos", alt: "DssBadge ou DssChip" },
                { scenario: "Ações em menus dropdown", alt: "DssMenu item" },
                { scenario: "Ícones de ação sem label", alt: "DssIconButton" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.scenario}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>
                    {row.alt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 3: PLAYGROUND INTERATIVO (§4, PLAYGROUND_STANDARD v3.1)
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Botão"
        description="Explore TODAS as props visuais e comportamentais do DssButton em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssButtonPreview
            label="Clique aqui"
            variant={selectedVariant}
            colorKey={effectiveColor}
            size={selectedSize}
            disabled={booleanStates.disabled}
            loading={booleanStates.loading}
            round={booleanStates.round}
            square={booleanStates.square}
            dense={booleanStates.dense}
            noCaps={booleanStates.noCaps}
            stack={booleanStates.stack}
            stretch={booleanStates.stretch}
            noWrap={booleanStates.noWrap}
            ripple={booleanStates.ripple}
            align={selectedAlign}
            padding={customPadding || undefined}
            percentage={percentage}
            darkPercentage={booleanStates.darkPercentage}
            brand={selectedBrand}
            icon={booleanStates.iconLeft ? <Save className="w-4 h-4" /> : undefined}
            iconRight={booleanStates.iconRight ? <ChevronRight className="w-4 h-4" /> : undefined}
          />
        }
        controls={
          <ControlGrid columns={5}>
            {/* Variant */}
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />

            {/* Size */}
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Color Domain — Semantic */}
            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            {/* Color Domain — Brand */}
            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            {/* Color Domain — Feedback */}
            <FeedbackColorPicker
              label="Feedback"
              colors={feedbackColors}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            {/* Shape */}
            <ToggleGroup
              label="Forma"
              options={shapeToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* Layout */}
            <ToggleGroup
              label="Layout"
              options={layoutToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* States & Icons */}
            <ToggleGroup
              label="Estados & Ícones"
              options={stateToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* Align */}
            <SizeSelector
              label="Align"
              sizes={alignOptions}
              selectedSize={selectedAlign}
              onSelect={setSelectedAlign}
            />

            {/* Loading Progress */}
            <ControlSection label="Progress (Loading)">
              {percentageOptions.map((p) => (
                <PlaygroundButton
                  key={p.name}
                  onClick={() => setPercentage(p.name === "none" ? null : Number(p.name))}
                  isSelected={p.name === "none" ? percentage === null : percentage === Number(p.name)}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {p.label}
                </PlaygroundButton>
              ))}
              {percentage !== null && (
                <PlaygroundButton
                  onClick={() => toggleBooleanState("darkPercentage")}
                  isSelected={booleanStates.darkPercentage}
                  selectedBg="var(--dss-positive)"
                  selectedColor="#ffffff"
                >
                  {booleanStates.darkPercentage && "✓ "}Dark %
                </PlaygroundButton>
              )}
            </ControlSection>
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 4: ESTADOS INTERATIVOS (§5)
       * ================================================================ */}
      <SectionHeader title="Estados" titleAccent="Interativos" badge="Comportamento" />

      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Visual</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Interação</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens Aplicados</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", visual: "Aparência padrão com cor semântica", interaction: "Pronto para interação", tokens: "--dss-action-primary", a11y: "—" },
              { state: "Hover", visual: "Cor escurecida, elevação aumentada", interaction: "Pointer over", tokens: "--dss-action-primary-hover, --dss-elevation-2", a11y: "—" },
              { state: "Focus", visual: "Focus ring 2px visível", interaction: "Navegação por teclado", tokens: "--dss-shadow-focus", a11y: "WCAG 2.4.7" },
              { state: "Active", visual: "Scale 0.98, cor pressionada", interaction: "Clique / toque", tokens: "--dss-state-active-scale", a11y: "—" },
              { state: "Disabled", visual: "Opacidade reduzida (0.4)", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Loading", visual: "Spinner ou barra de progresso", interaction: "Bloqueia interação", tokens: "--dss-duration-fast", a11y: "aria-busy" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.visual}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.interaction}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.tokens}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.a11y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS (§6)
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssButton" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES (§7)
       * Cada seção é um bloco colapsável independente.
       * ❌ PROIBIDO agrupar dentro de container genérico.
       * ================================================================ */}

      {/* 7.1 Props API & Eventos */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Categoria</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Type</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propsData.map((p, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-muted)" }}>{p.category}</TableCell>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    {p.prop}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>
                    {p.type}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>
                    {p.default}
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Evento</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Payload</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>click</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>MouseEvent</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o botão é clicado (não emite se disabled ou loading)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.2 Slots */}
      <CollapsibleSection icon={Code} title="Slots">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso Recomendado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo principal do botão (substitui label)</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo customizado, ícones inline, badges internos</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens (TIPOS aceitos, não tokens individuais) */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            Este componente aceita os seguintes tipos de tokens DSS:
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo de Token</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Papel no Componente</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { type: "Cores Semânticas", role: "Background, texto e borda em todas as variantes", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Identidade visual Hub, Water e Waste", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Cores de Feedback", role: "Estados de sucesso, erro, alerta e informação", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Alturas, paddings e touch targets (xs–xl)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Tamanho, peso e espaçamento do label", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius (square, padrão, round)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevação", role: "Box-shadow para variantes elevated, push e glossy", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de hover, focus e active", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Estado desabilitado", ref: "DSS_TOKEN_REFERENCE.md" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.type}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.role}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.4 Acessibilidade WCAG */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Touch target mínimo 44x44px (WCAG 2.5.5)",
                "Focus ring visível com :focus-visible (WCAG 2.4.7)",
                "Contraste mínimo 4.5:1 em todas as cores",
                "aria-busy durante loading",
                "aria-disabled em estado desabilitado",
                "aria-label customizável via prop",
                "Respeita prefers-reduced-motion",
                "Suporte a prefers-contrast: more",
                "Suporte a forced-colors: active",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Critérios WCAG Atendidos</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Critério</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Nível</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "2.5.5 Tamanho do Alvo", level: "AAA" },
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AAA" ? "rgba(180, 84, 196, 0.2)" : item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AAA" ? "var(--dss-action-accent)" : item.level === "AA" ? "var(--dss-positive)" : "var(--dss-action-primary)",
                        }}
                      >
                        {item.level}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h4 className="font-medium mt-4" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Media Queries</h4>
            <pre
              className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
              style={{
                backgroundColor: "var(--jtech-code-bg)",
                color: "var(--jtech-heading-secondary)",
                border: "1px solid var(--jtech-card-border)",
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
}

/* Forced colors (Windows High Contrast) */
@media (forced-colors: active) {
  .dss-button {
    border: 1px solid ButtonText;
  }
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>

      {/* ================================================================
       * SEÇÃO 8: ANTI-PATTERNS (§8)
       * ================================================================ */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Botão sem label acessível",
              wrong: '<DssButton icon="save" />',
              correct: '<DssButton icon="save" aria-label="Salvar registro" />',
              reason: "Botões com apenas ícone precisam de aria-label para screen readers (WCAG 4.1.2).",
            },
            {
              title: "Cores hardcoded em vez de tokens",
              wrong: '<DssButton style="background: #ff0000" label="Erro" />',
              correct: '<DssButton color="negative" label="Erro" />',
              reason: "Bypassa o sistema de tokens e quebra brandabilidade, dark mode e contraste WCAG.",
            },
            {
              title: "Usar DssButton como toggle de estado",
              wrong: '<DssButton :color="isActive ? \'positive\' : \'negative\'" @click="toggle" />',
              correct: '<DssToggle v-model="isActive" label="Ativar recurso" />',
              reason: "Botões representam ações, não estados. Para on/off, usar DssToggle ou DssCheckbox.",
            },
            {
              title: "Botão disabled sem feedback visual alternativo",
              wrong: '<DssButton disabled label="Enviar" />',
              correct: '<DssButton disabled label="Enviar" />\n<span class="text-caption">Preencha todos os campos</span>',
              reason: "Usuários precisam entender por que a ação está indisponível.",
            },
          ].map((pattern, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border"
              style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
            >
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>{pattern.title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.correct}
                  </pre>
                </div>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--jtech-text-muted)" }}>
                <strong>Por quê:</strong> {pattern.reason}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ================================================================
       * SEÇÃO 9: VINCULANTES DSS v2.2 (§9)
       * ================================================================ */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.2">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssButton</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Utilizado em ::after para efeito ripple e ::before para progress overlay" },
                { rule: "Uso de brightness()", application: "Não utilizado — hover é controlado via tokens de cor específicos (--dss-action-*-hover)" },
                { rule: "Classificação do componente", application: "Action Component (interação primária do usuário)" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.rule}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.application}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* ================================================================
       * SEÇÃO 10: REFERÊNCIAS NORMATIVAS (§10)
       * ================================================================ */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "DSS/docs/compliance/seals/DssButton/DSS_BUTTON_SELO_v2.2.md",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <span className="font-mono text-xs">{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
