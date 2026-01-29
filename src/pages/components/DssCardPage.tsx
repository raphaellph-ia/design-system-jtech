import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DssTabs, DssTabsList, DssTabsTrigger, DssTabsContent } from "@/components/ui/dss-tabs";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Code,
  FileText,
  LayoutDashboard,
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

// Importar sistema de Playground unificado
import {
  DssPlayground,
  VariantSelector,
  ColorPicker,
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
  type SemanticColor,
  type FeedbackColor,
} from "@/components/ui/playground";

// ============================================================================
// DADOS OBRIGATÓRIOS - CORES DE FEEDBACK DSS
// ============================================================================
const feedbackColors: Record<string, FeedbackColor> = {
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
// VARIANTES DO DSSCARD
// ============================================================================
const variants = [
  { name: "elevated", label: "Elevated", desc: "Card com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Sem elevação, apenas background", hasElevation: false },
  { name: "bordered", label: "Bordered", desc: "Com borda + elevação", hasElevation: true },
  { name: "outlined", label: "Outlined", desc: "Com borda, sem elevação", hasElevation: false },
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
// TOKENS UTILIZADOS - ORGANIZADOS POR CATEGORIA
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

  // Estilos baseados na variante
  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      backgroundColor: dark ? "#2a2a2a" : "#ffffff",
      color: dark ? "#ffffff" : "#454545",
      borderRadius: square ? "0" : "12px",
      transition: "all 250ms cubic-bezier(0.4,0,0.2,1)",
      cursor: clickable ? "pointer" : "default",
      transform: clickable && isHovered ? "translateY(-2px)" : "translateY(0)",
      minWidth: "280px",
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
// SUBCOMPONENTES INTERNOS
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
  // Estados do Playground (padrão unificado)
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    clickable: false,
    square: false,
  });

  // Exclusividade Brand vs Cor (padrão obrigatório)
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedColor(null);
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  // Geração de código (padrão unificado)
  const generateCode = () => {
    const props: string[] = [];
    if (selectedVariant !== "elevated") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
      // NÃO inclui color quando brand está selecionado
    }
    if (booleanStates.clickable) props.push("clickable");
    if (booleanStates.square) props.push("square");
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

  // Todas as cores para seleção
  const allColors = [
    ...Object.values(DSS_SEMANTIC_COLORS),
    ...Object.values(feedbackColors),
  ] as Array<SemanticColor | FeedbackColor>;

  // Token ativo baseado na seleção
  const getActiveToken = () => {
    if (selectedBrand) {
      return DSS_BRAND_COLORS[selectedBrand]?.tokens.principal;
    }
    if (selectedColor) {
      const color = { ...DSS_SEMANTIC_COLORS, ...feedbackColors }[selectedColor];
      return color?.tokens.base;
    }
    return undefined;
  };

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

      {/* SEÇÃO 2: PLAYGROUND INTERATIVO (COMPONENTE UNIFICADO) */}
      <SectionHeader
        title="Playground"
        titleAccent="Interativo"
        badge="Configurador"
        icon={Zap}
      />

      <DssPlayground
        title="Configure o Card"
        description="Selecione as props e veja o resultado em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
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
          <>
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />

            <ColorPicker
              label="Cor Semântica"
              colors={allColors}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <ToggleGroup
              label="Estados"
              options={[
                { name: "clickable", label: "Clickable" },
                { name: "square", label: "Square" },
              ]}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </>
        }
        codePreview={generateCode()}
        activeToken={getActiveToken()}
      />

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
