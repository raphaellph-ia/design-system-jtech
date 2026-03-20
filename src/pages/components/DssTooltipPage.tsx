// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  ColorPicker,
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE
// ============================================================================

const propsData = [
  { category: "Conteúdo", prop: "label", type: "String", default: "''", description: "Conteúdo textual do tooltip (alternativa ao slot default)" },
  { category: "Visual", prop: "color", type: "'dark' | 'primary' | 'secondary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info'", default: "'dark'", description: "Cor semântica do tooltip" },
  { category: "Visual", prop: "textColor", type: "String | null", default: "null", description: "Cor customizada do texto (sobrescreve cor padrão)" },
  { category: "Visual", prop: "multiLine", type: "Boolean", default: "false", description: "Permite múltiplas linhas de texto (word-wrap)" },
  { category: "Visibilidade", prop: "visible", type: "Boolean", default: "false", description: "Controle externo de visibilidade" },
  { category: "Brand", prop: "brand", type: "'hub' | 'water' | 'waste' | null", default: "null", description: "Brand override (Hub, Water, Waste)" },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label ARIA customizado para screen readers" },
];

const anatomyData = {
  structure: {
    files: ["DssTooltip.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Template HTML semântico (<div> com role='tooltip')",
      "Declaração de props com validação TypeScript",
      "Binding de slot default para conteúdo customizado",
      "Composable useTooltipClasses para classes CSS",
      "Visibilidade controlada externamente via v-show",
    ],
    tokens: [],
    codeExample: `<template>
  <div
    v-show="visible"
    :class="tooltipClasses"
    role="tooltip"
    :aria-label="ariaLabel"
  >
    <slot>{{ label }}</slot>
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais que definem layout, tipografia e dimensões do tooltip.",
    responsibilities: [
      "Display inline-block e posicionamento",
      "Tipografia base (font-family, font-size, font-weight)",
      "Padding e border-radius padrão",
      "Max-width para controle de largura",
    ],
    tokens: ["--dss-font-family-sans", "--dss-font-size-sm", "--dss-radius-md", "--dss-spacing-2"],
    codeExample: `.dss-tooltip {
  display: inline-block;
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
  border-radius: var(--dss-radius-md);
  max-width: 300px;
}`,
  },
  variants: {
    files: ["3-variants/_multi-line.scss", "3-variants/index.scss"],
    description: "Define a variação multi-line para tooltips com conteúdo extenso.",
    responsibilities: [
      "Multi-line: word-wrap e white-space para textos longos",
      "Ajuste de max-width para modo multi-line",
    ],
    tokens: [],
    codeExample: `.dss-tooltip--multi-line {
  white-space: normal;
  word-wrap: break-word;
  max-width: 400px;
}`,
  },
  output: {
    files: ["4-output/_brands.scss", "4-output/_states.scss", "4-output/index.scss"],
    description: "Camada final que aplica brands e estados de acessibilidade.",
    responsibilities: [
      "Brand tokens: Hub (laranja), Water (azul), Waste (verde)",
      "Suporte a prefers-reduced-motion",
      "Suporte a prefers-contrast e forced-colors",
    ],
    tokens: ["--dss-hub-600", "--dss-water-600", "--dss-waste-600"],
    codeExample: `.dss-tooltip--brand-hub {
  background-color: var(--dss-hub-600);
  color: var(--dss-text-inverse);
}

@media (prefers-contrast: more) {
  .dss-tooltip {
    border: 2px solid currentColor;
  }
}`,
  },
};

// ============================================================================
// PREVIEW DO TOOLTIP
// ============================================================================

interface DssTooltipPreviewProps {
  label?: string;
  colorKey?: string;
  brand?: string | null;
  multiLine?: boolean;
  visible?: boolean;
}

function DssTooltipPreview({
  label = "Informação contextual",
  colorKey = "dark",
  brand = null,
  multiLine = false,
  visible = true,
}: DssTooltipPreviewProps) {
  const getBackground = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      return DSS_BRAND_COLORS[brand].principal;
    }
    const colorMap: Record<string, string> = {
      dark: "#454545",
      primary: "#1f86de",
      secondary: "#26a69a",
      accent: "#b454c4",
      positive: "#4dd228",
      negative: "#d8182e",
      warning: "#fabd14",
      info: "#0cc4e9",
    };
    return colorMap[colorKey] || colorMap.dark;
  };

  const getTextColor = () => {
    if (colorKey === "warning") return "#454545";
    return "#ffffff";
  };

  if (!visible) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            border: "1px dashed rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.4)",
            fontSize: "13px",
          }}
        >
          <EyeOff className="inline h-4 w-4 mr-2" />
          Tooltip oculto (visible=false)
        </div>
      </div>
    );
  }

  const displayLabel = multiLine
    ? "Este é um tooltip com múltiplas linhas de conteúdo. Utilizado para informações contextuais mais extensas."
    : label;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Elemento disparador simulado */}
      <div
        style={{
          padding: "8px 16px",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.7)",
          fontSize: "13px",
          cursor: "default",
        }}
      >
        Elemento Disparador
      </div>

      {/* Tooltip */}
      <div
        style={{
          display: "inline-block",
          padding: multiLine ? "10px 14px" : "6px 12px",
          backgroundColor: getBackground(),
          color: getTextColor(),
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: "6px",
          maxWidth: multiLine ? "280px" : "300px",
          whiteSpace: multiLine ? "normal" : "nowrap",
          wordWrap: multiLine ? "break-word" : "normal",
          textAlign: multiLine ? "left" : "center",
          lineHeight: multiLine ? "1.5" : "1.4",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          position: "relative",
        }}
        role="tooltip"
      >
        {displayLabel}
        {/* Seta do tooltip */}
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "10px",
            height: "10px",
            backgroundColor: getBackground(),
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssTooltipPage() {
  const [selectedColor, setSelectedColor] = useState<string | null>("dark");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    multiLine: false,
    visible: true,
  });

  // Exclusividade Color × Brand
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
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const effectiveColor = selectedBrand ? "dark" : selectedColor || "dark";

  const generateCode = () => {
    const props: string[] = [];
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor && selectedColor !== "dark") {
      props.push(`color="${selectedColor}"`);
    }
    if (booleanStates.multiLine) props.push("multi-line");
    props.push(`:visible="showTooltip"`);

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";
    return `<DssTooltip${propsStr}\n  label="Informação contextual"\n/>`;
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (COMPONENT_PAGE_STRUCTURE §1, §2)
       * ================================================================ */}
      <PageHeader
        icon={MessageSquare}
        badge="Golden Context: DssBadge"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssTooltip"
        subtitle="DssTooltip é o componente de informação contextual passiva, utilizado para exibir dicas, descrições e esclarecimentos associados a elementos da interface. Sendo um elemento não interativo, sua visibilidade é inteiramente controlada pelo elemento disparador externo, seguindo o padrão WCAG de separação entre conteúdo informativo e interação."
        subtitleHighlights={["informação contextual passiva", "não interativo", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2", variant: "info" },
          { label: "DSS Selo Aprovado", variant: "success" },
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
              "Dicas contextuais em ícones ou botões sem rótulo visível",
              "Descrições adicionais de campos de formulário",
              "Esclarecimentos sobre abreviações ou termos técnicos",
              "Feedback complementar sobre status ou valores exibidos",
              "Detalhamento de ações em barras de ferramentas",
              "Informações auxiliares em tabelas e dashboards",
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
                { scenario: "Informações essenciais à tarefa", alt: "Texto inline ou DssLabel" },
                { scenario: "Conteúdo interativo (links, botões)", alt: "DssPopover ou DssMenu" },
                { scenario: "Mensagens de erro ou validação", alt: "DssInput (mensagem inline)" },
                { scenario: "Notificações persistentes", alt: "DssBanner ou DssAlert" },
                { scenario: "Conteúdo longo ou complexo", alt: "DssPopover ou DssDialog" },
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
       * SEÇÃO 3: PLAYGROUND INTERATIVO (§4)
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Tooltip"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="280px"
        previewContent={
          <DssTooltipPreview
            label="Informação contextual"
            colorKey={effectiveColor}
            brand={selectedBrand}
            multiLine={booleanStates.multiLine}
            visible={booleanStates.visible}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <ToggleGroup
              label="Opções"
              options={[
                { name: "multiLine", label: "Multi-line" },
                { name: "visible", label: "Visível" },
              ]}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 4: ESTADOS (§5)
       * Nota: DssTooltip é NÃO interativo — estados limitados
       * ================================================================ */}
      <SectionHeader title="Estados" titleAccent="do Componente" badge="Não Interativo" />

      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "var(--jtech-card-border)" }}>
          <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
            <Info className="inline h-4 w-4 mr-1" style={{ color: "var(--dss-info)" }} />
            DssTooltip é um <strong>Elemento Informativo Contextual não interativo</strong>. 
            Os estados hover, active, focus, disabled, loading e checked <strong>NÃO se aplicam</strong>. 
            A interatividade pertence inteiramente ao elemento disparador.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Visual</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Controle</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens Aplicados</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Visible", visual: "Tooltip exibido com conteúdo", interaction: "Prop visible=true (externo)", tokens: "bg-{color}, text-white", a11y: "role='tooltip', aria-label" },
              { state: "Hidden", visual: "Elemento oculto via v-show", interaction: "Prop visible=false (externo)", tokens: "—", a11y: "aria-describedby no disparador" },
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
        <div className="p-4 border-t" style={{ borderColor: "var(--jtech-card-border)" }}>
          <h4 className="font-medium text-sm mb-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
            Estados NÃO Aplicáveis
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Hover", "Active", "Focus", "Disabled", "Loading", "Checked"].map((state) => (
              <span
                key={state}
                className="px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "var(--jtech-text-muted)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {state} — N/A
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS (§6)
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssTooltip" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES (§7)
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
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <div
              className="p-4 rounded-lg border"
              style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
            >
              <p className="text-sm" style={{ color: "var(--jtech-text-muted)" }}>
                <Info className="inline h-4 w-4 mr-1" />
                DssTooltip <strong>não emite eventos</strong>. Sendo um elemento informativo contextual passivo,
                toda a interatividade (hover, focus, click) pertence ao elemento disparador externo.
              </p>
            </div>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo principal do tooltip (sobrescreve prop label)</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo com formatação, ícones inline ou HTML customizado</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
                { type: "Cores Semânticas", role: "Background do tooltip (dark, primary, secondary, etc.)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Identidade visual de marca (Hub, Water, Waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Fonte, tamanho e peso do texto do tooltip", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius do container", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Padding interno do tooltip", ref: "DSS_TOKEN_REFERENCE.md" },
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
                'role="tooltip" no elemento raiz',
                "aria-label customizável via prop",
                "aria-describedby no elemento disparador (responsabilidade externa)",
                "Contraste mínimo 4.5:1 em todas as cores semânticas",
                "Suporte a prefers-reduced-motion",
                "Suporte a prefers-contrast: more",
                "Suporte a forced-colors: active",
                "Touch target: N/A (componente não interativo — WCAG 2.5.5 é responsabilidade do disparador)",
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
                  { criterion: "1.1.1 Conteúdo Não-Textual", level: "A" },
                  { criterion: "1.3.1 Info e Relacionamentos", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
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
              title: "Tooltip com conteúdo interativo",
              wrong: `<DssTooltip>\n  <a href="/ajuda">Clique aqui</a>\n</DssTooltip>`,
              correct: `<DssPopover>\n  <a href="/ajuda">Saiba mais</a>\n</DssPopover>`,
              reason: "Tooltips são elementos passivos. Conteúdo interativo deve usar DssPopover ou DssMenu.",
            },
            {
              title: "Tooltip controlando sua própria visibilidade",
              wrong: `<DssTooltip @mouseenter="show" @mouseleave="hide" />`,
              correct: `<!-- No elemento disparador: -->\n<button @mouseenter="showTooltip = true">\n  Ajuda\n</button>\n<DssTooltip :visible="showTooltip" />`,
              reason: "DssTooltip é passivo. A interatividade pertence ao elemento disparador.",
            },
            {
              title: "Tooltip para informações essenciais",
              wrong: `<DssTooltip label="Campo obrigatório" />\n<!-- Usuário pode não ver o tooltip -->`,
              correct: `<DssInput label="Nome" required />\n<!-- Informação visível diretamente -->`,
              reason: "Informações críticas para a tarefa devem ser sempre visíveis, não ocultas em tooltips.",
            },
            {
              title: "Cores hardcoded em vez de tokens",
              wrong: `<DssTooltip style="background: #ff0000" />`,
              correct: `<DssTooltip color="negative" />`,
              reason: "Bypassa o sistema de tokens e quebra a brandabilidade.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssTooltip</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before)", application: "PROIBIDO — decisão congelada. ::before não é utilizado." },
                { rule: "Pseudo-elementos (::after)", application: "Permitido apenas para efeitos visuais passivos (ex: seta decorativa)." },
                { rule: "Uso de brightness()", application: "Não utilizado — cores aplicadas via classes utilitárias bg-{color}." },
                { rule: "Classificação do componente", application: "Elemento Informativo Contextual (NÃO interativo)." },
                { rule: "Touch target (WCAG 2.5.5)", application: "NÃO implementado (Opção B — componente não interativo). Responsabilidade do elemento disparador." },
                { rule: "inheritAttrs", application: "true (default) — atributos HTML (id, class, data-*) encaminhados ao <div> raiz." },
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
              "DSS/docs/compliance/seals/DssTooltip/DSSTOOLTIP_SELO_v2.2.md",
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
