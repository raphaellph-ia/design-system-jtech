// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  SlidersHorizontal,
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
  ControlSection,
  VariantSelector,
  BrandPicker,
  ColorPicker,
  FeedbackColorPicker,
  ToggleGroup,
  DSS_BRAND_COLORS,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS DO COMPONENTE — Baseado em DSSRANGE_API.md
// ============================================================================

const propsData = [
  { category: "Valor", prop: "modelValue", type: "{ min: number, max: number }", default: "Obrigatório", description: "Intervalo atual (v-model). Objeto com min e max." },
  { category: "Escala", prop: "min", type: "number", default: "0", description: "Valor mínimo da escala" },
  { category: "Escala", prop: "max", type: "number", default: "100", description: "Valor máximo da escala" },
  { category: "Escala", prop: "step", type: "number", default: "1", description: "Incremento por passo. Use 0 para contínuo." },
  { category: "Visual", prop: "markers", type: "boolean", default: "false", description: "Exibe marcadores de passo no track" },
  { category: "Visual", prop: "label", type: "boolean", default: "false", description: "Exibe tooltip com valor atual durante arrasto" },
  { category: "Visual", prop: "dense", type: "boolean", default: "false", description: "Modo compacto (touch target reduzido para 36px)" },
  { category: "Comportamento", prop: "dragRange", type: "boolean", default: "false", description: "Permite arrastar o intervalo inteiro (distância fixa entre thumbs)" },
  { category: "Comportamento", prop: "disabled", type: "boolean", default: "false", description: "Desabilita o range" },
  { category: "Comportamento", prop: "readonly", type: "boolean", default: "false", description: "Range somente leitura — exibe mas não permite interação" },
  { category: "Feedback", prop: "error", type: "boolean", default: "false", description: "Ativa estado de erro (cor --dss-feedback-error)" },
  { category: "Feedback", prop: "errorMessage", type: "string", default: "''", description: "Mensagem de erro exibida quando error=true" },
  { category: "Feedback", prop: "hint", type: "string", default: "''", description: "Texto de ajuda abaixo do controle (oculto quando error=true)" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste' | null", default: "null", description: "Marca Sansys. Substitui --dss-action-primary no contexto." },
  { category: "Acessibilidade", prop: "tabindex", type: "number | string | null", default: "null", description: "Tabindex customizado. disabled=true força -1." },
  { category: "Acessibilidade", prop: "ariaLabel", type: "string | undefined", default: "—", description: "Label acessível para screen readers (WCAG 1.3.1)" },
];

const eventsData = [
  { event: "update:modelValue", payload: "{ min: number, max: number }", description: "Intervalo mudou durante arrasto (tempo real, contínuo)" },
  { event: "change", payload: "{ min: number, max: number }", description: "Intervalo confirmado ao soltar o thumb (mouse-up / touch-end)" },
];

const exposeData = [
  { method: "focus()", description: "Foca no range programaticamente (delega ao QRange.$el)" },
  { method: "blur()", description: "Remove o foco do range programaticamente" },
];

const stepOptions = [
  { name: "0", label: "Contínuo" },
  { name: "1", label: "1" },
  { name: "5", label: "5" },
  { name: "10", label: "10" },
  { name: "25", label: "25" },
  { name: "50", label: "50" },
];

const scalePresets = [
  { name: "0-100", label: "0 — 100", min: 0, max: 100 },
  { name: "0-1000", label: "0 — 1000", min: 0, max: 1000 },
  { name: "-50-50", label: "-50 — 50", min: -50, max: 50 },
  { name: "0-10", label: "0 — 10", min: 0, max: 10 },
];

const anatomyData = {
  structure: {
    files: ["DssRange.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Wrapper div externo (QRange não é QField)",
      "Delegação 100% de drag/cálculo ao QRange",
      "Composables useRangeClasses, useRangeState, useRangeActions",
      "Hint e errorMessage como irmãos do QRange",
      "Dev warning quando ariaLabel ausente",
    ],
    tokens: [],
    codeExample: `<template>
  <div :class="wrapperClasses" :data-brand="brand">
    <QRange
      :model-value="modelValue"
      :min="min" :max="max" :step="step"
      :label="label" :markers="markers"
      :drag-range="dragRange"
      :disable="disabled" :readonly="readonly"
    />
    <span v-if="error && errorMessage" role="alert">
      {{ errorMessage }}
    </span>
    <span v-else-if="hint">{{ hint }}</span>
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais que definem o layout, tipografia e dimensões do range.",
    responsibilities: [
      "Dimensões do track e thumbs via tokens",
      "Tipografia para hint e errorMessage",
      "Touch target mínimo (48px padrão, 36px dense)",
      "Espaçamentos internos via --dss-spacing-*",
    ],
    tokens: ["--dss-font-family-sans", "--dss-font-size-xs", "--dss-touch-target-md", "--dss-spacing-2"],
    codeExample: `.dss-range {
  font-family: var(--dss-font-family-sans);
  min-height: var(--dss-touch-target-md);
  padding: var(--dss-spacing-2) 0;
}`,
  },
  variants: {
    files: ["3-variants/index.scss"],
    description: "Define variações visuais do componente. Fase 1: nenhuma variante implementada.",
    responsibilities: [
      "Fase 1: arquivo vazio (Gate Estrutural DSS)",
      "Fase 2 (planejado): variantes de tamanho, tick-label, vertical",
    ],
    tokens: [],
    codeExample: `// Fase 1: Nenhuma variante visual implementada.
// Este arquivo DEVE existir mesmo vazio (Gate Estrutural DSS).`,
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss", "index.scss"],
    description: "Camada final que aplica estados interativos, brands e acessibilidade.",
    responsibilities: [
      "Estados hover, focus, error, disabled, readonly",
      "Focus ring com --dss-shadow-focus",
      "Brand overrides: Hub, Water, Waste",
      "Cursor grab para dragRange",
      "Suporte a prefers-reduced-motion",
    ],
    tokens: ["--dss-action-primary", "--dss-hub-600", "--dss-water-500", "--dss-waste-600"],
    codeExample: `.dss-range--brand-hub {
  --dss-action-primary: var(--dss-hub-600);
}
.dss-range--drag-range {
  cursor: grab;
}`,
  },
};

// ============================================================================
// PREVIEW DO RANGE
// ============================================================================

interface DssRangePreviewProps {
  minVal: number;
  maxVal: number;
  scaleMin: number;
  scaleMax: number;
  step: number;
  markers: boolean;
  label: boolean;
  dense: boolean;
  dragRange: boolean;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  errorMessage: string;
  hint: string;
  brand: string | null;
  color: string | null;
  feedback: string | null;
  onValueChange: (min: number, max: number) => void;
}

function DssRangePreview({
  minVal,
  maxVal,
  scaleMin,
  scaleMax,
  step,
  markers,
  label,
  dense,
  dragRange,
  disabled,
  readonly: isReadonly,
  error,
  errorMessage,
  hint,
  brand,
  color,
  feedback,
  onValueChange,
}: DssRangePreviewProps) {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const [isHoveredMin, setIsHoveredMin] = useState(false);
  const [isHoveredMax, setIsHoveredMax] = useState(false);

  const range = scaleMax - scaleMin;
  const minPercent = ((minVal - scaleMin) / range) * 100;
  const maxPercent = ((maxVal - scaleMin) / range) * 100;

  const feedbackColors: Record<string, string> = {
    positive: "#4dd228",
    negative: "#d8182e",
    warning: "#fabd14",
    info: "#0cc4e9",
  };

  const getTrackColor = () => {
    if (disabled) return "#6b7280";
    if (error) return "#d8182e";
    if (brand && DSS_BRAND_COLORS[brand]) return DSS_BRAND_COLORS[brand].principal;
    if (feedback && feedbackColors[feedback]) return feedbackColors[feedback];
    if (color && DSS_SEMANTIC_COLORS[color]) return DSS_SEMANTIC_COLORS[color].bg;
    return "#1f86de";
  };

  const trackColor = getTrackColor();
  const trackHeight = dense ? 3 : 4;
  const thumbSize = dense ? 16 : 20;

  const markerCount = step > 0 ? Math.floor(range / step) + 1 : 0;
  const markerPositions = markers && step > 0
    ? Array.from({ length: markerCount }, (_, i) => ((i * step) / range) * 100)
    : [];

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isReadonly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const val = scaleMin + (pct / 100) * range;
    const snapped = step > 0 ? Math.round(val / step) * step : val;
    const clamped = Math.max(scaleMin, Math.min(scaleMax, snapped));

    const distMin = Math.abs(clamped - minVal);
    const distMax = Math.abs(clamped - maxVal);

    if (distMin <= distMax) {
      onValueChange(Math.min(clamped, maxVal), maxVal);
    } else {
      onValueChange(minVal, Math.max(clamped, minVal));
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 400, padding: "16px 0" }}>
      {/* Track */}
      <div
        style={{
          position: "relative",
          height: thumbSize + 16,
          cursor: disabled ? "not-allowed" : isReadonly ? "default" : dragRange ? "grab" : "pointer",
          opacity: disabled ? 0.4 : 1,
          userSelect: "none",
        }}
        onClick={handleTrackClick}
      >
        {/* Background track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: "#374151",
            transform: "translateY(-50%)",
          }}
        />

        {/* Active range */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: trackColor,
            transform: "translateY(-50%)",
            transition: isDragging ? "none" : "all 0.15s ease",
          }}
        />

        {/* Markers */}
        {markerPositions.map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: `${pos}%`,
              width: 2,
              height: 8,
              borderRadius: 1,
              backgroundColor: pos >= minPercent && pos <= maxPercent ? "rgba(255,255,255,0.5)" : "#6b7280",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Min Thumb */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${minPercent}%`,
            width: thumbSize,
            height: thumbSize,
            borderRadius: "50%",
            backgroundColor: trackColor,
            border: "2px solid #ffffff",
            transform: "translate(-50%, -50%)",
            cursor: disabled || isReadonly ? "default" : "pointer",
            boxShadow: isHoveredMin
              ? `0 0 0 4px ${trackColor}33, 0 2px 8px rgba(0,0,0,0.3)`
              : "0 1px 4px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.15s ease, transform 0.15s ease",
            zIndex: 2,
          }}
          onMouseEnter={() => setIsHoveredMin(true)}
          onMouseLeave={() => setIsHoveredMin(false)}
        >
          {label && (isHoveredMin || isDragging === "min") && (
            <div
              style={{
                position: "absolute",
                bottom: thumbSize + 4,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#1f2937",
                color: "#ffffff",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {minVal}
            </div>
          )}
        </div>

        {/* Max Thumb */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${maxPercent}%`,
            width: thumbSize,
            height: thumbSize,
            borderRadius: "50%",
            backgroundColor: trackColor,
            border: "2px solid #ffffff",
            transform: "translate(-50%, -50%)",
            cursor: disabled || isReadonly ? "default" : "pointer",
            boxShadow: isHoveredMax
              ? `0 0 0 4px ${trackColor}33, 0 2px 8px rgba(0,0,0,0.3)`
              : "0 1px 4px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.15s ease, transform 0.15s ease",
            zIndex: 2,
          }}
          onMouseEnter={() => setIsHoveredMax(true)}
          onMouseLeave={() => setIsHoveredMax(false)}
        >
          {label && (isHoveredMax || isDragging === "max") && (
            <div
              style={{
                position: "absolute",
                bottom: thumbSize + 4,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#1f2937",
                color: "#ffffff",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {maxVal}
            </div>
          )}
        </div>
      </div>

      {/* Scale labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>{scaleMin}</span>
        <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
          {minVal} — {maxVal}
        </span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>{scaleMax}</span>
      </div>

      {/* Error / Hint */}
      {error && errorMessage ? (
        <span
          style={{ display: "block", marginTop: 6, fontSize: 12, color: "#d8182e", fontWeight: 500 }}
          role="alert"
        >
          {errorMessage}
        </span>
      ) : hint ? (
        <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "#9ca3af" }}>{hint}</span>
      ) : null}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssRangePage() {
  // Playground state
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedStep, setSelectedStep] = useState("1");
  const [selectedScale, setSelectedScale] = useState("0-100");
  const [rangeMin, setRangeMin] = useState(20);
  const [rangeMax, setRangeMax] = useState(80);
  const [hintText, setHintText] = useState("Arraste os thumbs para ajustar");
  const [errorMessageText, setErrorMessageText] = useState("Intervalo inválido");
  const [booleanStates, setBooleanStates] = useState({
    markers: false,
    label: false,
    dense: false,
    dragRange: false,
    disabled: false,
    readonly: false,
    error: false,
  });

  const currentScale = scalePresets.find(s => s.name === selectedScale) || scalePresets[0];

  // Color Application Domain — mutual exclusivity (v3.2)
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
    setSelectedFeedback(null);
  };

  const handleFeedbackChange = (feedback: string) => {
    setSelectedFeedback(feedback);
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

  const handleScaleChange = (scaleName: string) => {
    setSelectedScale(scaleName);
    const scale = scalePresets.find(s => s.name === scaleName);
    if (scale) {
      // Reset range values proportionally within new scale
      const range = scale.max - scale.min;
      setRangeMin(Math.round(scale.min + range * 0.2));
      setRangeMax(Math.round(scale.min + range * 0.8));
    }
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const handleValueChange = (min: number, max: number) => {
    setRangeMin(min);
    setRangeMax(max);
  };

  const generateCode = () => {
    const props: string[] = [];
    props.push(`v-model="rangeValue"`);
    if (currentScale.min !== 0) props.push(`:min="${currentScale.min}"`);
    if (currentScale.max !== 100) props.push(`:max="${currentScale.max}"`);
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedFeedback) {
      props.push(`color="${selectedFeedback}"`);
    } else if (selectedColor && selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    if (Number(selectedStep) !== 1) props.push(`:step="${selectedStep}"`);
    if (booleanStates.markers) props.push("markers");
    if (booleanStates.label) props.push("label");
    if (booleanStates.dense) props.push("dense");
    if (booleanStates.dragRange) props.push("drag-range");
    if (booleanStates.disabled) props.push("disabled");
    if (booleanStates.readonly) props.push("readonly");
    if (booleanStates.error) {
      props.push("error");
      if (errorMessageText) props.push(`error-message="${errorMessageText}"`);
    }
    if (!booleanStates.error && hintText) props.push(`hint="${hintText}"`);
    props.push('aria-label="Selecione o intervalo"');

    return `<!-- rangeValue = { min: ${rangeMin}, max: ${rangeMax} } -->\n<DssRange\n  ${props.join("\n  ")}\n/>`;
  };

  const visualToggles = [
    { name: "markers", label: "Markers" },
    { name: "label", label: "Label (Tooltip)" },
    { name: "dense", label: "Dense" },
  ];

  const stateToggles = [
    { name: "disabled", label: "Disabled" },
    { name: "readonly", label: "Readonly" },
    { name: "error", label: "Error" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO
       * ================================================================ */}
      <PageHeader
        icon={SlidersHorizontal}
        badge="Golden Context: DssSlider"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssRange"
        subtitle="DssRange é o componente de seleção de intervalo numérico com dois thumbs, utilizado para definir faixas de valores como preço, datas ou métricas. Ele é um wrapper DSS sobre o QRange do Quasar, oferecendo brandabilidade multi-marca, tokens semânticos e suporte a drag de intervalo completo."
        subtitleHighlights={["dois thumbs", "brandabilidade multi-marca", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2.0", variant: "info" },
          { label: "Conformant", variant: "success" },
          { label: "Quasar QRange", variant: "info" },
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
              "Filtros de faixa de preço em e-commerce ou dashboards",
              "Seleção de intervalo de datas, horários ou períodos",
              "Definir limites mínimo e máximo para métricas ou KPIs",
              "Filtros de faixa em tabelas e listas com dados numéricos",
              "Configuração de thresholds em alertas ou monitoramento",
              "Qualquer entrada que exija dois valores numéricos relacionados",
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
                { scenario: "Valor único (sem intervalo)", alt: "DssSlider" },
                { scenario: "Entrada de valor exato", alt: "DssInput type=number" },
                { scenario: "Seleção entre opções discretas", alt: "DssSelect ou DssRadio" },
                { scenario: "Toggle binário on/off", alt: "DssToggle" },
                { scenario: "Progresso de operação", alt: "DssProgressBar" },
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
       * SEÇÃO 3: PLAYGROUND INTERATIVO
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Range"
        description="Explore TODAS as props visuais e comportamentais do DssRange em tempo real. Cada prop da API possui um seletor correspondente."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="280px"
        previewContent={
          <DssRangePreview
            minVal={rangeMin}
            maxVal={rangeMax}
            scaleMin={currentScale.min}
            scaleMax={currentScale.max}
            step={Number(selectedStep)}
            markers={booleanStates.markers}
            label={booleanStates.label}
            dense={booleanStates.dense}
            dragRange={booleanStates.dragRange}
            disabled={booleanStates.disabled}
            readonly={booleanStates.readonly}
            error={booleanStates.error}
            errorMessage={booleanStates.error ? errorMessageText : ""}
            hint={!booleanStates.error ? hintText : ""}
            brand={selectedBrand}
            color={selectedColor}
            feedback={selectedFeedback}
            onValueChange={handleValueChange}
          />
        }
        controls={
          <ControlGrid columns={8}>
            {/* 1. Color (semântica) */}
            <ColorPicker
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            {/* 2. Feedback */}
            <FeedbackColorPicker
              colors={DSS_FEEDBACK_COLORS}
              selectedColor={selectedFeedback}
              onSelect={handleFeedbackChange}
            />

            {/* 3. Brand */}
            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            {/* 4. Escala (min/max) */}
            <ControlSection label="Escala (min / max)">
              {scalePresets.map((s) => (
                <PlaygroundButton
                  key={s.name}
                  onClick={() => handleScaleChange(s.name)}
                  isSelected={selectedScale === s.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {s.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            {/* 5. Step */}
            <ControlSection label="Step">
              {stepOptions.map((s) => (
                <PlaygroundButton
                  key={s.name}
                  onClick={() => setSelectedStep(s.name)}
                  isSelected={selectedStep === s.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {s.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            {/* 6. Visual */}
            <ToggleGroup
              label="Visual"
              options={visualToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* 7. Estados */}
            <ToggleGroup
              label="Estados"
              options={stateToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* 8. Comportamento */}
            <ControlSection label="Comportamento">
              <PlaygroundButton
                onClick={() => toggleBooleanState("dragRange")}
                isSelected={booleanStates.dragRange}
                selectedBg="var(--dss-positive)"
                selectedColor="#ffffff"
                selectedBorder="var(--dss-positive)"
              >
                {booleanStates.dragRange && "✓ "}Drag Range
              </PlaygroundButton>
            </ControlSection>
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* Hint & Error Message inputs */}
      <div
        className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <div className="space-y-1">
          <label className="text-sm font-semibold block" style={{ color: "var(--jtech-heading-tertiary)" }}>
            Hint Text
          </label>
          <input
            type="text"
            value={hintText}
            onChange={(e) => setHintText(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm border"
            style={{
              backgroundColor: "var(--jtech-card-bg)",
              borderColor: "var(--jtech-card-border)",
              color: "var(--jtech-text-body)",
            }}
            placeholder="Texto de ajuda abaixo do range"
          />
          <span className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>
            Visível quando error=false. Prop: <code className="font-mono" style={{ color: "var(--dss-jtech-accent)" }}>hint</code>
          </span>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold block" style={{ color: "var(--jtech-heading-tertiary)" }}>
            Error Message
          </label>
          <input
            type="text"
            value={errorMessageText}
            onChange={(e) => setErrorMessageText(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm border"
            style={{
              backgroundColor: "var(--jtech-card-bg)",
              borderColor: "var(--jtech-card-border)",
              color: "var(--jtech-text-body)",
            }}
            placeholder="Mensagem de erro"
          />
          <span className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>
            Visível quando error=true. Prop: <code className="font-mono" style={{ color: "var(--dss-jtech-accent)" }}>errorMessage</code>
          </span>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 4: ESTADOS INTERATIVOS
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
              { state: "Default", visual: "Track cinza + range ativo colorido", interaction: "Thumbs arrastáveis", tokens: "--dss-action-primary, --dss-gray-300", a11y: "—" },
              { state: "Hover", visual: "Thumb com halo expandido", interaction: "Cursor sobre thumb", tokens: "--dss-action-primary", a11y: "—" },
              { state: "Focus", visual: "Focus ring 2px no thumb ativo", interaction: "Navegação por teclado", tokens: "--dss-shadow-focus", a11y: "WCAG 2.4.7" },
              { state: "Drag", visual: "Label tooltip visível (se label=true)", interaction: "Arrasto contínuo", tokens: "--dss-duration-200", a11y: "aria-valuenow" },
              { state: "Error", visual: "Track e thumbs em vermelho", interaction: "Interação mantida", tokens: "--dss-feedback-error", a11y: "aria-describedby, role=alert" },
              { state: "Disabled", visual: "Opacidade reduzida (0.4)", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled, tabindex=-1" },
              { state: "Readonly", visual: "Aparência normal, sem cursor pointer", interaction: "Não editável", tokens: "—", a11y: "aria-readonly" },
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
       * SEÇÃO 5: ANATOMIA 4 CAMADAS
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssRange" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES
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

          {/* Eventos */}
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
                {eventsData.map((e, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{e.event}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{e.payload}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{e.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Expose */}
          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Métodos Expostos (defineExpose)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Método</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exposeData.map((m, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{m.method}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{m.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.2 Props QRange não expostas */}
      <CollapsibleSection icon={AlertTriangle} title="Props QRange" titleAccent="Não Expostas (Fase 1)">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            As seguintes props do QRange <strong>não são expostas</strong> pelo DssRange na Fase 1.
            Passá-las via <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>v-bind</code> ou atributo HTML pode funcionar via <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>$attrs</code>, mas não é suportado oficialmente.
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop QRange</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { prop: "color", type: "string", reason: "Governança de cor: controlada exclusivamente por --dss-action-primary via SCSS. Expor color quebraria o Token First." },
                { prop: "snap", type: "boolean", reason: "Fase 1: comportamento não incluído no escopo mínimo. Disponível via $attrs." },
                { prop: "labelAlways", type: "boolean", reason: "Fase 1: tooltip permanente aumenta complexidade visual. Revisão para Fase 2." },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.prop}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.type}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            Este componente utiliza <strong>34 tokens</strong> distribuídos nas seguintes categorias:
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
                { type: "Tipografia", role: "Fonte e peso para hint/errorMessage", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Touch targets (md: 48px, sm: 36px) e espaçamentos", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Ação / Cor Principal", role: "Cor do track ativo e thumbs (--dss-action-primary)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Superfícies", role: "Track inativo (--dss-surface-muted) e disabled (--dss-surface-disabled)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Cores Gray", role: "Track background e estados de marcadores", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Feedback", role: "Estado de erro (--dss-feedback-error)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Estado disabled (--dss-opacity-disabled: 0.4)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Sombras / Focus", role: "Focus ring nos thumbs (--dss-shadow-focus)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Espessuras thin/md/thick para elementos do track", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de arrasto e hover (--dss-duration-200)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Hub (--dss-hub-600), Water (--dss-water-500), Waste (--dss-waste-600)", ref: "DSS_TOKEN_REFERENCE.md" },
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

      {/* 7.4 CSS Classes Públicas */}
      <CollapsibleSection icon={Code} title="CSS Classes" titleAccent="Públicas">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Classe</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Condição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { cls: ".dss-range", condition: "Sempre presente (wrapper externo)" },
                { cls: ".dss-range--focused", condition: "Quando o range está com foco (qualquer thumb)" },
                { cls: ".dss-range--error", condition: "error=true" },
                { cls: ".dss-range--disabled", condition: "disabled=true" },
                { cls: ".dss-range--readonly", condition: "readonly=true" },
                { cls: ".dss-range--dense", condition: "dense=true" },
                { cls: ".dss-range--drag-range", condition: "dragRange=true — aplica cursor: grab" },
                { cls: ".dss-range--brand-hub", condition: 'brand="hub" ou [data-brand="hub"] no ancestral' },
                { cls: ".dss-range--brand-water", condition: 'brand="water" ou [data-brand="water"] no ancestral' },
                { cls: ".dss-range--brand-waste", condition: 'brand="waste" ou [data-brand="waste"] no ancestral' },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.cls}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.5 Acessibilidade WCAG */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "ariaLabel fortemente recomendado (dev warning quando ausente)",
                "errorMessage associada via aria-describedby",
                "role='alert' + aria-live='polite' na mensagem de erro",
                "Focus ring visível nos thumbs",
                "Touch target mínimo 48px (36px no modo dense)",
                "tabindex=-1 automático quando disabled",
                "Navegação por teclado delegada ao QRange nativo",
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
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "2.5.5 Tamanho do Alvo (Melhorado)", level: "AAA" },
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : item.level === "AAA" ? "rgba(196, 30, 58, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AA" ? "var(--dss-positive)" : item.level === "AAA" ? "var(--dss-jtech-accent)" : "var(--dss-action-primary)",
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

      {/* 7.6 Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Usar prop color do QRange diretamente",
              wrong: '<DssRange color="orange" v-model="val" />',
              correct: '<DssRange brand="hub" v-model="val" />',
              reason: "Governança de cor: cor é controlada exclusivamente por --dss-action-primary via SCSS. Usar color bypassa o Token First.",
            },
            {
              title: "Range sem ariaLabel",
              wrong: '<DssRange v-model="val" />',
              correct: '<DssRange v-model="val" aria-label="Faixa de preço" />',
              reason: "Range sliders sem rótulo verbal violam WCAG 1.3.1 (Name, Role, Value). Dev warning emitido em desenvolvimento.",
            },
            {
              title: "Usar valor escalar em vez de objeto",
              wrong: '<DssRange v-model="50" />',
              correct: '<DssRange v-model="{ min: 20, max: 80 }" />',
              reason: "DssRange exige um objeto { min, max }, diferente do DssSlider que aceita escalar.",
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

      {/* 7.7 Vinculantes DSS v2.2 */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.2">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssRange</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Token First", application: "34 tokens utilizados. Nenhum valor hardcoded no SCSS." },
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizado diretamente — delegado ao QRange nativo." },
                { rule: "Uso de brightness()", application: "Não utilizado — estados são controlados via tokens de opacidade." },
                { rule: "Entry Point Wrapper", application: "DssRange.vue é re-export puro de 1-structure/DssRange.ts.vue." },
                { rule: "inheritAttrs: false", application: "$attrs encaminhados ao QRange, não ao wrapper div." },
                { rule: "Golden Context", application: "DssSlider (Golden Reference — mesma arquitetura, dois thumbs)." },
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

      {/* 7.8 Referências Normativas */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "DSSRANGE_API.md",
              "DssSlider (Golden Reference — arquitetura idêntica)",
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
