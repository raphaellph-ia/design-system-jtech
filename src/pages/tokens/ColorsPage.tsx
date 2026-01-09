import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Copy, Check, Info } from "lucide-react";
import { useState } from "react";

// =============================================
// DSS TOKENS - Conforme DSS_TOKEN_GUIDELINES.md
// =============================================

// Escala de Cinza (11 tokens)
const grayScale = [
  { token: "--dss-gray-50", value: "#ffffff", level: "50", desc: "Branco puro" },
  { token: "--dss-gray-100", value: "#fafafa", level: "100", desc: "Fundos muito claros" },
  { token: "--dss-gray-200", value: "#f5f5f5", level: "200", desc: "Fundos claros" },
  { token: "--dss-gray-300", value: "#e5e5e5", level: "300", desc: "Bordas padrão" },
  { token: "--dss-gray-400", value: "#d4d4d4", level: "400", desc: "Bordas hover" },
  { token: "--dss-gray-500", value: "#a3a3a3", level: "500", desc: "Textos secundários" },
  { token: "--dss-gray-600", value: "#737373", level: "600", desc: "Textos terciários" },
  { token: "--dss-gray-700", value: "#525252", level: "700", desc: "Textos escuros" },
  { token: "--dss-gray-800", value: "#262626", level: "800", desc: "Fundos escuros" },
  { token: "--dss-gray-900", value: "#0a0a0a", level: "900", desc: "Textos preto" },
  { token: "--dss-gray-950", value: "#000000", level: "950", desc: "Preto puro" },
];

// Paletas de Marca - Com padrão de estados conforme guidelines
// Hub: Principal=600 | Light=300 | Disable=200 | Hover/Focus=800 | Deep=950
const brandHub = [
  { token: "--dss-hub-50", value: "#fff9ed", level: "50", desc: "Mais claro" },
  { token: "--dss-hub-100", value: "#fef2d6", level: "100", desc: "Claro" },
  { token: "--dss-hub-200", value: "#fde2ab", level: "200", desc: "🔒 Disable", state: "disable" },
  { token: "--dss-hub-300", value: "#fbcb76", level: "300", desc: "✨ Light", state: "light" },
  { token: "--dss-hub-400", value: "#f8aa3f", level: "400", desc: "Médio" },
  { token: "--dss-hub-500", value: "#f5911a", level: "500", desc: "Padrão" },
  { token: "--dss-hub-600", value: "#ef7a11", level: "600", desc: "✅ Principal", state: "principal" },
  { token: "--dss-hub-700", value: "#bf590f", level: "700", desc: "Escuro" },
  { token: "--dss-hub-800", value: "#984614", level: "800", desc: "💡 Hover/Focus", state: "hover" },
  { token: "--dss-hub-900", value: "#7a3614", level: "900", desc: "Profundo" },
  { token: "--dss-hub-950", value: "#421d08", level: "950", desc: "🎯 Deep", state: "deep" },
];

// Water: Principal=500 | Light=300 | Disable=200 | Hover/Focus=700 | Deep=950
const brandWater = [
  { token: "--dss-water-50", value: "#f0f7ff", level: "50", desc: "Mais claro" },
  { token: "--dss-water-100", value: "#e0eefe", level: "100", desc: "Claro" },
  { token: "--dss-water-200", value: "#badefd", level: "200", desc: "🔒 Disable", state: "disable" },
  { token: "--dss-water-300", value: "#7dc4fc", level: "300", desc: "✨ Light", state: "light" },
  { token: "--dss-water-400", value: "#38a6f8", level: "400", desc: "Médio" },
  { token: "--dss-water-500", value: "#0e88e4", level: "500", desc: "✅ Principal", state: "principal" },
  { token: "--dss-water-600", value: "#026cc7", level: "600", desc: "Padrão" },
  { token: "--dss-water-700", value: "#0356a1", level: "700", desc: "💡 Hover/Focus", state: "hover" },
  { token: "--dss-water-800", value: "#074a85", level: "800", desc: "Muito escuro" },
  { token: "--dss-water-900", value: "#0c3e6e", level: "900", desc: "Profundo" },
  { token: "--dss-water-950", value: "#082749", level: "950", desc: "🎯 Deep", state: "deep" },
];

// Waste: Principal=600 | Light=300 | Disable=200 | Hover/Focus=800 | Deep=950
const brandWaste = [
  { token: "--dss-waste-50", value: "#edfcf4", level: "50", desc: "Mais claro" },
  { token: "--dss-waste-100", value: "#d3f8e2", level: "100", desc: "Claro" },
  { token: "--dss-waste-200", value: "#abefcb", level: "200", desc: "🔒 Disable", state: "disable" },
  { token: "--dss-waste-300", value: "#74e1ae", level: "300", desc: "✨ Light", state: "light" },
  { token: "--dss-waste-400", value: "#3ccb8d", level: "400", desc: "Médio" },
  { token: "--dss-waste-500", value: "#18b173", level: "500", desc: "Padrão" },
  { token: "--dss-waste-600", value: "#0b8154", level: "600", desc: "✅ Principal", state: "principal" },
  { token: "--dss-waste-700", value: "#0a724e", level: "700", desc: "Escuro" },
  { token: "--dss-waste-800", value: "#0a5b3e", level: "800", desc: "💡 Hover/Focus", state: "hover" },
  { token: "--dss-waste-900", value: "#0a4a34", level: "900", desc: "Profundo" },
  { token: "--dss-waste-950", value: "#042a1e", level: "950", desc: "🎯 Deep", state: "deep" },
];

// Cores Semânticas de Ação (conforme _actions.scss)
const actionColors = {
  primary: {
    title: "Primary (Azul)",
    hex: "#1f86de",
    colors: [
      { token: "--dss-action-primary-disable", ref: "--dss-primary-disable", value: "#b3dcff", desc: "Desabilitado" },
      { token: "--dss-action-primary-light", ref: "--dss-primary-light", value: "#86c0f3", desc: "Variante clara" },
      { token: "--dss-action-primary", ref: "--dss-primary", value: "#1f86de", desc: "Cor principal" },
      { token: "--dss-action-primary-hover", ref: "--dss-primary-hover", value: "#0f5295", desc: "Hover" },
      { token: "--dss-action-primary-deep", ref: "--dss-primary-deep", value: "#0a3a6a", desc: "Active/Deep" },
      { token: "--dss-action-primary-focus", ref: "--dss-primary-focus", value: "#006AC5", desc: "Focus" },
    ]
  },
  secondary: {
    title: "Secondary (Verde/Turquesa)",
    hex: "#26a69a",
    colors: [
      { token: "--dss-action-secondary-disable", ref: "--dss-secondary-disable", value: "#b5ece4", desc: "Desabilitado" },
      { token: "--dss-action-secondary-light", ref: "--dss-secondary-light", value: "#6ddbcb", desc: "Variante clara" },
      { token: "--dss-action-secondary", ref: "--dss-secondary", value: "#26a69a", desc: "Cor principal" },
      { token: "--dss-action-secondary-hover", ref: "--dss-secondary-hover", value: "#1c857e", desc: "Hover" },
      { token: "--dss-action-secondary-deep", ref: "--dss-secondary-deep", value: "#116761", desc: "Active/Deep" },
      { token: "--dss-action-secondary-focus", ref: "--dss-secondary-focus", value: "#009C8D", desc: "Focus" },
    ]
  },
  tertiary: {
    title: "Tertiary (Laranja)",
    hex: "#ff6607",
    colors: [
      { token: "--dss-action-tertiary-disable", ref: "--dss-tertiary-disable", value: "#ffd2b5", desc: "Desabilitado" },
      { token: "--dss-action-tertiary-light", ref: "--dss-tertiary-light", value: "#ff9452", desc: "Variante clara" },
      { token: "--dss-action-tertiary", ref: "--dss-tertiary", value: "#ff6607", desc: "Cor principal" },
      { token: "--dss-action-tertiary-hover", ref: "--dss-tertiary-hover", value: "#de5500", desc: "Hover" },
      { token: "--dss-action-tertiary-deep", ref: "--dss-tertiary-deep", value: "#ad4200", desc: "Active/Deep" },
      { token: "--dss-action-tertiary-focus", ref: "--dss-tertiary-focus", value: "#E95900", desc: "Focus" },
    ]
  },
  accent: {
    title: "Accent (Roxo)",
    hex: "#b454c4",
    colors: [
      { token: "--dss-action-accent-disable", ref: "--dss-accent-disable", value: "#f0ddf4", desc: "Desabilitado" },
      { token: "--dss-action-accent-light", ref: "--dss-accent-light", value: "#e3bceb", desc: "Variante clara" },
      { token: "--dss-action-accent", ref: "--dss-accent", value: "#b454c4", desc: "Cor principal" },
      { token: "--dss-action-accent-hover", ref: "--dss-accent-hover", value: "#883b90", desc: "Hover" },
      { token: "--dss-action-accent-deep", ref: "--dss-accent-deep", value: "#642f6a", desc: "Active/Deep" },
      { token: "--dss-action-accent-focus", ref: "--dss-accent-focus", value: "#B02EC5", desc: "Focus" },
    ]
  },
  dark: {
    title: "Dark (Cinza Escuro)",
    hex: "#454545",
    colors: [
      { token: "--dss-action-dark-disable", ref: "--dss-dark-disable", value: "#d7d7d7", desc: "Desabilitado" },
      { token: "--dss-action-dark-light", ref: "--dss-dark-light", value: "#b0b0b0", desc: "Variante clara" },
      { token: "--dss-action-dark", ref: "--dss-dark", value: "#454545", desc: "Cor principal" },
      { token: "--dss-action-dark-hover", ref: "--dss-dark-hover", value: "#313131", desc: "Hover" },
      { token: "--dss-action-dark-deep", ref: "--dss-dark-deep", value: "#1d1d1d", desc: "Active/Deep" },
      { token: "--dss-action-dark-focus", ref: "--dss-dark-focus", value: "#3E3E3E", desc: "Focus" },
    ]
  }
};

// Cores de Feedback (conforme _feedback.scss)
const feedbackColors = {
  success: {
    title: "Success (Sucesso)",
    hex: "#4dd228",
    colors: [
      { token: "--dss-feedback-success", ref: "--dss-positive", value: "#4dd228", desc: "Principal" },
      { token: "--dss-feedback-success-light", ref: "--dss-positive-light", value: "#b9f2a4", desc: "Light" },
      { token: "--dss-feedback-success-disable", ref: "--dss-positive-disable", value: "#dbf8d1", desc: "Disable" },
      { token: "--dss-feedback-success-hover", ref: "--dss-positive-hover", value: "#27910D", desc: "Hover" },
      { token: "--dss-feedback-success-deep", ref: "--dss-positive-deep", value: "#246714", desc: "Deep" },
    ]
  },
  error: {
    title: "Error (Erro)",
    hex: "#d8182e",
    colors: [
      { token: "--dss-feedback-error", ref: "--dss-negative", value: "#d8182e", desc: "Principal" },
      { token: "--dss-feedback-error-light", ref: "--dss-negative-light", value: "#ffa0ab", desc: "Light" },
      { token: "--dss-feedback-error-disable", ref: "--dss-negative-disable", value: "#ffcfd4", desc: "Disable" },
      { token: "--dss-feedback-error-hover", ref: "--dss-negative-hover", value: "#a01424", desc: "Hover" },
      { token: "--dss-feedback-error-deep", ref: "--dss-negative-deep", value: "#720e19", desc: "Deep" },
    ]
  },
  warning: {
    title: "Warning (Aviso)",
    hex: "#fabd14",
    colors: [
      { token: "--dss-feedback-warning", ref: "--dss-warning", value: "#fabd14", desc: "Principal" },
      { token: "--dss-feedback-warning-light", ref: "--dss-warning-light", value: "#fff488", desc: "Light" },
      { token: "--dss-feedback-warning-disable", ref: "--dss-warning-disable", value: "#fff9c3", desc: "Disable" },
      { token: "--dss-feedback-warning-hover", ref: "--dss-warning-hover", value: "#dd8e02", desc: "Hover" },
      { token: "--dss-feedback-warning-deep", ref: "--dss-warning-deep", value: "#a66d08", desc: "Deep" },
    ]
  },
  info: {
    title: "Info (Informação)",
    hex: "#0cc4e9",
    colors: [
      { token: "--dss-feedback-info", ref: "--dss-info", value: "#0cc4e9", desc: "Principal" },
      { token: "--dss-feedback-info-light", ref: "--dss-info-light", value: "#a7effa", desc: "Light" },
      { token: "--dss-feedback-info-disable", ref: "--dss-info-disable", value: "#d2f6fc", desc: "Disable" },
      { token: "--dss-feedback-info-hover", ref: "--dss-info-hover", value: "#0c8bae", desc: "Hover" },
      { token: "--dss-feedback-info-deep", ref: "--dss-info-deep", value: "#0d7491", desc: "Deep" },
    ]
  }
};

interface ColorSwatchProps {
  token: string;
  value: string;
  desc: string;
  level?: string;
  state?: string;
  ref?: string;
}

function ColorSwatch({ token, value, desc, level, state, ref }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLight = (hex: string) => {
    const c = hex.replace('#', '');
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 180;
  };

  const getStateBadge = (state?: string) => {
    switch (state) {
      case 'principal':
        return <Badge className="bg-green-600 text-white text-[10px] px-1.5">PRINCIPAL</Badge>;
      case 'hover':
        return <Badge className="bg-blue-600 text-white text-[10px] px-1.5">HOVER</Badge>;
      case 'light':
        return <Badge className="bg-yellow-500 text-black text-[10px] px-1.5">LIGHT</Badge>;
      case 'disable':
        return <Badge className="bg-gray-400 text-white text-[10px] px-1.5">DISABLE</Badge>;
      case 'deep':
        return <Badge className="bg-gray-800 text-white text-[10px] px-1.5">DEEP</Badge>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg border border-[var(--dss-gray-300)] hover:border-[var(--dss-primary)] transition-colors group cursor-pointer"
      onClick={handleCopy}
    >
      <div 
        className="h-12 w-12 rounded-md border border-[var(--dss-gray-400)] flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm"
        style={{ backgroundColor: value }}
      >
        {copied && (
          <Check 
            size={16} 
            className={isLight(value) ? "text-[var(--dss-gray-800)]" : "text-white"} 
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <code className="text-sm font-mono text-[var(--dss-gray-800)]">{token}</code>
          {getStateBadge(state)}
        </div>
        <div className="flex items-center gap-2">
          {level && <span className="text-xs text-[var(--dss-gray-500)] font-medium">{level}</span>}
          <span className="text-xs text-[var(--dss-gray-600)]">{desc}</span>
        </div>
        {ref && (
          <code className="text-[10px] text-[var(--dss-gray-400)] block mt-0.5">
            → {ref}
          </code>
        )}
      </div>
      <div className="flex items-center gap-2">
        <code className="text-xs text-[var(--dss-gray-500)] font-mono uppercase">
          {value}
        </code>
        <Copy size={14} className="text-[var(--dss-gray-400)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

function BrandPaletteCard({ 
  title, 
  colors, 
  statePattern 
}: { 
  title: string; 
  colors: ColorSwatchProps[]; 
  statePattern: string 
}) {
  return (
    <Card className="border-[var(--dss-gray-300)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[var(--dss-gray-900)]">{title}</CardTitle>
          <span className="text-[11px] px-2 py-1 rounded bg-[var(--dss-gray-200)] text-[var(--dss-gray-600)] font-mono">
            11 tokens
          </span>
        </div>
        <CardDescription className="text-[var(--dss-gray-600)] text-sm">
          {statePattern}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Visual scale */}
        <div className="flex rounded-lg overflow-hidden mb-4 border border-[var(--dss-gray-300)]">
          {colors.map((color) => (
            <div 
              key={color.token}
              className="flex-1 h-10 relative group"
              style={{ backgroundColor: color.value }}
              title={`${color.token}: ${color.value}`}
            >
              {color.state && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-[10px] font-bold ${
                    parseInt(color.level || '0') > 500 ? 'text-white' : 'text-[var(--dss-gray-900)]'
                  }`}>
                    {color.level}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="space-y-1.5">
          {colors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActionColorCard({ 
  title, 
  hex, 
  colors 
}: { 
  title: string; 
  hex: string; 
  colors: ColorSwatchProps[] 
}) {
  return (
    <Card className="border-[var(--dss-gray-300)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="h-8 w-8 rounded-md border border-[var(--dss-gray-400)]"
              style={{ backgroundColor: hex }}
            />
            <CardTitle className="text-[var(--dss-gray-900)]">{title}</CardTitle>
          </div>
          <span className="text-[11px] px-2 py-1 rounded bg-[var(--dss-gray-200)] text-[var(--dss-gray-600)] font-mono">
            6 tokens
          </span>
        </div>
        <CardDescription className="text-[var(--dss-gray-600)] text-sm">
          Estados: disable → light → principal → hover → deep → focus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {colors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FeedbackColorCard({ 
  title, 
  hex, 
  colors 
}: { 
  title: string; 
  hex: string; 
  colors: ColorSwatchProps[] 
}) {
  return (
    <Card className="border-[var(--dss-gray-300)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="h-8 w-8 rounded-md border border-[var(--dss-gray-400)]"
              style={{ backgroundColor: hex }}
            />
            <CardTitle className="text-[var(--dss-gray-900)]">{title}</CardTitle>
          </div>
          <span className="text-[11px] px-2 py-1 rounded bg-[var(--dss-gray-200)] text-[var(--dss-gray-600)] font-mono">
            5 tokens
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {colors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ColorsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[var(--dss-gray-600)]">
          <Link to="/" className="hover:text-[var(--dss-primary)] transition-colors">Início</Link>
          <span>/</span>
          <span className="text-[var(--dss-gray-500)]">Fundações</span>
          <span>/</span>
          <span className="text-[var(--dss-gray-900)] font-medium">Cores</span>
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--dss-gray-900)]">
          Tokens de Cor
        </h1>
        
        <p className="text-lg text-[var(--dss-gray-600)] max-w-3xl">
          Sistema de cores do DSS. Tokens são <strong>provedores genéricos</strong> — 
          componentes escolhem quais tokens usar baseado em suas necessidades.
        </p>
      </section>

      {/* Filosofia */}
      <Card className="border-[var(--dss-primary)] bg-[var(--dss-primary)]/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Info className="h-5 w-5 text-[var(--dss-primary)] flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--dss-gray-900)]">Filosofia DSS</h3>
              <p className="text-sm text-[var(--dss-gray-700)]">
                <strong>Tokens = Provedores</strong> (valores abstratos e genéricos) | 
                <strong> Componentes = Consumidores</strong> (escolhem quais tokens usar).
                Um token serve N componentes. Novos componentes = 0 novos tokens.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="brands" className="space-y-6">
        <TabsList className="bg-[var(--dss-gray-200)] p-1">
          <TabsTrigger value="brands" className="data-[state=active]:bg-white">Paletas de Marca</TabsTrigger>
          <TabsTrigger value="gray" className="data-[state=active]:bg-white">Escala de Cinza</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-white">Cores de Ação</TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-white">Cores de Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="brands" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <BrandPaletteCard 
              title="Hub (Laranja/Marrom)" 
              colors={brandHub}
              statePattern="Principal=600 | Light=300 | Disable=200 | Hover=800 | Deep=950"
            />
            <BrandPaletteCard 
              title="Water (Azul)" 
              colors={brandWater}
              statePattern="Principal=500 | Light=300 | Disable=200 | Hover=700 | Deep=950"
            />
            <BrandPaletteCard 
              title="Waste (Verde)" 
              colors={brandWaste}
              statePattern="Principal=600 | Light=300 | Disable=200 | Hover=800 | Deep=950"
            />
          </div>
        </TabsContent>

        <TabsContent value="gray" className="space-y-6">
          <Card className="border-[var(--dss-gray-300)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--dss-gray-900)]">Escala de Cinza</CardTitle>
                <span className="text-[11px] px-2 py-1 rounded bg-[var(--dss-gray-200)] text-[var(--dss-gray-600)] font-mono">
                  11 tokens
                </span>
              </div>
              <CardDescription className="text-[var(--dss-gray-600)]">
                Cores neutras para textos, fundos, bordas e elementos de interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visual scale */}
              <div className="flex rounded-lg overflow-hidden mb-4 border border-[var(--dss-gray-300)]">
                {grayScale.map((color) => (
                  <div 
                    key={color.token}
                    className="flex-1 h-10"
                    style={{ backgroundColor: color.value }}
                    title={`${color.token}: ${color.value}`}
                  />
                ))}
              </div>
              
              <div className="space-y-1.5">
                {grayScale.map((color) => (
                  <ColorSwatch key={color.token} {...color} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActionColorCard {...actionColors.primary} />
            <ActionColorCard {...actionColors.secondary} />
            <ActionColorCard {...actionColors.tertiary} />
            <ActionColorCard {...actionColors.accent} />
          </div>
          <ActionColorCard {...actionColors.dark} />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FeedbackColorCard {...feedbackColors.success} />
            <FeedbackColorCard {...feedbackColors.error} />
            <FeedbackColorCard {...feedbackColors.warning} />
            <FeedbackColorCard {...feedbackColors.info} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Brand States Summary */}
      <Card className="border-[var(--dss-gray-300)]">
        <CardHeader>
          <CardTitle className="text-[var(--dss-gray-900)]">Padrão de Estados para Marcas</CardTitle>
          <CardDescription className="text-[var(--dss-gray-600)]">
            As paletas de marca seguem um padrão consistente de uso para interações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--dss-gray-300)]">
                  <th className="text-left py-2 px-3 text-[var(--dss-gray-700)] font-medium">Marca</th>
                  <th className="text-center py-2 px-3 text-[var(--dss-gray-700)] font-medium">Principal</th>
                  <th className="text-center py-2 px-3 text-[var(--dss-gray-700)] font-medium">Light</th>
                  <th className="text-center py-2 px-3 text-[var(--dss-gray-700)] font-medium">Disable</th>
                  <th className="text-center py-2 px-3 text-[var(--dss-gray-700)] font-medium">Hover/Focus</th>
                  <th className="text-center py-2 px-3 text-[var(--dss-gray-700)] font-medium">Deep</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--dss-gray-200)]">
                  <td className="py-2 px-3 font-medium text-[var(--dss-gray-900)]">Hub</td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-hub-600)] text-white px-2 py-0.5 rounded">600</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-hub-300)] px-2 py-0.5 rounded">300</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-hub-200)] px-2 py-0.5 rounded">200</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-hub-800)] text-white px-2 py-0.5 rounded">800</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-hub-950)] text-white px-2 py-0.5 rounded">950</code></td>
                </tr>
                <tr className="border-b border-[var(--dss-gray-200)]">
                  <td className="py-2 px-3 font-medium text-[var(--dss-gray-900)]">Water</td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-water-500)] text-white px-2 py-0.5 rounded">500</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-water-300)] px-2 py-0.5 rounded">300</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-water-200)] px-2 py-0.5 rounded">200</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-water-700)] text-white px-2 py-0.5 rounded">700</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-water-950)] text-white px-2 py-0.5 rounded">950</code></td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-[var(--dss-gray-900)]">Waste</td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-waste-600)] text-white px-2 py-0.5 rounded">600</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-waste-300)] px-2 py-0.5 rounded">300</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-waste-200)] px-2 py-0.5 rounded">200</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-waste-800)] text-white px-2 py-0.5 rounded">800</code></td>
                  <td className="text-center py-2 px-3"><code className="text-xs bg-[var(--dss-waste-950)] text-white px-2 py-0.5 rounded">950</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card className="border-[var(--dss-gray-300)]">
        <CardHeader>
          <CardTitle className="text-[var(--dss-gray-900)]">Como Usar</CardTitle>
          <CardDescription className="text-[var(--dss-gray-600)]">
            Componentes consomem tokens genéricos — não crie tokens específicos para componentes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2 text-[var(--dss-gray-800)]">✅ Correto — Componente consome tokens genéricos</p>
            <pre className="bg-[var(--dss-gray-900)] text-[var(--dss-gray-100)] p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`.dss-button--primary {
  background: var(--dss-action-primary);
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
}

.dss-button--primary:hover {
  background: var(--dss-action-primary-hover);
}

.dss-button--primary:disabled {
  background: var(--dss-action-primary-disable);
  opacity: var(--dss-opacity-disabled);
}`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-[var(--dss-negative)]">❌ Errado — Tokens específicos para componentes</p>
            <pre className="bg-[var(--dss-gray-900)] text-[var(--dss-gray-100)] p-4 rounded-lg overflow-x-auto opacity-75">
              <code className="text-sm">{`/* NÃO FAÇA ISSO */
:root {
  --dss-button-primary-color: var(--dss-primary);
  --dss-button-padding: 12px 24px;
  --dss-card-border-radius: 8px;
}`}</code>
            </pre>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-[var(--dss-gray-800)]">Brandabilidade — Cores de marca</p>
            <pre className="bg-[var(--dss-gray-900)] text-[var(--dss-gray-100)] p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`/* Componente com brandabilidade */
.dss-button--primary {
  background: var(--dss-action-primary);
}

[data-brand="hub"] .dss-button--primary {
  background: var(--dss-hub-600);
}

[data-brand="hub"] .dss-button--primary:hover {
  background: var(--dss-hub-800);
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
