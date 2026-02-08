import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DssTabs, DssTabsContent, DssTabsList, DssTabsTrigger } from "@/components/ui/dss-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import {
  Copy,
  Check,
  Layers,
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
  CheckCircle2,
  Info,
  X,
  Globe,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Importar sistema de Playground UNIFICADO
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
// DADOS ESPECÍFICOS DO DSSINPUT
// ============================================================================

// Variantes Visuais do DssInput
const variants = [
  { name: "outlined", label: "Outlined", desc: "Borda visível (padrão Quasar)", hasOutline: true },
  { name: "filled", label: "Filled", desc: "Background preenchido, sem borda", hasOutline: false },
  { name: "standout", label: "Standout", desc: "Background com destaque no focus", hasOutline: false },
  { name: "borderless", label: "Borderless", desc: "Sem borda, apenas linha inferior", hasOutline: false },
];

// Tipos de Input
const inputTypes = [
  { name: "text", label: "Text", icon: FileText },
  { name: "email", label: "Email", icon: Mail },
  { name: "password", label: "Password", icon: Lock },
  { name: "search", label: "Search", icon: Search },
  { name: "tel", label: "Telefone", icon: Phone },
];

// Props API
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

// Tokens organizados por categoria
const tokensUsed = [
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Borda focus primary" },
  { category: "Action", token: "--dss-action-secondary", value: "#26a69a", usage: "Borda focus secondary" },
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Borda/ícone success" },
  { category: "Feedback", token: "--dss-feedback-error", value: "#d8182e", usage: "Borda/ícone error" },
  { category: "Feedback", token: "--dss-feedback-warning", value: "#fabd14", usage: "Borda/ícone warning" },
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Focus border Hub" },
  { category: "Brand Hub", token: "--dss-hub-100", value: "#fef2d6", usage: "Background filled Hub" },
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Focus border Water" },
  { category: "Brand Water", token: "--dss-water-100", value: "#e0eefe", usage: "Background filled Water" },
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Focus border Waste" },
  { category: "Brand Waste", token: "--dss-waste-100", value: "#d3f8e2", usage: "Background filled Waste" },
  { category: "Sizing", token: "--dss-touch-target-sm", value: "36px", usage: "Altura dense" },
  { category: "Sizing", token: "--dss-touch-target-md", value: "44px", usage: "Altura padrão WCAG" },
  { category: "Spacing", token: "--dss-spacing-2", value: "8px", usage: "Gap icon-text" },
  { category: "Spacing", token: "--dss-spacing-3", value: "12px", usage: "Padding horizontal" },
  { category: "Border Radius", token: "--dss-radius-sm", value: "4px", usage: "Border-radius padrão" },
  { category: "Borders", token: "--dss-border-width-thin", value: "1px", usage: "Borda padrão" },
  { category: "Borders", token: "--dss-border-width-md", value: "2px", usage: "Borda no focus" },
  { category: "Typography", token: "--dss-font-size-sm", value: "14px", usage: "Texto do input" },
  { category: "Text", token: "--dss-text-body", value: "#454545", usage: "Texto do input" },
  { category: "Text", token: "--dss-text-subtle", value: "#737373", usage: "Placeholder text" },
  { category: "Motion", token: "--dss-duration-fast", value: "150ms", usage: "Transição focus" },
  { category: "Surface", token: "--dss-surface-default", value: "#ffffff", usage: "Background outlined" },
  { category: "States", token: "--dss-shadow-focus", value: "0 0 0 3px rgba(31,134,222,0.25)", usage: "Focus ring primary" },
  { category: "Opacity", token: "--dss-opacity-disabled", value: "0.6", usage: "Opacidade disabled" },
];

// Anatomia 4 Camadas
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
      {label && (
        <label
          className="block text-sm font-medium mb-1.5"
          style={{
            color: error ? "#d8182e" : focused ? colors.labelColor : isDarkMode ? "#a0a0a0" : "#454545",
            transition: "color 150ms ease",
          }}
        >
          {label}
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
          disabled={disabled}
          readOnly={readonly}
          className="flex-1 bg-transparent outline-none border-none"
          style={{
            color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545",
            fontSize: "14px",
          }}
        />

        {clearable && internalValue && !disabled && !readonly && (
          <button
            onClick={() => setInternalValue("")}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
          >
            <X size={16} />
          </button>
        )}

        {type === "password" && showPasswordToggle && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {suffix && <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>{suffix}</span>}

        {error && <AlertCircle size={18} style={{ color: "#d8182e", flexShrink: 0 }} />}
      </div>

      {(hint || (typeof error === "string" && error)) && (
        <p className="text-xs mt-1.5" style={{ color: error ? "#d8182e" : isDarkMode ? "#707070" : "#a3a3a3" }}>
          {typeof error === "string" ? error : hint}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssInputPage() {
  // Estados do Playground (padrão unificado)
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
    prefix: false,
    suffix: false,
    hint: false,
  });

  // Clipboard
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

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

  // Cor efetiva
  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  // Geração de código (padrão unificado)
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
    props.push('placeholder="Digite seu email"');
    if (booleanStates.error) props.push('error="Este campo é obrigatório"');
    if (booleanStates.disabled) props.push("disabled");
    if (booleanStates.readonly) props.push("readonly");
    if (booleanStates.clearable) props.push("clearable");
    if (booleanStates.dense) props.push("dense");
    if (booleanStates.hint) props.push('hint="Informe um email válido"');

    let code = `<DssInput\n  ${props.join("\n  ")}\n  v-model="value"`;
    
    if (booleanStates.prefix || booleanStates.suffix) {
      code += ">\n";
      if (booleanStates.prefix) code += '  <template #prepend>\n    <q-icon name="mail" />\n  </template>\n';
      if (booleanStates.suffix) code += '  <template #append>\n    <q-icon name="search" />\n  </template>\n';
      code += "</DssInput>";
    } else {
      code += "\n/>";
    }

    return code;
  };

  // Get prefix icon
  const getPrefixIcon = () => {
    switch (selectedType) {
      case "email": return <Mail size={18} />;
      case "search": return <Search size={18} />;
      case "tel": return <Phone size={18} />;
      case "password": return <Lock size={18} />;
      default: return <User size={18} />;
    }
  };

  // Opções de toggle
  const stateOptions = [
    { name: "error", label: "Error" },
    { name: "disabled", label: "Disabled" },
    { name: "readonly", label: "Readonly" },
    { name: "clearable", label: "Clearable" },
    { name: "dense", label: "Dense" },
  ];

  const extraOptions = [
    { name: "prefix", label: "Prefix" },
    { name: "suffix", label: "Suffix" },
    { name: "hint", label: "Hint" },
  ];

  // Token categories
  const tokenCategories = [...new Set(tokensUsed.map((t) => t.category))];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* SEÇÃO 1: BADGES + TÍTULO */}
      <PageHeader
        icon={FileText}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssInput"
        subtitle="DssInput é o componente responsável pela entrada de dados do usuário em formulários e fluxos interativos. Oferece suporte a diferentes tipos de entrada, estados e feedbacks visuais."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.3.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* SEÇÃO 2: PLAYGROUND INTERATIVO - PLAYGROUND_STANDARD v3.1 */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        layout="canonical"
        title="Configure o Input"
        description="Selecione as props e veja o resultado em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewRatio={0.65}
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
            prefix={booleanStates.prefix ? getPrefixIcon() : undefined}
            suffix={booleanStates.suffix ? <Search size={18} /> : undefined}
            hint={booleanStates.hint ? "Informe um email válido" : undefined}
            brand={selectedBrand}
            showPasswordToggle={selectedType === "password"}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            {/* Linha 1: Variant, Type, Color, Brand */}
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />
            <VariantSelector
              label="Type"
              variants={inputTypes.map(t => ({ name: t.name, label: t.label }))}
              selectedVariant={selectedType}
              onSelect={setSelectedType}
            />
            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
              disabled={!!selectedBrand}
            />
            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
              disabled={!!selectedColor}
            />
            {/* Linha 2: Estados e Extras */}
            <ToggleGroup
              label="Estados"
              options={stateOptions}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
            <ToggleGroup
              label="Extras"
              options={extraOptions}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* Anatomia 4 Camadas */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssInput" layers={anatomyData} />

      {/* Documentação Técnica */}
      <SectionHeader
        title="Documentação"
        titleAccent="Técnica"
        badge={`${propsData.length} props • ${tokensUsed.length} tokens`}
      />

      {/* Props API */}
      <CollapsibleSection icon={Code} title="Props API" titleAccent="& Eventos" defaultOpen={false}>
        <Card
          className="overflow-hidden"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Categoria</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Prop</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Tipo</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Default</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propsData.map((prop, index) => (
                  <TableRow key={index} style={{ borderColor: "var(--jtech-card-border)" }} className="hover:bg-white/5">
                    <TableCell>
                      <Badge variant="outline" className="text-xs" style={{ borderColor: "var(--jtech-card-border)", color: "var(--jtech-text-muted)" }}>
                        {prop.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "var(--dss-jtech-accent)" }}>
                        {prop.prop}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono" style={{ color: "var(--jtech-text-body)" }}>{prop.type}</span>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "#a3a3a3" }}>
                        {prop.default}
                      </code>
                    </TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </CollapsibleSection>

      {/* Tokens DSS */}
      <CollapsibleSection icon={Layers} title="Tokens DSS" titleAccent="Utilizados" defaultOpen={false}>
        <DssTabs defaultValue={tokenCategories[0]} className="space-y-4">
          <DssTabsList className="flex-wrap">
            {tokenCategories.map((category) => (
              <DssTabsTrigger key={category} value={category} badge={tokensUsed.filter((t) => t.category === category).length}>
                {category}
              </DssTabsTrigger>
            ))}
          </DssTabsList>

          {tokenCategories.map((category) => (
            <DssTabsContent key={category} value={category}>
              <Card style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tokensUsed
                      .filter((t) => t.category === category)
                      .map((token, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg group cursor-pointer transition-all hover:bg-white/5"
                          onClick={() => copyToClipboard(token.token)}
                          style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid var(--jtech-card-border)" }}
                        >
                          <div
                            className="w-8 h-8 rounded flex-shrink-0"
                            style={{
                              backgroundColor: token.value.startsWith("#") || token.value.startsWith("rgba") ? token.value : "transparent",
                              border: token.value.startsWith("#") || token.value.startsWith("rgba") ? "none" : "1px dashed var(--jtech-card-border)",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <code className="text-xs font-mono truncate" style={{ color: "var(--dss-jtech-accent)" }}>{token.token}</code>
                              {copiedToken === token.token ? (
                                <Check size={12} style={{ color: "#4dd228" }} />
                              ) : (
                                <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--jtech-text-muted)" }} />
                              )}
                            </div>
                            <p className="text-xs truncate" style={{ color: "var(--jtech-text-muted)" }}>{token.usage}</p>
                          </div>
                          <code className="text-xs font-mono flex-shrink-0" style={{ color: "var(--jtech-text-body)" }}>{token.value}</code>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </DssTabsContent>
          ))}
        </DssTabs>
      </CollapsibleSection>
    </div>
  );
}
