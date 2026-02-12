import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  LayoutDashboard,
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

import {
  DssPlayground,
  ControlGrid,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
  DSS_FEEDBACK_COLORS,
  type FeedbackColor,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE — Derivados dos arquivos fonte DSS
// ============================================================================

const feedbackColors: Record<string, FeedbackColor> = {
  positive: { ...DSS_FEEDBACK_COLORS.positive, icon: CheckCircle },
  negative: { ...DSS_FEEDBACK_COLORS.negative, icon: XCircle },
  warning: { ...DSS_FEEDBACK_COLORS.warning, icon: AlertTriangle },
  info: { ...DSS_FEEDBACK_COLORS.info, icon: Info },
};

const variants = [
  { name: "elevated", label: "Elevated", desc: "Card com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Sem elevação, apenas background", hasElevation: false },
  { name: "bordered", label: "Bordered", desc: "Com borda + elevação", hasElevation: true },
  { name: "outlined", label: "Outlined", desc: "Com borda, sem elevação", hasElevation: false },
];

// Props API — DssCard (fonte: DSSCARD_API.md + card.types.ts)
const propsData = [
  { category: "Visual", prop: "variant", type: "'elevated' | 'flat' | 'bordered' | 'outlined'", default: "'elevated'", description: "Estilo visual do card" },
  { category: "Visual", prop: "square", type: "Boolean", default: "false", description: "Remove border-radius (cantos quadrados)" },
  { category: "Interação", prop: "clickable", type: "Boolean", default: "false", description: "Torna o card interativo (hover/focus/active)" },
  { category: "Tema", prop: "dark", type: "Boolean", default: "false", description: "Aplica modo escuro ao card" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste' | null", default: "null", description: "Tema de marca Sansys (accent border-left)" },
];

// Props API — DssCardSection
const sectionPropsData = [
  { prop: "horizontal", type: "Boolean", default: "false", description: "Layout horizontal (flex-row com align-items: center)" },
];

// Props API — DssCardActions
const actionsPropsData = [
  { prop: "align", type: "'left' | 'center' | 'right' | 'between' | 'around'", default: "'right'", description: "Alinhamento dos botões de ação" },
  { prop: "vertical", type: "Boolean", default: "false", description: "Layout vertical para ações (botões empilhados)" },
];

// Anatomia 4 Camadas
const anatomyData = {
  structure: {
    files: ["DssCard.ts.vue", "DssCardSection.ts.vue", "DssCardActions.ts.vue"],
    description: "Estrutura base em Vue 3 + Composition API com TypeScript. Define template, props e lógica de composição usando composables dedicados.",
    responsibilities: [
      "Template HTML semântico (<div> com role contextual)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (@click, @keydown)",
      "Binding de slots (default)",
      "Composables useCardClasses, useCardAttrs, useCardActions",
    ],
    tokens: [],
    codeExample: `<template>
  <div
    :class="cardClasses"
    :style="cardStyles"
    v-bind="cardAttrs"
    @click="handleClick"
    @keydown.enter="handleKeydown"
    @keydown.space.prevent="handleKeydown"
  >
    <slot />
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Layout base, tipografia e reset CSS. Define a estrutura visual fundamental do card antes de qualquer variante.",
    responsibilities: [
      "Flex layout e overflow hidden",
      "Reset de estilos nativos",
      "Border-radius via token --dss-radius-lg",
      "Tipografia base",
    ],
    tokens: ["--dss-radius-lg", "--dss-spacing-6", "--dss-font-size-base"],
    codeExample: `.dss-card {
  border-radius: var(--dss-radius-lg);
  overflow: hidden;
  font-size: var(--dss-font-size-base);
  line-height: var(--dss-line-height-relaxed);
}`,
  },
  variants: {
    files: ["3-variants/_elevated.scss", "_flat.scss", "_bordered.scss", "_outlined.scss"],
    description: "Variações visuais agnósticas de cor: apenas estrutura de shadow, border e background.",
    responsibilities: [
      "Elevated: box-shadow via --dss-elevation-1",
      "Flat: sem shadow, sem borda",
      "Bordered: borda + elevação",
      "Outlined: borda sem elevação",
    ],
    tokens: ["--dss-elevation-1", "--dss-elevation-2", "--dss-gray-300", "--dss-border-width-thin"],
    codeExample: `.dss-card--elevated {
  background: var(--dss-surface-default);
  box-shadow: var(--dss-elevation-1);
}

.dss-card--outlined {
  border: var(--dss-border-width-thin) solid var(--dss-gray-300);
}`,
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss", "index.scss"],
    description: "Camada final que aplica estados interativos, dark mode e brandability.",
    responsibilities: [
      "Estados hover, focus, active para cards clicáveis",
      "Dark mode com --dss-surface-dark",
      "Brand theming (Hub, Water, Waste) com accent border-left",
      "Forced-colors e prefers-contrast",
    ],
    tokens: ["--dss-surface-dark", "--dss-hub-600", "--dss-water-500", "--dss-waste-600", "--dss-focus-shadow-primary"],
    codeExample: `.dss-card--dark {
  background-color: var(--dss-surface-dark);
  color: var(--dss-text-inverse);
}

.dss-card--brand-hub {
  border-left: var(--dss-border-width-thick) solid var(--dss-hub-600);
}`,
  },
};

// ============================================================================
// PREVIEW DO CARD
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

  const getColors = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      const b = DSS_BRAND_COLORS[brand];
      return { primary: b.principal, hover: b.scale[700], light: b.scale[300] };
    }
    if (semanticColor) {
      const allColors = { ...DSS_SEMANTIC_COLORS, ...feedbackColors };
      const c = allColors[semanticColor as keyof typeof allColors];
      if (c) return { primary: c.bg, hover: c.hover, light: c.light };
    }
    return { primary: "#1f86de", hover: "#0f5295", light: "#86c0f3" };
  };

  const colors = getColors();

  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      backgroundColor: dark ? "#2a2a2a" : "#ffffff",
      color: dark ? "#ffffff" : "#454545",
      borderRadius: square ? "0" : "12px",
      transition: "all 250ms cubic-bezier(0.4,0,0.2,1)",
      cursor: clickable ? "pointer" : "default",
      transform: clickable && isHovered ? "translateY(-2px)" : "translateY(0)",
      minWidth: "280px",
      borderLeft: brand ? `4px solid ${colors.primary}` : undefined,
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
          borderLeft: brand ? `4px solid ${colors.primary}` : undefined,
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.30)"
            : "0 1px 3px rgba(0,0,0,0.25)",
        };
      case "outlined":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? colors.primary : (dark ? "rgba(255,255,255,0.2)" : "#d4d4d4")}`,
          borderLeft: brand ? `4px solid ${colors.primary}` : undefined,
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
// SUBCOMPONENTES DE PREVIEW
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

function CardActions({ children, align = "right" }: { children: React.ReactNode; align?: "left" | "center" | "right" | "between" | "around" }) {
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
// COMPONENTE PRINCIPAL — Reconstruído conforme Addendum v1.0
// Baseline: DssAvatarPage | Guia: COMPONENT_PAGE_STRUCTURE.md v2.3
// ============================================================================

export default function DssCardPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    clickable: false,
    square: false,
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

  // Geração de código (PLAYGROUND_STANDARD v3.1: código de produção)
  const generateCode = () => {
    const props: string[] = [];
    if (selectedVariant !== "elevated") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    }
    if (booleanStates.clickable) props.push("clickable");
    if (booleanStates.square) props.push("square");
    if (isDarkMode) props.push("dark");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";
    return `<DssCard${propsStr}>
  <DssCardSection>
    Card content here
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton label="Action" />
  </DssCardActions>
</DssCard>`;
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (COMPONENT_PAGE_STRUCTURE §1, §2)
       * ================================================================ */}
      <PageHeader
        icon={LayoutDashboard}
        badge="v2.2.0"
        badgeVariant="info"
        title="Componente"
        titleAccent="DssCard"
        subtitle="DssCard é o container visual para agrupar conteúdo relacionado em uma unidade lógica, como perfis, resumos ou formulários. Ele oferece variantes de elevação e borda para hierarquizar informação, suporta seções internas e ações contextuais, e integra-se ao sistema de brandabilidade multi-marca Sansys."
        subtitleHighlights={["brandabilidade multi-marca", "variantes de elevação", "seções e ações"]}
        extraBadges={[
          { label: "Quasar Compatible", variant: "success" },
          { label: "TypeScript", variant: "info" },
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
              "Agrupar conteúdo relacionado como perfis, resumos ou estatísticas",
              "Apresentar itens em listas ou grids com identidade visual distinta",
              "Cards clicáveis para navegação ou seleção de itens",
              "Dashboards com cards de métricas e KPIs",
              "Formulários ou wizards encapsulados em container visual",
              "Contextos que exigem identificação de marca (Hub, Water, Waste)",
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
                { scenario: "Modais ou dialogs sobrepostos", alt: "DssDialog" },
                { scenario: "Menus dropdown ou contextuais", alt: "DssMenu" },
                { scenario: "Tabelas de dados extensas", alt: "DssTable" },
                { scenario: "Notificações ou toasts", alt: "DssNotification" },
                { scenario: "Seções de layout sem borda visual", alt: "DssSection ou <div>" },
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
        title="Configure o Card"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssCardPreview
            variant={selectedVariant}
            clickable={booleanStates.clickable}
            square={booleanStates.square}
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
                    ? DSS_BRAND_COLORS[selectedBrand]?.principal
                    : selectedColor
                    ? { ...DSS_SEMANTIC_COLORS, ...feedbackColors }[selectedColor]?.bg
                    : "#1f86de",
                  color: "#ffffff",
                }}
              >
                Confirm
              </button>
            </CardActions>
          </DssCardPreview>
        }
        controls={
          <ControlGrid columns={4}>
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
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <ToggleGroup
              label="Estados & Opções"
              options={[
                { name: "clickable", label: "Clickable" },
                { name: "square", label: "Square" },
              ]}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
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
              { state: "Default", visual: "Aparência padrão com variant aplicada", interaction: "Pronto para interação", tokens: "--dss-surface-default, --dss-elevation-1", a11y: "—" },
              { state: "Hover", visual: "Elevação aumentada, translateY(-2px)", interaction: "Pointer over (quando clickable)", tokens: "--dss-elevation-2, --dss-surface-hover", a11y: "—" },
              { state: "Focus", visual: "Focus ring 3px visível", interaction: "Navegação por teclado", tokens: "--dss-focus-shadow-primary", a11y: "WCAG 2.4.7" },
              { state: "Active", visual: "Shadow reduzido, sem translate", interaction: "Clique / toque", tokens: "--dss-shadow-active", a11y: "—" },
              { state: "Disabled", visual: "Opacidade reduzida (0.4)", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Loading", visual: "N/A — Card não possui estado loading nativo", interaction: "—", tokens: "—", a11y: "—" },
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
      <AnatomySection componentName="DssCard" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES (§7)
       * Cada seção é um bloco colapsável independente.
       * ❌ PROIBIDO agrupar dentro de container genérico.
       * ================================================================ */}

      {/* 7.1 Props API & Eventos */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          {/* DssCard Props */}
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssCard</h4>
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
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* DssCardSection Props */}
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssCardSection</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Type</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionPropsData.map((p, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* DssCardActions Props */}
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssCardActions</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Type</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actionsPropsData.map((p, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Eventos */}
          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Evento</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Payload</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Condição</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>click</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>MouseEvent | KeyboardEvent</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>clickable === true</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido ao clicar ou pressionar Enter/Space</TableCell>
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Componente</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso Recomendado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { slot: "default", comp: "DssCard", desc: "Conteúdo principal do card", usage: "DssCardSection e DssCardActions" },
                { slot: "default", comp: "DssCardSection", desc: "Conteúdo da seção", usage: "Texto, imagens, formulários" },
                { slot: "default", comp: "DssCardActions", desc: "Ações do card", usage: "Botões DssButton" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.slot}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.comp}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.desc}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.usage}</TableCell>
                </TableRow>
              ))}
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
                { type: "Cores Semânticas", role: "Background e estados visuais (hover, active)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Accent border-left para identidade visual (Hub, Water, Waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevação", role: "Box-shadow para variantes elevated e bordered", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius, border-width e cores de borda", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Padding de sections e actions, gap entre botões", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Font-size e line-height do conteúdo de sections", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Surface", role: "Background do card em light/dark mode", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de hover, focus e active", ref: "DSS_TOKEN_REFERENCE.md" },
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
                'role="article" automático quando clickable',
                "tabindex='0' automático quando clickable",
                "Navegação por Enter e Space (WCAG 2.1.1)",
                "Focus ring visível com :focus-visible (WCAG 2.4.7)",
                "Contraste mínimo 4.5:1 em ambos os modos",
                "Suporte a prefers-reduced-motion",
                "Suporte a prefers-contrast: high",
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
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AA" ? "var(--dss-positive)" : "var(--dss-action-primary)",
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
  .dss-card {
    border: var(--dss-border-width-md) solid currentColor;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dss-card {
    transition: none;
  }
}

/* Forced colors (Windows High Contrast) */
@media (forced-colors: active) {
  .dss-card {
    border: 2px solid ButtonText;
  }
  .dss-card:focus-visible {
    outline: 3px solid Highlight;
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
              title: "Card clickable sem role acessível",
              wrong: '<DssCard clickable>\n  <div @click="navigate">Content</div>\n</DssCard>',
              correct: '<DssCard clickable @click="navigate">\n  <DssCardSection>Content</DssCardSection>\n</DssCard>',
              reason: "O DssCard já adiciona role='article' e tabindex='0' automaticamente quando clickable. Não duplique handlers.",
            },
            {
              title: "Cores hardcoded em vez de tokens",
              wrong: '<DssCard style="background-color: #f0f0f0; border: 1px solid #ccc" />',
              correct: '<DssCard variant="bordered" />',
              reason: "Bypassa o sistema de tokens e quebra dark mode, brandabilidade e contraste WCAG.",
            },
            {
              title: "Card como container de layout genérico",
              wrong: '<DssCard variant="flat">\n  <nav>Menu items</nav>\n</DssCard>',
              correct: '<nav class="app-sidebar">\n  Menu items\n</nav>',
              reason: "Cards são para conteúdo agrupado, não para estrutura de layout. Use elementos semânticos HTML.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssCard</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizado — card não possui pseudo-elementos decorativos" },
                { rule: "Uso de brightness()", application: "Não utilizado — estados são controlados via tokens de shadow e background" },
                { rule: "Classificação do componente", application: "Visual Container (agrupamento de conteúdo, não ação)" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.rule}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.application}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-2">
            <h4 className="font-medium mb-2" style={{ color: "var(--jtech-heading-tertiary)" }}>Exceções Documentadas</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>ID</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "EXC-01", value: "rgba(255,255,255,0.12)", reason: "Divider em dark mode. Nenhum token DSS fornece white com alpha parcial." },
                  { id: "EXC-02", value: "rgba(255,255,255,0.2)", reason: "Border em dark mode. Bordas requerem white com alpha." },
                  { id: "EXC-04", value: "2px solid ButtonText", reason: "Forced-colors mode. System keywords obrigatórios." },
                ].map((exc, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{exc.id}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{exc.value}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{exc.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
              "DSSCARD_API.md",
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
