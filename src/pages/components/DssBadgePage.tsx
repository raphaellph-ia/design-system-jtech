// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  FileText,
  Tag,
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
// DADOS ESPECÍFICOS DO DSSBADGE
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

// Props API do DssBadge
const propsData = [
  { category: "Conteúdo", prop: "label", type: "String | Number", default: "''", description: "Conteúdo do badge (alternativa ao slot default)" },
  { category: "Visual", prop: "color", type: "'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info'", default: "'primary'", description: "Cor semântica do badge" },
  { category: "Visual", prop: "textColor", type: "String", default: "null", description: "Cor customizada do texto (sobrescreve cor padrão)" },
  { category: "Visual", prop: "transparent", type: "Boolean", default: "false", description: "Badge transparente (apenas texto colorido)" },
  { category: "Visual", prop: "outline", type: "Boolean", default: "false", description: "Badge com outline (borda colorida)" },
  { category: "Visual", prop: "rounded", type: "Boolean", default: "false", description: "Badge arredondado (border-radius aumentado)" },
  { category: "Visual", prop: "multiLine", type: "Boolean", default: "false", description: "Permite múltiplas linhas de texto" },
  { category: "Posicionamento", prop: "floating", type: "Boolean", default: "false", description: "Badge flutuante (posicionamento absoluto)" },
  { category: "Posicionamento", prop: "align", type: "'top' | 'middle' | 'bottom'", default: "null", description: "Alinhamento vertical quando não flutuante" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Sansys" },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label de acessibilidade para screen readers" },
];

// Tokens utilizados pelo DssBadge (organizados por categoria)
const tokensUsed = [
  // Action
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Background primary badge" },
  { category: "Action", token: "--dss-action-secondary", value: "#26a69a", usage: "Background secondary" },
  { category: "Action", token: "--dss-action-tertiary", value: "#ff6607", usage: "Background tertiary" },
  { category: "Action", token: "--dss-action-accent", value: "#b454c4", usage: "Background accent" },
  // Feedback
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Positive/Success badge" },
  { category: "Feedback", token: "--dss-feedback-error", value: "#d8182e", usage: "Negative/Error badge" },
  { category: "Feedback", token: "--dss-feedback-warning", value: "#fabd14", usage: "Warning badge" },
  { category: "Feedback", token: "--dss-feedback-info", value: "#0cc4e9", usage: "Info badge" },
  // Brand Hub
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Hub principal (badge bg)" },
  // Brand Water
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Water principal (badge bg)" },
  // Brand Waste
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Waste principal (badge bg)" },
  // Spacing
  { category: "Spacing", token: "--dss-spacing-0_5", value: "2px", usage: "Padding vertical badge" },
  { category: "Spacing", token: "--dss-spacing-1_5", value: "6px", usage: "Padding horizontal badge" },
  // Border Radius
  { category: "Border Radius", token: "--dss-radius-full", value: "9999px", usage: "Border radius pill (padrão)" },
  { category: "Border Radius", token: "--dss-radius-lg", value: "8px", usage: "Border radius rounded variant" },
  // Typography
  { category: "Typography", token: "--dss-font-size-xs", value: "12px", usage: "Texto badge (padrão)" },
  { category: "Typography", token: "--dss-font-weight-bold", value: "700", usage: "Peso do texto" },
  // Text
  { category: "Text", token: "--dss-text-inverse", value: "#ffffff", usage: "Texto sobre bg escuro" },
  // Borders
  { category: "Borders", token: "--dss-border-width-thin", value: "1px", usage: "Borda outline/transparent" },
];

// Anatomia 4 Camadas DSS
const anatomyData = {
  structure: {
    files: ["DssBadge.vue", "DssBadge.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Definição do template HTML semântico (<div> com role='status')",
      "Declaração de props com validação TypeScript",
      "Binding de slots (default)",
      "Atributos de acessibilidade (aria-label, aria-live)",
    ],
    tokens: [],
    codeExample: `<template>
  <div
    :class="badgeClasses"
    :style="badgeStyle"
    role="status"
    :aria-label="ariaLabel"
    aria-live="polite"
  >
    <slot>{{ label }}</slot>
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais que definem o layout, tipografia e estrutura visual base do badge.",
    responsibilities: [
      "Display inline-flex com alinhamento central",
      "Tipografia (font-size, font-weight, letter-spacing)",
      "Padding interno via tokens --dss-spacing-*",
      "Border-radius pill padrão",
    ],
    tokens: ["--dss-font-size-xs", "--dss-font-weight-bold", "--dss-spacing-0_5", "--dss-spacing-1_5"],
    codeExample: `.dss-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--dss-spacing-0_5) var(--dss-spacing-1_5);
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-bold);
  border-radius: var(--dss-radius-full);
  white-space: nowrap;
}`,
  },
  variants: {
    files: ["3-variants/_outline.scss", "_transparent.scss", "_rounded.scss", "_floating.scss", "_multi-line.scss"],
    description: "Define as variações visuais do badge sem incluir cores específicas.",
    responsibilities: [
      "Outline: borda colorida, background transparente",
      "Transparent: apenas texto colorido",
      "Rounded: border-radius menor (não pill)",
      "Floating: posicionamento absoluto",
      "Multi-line: permite quebra de texto",
    ],
    tokens: ["--dss-border-width-thin", "--dss-radius-lg", "--dss-line-height-tight"],
    codeExample: `.dss-badge--outline {
  background-color: transparent !important;
  border: var(--dss-border-width-thin) solid currentColor;
}

.dss-badge--floating {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}`,
  },
  output: {
    files: ["4-output/_brands.scss", "_states.scss"],
    description: "Camada final que aplica cores semânticas, temas de brand e adaptações de contexto.",
    responsibilities: [
      "Aplicação de cores via classes utilitárias (.bg-*, .text-*)",
      "Brandability completa (Hub, Water, Waste)",
      "Adaptação dark mode",
      "Estados de alto contraste",
    ],
    tokens: ["--dss-action-primary", "--dss-hub-600", "--dss-water-500", "--dss-waste-500"],
    codeExample: `/* Cores aplicadas via classes utilitárias */
.bg-primary { background: var(--dss-action-primary); }
.text-primary { color: var(--dss-action-primary); }

/* Brand override */
[data-brand="hub"] .dss-badge {
  --badge-bg: var(--dss-hub-600);
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO BADGE
// ============================================================================

interface DssBadgePreviewProps {
  label?: string;
  colorKey?: string;
  transparent?: boolean;
  outline?: boolean;
  rounded?: boolean;
  floating?: boolean;
  multiLine?: boolean;
  brand?: string | null;
}

function DssBadgePreview({
  label = "Badge",
  colorKey = "primary",
  transparent = false,
  outline = false,
  rounded = false,
  floating = false,
  multiLine = false,
  brand = null,
}: DssBadgePreviewProps) {
  // Obter cores do DSS
  const getColors = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      const b = DSS_BRAND_COLORS[brand];
      return {
        bg: b.principal,
        textColor: "#ffffff",
      };
    }

    if (feedbackColors[colorKey]) {
      const f = feedbackColors[colorKey];
      const textColor = colorKey === "warning" ? "#1a1a1a" : "#ffffff";
      return {
        bg: f.bg,
        textColor,
      };
    }

    if (DSS_SEMANTIC_COLORS[colorKey]) {
      const s = DSS_SEMANTIC_COLORS[colorKey];
      return {
        bg: s.bg,
        textColor: "#ffffff",
      };
    }

    return {
      bg: "#1f86de",
      textColor: "#ffffff",
    };
  };

  const colors = getColors();

  // Estilos baseados nas variantes
  const getBadgeStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: multiLine ? "4px 8px" : "2px 8px",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.02em",
      fontFamily: "system-ui, -apple-system, sans-serif",
      lineHeight: multiLine ? 1.4 : 1,
      whiteSpace: multiLine ? "normal" : "nowrap",
      wordBreak: multiLine ? "break-word" : undefined,
      borderRadius: rounded ? "8px" : "9999px",
      minHeight: multiLine ? "24px" : "20px",
      transition: "all 0.2s ease",
    };

    if (floating) {
      base.position = "absolute";
      base.top = "0";
      base.right = "0";
      base.transform = "translate(50%, -50%)";
    }

    if (transparent) {
      return {
        ...base,
        backgroundColor: "transparent",
        color: colors.bg,
        border: `1px solid ${colors.bg}`,
      };
    }

    if (outline) {
      return {
        ...base,
        backgroundColor: "transparent",
        color: colors.bg,
        border: `1px solid ${colors.bg}`,
      };
    }

    return {
      ...base,
      backgroundColor: colors.bg,
      color: colors.textColor,
      border: "none",
    };
  };

  // Para floating, precisamos de um container relativo
  if (floating) {
    return (
      <div className="relative inline-flex items-center justify-center" style={{ width: "80px", height: "80px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "8px",
            backgroundColor: "rgba(128, 128, 128, 0.2)",
            border: "1px dashed rgba(128, 128, 128, 0.4)",
          }}
        />
        <span style={getBadgeStyles()}>{label}</span>
      </div>
    );
  }

  return <span style={getBadgeStyles()}>{label}</span>;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssBadgePage() {
  // Estados do Playground (padrão unificado)
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    transparent: false,
    outline: false,
    rounded: false,
    floating: false,
    multiLine: false,
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
    props.push('label="New"');
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor && selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    if (booleanStates.transparent) props.push("transparent");
    if (booleanStates.outline) props.push("outline");
    if (booleanStates.rounded) props.push("rounded");
    if (booleanStates.floating) props.push("floating");
    if (booleanStates.multiLine) props.push("multi-line");

    return `<DssBadge\n  ${props.join("\n  ")}\n/>`;
  };

  // Token ativo baseado na seleção
  const getActiveToken = () => {
    if (selectedBrand) {
      return DSS_BRAND_COLORS[selectedBrand]?.tokens.principal;
    }
    if (selectedColor) {
      const allColors = { ...DSS_SEMANTIC_COLORS, ...feedbackColors };
      const color = allColors[selectedColor];
      return color?.tokens?.base;
    }
    return undefined;
  };

  // Opções de toggle para variantes
  const toggleOptions = [
    { name: "transparent", label: "Transparent" },
    { name: "outline", label: "Outline" },
    { name: "rounded", label: "Rounded" },
    { name: "floating", label: "Floating" },
    { name: "multiLine", label: "Multi-line" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* SEÇÃO 1: BADGES + TÍTULO */}
      <PageHeader
        icon={Tag}
        badge="Componente"
        badgeVariant="default"
        title="Componente"
        titleAccent="DssBadge"
        subtitle="DssBadge é utilizado para exibir informações de status, contadores, notificações ou rótulos de destaque. Suporta variações de cor, posicionamento flutuante e compatibilidade total com a API do Quasar q-badge."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* SEÇÃO 2: PLAYGROUND INTERATIVO (COMPONENTE UNIFICADO) */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Badge"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewContent={
          <DssBadgePreview
            label="New"
            colorKey={effectiveColor}
            transparent={booleanStates.transparent}
            outline={booleanStates.outline}
            rounded={booleanStates.rounded}
            floating={booleanStates.floating}
            multiLine={booleanStates.multiLine}
            brand={selectedBrand}
          />
        }
        controls={
          <ControlGrid columns={3}>
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
            <ToggleGroup
              label="Variantes Visuais"
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
      <AnatomySection componentName="DssBadge" layers={anatomyData} />

      {/* Documentação Técnica - Seção Colapsável */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Slots">
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
                "role='status' para indicar informação dinâmica",
                "aria-live='polite' para atualizações de screen reader",
                "aria-label customizável para contexto adicional",
                "Contraste mínimo 4.5:1 em todas as cores",
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
              📋 Exemplo de Uso Acessível
            </h4>
            <pre
              className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "var(--jtech-text-body)",
                border: "1px solid var(--jtech-card-border)",
              }}
            >
              {`<!-- Badge com contexto para screen readers -->
<DssBadge
  label="5"
  aria-label="5 notificações não lidas"
  color="negative"
/>

<!-- Badge flutuante em ícone -->
<div class="relative">
  <icon name="mail" />
  <DssBadge
    :label="unreadCount"
    floating
    color="negative"
  />
</div>`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
