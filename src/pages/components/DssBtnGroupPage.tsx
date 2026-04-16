import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
  LayoutGrid,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
  type FeedbackColor,
} from "@/components/ui/playground";

// ============================================================================
// DADOS ESPECÍFICOS DO DSSBTNGROUP
// ============================================================================

const variants = [
  { name: "elevated", label: "Elevated", desc: "Botões com elevação (padrão)" },
  { name: "flat", label: "Flat", desc: "Sem elevação, separador cinza entre filhos" },
  { name: "outline", label: "Outline", desc: "Com borda, colapso de bordas duplas" },
  { name: "unelevated", label: "Unelevated", desc: "Sólido sem shadow, separador sutil" },
  { name: "push", label: "Push", desc: "Efeito 3D com separador entre filhos" },
  { name: "glossy", label: "Glossy", desc: "Efeito brilhante/gradiente" },
];

const feedbackColors: Record<string, FeedbackColor> = {
  positive: { ...DSS_FEEDBACK_COLORS.positive, icon: CheckCircle },
  negative: { ...DSS_FEEDBACK_COLORS.negative, icon: XCircle },
  warning: { ...DSS_FEEDBACK_COLORS.warning, icon: AlertTriangle },
  info: { ...DSS_FEEDBACK_COLORS.info, icon: Info },
};

const propsData = [
  { category: "Estilo Visual", prop: "flat", type: "Boolean", default: "false", description: "Estilo flat. ⚠️ Prop sync obrigatório com filhos." },
  { category: "Estilo Visual", prop: "outline", type: "Boolean", default: "false", description: "Estilo com borda. ⚠️ Prop sync obrigatório com filhos." },
  { category: "Estilo Visual", prop: "push", type: "Boolean", default: "false", description: "Estilo 3D push. ⚠️ Prop sync obrigatório com filhos." },
  { category: "Estilo Visual", prop: "unelevated", type: "Boolean", default: "false", description: "Remove elevação. ⚠️ Prop sync obrigatório com filhos." },
  { category: "Estilo Visual", prop: "glossy", type: "Boolean", default: "false", description: "Efeito glossy. ⚠️ Prop sync obrigatório com filhos." },
  { category: "Forma", prop: "rounded", type: "Boolean", default: "false", description: "Border-radius pill nos cantos externos do grupo." },
  { category: "Forma", prop: "square", type: "Boolean", default: "false", description: "Remove todo border-radius (cantos retos)." },
  { category: "Layout", prop: "spread", type: "Boolean", default: "false", description: "Distribui botões igualmente (flex: 1 nos filhos)." },
  { category: "Layout", prop: "stretch", type: "Boolean", default: "false", description: "Filhos esticam até a altura do container pai." },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Acento visual de marca na borda inferior via box-shadow inset." },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label ARIA para o container role='group'." },
];

const anatomyData = {
  structure: {
    files: ["DssBtnGroup.ts.vue"],
    description: "Container estrutural que agrupa instâncias de DssButton com role='group' e forwarding de $attrs.",
    responsibilities: [
      "Template <div> com role='group' e aria-label",
      "Declaração de props com validação TypeScript",
      "v-bind='$attrs' para forwarding de atributos HTML",
      "Slot default para DssButton filhos",
      "Composable useBtnGroupClasses",
    ],
    tokens: [],
    codeExample: `<template>
  <div
    :class="btnGroupClasses"
    role="group"
    :aria-label="ariaLabel || undefined"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais do container: display inline-flex, border-radius nos extremos e reset de filhos intermediários.",
    responsibilities: [
      "Display inline-flex para agrupamento horizontal",
      "Border-radius apenas nos cantos externos (primeiro e último filho)",
      "Reset de border-radius em filhos intermediários",
      "Variante square: border-radius: 0 em todos os filhos [EXC-01]",
    ],
    tokens: ["--dss-radius-full"],
    codeExample: `.dss-btn-group {
  display: inline-flex;
  
  > .dss-button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  > .dss-button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}`,
  },
  variants: {
    files: ["3-variants/_flat.scss", "_outline.scss", "_push.scss", "_unelevated.scss"],
    description: "Ajustes visuais por variante: separadores entre filhos, colapso de bordas e espaçamento.",
    responsibilities: [
      "Flat: separador --dss-gray-300 entre filhos",
      "Outline: margin-left negativo para colapso de bordas duplas",
      "Push: separador --dss-gray-200 entre filhos",
      "Unelevated: separador --dss-gray-200 entre filhos",
    ],
    tokens: ["--dss-border-width-thin", "--dss-gray-200", "--dss-gray-300"],
    codeExample: `.dss-btn-group--outline > .dss-button + .dss-button {
  margin-left: calc(-1 * var(--dss-border-width-thin));
}

.dss-btn-group--flat > .dss-button + .dss-button {
  border-left: 1px solid var(--dss-gray-300);
}`,
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss"],
    description: "Camada final: brandabilidade (box-shadow inset), dark mode e forced-colors.",
    responsibilities: [
      "Brand Hub/Water/Waste via box-shadow inset na borda inferior",
      "Dark mode: cores de brand ajustadas (hub-400, water-400, waste-500)",
      "Dark mode divider: rgba(255,255,255,0.12) [EXC-02]",
      "Forced-colors: 1px solid ButtonText [EXC-03]",
      "Suporte a prefers-reduced-motion",
    ],
    tokens: ["--dss-hub-600", "--dss-hub-400", "--dss-water-500", "--dss-water-400", "--dss-waste-600", "--dss-waste-500", "--dss-border-width-thick"],
    codeExample: `.dss-btn-group--brand-hub {
  box-shadow: inset 0 calc(-1 * var(--dss-border-width-thick)) 0 var(--dss-hub-600);
}

[data-theme="dark"] .dss-btn-group--brand-hub {
  box-shadow: inset 0 calc(-1 * var(--dss-border-width-thick)) 0 var(--dss-hub-400);
}`,
  },
};

// ============================================================================
// RESOLUÇÃO DE COR ATIVA (Color Application Domain)
// ============================================================================

function resolveActiveColor(
  selectedColor: string | null,
  selectedFeedback: string | null,
  selectedBrand: string | null
): { bg: string; hover: string; textColor: string; light: string } {
  // Priority: Brand > Feedback > Semantic (per v3.2)
  if (selectedBrand && DSS_BRAND_COLORS[selectedBrand]) {
    const b = DSS_BRAND_COLORS[selectedBrand];
    return { bg: b.principal, hover: b.scale[700] || b.scale[600], textColor: "#ffffff", light: b.scale[100] };
  }
  if (selectedFeedback && feedbackColors[selectedFeedback]) {
    const f = feedbackColors[selectedFeedback];
    const textColor = selectedFeedback === "warning" ? "#1a1a1a" : "#ffffff";
    return { bg: f.bg, hover: f.hover, textColor, light: f.light };
  }
  if (selectedColor && DSS_SEMANTIC_COLORS[selectedColor]) {
    const s = DSS_SEMANTIC_COLORS[selectedColor];
    return { bg: s.bg, hover: s.hover, textColor: "#ffffff", light: s.light };
  }
  // Default: primary
  return { bg: "#1f86de", hover: "#0f5295", textColor: "#ffffff", light: "#86c0f3" };
}

// ============================================================================
// PREVIEW DO BTNGROUP
// ============================================================================

interface DssBtnGroupPreviewProps {
  variant: string;
  brand: string | null;
  selectedColor: string | null;
  selectedFeedback: string | null;
  rounded: boolean;
  square: boolean;
  spread: boolean;
  stretch: boolean;
  split: boolean;
}

function DssBtnGroupPreview({
  variant,
  brand,
  selectedColor,
  selectedFeedback,
  rounded,
  square,
  spread,
  stretch,
  split,
}: DssBtnGroupPreviewProps) {
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  const colors = resolveActiveColor(selectedColor, selectedFeedback, brand);

  // Brand accent line only when brand is active
  const brandAccentColor = brand && DSS_BRAND_COLORS[brand]
    ? DSS_BRAND_COLORS[brand].principal
    : null;

  const getButtonStyle = (index: number, total: number): React.CSSProperties => {
    const isHovered = hoveredBtn === index;
    const isFirst = index === 0;
    const isLast = index === total - 1;

    const getBorderRadius = () => {
      if (square) return "0";
      const r = rounded ? "9999px" : "4px";
      if (total === 1) return r;
      if (isFirst) return `${r} 0 0 ${r}`;
      if (isLast) return `0 ${r} ${r} 0`;
      return "0";
    };

    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "system-ui, -apple-system, sans-serif",
      textTransform: "uppercase",
      letterSpacing: "0.089em",
      cursor: "pointer",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: "44px",
      borderRadius: getBorderRadius(),
      flex: spread ? 1 : undefined,
      alignSelf: stretch ? "stretch" : undefined,
    };

    switch (variant) {
      case "flat":
        return {
          ...base,
          backgroundColor: isHovered ? `${colors.bg}14` : "transparent",
          color: isHovered ? colors.hover : colors.bg,
          border: "none",
          boxShadow: "none",
          borderRight: index < total - 1 ? "1px solid #d1d5db" : "none",
        };
      case "outline":
        return {
          ...base,
          backgroundColor: isHovered ? `${colors.bg}14` : "transparent",
          color: isHovered ? colors.hover : colors.bg,
          border: `1px solid ${colors.bg}`,
          boxShadow: "none",
          marginLeft: index > 0 ? "-1px" : undefined,
        };
      case "unelevated":
        return {
          ...base,
          backgroundColor: isHovered ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "none",
          borderRight: index < total - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
        };
      case "push":
        return {
          ...base,
          backgroundColor: isHovered ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: isHovered
            ? `0 2px 0 ${colors.hover}`
            : `0 4px 0 ${colors.hover}`,
          transform: isHovered ? "translateY(0px)" : "translateY(-2px)",
          borderRight: index < total - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
        };
      case "glossy":
        return {
          ...base,
          backgroundColor: isHovered ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.12) 51%, transparent 100%)",
        };
      default: // elevated
        return {
          ...base,
          backgroundColor: isHovered ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: isHovered
            ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        };
    }
  };

  const buttons = split
    ? ["Primeiro", "Segundo"]
    : ["Primeiro", "Segundo", "Terceiro"];

  // Total buttons + 1 if split (dropdown arrow counts as last element)
  const totalElements = split ? buttons.length + 1 : buttons.length;

  const getDropdownArrowStyle = (): React.CSSProperties => {
    const baseStyle = getButtonStyle(totalElements - 1, totalElements);
    return {
      ...baseStyle,
      padding: "8px 6px",
      minWidth: "36px",
      flex: spread ? 1 : undefined,
      borderLeft: variant === "outline" ? "none" : undefined,
      marginLeft: variant === "outline" ? "-1px" : undefined,
    };
  };

  // Stretch needs a parent container with defined height
  const groupContent = (
    <div
      style={{
        display: spread ? "flex" : "inline-flex",
        position: "relative",
        width: spread ? "100%" : undefined,
        maxWidth: spread ? "400px" : undefined,
        height: stretch ? "100%" : undefined,
        boxShadow: brandAccentColor
          ? `inset 0 -3px 0 ${brandAccentColor}`
          : "none",
        borderRadius: square ? "0" : rounded ? "9999px" : "4px",
        overflow: "visible",
      }}
      role="group"
      aria-label="Grupo de botões de exemplo"
    >
      {buttons.map((label, i) => (
        <button
          key={i}
          style={{
            ...getButtonStyle(i, totalElements),
            height: stretch ? "100%" : undefined,
          }}
          onMouseEnter={() => setHoveredBtn(i)}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          {label}
        </button>
      ))}
      {split && (
        <button
          style={{
            ...getDropdownArrowStyle(),
            height: stretch ? "100%" : undefined,
          }}
          onMouseEnter={() => setHoveredBtn(buttons.length)}
          onMouseLeave={() => setHoveredBtn(null)}
          aria-label="Abrir dropdown"
        >
          ▾
        </button>
      )}
    </div>
  );

  // When stretch is active, wrap in a tall container to demonstrate the effect
  if (stretch) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          height: "120px",
          border: "1px dashed rgba(255,255,255,0.2)",
          borderRadius: "8px",
          padding: "0",
          width: spread ? "100%" : undefined,
          maxWidth: spread ? "400px" : undefined,
        }}
      >
        {groupContent}
      </div>
    );
  }

  return groupContent;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssBtnGroupPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    rounded: false,
    square: false,
    spread: false,
    stretch: false,
  });

  // Color Application Domain — mutual exclusivity
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedFeedback(null);
    setSelectedBrand(null);
  };

  const handleFeedbackChange = (feedback: string) => {
    setSelectedFeedback(feedback);
    setSelectedColor(null);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    setSelectedColor(null);
    setSelectedFeedback(null);
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const generateCode = () => {
    const groupProps: string[] = [];
    const variantProp = selectedVariant !== "elevated" ? selectedVariant : null;
    if (variantProp) groupProps.push(variantProp);
    if (selectedBrand) groupProps.push(`brand="${selectedBrand}"`);
    if (booleanStates.rounded) groupProps.push("rounded");
    if (booleanStates.square) groupProps.push("square");
    if (booleanStates.spread) groupProps.push("spread");
    if (booleanStates.stretch) groupProps.push("stretch");

    const groupPropsStr = groupProps.length > 0 ? ` ${groupProps.join(" ")}` : "";

    // Child button props
    const childPropParts: string[] = [];
    if (variantProp) childPropParts.push(variantProp);
    // Color on children (not on group)
    const effectiveColor = selectedBrand ? null : (selectedFeedback || selectedColor);
    if (effectiveColor && effectiveColor !== "primary") {
      childPropParts.push(`color="${effectiveColor}"`);
    }

    const childPropsStr = childPropParts.length > 0 ? ` ${childPropParts.join(" ")}` : "";

    return `<DssBtnGroup${groupPropsStr}>
  <DssButton${childPropsStr} label="Primeiro" />
  <DssButton${childPropsStr} label="Segundo" />
  <DssButton${childPropsStr} label="Terceiro" />
</DssBtnGroup>`;
  };

  const shapeToggles = [
    { name: "rounded", label: "Rounded" },
    { name: "square", label: "Square" },
  ];

  const layoutToggles = [
    { name: "spread", label: "Spread" },
    { name: "stretch", label: "Stretch" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO
       * ================================================================ */}
      <PageHeader
        icon={LayoutGrid}
        badge="Golden Context: DssButton"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssBtnGroup"
        subtitle="DssBtnGroup é o container de composição que agrupa instâncias de DssButton, gerenciando border-radius nas extremidades, separadores entre botões e ajustes visuais por variante. É um componente estrutural Fase 2 que não propaga props para filhos — a sincronização de estilo é responsabilidade do desenvolvedor."
        subtitleHighlights={["container de composição", "Prop Sync obrigatório", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2.0", variant: "info" },
          { label: "Fase 2", variant: "success" },
          { label: "Pré-auditoria", variant: "warning" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / QUANDO NÃO USAR
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
              "Agrupar ações relacionadas como opções de formatação de texto",
              "Toolbar de ações onde botões compartilham contexto visual",
              "Segmentar ações mutuamente exclusivas (sem v-model)",
              "Agrupar botões com estilo visual consistente (flat, outline, push)",
              "Aplicar acento de brand em grupo de ações",
              "Distribuir ações igualmente com spread em containers flexbox",
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
                { scenario: "Seleção de valor com v-model", alt: "DssBtnToggle" },
                { scenario: "Navegação com tabs", alt: "DssTabs" },
                { scenario: "Ações independentes sem relação", alt: "DssButton individual" },
                { scenario: "Menu com dropdown", alt: "DssBtnDropdown" },
                { scenario: "Toggle on/off de estado", alt: "DssToggle" },
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
       * SEÇÃO 3: REGRA CRÍTICA — PROP SYNC
       * ================================================================ */}
      <div
        className="p-5 rounded-lg border"
        style={{ backgroundColor: "rgba(250, 189, 20, 0.1)", borderColor: "var(--dss-warning)" }}
      >
        <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-warning)" }}>
          <AlertTriangle className="h-5 w-5" />
          Regra Crítica: Prop Sync Obrigatório
        </h4>
        <p className="text-sm mb-3" style={{ color: "var(--jtech-text-body)" }}>
          Props de estilo (<code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--jtech-code-bg)" }}>flat</code>, 
          <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--jtech-code-bg)" }}>outline</code>, 
          <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--jtech-code-bg)" }}>push</code>, 
          <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--jtech-code-bg)" }}>unelevated</code>, 
          <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--jtech-code-bg)" }}>glossy</code>) 
          <strong> DEVEM ser declaradas TANTO no DssBtnGroup QUANTO em cada DssButton filho</strong>.
          O DssBtnGroup NÃO propaga essas props automaticamente.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
            <pre className="mt-1 p-3 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
{`<DssBtnGroup outline>
  <DssButton outline label="A" />
  <DssButton outline label="B" />
</DssBtnGroup>`}
            </pre>
          </div>
          <div>
            <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
            <pre className="mt-1 p-3 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
{`<DssBtnGroup outline>
  <DssButton label="A" />
  <DssButton label="B" />
</DssBtnGroup>`}
            </pre>
          </div>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 4: PLAYGROUND INTERATIVO (v3.2)
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o BtnGroup"
        description="Selecione variante, cor, brand, forma e layout para visualizar o DssBtnGroup em tempo real. Cores são aplicadas nos DssButton filhos."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssBtnGroupPreview
            variant={selectedVariant}
            brand={selectedBrand}
            selectedColor={selectedColor}
            selectedFeedback={selectedFeedback}
            rounded={booleanStates.rounded}
            square={booleanStates.square}
            spread={booleanStates.spread}
            stretch={booleanStates.stretch}
          />
        }
        controls={
          <ControlGrid columns={5}>
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
            />

            <FeedbackColorPicker
              label="Feedback"
              colors={feedbackColors}
              selectedColor={selectedFeedback}
              onSelect={handleFeedbackChange}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <div className="space-y-4">
              <ToggleGroup
                label="Forma"
                options={shapeToggles}
                values={booleanStates}
                onToggle={toggleBooleanState}
              />
              <ToggleGroup
                label="Layout"
                options={layoutToggles}
                values={booleanStates}
                onToggle={toggleBooleanState}
              />
            </div>
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 5: ESTADOS — Container Estrutural
       * ================================================================ */}
      <SectionHeader title="Estados" titleAccent="do Container" badge="Comportamento" />

      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "var(--jtech-card-border)" }}>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" style={{ color: "var(--dss-info)" }} />
            <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
              O DssBtnGroup é um <strong>container estrutural</strong> — ele não possui estados interativos próprios.
              Todos os estados (hover, focus, active, disabled, loading) pertencem aos DssButton filhos.
            </p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aspecto</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Responsável</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { aspect: "Hover", description: "Mudança visual ao passar o mouse", responsible: "DssButton filho" },
              { aspect: "Focus", description: "Focus ring com :focus-visible", responsible: "DssButton filho" },
              { aspect: "Active", description: "Feedback visual de pressão", responsible: "DssButton filho" },
              { aspect: "Disabled", description: "Opacidade reduzida, cursor not-allowed", responsible: "DssButton filho" },
              { aspect: "Loading", description: "Spinner e bloqueio de interação", responsible: "DssButton filho" },
              { aspect: "Touch Target", description: "Min 44x44px (WCAG 2.5.5)", responsible: "DssButton filho (Opção B)" },
              { aspect: "Keyboard Nav", description: "Navegação individual por Tab", responsible: "DssButton filho" },
              { aspect: "Brand Accent", description: "Box-shadow inset na borda inferior", responsible: "DssBtnGroup (L4)" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.aspect}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.description}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.responsible}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================================================================
       * SEÇÃO 6: ANATOMIA 4 CAMADAS (§6)
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssBtnGroup" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES (§7)
       * ================================================================ */}

      {/* 7.1 Props API */}
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
            <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--jtech-code-bg)", color: "var(--jtech-text-body)" }}>
              <p className="text-sm">
                O DssBtnGroup <strong>não emite eventos próprios</strong>. É um container estrutural.
                Todos os eventos (<code className="font-mono text-xs">click</code>, <code className="font-mono text-xs">focus</code>, etc.) pertencem aos DssButton filhos.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas (Quasar)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop Quasar</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Motivo do Bloqueio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { prop: "dark", reason: "DSS gerencia dark mode via [data-theme='dark'] global" },
                  { prop: "color", reason: "Pertence ao DssButton filho" },
                  { prop: "text-color", reason: "Pertence ao DssButton filho" },
                  { prop: "size", reason: "Pertence ao DssButton filho" },
                  { prop: "dense", reason: "Pertence ao DssButton filho" },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-negative)" }}>{row.prop}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
                  </TableRow>
                ))}
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Conteúdo Aceito</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo do grupo de botões</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>DssButton (principal). DssBtnDropdown planejado para Fase 2.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens */}
      <CollapsibleSection icon={Code} title="Tokens" titleAccent="CSS">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Token</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Camada</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { token: "--dss-border-width-thin", layer: "L2 + L3", usage: "Colapso outline / separadores flat/push/unelevated" },
                { token: "--dss-border-width-thick", layer: "L4", usage: "Acento de brand (inset box-shadow)" },
                { token: "--dss-border-width-md", layer: "Module", usage: "High contrast outline" },
                { token: "--dss-gray-200", layer: "L3", usage: "Separador push e unelevated" },
                { token: "--dss-gray-300", layer: "L3", usage: "Separador flat" },
                { token: "--dss-radius-full", layer: "L2", usage: "Variante rounded — border-radius pill" },
                { token: "--dss-hub-600", layer: "L4", usage: "Brand Hub (modo claro)" },
                { token: "--dss-hub-400", layer: "L4", usage: "Brand Hub (dark mode)" },
                { token: "--dss-water-500", layer: "L4", usage: "Brand Water (modo claro)" },
                { token: "--dss-water-400", layer: "L4", usage: "Brand Water (dark mode)" },
                { token: "--dss-waste-600", layer: "L4", usage: "Brand Waste (modo claro)" },
                { token: "--dss-waste-500", layer: "L4", usage: "Brand Waste (dark mode)" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.token}</TableCell>
                  <TableCell className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>{row.layer}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.4 Classes CSS */}
      <CollapsibleSection icon={Code} title="Classes" titleAccent="CSS">
        <div className="pt-4 space-y-4">
          {[
            {
              title: "Classes de Variante",
              classes: [
                { cls: "dss-btn-group", condition: "Sempre presente" },
                { cls: "dss-btn-group--flat", condition: "flat === true" },
                { cls: "dss-btn-group--outline", condition: "outline === true" },
                { cls: "dss-btn-group--push", condition: "push === true" },
                { cls: "dss-btn-group--unelevated", condition: "unelevated === true" },
                { cls: "dss-btn-group--glossy", condition: "glossy === true" },
              ],
            },
            {
              title: "Classes de Forma e Layout",
              classes: [
                { cls: "dss-btn-group--rounded", condition: "rounded === true" },
                { cls: "dss-btn-group--square", condition: "square === true" },
                { cls: "dss-btn-group--spread", condition: "spread === true" },
                { cls: "dss-btn-group--stretch", condition: "stretch === true" },
              ],
            },
            {
              title: "Classes de Brand",
              classes: [
                { cls: "dss-btn-group--brand-hub", condition: "brand === 'hub'" },
                { cls: "dss-btn-group--brand-water", condition: "brand === 'water'" },
                { cls: "dss-btn-group--brand-waste", condition: "brand === 'waste'" },
              ],
            },
          ].map((group, gi) => (
            <div key={gi}>
              <h4 className="font-medium mb-2 text-sm" style={{ color: "var(--jtech-heading-tertiary)" }}>{group.title}</h4>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Classe</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Condição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.classes.map((row, i) => (
                    <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                      <TableCell className="font-mono font-medium text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.cls}</TableCell>
                      <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.condition}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 7.5 Acessibilidade WCAG */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                'Container com role="group" (WAI-ARIA 1.1)',
                "aria-label configurável via prop ariaLabel",
                "Touch target delegado aos DssButton filhos (Opção B)",
                "Grupo não captura foco — filhos são navegáveis por Tab",
                "inheritAttrs: false com v-bind=$attrs para forwarding",
                "Suporte a forced-colors: active [EXC-03]",
                "Suporte a prefers-reduced-motion",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Atributos ARIA</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Atributo</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Condição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { attr: "role", value: '"group"', condition: "Sempre presente" },
                  { attr: "aria-label", value: "valor da prop", condition: "Quando ariaLabel fornecida" },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.attr}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.value}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.condition}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.6 Exceções Documentadas */}
      <CollapsibleSection icon={AlertTriangle} title="Exceções" titleAccent="Documentadas">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>ID</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Local</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "EXC-01", value: "border-radius: 0", local: "2-composition/_base.scss", reason: 'Square variant — semanticamente "sem radius", não valor visual arbitrário.' },
                { id: "EXC-02", value: "rgba(255,255,255,0.12)", local: "4-output/_states.scss", reason: "Dark mode divider — sem token DSS equivalente. Padrão Material Design." },
                { id: "EXC-03", value: "1px solid ButtonText", local: "4-output/_states.scss", reason: "Forced-colors mode — valores absolutos obrigatórios, tokens ignorados." },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-warning)" }}>{row.id}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.value}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{row.local}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.7 Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Prop sync ausente nos filhos",
              wrong: `<DssBtnGroup outline>\n  <DssButton label="A" />\n  <DssButton label="B" />\n</DssBtnGroup>`,
              correct: `<DssBtnGroup outline>\n  <DssButton outline label="A" />\n  <DssButton outline label="B" />\n</DssBtnGroup>`,
              reason: "O DssBtnGroup NÃO propaga props de estilo. Cada DssButton filho deve declarar a mesma prop.",
            },
            {
              title: "Usar DssBtnGroup para seleção com v-model",
              wrong: `<DssBtnGroup>\n  <DssButton @click="select('a')" label="A" />\n  <DssButton @click="select('b')" label="B" />\n</DssBtnGroup>`,
              correct: `<DssBtnToggle\n  v-model="selected"\n  :options="[{label:'A',value:'a'},{label:'B',value:'b'}]"\n/>`,
              reason: "DssBtnGroup é para agrupamento visual. Para seleção com v-model, usar DssBtnToggle.",
            },
            {
              title: "Elementos não-DSS dentro do grupo",
              wrong: `<DssBtnGroup>\n  <button>Nativo</button>\n  <DssButton label="DSS" />\n</DssBtnGroup>`,
              correct: `<DssBtnGroup>\n  <DssButton label="Primeiro" />\n  <DssButton label="Segundo" />\n</DssBtnGroup>`,
              reason: "Apenas DssButton é suportado. Elementos nativos não recebem ajustes de border-radius.",
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
                  <pre className="mt-1 p-2 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
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

      {/* 7.8 Vinculantes DSS v2.2 */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.2">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssBtnGroup</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizado — container estrutural sem pseudo-elementos próprios" },
                { rule: "Uso de brightness()", application: "Não utilizado — sem estados de hover/active no container" },
                { rule: "Classificação do componente", application: "Container Component (Fase 2 — composição estrutural)" },
                { rule: "Prop Sync", application: "Props de estilo DEVEM ser replicadas nos filhos DssButton manualmente" },
                { rule: "Entry Point Wrapper", application: "DssBtnGroup.vue → re-export puro de 1-structure/DssBtnGroup.ts.vue" },
                { rule: "Scoped CSS", application: "Sem scoped — seletores globais para estilizar filhos via <slot>" },
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

      {/* 7.9 Referências Normativas */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "DSSBTNGROUP_API.md",
              "components/base/DssBtnGroup/types/btn-group.types.ts",
              "components/base/DssBtnGroup/composables/useBtnGroupClasses.ts",
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
