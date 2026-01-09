import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Copy, Check, Palette, Layers, Code, Sparkles, Shield, Zap, Eye, Grid3X3 } from "lucide-react";

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
  icon: string;
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
    icon: "🔶",
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
    icon: "💧",
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
    icon: "♻️",
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
      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors group"
      style={{ borderLeftColor: brandColor, borderLeftWidth: 3 }}
    >
      {/* Preview visual */}
      <div className="flex-shrink-0">
        {isGradient ? (
          <div 
            className="w-10 h-10 rounded-lg border border-border/30"
            style={{ background: value }}
          />
        ) : isColor ? (
          <div 
            className="w-10 h-10 rounded-lg border border-border/30"
            style={{ backgroundColor: value }}
          />
        ) : isShadow ? (
          <div 
            className="w-10 h-10 rounded-lg bg-white"
            style={{ boxShadow: value }}
          />
        ) : (
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono"
            style={{ backgroundColor: brandColor + '20', color: brandColor }}
          >
            CSS
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <code className="text-xs font-mono text-foreground truncate">{token}</code>
          <button 
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3 text-muted-foreground" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>

      {/* Value */}
      <div className="flex-shrink-0 text-right">
        <code className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">
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
      <h4 className="text-sm font-medium text-foreground">Escala de Cores {brandName}</h4>
      <div className="flex gap-1 flex-wrap">
        {Object.entries(scale).map(([step, color]) => (
          <button
            key={step}
            onClick={() => handleCopy(color, step)}
            className="group relative"
            title={`${brandName}-${step}: ${color}`}
          >
            <div 
              className="w-12 h-12 rounded-lg border border-border/30 transition-transform hover:scale-110 hover:z-10"
              style={{ backgroundColor: color }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedColor === step ? (
                <Check className="h-4 w-4 text-white drop-shadow-md" />
              ) : (
                <Copy className="h-4 w-4 text-white drop-shadow-md" />
              )}
            </div>
            <span className="block text-[10px] text-center text-muted-foreground mt-1">{step}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand, isActive }: { brand: BrandData; isActive: boolean }) {
  const primaryColor = brand.colorScale["600"] || brand.colorScale["500"];
  
  return (
    <Card 
      className={`transition-all duration-300 ${isActive ? 'ring-2 ring-offset-2' : 'hover:shadow-lg'}`}
      style={{ 
        borderLeftWidth: 4, 
        borderLeftColor: primaryColor,
        ...(isActive && { ringColor: primaryColor })
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div 
            className="h-14 w-14 rounded-xl flex items-center justify-center text-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${brand.colorScale["400"]} 0%, ${primaryColor} 100%)`,
            }}
          >
            {brand.icon}
          </div>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
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
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{brand.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Scale */}
        <ColorScalePreview scale={brand.colorScale} brandName={brand.name.split(' ')[1]} />
        
        {/* Accessibility Info */}
        <div 
          className="p-4 rounded-lg"
          style={{ backgroundColor: primaryColor + '10' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" style={{ color: primaryColor }} />
            <h4 className="text-sm font-medium">Acessibilidade WCAG</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Contraste branco:</span>
              <span className="ml-1 font-mono">{brand.accessibilityInfo.contrastOnWhite}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Contraste escuro:</span>
              <span className="ml-1 font-mono">{brand.accessibilityInfo.contrastOnDark}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{brand.accessibilityInfo.notes}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ComponentPreview({ brand }: { brand: BrandData }) {
  const primaryColor = brand.colorScale["600"] || brand.colorScale["500"];
  const hoverColor = brand.colorScale["700"];
  const lightBg = brand.colorScale["50"];

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: primaryColor }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
        >
          Botão Primário
        </button>
        <button
          className="px-4 py-2 rounded-lg font-medium border-2 transition-colors"
          style={{ 
            borderColor: primaryColor, 
            color: primaryColor,
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = lightBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Botão Outline
        </button>
        <button
          className="px-4 py-2 rounded-lg font-medium transition-colors"
          style={{ 
            backgroundColor: lightBg, 
            color: primaryColor 
          }}
        >
          Botão Flat
        </button>
      </div>

      {/* Cards */}
      <div 
        className="p-4 rounded-lg border-l-4"
        style={{ 
          backgroundColor: lightBg,
          borderLeftColor: primaryColor
        }}
      >
        <h4 className="font-medium" style={{ color: brand.colorScale["900"] }}>
          Card com Marca {brand.name.split(' ')[1]}
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          Exemplo de card utilizando tokens da marca.
        </p>
      </div>

      {/* Badge */}
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
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div 
            className="h-full rounded-full transition-all"
            style={{ 
              width: '65%',
              background: `linear-gradient(90deg, ${brand.colorScale["400"]} 0%, ${primaryColor} 100%)`
            }}
          />
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
    <div className="min-h-screen bg-background">
      {/* Hero Section com gradiente da marca ativa */}
      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${selectedBrand.colorScale["50"]} 0%, ${selectedBrand.colorScale["100"]} 50%, ${selectedBrand.colorScale["200"]}40 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: primaryColor + '30' }}
          />
          <div 
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: selectedBrand.colorScale["300"] + '40' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
            <span>/</span>
            <Link to="/padroes" className="hover:text-foreground transition-colors">Padrões</Link>
            <span>/</span>
            <span style={{ color: primaryColor }}>Brandabilidade</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${selectedBrand.colorScale["400"]} 0%, ${primaryColor} 100%)`
                  }}
                >
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Brandabilidade
                  </h1>
                  <p className="text-muted-foreground">Sistema de tokens multi-marca do DSS</p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                O DSS suporta múltiplas marcas mantendo consistência estrutural 
                e permitindo variação visual por produto. Cada marca possui sua própria 
                escala de cores e tokens derivados.
              </p>
            </div>

            {/* Brand Selector */}
            <div className="flex gap-2">
              {brandsData.map((brand) => {
                const brandPrimary = brand.colorScale["600"] || brand.colorScale["500"];
                const isActive = activeBrand === brand.key;
                return (
                  <button
                    key={brand.key}
                    onClick={() => setActiveBrand(brand.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      isActive ? 'text-white' : 'bg-white/50 hover:bg-white'
                    }`}
                    style={{
                      borderColor: brandPrimary,
                      backgroundColor: isActive ? brandPrimary : undefined,
                      color: isActive ? 'white' : brandPrimary
                    }}
                  >
                    <span>{brand.icon}</span>
                    <span className="font-medium">{brand.key}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Palette, label: "Marcas", value: "3" },
              { icon: Layers, label: "Tokens/Marca", value: "50+" },
              { icon: Grid3X3, label: "Escalas de Cor", value: "11 steps" },
              { icon: Shield, label: "WCAG AA", value: "100%" },
            ].map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-border/50"
              >
                <stat.icon className="h-5 w-5 mb-2" style={{ color: primaryColor }} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Brand Cards */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: primaryColor + '15' }}
            >
              <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Marcas Disponíveis</h2>
              <p className="text-sm text-muted-foreground">Cada marca possui escala completa de cores e tokens derivados</p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {brandsData.map((brand) => (
              <BrandCard 
                key={brand.key} 
                brand={brand} 
                isActive={activeBrand === brand.key}
              />
            ))}
          </div>
        </section>

        {/* Component Preview */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: primaryColor + '15' }}
            >
              <Eye className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Preview de Componentes</h2>
              <p className="text-sm text-muted-foreground">
                Como os componentes aparecem com a marca <strong>{selectedBrand.name}</strong>
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <ComponentPreview brand={selectedBrand} />
            </CardContent>
          </Card>
        </section>

        {/* Tokens por Categoria */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: primaryColor + '15' }}
            >
              <Code className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Tokens da Marca {selectedBrand.name.split(' ')[1]}
              </h2>
              <p className="text-sm text-muted-foreground">
                Todos os tokens CSS disponíveis para a marca selecionada
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTokenTab} onValueChange={setActiveTokenTab}>
                <div className="border-b border-border">
                  <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
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
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-current px-4 py-3"
                        style={{ 
                          color: activeTokenTab === tab.id ? primaryColor : undefined,
                          borderColor: activeTokenTab === tab.id ? primaryColor : 'transparent'
                        }}
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="p-4">
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
        <section className="grid lg:grid-cols-2 gap-6">
          {/* CSS Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5" style={{ color: primaryColor }} />
                Classes CSS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brandClasses.map((cls) => (
                <div 
                  key={cls.name}
                  className="p-3 rounded-lg border border-border/50"
                  style={{ borderLeftWidth: 3, borderLeftColor: primaryColor }}
                >
                  <code className="text-sm font-mono text-foreground">{cls.name}</code>
                  <p className="text-xs text-muted-foreground mt-1">{cls.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SCSS Mixins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5" style={{ color: primaryColor }} />
                Mixins SCSS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scssMixins.map((mixin) => (
                <div 
                  key={mixin.name}
                  className="p-3 rounded-lg border border-border/50"
                  style={{ borderLeftWidth: 3, borderLeftColor: primaryColor }}
                >
                  <code className="text-xs font-mono text-foreground">{mixin.name}</code>
                  <p className="text-xs text-muted-foreground mt-1">{mixin.description}</p>
                  <code className="text-[10px] text-muted-foreground/70">{mixin.params}</code>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Funções SCSS */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5" style={{ color: primaryColor }} />
                Funções SCSS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {scssFunctions.map((fn) => (
                  <div 
                    key={fn.name}
                    className="p-3 rounded-lg border border-border/50"
                    style={{ borderLeftWidth: 3, borderLeftColor: primaryColor }}
                  >
                    <code className="text-sm font-mono text-foreground">{fn.name}</code>
                    <p className="text-xs text-muted-foreground mt-1">{fn.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Código de Configuração */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5" style={{ color: primaryColor }} />
                Configuração
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* HTML Attribute */}
              <div>
                <h4 className="text-sm font-medium mb-2">Via Atributo HTML</h4>
                <pre 
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{ backgroundColor: primaryColor + '08' }}
                >
                  <code className="text-foreground">{`<!-- Definir marca no elemento root -->
<html data-brand="water">
  <!-- ou -->
<div data-brand="hub">...</div>
<div data-brand="waste">...</div>`}</code>
                </pre>
              </div>

              {/* CSS Class */}
              <div>
                <h4 className="text-sm font-medium mb-2">Via Classe CSS</h4>
                <pre 
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{ backgroundColor: primaryColor + '08' }}
                >
                  <code className="text-foreground">{`<!-- Forçar marca em elemento específico -->
<div class="dss-brand-water">...</div>
<button class="dss-brand-hub">Hub Button</button>
<section class="dss-brand-waste">...</section>

<!-- Forçar modo semântico (ignora marca) -->
<div class="dss-mode-semantic">...</div>`}</code>
                </pre>
              </div>

              {/* SCSS */}
              <div>
                <h4 className="text-sm font-medium mb-2">Via SCSS Mixin</h4>
                <pre 
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{ backgroundColor: primaryColor + '08' }}
                >
                  <code className="text-foreground">{`// Aplicar contexto de marca
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
                <h4 className="text-sm font-medium mb-2">Estrutura de Arquivos</h4>
                <pre 
                  className="p-4 rounded-lg overflow-x-auto text-sm font-mono"
                  style={{ backgroundColor: primaryColor + '08' }}
                >
                  <code className="text-foreground">{`tokens/brand/
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
    </div>
  );
}
