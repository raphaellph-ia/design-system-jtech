import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Layers,
  Code,
  FileText,
  Box,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  ControlSection,
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
// DADOS ESPECÍFICOS DO DSSTABS
// ============================================================================

// Feedback colors com ícones
const feedbackColors: Record<string, FeedbackColor> = {
  positive: { ...DSS_FEEDBACK_COLORS.positive, icon: CheckCircle },
  negative: { ...DSS_FEEDBACK_COLORS.negative, icon: XCircle },
  warning: { ...DSS_FEEDBACK_COLORS.warning, icon: AlertTriangle },
  info: { ...DSS_FEEDBACK_COLORS.info, icon: Info },
};

// Tamanhos das abas (DssTab density)
const sizes = [
  { name: "sm", label: "SM", isDefault: false },
  { name: "md", label: "MD", isDefault: true },
  { name: "lg", label: "LG", isDefault: false },
];

// Alinhamentos do DssTabs
const alignOptions = [
  { name: "left", label: "Left", isDefault: true },
  { name: "center", label: "Center" },
  { name: "right", label: "Right" },
  { name: "justify", label: "Justify" },
];

// Breakpoints pré-definidos
const breakpointOptions = [
  { name: "0", label: "0 (Sempre setas)" },
  { name: "300", label: "300px" },
  { name: "600", label: "600px", isDefault: true },
  { name: "900", label: "900px" },
];

// Quantidade de abas para preview
const tabCountOptions = [
  { name: "3", label: "3 abas" },
  { name: "5", label: "5 abas", isDefault: true },
  { name: "8", label: "8 abas" },
  { name: "12", label: "12 (scroll)" },
];

// Props API
const propsData = [
  { category: "Estado", prop: "modelValue", type: "String | Number", default: "undefined", description: "Identificador da aba ativa (v-model)" },
  { category: "Layout", prop: "align", type: "'left' | 'center' | 'right' | 'justify'", default: "'left'", description: "Alinhamento das abas no container" },
  { category: "Layout", prop: "breakpoint", type: "Number", default: "600", description: "Largura (px) abaixo da qual setas de scroll aparecem" },
  { category: "Layout", prop: "vertical", type: "Boolean", default: "false", description: "Layout vertical (coluna) com indicador lateral" },
  { category: "Layout", prop: "dense", type: "Boolean", default: "false", description: "Modo compacto — reduz padding das setas de navegação" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste' | null", default: "null", description: "Marca Sansys — acento visual nas setas e propagação via [data-brand]" },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label acessível para o grupo de abas (aria-label)" },
];

// Props bloqueadas
const blockedProps = [
  { prop: "active-color", reason: "DSS governa cor ativa via tokens --dss-action-primary no DssTab" },
  { prop: "active-bg-color", reason: "DSS governa cor de fundo via tokens no DssTab" },
  { prop: "indicator-color", reason: "DSS governa cor do indicador via currentColor cascade no DssTab" },
  { prop: "ripple", reason: 'Forçado :ripple="false" — DSS usa overlay ::after para feedback' },
  { prop: "no-caps", reason: "CSS/tokens DSS governam transformação de texto no DssTab" },
];

// Anatomia 4 Camadas
const anatomyData = {
  structure: {
    files: ["DssTabs.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e encapsulamento do QTabs.",
    responsibilities: [
      "Wrap do <q-tabs> com props DSS filtradas",
      "v-model bidirecional via update:modelValue",
      "Ícones de setas fixados (chevron_left / chevron_right)",
      "Bloqueio de active-color, active-bg-color, indicator-color, ripple, no-caps",
      "Propagação de [data-brand] no elemento raiz",
      "inheritAttrs: false + v-bind=\"$attrs\" para forwarding",
    ],
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais que definem o layout base e reset do container de abas.",
    responsibilities: [
      "Display e layout do container (flex)",
      "Tipografia herdada do sistema DSS",
      "Transparência de background (herança do pai)",
    ],
  },
  variants: {
    files: ["3-variants/index.scss"],
    description: "Variações de layout e densidade do container de abas.",
    responsibilities: [
      "Alinhamento: left, center, right, justify",
      "Modo vertical com indicador lateral",
      "Modo dense com padding reduzido",
    ],
  },
  output: {
    files: ["4-output/_brands.scss", "4-output/_states.scss", "4-output/index.scss"],
    description: "Camada final que aplica cores de marca, estados de acessibilidade e adaptações de output.",
    responsibilities: [
      "Cor das setas por brand (hub, water, waste)",
      "Focus-visible nas setas de navegação",
      "Dark mode e high contrast",
      "Forced-colors: active",
    ],
  },
};

// ============================================================================
// PREVIEW DO DSSTABS
// ============================================================================

interface DssTabsPreviewProps {
  align: string;
  vertical: boolean;
  dense: boolean;
  brand: string | null;
  tabCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_LABELS = [
  "Dashboard", "Usuários", "Relatórios", "Configurações",
  "Faturamento", "Integrações", "Logs", "Alertas",
  "Métricas", "Segurança", "API", "Suporte",
];

function DssTabsPreview({
  align,
  vertical,
  dense,
  brand,
  tabCount,
  activeTab,
  onTabChange,
}: DssTabsPreviewProps) {
  const tabs = TAB_LABELS.slice(0, tabCount);

  const getBrandColor = () => {
    if (!brand) return "var(--dss-jtech-accent)";
    const b = DSS_BRAND_COLORS[brand];
    return b?.principal || "var(--dss-jtech-accent)";
  };

  const indicatorColor = getBrandColor();

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: vertical ? "column" : "row",
    gap: 0,
    width: "100%",
    overflow: vertical ? "visible" : "auto",
    justifyContent:
      align === "center" ? "center" :
      align === "right" ? "flex-end" :
      align === "justify" ? "stretch" : "flex-start",
    borderBottom: vertical ? "none" : "2px solid var(--jtech-card-border)",
    borderLeft: vertical ? "2px solid var(--jtech-card-border)" : "none",
    position: "relative",
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: dense ? "6px 12px" : "10px 16px",
    fontSize: "13px",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? indicatorColor : "var(--jtech-text-body)",
    cursor: "pointer",
    position: "relative",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    background: "transparent",
    border: "none",
    flex: align === "justify" ? "1" : undefined,
    textAlign: "center",
    letterSpacing: "0.02em",
    borderBottom: !vertical && isActive ? `2px solid ${indicatorColor}` : "none",
    borderLeft: vertical && isActive ? `2px solid ${indicatorColor}` : "none",
    marginBottom: !vertical ? "-2px" : undefined,
    marginLeft: vertical ? "-2px" : undefined,
  });

  return (
    <div style={{ width: "100%", maxWidth: vertical ? "240px" : "100%" }}>
      <div style={containerStyle} role="tablist" aria-label="Navegação de abas">
        {tabs.map((tab) => {
          const tabId = tab.toLowerCase().replace(/\s/g, "-");
          const isActive = activeTab === tabId;
          return (
            <button
              key={tabId}
              role="tab"
              aria-selected={isActive}
              style={tabStyle(isActive)}
              onClick={() => onTabChange(tabId)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = indicatorColor;
                  e.currentTarget.style.backgroundColor = "var(--jtech-card-bg)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--jtech-text-body)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      {/* Tab panel placeholder */}
      <div
        role="tabpanel"
        style={{
          padding: "16px",
          fontSize: "13px",
          color: "var(--jtech-text-muted)",
          borderTop: vertical ? "none" : undefined,
        }}
      >
        Conteúdo da aba: <strong style={{ color: "var(--jtech-heading-tertiary)" }}>{activeTab}</strong>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// Baseline: DssButtonPage | Guia: COMPONENT_PAGE_STRUCTURE.md v2.3
// ============================================================================

export default function DssTabsPage() {
  // Playground state
  const [selectedAlign, setSelectedAlign] = useState("left");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedBreakpoint, setSelectedBreakpoint] = useState("600");
  const [selectedTabCount, setSelectedTabCount] = useState("5");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [booleanStates, setBooleanStates] = useState({
    vertical: false,
    dense: false,
  });

  // Color Application Domain: Brand is the only color source for DssTabs
  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand || null);
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  // Code generation (clean, production-ready)
  const generateCode = () => {
    const props: string[] = [];
    props.push('v-model="activeTab"');
    if (selectedAlign !== "left") props.push(`align="${selectedAlign}"`);
    if (selectedBreakpoint !== "600") props.push(`:breakpoint="${selectedBreakpoint}"`);
    if (booleanStates.vertical) props.push("vertical");
    if (booleanStates.dense) props.push("dense");
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);

    const tabCount = parseInt(selectedTabCount);
    const tabLines = TAB_LABELS.slice(0, tabCount)
      .map((t) => `  <DssTab name="${t.toLowerCase().replace(/\s/g, "-")}" label="${t}" />`)
      .join("\n");

    return `<DssTabs\n  ${props.join("\n  ")}\n>\n${tabLines}\n</DssTabs>`;
  };

  const layoutToggles = [
    { name: "vertical", label: "Vertical" },
    { name: "dense", label: "Dense" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (§1, §2)
       * ================================================================ */}
      <PageHeader
        icon={Layers}
        badge="Golden Component"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssTabs"
        subtitle="DssTabs é o container de navegação por abas do DSS, responsável por orquestrar a seleção global entre múltiplos DssTab filhos. Ele gerencia alinhamento, navegação por setas em overflow e propaga identidade de marca automaticamente via [data-brand], sendo utilizado dentro de cards, headers e painéis de configuração."
        subtitleHighlights={["container de navegação", "brandabilidade via [data-brand]", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "Fase 2 — Composto", variant: "success" },
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
              "Navegação entre painéis de conteúdo relacionados (ex: configurações, relatórios)",
              "Alternância entre views dentro de um mesmo contexto visual (card, header)",
              "Organização de formulários em seções temáticas (dados pessoais, endereço, pagamento)",
              "Navegação por rotas dentro de um módulo (DssRouteTab futuro)",
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
                { scenario: "Filtro de lista ou conteúdo com seleção múltipla", alt: "DssChip ou DssBtnGroup" },
                { scenario: "Navegação principal do aplicativo (top-level)", alt: "DssMenu ou Router Links" },
                { scenario: "Ação binária on/off", alt: "DssToggle" },
                { scenario: "Steps ou wizard sequencial", alt: "DssStepper (futuro)" },
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
        title="Configure o DssTabs"
        description="Explore TODAS as props visuais e comportamentais do DssTabs em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="240px"
        previewContent={
          <DssTabsPreview
            align={selectedAlign}
            vertical={booleanStates.vertical}
            dense={booleanStates.dense}
            brand={selectedBrand}
            tabCount={parseInt(selectedTabCount)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        }
        controls={
          <ControlGrid columns={5}>
            {/* Align */}
            <SizeSelector
              label="Align"
              sizes={alignOptions}
              selectedSize={selectedAlign}
              onSelect={setSelectedAlign}
            />

            {/* Brand (Color Application Domain — única fonte de cor no DssTabs) */}
            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            {/* Layout toggles */}
            <ToggleGroup
              label="Layout"
              options={layoutToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* Breakpoint */}
            <ControlSection label="Breakpoint (setas)">
              {breakpointOptions.map((bp) => (
                <PlaygroundButton
                  key={bp.name}
                  onClick={() => setSelectedBreakpoint(bp.name)}
                  isSelected={selectedBreakpoint === bp.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {bp.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            {/* Tab count */}
            <ControlSection label="Qtd. de Abas">
              {tabCountOptions.map((tc) => (
                <PlaygroundButton
                  key={tc.name}
                  onClick={() => setSelectedTabCount(tc.name)}
                  isSelected={selectedTabCount === tc.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {tc.label}
                </PlaygroundButton>
              ))}
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
              { state: "Default", visual: "Container transparente com abas alinhadas", interaction: "Navegação por clique ou teclado (←/→)", tokens: "—", a11y: "role=\"tablist\"" },
              { state: "Hover (setas)", visual: "Background sutil nas setas de navegação", interaction: "Pointer over nas setas de scroll", tokens: "--dss-surface-hover", a11y: "—" },
              { state: "Focus (setas)", visual: "Focus ring 2px nas setas", interaction: "Navegação por teclado", tokens: "--dss-focus-ring, --dss-border-width-md", a11y: "WCAG 2.4.7" },
              { state: "Active (setas)", visual: "Background pressionado", interaction: "Clique nas setas", tokens: "--dss-surface-active", a11y: "—" },
              { state: "Scrollable", visual: "Setas de navegação visíveis nas extremidades", interaction: "Clique para rolar abas", tokens: "--dss-text-subtle", a11y: "aria-hidden nas setas" },
              { state: "Brand", visual: "Setas coloridas com acento de marca", interaction: "Propagação via [data-brand]", tokens: "--dss-hub-600, --dss-water-600, --dss-waste-600", a11y: "—" },
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
      <AnatomySection componentName="DssTabs" layers={anatomyData} />

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

          <h4 className="font-medium mt-6" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas (QTabs)</h4>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop QTabs</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Motivo do Bloqueio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedProps.map((p, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-negative)" }}>
                    {p.prop}
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.reason}</TableCell>
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
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>update:modelValue</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>String | Number</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o usuário seleciona uma aba. Compatível com v-model.</TableCell>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo do grupo de abas</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>
                  <strong>Aceita apenas DssTab</strong> (ou DssRouteTab futuro). O uso de {"<q-tab>"} direto é violação arquitetural (Gate de Composição v2.4).
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
              <pre className="mt-1 p-3 rounded text-xs font-mono" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
{`<DssTabs v-model="aba">
  <DssTab name="a" label="A" />
  <DssTab name="b" label="B" />
</DssTabs>`}
              </pre>
            </div>
            <div>
              <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
              <pre className="mt-1 p-3 rounded text-xs font-mono" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
{`<DssTabs v-model="aba">
  <q-tab name="a" label="A" />
</DssTabs>`}
              </pre>
            </div>
          </div>
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
                { type: "Cores de Texto", role: "Cor padrão das setas de navegação (--dss-text-subtle)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Cores de Superfície", role: "Background das setas em hover e active", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Acento visual nas setas (hub, water, waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Focus Ring", role: "Outline de focus-visible nas setas de navegação", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Espessura do outline de focus e high-contrast", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Padding inline das setas em modo dense", ref: "DSS_TOKEN_REFERENCE.md" },
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
                'role="tablist" no container (nativo QTabs)',
                "aria-label configurável via prop ariaLabel",
                "aria-selected gerenciado automaticamente nos DssTab filhos",
                "Navegação por teclado ←/→ entre abas (comportamento nativo Quasar)",
                "Focus ring visível nas setas com :focus-visible (WCAG 2.4.7)",
                "Setas de scroll acessíveis via teclado",
                "Suporte a prefers-reduced-motion",
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
                  { criterion: "1.3.1 Info e Relacionamentos", level: "A" },
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
              title: "Usar <q-tab> dentro do DssTabs",
              wrong: '<DssTabs v-model="aba">\n  <q-tab name="a" label="A" />\n</DssTabs>',
              correct: '<DssTabs v-model="aba">\n  <DssTab name="a" label="A" />\n</DssTabs>',
              reason: "Violação do Gate de Composição v2.4. Somente DssTab (ou DssRouteTab futuro) é permitido.",
            },
            {
              title: "Forçar cores via props do QTabs",
              wrong: '<DssTabs active-color="red" indicator-color="blue" />',
              correct: '<DssTabs brand="hub" />\n<!-- Cores governadas por tokens no DssTab -->',
              reason: "O DssTabs bloqueia props de cor. A coloração é responsabilidade do DssTab via tokens DSS.",
            },
            {
              title: "DssTabs sem aria-label quando não há label visual",
              wrong: '<DssTabs v-model="aba">\n  <DssTab name="config" label="Config" />\n</DssTabs>',
              correct: '<DssTabs v-model="aba" aria-label="Configurações da conta">\n  <DssTab name="config" label="Config" />\n</DssTabs>',
              reason: "Quando o grupo de abas não possui título visual associado, aria-label é necessário para acessibilidade (WCAG 4.1.2).",
            },
            {
              title: "Alterar ícones das setas de navegação",
              wrong: '<DssTabs left-icon="arrow_back" right-icon="arrow_forward" />',
              correct: '<DssTabs />\n<!-- Setas fixadas: chevron_left / chevron_right -->',
              reason: "As setas de navegação são fixadas em chevron_left/right por decisão de governança DSS. Não é possível alterar via props.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssTabs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utiliza pseudo-elementos — responsabilidade delegada ao DssTab" },
                { rule: "Uso de brightness()", application: "Não utilizado — setas usam tokens de superfície dedicados" },
                { rule: "Classificação do componente", application: "Container Component (Nível 2 — Composto)" },
                { rule: "Entry Point Wrapper", application: "DssTabs.vue → re-export puro de 1-structure/DssTabs.ts.vue" },
                { rule: "Gate de Composição v2.4", application: "Aceita apenas DssTab (ou DssRouteTab futuro) no slot default" },
                { rule: "Props de cor bloqueadas", application: "active-color, active-bg-color, indicator-color fixados internamente" },
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
              "DSSTABS_API.md",
              "docs/governance/pre-prompts/pre_prompt_dss_tabs.md",
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
