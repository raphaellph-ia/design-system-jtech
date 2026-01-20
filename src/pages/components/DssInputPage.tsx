import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DssTabs, DssTabsContent, DssTabsList, DssTabsTrigger } from "@/components/ui/dss-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Copy, Check, Layers, Code, FileText, Settings,
  Eye, EyeOff, Search, Mail, Lock, User, Phone,
  AlertCircle, CheckCircle2, Info, X, Calendar,
  CreditCard, AtSign, Hash, Globe
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ============================================================================
// TOKENS REAIS DO DSS - Extraídos de index.css e globals.scss
// ============================================================================

// Variantes Visuais do DssInput
const variants = [
  { name: "outlined", label: "Outlined", desc: "Borda visível (padrão Quasar)", hasOutline: true },
  { name: "filled", label: "Filled", desc: "Background preenchido, sem borda", hasOutline: false },
  { name: "standout", label: "Standout", desc: "Background com destaque no focus", hasOutline: false },
  { name: "borderless", label: "Borderless", desc: "Sem borda, apenas linha inferior", hasOutline: false },
];

// Estados do Input
const inputStates = [
  { name: "default", label: "Default", desc: "Estado padrão do input" },
  { name: "focus", label: "Focus", desc: "Campo focado/ativo" },
  { name: "error", label: "Error", desc: "Estado de erro/validação" },
  { name: "success", label: "Success", desc: "Validação bem-sucedida" },
  { name: "disabled", label: "Disabled", desc: "Campo desabilitado" },
  { name: "readonly", label: "Readonly", desc: "Apenas leitura" },
];

// Tipos de Input
const inputTypes = [
  { name: "text", label: "Text", icon: FileText, desc: "Texto simples" },
  { name: "email", label: "Email", icon: Mail, desc: "Endereço de e-mail" },
  { name: "password", label: "Password", icon: Lock, desc: "Senha com toggle" },
  { name: "search", label: "Search", icon: Search, desc: "Campo de busca" },
  { name: "tel", label: "Telefone", icon: Phone, desc: "Número de telefone" },
  { name: "number", label: "Number", icon: Hash, desc: "Valores numéricos" },
  { name: "url", label: "URL", icon: Globe, desc: "Endereços web" },
  { name: "date", label: "Date", icon: Calendar, desc: "Seleção de data" },
];

// Cores Semânticas aplicáveis ao Input
const semanticColors = {
  primary: { 
    name: "primary", 
    label: "Primary", 
    bg: "#1f86de", 
    hover: "#0f5295", 
    light: "#86c0f3",
    focus: "#006AC5",
    tokens: {
      base: "--dss-primary",
      focus: "--dss-primary-hover",
      light: "--dss-primary-light"
    }
  },
  secondary: { 
    name: "secondary", 
    label: "Secondary", 
    bg: "#26a69a", 
    hover: "#1c857e",
    light: "#6ddbcb",
    focus: "#009C8D",
    tokens: {
      base: "--dss-secondary",
      focus: "--dss-secondary-hover"
    }
  },
};

// Cores de Feedback para estados
const feedbackColors = {
  positive: { 
    name: "positive", 
    label: "Success", 
    icon: CheckCircle2,
    bg: "#4dd228", 
    light: "#b9f2a4",
    tokens: {
      base: "--dss-positive",
      light: "--dss-positive-light"
    }
  },
  negative: { 
    name: "negative", 
    label: "Error", 
    icon: AlertCircle,
    bg: "#d8182e", 
    light: "#ffa0ab",
    tokens: {
      base: "--dss-negative",
      light: "--dss-negative-light"
    }
  },
  warning: { 
    name: "warning", 
    label: "Warning", 
    icon: Info,
    bg: "#fabd14", 
    light: "#fff488",
    tokens: {
      base: "--dss-warning",
      light: "--dss-warning-light"
    }
  },
};

// Paletas de Marca
const brandColors = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",
    tokens: {
      principal: "--dss-hub-600",
      focus: "--dss-hub-700",
      light: "--dss-hub-100"
    }
  },
  water: {
    name: "water",
    label: "Water",
    icon: "🔵",
    principal: "#0e88e4",
    tokens: {
      principal: "--dss-water-500",
      focus: "--dss-water-600",
      light: "--dss-water-100"
    }
  },
  waste: {
    name: "waste",
    label: "Waste",
    icon: "🟢",
    principal: "#18b173",
    tokens: {
      principal: "--dss-waste-500",
      focus: "--dss-waste-600",
      light: "--dss-waste-100"
    }
  }
};

// Props API do DssInput
const propsData = [
  { category: "Valor", prop: "modelValue", type: "String | Number", default: "''", description: "Valor do input (v-model)" },
  { category: "Valor", prop: "type", type: "'text' | 'email' | 'password' | 'search' | 'tel' | 'number' | 'url' | 'date'", default: "'text'", description: "Tipo do input HTML" },
  { category: "Valor", prop: "placeholder", type: "String", default: "''", description: "Texto placeholder" },
  { category: "Label", prop: "label", type: "String", default: "''", description: "Label do campo" },
  { category: "Label", prop: "hint", type: "String", default: "''", description: "Texto de ajuda abaixo do input" },
  { category: "Variantes", prop: "variant", type: "'outlined' | 'filled' | 'standout' | 'borderless'", default: "'outlined'", description: "Estilo visual do input" },
  { category: "Variantes", prop: "color", type: "'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info'", default: "'primary'", description: "Cor semântica (focus)" },
  { category: "Estados", prop: "error", type: "Boolean | String", default: "false", description: "Estado de erro (string = mensagem)" },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Estado desabilitado" },
  { category: "Estados", prop: "readonly", type: "Boolean", default: "false", description: "Apenas leitura" },
  { category: "Estados", prop: "loading", type: "Boolean", default: "false", description: "Exibe spinner de loading" },
  { category: "Ícones", prop: "prefix", type: "String | Slot", default: "null", description: "Ícone/conteúdo à esquerda dentro do input" },
  { category: "Ícones", prop: "suffix", type: "String | Slot", default: "null", description: "Ícone/conteúdo à direita dentro do input" },
  { category: "Ícones", prop: "before", type: "Slot", default: "null", description: "Conteúdo antes do input (fora)" },
  { category: "Ícones", prop: "after", type: "Slot", default: "null", description: "Conteúdo depois do input (fora)" },
  { category: "Ações", prop: "clearable", type: "Boolean", default: "false", description: "Exibe botão de limpar" },
  { category: "Ações", prop: "counter", type: "Boolean", default: "false", description: "Exibe contador de caracteres" },
  { category: "Validação", prop: "rules", type: "Array<Function>", default: "[]", description: "Regras de validação" },
  { category: "Validação", prop: "maxlength", type: "Number", default: "null", description: "Máximo de caracteres" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Veolia" },
  { category: "Densidade", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta" },
  { category: "Densidade", prop: "square", type: "Boolean", default: "false", description: "Bordas quadradas" },
];

// Tokens utilizados pelo DssInput
const tokensUsed = [
  { category: "Border", token: "--dss-border-width-thin", value: "1px", usage: "Borda padrão do input" },
  { category: "Border", token: "--dss-border-width-md", value: "2px", usage: "Borda no estado focus" },
  { category: "Border", token: "--dss-border-gray-300", value: "#d4d4d4", usage: "Cor da borda default" },
  { category: "Border", token: "--dss-border-gray-400", value: "#a3a3a3", usage: "Cor da borda hover" },
  { category: "Border", token: "--dss-radius-sm", value: "4px", usage: "Border-radius padrão" },
  { category: "Border", token: "--dss-radius-md", value: "8px", usage: "Border-radius large" },
  { category: "Border", token: "--dss-radius-none", value: "0", usage: "Sem arredondamento (square)" },
  { category: "Focus", token: "--dss-action-primary", value: "#1f86de", usage: "Borda focus primary" },
  { category: "Focus", token: "--dss-action-secondary", value: "#26a69a", usage: "Borda focus secondary" },
  { category: "Focus", token: "--dss-shadow-focus", value: "0 0 0 3px rgba(31,134,222,0.25)", usage: "Focus ring primary" },
  { category: "Focus", token: "--dss-shadow-focus-error", value: "0 0 0 3px rgba(216,24,46,0.25)", usage: "Focus ring error" },
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Borda/ícone success" },
  { category: "Feedback", token: "--dss-feedback-success-light", value: "#e8f5e9", usage: "Background success (filled)" },
  { category: "Feedback", token: "--dss-feedback-error", value: "#d8182e", usage: "Borda/ícone error" },
  { category: "Feedback", token: "--dss-feedback-error-light", value: "#ffebee", usage: "Background error (filled)" },
  { category: "Feedback", token: "--dss-feedback-warning", value: "#fabd14", usage: "Borda/ícone warning" },
  { category: "Feedback", token: "--dss-feedback-warning-light", value: "#fff8e1", usage: "Background warning (filled)" },
  { category: "Surface", token: "--dss-surface-default", value: "#ffffff", usage: "Background outlined" },
  { category: "Surface", token: "--dss-surface-subtle", value: "#fafafa", usage: "Background filled" },
  { category: "Surface", token: "--dss-surface-muted", value: "#f5f5f5", usage: "Background disabled" },
  { category: "Surface", token: "--dss-surface-hover", value: "rgba(0,0,0,0.04)", usage: "Hover filled" },
  { category: "Text", token: "--dss-text-body", value: "#454545", usage: "Texto do input" },
  { category: "Text", token: "--dss-text-subtle", value: "#737373", usage: "Placeholder text" },
  { category: "Text", token: "--dss-text-muted", value: "#a3a3a3", usage: "Hint text" },
  { category: "Text", token: "--dss-text-disabled", value: "#d4d4d4", usage: "Texto disabled" },
  { category: "Text", token: "--dss-text-error", value: "#d8182e", usage: "Mensagem de erro" },
  { category: "Sizing", token: "--dss-touch-target-sm", value: "36px", usage: "Altura dense" },
  { category: "Sizing", token: "--dss-touch-target-md", value: "44px", usage: "Altura padrão WCAG" },
  { category: "Sizing", token: "--dss-touch-target-lg", value: "52px", usage: "Altura large" },
  { category: "Sizing", token: "--dss-input-icon-size", value: "20px", usage: "Tamanho dos ícones" },
  { category: "Spacing", token: "--dss-spacing-2", value: "8px", usage: "Gap icon-text" },
  { category: "Spacing", token: "--dss-spacing-3", value: "12px", usage: "Padding horizontal" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding horizontal (lg)" },
  { category: "Spacing", token: "--dss-spacing-1", value: "4px", usage: "Gap label-input" },
  { category: "Motion", token: "--dss-duration-fast", value: "150ms", usage: "Transição focus" },
  { category: "Motion", token: "--dss-duration-base", value: "250ms", usage: "Transição hover" },
  { category: "Motion", token: "--dss-easing-standard", value: "cubic-bezier(0.4,0,0.2,1)", usage: "Easing padrão" },
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Focus border Hub" },
  { category: "Brand Hub", token: "--dss-hub-100", value: "#fef2d6", usage: "Background filled Hub" },
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Focus border Water" },
  { category: "Brand Water", token: "--dss-water-100", value: "#e0eefe", usage: "Background filled Water" },
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Focus border Waste" },
  { category: "Brand Waste", token: "--dss-waste-100", value: "#d3f8e2", usage: "Background filled Waste" },
];

// ============================================================================
// PREVIEW COMPONENT - Renderização do Input com tokens reais
// ============================================================================

interface InputPreviewProps {
  variant: string;
  color: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  error?: boolean | string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  dense?: boolean;
  square?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hint?: string;
  brand?: string | null;
  isFocused?: boolean;
  showPasswordToggle?: boolean;
  showToken?: boolean;
}

const DssInputPreview: React.FC<InputPreviewProps> = ({
  variant,
  color,
  label,
  placeholder,
  type,
  value,
  error = false,
  disabled = false,
  readonly = false,
  clearable = false,
  dense = false,
  square = false,
  prefix,
  suffix,
  hint,
  brand = null,
  isFocused = false,
  showPasswordToggle = false,
  showToken = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [focused, setFocused] = useState(isFocused);

  // Determina cores baseado na configuração
  const getColors = () => {
    if (error) {
      return {
        border: "#d8182e",
        focusShadow: "0 0 0 3px rgba(216,24,46,0.25)",
        labelColor: "#d8182e",
        iconColor: "#d8182e",
      };
    }
    
    if (brand) {
      const brandData = brandColors[brand as keyof typeof brandColors];
      return {
        border: brandData?.principal || "#1f86de",
        focusShadow: `0 0 0 3px ${brandData?.principal}40` || "0 0 0 3px rgba(31,134,222,0.25)",
        labelColor: brandData?.principal || "#1f86de",
        iconColor: brandData?.principal || "#1f86de",
      };
    }
    
    const colorData = semanticColors[color as keyof typeof semanticColors];
    return {
      border: colorData?.bg || "#1f86de",
      focusShadow: `0 0 0 3px ${colorData?.bg}40` || "0 0 0 3px rgba(31,134,222,0.25)",
      labelColor: colorData?.bg || "#1f86de",
      iconColor: colorData?.bg || "#1f86de",
    };
  };

  const colors = getColors();

  // Estilos base por variante
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
      color: disabled ? "#d4d4d4" : "#454545",
      backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
      borderRadius: square ? "0" : "4px",
      transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case "outlined":
        return {
          ...base,
          border: focused 
            ? `2px solid ${colors.border}` 
            : `1px solid ${error ? "#d8182e" : "#d4d4d4"}`,
          boxShadow: focused ? colors.focusShadow : "none",
          backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
        };
      case "filled":
        return {
          ...base,
          border: "none",
          borderBottom: focused 
            ? `2px solid ${colors.border}` 
            : `1px solid ${error ? "#d8182e" : "#d4d4d4"}`,
          backgroundColor: disabled ? "#f5f5f5" : "#fafafa",
          borderRadius: square ? "0" : "4px 4px 0 0",
        };
      case "standout":
        return {
          ...base,
          border: "none",
          backgroundColor: focused 
            ? (brand ? `${brandColors[brand as keyof typeof brandColors]?.principal}15` : `${colors.border}15`)
            : (disabled ? "#f5f5f5" : "#f0f0f0"),
          boxShadow: focused ? colors.focusShadow : "none",
        };
      case "borderless":
        return {
          ...base,
          border: "none",
          borderBottom: focused 
            ? `2px solid ${colors.border}` 
            : `1px solid transparent`,
          backgroundColor: "transparent",
          borderRadius: "0",
        };
      default:
        return base;
    }
  };

  const actualType = type === "password" && showPassword ? "text" : type;

  const tokenName = brand 
    ? brandColors[brand as keyof typeof brandColors]?.tokens.principal
    : semanticColors[color as keyof typeof semanticColors]?.tokens.base;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          className="block text-sm font-medium mb-1.5"
          style={{ 
            color: error ? "#d8182e" : (focused ? colors.labelColor : "#454545"),
            transition: "color 150ms ease"
          }}
        >
          {label}
        </label>
      )}
      
      {/* Input Container */}
      <div style={getVariantStyles()}>
        {/* Prefix */}
        {prefix && (
          <span style={{ color: focused ? colors.iconColor : "#737373", flexShrink: 0 }}>
            {prefix}
          </span>
        )}
        
        {/* Input */}
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
            color: disabled ? "#d4d4d4" : "#454545",
            fontSize: "14px",
          }}
        />
        
        {/* Clearable */}
        {clearable && internalValue && !disabled && !readonly && (
          <button
            onClick={() => setInternalValue("")}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: "#737373" }}
          >
            <X size={16} />
          </button>
        )}
        
        {/* Password Toggle */}
        {type === "password" && showPasswordToggle && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: "#737373" }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {/* Suffix */}
        {suffix && (
          <span style={{ color: focused ? colors.iconColor : "#737373", flexShrink: 0 }}>
            {suffix}
          </span>
        )}
        
        {/* Error/Success Icon */}
        {error && (
          <AlertCircle size={18} style={{ color: "#d8182e", flexShrink: 0 }} />
        )}
      </div>
      
      {/* Hint/Error Message */}
      {(hint || (typeof error === "string" && error)) && (
        <p 
          className="text-xs mt-1.5"
          style={{ color: error ? "#d8182e" : "#a3a3a3" }}
        >
          {typeof error === "string" ? error : hint}
        </p>
      )}

      {/* Token Name */}
      {showToken && tokenName && (
        <code 
          className="text-[10px] font-mono mt-1 block text-center"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {tokenName}
        </code>
      )}
    </div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const DssInputPage: React.FC = () => {
  // Estados do Playground
  const [selectedVariant, setSelectedVariant] = useState("outlined");
  const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedType, setSelectedType] = useState("text");
  const [inputLabel, setInputLabel] = useState("Email");
  const [inputPlaceholder, setInputPlaceholder] = useState("Digite seu email");
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Este campo é obrigatório");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  const [isClearable, setIsClearable] = useState(false);
  const [isDense, setIsDense] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [showPrefix, setShowPrefix] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState("Informe um email válido");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showPasswordToggle, setShowPasswordToggle] = useState(true);
  
  // Clipboard
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, isToken = false) => {
    navigator.clipboard.writeText(text);
    if (isToken) {
      setCopiedToken(text);
      setTimeout(() => setCopiedToken(null), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Gera código do componente
  const generateCode = () => {
    const props: string[] = [];
    
    if (selectedVariant !== "outlined") props.push(`variant="${selectedVariant}"`);
    if (selectedColor !== "primary") props.push(`color="${selectedColor}"`);
    if (selectedType !== "text") props.push(`type="${selectedType}"`);
    if (inputLabel) props.push(`label="${inputLabel}"`);
    if (inputPlaceholder) props.push(`placeholder="${inputPlaceholder}"`);
    if (showError) {
      if (errorMessage) {
        props.push(`error="${errorMessage}"`);
      } else {
        props.push("error");
      }
    }
    if (isDisabled) props.push("disabled");
    if (isReadonly) props.push("readonly");
    if (isClearable) props.push("clearable");
    if (isDense) props.push("dense");
    if (isSquare) props.push("square");
    if (showHint && hintText) props.push(`hint="${hintText}"`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    
    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";
    
    let code = `<DssInput${propsStr.length > 1 ? propsStr : " "}v-model="value"`;
    
    if (showPrefix || showSuffix) {
      code += ">\n";
      if (showPrefix) code += '  <template #prepend>\n    <q-icon name="mail" />\n  </template>\n';
      if (showSuffix) code += '  <template #append>\n    <q-icon name="search" />\n  </template>\n';
      code += "</DssInput>";
    } else {
      code += " />";
    }
    
    return code;
  };

  // Categorias de tokens únicas
  const tokenCategories = [...new Set(tokensUsed.map(t => t.category))];

  // Get prefix icon based on type
  const getPrefixIcon = () => {
    switch (selectedType) {
      case "email": return <Mail size={18} />;
      case "search": return <Search size={18} />;
      case "tel": return <Phone size={18} />;
      case "password": return <Lock size={18} />;
      case "url": return <Globe size={18} />;
      default: return <User size={18} />;
    }
  };

  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* ================================================================
          HERO HEADER - Jtech Style
          ================================================================ */}
      <PageHeader
        icon={FileText}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssInput"
        subtitle="Campo de entrada de dados 100% compatível com a API do Quasar Framework. Implementa tokens DSS, brandability completa, estados de validação e acessibilidade WCAG 2.1 AA."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.2.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" }
        ]}
      />

      {/* ================================================================
          QUICK STATS - Jtech Style
          ================================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "4", label: "Variantes", color: semanticColors.primary.bg },
          { value: "8", label: "Tipos de Input", color: semanticColors.secondary.bg },
          { value: "3", label: "Brands Veolia", color: brandColors.hub.principal },
          { value: "6", label: "Estados", color: brandColors.waste.principal },
        ].map((stat, i) => (
          <Card 
            key={i}
            className="transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================================================================
          INTERACTIVE PLAYGROUND - Jtech Style
          ================================================================ */}
      <SectionHeader
        title="Playground"
        titleAccent="Interativo"
        badge="Live Preview"
      />

      <Card 
        className="overflow-hidden"
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--dss-jtech-accent)',
          borderWidth: '2px'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
            <Code className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
            Configure o Input
          </CardTitle>
          <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
            Selecione as props e veja o resultado em tempo real com tokens DSS reais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div 
            className="p-8 rounded-lg flex items-center justify-center min-h-[180px] relative"
            style={{ 
              backgroundColor: '#ffffff',
              border: '1px dashed var(--jtech-card-border)'
            }}
          >
            <div className="w-full max-w-sm">
              <DssInputPreview
                variant={selectedVariant}
                color={selectedColor}
                label={inputLabel}
                placeholder={inputPlaceholder}
                type={selectedType}
                value={inputValue}
                error={showError ? errorMessage : false}
                disabled={isDisabled}
                readonly={isReadonly}
                clearable={isClearable}
                dense={isDense}
                square={isSquare}
                prefix={showPrefix ? getPrefixIcon() : undefined}
                suffix={showSuffix ? <Search size={18} /> : undefined}
                hint={showHint ? hintText : undefined}
                brand={selectedBrand}
                showPasswordToggle={selectedType === "password" && showPasswordToggle}
                showToken
              />
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Variant</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v.name)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: selectedVariant === v.name ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                      color: selectedVariant === v.name ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedVariant === v.name ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Type</label>
              <div className="flex flex-wrap gap-2">
                {inputTypes.slice(0, 5).map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedType(t.name)}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1"
                    style={{
                      backgroundColor: selectedType === t.name ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                      color: selectedType === t.name ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedType === t.name ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <t.icon size={12} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Color</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(semanticColors).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setSelectedColor(c.name); setSelectedBrand(null); }}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedColor === c.name && !selectedBrand ? c.bg : 'rgba(255,255,255,0.05)',
                      color: selectedColor === c.name && !selectedBrand ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedColor === c.name && !selectedBrand ? c.bg : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.bg }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Brand (Veolia)</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    backgroundColor: !selectedBrand ? 'var(--dss-jtech-accent)' : 'rgba(255,255,255,0.05)',
                    color: !selectedBrand ? '#ffffff' : 'var(--jtech-text-body)',
                    border: `1px solid ${!selectedBrand ? 'var(--dss-jtech-accent)' : 'var(--jtech-card-border)'}`
                  }}
                >
                  Nenhum
                </button>
                {Object.values(brandColors).map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBrand(b.name)}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedBrand === b.name ? b.principal : 'rgba(255,255,255,0.05)',
                      color: selectedBrand === b.name ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${selectedBrand === b.name ? b.principal : 'var(--jtech-card-border)'}`
                    }}
                  >
                    <span>{b.icon}</span>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* States & Modifiers */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Estados & Modificadores</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'error', label: 'Error', active: showError, toggle: () => setShowError(!showError) },
                  { key: 'disabled', label: 'Disabled', active: isDisabled, toggle: () => setIsDisabled(!isDisabled) },
                  { key: 'readonly', label: 'Readonly', active: isReadonly, toggle: () => setIsReadonly(!isReadonly) },
                  { key: 'clearable', label: 'Clearable', active: isClearable, toggle: () => setIsClearable(!isClearable) },
                  { key: 'dense', label: 'Dense', active: isDense, toggle: () => setIsDense(!isDense) },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={item.toggle}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: item.active ? 'var(--dss-positive)' : 'rgba(255,255,255,0.05)',
                      color: item.active ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${item.active ? 'var(--dss-positive)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    {item.active && "✓ "}{item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Icons & Extras */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Ícones & Extras</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'prefix', label: 'Prefix', active: showPrefix, toggle: () => setShowPrefix(!showPrefix) },
                  { key: 'suffix', label: 'Suffix', active: showSuffix, toggle: () => setShowSuffix(!showSuffix) },
                  { key: 'hint', label: 'Hint', active: showHint, toggle: () => setShowHint(!showHint) },
                  { key: 'square', label: 'Square', active: isSquare, toggle: () => setIsSquare(!isSquare) },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={item.toggle}
                    className="px-2 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: item.active ? 'var(--dss-positive)' : 'rgba(255,255,255,0.05)',
                      color: item.active ? '#ffffff' : 'var(--jtech-text-body)',
                      border: `1px solid ${item.active ? 'var(--dss-positive)' : 'var(--jtech-card-border)'}`
                    }}
                  >
                    {item.active && "✓ "}{item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="relative">
            <pre 
              className="p-4 overflow-x-auto rounded-lg font-mono text-sm"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)', 
                color: 'var(--jtech-heading-secondary)',
                border: '1px solid var(--jtech-card-border)'
              }}
            >
              <code>{generateCode()}</code>
            </pre>
            <button
              className="absolute top-2 right-2 p-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => copyToClipboard(generateCode())}
              style={{ color: 'var(--jtech-text-muted)' }}
            >
              {copiedCode ? <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================
          GALERIA TABS - Jtech Style
          ================================================================ */}
      <SectionHeader
        title="Galeria de"
        titleAccent="Variantes"
        badge="4 variantes • 8 tipos • 3 brands"
      />

      <DssTabs defaultValue="variantes" className="space-y-4">
        <DssTabsList>
          {["Variantes", "Tipos", "Estados", "Brands"].map((tab) => (
            <DssTabsTrigger 
              key={tab.toLowerCase()}
              value={tab.toLowerCase()}
            >
              {tab}
            </DssTabsTrigger>
          ))}
        </DssTabsList>

        {/* Variantes Tab */}
        <DssTabsContent value="variantes" className="space-y-4">
          {variants.map((v) => (
            <Card 
              key={v.name}
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Badge 
                    className="text-xs"
                    style={{ backgroundColor: 'var(--dss-jtech-accent)', color: 'white' }}
                  >
                    {v.name}
                  </Badge>
                  <span className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{v.desc}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <DssInputPreview
                    variant={v.name}
                    color="primary"
                    label="Label Primary"
                    placeholder="Digite algo..."
                    type="text"
                    value=""
                  />
                  <DssInputPreview
                    variant={v.name}
                    color="secondary"
                    label="Label Secondary"
                    placeholder="Digite algo..."
                    type="text"
                    value=""
                    isFocused
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </DssTabsContent>

        {/* Tipos Tab */}
        <DssTabsContent value="tipos" className="space-y-4">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>Tipos de Input HTML</CardTitle>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Diferentes tipos de entrada com comportamento nativo otimizado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-lg"
                style={{ backgroundColor: '#ffffff' }}
              >
                {inputTypes.map((t) => (
                  <DssInputPreview
                    key={t.name}
                    variant="outlined"
                    color="primary"
                    label={t.label}
                    placeholder={t.desc}
                    type={t.name}
                    value=""
                    prefix={<t.icon size={18} />}
                    showPasswordToggle={t.name === "password"}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </DssTabsContent>

        {/* Estados Tab */}
        <DssTabsContent value="estados" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inputStates.map((state) => (
              <Card 
                key={state.name}
                className="transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-primary)' }}>
                      {state.label}
                    </CardTitle>
                  </div>
                  <CardDescription style={{ color: 'var(--jtech-text-muted)' }}>
                    {state.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <DssInputPreview
                      variant="outlined"
                      color="primary"
                      label={state.label}
                      placeholder="Placeholder..."
                      type="text"
                      value={state.name === "default" ? "" : "Valor digitado"}
                      error={state.name === "error" ? "Mensagem de erro" : false}
                      disabled={state.name === "disabled"}
                      readonly={state.name === "readonly"}
                      isFocused={state.name === "focus" || state.name === "success"}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DssTabsContent>

        {/* Brands Tab */}
        <DssTabsContent value="brands" className="space-y-4">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>Marcas Veolia</CardTitle>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Inputs com tematização de marca aplicada ao focus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-lg"
                style={{ backgroundColor: '#ffffff' }}
              >
                {Object.values(brandColors).map((brand) => (
                  <DssInputPreview
                    key={brand.name}
                    variant="outlined"
                    color="primary"
                    label={`${brand.icon} ${brand.label} Theme`}
                    placeholder={`Input ${brand.label}...`}
                    type="text"
                    value=""
                    brand={brand.name}
                    isFocused
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </DssTabsContent>
      </DssTabs>

      {/* ================================================================
          DOCUMENTAÇÃO TÉCNICA - Tabs
          ================================================================ */}
      <SectionHeader
        title="Documentação"
        titleAccent="Técnica"
        badge={`${propsData.length} props • ${tokensUsed.length} tokens`}
      />

      <DssTabs defaultValue="props" className="space-y-4">
        <DssTabsList>
          <DssTabsTrigger value="props" badge={propsData.length}>Props API</DssTabsTrigger>
          <DssTabsTrigger value="tokens" badge={tokensUsed.length}>Tokens DSS</DssTabsTrigger>
          <DssTabsTrigger value="slots" badge={6}>Slots</DssTabsTrigger>
          <DssTabsTrigger value="events" badge={5}>Eventos</DssTabsTrigger>
        </DssTabsList>

        {/* Props API Tab */}
        <DssTabsContent value="props">
          <Card 
            className="overflow-hidden"
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: 'var(--jtech-card-border)' }}>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Categoria</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Prop</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Tipo</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Default</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propsData.map((prop, index) => (
                    <TableRow 
                      key={index}
                      style={{ borderColor: 'var(--jtech-card-border)' }}
                      className="hover:bg-white/5"
                    >
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: 'var(--jtech-card-border)',
                            color: 'var(--jtech-text-muted)'
                          }}
                        >
                          {prop.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code 
                          className="text-sm font-mono px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'var(--dss-jtech-accent)'
                          }}
                        >
                          {prop.prop}
                        </code>
                      </TableCell>
                      <TableCell>
                        <span 
                          className="text-xs font-mono"
                          style={{ color: 'var(--jtech-text-body)' }}
                        >
                          {prop.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <code 
                          className="text-xs font-mono px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            color: '#a3a3a3'
                          }}
                        >
                          {prop.default}
                        </code>
                      </TableCell>
                      <TableCell style={{ color: 'var(--jtech-text-body)' }}>
                        {prop.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </DssTabsContent>

        {/* Tokens Tab */}
        <DssTabsContent value="tokens">
          <div className="space-y-6">
            {tokenCategories.map((category) => (
              <Card 
                key={category}
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-base flex items-center gap-2"
                    style={{ color: 'var(--jtech-heading-primary)' }}
                  >
                    <Layers size={16} style={{ color: 'var(--dss-jtech-accent)' }} />
                    {category}
                    <Badge 
                      variant="outline" 
                      className="text-xs ml-2"
                      style={{ 
                        borderColor: 'var(--jtech-card-border)',
                        color: 'var(--jtech-text-muted)'
                      }}
                    >
                      {tokensUsed.filter(t => t.category === category).length} tokens
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tokensUsed
                      .filter(t => t.category === category)
                      .map((token, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg group cursor-pointer transition-all hover:bg-white/5"
                          onClick={() => copyToClipboard(token.token, true)}
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--jtech-card-border)'
                          }}
                        >
                          <div 
                            className="w-8 h-8 rounded flex-shrink-0"
                            style={{ 
                              backgroundColor: token.value.startsWith("#") || token.value.startsWith("rgba") 
                                ? token.value 
                                : "transparent",
                              border: token.value.startsWith("#") || token.value.startsWith("rgba")
                                ? "none"
                                : "1px dashed var(--jtech-card-border)"
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <code 
                                className="text-xs font-mono truncate"
                                style={{ color: 'var(--dss-jtech-accent)' }}
                              >
                                {token.token}
                              </code>
                              {copiedToken === token.token ? (
                                <Check size={12} style={{ color: '#4dd228' }} />
                              ) : (
                                <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--jtech-text-muted)' }} />
                              )}
                            </div>
                            <p 
                              className="text-xs truncate"
                              style={{ color: 'var(--jtech-text-muted)' }}
                            >
                              {token.usage}
                            </p>
                          </div>
                          <code 
                            className="text-xs font-mono flex-shrink-0"
                            style={{ color: 'var(--jtech-text-body)' }}
                          >
                            {token.value}
                          </code>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DssTabsContent>

        {/* Slots Tab */}
        <DssTabsContent value="slots">
          <Card 
            className="overflow-hidden"
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: 'var(--jtech-card-border)' }}>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Slot</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Posição</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Descrição</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Exemplo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "prepend", position: "Dentro, à esquerda", desc: "Ícone ou conteúdo antes do texto", example: '<template #prepend><q-icon name="mail" /></template>' },
                    { name: "append", position: "Dentro, à direita", desc: "Ícone ou conteúdo depois do texto", example: '<template #append><q-icon name="search" /></template>' },
                    { name: "before", position: "Fora, à esquerda", desc: "Conteúdo externo antes do input", example: '<template #before><q-icon name="person" /></template>' },
                    { name: "after", position: "Fora, à direita", desc: "Conteúdo externo depois do input", example: '<template #after><q-btn icon="send" /></template>' },
                    { name: "label", position: "Acima", desc: "Customização do label", example: '<template #label>Custom <strong>Label</strong></template>' },
                    { name: "error", position: "Abaixo", desc: "Mensagem de erro customizada", example: '<template #error><span class="custom">Erro!</span></template>' },
                  ].map((slot, idx) => (
                    <TableRow 
                      key={idx}
                      style={{ borderColor: 'var(--jtech-card-border)' }}
                      className="hover:bg-white/5"
                    >
                      <TableCell>
                        <code 
                          className="text-sm font-mono px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'var(--dss-jtech-accent)'
                          }}
                        >
                          #{slot.name}
                        </code>
                      </TableCell>
                      <TableCell style={{ color: 'var(--jtech-text-body)' }}>
                        {slot.position}
                      </TableCell>
                      <TableCell style={{ color: 'var(--jtech-text-body)' }}>
                        {slot.desc}
                      </TableCell>
                      <TableCell>
                        <code 
                          className="text-xs font-mono"
                          style={{ color: '#a3a3a3' }}
                        >
                          {slot.example}
                        </code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </DssTabsContent>

        {/* Events Tab */}
        <DssTabsContent value="events">
          <Card 
            className="overflow-hidden"
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: 'var(--jtech-card-border)' }}>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Evento</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Payload</TableHead>
                    <TableHead style={{ color: 'var(--jtech-text-muted)' }}>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "@update:model-value", payload: "(value: string | number)", desc: "Emitido quando o valor muda (v-model)" },
                    { name: "@focus", payload: "(event: FocusEvent)", desc: "Emitido quando o input recebe foco" },
                    { name: "@blur", payload: "(event: FocusEvent)", desc: "Emitido quando o input perde foco" },
                    { name: "@clear", payload: "()", desc: "Emitido quando o botão clear é clicado" },
                    { name: "@keyup.enter", payload: "(event: KeyboardEvent)", desc: "Emitido ao pressionar Enter" },
                  ].map((event, idx) => (
                    <TableRow 
                      key={idx}
                      style={{ borderColor: 'var(--jtech-card-border)' }}
                      className="hover:bg-white/5"
                    >
                      <TableCell>
                        <code 
                          className="text-sm font-mono px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'var(--dss-jtech-accent)'
                          }}
                        >
                          {event.name}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code 
                          className="text-xs font-mono"
                          style={{ color: '#a3a3a3' }}
                        >
                          {event.payload}
                        </code>
                      </TableCell>
                      <TableCell style={{ color: 'var(--jtech-text-body)' }}>
                        {event.desc}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </DssTabsContent>
      </DssTabs>

      {/* ================================================================
          EXEMPLOS PRÁTICOS
          ================================================================ */}
      <SectionHeader
        title="Exemplos"
        titleAccent="Práticos"
        badge="Código pronto"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Login Form Example */}
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-primary)' }}>
              Formulário de Login
            </CardTitle>
            <CardDescription style={{ color: 'var(--jtech-text-muted)' }}>
              Campos de email e senha com validação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-6 rounded-lg space-y-4"
              style={{ backgroundColor: '#ffffff' }}
            >
              <DssInputPreview
                variant="outlined"
                color="primary"
                label="Email"
                placeholder="seu@email.com"
                type="email"
                value=""
                prefix={<Mail size={18} />}
              />
              <DssInputPreview
                variant="outlined"
                color="primary"
                label="Senha"
                placeholder="••••••••"
                type="password"
                value=""
                prefix={<Lock size={18} />}
                showPasswordToggle
              />
            </div>
            <pre 
              className="p-3 rounded-lg text-xs overflow-x-auto"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--jtech-card-border)',
                color: '#e5e5e5'
              }}
            >
{`<DssInput
  v-model="email"
  type="email"
  label="Email"
>
  <template #prepend>
    <q-icon name="mail" />
  </template>
</DssInput>`}
            </pre>
          </CardContent>
        </Card>

        {/* Search Example */}
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-primary)' }}>
              Campo de Busca
            </CardTitle>
            <CardDescription style={{ color: 'var(--jtech-text-muted)' }}>
              Input de pesquisa com clearable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: '#ffffff' }}
            >
              <DssInputPreview
                variant="standout"
                color="primary"
                label=""
                placeholder="Buscar..."
                type="search"
                value=""
                prefix={<Search size={18} />}
                clearable
              />
            </div>
            <pre 
              className="p-3 rounded-lg text-xs overflow-x-auto"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--jtech-card-border)',
                color: '#e5e5e5'
              }}
            >
{`<DssInput
  v-model="search"
  variant="standout"
  type="search"
  clearable
>
  <template #prepend>
    <q-icon name="search" />
  </template>
</DssInput>`}
            </pre>
          </CardContent>
        </Card>

        {/* Validation Example */}
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-primary)' }}>
              Validação
            </CardTitle>
            <CardDescription style={{ color: 'var(--jtech-text-muted)' }}>
              Input com estado de erro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: '#ffffff' }}
            >
              <DssInputPreview
                variant="outlined"
                color="primary"
                label="CPF"
                placeholder="000.000.000-00"
                type="text"
                value="123.456.789"
                error="CPF inválido. Verifique os dígitos."
              />
            </div>
            <pre 
              className="p-3 rounded-lg text-xs overflow-x-auto"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--jtech-card-border)',
                color: '#e5e5e5'
              }}
            >
{`<DssInput
  v-model="cpf"
  label="CPF"
  :error="cpfError"
  :rules="[validateCPF]"
/>`}
            </pre>
          </CardContent>
        </Card>

        {/* Brand Example */}
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-primary)' }}>
              Brandabilidade
            </CardTitle>
            <CardDescription style={{ color: 'var(--jtech-text-muted)' }}>
              Input com tema de marca Veolia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-6 rounded-lg space-y-4"
              style={{ backgroundColor: '#ffffff' }}
            >
              {Object.values(brandColors).map((brand) => (
                <DssInputPreview
                  key={brand.name}
                  variant="outlined"
                  color="primary"
                  label={`${brand.label} Theme`}
                  placeholder={`Input ${brand.label}...`}
                  type="text"
                  value=""
                  brand={brand.name}
                  isFocused
                />
              ))}
            </div>
            <pre 
              className="p-3 rounded-lg text-xs overflow-x-auto"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--jtech-card-border)',
                color: '#e5e5e5'
              }}
            >
{`<DssInput
  v-model="value"
  label="Hub Theme"
  brand="hub"
/>`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DssInputPage;
