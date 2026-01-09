import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Copy, Check, Palette, Layers, Code, Sparkles, Shield, Zap, Eye, Grid3X3, Sun, Droplets, Leaf } from "lucide-react";

// ============================================
// DADOS REAIS DO DSS - MARCAS
// ============================================

interface BrandColorScale {
  [key: string]: string;
}

interface BrandData {
  name: string;
  key: string;
  description: string;
  icon: React.ReactNode;
  iconComponent: React.ElementType;
  colorScale: BrandColorScale;
  actionTokens: { token: string; value: string; description: string }[];
  brandTokens: { token: string; value: string; description: string }[];
  surfaceTokens: { token: string; value: string; description: string }[];
  borderTokens: { token: string; value: string; description: string }[];
  shadowTokens: { token: string; value: string; description: string }[];
  focusTokens: { token: string; value: string; description: string }[];
  gradientTokens: { token: string; value: string; description: string }[];
  componentTokens: { token: string; value: string; description: string }[];
  accessibilityInfo: {
    contrastOnWhite: string;
    contrastOnDark: string;
    safeTextColor: string;
    notes: string;
  };
}

const brandsData: BrandData[] = [
  {
    name: "Sansys Hub",
    key: "hub",
    description: "Plataforma central de integração - Laranja/Marrom",
    icon: <Sun className="h-5 w-5" />,
    iconComponent: Sun,
    colorScale: {
      "50": "#fff9ed",
      "100": "#fff1d1",
      "200": "#fde2ab",
      "300": "#fbcb76",
      "400": "#f9a93b",
      "500": "#f79012",
      "600": "#ef7a11",
      "700": "#bf590f",
      "800": "#984614",
      "900": "#7a3614",
      "950": "#421a08"
    },
    actionTokens: [
      { token: "--dss-action-primary", value: "#ef7a11", description: "Ação primária" },
      { token: "--dss-action-primary-light", value: "#fbcb76", description: "Ação primária clara" },
      { token: "--dss-action-primary-disable", value: "#fde2ab", description: "Ação desabilitada" },
      { token: "--dss-action-primary-hover", value: "#984614", description: "Ação hover" },
      { token: "--dss-action-primary-deep", value: "#7a3614", description: "Ação deep" },
      { token: "--dss-action-primary-bg", value: "#fff9ed", description: "Background de ação" },
    ],
    brandTokens: [
      { token: "--dss-brand-primary", value: "#ef7a11", description: "Cor primária da marca" },
      { token: "--dss-brand-secondary", value: "#fbcb76", description: "Cor secundária" },
      { token: "--dss-brand-tertiary", value: "#984614", description: "Cor terciária" },
      { token: "--dss-brand-accent", value: "#f9a93b", description: "Cor de destaque" },
      { token: "--dss-brand-light", value: "#fff1d1", description: "Cor clara" },
      { token: "--dss-brand-lighter", value: "#fff9ed", description: "Cor mais clara" },
      { token: "--dss-brand-dark", value: "#7a3614", description: "Cor escura" },
      { token: "--dss-brand-darker", value: "#421a08", description: "Cor mais escura" },
    ],
    surfaceTokens: [
      { token: "--dss-surface-brand-subtle", value: "rgba(239, 122, 17, 0.08)", description: "Superfície sutil 8%" },
      { token: "--dss-surface-brand-light", value: "rgba(239, 122, 17, 0.12)", description: "Superfície leve 12%" },
      { token: "--dss-surface-brand-medium", value: "rgba(239, 122, 17, 0.16)", description: "Superfície média 16%" },
      { token: "--dss-surface-brand-strong", value: "rgba(239, 122, 17, 0.24)", description: "Superfície forte 24%" },
    ],
    borderTokens: [
      { token: "--dss-border-brand-primary", value: "#fbcb76", description: "Borda primária" },
      { token: "--dss-border-brand-secondary", value: "#fde2ab", description: "Borda secundária" },
      { token: "--dss-border-brand-accent", value: "#ef7a11", description: "Borda destaque" },
      { token: "--dss-border-brand-focus", value: "#ef7a11", description: "Borda de foco" },
    ],
    shadowTokens: [
      { token: "--dss-shadow-brand-sm", value: "0 1px 3px rgba(239, 122, 17, 0.15)", description: "Sombra pequena" },
      { token: "--dss-shadow-brand-md", value: "0 4px 6px rgba(239, 122, 17, 0.15)", description: "Sombra média" },
      { token: "--dss-shadow-brand-lg", value: "0 10px 15px rgba(239, 122, 17, 0.15)", description: "Sombra grande" },
      { token: "--dss-shadow-brand-xl", value: "0 20px 25px rgba(239, 122, 17, 0.15)", description: "Sombra extra grande" },
    ],
    focusTokens: [
      { token: "--dss-focus-ring-brand", value: "0 0 0 3px rgba(239, 122, 17, 0.5)", description: "Anel de foco" },
      { token: "--dss-focus-ring-brand-inset", value: "inset 0 0 0 3px rgba(239, 122, 17, 0.5)", description: "Anel de foco interno" },
      { token: "--dss-outline-focus-brand", value: "2px solid #ef7a11", description: "Outline de foco" },
    ],
    gradientTokens: [
      { token: "--dss-gradient-brand-vertical", value: "linear-gradient(180deg, #f9a93b 0%, #ef7a11 100%)", description: "Gradiente vertical" },
      { token: "--dss-gradient-brand-horizontal", value: "linear-gradient(90deg, #f9a93b 0%, #ef7a11 100%)", description: "Gradiente horizontal" },
      { token: "--dss-gradient-brand-diagonal", value: "linear-gradient(135deg, #f9a93b 0%, #ef7a11 100%)", description: "Gradiente diagonal" },
      { token: "--dss-gradient-brand-light", value: "linear-gradient(135deg, #fff9ed 0%, #fff1d1 100%)", description: "Gradiente claro" },
      { token: "--dss-gradient-brand-dark", value: "linear-gradient(135deg, #ef7a11 0%, #984614 100%)", description: "Gradiente escuro" },
    ],
    componentTokens: [
      { token: "--dss-component-btn-primary-bg", value: "#ef7a11", description: "Background botão primário" },
      { token: "--dss-component-btn-primary-hover", value: "#bf590f", description: "Hover botão primário" },
      { token: "--dss-component-btn-primary-active", value: "#984614", description: "Active botão primário" },
      { token: "--dss-component-header-bg", value: "#ef7a11", description: "Background header" },
      { token: "--dss-component-footer-bg", value: "#7a3614", description: "Background footer" },
    ],
    accessibilityInfo: {
      contrastOnWhite: "3.8:1",
      contrastOnDark: "10.2:1",
      safeTextColor: "#7a3614",
      notes: "⚠️ Hub-600 apenas para UI grande. Texto normal deve usar Hub-900."
    }
  },
  {
    name: "Sansys Water",
    key: "water",
    description: "Gestão de recursos hídricos e saneamento - Azul",
    icon: <Droplets className="h-5 w-5" />,
    iconComponent: Droplets,
    colorScale: {
      "50": "#f0f7ff",
      "100": "#e0eefe",
      "200": "#badefd",
      "300": "#7dc4fc",
      "400": "#38a5f8",
      "500": "#0e88e4",
      "600": "#026cc7",
      "700": "#0356a1",
      "800": "#074a85",
      "900": "#0c3f6e",
      "950": "#082749"
    },
    actionTokens: [
      { token: "--dss-action-primary", value: "#0e88e4", description: "Ação primária" },
      { token: "--dss-action-primary-light", value: "#7dc4fc", description: "Ação primária clara" },
      { token: "--dss-action-primary-disable", value: "#badefd", description: "Ação desabilitada" },
      { token: "--dss-action-primary-hover", value: "#0356a1", description: "Ação hover" },
      { token: "--dss-action-primary-deep", value: "#074a85", description: "Ação deep" },
      { token: "--dss-action-primary-bg", value: "#f0f7ff", description: "Background de ação" },
    ],
    brandTokens: [
      { token: "--dss-brand-primary", value: "#0e88e4", description: "Cor primária da marca" },
      { token: "--dss-brand-secondary", value: "#7dc4fc", description: "Cor secundária" },
      { token: "--dss-brand-tertiary", value: "#0356a1", description: "Cor terciária" },
      { token: "--dss-brand-accent", value: "#38a5f8", description: "Cor de destaque" },
      { token: "--dss-brand-light", value: "#e0eefe", description: "Cor clara" },
      { token: "--dss-brand-lighter", value: "#f0f7ff", description: "Cor mais clara" },
      { token: "--dss-brand-dark", value: "#074a85", description: "Cor escura" },
      { token: "--dss-brand-darker", value: "#0c3f6e", description: "Cor mais escura" },
    ],
    surfaceTokens: [
      { token: "--dss-surface-brand-subtle", value: "rgba(14, 136, 228, 0.08)", description: "Superfície sutil 8%" },
      { token: "--dss-surface-brand-light", value: "rgba(14, 136, 228, 0.12)", description: "Superfície leve 12%" },
      { token: "--dss-surface-brand-medium", value: "rgba(14, 136, 228, 0.16)", description: "Superfície média 16%" },
      { token: "--dss-surface-brand-strong", value: "rgba(14, 136, 228, 0.24)", description: "Superfície forte 24%" },
    ],
    borderTokens: [
      { token: "--dss-border-brand-primary", value: "#7dc4fc", description: "Borda primária" },
      { token: "--dss-border-brand-secondary", value: "#badefd", description: "Borda secundária" },
      { token: "--dss-border-brand-accent", value: "#0e88e4", description: "Borda destaque" },
      { token: "--dss-border-brand-focus", value: "#0e88e4", description: "Borda de foco" },
    ],
    shadowTokens: [
      { token: "--dss-shadow-brand-sm", value: "0 1px 3px rgba(14, 136, 228, 0.15)", description: "Sombra pequena" },
      { token: "--dss-shadow-brand-md", value: "0 4px 6px rgba(14, 136, 228, 0.15)", description: "Sombra média" },
      { token: "--dss-shadow-brand-lg", value: "0 10px 15px rgba(14, 136, 228, 0.15)", description: "Sombra grande" },
      { token: "--dss-shadow-brand-xl", value: "0 20px 25px rgba(14, 136, 228, 0.15)", description: "Sombra extra grande" },
    ],
    focusTokens: [
      { token: "--dss-focus-ring-brand", value: "0 0 0 3px rgba(14, 136, 228, 0.5)", description: "Anel de foco" },
      { token: "--dss-focus-ring-brand-inset", value: "inset 0 0 0 3px rgba(14, 136, 228, 0.5)", description: "Anel de foco interno" },
      { token: "--dss-outline-focus-brand", value: "2px solid #0e88e4", description: "Outline de foco" },
    ],
    gradientTokens: [
      { token: "--dss-gradient-brand-vertical", value: "linear-gradient(180deg, #7dc4fc 0%, #0e88e4 100%)", description: "Gradiente vertical" },
      { token: "--dss-gradient-brand-horizontal", value: "linear-gradient(90deg, #7dc4fc 0%, #0e88e4 100%)", description: "Gradiente horizontal" },
      { token: "--dss-gradient-brand-diagonal", value: "linear-gradient(135deg, #7dc4fc 0%, #0e88e4 100%)", description: "Gradiente diagonal" },
      { token: "--dss-gradient-brand-light", value: "linear-gradient(135deg, #f0f7ff 0%, #e0eefe 100%)", description: "Gradiente claro" },
      { token: "--dss-gradient-brand-dark", value: "linear-gradient(135deg, #0e88e4 0%, #0356a1 100%)", description: "Gradiente escuro" },
    ],
    componentTokens: [
      { token: "--dss-component-btn-primary-bg", value: "#0e88e4", description: "Background botão primário" },
      { token: "--dss-component-btn-primary-hover", value: "#026cc7", description: "Hover botão primário" },
      { token: "--dss-component-btn-primary-active", value: "#0356a1", description: "Active botão primário" },
      { token: "--dss-component-header-bg", value: "#0e88e4", description: "Background header" },
      { token: "--dss-component-footer-bg", value: "#074a85", description: "Background footer" },
    ],
    accessibilityInfo: {
      contrastOnWhite: "4.6:1",
      contrastOnDark: "11.1:1",
      safeTextColor: "#074a85",
      notes: "⚠️ Aceitável para texto grande (18pt+). Texto normal deve usar Water-800."
    }
  },
  {
    name: "Sansys Waste",
    key: "waste",
    description: "Gestão de resíduos sólidos e reciclagem - Verde",
    icon: <Leaf className="h-5 w-5" />,
    iconComponent: Leaf,
    colorScale: {
      "50": "#edfcf4",
      "100": "#d3f8e2",
      "200": "#abefcb",
      "300": "#74e1ae",
      "400": "#3bcb8c",
      "500": "#17b072",
      "600": "#0b8154",
      "700": "#0a724e",
      "800": "#0a5b3e",
      "900": "#094932",
      "950": "#04291d"
    },
    actionTokens: [
      { token: "--dss-action-primary", value: "#0b8154", description: "Ação primária" },
      { token: "--dss-action-primary-light", value: "#74e1ae", description: "Ação primária clara" },
      { token: "--dss-action-primary-disable", value: "#abefcb", description: "Ação desabilitada" },
      { token: "--dss-action-primary-hover", value: "#0a5b3e", description: "Ação hover" },
      { token: "--dss-action-primary-deep", value: "#094932", description: "Ação deep" },
      { token: "--dss-action-primary-bg", value: "#edfcf4", description: "Background de ação" },
    ],
    brandTokens: [
      { token: "--dss-brand-primary", value: "#0b8154", description: "Cor primária da marca" },
      { token: "--dss-brand-secondary", value: "#74e1ae", description: "Cor secundária" },
      { token: "--dss-brand-tertiary", value: "#0a5b3e", description: "Cor terciária" },
      { token: "--dss-brand-accent", value: "#3bcb8c", description: "Cor de destaque" },
      { token: "--dss-brand-light", value: "#d3f8e2", description: "Cor clara" },
      { token: "--dss-brand-lighter", value: "#edfcf4", description: "Cor mais clara" },
      { token: "--dss-brand-dark", value: "#094932", description: "Cor escura" },
      { token: "--dss-brand-darker", value: "#04291d", description: "Cor mais escura" },
    ],
    surfaceTokens: [
      { token: "--dss-surface-brand-subtle", value: "rgba(11, 129, 84, 0.08)", description: "Superfície sutil 8%" },
      { token: "--dss-surface-brand-light", value: "rgba(11, 129, 84, 0.12)", description: "Superfície leve 12%" },
      { token: "--dss-surface-brand-medium", value: "rgba(11, 129, 84, 0.16)", description: "Superfície média 16%" },
      { token: "--dss-surface-brand-strong", value: "rgba(11, 129, 84, 0.24)", description: "Superfície forte 24%" },
    ],
    borderTokens: [
      { token: "--dss-border-brand-primary", value: "#74e1ae", description: "Borda primária" },
      { token: "--dss-border-brand-secondary", value: "#abefcb", description: "Borda secundária" },
      { token: "--dss-border-brand-accent", value: "#0b8154", description: "Borda destaque" },
      { token: "--dss-border-brand-focus", value: "#0b8154", description: "Borda de foco" },
    ],
    shadowTokens: [
      { token: "--dss-shadow-brand-sm", value: "0 1px 3px rgba(11, 129, 84, 0.15)", description: "Sombra pequena" },
      { token: "--dss-shadow-brand-md", value: "0 4px 6px rgba(11, 129, 84, 0.15)", description: "Sombra média" },
      { token: "--dss-shadow-brand-lg", value: "0 10px 15px rgba(11, 129, 84, 0.15)", description: "Sombra grande" },
      { token: "--dss-shadow-brand-xl", value: "0 20px 25px rgba(11, 129, 84, 0.15)", description: "Sombra extra grande" },
    ],
    focusTokens: [
      { token: "--dss-focus-ring-brand", value: "0 0 0 3px rgba(11, 129, 84, 0.5)", description: "Anel de foco" },
      { token: "--dss-focus-ring-brand-inset", value: "inset 0 0 0 3px rgba(11, 129, 84, 0.5)", description: "Anel de foco interno" },
      { token: "--dss-outline-focus-brand", value: "2px solid #0b8154", description: "Outline de foco" },
    ],
    gradientTokens: [
      { token: "--dss-gradient-brand-vertical", value: "linear-gradient(180deg, #3bcb8c 0%, #0b8154 100%)", description: "Gradiente vertical" },
      { token: "--dss-gradient-brand-horizontal", value: "linear-gradient(90deg, #3bcb8c 0%, #0b8154 100%)", description: "Gradiente horizontal" },
      { token: "--dss-gradient-brand-diagonal", value: "linear-gradient(135deg, #3bcb8c 0%, #0b8154 100%)", description: "Gradiente diagonal" },
      { token: "--dss-gradient-brand-light", value: "linear-gradient(135deg, #edfcf4 0%, #d3f8e2 100%)", description: "Gradiente claro" },
      { token: "--dss-gradient-brand-dark", value: "linear-gradient(135deg, #0b8154 0%, #0a5b3e 100%)", description: "Gradiente escuro" },
    ],
    componentTokens: [
      { token: "--dss-component-btn-primary-bg", value: "#0b8154", description: "Background botão primário" },
      { token: "--dss-component-btn-primary-hover", value: "#0a5b3e", description: "Hover botão primário" },
      { token: "--dss-component-btn-primary-active", value: "#0a724e", description: "Active botão primário" },
      { token: "--dss-component-header-bg", value: "#0b8154", description: "Background header" },
      { token: "--dss-component-footer-bg", value: "#094932", description: "Background footer" },
    ],
    accessibilityInfo: {
      contrastOnWhite: "6.1:1",
      contrastOnDark: "10.5:1",
      safeTextColor: "#094932",
      notes: "✅ Aprovado WCAG AA. Melhor contraste entre as 3 marcas."
    }
  }
];

// Classes CSS para forçar contexto de marca
const brandClasses = [
  { name: ".dss-brand-hub", description: "Força contexto Hub em qualquer elemento" },
  { name: ".dss-brand-water", description: "Força contexto Water em qualquer elemento" },
  { name: ".dss-brand-waste", description: "Força contexto Waste em qualquer elemento" },
  { name: ".dss-mode-semantic", description: "Força modo semântico (ignora marca)" },
];

// Mixins SCSS disponíveis
const scssMixins = [
  { name: "@include dss-brand-context($brand)", description: "Aplica contexto de marca específico", params: "$brand: 'hub' | 'water' | 'waste'" },
  { name: "@include dss-brand-variant($component)", description: "Cria variantes por marca para componentes", params: "$component: 'button' | 'card' | 'alert' | 'badge'" },
  { name: "@include dss-brand-gradient($brand, $direction)", description: "Aplica gradiente de marca", params: "$direction: 'vertical' | 'horizontal' | 'diagonal'" },
];

// Funções SCSS disponíveis
const scssFunctions = [
  { name: "dss-brand-primary()", description: "Retorna token de cor primária da marca" },
  { name: "dss-brand-primary-hover()", description: "Retorna token de hover da marca" },
  { name: "dss-brand-surface-subtle()", description: "Retorna token de superfície sutil da marca" },
  { name: "dss-is-brand($brand)", description: "Verifica se contexto atual é da marca especificada" },
];

// ============================================
// COMPONENTES
// ============================================

function TokenRow({ 
  token, 
  value, 
  description,
  brandColor 
}: { 
  token: string; 
  value: string; 
  description: string;
  brandColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = value.startsWith('#') || value.startsWith('rgb');
  const isGradient = value.includes('gradient');
  const isShadow = value.includes('shadow') || value.includes('px');

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group"
      onClick={handleCopy}
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)',
        border: '1px solid var(--jtech-card-border)',
        borderLeftWidth: 3,
        borderLeftColor: brandColor
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-hover-border)';
        e.currentTarget.style.borderLeftColor = brandColor;
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
        e.currentTarget.style.borderLeftColor = brandColor;
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {/* Preview visual */}
      <div className="flex-shrink-0">
        {isGradient ? (
          <div 
            className="w-10 h-10 rounded-lg transition-transform duration-200 group-hover:scale-110"
            style={{ background: value, boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          />
        ) : isColor ? (
          <div 
            className="w-10 h-10 rounded-lg transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: value, boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          />
        ) : isShadow ? (
          <div 
            className="w-10 h-10 rounded-lg bg-white transition-transform duration-200 group-hover:scale-110"
            style={{ boxShadow: value }}
          />
        ) : (
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: brandColor + '20', color: brandColor }}
          >
            CSS
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <code 
            className="text-xs font-mono truncate"
            style={{ color: 'var(--jtech-heading-secondary)' }}
          >
            {token}
          </code>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" style={{ color: 'var(--jtech-text-muted)' }} />
            )}
          </div>
        </div>
        <p 
          className="text-xs truncate"
          style={{ color: 'var(--jtech-text-body)' }}
        >
          {description}
        </p>
      </div>

      {/* Value */}
      <div className="flex-shrink-0 text-right">
        <code 
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'var(--jtech-text-muted)' 
          }}
        >
          {value.length > 30 ? value.substring(0, 30) + '...' : value}
        </code>
      </div>
    </div>
  );
}

function ColorScalePreview({ scale, brandName }: { scale: BrandColorScale; brandName: string }) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = async (color: string, step: string) => {
    await navigator.clipboard.writeText(color);
    setCopiedColor(step);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-2">
      <h4 
        className="text-sm font-medium"
        style={{ color: 'var(--jtech-heading-secondary)' }}
      >
        Escala de Cores {brandName}
      </h4>
      <div className="flex gap-1 flex-wrap">
        {Object.entries(scale).map(([step, color]) => (
          <button
            key={step}
            onClick={() => handleCopy(color, step)}
            className="group relative"
            title={`${brandName}-${step}: ${color}`}
          >
            <div 
              className="w-12 h-12 rounded-lg transition-transform hover:scale-110 hover:z-10"
              style={{ backgroundColor: color, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedColor === step ? (
                <Check className="h-4 w-4 text-white drop-shadow-md" />
              ) : (
                <Copy className="h-4 w-4 text-white drop-shadow-md" />
              )}
            </div>
            <span 
              className="block text-[10px] text-center mt-1"
              style={{ color: 'var(--jtech-text-muted)' }}
            >
              {step}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand, isActive, onSelect }: { brand: BrandData; isActive: boolean; onSelect: () => void }) {
  const primaryColor = brand.colorScale["600"] || brand.colorScale["500"];
  const Icon = brand.iconComponent;
  
  return (
    <Card 
      className={`transition-all duration-300 cursor-pointer ${isActive ? 'ring-2 ring-offset-2 ring-offset-background' : 'hover:shadow-lg'}`}
      onClick={onSelect}
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)',
        borderColor: isActive ? primaryColor : 'var(--jtech-card-border)',
        borderLeftWidth: 4, 
        borderLeftColor: primaryColor,
        ...(isActive && { ringColor: primaryColor })
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div 
            className="h-14 w-14 rounded-xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${brand.colorScale["400"]} 0%, ${primaryColor} 100%)`,
            }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle 
              className="flex items-center gap-2"
              style={{ color: 'var(--jtech-heading-secondary)' }}
            >
              {brand.name}
              <Badge 
                variant="outline" 
                style={{ 
                  borderColor: primaryColor, 
                  color: primaryColor 
                }}
              >
                {brand.key}
              </Badge>
              {isActive && (
                <Badge 
                  className="ml-auto"
                  style={{ 
                    backgroundColor: primaryColor,
                    color: 'white'
                  }}
                >
                  Ativo
                </Badge>
              )}
            </CardTitle>
            <p 
              className="text-sm mt-1"
              style={{ color: 'var(--jtech-text-body)' }}
            >
              {brand.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Scale */}
        <ColorScalePreview scale={brand.colorScale} brandName={brand.name.split(' ')[1]} />
        
        {/* Accessibility Info */}
        <div 
          className="p-4 rounded-lg"
          style={{ backgroundColor: primaryColor + '15' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" style={{ color: primaryColor }} />
            <h4 
              className="text-sm font-medium"
              style={{ color: 'var(--jtech-heading-secondary)' }}
            >
              Acessibilidade WCAG
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span style={{ color: 'var(--jtech-text-muted)' }}>Contraste branco:</span>
              <span 
                className="ml-1 font-mono"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                {brand.accessibilityInfo.contrastOnWhite}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--jtech-text-muted)' }}>Contraste escuro:</span>
              <span 
                className="ml-1 font-mono"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                {brand.accessibilityInfo.contrastOnDark}
              </span>
            </div>
          </div>
          <p 
            className="text-xs mt-2"
            style={{ color: 'var(--jtech-text-body)' }}
          >
            {brand.accessibilityInfo.notes}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ComponentPreview({ brand }: { brand: BrandData }) {
  // Cores seguindo padrão DSS documentado
  const primaryColor = brand.colorScale["600"] || brand.colorScale["500"];
  
  // Estados conforme regras DSS:
  // - disable = -200 (2 tons abaixo do principal)
  // - light = -300 (3 tons abaixo) - usado para hover bg em flat/outline
  // - hover/focus = +2 níveis (ex: 600 → 800) - usado para hover text em flat/outline
  // - deep = 950 (mais escuro)
  const disableColor = brand.colorScale["200"];  // -200: 2 tons abaixo
  const lightColor = brand.colorScale["300"];     // -300: 3 tons abaixo (hover bg para flat/outline)
  const hoverColor = brand.colorScale["800"];     // +2 níveis: hover/focus (600 → 800)
  const deepColor = brand.colorScale["950"];      // deep: mais escuro
  const lightBg = brand.colorScale["50"];         // bg mais claro

  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div>
        <h4 
          className="text-sm font-medium mb-3"
          style={{ color: 'var(--jtech-heading-secondary)' }}
        >
          Botões
        </h4>
        <div className="flex flex-wrap gap-3">
          {/* Botão Primário (filled) */}
          <button
            className="px-4 py-2 rounded-lg text-white font-medium transition-all"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.backgroundColor = hoverColor;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Elevated
          </button>
          
          {/* Botão Outline - DSS: hover bg=light(-300), hover text=hover(+2) */}
          <button
            className="px-4 py-2 rounded-lg font-medium border-2 transition-all"
            style={{ 
              borderColor: primaryColor, 
              color: primaryColor,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = lightColor;  // light -300
              e.currentTarget.style.color = hoverColor;             // hover +2 níveis
              e.currentTarget.style.borderColor = hoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = primaryColor;
              e.currentTarget.style.borderColor = primaryColor;
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Outline
          </button>
          
          {/* Botão Flat - DSS: hover bg=light(-300), hover text=hover(+2) */}
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all"
            style={{ 
              backgroundColor: 'transparent', 
              color: primaryColor 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = lightColor;  // light -300
              e.currentTarget.style.color = hoverColor;             // hover +2 níveis
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = primaryColor;
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Flat
          </button>
          
          {/* Botão Disabled */}
          <button
            className="px-4 py-2 rounded-lg font-medium cursor-not-allowed opacity-60"
            style={{ 
              backgroundColor: disableColor, 
              color: brand.colorScale["500"]
            }}
            disabled
          >
            Disabled
          </button>
        </div>
        
        {/* Legenda de estados */}
        <div 
          className="mt-3 p-3 rounded-lg text-xs"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: lightColor }}
              />
              <span style={{ color: 'var(--jtech-text-muted)' }}>
                Light (-300): <code className="text-[10px] bg-black/20 px-1 rounded">{lightColor}</code>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: hoverColor }}
              />
              <span style={{ color: 'var(--jtech-text-muted)' }}>
                Hover (+2): <code className="text-[10px] bg-black/20 px-1 rounded">{hoverColor}</code>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: disableColor }}
              />
              <span style={{ color: 'var(--jtech-text-muted)' }}>
                Disable (-200): <code className="text-[10px] bg-black/20 px-1 rounded">{disableColor}</code>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h4 
          className="text-sm font-medium mb-3"
          style={{ color: 'var(--jtech-heading-secondary)' }}
        >
          Cards
        </h4>
        <div 
          className="p-4 rounded-lg border-l-4"
          style={{ 
            backgroundColor: brand.colorScale["50"],
            borderLeftColor: primaryColor
          }}
        >
          <h4 className="font-medium" style={{ color: brand.colorScale["900"] }}>
            Card com Marca {brand.name.split(' ')[1]}
          </h4>
          <p className="text-sm mt-1" style={{ color: 'var(--jtech-text-body)' }}>
            Exemplo de card utilizando tokens da marca.
          </p>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h4 
          className="text-sm font-medium mb-3"
          style={{ color: 'var(--jtech-heading-secondary)' }}
        >
          Badges
        </h4>
        <div className="flex gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-medium text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Badge Filled
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs font-medium border"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Badge Outline
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs font-medium"
            style={{ backgroundColor: lightColor, color: hoverColor }}
          >
            Badge Soft
          </span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <h4 
          className="text-sm font-medium mb-3"
          style={{ color: 'var(--jtech-heading-secondary)' }}
        >
          Progresso
        </h4>
        <div className="space-y-2">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: '65%',
                background: `linear-gradient(90deg, ${brand.colorScale["400"]} 0%, ${primaryColor} 100%)`
              }}
            />
          </div>
          <div 
            className="h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: '45%',
                background: `linear-gradient(90deg, ${brand.colorScale["400"]} 0%, ${primaryColor} 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PÁGINA PRINCIPAL
// ============================================

export default function BrandabilityPage() {
  const [activeBrand, setActiveBrand] = useState<string>("water");
  const [activeTokenTab, setActiveTokenTab] = useState("action");
  
  const selectedBrand = brandsData.find(b => b.key === activeBrand) || brandsData[1];
  const primaryColor = selectedBrand.colorScale["600"] || selectedBrand.colorScale["500"];

  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Page Header - Jtech Style */}
      <PageHeader
        icon={Palette}
        badge="Padrões"
        badgeVariant="accent"
        title="Sistema de"
        titleAccent="Brandabilidade"
        subtitle="O DSS suporta múltiplas marcas mantendo consistência estrutural e permitindo variação visual por produto. Cada marca possui escala de cores e tokens derivados."
        subtitleHighlights={["múltiplas marcas", "escala de cores", "tokens derivados"]}
        extraBadges={[
          { label: "3 Marcas", variant: "info" },
          { label: "50+ Tokens/Marca", variant: "success" }
        ]}
      />

      {/* Marcas Disponíveis */}
      <section>
        <SectionHeader
          icon={Sparkles}
          title="Marcas"
          titleAccent="Disponíveis"
          badge="3 Opções"
        />
        
        <div className="grid lg:grid-cols-3 gap-6">
          {brandsData.map((brand) => (
            <BrandCard 
              key={brand.key} 
              brand={brand} 
              isActive={activeBrand === brand.key}
              onSelect={() => setActiveBrand(brand.key)}
            />
          ))}
        </div>
      </section>

      {/* Brand Selector + Component Preview */}
      <section>
        <SectionHeader
          icon={Eye}
          title="Preview de"
          titleAccent="Componentes"
          badge="Interativo"
        />
        
        {/* Brand Selector - Agora antes do preview */}
        <div 
          className="mb-6 p-4 rounded-xl"
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            border: '1px solid var(--jtech-card-border)'
          }}
        >
          <p 
            className="text-sm mb-3"
            style={{ color: 'var(--jtech-text-body)' }}
          >
            Selecione uma marca para ver os componentes atualizados:
          </p>
          <div className="flex gap-2 flex-wrap">
            {brandsData.map((brand) => {
              const brandPrimary = brand.colorScale["600"] || brand.colorScale["500"];
              const isActive = activeBrand === brand.key;
              const Icon = brand.iconComponent;
              return (
                <button
                  key={brand.key}
                  onClick={() => setActiveBrand(brand.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all font-medium`}
                  style={{
                    borderColor: brandPrimary,
                    backgroundColor: isActive ? brandPrimary : 'transparent',
                    color: isActive ? 'white' : brandPrimary
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{brand.name}</span>
                  {isActive && (
                    <Check className="h-4 w-4 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Component Preview */}
        <Card
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            borderColor: 'var(--jtech-card-border)'
          }}
        >
          <CardHeader>
            <CardTitle 
              className="flex items-center gap-2"
              style={{ color: 'var(--jtech-heading-secondary)' }}
            >
              <div 
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                {selectedBrand.icon}
              </div>
              <span>Componentes {selectedBrand.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ComponentPreview brand={selectedBrand} />
          </CardContent>
        </Card>
      </section>

      {/* Tokens por Categoria */}
      <section>
        <SectionHeader
          icon={Code}
          title="Tokens da Marca"
          titleAccent={selectedBrand.name.split(' ')[1]}
          badge="8 Categorias"
        />

        <Card
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            borderColor: 'var(--jtech-card-border)'
          }}
        >
          <CardContent className="p-0">
            <Tabs value={activeTokenTab} onValueChange={setActiveTokenTab}>
              <div 
                className="border-b"
                style={{ borderColor: 'var(--jtech-card-border)' }}
              >
                <TabsList 
                  className="w-full justify-start rounded-none bg-transparent p-0 flex-wrap"
                >
                  {[
                    { id: "action", label: "Ações" },
                    { id: "brand", label: "Marca" },
                    { id: "surface", label: "Superfícies" },
                    { id: "border", label: "Bordas" },
                    { id: "shadow", label: "Sombras" },
                    { id: "focus", label: "Foco" },
                    { id: "gradient", label: "Gradientes" },
                    { id: "component", label: "Componentes" },
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-current px-4 py-3 text-sm"
                      style={{ 
                        color: activeTokenTab === tab.id ? primaryColor : 'var(--jtech-text-body)',
                        borderColor: activeTokenTab === tab.id ? primaryColor : 'transparent'
                      }}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="p-4 space-y-2">
                <TabsContent value="action" className="mt-0 space-y-2">
                  {selectedBrand.actionTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="brand" className="mt-0 space-y-2">
                  {selectedBrand.brandTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="surface" className="mt-0 space-y-2">
                  {selectedBrand.surfaceTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="border" className="mt-0 space-y-2">
                  {selectedBrand.borderTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="shadow" className="mt-0 space-y-2">
                  {selectedBrand.shadowTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="focus" className="mt-0 space-y-2">
                  {selectedBrand.focusTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="gradient" className="mt-0 space-y-2">
                  {selectedBrand.gradientTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="component" className="mt-0 space-y-2">
                  {selectedBrand.componentTokens.map((token) => (
                    <TokenRow 
                      key={token.token} 
                      {...token} 
                      brandColor={primaryColor}
                    />
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Classes e Mixins */}
      <section>
        <SectionHeader
          icon={Zap}
          title="Classes e"
          titleAccent="Mixins"
          badge="Helpers"
        />
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* CSS Classes */}
          <Card
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)',
              borderColor: 'var(--jtech-card-border)'
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center gap-2 text-lg"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                <Code className="h-5 w-5" style={{ color: primaryColor }} />
                Classes CSS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brandClasses.map((cls) => (
                <div 
                  key={cls.name}
                  className="p-3 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--jtech-card-border)',
                    borderLeftWidth: 3, 
                    borderLeftColor: primaryColor 
                  }}
                >
                  <code 
                    className="text-sm font-mono"
                    style={{ color: 'var(--jtech-heading-secondary)' }}
                  >
                    {cls.name}
                  </code>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--jtech-text-body)' }}
                  >
                    {cls.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SCSS Mixins */}
          <Card
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)',
              borderColor: 'var(--jtech-card-border)'
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center gap-2 text-lg"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                <Zap className="h-5 w-5" style={{ color: primaryColor }} />
                Mixins SCSS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scssMixins.map((mixin) => (
                <div 
                  key={mixin.name}
                  className="p-3 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--jtech-card-border)',
                    borderLeftWidth: 3, 
                    borderLeftColor: primaryColor 
                  }}
                >
                  <code 
                    className="text-xs font-mono"
                    style={{ color: 'var(--jtech-heading-secondary)' }}
                  >
                    {mixin.name}
                  </code>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--jtech-text-body)' }}
                  >
                    {mixin.description}
                  </p>
                  <code 
                    className="text-[10px]"
                    style={{ color: 'var(--jtech-text-muted)' }}
                  >
                    {mixin.params}
                  </code>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Funções SCSS */}
      <section>
        <SectionHeader
          icon={Code}
          title="Funções"
          titleAccent="SCSS"
          badge="Utilities"
        />

        <Card
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            borderColor: 'var(--jtech-card-border)'
          }}
        >
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-3">
              {scssFunctions.map((fn) => (
                <div 
                  key={fn.name}
                  className="p-3 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--jtech-card-border)',
                    borderLeftWidth: 3, 
                    borderLeftColor: primaryColor 
                  }}
                >
                  <code 
                    className="text-sm font-mono"
                    style={{ color: 'var(--jtech-heading-secondary)' }}
                  >
                    {fn.name}
                  </code>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--jtech-text-body)' }}
                  >
                    {fn.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Código de Configuração */}
      <section>
        <SectionHeader
          icon={Layers}
          title="Configuração e"
          titleAccent="Uso"
          badge="Exemplos"
        />

        <Card
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            borderColor: 'var(--jtech-card-border)'
          }}
        >
          <CardContent className="p-6 space-y-6">
            {/* HTML Attribute */}
            <div>
              <h4 
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                Via Atributo HTML
              </h4>
              <pre 
                className="p-4 rounded-lg overflow-x-auto text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <code style={{ color: 'var(--jtech-text-body)' }}>{`<!-- Definir marca no elemento root -->
<html data-brand="water">
  <!-- ou -->
<div data-brand="hub">...</div>
<div data-brand="waste">...</div>`}</code>
              </pre>
            </div>

            {/* CSS Class */}
            <div>
              <h4 
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                Via Classe CSS
              </h4>
              <pre 
                className="p-4 rounded-lg overflow-x-auto text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <code style={{ color: 'var(--jtech-text-body)' }}>{`<!-- Forçar marca em elemento específico -->
<div class="dss-brand-water">...</div>
<button class="dss-brand-hub">Hub Button</button>
<section class="dss-brand-waste">...</section>

<!-- Forçar modo semântico (ignora marca) -->
<div class="dss-mode-semantic">...</div>`}</code>
              </pre>
            </div>

            {/* SCSS */}
            <div>
              <h4 
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                Via SCSS Mixin
              </h4>
              <pre 
                className="p-4 rounded-lg overflow-x-auto text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <code style={{ color: 'var(--jtech-text-body)' }}>{`// Aplicar contexto de marca
.my-component {
  @include dss-brand-context('water');
  
  // Ou criar variantes por marca
  @include dss-brand-variant('button');
  
  // Usar gradiente de marca
  @include dss-brand-gradient('hub', 'diagonal');
}`}</code>
              </pre>
            </div>

            {/* Arquivos */}
            <div>
              <h4 
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--jtech-heading-secondary)' }}
              >
                Estrutura de Arquivos
              </h4>
              <pre 
                className="p-4 rounded-lg overflow-x-auto text-sm font-mono"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <code style={{ color: 'var(--jtech-text-body)' }}>{`tokens/brand/
├── _hub.scss      # Tokens da marca Hub (Laranja)
├── _water.scss    # Tokens da marca Water (Azul)
├── _waste.scss    # Tokens da marca Waste (Verde)
└── index.scss     # Entry point com classes e mixins`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
