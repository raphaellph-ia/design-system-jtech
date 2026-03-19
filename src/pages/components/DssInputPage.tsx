// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  Eye,
  EyeOff,
  Search,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
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
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE
// ============================================================================

const variants = [
  { name: "outlined", label: "Outlined", desc: "Borda visível (padrão Quasar)" },
  { name: "filled", label: "Filled", desc: "Background preenchido, sem borda" },
  { name: "standout", label: "Standout", desc: "Background com destaque no focus" },
  { name: "borderless", label: "Borderless", desc: "Sem borda, apenas linha inferior" },
];

const inputTypes = [
  { name: "text", label: "Text" },
  { name: "email", label: "Email" },
  { name: "password", label: "Password" },
  { name: "search", label: "Search" },
  { name: "tel", label: "Telefone" },
  { name: "number", label: "Number" },
  { name: "url", label: "URL" },
  { name: "date", label: "Date" },
  { name: "time", label: "Time" },
  { name: "datetime-local", label: "DateTime" },
];

const propsData = [
  { category: "Valor", prop: "modelValue", type: "String | Number", default: "''", description: "Valor do input (v-model)" },
  { category: "Valor", prop: "type", type: "'text' | 'email' | 'password' | ...", default: "'text'", description: "Tipo do input HTML" },
  { category: "Valor", prop: "placeholder", type: "String", default: "''", description: "Texto placeholder" },
  { category: "Label", prop: "label", type: "String", default: "''", description: "Label do campo" },
  { category: "Label", prop: "hint", type: "String", default: "''", description: "Texto de ajuda abaixo do input" },
  { category: "Variantes", prop: "variant", type: "'outlined' | 'filled' | 'standout' | 'borderless'", default: "'outlined'", description: "Estilo visual do input" },
  { category: "Variantes", prop: "color", type: "'primary' | 'secondary' | ...", default: "'primary'", description: "Cor semântica (focus)" },
  { category: "Estados", prop: "error", type: "Boolean | String", default: "false", description: "Estado de erro (string = mensagem)" },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Estado desabilitado" },
  { category: "Estados", prop: "readonly", type: "Boolean", default: "false", description: "Apenas leitura" },
  { category: "Estados", prop: "loading", type: "Boolean", default: "false", description: "Exibe spinner de loading" },
  { category: "Ícones", prop: "prefix", type: "String | Slot", default: "null", description: "Ícone/conteúdo à esquerda" },
  { category: "Ícones", prop: "suffix", type: "String | Slot", default: "null", description: "Ícone/conteúdo à direita" },
  { category: "Ações", prop: "clearable", type: "Boolean", default: "false", description: "Exibe botão de limpar" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Sansys" },
  { category: "Densidade", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta" },
];

const anatomyData = {
  structure: {
    files: ["DssInput.ts.vue"],
    description: "Define a estrutura HTML do input: container, label, input nativo, slots (prepend/append), hint/error.",
    responsibilities: ["Template HTML semântico", "Props TypeScript tipadas", "Lógica de estados (focus, error)", "Acessibilidade ARIA"],
    tokens: [],
    codeExample: `<template>
  <div :class="wrapperClasses">
    <label :for="inputId">{{ label }}</label>
    <div class="dss-input__field">
      <slot name="prepend" />
      <input :id="inputId" v-model="modelValue" />
      <slot name="append" />
    </div>
  </div>
</template>`,
  },
  composition: {
    files: ["_composition.scss"],
    description: "Layout base do input: flexbox, espaçamentos, tipografia, reset de estilos nativos.",
    responsibilities: ["Display flex e alinhamento", "Padding e spacing internos", "Font-size e line-height"],
    tokens: ["--dss-spacing-*", "--dss-font-size-*", "--dss-touch-target-*"],
    codeExample: `.dss-input__field {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  height: var(--dss-touch-target-md);
  padding: 0 var(--dss-spacing-3);
}`,
  },
  variants: {
    files: ["_variants.scss"],
    description: "Variações visuais do input: outlined, filled, standout, borderless.",
    responsibilities: ["Estilos por variante", "Comportamento de borda", "Background por estado"],
    tokens: ["--dss-radius-*", "--dss-border-*"],
    codeExample: `.dss-input--outlined {
  border: 1px solid var(--dss-gray-300);
  border-radius: var(--dss-radius-sm);
}`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "Camada final: cores semânticas, estados (focus, error, disabled), brandability.",
    responsibilities: ["Cores de focus por tema", "Estados visuais (error, success)", "Paletas de marca"],
    tokens: ["--dss-action-*", "--dss-feedback-*", "--dss-hub-*", "--dss-water-*", "--dss-waste-*"],
    codeExample: `.dss-input--focused {
  border-color: var(--dss-action-primary);
  box-shadow: var(--dss-shadow-focus);
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO INPUT
// ============================================================================

interface DssInputPreviewProps {
  variant: string;
  color: string;
  label: string;
  placeholder: string;
  type: string;
  error?: boolean | string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  dense?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hint?: string;
  brand?: string | null;
  showPasswordToggle?: boolean;
  isDarkMode?: boolean;
  stackLabel?: boolean;
  loading?: boolean;
  required?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

function DssInputPreview({
  variant,
  color,
  label,
  placeholder,
  type,
  error = false,
  disabled = false,
  readonly = false,
  clearable = false,
  dense = false,
  prefix,
  suffix,
  hint,
  brand = null,
  showPasswordToggle = false,
  isDarkMode = false,
  stackLabel = false,
  loading = false,
  required = false,
  before,
  after,
}: DssInputPreviewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [focused, setFocused] = useState(false);

  const getColors = () => {
    if (error) {
      return {
        border: "#d8182e",
        focusShadow: "0 0 0 3px rgba(216,24,46,0.25)",
        labelColor: "#d8182e",
        iconColor: "#d8182e",
      };
    }
    if (brand && DSS_BRAND_COLORS[brand]) {
      const brandData = DSS_BRAND_COLORS[brand];
      return {
        border: brandData.principal,
        focusShadow: `0 0 0 3px ${brandData.principal}40`,
        labelColor: brandData.principal,
        iconColor: brandData.principal,
      };
    }
    const colorData = DSS_SEMANTIC_COLORS[color];
    if (colorData) {
      return {
        border: colorData.bg,
        focusShadow: `0 0 0 3px ${colorData.bg}40`,
        labelColor: colorData.bg,
        iconColor: colorData.bg,
      };
    }
    return {
      border: "#1f86de",
      focusShadow: "0 0 0 3px rgba(31,134,222,0.25)",
      labelColor: "#1f86de",
      iconColor: "#1f86de",
    };
  };

  const colors = getColors();

  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      height: dense ? "36px" : "44px",
      padding: "0 12px",
      fontSize: "14px",
      fontFamily: "inherit",
      color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545",
      backgroundColor: disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#1a1a2e" : "#ffffff",
      borderRadius: "4px",
      transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case "outlined":
        return {
          ...base,
          border: focused ? `2px solid ${colors.border}` : `1px solid ${error ? "#d8182e" : isDarkMode ? "#404040" : "#d4d4d4"}`,
          boxShadow: focused ? colors.focusShadow : "none",
        };
      case "filled":
        return {
          ...base,
          border: "none",
          borderBottom: focused ? `2px solid ${colors.border}` : `1px solid ${error ? "#d8182e" : isDarkMode ? "#404040" : "#d4d4d4"}`,
          backgroundColor: disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#252538" : "#fafafa",
          borderRadius: "4px 4px 0 0",
        };
      case "standout":
        return {
          ...base,
          border: "none",
          backgroundColor: focused
            ? brand
              ? `${DSS_BRAND_COLORS[brand]?.principal}15`
              : `${colors.border}15`
            : disabled
              ? (isDarkMode ? "#2a2a2a" : "#f5f5f5")
              : isDarkMode ? "#252538" : "#f0f0f0",
          boxShadow: focused ? colors.focusShadow : "none",
        };
      case "borderless":
        return {
          ...base,
          border: "none",
          borderBottom: focused ? `2px solid ${colors.border}` : `1px solid transparent`,
          backgroundColor: "transparent",
          borderRadius: "0",
        };
      default:
        return base;
    }
  };

  const actualType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full max-w-sm">
      {/* Before slot */}
      {before && <div className="mb-1 text-xs" style={{ color: isDarkMode ? "#808080" : "#737373" }}>{before}</div>}

      {/* Label */}
      {label && (
        <label
          className={`block font-medium mb-1.5 ${stackLabel ? "text-xs uppercase tracking-wider" : "text-sm"}`}
          style={{
            color: error ? "#d8182e" : focused ? colors.labelColor : isDarkMode ? "#a0a0a0" : "#454545",
            transition: "color 150ms ease",
          }}
        >
          {label}{required && <span style={{ color: "#d8182e" }}> *</span>}
        </label>
      )}

      <div style={getVariantStyles()}>
        {prefix && <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>{prefix}</span>}

        <input
          type={actualType}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled || loading}
          readOnly={readonly}
          className="flex-1 bg-transparent outline-none border-none"
          style={{
            color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545",
            fontSize: "14px",
          }}
          aria-required={required || undefined}
        />

        {/* Loading spinner */}
        {loading && (
          <span className="flex-shrink-0 animate-spin" style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </span>
        )}

        {clearable && internalValue && !disabled && !readonly && !loading && (
          <button
            onClick={() => setInternalValue("")}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
          >
            <X size={16} />
          </button>
        )}

        {type === "password" && showPasswordToggle && !loading && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {suffix && !loading && <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>{suffix}</span>}

        {error && <AlertCircle size={18} style={{ color: "#d8182e", flexShrink: 0 }} />}
      </div>

      {(hint || (typeof error === "string" && error)) && (
        <p className="text-xs mt-1.5" style={{ color: error ? "#d8182e" : isDarkMode ? "#707070" : "#a3a3a3" }}>
          {typeof error === "string" ? error : hint}
        </p>
      )}

      {/* After slot */}
      {after && <div className="mt-1 text-xs" style={{ color: isDarkMode ? "#808080" : "#737373" }}>{after}</div>}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssInputPage() {
  const [selectedVariant, setSelectedVariant] = useState("outlined");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedType, setSelectedType] = useState("text");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    error: false,
    disabled: false,
    readonly: false,
    clearable: false,
    dense: false,
    loading: false,
    required: false,
    stackLabel: false,
    prefix: false,
    suffix: false,
    hint: false,
    before: false,
    after: false,
  });

  // Exclusividade Color × Brand (v3.2 — substituição implícita)
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

  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  const getPrefixIcon = () => {
    switch (selectedType) {
      case "email": return <Mail size={18} />;
      case "search": return <Search size={18} />;
      case "tel": return <Phone size={18} />;
      case "password": return <Lock size={18} />;
      default: return <User size={18} />;
    }
  };

  const generateCode = () => {
    const props: string[] = [];
    if (selectedVariant !== "outlined") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor && selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    if (selectedType !== "text") props.push(`type="${selectedType}"`);
    props.push('label="Email"');
    if (booleanStates.stackLabel) props.push("stack-label");
    props.push('placeholder="Digite seu email"');
    if (booleanStates.error) props.push(':error="true"\n  error-message="Este campo é obrigatório"');
    if (booleanStates.disabled) props.push("disabled");
    if (booleanStates.readonly) props.push("readonly");
    if (booleanStates.loading) props.push("loading");
    if (booleanStates.required) props.push("required");
    if (booleanStates.clearable) props.push("clearable");
    if (booleanStates.dense) props.push("dense");
    if (booleanStates.hint) props.push('hint="Informe um email válido"');

    const hasSlots = booleanStates.prefix || booleanStates.suffix || booleanStates.before || booleanStates.after;

    let code = `<DssInput\n  ${props.join("\n  ")}\n  v-model="value"`;

    if (hasSlots) {
      code += ">\n";
      if (booleanStates.before) code += '  <template #before>\n    <q-icon name="event" />\n  </template>\n';
      if (booleanStates.prefix) code += '  <template #prepend>\n    <q-icon name="mail" />\n  </template>\n';
      if (booleanStates.suffix) code += '  <template #append>\n    <q-icon name="search" />\n  </template>\n';
      if (booleanStates.after) code += '  <template #after>\n    <q-btn round dense flat icon="send" />\n  </template>\n';
      code += "</DssInput>";
    } else {
      code += "\n/>";
    }

    return code;
  };

  const stateOptions = [
    { name: "error", label: "Error" },
    { name: "disabled", label: "Disabled" },
    { name: "readonly", label: "Readonly" },
    { name: "loading", label: "Loading" },
    { name: "required", label: "Required" },
  ];

  const featureOptions = [
    { name: "clearable", label: "Clearable" },
    { name: "dense", label: "Dense" },
    { name: "stackLabel", label: "Stack Label" },
  ];

  const slotOptions = [
    { name: "prefix", label: "Prepend" },
    { name: "suffix", label: "Append" },
    { name: "before", label: "Before" },
    { name: "after", label: "After" },
    { name: "hint", label: "Hint" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (§1, §2)
       * ================================================================ */}
      <PageHeader
        icon={FileText}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssInput"
        subtitle="DssInput é o componente responsável pela entrada de dados do usuário em formulários e fluxos interativos. Oferece suporte a diferentes tipos de entrada, variantes visuais e feedbacks contextuais, integrando-se ao sistema de brandabilidade multi-marca e tokens DSS para garantir consistência visual em todo o produto."
        subtitleHighlights={["brandabilidade multi-marca", "tokens DSS", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.3.0", variant: "info" },
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
              "Formulários de cadastro, login e edição de dados",
              "Campos de busca e filtragem em listas e tabelas",
              "Entrada de dados estruturados (email, telefone, senha)",
              "Fluxos de validação com feedback visual em tempo real",
              "Inputs com slots para ícones, prefixos e sufixos contextuais",
              "Campos em contextos multi-marca com brandabilidade",
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
                { scenario: "Seleção entre opções pré-definidas", alt: "DssSelect" },
                { scenario: "Texto longo de múltiplas linhas", alt: "DssTextarea" },
                { scenario: "Alternância entre dois estados", alt: "DssToggle / DssCheckbox" },
                { scenario: "Seleção de data ou horário", alt: "DssDatePicker" },
                { scenario: "Upload de arquivos", alt: "DssFileUpload" },
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
        title="Configure o Input"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssInputPreview
            variant={selectedVariant}
            color={effectiveColor}
            label="Email"
            placeholder="Digite seu email"
            type={selectedType}
            error={booleanStates.error ? "Este campo é obrigatório" : false}
            disabled={booleanStates.disabled}
            readonly={booleanStates.readonly}
            clearable={booleanStates.clearable}
            dense={booleanStates.dense}
            loading={booleanStates.loading}
            required={booleanStates.required}
            stackLabel={booleanStates.stackLabel}
            prefix={booleanStates.prefix ? getPrefixIcon() : undefined}
            suffix={booleanStates.suffix ? <Search size={18} /> : undefined}
            hint={booleanStates.hint ? "Informe um email válido" : undefined}
            brand={selectedBrand}
            before={booleanStates.before ? <span className="text-xs">📅</span> : undefined}
            after={booleanStates.after ? <span className="text-xs">📤</span> : undefined}
            showPasswordToggle={selectedType === "password"}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={5}>
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />
            <VariantSelector
              label="Type"
              variants={inputTypes.map((t) => ({ name: t.name, label: t.label }))}
              selectedVariant={selectedType}
              onSelect={setSelectedType}
            />
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
              label="Estados"
              options={stateOptions}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
            <ToggleGroup
              label="Features"
              options={featureOptions}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
            <ToggleGroup
              label="Slots"
              options={slotOptions}
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
              { state: "Default", visual: "Borda neutra, label e placeholder visíveis", interaction: "Pronto para interação", tokens: "--dss-border-width-thin, --dss-gray-300", a11y: "—" },
              { state: "Hover", visual: "Borda levemente mais escura", interaction: "Pointer over", tokens: "--dss-duration-fast", a11y: "—" },
              { state: "Focus", visual: "Borda 2px na cor semântica, focus ring", interaction: "Teclado / clique", tokens: "--dss-shadow-focus, --dss-border-width-md", a11y: "WCAG 2.4.7" },
              { state: "Error", visual: "Borda vermelha, ícone de alerta, mensagem de erro", interaction: "Validação falhou", tokens: "--dss-feedback-error", a11y: "aria-invalid, aria-describedby" },
              { state: "Disabled", visual: "Opacidade reduzida, cursor not-allowed", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Readonly", visual: "Aparência normal, sem edição", interaction: "Apenas leitura", tokens: "—", a11y: "aria-readonly" },
              { state: "Loading", visual: "Spinner no lugar do sufixo", interaction: "Bloqueia interação", tokens: "--dss-duration-fast", a11y: "aria-busy" },
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
      <AnatomySection componentName="DssInput" layers={anatomyData} />

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
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Evento</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Payload</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { event: "update:modelValue", payload: "String | Number", desc: "Emitido ao alterar o valor do input (v-model)" },
                  { event: "focus", payload: "FocusEvent", desc: "Emitido quando o input recebe foco" },
                  { event: "blur", payload: "FocusEvent", desc: "Emitido quando o input perde foco" },
                  { event: "clear", payload: "void", desc: "Emitido quando o botão clearable é acionado" },
                ].map((e, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{e.event}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{e.payload}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{e.desc}</TableCell>
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
              {[
                { slot: "prepend", desc: "Conteúdo à esquerda do input", usage: "Ícones contextuais (email, busca, etc.)" },
                { slot: "append", desc: "Conteúdo à direita do input", usage: "Ícones de ação, botões de toggle" },
                { slot: "label", desc: "Substituição do label padrão", usage: "Labels complexos com badges ou tooltips" },
                { slot: "hint", desc: "Substituição do hint padrão", usage: "Hints com formatação rica" },
              ].map((s, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{s.slot}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{s.desc}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{s.usage}</TableCell>
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
                { type: "Cores Semânticas", role: "Cor de borda e focus ring por estado (primary, secondary, etc.)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Feedback Tokens", role: "Estados de erro, sucesso e warning no input", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Identidade visual multi-marca (Hub, Water, Waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Altura do input e touch targets (dense / padrão)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Padding interno e gap entre ícones e texto", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Font-size do texto e placeholder", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius e espessura de borda por variante", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de focus, hover e estados", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Opacidade no estado disabled", ref: "DSS_TOKEN_REFERENCE.md" },
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
                "Label associado via for/id ao input nativo",
                "aria-invalid quando em estado de erro",
                "aria-describedby vinculado à mensagem de erro/hint",
                "aria-disabled no estado desabilitado",
                "aria-readonly no estado somente leitura",
                "Focus ring visível com --dss-shadow-focus",
                "Contraste mínimo 4.5:1 em todos os estados",
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
                  { criterion: "1.3.1 Informações e Relações", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "3.3.1 Identificação de Erro", level: "A" },
                  { criterion: "3.3.2 Labels ou Instruções", level: "A" },
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
              title: "Input sem label associado",
              wrong: '<DssInput placeholder="Email" />',
              correct: '<DssInput label="Email" placeholder="Digite seu email" />',
              reason: "WCAG 3.3.2 exige labels visíveis. Placeholders não substituem labels.",
            },
            {
              title: "Validação sem feedback visual",
              wrong: 'if (!valid) alert("Erro")',
              correct: '<DssInput error="Este campo é obrigatório" />',
              reason: "Erros devem ser comunicados inline, não via alert. WCAG 3.3.1.",
            },
            {
              title: "Cores hardcoded em vez de tokens",
              wrong: '<DssInput style="border-color: #ff0000;" />',
              correct: '<DssInput color="negative" />',
              reason: "Bypassa o sistema de tokens e quebra a brandabilidade e temas.",
            },
            {
              title: "Usar DssInput para seleção entre opções",
              wrong: '<DssInput placeholder="Selecione..." />',
              correct: '<DssSelect :options="items" />',
              reason: "Inputs de texto livre não comunicam opções disponíveis ao usuário.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssInput</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Utilizado em ::after para linha de focus na variante borderless" },
                { rule: "Uso de brightness()", application: "Não utilizado — estados controlados via tokens de opacidade e border-color" },
                { rule: "Classificação do componente", application: "Action Component (entrada de dados interativa)" },
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
              "PLAYGROUND_STANDARD.md (v3.2)",
              "COMPONENT_PAGE_STRUCTURE.md (v2.3)",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <code className="text-sm font-mono" style={{ color: "var(--dss-jtech-accent)" }}>{ref}</code>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
