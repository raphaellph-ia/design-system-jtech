import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  Navigation,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
  Home,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  VariantSelector,
  ControlSection,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE
// ============================================================================

const feedbackColors = [
  { name: "positive", label: "Positive", icon: CheckCircle, bg: "#4dd228", hover: "#27910D", light: "#b9f2a4", tokens: { base: "--dss-feedback-success" } },
  { name: "negative", label: "Negative", icon: XCircle, bg: "#d8182e", hover: "#a01424", light: "#ffa0ab", tokens: { base: "--dss-feedback-error" } },
  { name: "warning", label: "Warning", icon: AlertTriangle, bg: "#fabd14", hover: "#dd8e02", light: "#fff488", tokens: { base: "--dss-feedback-warning" } },
  { name: "info", label: "Info", icon: Info, bg: "#0cc4e9", hover: "#0c8bae", light: "#a7effa", tokens: { base: "--dss-feedback-info" } },
];

const sizes = [
  { name: "sm", label: "SM", fontSize: "12px" },
  { name: "md", label: "MD", fontSize: "14px", isDefault: true },
  { name: "lg", label: "LG", fontSize: "16px" },
];

const itemCountOptions = [
  { name: "2", label: "2", desc: "2 itens" },
  { name: "3", label: "3", desc: "3 itens" },
  { name: "4", label: "4", desc: "4 itens" },
  { name: "5", label: "5", desc: "5 itens" },
];

const propsData = [
  { category: "Conteúdo", prop: "label", type: "string", default: "undefined", description: "Texto do item. Alternativa ao slot default." },
  { category: "Conteúdo", prop: "icon", type: "string", default: "undefined", description: "Nome do ícone Material Icons. Renderizado antes do label/slot via DssIcon." },
  { category: "Navegação", prop: "to", type: "string | Record<string, unknown>", default: "undefined", description: "Destino Vue Router. Torna o item clicável (--clickable)." },
  { category: "Navegação", prop: "href", type: "string", default: "undefined", description: "URL externa. Alternativa ao to para links externos." },
  { category: "Estado", prop: "disable", type: "boolean", default: "false", description: "Desabilita interação: opacity 0.4, pointer-events: none." },
  { category: "Estrutura", prop: "tag", type: "string", default: "QBreadcrumbsEl default", description: "Sobrescreve a tag HTML renderizada pelo QBreadcrumbsEl." },
];

const propsBlockedData = [
  { prop: "ripple", reason: "DSS não usa ripple em navegação estrutural. Reservado para controles de ação." },
  { prop: "exact", reason: "Gerenciado pelo DssBreadcrumbs pai." },
  { prop: "active-class", reason: "DSS governa classes de estado via BEM + tokens." },
  { prop: "exact-active-class", reason: "Mesmo motivo de active-class." },
];

const anatomyData = {
  structure: {
    files: ["DssBreadcrumbsEl.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e composables de classes BEM.",
    responsibilities: [
      "Template Vue com <q-breadcrumbs-el> como raiz (GATE-EXC-01)",
      "Declaração de props com TypeScript (BreadcrumbsElProps)",
      "Composable useBreadcrumbsElClasses para modifier classes BEM",
      "Composição interna de DssIcon (aria-hidden='true')",
      "Forwarding de $attrs via inheritAttrs: false + v-bind",
    ],
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais: layout, tipografia, transições e estados base do componente.",
    responsibilities: [
      "Display inline-flex com gap via --dss-spacing-1",
      "Dualidade clicável (--clickable) vs estático (--current)",
      "Transição de cor via --dss-duration-150 + --dss-easing-standard",
      "Focus ring via mixin dss-focus-ring + --dss-radius-sm",
      "EXC-01: Seletor composto .dss-breadcrumbs-el.q-breadcrumbs__el",
      "EXC-02: text-decoration: underline em hover/active (WCAG 1.4.1)",
    ],
  },
  variants: {
    files: ["3-variants/index.scss"],
    description: "Camada reservada — DssBreadcrumbsEl v1.0.0 não possui variantes visuais próprias.",
    responsibilities: [
      "Camada reservada — DssBreadcrumbsEl v1.0.0 não possui variantes visuais",
      "Tamanho e densidade não são governados pelo item individual",
    ],
  },
  output: {
    files: ["4-output/_states.scss", "4-output/_brands.scss", "4-output/index.scss"],
    description: "Camada final: dark mode, media queries de acessibilidade, brands e print.",
    responsibilities: [
      "Dark mode: tokens semânticos já incluem valores dark",
      "prefers-reduced-motion: remove transições",
      "prefers-contrast: high — outline permanente em itens clicáveis",
      "forced-colors: active — system color keywords (LinkText, GrayText)",
      "Brands: Hub (laranja), Water (azul), Waste (verde)",
      "@media print: remove text-decoration e herda cor",
    ],
  },
};

// ============================================================================
// PREVIEW DO BREADCRUMBS
// ============================================================================

const breadcrumbItems = [
  { label: "Início", icon: "home", to: "/home" },
  { label: "Produtos", to: "/produtos" },
  { label: "Eletrônicos", to: "/eletronicos" },
  { label: "Smartphones", to: "/smartphones" },
  { label: "Detalhes do Produto" }, // current - no `to`
];

interface DssBreadcrumbsElPreviewProps {
  colorKey?: string | null;
  feedbackKey?: string | null;
  brand?: string | null;
  size?: string;
  disabled?: boolean;
  showIcon?: boolean;
  itemCount?: number;
  isDarkMode?: boolean;
}

function DssBreadcrumbsElPreview({
  colorKey = null,
  feedbackKey = null,
  brand = null,
  size = "md",
  disabled = false,
  showIcon = false,
  itemCount = 4,
}: DssBreadcrumbsElPreviewProps) {
  const items = breadcrumbItems.slice(0, itemCount);
  const lastIndex = items.length - 1;

  const sizeData = sizes.find((s) => s.name === size) || sizes[1];

  const getClickableColor = () => {
    if (brand && DSS_BRAND_COLORS[brand]) return DSS_BRAND_COLORS[brand].principal;
    if (feedbackKey) {
      const fb = feedbackColors.find((f) => f.name === feedbackKey);
      if (fb) return fb.bg;
    }
    if (colorKey && DSS_SEMANTIC_COLORS[colorKey]) return DSS_SEMANTIC_COLORS[colorKey].bg;
    return "var(--jtech-text-muted)";
  };

  const clickableColor = getClickableColor();

  return (
    <nav
      aria-label="Trilha de navegação"
      style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
    >
      {items.map((item, idx) => {
        const isCurrent = idx === lastIndex;
        const isClickable = !isCurrent && !!item.to;

        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <ChevronRight
                className="flex-shrink-0"
                style={{
                  width: "14px",
                  height: "14px",
                  color: "var(--jtech-text-muted)",
                  opacity: 0.5,
                }}
                aria-hidden="true"
              />
            )}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: sizeData.fontSize,
                fontWeight: isCurrent ? 600 : 400,
                color: isCurrent ? "var(--jtech-heading-tertiary)" : clickableColor,
                textDecoration: "none",
                opacity: disabled && isClickable ? 0.4 : 1,
                pointerEvents: disabled && isClickable ? "none" : "auto",
                cursor: isClickable && !disabled ? "pointer" : "default",
                transition: "color 150ms ease",
                borderRadius: "4px",
                padding: "2px 4px",
              }}
              aria-current={isCurrent ? "page" : undefined}
              onMouseEnter={(e) => {
                if (isClickable && !disabled) {
                  (e.currentTarget as HTMLSpanElement).style.textDecoration = "underline";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLSpanElement).style.textDecoration = "none";
              }}
            >
              {showIcon && idx === 0 && (
                <Home style={{ width: "14px", height: "14px" }} aria-hidden="true" />
              )}
              {item.label}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssBreadcrumbsElPage() {
  // Color Application Domain v3.2
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Controles básicos
  const [selectedSize, setSelectedSize] = useState("md");
  const [itemCount, setItemCount] = useState("4");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    disabled: false,
    showIcon: false,
  });

  // Color Application Domain — exclusividade implícita (v3.2)
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedFeedback(null);
    setSelectedBrand(null);
  };

  const handleFeedbackChange = (color: string) => {
    setSelectedFeedback(color);
    setSelectedColor(null);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    if (brand) {
      setSelectedBrand(brand);
      setSelectedColor(null);
      setSelectedFeedback(null);
    }
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  // ─── Geração de Código ──────────────────────────────────────────────────
  const generateCode = () => {
    const items = breadcrumbItems.slice(0, parseInt(itemCount));
    const lastIdx = items.length - 1;

    let brandAttr = "";
    if (selectedBrand) brandAttr = `\n  data-brand="${selectedBrand}"`;

    const lines = [`<nav aria-label="Trilha de navegação"${brandAttr}>`];

    items.forEach((item, idx) => {
      const isCurrent = idx === lastIdx;
      const props: string[] = [];

      if (item.to && !isCurrent) props.push(`to="${item.to}"`);
      if (booleanStates.showIcon && idx === 0) props.push('icon="home"');
      props.push(`label="${item.label}"`);
      if (booleanStates.disabled && !isCurrent) props.push("disable");
      if (isCurrent) props.push('aria-current="page"');

      // Color/feedback only if not brand (brand is via data-brand on container)
      if (!selectedBrand && !isCurrent) {
        if (selectedColor && selectedColor !== "primary") {
          props.push(`color="${selectedColor}"`);
        }
        if (selectedFeedback) {
          props.push(`color="${selectedFeedback}"`);
        }
      }

      if (selectedSize !== "md") {
        props.push(`size="${selectedSize}"`);
      }

      lines.push(`  <DssBreadcrumbsEl\n    ${props.join("\n    ")}\n  />`);
    });

    lines.push("</nav>");
    return lines.join("\n");
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (§1, §2)
       * ================================================================ */}
      <PageHeader
        icon={Navigation}
        badge="Golden Reference: DssButton"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssBreadcrumbsEl"
        subtitle="DssBreadcrumbsEl é o elemento individual de uma trilha de navegação (breadcrumb), utilizado para representar cada nível hierárquico de localização dentro do produto. Ele gerencia a dualidade clicável/estático — renderizando como link interativo quando possui destino de roteamento, ou como item atual não-interativo quando representa a página corrente. Compõe DssIcon internamente e integra-se ao sistema de brandabilidade multi-marca."
        subtitleHighlights={["dualidade clicável/estático", "brandabilidade multi-marca", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "DSS Selo v2.2", variant: "success" },
          { label: "Fase 2", variant: "info" },
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
              "Trilhas de navegação hierárquica em páginas internas",
              "Indicação visual do nível atual na arquitetura de informação",
              "Navegação rápida para níveis superiores do produto",
              "Contexto de localização em formulários multi-etapa",
              "Headers de páginas de detalhe (produto, pedido, usuário)",
              "Estruturas com 2+ níveis de profundidade",
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
                { scenario: "Navegação principal do app", alt: "DssTabs, DssNavbar" },
                { scenario: "Links isolados sem contexto hierárquico", alt: "DssButton link, <a>" },
                { scenario: "Paginação sequencial", alt: "DssPagination" },
                { scenario: "Menu de navegação lateral", alt: "DssSidebar, DssMenu" },
                { scenario: "Steps de wizard/formulário", alt: "DssStepper" },
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
       * SEÇÃO 3: PLAYGROUND INTERATIVO (§4, PLAYGROUND_STANDARD v3.2)
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o BreadcrumbsEl"
        description="Selecione as props e veja o resultado em tempo real. Color, Feedback e Brand são mutuamente exclusivos (Color Application Domain v3.2)."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="200px"
        previewContent={
          <DssBreadcrumbsElPreview
            colorKey={selectedColor}
            feedbackKey={selectedFeedback}
            brand={selectedBrand}
            size={selectedSize}
            disabled={booleanStates.disabled}
            showIcon={booleanStates.showIcon}
            itemCount={parseInt(itemCount)}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={5}>
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

            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            <ToggleGroup
              label="Estados"
              options={[
                { name: "disabled", label: "Disabled" },
                { name: "showIcon", label: "Ícone Home" },
              ]}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            <VariantSelector
              label="Qtd. de Itens"
              variants={itemCountOptions}
              selectedVariant={itemCount}
              onSelect={setItemCount}
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
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Contexto</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Visual</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens Aplicados</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", ctx: "--clickable", visual: "Cor muted, sem underline", tokens: "--dss-text-subtle", a11y: "—" },
              { state: "Hover", ctx: "--clickable", visual: "Cor principal + text-decoration: underline", tokens: "--dss-text-body", a11y: "WCAG 1.4.1" },
              { state: "Focus-visible", ctx: "--clickable", visual: "Focus ring DSS + border-radius sm", tokens: "dss-focus-ring mixin", a11y: "WCAG 2.4.7" },
              { state: "Active", ctx: "--clickable", visual: "Cor principal + underline", tokens: "--dss-text-body", a11y: "—" },
              { state: "Disabled", ctx: "--clickable", visual: "Opacidade 0.4, pointer-events: none", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Default", ctx: "--current", visual: "Cor principal, peso semibold, não-interativo", tokens: "--dss-text-body, --dss-font-weight-semibold", a11y: "aria-current='page'" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.ctx}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.visual}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.tokens}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.a11y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t" style={{ borderColor: "var(--jtech-card-border)" }}>
          <h4 className="text-sm font-medium mb-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
            Estados Não Aplicáveis
          </h4>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { state: "Loading", reason: "Pertence à página de destino, não ao elemento de breadcrumb" },
                { state: "Error", reason: "Pertence ao roteamento/network, não ao elemento de breadcrumb" },
                { state: "Indeterminate", reason: "Não aplicável a trilhas de navegação" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS (§6)
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssBreadcrumbsEl" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES (§7)
       * ================================================================ */}

      {/* 7.1 Props API & Eventos */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Expostas</h4>
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

          <h4 className="font-medium pt-4" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas</h4>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop Quasar</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Motivo do Bloqueio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propsBlockedData.map((p, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
              Sem eventos próprios. Navegação gerenciada via <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>to</code> / <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>href</code>. Eventos DOM nativos (<code className="font-mono text-xs">click</code>, <code className="font-mono text-xs">keydown</code>) propagados via <code className="font-mono text-xs">$attrs</code>.
            </p>
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Modifier Classes (BEM)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Classe</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Quando Aplicada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { cls: "dss-breadcrumbs-el--clickable", when: "to ou href definido" },
                  { cls: "dss-breadcrumbs-el--current", when: "Sem to e sem href (item estático)" },
                  { cls: "dss-breadcrumbs-el--disabled", when: "disable: true" },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.cls}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.when}</TableCell>
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso Recomendado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo personalizado. Sobrepõe a prop label.</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Texto formatado, badges, conteúdo rich text</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-sm mt-3" style={{ color: "var(--jtech-text-muted)" }}>
            O ícone (<code className="font-mono text-xs">icon</code>) é sempre renderizado <strong>antes</strong> do slot/label, independentemente do conteúdo.
          </p>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens */}
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
                { type: "Cores Semânticas", role: "Cor do texto em estados default, hover e active", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Cor dos itens clicáveis por marca (Hub, Water, Waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Peso do texto: semibold (atual) e bold (high contrast)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Gap entre ícone e label (--dss-spacing-1)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius do focus ring (--dss-radius-sm)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transição de cor (--dss-duration-150 + --dss-easing-standard)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Estado disabled (--dss-opacity-disabled: 0.4)", ref: "DSS_TOKEN_REFERENCE.md" },
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
                "aria-current='page' propagado via $attrs para item atual",
                "aria-hidden='true' no DssIcon quando usado com label",
                "Focus ring visível via dss-focus-ring mixin",
                "text-decoration: underline em hover (WCAG 1.4.1)",
                "Outline permanente em prefers-contrast: high",
                "System color keywords em forced-colors: active",
                "Transições removidas em prefers-reduced-motion",
                "Navegação por teclado (Tab, Enter, Shift+Tab)",
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
                  { criterion: "1.4.1 Uso de Cor", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "2.4.8 Localização", level: "AAA" },
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : item.level === "AAA" ? "rgba(180, 84, 196, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AA" ? "var(--dss-positive)" : item.level === "AAA" ? "#b454c4" : "var(--dss-action-primary)",
                        }}
                      >
                        {item.level}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 p-3 rounded-lg border" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
              <h5 className="text-sm font-medium mb-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
                ⚠️ Divergência Intencional do Golden Reference
              </h5>
              <p className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>
                Em <code className="font-mono">prefers-contrast: high</code>, itens clicáveis recebem outline <strong>permanente</strong> (não apenas em focus-visible). Diferente do DssButton — justificado pela semântica de navegação estrutural com múltiplos links em sequência.
              </p>
            </div>
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
              title: "Usar QBreadcrumbsEl diretamente",
              wrong: '<q-breadcrumbs-el to="/home" label="Início" />',
              correct: '<DssBreadcrumbsEl to="/home" label="Início" />',
              reason: "Bypassar o wrapper DSS remove governança de tokens, acessibilidade e brandabilidade.",
            },
            {
              title: "Item sem to/href sem aria-current",
              wrong: '<DssBreadcrumbsEl label="Página Atual" />',
              correct: '<DssBreadcrumbsEl label="Página Atual" aria-current="page" />',
              reason: "Screen readers precisam de aria-current='page' para identificar a localização atual na trilha.",
            },
            {
              title: "Ícone sem label e sem aria-label",
              wrong: '<DssBreadcrumbsEl to="/home" icon="home" />',
              correct: '<DssBreadcrumbsEl to="/home" icon="home" aria-label="Início" />',
              reason: "DssIcon tem aria-hidden='true' — sem label textual, o item fica inacessível para leitores de tela.",
            },
            {
              title: "Sobrescrever estilos com !important",
              wrong: '.dss-breadcrumbs-el--clickable { color: red !important; }',
              correct: 'Usar prop color ou data-brand no container pai',
              reason: "Quebra a governança de tokens e a brandabilidade. Cores devem ser via sistema DSS.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssBreadcrumbsEl</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "::before reservado para touch target (não implementado v1.0.0 — RES-03). Nenhum uso de ::after." },
                { rule: "Uso de brightness()", application: "Não utilizado — estados controlados via tokens semânticos de cor e opacidade." },
                { rule: "Classificação do componente", application: "Elemento de navegação estrutural — condicionalmente interativo (clicável/estático)." },
                { rule: "Gate de Composição v2.4", application: "GATE-EXC-01: <q-breadcrumbs-el> como raiz — gerencia roteamento Vue Router." },
                { rule: "inheritAttrs: false", application: "Implementado — $attrs forwarded via v-bind para <q-breadcrumbs-el>." },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.rule}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.application}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
            <h4 className="text-sm font-medium mb-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
              Exceções Documentadas
            </h4>
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
                  { id: "EXC-01", value: ".dss-breadcrumbs-el.q-breadcrumbs__el", reason: "Seletor composto — especificidade para override Quasar (Level 1 DOM)" },
                  { id: "EXC-02", value: "text-decoration: underline", reason: "Sem token DSS. Padrão WCAG 2.1 SC 1.4.1" },
                  { id: "EXC-03", value: "2px solid ButtonText", reason: "Forced-colors: system color keywords obrigatórios" },
                  { id: "EXC-04", value: "opacity: 1", reason: "Forced-colors: reset para visibilidade de GrayText" },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.id}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.value}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
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
              "DSS/docs/Compliance/seals/DssBreadcrumbsEl/DSSBREADCRUMBSEL_SELO_v2.2.md",
              "DSSBREADCRUMBSEL_API.md",
              "DssBreadcrumbsEl.md (Documentação Normativa v1.0.0)",
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
