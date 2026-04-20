// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  PanelTop,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
  Menu,
  Search,
  Bell,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

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
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";
import { Loader2 } from "lucide-react";

// ============================================================================
// DADOS — Derivados de DssHeader.ts.vue + DSSHEADER_API.md + pre_prompt
// ============================================================================

// Variantes de elevação visual (mutuamente exclusivas no playground)
const variants = [
  { name: "default", label: "Default", desc: "Sem sombra nem borda" },
  { name: "elevated", label: "Elevated", desc: "Sombra de elevação (--dss-elevation-2)" },
  { name: "bordered", label: "Bordered", desc: "Borda inferior sutil (alternativa flat)" },
];

// Toolbars internas (composição) — Header é Nível 3, slot exclusivo de DssToolbar
const compositionTemplates = [
  { name: "single", label: "Single Toolbar", desc: "Header com um DssToolbar (padrão)" },
  { name: "withSearch", label: "Com Busca", desc: "Toolbar com input de busca" },
  { name: "actions", label: "Com Ações", desc: "Menu + título + ações (notif/perfil)" },
  { name: "stacked", label: "Múltiplos", desc: "Dois DssToolbar empilhados" },
];

// Props API — DssHeader (fonte: header.types.ts + DSSHEADER_API.md)
const propsData = [
  { category: "Visual", prop: "elevated", type: "Boolean", default: "false", description: "Aplica sombra de elevação (--dss-elevation-2) para destacar do conteúdo rolado" },
  { category: "Visual", prop: "bordered", type: "Boolean", default: "false", description: "Aplica borda inferior sutil (alternativa flat à sombra)" },
  { category: "Comportamento", prop: "reveal", type: "Boolean", default: "false", description: "Oculta header ao rolar para baixo, exibe ao rolar para cima (via $attrs)" },
  { category: "Comportamento", prop: "reveal-offset", type: "Number", default: "250", description: "Offset em pixels para ativar o reveal (via $attrs)" },
];

// Props bloqueadas — governança DSS
const blockedPropsData = [
  { prop: "color", reason: "Background governado por --dss-surface-default via CSS" },
  { prop: "height-hint", reason: "Calculado automaticamente pelo Quasar com base no conteúdo" },
  { prop: "dark", reason: "Dark mode governado globalmente via [data-theme=\"dark\"]" },
];

// Anatomia 4 Camadas — Derivado da estrutura real do componente
const anatomyData = {
  structure: {
    files: ["1-structure/DssHeader.ts.vue"],
    description: "Wrapper canônico sobre <q-header>. Container estrutural superior de página, 100% não-interativo. Responsabilidade exclusiva de ancorar conteúdo no topo e gerenciar elevação visual.",
    responsibilities: [
      "Encapsula <q-header> com inheritAttrs: false",
      "Bloqueia prop color (governança DSS)",
      "Repassa $attrs ao QHeader (incluindo reveal)",
      "Slot default exclusivo para DssToolbar",
      "Aplica role='banner' nativo do QHeader",
    ],
    tokens: [],
    codeExample: `<template>
  <q-header
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </q-header>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Override do background-color e color do QHeader nativo (que aplica bg-primary !important). Apenas tokens genéricos.",
    responsibilities: [
      "Sobrescreve bg-primary !important do QHeader (EXC-02)",
      "Aplica --dss-surface-default como fundo padrão",
      "Aplica --dss-text-body como cor de texto",
    ],
    tokens: ["--dss-surface-default", "--dss-text-body"],
    codeExample: `.dss-header {
  background-color: var(--dss-surface-default) !important;
  color: var(--dss-text-body) !important;
}`,
  },
  variants: {
    files: ["3-variants/_elevated.scss", "3-variants/_bordered.scss"],
    description: "Variantes visuais de elevação. Apenas estrutura de shadow/border — sem cor, sem brand, sem estado.",
    responsibilities: [
      "Elevated: box-shadow via --dss-elevation-2",
      "Bordered: borda inferior via --dss-border-width-thin + --dss-gray-200",
      "Mutuamente exclusivas por convenção (não tecnicamente)",
    ],
    tokens: ["--dss-elevation-2", "--dss-border-width-thin", "--dss-gray-200"],
    codeExample: `.dss-header--elevated {
  box-shadow: var(--dss-elevation-2);
}

.dss-header--bordered {
  border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-200);
}`,
  },
  output: {
    files: ["4-output/_states.scss", "4-output/index.scss"],
    description: "Camada final aplicando dark mode global, high contrast e forced-colors. Sem brands (brand é responsabilidade do DssToolbar filho).",
    responsibilities: [
      "Dark mode via [data-theme='dark']",
      "Suporte a prefers-contrast: high (borda reforçada)",
      "Suporte a forced-colors: active (Windows High Contrast)",
      "Brand NÃO é aplicado — delegado ao DssToolbar interno",
    ],
    tokens: ["--dss-surface-dark", "--dss-border-width-md"],
    codeExample: `[data-theme="dark"] .dss-header {
  background-color: var(--dss-surface-dark) !important;
  color: var(--dss-text-inverse) !important;
}

@media (prefers-contrast: high) {
  .dss-header--bordered {
    border-bottom-width: var(--dss-border-width-md);
  }
}`,
  },
};

// ============================================================================
// PREVIEW DO HEADER
// ============================================================================

interface DssHeaderPreviewProps {
  variant?: string;
  toolbarColor?: string | null;
  toolbarBrand?: string | null;
  toolbarFeedback?: string | null;
  toolbarSize?: string;
  toolbarDense?: boolean;
  toolbarDisabled?: boolean;
  toolbarLoading?: boolean;
  reveal?: boolean;
  revealOffset?: number;
  template?: string;
  isDarkMode?: boolean;
}

function DssHeaderPreview({
  variant = "default",
  toolbarColor = null,
  toolbarBrand = null,
  toolbarFeedback = null,
  toolbarSize = "md",
  toolbarDense = false,
  toolbarDisabled = false,
  toolbarLoading = false,
  reveal = false,
  revealOffset = 250,
  template = "single",
  isDarkMode = false,
}: DssHeaderPreviewProps) {
  const surfaceBg = isDarkMode ? "hsl(0 0% 14%)" : "hsl(0 0% 100%)";
  const textColor = isDarkMode ? "hsl(0 0% 88%)" : "hsl(0 0% 10%)";
  const subtleColor = isDarkMode ? "hsl(0 0% 60%)" : "hsl(0 0% 40%)";
  const dividerColor = isDarkMode ? "hsl(0 0% 22%)" : "hsl(0 0% 90%)";
  const pageBg = isDarkMode ? "hsl(0 0% 9%)" : "hsl(0 0% 96%)";

  // ===== COLOR APPLICATION DOMAIN v3.2 =====
  // Apenas uma fonte de cor pode estar ativa por vez.
  // Resolução determinística no preview (último render). A UI já garante
  // mutual exclusion no estado (ver handleColorSourceChange).
  let resolvedToolbarBg: string | null = null;
  if (toolbarBrand && DSS_BRAND_COLORS[toolbarBrand]) {
    resolvedToolbarBg = DSS_BRAND_COLORS[toolbarBrand].principal;
  } else if (toolbarFeedback && DSS_FEEDBACK_COLORS[toolbarFeedback]) {
    resolvedToolbarBg = DSS_FEEDBACK_COLORS[toolbarFeedback].bg;
  } else if (toolbarColor && DSS_SEMANTIC_COLORS[toolbarColor]) {
    resolvedToolbarBg = DSS_SEMANTIC_COLORS[toolbarColor].bg;
  }

  // Computa estilos de elevação/borda
  const headerStyle: React.CSSProperties = {
    backgroundColor: surfaceBg,
    color: textColor,
    transition: "all 200ms ease",
    position: "relative",
    zIndex: 2,
  };

  if (variant === "elevated") {
    headerStyle.boxShadow = isDarkMode
      ? "0 2px 8px rgba(0,0,0,0.6)"
      : "0 2px 8px rgba(0,0,0,0.12)";
  } else if (variant === "bordered") {
    headerStyle.borderBottom = `1px solid ${dividerColor}`;
  }

  // Toolbar size → minHeight
  const toolbarMinHeight =
    toolbarDense ? 40 :
    toolbarSize === "sm" ? 48 :
    toolbarSize === "lg" ? 64 : 56;

  const toolbarBg = resolvedToolbarBg || "transparent";
  const toolbarTextColor = resolvedToolbarBg ? "#ffffff" : textColor;
  const toolbarSubtleColor = resolvedToolbarBg ? "rgba(255,255,255,0.75)" : subtleColor;
  const iconHoverBg = resolvedToolbarBg
    ? "rgba(255,255,255,0.15)"
    : isDarkMode
    ? "rgba(255,255,255,0.08)"
    : "rgba(0,0,0,0.06)";

  const toolbarOpacity = toolbarDisabled ? 0.5 : 1;
  const toolbarPointerEvents: React.CSSProperties["pointerEvents"] = toolbarDisabled ? "none" : "auto";

  const Toolbar = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: toolbarDense ? 8 : 12,
        padding: toolbarDense ? "0 12px" : "0 16px",
        minHeight: toolbarMinHeight,
        backgroundColor: toolbarBg,
        color: toolbarTextColor,
        opacity: toolbarOpacity,
        pointerEvents: toolbarPointerEvents,
        position: "relative",
      }}
      aria-disabled={toolbarDisabled || undefined}
      aria-busy={toolbarLoading || undefined}
    >
      {children}
      {toolbarLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: resolvedToolbarBg ? "rgba(0,0,0,0.18)" : (isDarkMode ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)"),
            backdropFilter: "blur(1px)",
          }}
        >
          <Loader2 size={18} className="animate-spin" style={{ color: toolbarTextColor }} />
        </div>
      )}
    </div>
  );

  const iconSize = toolbarDense ? 16 : 18;
  const iconBtnSize = toolbarDense ? 30 : 36;

  const IconBtn = ({ icon: Icon, label }: { icon: typeof Menu; label: string }) => (
    <button
      type="button"
      aria-label={label}
      className="rounded-full transition-colors flex items-center justify-center"
      style={{
        width: iconBtnSize,
        height: iconBtnSize,
        backgroundColor: "transparent",
        color: "inherit",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = iconHoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <Icon size={iconSize} />
    </button>
  );

  const titleSize = toolbarDense ? 13 : 14;

  const renderSingle = () => (
    <Toolbar>
      <IconBtn icon={Menu} label="Menu" />
      <span style={{ fontWeight: 600, fontSize: titleSize }}>Sansys Application</span>
    </Toolbar>
  );

  const renderWithSearch = () => (
    <Toolbar>
      <IconBtn icon={Menu} label="Menu" />
      <span style={{ fontWeight: 600, fontSize: titleSize }}>Dashboard</span>
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 10px",
          height: toolbarDense ? 28 : 32,
          width: 220,
          borderRadius: 6,
          backgroundColor: resolvedToolbarBg ? "rgba(255,255,255,0.15)" : (isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"),
          color: toolbarSubtleColor,
          fontSize: 12,
        }}
      >
        <Search size={14} />
        <span>Buscar...</span>
      </div>
    </Toolbar>
  );

  const renderActions = () => (
    <Toolbar>
      <IconBtn icon={Menu} label="Menu" />
      <span style={{ fontWeight: 600, fontSize: titleSize }}>Sansys Hub</span>
      <div style={{ flex: 1 }} />
      <IconBtn icon={Bell} label="Notificações" />
      <IconBtn icon={User} label="Perfil" />
    </Toolbar>
  );

  const renderStacked = () => (
    <>
      <Toolbar>
        <IconBtn icon={Menu} label="Menu" />
        <span style={{ fontWeight: 600, fontSize: titleSize }}>Sansys Application</span>
        <div style={{ flex: 1 }} />
        <IconBtn icon={Bell} label="Notificações" />
        <IconBtn icon={User} label="Perfil" />
      </Toolbar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 16px",
          minHeight: toolbarDense ? 36 : 44,
          backgroundColor: resolvedToolbarBg ? "rgba(0,0,0,0.10)" : (isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"),
          color: toolbarTextColor,
          fontSize: 12,
          borderTop: `1px solid ${resolvedToolbarBg ? "rgba(255,255,255,0.18)" : dividerColor}`,
          opacity: toolbarOpacity,
          pointerEvents: toolbarPointerEvents,
        }}
      >
        {["Visão Geral", "Relatórios", "Configurações"].map((tab, i) => (
          <span
            key={tab}
            style={{
              padding: "0 4px",
              height: toolbarDense ? 36 : 44,
              display: "flex",
              alignItems: "center",
              borderBottom: i === 0 ? `2px solid ${resolvedToolbarBg ? "#ffffff" : "var(--dss-action-primary, #1f86de)"}` : "2px solid transparent",
              fontWeight: i === 0 ? 600 : 400,
              opacity: i === 0 ? 1 : 0.7,
              cursor: "pointer",
            }}
          >
            {tab}
          </span>
        ))}
      </div>
    </>
  );

  const templateMap: Record<string, () => React.ReactNode> = {
    single: renderSingle,
    withSearch: renderWithSearch,
    actions: renderActions,
    stacked: renderStacked,
  };

  // Resumo legível para a área de conteúdo
  const activeColorLabel =
    toolbarBrand ? `brand="${toolbarBrand}"` :
    toolbarFeedback ? `feedback="${toolbarFeedback}"` :
    toolbarColor ? `color="${toolbarColor}"` : "neutro";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${dividerColor}`,
        backgroundColor: pageBg,
      }}
      role="region"
      aria-label="Preview de DssHeader"
    >
      {/* Header */}
      <header style={headerStyle} role="banner">
        {(templateMap[template] || renderSingle)()}
      </header>

      {/* Conteúdo simulado da página */}
      <div style={{ padding: 20, minHeight: 160, color: subtleColor, fontSize: 12 }}>
        <p style={{ marginBottom: 8, color: textColor, fontWeight: 600, fontSize: 13 }}>
          Conteúdo da página
        </p>
        <p>
          Área scrollável simulada.
          {reveal && ` Reveal ativo (offset ${revealOffset}px): header se oculta ao rolar > ${revealOffset}px.`}
        </p>
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          Header: <code>{variant}</code> · Toolbar: <code>{activeColorLabel}</code>
          {toolbarDense && <> · <code>dense</code></>}
          {!toolbarDense && toolbarSize !== "md" && <> · <code>size={toolbarSize}</code></>}
          {toolbarDisabled && <> · <code>disabled</code></>}
          {toolbarLoading && <> · <code>loading</code></>}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssHeaderPage() {
  // Header (componente pai)
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedTemplate, setSelectedTemplate] = useState("actions");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [headerBooleans, setHeaderBooleans] = useState({
    reveal: false,
  });
  const [revealOffset, setRevealOffset] = useState<number>(250);

  // ===== Composite Logic: estado do DssToolbar interno =====
  // Color Application Domain v3.2: Color, Brand e Feedback são mutuamente exclusivos.
  const [toolbarColor, setToolbarColor] = useState<string | null>(null);
  const [toolbarBrand, setToolbarBrand] = useState<string | null>(null);
  const [toolbarFeedback, setToolbarFeedback] = useState<string | null>(null);
  const [toolbarSize, setToolbarSize] = useState<string>("md");
  const [toolbarBooleans, setToolbarBooleans] = useState({
    dense: false,
    disabled: false,
    loading: false,
  });

  // === Color Application Domain handlers (mutual exclusion silenciosa) ===
  const handleColorSelect = (color: string) => {
    setToolbarColor((prev) => (prev === color ? null : color));
    setToolbarBrand(null);
    setToolbarFeedback(null);
  };
  const handleBrandSelect = (brand: string | null) => {
    setToolbarBrand((prev) => (prev === brand ? null : brand));
    setToolbarColor(null);
    setToolbarFeedback(null);
  };
  const handleFeedbackSelect = (feedback: string) => {
    setToolbarFeedback((prev) => (prev === feedback ? null : feedback));
    setToolbarColor(null);
    setToolbarBrand(null);
  };

  const toggleHeaderBoolean = (name: string) => {
    setHeaderBooleans((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };
  const toggleToolbarBoolean = (name: string) => {
    setToolbarBooleans((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  // ===== Geração de código (PLAYGROUND_STANDARD v3.2) =====
  const generateCode = () => {
    // Header props
    const headerProps: string[] = [];
    if (selectedVariant === "elevated") headerProps.push("elevated");
    if (selectedVariant === "bordered") headerProps.push("bordered");
    if (headerBooleans.reveal) {
      headerProps.push(":reveal=\"true\"");
      if (revealOffset !== 250) headerProps.push(`:reveal-offset="${revealOffset}"`);
    }
    const headerPropsStr = headerProps.length > 0 ? ` ${headerProps.join(" ")}` : "";

    // Toolbar props (composite logic — props delegadas ao filho)
    const tProps: string[] = [];
    if (toolbarBrand) tProps.push(`brand="${toolbarBrand}"`);
    else if (toolbarFeedback) tProps.push(`feedback="${toolbarFeedback}"`);
    else if (toolbarColor) tProps.push(`color="${toolbarColor}"`);
    if (toolbarBooleans.dense) tProps.push("dense");
    else if (toolbarSize !== "md") tProps.push(`size="${toolbarSize}"`);
    if (toolbarBooleans.disabled) tProps.push("disabled");
    if (toolbarBooleans.loading) tProps.push(":loading=\"true\"");
    const tPropsStr = tProps.length > 0 ? ` ${tProps.join(" ")}` : "";

    const toolbars: Record<string, string> = {
      single: `  <DssToolbar${tPropsStr}>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <DssToolbarTitle>Sansys Application</DssToolbarTitle>
  </DssToolbar>`,
      withSearch: `  <DssToolbar${tPropsStr}>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <DssToolbarTitle>Dashboard</DssToolbarTitle>
    <DssSpace />
    <DssInput dense outlined placeholder="Buscar..." />
  </DssToolbar>`,
      actions: `  <DssToolbar${tPropsStr}>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <DssToolbarTitle>Sansys Hub</DssToolbarTitle>
    <DssSpace />
    <DssButton flat round icon="notifications" aria-label="Notificações" />
    <DssButton flat round icon="account_circle" aria-label="Perfil" />
  </DssToolbar>`,
      stacked: `  <DssToolbar${tPropsStr}>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <DssToolbarTitle>Sansys Application</DssToolbarTitle>
    <DssSpace />
    <DssButton flat round icon="notifications" aria-label="Notificações" />
    <DssButton flat round icon="account_circle" aria-label="Perfil" />
  </DssToolbar>
  <DssToolbar${tPropsStr}>
    <DssTabs v-model="tab">
      <DssTab name="overview" label="Visão Geral" />
      <DssTab name="reports" label="Relatórios" />
      <DssTab name="settings" label="Configurações" />
    </DssTabs>
  </DssToolbar>`,
    };

    return `<DssHeader${headerPropsStr}>
${toolbars[selectedTemplate] || toolbars.single}
</DssHeader>`;
  };

  const headerToggles = [{ name: "reveal", label: "Reveal on scroll" }];
  const toolbarToggles = [
    { name: "dense", label: "Dense" },
    { name: "disabled", label: "Disabled" },
    { name: "loading", label: "Loading" },
  ];
  const toolbarSizes = [
    { name: "sm", label: "SM" },
    { name: "md", label: "MD", isDefault: true },
    { name: "lg", label: "LG" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: PAGE HEADER
       * ================================================================ */}
      <PageHeader
        icon={PanelTop}
        badge="v1.0.0"
        badgeVariant="info"
        title="Componente"
        titleAccent="DssHeader"
        subtitle="DssHeader é o container estrutural superior da página, wrapper governado sobre QHeader. Componente de Nível 3 (composição de segundo grau), 100% não-interativo, ancora o conteúdo no topo do layout e orquestra DssToolbar internos. Variantes elevated e bordered controlam a separação visual com o conteúdo rolado, enquanto a brandabilidade é delegada aos toolbars filhos."
        subtitleHighlights={["Nível 3", "100% não-interativo", "delegada aos toolbars filhos"]}
        extraBadges={[
          { label: "Quasar Compatible", variant: "success" },
          { label: "TypeScript", variant: "info" },
          { label: "WCAG 2.1 AA", variant: "success" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / NÃO USAR
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
              "Cabeçalho fixo no topo de páginas de aplicação",
              "Ancorar navegação primária e ações globais (perfil, notificações)",
              "Contextos com DssLayout (Nível 4) que requerem landmark banner",
              "Aplicar identidade de marca via DssToolbar interno (brand=\"hub|water|waste\")",
              "Layouts com conteúdo rolado que exigem separação visual (elevated/bordered)",
              "Comportamento reveal-on-scroll para maximizar área de conteúdo",
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
                { scenario: "Cabeçalho de seção interna (h2/h3)", alt: "HTML semântico (header de section)" },
                { scenario: "Cabeçalho de DssCard ou modal", alt: "DssCardSection / DssDialog header" },
                { scenario: "Múltiplos banners por página", alt: "Apenas 1 DssHeader (role=banner único)" },
                { scenario: "Barra de navegação inferior (mobile)", alt: "DssFooter com navegação" },
                { scenario: "Toolbar isolada sem contexto de layout", alt: "DssToolbar standalone" },
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
       * SEÇÃO 3: PLAYGROUND
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Header"
        description="Variantes e comportamento do Header (pai) + delegação para o DssToolbar interno (composite logic). Cores são mutuamente exclusivas (Color Application Domain v3.2)."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssHeaderPreview
            variant={selectedVariant}
            toolbarColor={toolbarColor}
            toolbarBrand={toolbarBrand}
            toolbarFeedback={toolbarFeedback}
            toolbarSize={toolbarSize}
            toolbarDense={toolbarBooleans.dense}
            toolbarDisabled={toolbarBooleans.disabled}
            toolbarLoading={toolbarBooleans.loading}
            reveal={headerBooleans.reveal}
            revealOffset={revealOffset}
            template={selectedTemplate}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            {/* HEADER — Variant */}
            <VariantSelector
              label="Header · Variant"
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />

            {/* HEADER — Composição (template do conteúdo interno) */}
            <ControlSection label="Composição">
              {compositionTemplates.map((t) => (
                <PlaygroundButton
                  key={t.name}
                  onClick={() => setSelectedTemplate(t.name)}
                  isSelected={selectedTemplate === t.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {t.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            {/* HEADER — Comportamento */}
            <ToggleGroup
              label="Header · Comportamento"
              options={headerToggles}
              values={headerBooleans}
              onToggle={toggleHeaderBoolean}
            />

            {/* HEADER — Reveal Offset (numérico) */}
            <ControlSection label="Reveal Offset (px)">
              <input
                type="number"
                min={0}
                max={2000}
                step={10}
                value={revealOffset}
                onChange={(e) => setRevealOffset(Math.max(0, Number(e.target.value) || 0))}
                disabled={!headerBooleans.reveal}
                className="w-full rounded-md px-3 py-1.5 text-sm font-mono"
                style={{
                  backgroundColor: "var(--jtech-card-bg)",
                  border: "1px solid var(--jtech-card-border)",
                  color: "var(--jtech-text-body)",
                  opacity: headerBooleans.reveal ? 1 : 0.5,
                }}
                aria-label="Reveal offset em pixels"
              />
            </ControlSection>

            {/* TOOLBAR (composite) — Color */}
            <ColorPicker
              label="Toolbar · Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={toolbarColor}
              onSelect={handleColorSelect}
            />

            {/* TOOLBAR (composite) — Brand */}
            <BrandPicker
              label="Toolbar · Brand"
              brands={DSS_BRAND_COLORS}
              selectedBrand={toolbarBrand}
              onSelect={handleBrandSelect}
            />

            {/* TOOLBAR (composite) — Feedback */}
            <FeedbackColorPicker
              label="Toolbar · Feedback"
              colors={DSS_FEEDBACK_COLORS as any}
              selectedColor={toolbarFeedback}
              onSelect={handleFeedbackSelect}
            />

            {/* TOOLBAR (composite) — Size */}
            <SizeSelector
              label="Toolbar · Size"
              sizes={toolbarSizes}
              selectedSize={toolbarSize}
              onSelect={setToolbarSize}
            />

            {/* TOOLBAR (composite) — Estados */}
            <ToggleGroup
              label="Toolbar · Estados"
              options={toolbarToggles}
              values={toolbarBooleans}
              onToggle={toggleToolbarBoolean}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 4: ESTADOS
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
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicabilidade</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens / Notas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", visual: "Background --dss-surface-default, sem sombra/borda", applicability: "Sempre", tokens: "--dss-surface-default, --dss-text-body" },
              { state: "Elevated", visual: "Box-shadow de elevação", applicability: "elevated=true", tokens: "--dss-elevation-2" },
              { state: "Bordered", visual: "Borda inferior sutil", applicability: "bordered=true", tokens: "--dss-border-width-thin, --dss-gray-200" },
              { state: "Reveal", visual: "Header se oculta ao scroll down, reaparece no scroll up", applicability: "reveal=true (via $attrs)", tokens: "Comportamento nativo QHeader" },
              { state: "Hover", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "Estados de interação são dos filhos (DssToolbar)" },
              { state: "Focus", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "Foco é dos botões/inputs internos" },
              { state: "Active", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "—" },
              { state: "Disabled", visual: "N/A — container estrutural", applicability: "Nunca", tokens: "—" },
              { state: "Loading", visual: "N/A — container estrutural", applicability: "Nunca", tokens: "—" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.visual}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.applicability}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.tokens}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssHeader" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS
       * ================================================================ */}

      {/* Props API */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssHeader — Props Expostas</h4>
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

          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas (Governança DSS)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop QHeader</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Motivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockedPropsData.map((p, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-negative)" }}>{p.prop}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="pt-2">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <p className="text-sm" style={{ color: "var(--jtech-text-muted)" }}>
              DssHeader não emite eventos próprios — é um container estrutural não-interativo (Gate v2.4). Eventos são responsabilidade dos componentes filhos (DssToolbar, DssButton, etc.).
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Slots */}
      <CollapsibleSection icon={Code} title="Slots">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Conteúdo Esperado</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Restrição (Gate v2.4)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Um ou mais DssToolbar (ou DssTabs em cenários de navegação global)</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Proibido HTML nativo solto ou texto direto. Composição é exclusiva de componentes DSS.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* Tokens */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            DssHeader consome os seguintes tipos de tokens DSS:
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Papel no Componente</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { type: "Surface", role: "Background do header (sobrescreve bg-primary do QHeader — EXC-02)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Texto", role: "Cor de texto padrão do header em light/dark mode", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevação", role: "Box-shadow da variante elevated", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-bottom da variante bordered", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Cinzas (gray scale)", role: "Cor da borda inferior em light mode", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "NÃO consome — brand é responsabilidade do DssToolbar filho", ref: "Delegação arquitetural" },
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

      {/* Acessibilidade */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "role=\"banner\" aplicado nativamente pelo QHeader (landmark)",
                "Único por página — não duplicar (semântica de banner)",
                "z-index nativo do Quasar preservado (não sobrescrever)",
                "Suporte a prefers-contrast: high (borda reforçada)",
                "Suporte a forced-colors: active (Windows High Contrast)",
                "Cor de fundo respeita dark mode global ([data-theme=\"dark\"])",
                "Conteúdo interno (DssToolbar) governa foco e teclado",
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
                  { criterion: "1.3.1 Informação e Relações (landmark banner)", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "1.4.11 Contraste de Componentes Não-Textuais", level: "AA" },
                  { criterion: "2.4.1 Bypass Blocks (landmark banner)", level: "A" },
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
{`@media (prefers-contrast: high) {
  .dss-header--bordered {
    border-bottom-width: var(--dss-border-width-md);
  }
}

@media (forced-colors: active) {
  .dss-header {
    border-bottom: 2px solid ButtonText;
  }
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>

      {/* Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "HTML nativo direto no slot do DssHeader",
              wrong: '<DssHeader>\n  <div class="minha-barra">Título</div>\n</DssHeader>',
              correct: '<DssHeader>\n  <DssToolbar>\n    <DssToolbarTitle>Título</DssToolbarTitle>\n  </DssToolbar>\n</DssHeader>',
              reason: "Gate de Composição v2.4 — slot default do DssHeader é exclusivo para DssToolbar (ou DssTabs).",
            },
            {
              title: "Aplicar brand no DssHeader",
              wrong: '<DssHeader brand="hub">\n  <DssToolbar>...</DssToolbar>\n</DssHeader>',
              correct: '<DssHeader>\n  <DssToolbar brand="hub">...</DssToolbar>\n</DssHeader>',
              reason: "Brand é responsabilidade do DssToolbar interno. DssHeader é container neutro — não expõe prop brand.",
            },
            {
              title: "Múltiplos DssHeader na mesma página",
              wrong: '<DssLayout>\n  <DssHeader>...</DssHeader>\n  <DssHeader>...</DssHeader>\n</DssLayout>',
              correct: '<DssLayout>\n  <DssHeader>\n    <DssToolbar>Global</DssToolbar>\n    <DssToolbar>Seção</DssToolbar>\n  </DssHeader>\n</DssLayout>',
              reason: "role=\"banner\" deve ser único por página (WCAG 1.3.1). Use múltiplos DssToolbar empilhados dentro de um único DssHeader.",
            },
            {
              title: "Sobrescrever z-index do header",
              wrong: '<DssHeader style="z-index: 9999">...</DssHeader>',
              correct: '<DssHeader>...</DssHeader>',
              reason: "QHeader gerencia z-index automaticamente para coexistir com QDrawer e QDialog. Sobrescrever quebra a matemática de empilhamento.",
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
                  <pre className="mt-1 p-2 rounded text-xs font-mono whitespace-pre-wrap" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono whitespace-pre-wrap" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
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

      {/* Vinculantes DSS */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.4">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssHeader</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Gate de Responsabilidade v2.4", application: "DssHeader é container 100% não-interativo. Sem hover, focus, active próprios. Estados são dos filhos." },
                { rule: "Gate de Composição v2.4", application: "Slot default exclusivo para DssToolbar (ou DssTabs). HTML nativo proibido." },
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizados — header não possui touch target nem efeitos visuais decorativos." },
                { rule: "Uso de brightness()", application: "Não utilizado — variantes usam tokens de elevation e border diretamente." },
                { rule: "Classificação do componente", application: "Container Estrutural Nível 3 (composição de segundo grau). Golden Reference: DssCard. Golden Context: DssLayout." },
                { rule: "Brandabilidade", application: "Delegada — DssHeader não consome brand. DssToolbar interno aplica brand quando necessário." },
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
                  { id: "EXC-01", value: "<q-layout> no example.vue", reason: "DssLayout (Nível 4) requer contexto de layout para renderizar o header. Permitido apenas no arquivo de exemplo." },
                  { id: "EXC-02", value: "background-color !important", reason: "QHeader aplica bg-primary !important via classes utilitárias. Override do DSS exige !important para usar --dss-surface-default." },
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

      {/* Referências */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSSHEADER_API.md",
              "pre_prompt_dss_header.md",
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "PLAYGROUND_STANDARD.md (v3.2)",
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
