import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Copy, Check, Palette, Droplets, Leaf, Sun, AlertTriangle, CheckCircle2, Info, XCircle, Lightbulb } from "lucide-react";
import { useState } from "react";

// =============================================
// DSS TOKENS - Conforme DSS_TOKEN_GUIDELINES.md
// Estas paletas são para DEMONSTRAÇÃO do Design System
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

// Paletas de Marca (DSS Demo)
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

// Cores de Feedback (DSS Demo)
const feedbackColors = [
  { 
    category: "success",
    icon: CheckCircle2,
    title: "Success",
    desc: "Confirmações e ações bem-sucedidas",
    principal: "#4dd228",
    tokens: [
      { token: "--dss-positive", value: "#4dd228", desc: "Principal" },
      { token: "--dss-positive-light", value: "#b9f2a4", desc: "Light" },
      { token: "--dss-positive-disable", value: "#dbf8d1", desc: "Disable" },
      { token: "--dss-positive-hover", value: "#27910D", desc: "Hover" },
      { token: "--dss-positive-deep", value: "#246714", desc: "Deep" },
    ]
  },
  { 
    category: "error",
    icon: XCircle,
    title: "Error",
    desc: "Erros e ações destrutivas",
    principal: "#d8182e",
    tokens: [
      { token: "--dss-negative", value: "#d8182e", desc: "Principal" },
      { token: "--dss-negative-light", value: "#ffa0ab", desc: "Light" },
      { token: "--dss-negative-disable", value: "#ffcfd4", desc: "Disable" },
      { token: "--dss-negative-hover", value: "#a01424", desc: "Hover" },
      { token: "--dss-negative-deep", value: "#720e19", desc: "Deep" },
    ]
  },
  { 
    category: "warning",
    icon: AlertTriangle,
    title: "Warning",
    desc: "Alertas e avisos importantes",
    principal: "#fabd14",
    tokens: [
      { token: "--dss-warning", value: "#fabd14", desc: "Principal" },
      { token: "--dss-warning-light", value: "#fff488", desc: "Light" },
      { token: "--dss-warning-disable", value: "#fff9c3", desc: "Disable" },
      { token: "--dss-warning-hover", value: "#dd8e02", desc: "Hover" },
      { token: "--dss-warning-deep", value: "#a66d08", desc: "Deep" },
    ]
  },
  { 
    category: "info",
    icon: Info,
    title: "Info",
    desc: "Informações e dicas contextuais",
    principal: "#0cc4e9",
    tokens: [
      { token: "--dss-info", value: "#0cc4e9", desc: "Principal" },
      { token: "--dss-info-light", value: "#a7effa", desc: "Light" },
      { token: "--dss-info-disable", value: "#d2f6fc", desc: "Disable" },
      { token: "--dss-info-hover", value: "#0c8bae", desc: "Hover" },
      { token: "--dss-info-deep", value: "#0d7491", desc: "Deep" },
    ]
  }
];

// Cores Semânticas (DSS Demo)
const semanticColors = [
  {
    category: "primary",
    title: "Primary",
    desc: "Ações principais e links",
    principal: "#1f86de",
    tokens: [
      { token: "--dss-primary", value: "#1f86de", desc: "Principal" },
      { token: "--dss-primary-light", value: "#86c0f3", desc: "Light" },
      { token: "--dss-primary-disable", value: "#b3dcff", desc: "Disable" },
      { token: "--dss-primary-hover", value: "#0f5295", desc: "Hover" },
      { token: "--dss-primary-deep", value: "#0a3a6a", desc: "Deep" },
    ]
  },
  {
    category: "secondary",
    title: "Secondary",
    desc: "Ações secundárias",
    principal: "#26a69a",
    tokens: [
      { token: "--dss-secondary", value: "#26a69a", desc: "Principal" },
      { token: "--dss-secondary-light", value: "#6ddbcb", desc: "Light" },
      { token: "--dss-secondary-disable", value: "#b5ece4", desc: "Disable" },
      { token: "--dss-secondary-hover", value: "#1c857e", desc: "Hover" },
      { token: "--dss-secondary-deep", value: "#116761", desc: "Deep" },
    ]
  },
  {
    category: "tertiary",
    title: "Tertiary",
    desc: "Ações terciárias e destaques",
    principal: "#ff6607",
    tokens: [
      { token: "--dss-tertiary", value: "#ff6607", desc: "Principal" },
      { token: "--dss-tertiary-light", value: "#ff9452", desc: "Light" },
      { token: "--dss-tertiary-disable", value: "#ffd2b5", desc: "Disable" },
      { token: "--dss-tertiary-hover", value: "#de5500", desc: "Hover" },
      { token: "--dss-tertiary-deep", value: "#ad4200", desc: "Deep" },
    ]
  },
  {
    category: "accent",
    title: "Accent",
    desc: "Elementos de destaque visual",
    principal: "#b454c4",
    tokens: [
      { token: "--dss-accent", value: "#b454c4", desc: "Principal" },
      { token: "--dss-accent-light", value: "#e3bceb", desc: "Light" },
      { token: "--dss-accent-disable", value: "#f0ddf4", desc: "Disable" },
      { token: "--dss-accent-hover", value: "#883b90", desc: "Hover" },
      { token: "--dss-accent-deep", value: "#642f6a", desc: "Deep" },
    ]
  },
  {
    category: "dark",
    title: "Dark",
    desc: "Textos e elementos escuros",
    principal: "#454545",
    tokens: [
      { token: "--dss-dark", value: "#454545", desc: "Principal" },
      { token: "--dss-dark-light", value: "#b0b0b0", desc: "Light" },
      { token: "--dss-dark-disable", value: "#d7d7d7", desc: "Disable" },
      { token: "--dss-dark-hover", value: "#313131", desc: "Hover" },
      { token: "--dss-dark-deep", value: "#1d1d1d", desc: "Deep" },
    ]
  }
];

interface ColorSwatchProps {
  token: string;
  value: string;
  desc: string;
  level?: string;
  state?: string;
}

function ColorSwatch({ token, value, desc, level, state }: ColorSwatchProps) {
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
    const styles = {
      principal: { bg: '#4dd228', color: 'white', label: 'PRINCIPAL' },
      hover: { bg: '#0e88e4', color: 'white', label: 'HOVER' },
      light: { bg: '#fabd14', color: '#1a1a1a', label: 'LIGHT' },
      disable: { bg: '#666666', color: 'white', label: 'DISABLE' },
      deep: { bg: '#262626', color: 'white', label: 'DEEP' },
    };
    
    if (!state || !styles[state as keyof typeof styles]) return null;
    const s = styles[state as keyof typeof styles];
    
    return (
      <Badge 
        className="text-[9px] px-1.5 py-0 h-4 font-semibold"
        style={{ backgroundColor: s.bg, color: s.color }}
      >
        {s.label}
      </Badge>
    );
  };

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group"
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)',
        border: '1px solid var(--jtech-card-border)'
      }}
      onClick={handleCopy}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-hover-border)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div 
        className="h-10 w-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ 
          backgroundColor: value,
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}
      >
        {copied && (
          <Check 
            size={14} 
            className={isLight(value) ? "text-gray-800" : "text-white"} 
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <code 
            className="text-xs font-mono font-medium"
            style={{ color: 'var(--jtech-heading-secondary)' }}
          >
            {token}
          </code>
          {getStateBadge(state)}
        </div>
        <div className="flex items-center gap-2">
          {level && (
            <span 
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                color: 'var(--jtech-text-muted)' 
              }}
            >
              {level}
            </span>
          )}
          <span className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
            {desc}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <code 
          className="text-[10px] font-mono uppercase"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {value}
        </code>
        <Copy 
          size={12} 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--jtech-text-muted)' }}
        />
      </div>
    </div>
  );
}

function BrandPaletteSection({ 
  title, 
  icon: Icon,
  colors, 
  principal,
  description
}: { 
  title: string; 
  icon: React.ElementType;
  colors: ColorSwatchProps[]; 
  principal: string;
  description: string;
}) {
  return (
    <Card 
      className="transition-all duration-300 hover:shadow-lg overflow-hidden"
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)', 
        borderColor: 'var(--jtech-card-border)' 
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="h-12 w-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: principal }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>{title}</CardTitle>
            <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
              {description}
            </CardDescription>
          </div>
        </div>
        
        {/* Visual scale bar */}
        <div className="flex rounded-lg overflow-hidden h-3 mt-3">
          {colors.map((color) => (
            <div 
              key={color.token}
              className="flex-1 transition-all duration-200 hover:flex-[2]"
              style={{ backgroundColor: color.value }}
              title={`${color.level}: ${color.value}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {colors.map((color) => (
          <ColorSwatch key={color.token} {...color} />
        ))}
      </CardContent>
    </Card>
  );
}

function FeedbackCard({ 
  category, 
  icon: Icon, 
  title, 
  desc, 
  principal, 
  tokens 
}: { 
  category: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  principal: string;
  tokens: { token: string; value: string; desc: string }[];
}) {
  return (
    <Card 
      className="transition-all duration-300 hover:shadow-lg overflow-hidden"
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)', 
        borderColor: 'var(--jtech-card-border)',
        borderTopWidth: '3px',
        borderTopColor: principal
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div 
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: principal }}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
              {title}
            </CardTitle>
            <CardDescription className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
              {desc}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {tokens.map((t) => (
          <ColorSwatch key={t.token} {...t} />
        ))}
      </CardContent>
    </Card>
  );
}

export default function ColorsPage() {
  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Section - Jtech Style */}
      <PageHeader
        icon={Palette}
        badge="Fundações"
        badgeVariant="accent"
        title="Sistema de"
        titleAccent="Cores"
        subtitle="Paleta completa de cores do DSS incluindo escalas de cinza, cores de marca e tokens de feedback. Clique em qualquer cor para copiar."
        subtitleHighlights={["escalas de cinza", "cores de marca", "tokens de feedback"]}
        extraBadges={[
          { label: "200+ Tokens", variant: "info" }
        ]}
      />

      {/* Tabs Navigation - Jtech Style */}
      <Tabs defaultValue="brands" className="space-y-6">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}
        >
          <TabsTrigger 
            value="brands" 
            className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{ color: 'var(--jtech-text-body)' }}
          >
            <Sun className="h-4 w-4 mr-2" />
            Marcas
          </TabsTrigger>
          <TabsTrigger 
            value="semantic" 
            className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{ color: 'var(--jtech-text-body)' }}
          >
            <Palette className="h-4 w-4 mr-2" />
            Semânticas
          </TabsTrigger>
          <TabsTrigger 
            value="grayscale" 
            className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{ color: 'var(--jtech-text-body)' }}
          >
            Escala de Cinza
          </TabsTrigger>
          <TabsTrigger 
            value="feedback" 
            className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{ color: 'var(--jtech-text-body)' }}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
        </TabsList>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <BrandPaletteSection
              title="Sansys Hub"
              icon={Sun}
              colors={brandHub}
              principal="#ef7a11"
              description="Plataforma central de gestão"
            />
            <BrandPaletteSection
              title="Sansys Water"
              icon={Droplets}
              colors={brandWater}
              principal="#0e88e4"
              description="Gestão de recursos hídricos"
            />
            <BrandPaletteSection
              title="Sansys Waste"
              icon={Leaf}
              colors={brandWaste}
              principal="#0b8154"
              description="Gestão de resíduos sólidos"
            />
          </div>
        </TabsContent>

        {/* Semantic Colors Tab */}
        <TabsContent value="semantic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {semanticColors.map((semantic) => (
              <Card 
                key={semantic.category}
                className="transition-all duration-300 hover:shadow-lg overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)',
                  borderTopWidth: '3px',
                  borderTopColor: semantic.principal
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: semantic.principal }}
                    >
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                        {semantic.title}
                      </CardTitle>
                      <CardDescription className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
                        {semantic.desc}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {semantic.tokens.map((t) => (
                    <ColorSwatch key={t.token} {...t} />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Grayscale Tab */}
        <TabsContent value="grayscale" className="mt-6">
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Escala Neutra
                </CardTitle>
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: 'var(--jtech-card-border)',
                    color: 'var(--jtech-text-muted)'
                  }}
                >
                  11 tokens
                </Badge>
              </div>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Base para textos, bordas e superfícies
              </CardDescription>
              
              {/* Visual scale bar */}
              <div className="flex rounded-lg overflow-hidden h-4 mt-4">
                {grayScale.map((color) => (
                  <div 
                    key={color.token}
                    className="flex-1 transition-all duration-200 hover:flex-[2]"
                    style={{ backgroundColor: color.value }}
                    title={`${color.level}: ${color.value}`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {grayScale.map((color) => (
                <ColorSwatch key={color.token} {...color} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbackColors.map((feedback) => (
              <FeedbackCard key={feedback.category} {...feedback} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Usage Guidelines - Jtech Style */}
      <section className="space-y-4">
        <SectionHeader 
          title="Diretrizes de" 
          titleAccent="Uso"
          icon={Lightbulb}
          variant="accent"
        />
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 
                  className="font-semibold flex items-center gap-2"
                  style={{ color: 'var(--jtech-heading-secondary)' }}
                >
                  <CheckCircle2 className="h-4 w-4" style={{ color: '#4dd228' }} />
                  Boas Práticas
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#4dd228' }}>✓</span>
                    Use tokens semânticos em vez de cores diretas
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#4dd228' }}>✓</span>
                    Mantenha contraste WCAG 2.1 AA (4.5:1 para texto)
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#4dd228' }}>✓</span>
                    Use cores de feedback para estados de sistema
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#4dd228' }}>✓</span>
                    Aplique marca via data-brand no root
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 
                  className="font-semibold flex items-center gap-2"
                  style={{ color: 'var(--jtech-heading-secondary)' }}
                >
                  <XCircle className="h-4 w-4" style={{ color: '#d8182e' }} />
                  Evitar
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#d8182e' }}>✗</span>
                    Cores hardcoded (ex: #ff0000)
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#d8182e' }}>✗</span>
                    Criar tokens específicos por componente
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#d8182e' }}>✗</span>
                    Misturar tokens de marcas diferentes
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#d8182e' }}>✗</span>
                    Usar cores de feedback para decoração
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
