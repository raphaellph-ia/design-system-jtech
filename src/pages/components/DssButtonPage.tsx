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
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

// Importar sistema de Playground UNIFICADO
import {
  DssPlayground,
  ControlGrid,
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
];

// Tokens utilizados pelo DssButton (organizados por categoria)
const tokensUsed = [
  // Action
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Background primary button" },
  { category: "Action", token: "--dss-action-primary-hover", value: "#0f5295", usage: "Hover primary" },
  { category: "Action", token: "--dss-action-primary-light", value: "#86c0f3", usage: "Light primary (outline bg)" },
  { category: "Action", token: "--dss-action-secondary", value: "#26a69a", usage: "Background secondary" },
  { category: "Action", token: "--dss-action-tertiary", value: "#ff6607", usage: "Background tertiary" },
  { category: "Action", token: "--dss-action-accent", value: "#b454c4", usage: "Background accent" },
  { category: "Action", token: "--dss-action-dark", value: "#454545", usage: "Background dark" },
  // Feedback
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Positive/Success button" },
  { category: "Feedback", token: "--dss-feedback-error", value: "#d8182e", usage: "Negative/Error button" },
  { category: "Feedback", token: "--dss-feedback-warning", value: "#fabd14", usage: "Warning button" },
  { category: "Feedback", token: "--dss-feedback-info", value: "#0cc4e9", usage: "Info button" },
  // Brand Hub
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Hub principal (button bg)" },
  { category: "Brand Hub", token: "--dss-hub-700", value: "#bf590f", usage: "Hub hover" },
  // Brand Water
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Water principal (button bg)" },
  { category: "Brand Water", token: "--dss-water-600", value: "#026cc7", usage: "Water hover" },
  // Brand Waste
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Waste principal (button bg)" },
  { category: "Brand Waste", token: "--dss-waste-600", value: "#0b8154", usage: "Waste hover" },
  // Sizing
  { category: "Sizing", token: "--dss-touch-target-md", value: "44px", usage: "Altura mínima WCAG 2.1 AA" },
  { category: "Sizing", token: "--dss-btn-min-width", value: "64px", usage: "Largura mínima" },
  // Spacing
  { category: "Spacing", token: "--dss-spacing-2", value: "8px", usage: "Gap icon-label (sm/md)" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding horizontal (md)" },
  // Border Radius
  { category: "Border Radius", token: "--dss-radius-sm", value: "4px", usage: "Radius padrão (xs/sm)" },
  { category: "Border Radius", token: "--dss-radius-full", value: "9999px", usage: "Botão round/pill" },
  // Elevation
  { category: "Elevation", token: "--dss-elevation-1", value: "0 1px 3px rgba(0,0,0,0.25)", usage: "Sombra elevated" },
  { category: "Elevation", token: "--dss-elevation-2", value: "0 4px 6px rgba(0,0,0,0.30)", usage: "Sombra hover" },
  // Typography
  { category: "Typography", token: "--dss-font-size-md", value: "14px", usage: "Texto medium (padrão)" },
  { category: "Typography", token: "--dss-font-weight-medium", value: "500", usage: "Peso label" },
  // Text
  { category: "Text", token: "--dss-text-inverse", value: "#ffffff", usage: "Texto sobre bg escuro" },
  { category: "Text", token: "--dss-text-body", value: "#454545", usage: "Texto sobre bg claro" },
  // Motion
  { category: "Motion", token: "--dss-duration-fast", value: "150ms", usage: "Transição rápida (hover)" },
  { category: "Motion", token: "--dss-easing-standard", value: "cubic-bezier(0.4,0,0.2,1)", usage: "Easing padrão" },
  // Opacity
  { category: "Opacity", token: "--dss-opacity-disabled", value: "0.4", usage: "Estado desabilitado" },
  // States
  { category: "States", token: "--dss-state-active-scale", value: "0.98", usage: "Scale no pressed" },
  // Gray Scale
  { category: "Gray Scale", token: "--dss-gray-300", value: "#e5e5e5", usage: "Borda light" },
];

// Anatomia 4 Camadas DSS
const anatomyData = {
  structure: {
    files: ["DssButton.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Definição do template HTML semântico (<button> ou <a>)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (@click, @focus, @blur)",
      "Binding de slots (default, icon, icon-right)",
    ],
    tokens: [],
    codeExample: `<template>
  <button
    class="dss-button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot name="icon" />
    <span class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>
    <slot name="icon-right" />
  </button>
</template>`,
  },
  composition: {
    files: ["_base.scss", "_reset.scss", "_layout.scss"],
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
    files: ["_elevated.scss", "_flat.scss", "_outline.scss", "_unelevated.scss", "_push.scss", "_glossy.scss"],
    description: "Define as variações visuais do componente sem incluir cores.",
    responsibilities: [
      "Elevated: box-shadow com --dss-elevation-1",
      "Flat: background transparent, sem borda",
      "Outline: borda 1px, background transparent",
      "Push: efeito 3D com sombra inferior",
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
    files: ["_colors.scss", "_brands.scss", "_states.scss", "_sizes.scss"],
    description: "Camada final que aplica cores semânticas, temas de brand e estados interativos.",
    responsibilities: [
      "Aplicação de cores semânticas (primary, secondary, etc.)",
      "Brandability completa (Hub, Water, Waste)",
      "Estados hover, focus, active, disabled",
      "Focus ring com --dss-shadow-focus",
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
  icon,
  iconRight,
  brand = null,
}: DssButtonPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Obter cores do DSS
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

  // Estilos baseados na variante COM suporte a hover dinâmico
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
    <button
      style={getVariantStyles()}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2"
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
  // Estados do Playground (padrão unificado)
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    disabled: false,
    loading: false,
    round: false,
    iconLeft: false,
    iconRight: false,
  });

  // Exclusividade Brand vs Color (padrão obrigatório)
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    if (brand) setSelectedColor(null);
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  // Lógica de cor efetiva
  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  // Geração de código (padrão unificado)
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
    if (booleanStates.iconLeft) props.push('icon="save"');
    if (booleanStates.iconRight) props.push('icon-right="arrow_forward"');

    return `<DssButton\n  ${props.join("\n  ")}\n/>`;
  };

  // Token ativo baseado na seleção
  const getActiveToken = () => {
    if (selectedBrand) {
      return DSS_BRAND_COLORS[selectedBrand]?.tokens.principal;
    }
    if (selectedColor) {
      const allColors = { ...DSS_SEMANTIC_COLORS, ...feedbackColors };
      const color = allColors[selectedColor];
      return color?.tokens.base;
    }
    return undefined;
  };

  // Opções de toggle para estados
  const toggleOptions = [
    { name: "disabled", label: "Disabled" },
    { name: "loading", label: "Loading" },
    { name: "round", label: "Round" },
    { name: "iconLeft", label: "Icon Left" },
    { name: "iconRight", label: "Icon Right" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* SEÇÃO 1: BADGES + TÍTULO */}
      <PageHeader
        icon={Box}
        badge="Golden Sample"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssButton"
        subtitle="DssButton é o componente utilizado para representar ações na interface, como confirmar, cancelar, enviar ou navegar. Ele oferece variações visuais e comportamentais bem definidas para diferentes contextos de uso."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.1.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* SEÇÃO 2: PLAYGROUND INTERATIVO (COMPONENTE UNIFICADO) */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Botão"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewContent={
          <DssButtonPreview
            label="Clique aqui"
            variant={selectedVariant}
            colorKey={effectiveColor}
            size={selectedSize}
            disabled={booleanStates.disabled}
            loading={booleanStates.loading}
            round={booleanStates.round}
            brand={selectedBrand}
            icon={booleanStates.iconLeft ? <Save className="w-4 h-4" /> : undefined}
            iconRight={booleanStates.iconRight ? <ChevronRight className="w-4 h-4" /> : undefined}
          />
        }
        controls={
          <ControlGrid columns={3}>
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />
            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
              disabled={!!selectedBrand}
            />
            <FeedbackColorPicker
              label="Feedback"
              colors={feedbackColors}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
              disabled={!!selectedBrand}
            />
            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
            <ToggleGroup
              label="Estados & Ícones"
              options={toggleOptions}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
        activeToken={getActiveToken()}
      />

      {/* Anatomia 4 Camadas */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssButton" layers={anatomyData} />

      {/* Documentação Técnica - Seção Colapsável */}
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
        </div>
      </CollapsibleSection>

      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>
              ✅ Implementado
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Touch target mínimo 44x44px (WCAG 2.5.5)",
                "Focus ring visível com :focus-visible",
                "Contraste mínimo 4.5:1 em todas as cores",
                "Respeita prefers-reduced-motion",
                "Suporte a prefers-contrast: high",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>
              📋 Media Queries
            </h4>
            <pre
              className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "var(--jtech-text-body)",
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
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
