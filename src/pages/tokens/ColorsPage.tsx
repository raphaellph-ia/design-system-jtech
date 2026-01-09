import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Palette, Droplets, Leaf, Sun, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
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

// Paletas de Marca
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

// Cores de Feedback
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

// Marcas resumo
const brandsSummary = [
  { 
    name: "Sansys Hub", 
    icon: Sun,
    colorVar: "--dss-hub-600", 
    principal: "#ef7a11",
    description: "Plataforma central de gestão"
  },
  { 
    name: "Sansys Water", 
    icon: Droplets,
    colorVar: "--dss-water-500", 
    principal: "#0e88e4",
    description: "Gestão de recursos hídricos"
  },
  { 
    name: "Sansys Waste", 
    icon: Leaf,
    colorVar: "--dss-waste-600", 
    principal: "#0b8154",
    description: "Gestão de resíduos sólidos"
  },
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
      principal: { bg: 'var(--dss-positive)', color: 'white', label: 'PRINCIPAL' },
      hover: { bg: 'var(--dss-water-500)', color: 'white', label: 'HOVER' },
      light: { bg: 'var(--dss-warning)', color: 'var(--dss-gray-900)', label: 'LIGHT' },
      disable: { bg: 'var(--dss-gray-400)', color: 'white', label: 'DISABLE' },
      deep: { bg: 'var(--dss-gray-800)', color: 'white', label: 'DEEP' },
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
        backgroundColor: 'var(--dss-surface-default)',
        border: '1px solid var(--dss-gray-200)'
      }}
      onClick={handleCopy}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--dss-hub-600)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--dss-gray-200)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div 
        className="h-10 w-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ 
          backgroundColor: value,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
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
            style={{ color: 'var(--dss-text-body)' }}
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
                backgroundColor: 'var(--dss-surface-subtle)', 
                color: 'var(--dss-text-subtle)' 
              }}
            >
              {level}
            </span>
          )}
          <span className="text-xs" style={{ color: 'var(--dss-text-subtle)' }}>
            {desc}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <code 
          className="text-[10px] font-mono uppercase"
          style={{ color: 'var(--dss-text-subtle)' }}
        >
          {value}
        </code>
        <Copy 
          size={12} 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--dss-text-subtle)' }}
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
      className="transition-all duration-300 hover:shadow-lg"
      style={{ 
        backgroundColor: 'var(--dss-surface-default)', 
        borderColor: 'var(--dss-gray-200)' 
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
            <CardTitle style={{ color: 'var(--dss-text-body)' }}>{title}</CardTitle>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
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
      className="transition-all duration-300 hover:shadow-lg"
      style={{ 
        backgroundColor: 'var(--dss-surface-default)', 
        borderColor: 'var(--dss-gray-200)',
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
            <CardTitle className="text-base" style={{ color: 'var(--dss-text-body)' }}>
              {title}
            </CardTitle>
            <CardDescription className="text-xs" style={{ color: 'var(--dss-text-subtle)' }}>
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
      style={{ backgroundColor: 'var(--dss-surface-default)' }}
    >
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge 
            variant="outline" 
            style={{ borderColor: 'var(--dss-hub-600)', color: 'var(--dss-hub-600)' }}
          >
            Fundações
          </Badge>
          <Badge 
            style={{ backgroundColor: 'var(--dss-feedback-info-surface)', color: 'var(--dss-info)' }}
          >
            200+ Tokens
          </Badge>
        </div>
        
        <h1 
          className="text-3xl lg:text-4xl font-bold"
          style={{ color: 'var(--dss-text-body)' }}
        >
          <Palette className="inline-block h-8 w-8 mr-3" style={{ color: 'var(--dss-hub-600)' }} />
          Sistema de{" "}
          <span style={{ color: 'var(--dss-hub-600)' }}>Cores</span>
        </h1>
        
        <p 
          className="text-lg max-w-3xl"
          style={{ color: 'var(--dss-text-subtle)' }}
        >
          Paleta completa de cores do DSS incluindo <strong style={{ color: 'var(--dss-text-body)' }}>escalas de cinza</strong>, 
          cores de <strong style={{ color: 'var(--dss-text-body)' }}>marca</strong> e tokens de{" "}
          <strong style={{ color: 'var(--dss-text-body)' }}>feedback</strong>. Clique em qualquer cor para copiar.
        </p>
      </section>

      {/* Brands Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {brandsSummary.map((brand) => (
          <Card 
            key={brand.name}
            className="transition-all duration-300 hover:shadow-lg group cursor-pointer"
            style={{ 
              backgroundColor: 'var(--dss-surface-default)', 
              borderColor: 'var(--dss-gray-200)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = brand.principal;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--dss-gray-200)';
            }}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: brand.principal }}
              >
                <brand.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold" style={{ color: 'var(--dss-text-body)' }}>
                  {brand.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--dss-text-subtle)' }}>
                  {brand.description}
                </p>
                <code 
                  className="text-[10px] mt-1 block"
                  style={{ color: brand.principal }}
                >
                  {brand.principal}
                </code>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Tabs Navigation */}
      <Tabs defaultValue="brands" className="space-y-6">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'var(--dss-surface-subtle)',
            borderRadius: '12px'
          }}
        >
          {[
            { value: 'brands', label: 'Marcas', count: 33 },
            { value: 'gray', label: 'Escala de Cinza', count: 11 },
            { value: 'feedback', label: 'Feedback', count: 20 },
          ].map((tab) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:shadow-sm transition-all duration-200 px-4 py-2"
              style={{
                borderRadius: '8px',
              }}
            >
              <span>{tab.label}</span>
              <Badge 
                variant="secondary" 
                className="ml-2 text-[10px] h-5"
                style={{ 
                  backgroundColor: 'var(--dss-surface-default)',
                  color: 'var(--dss-text-subtle)'
                }}
              >
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BrandPaletteSection 
              title="Sansys Hub"
              icon={Sun}
              colors={brandHub}
              principal="#ef7a11"
              description="Principal=600 | Light=300 | Disable=200 | Hover=800 | Deep=950"
            />
            <BrandPaletteSection 
              title="Sansys Water"
              icon={Droplets}
              colors={brandWater}
              principal="#0e88e4"
              description="Principal=500 | Light=300 | Disable=200 | Hover=700 | Deep=950"
            />
            <BrandPaletteSection 
              title="Sansys Waste"
              icon={Leaf}
              colors={brandWaste}
              principal="#0b8154"
              description="Principal=600 | Light=300 | Disable=200 | Hover=800 | Deep=950"
            />
          </div>
        </TabsContent>

        {/* Gray Scale Tab */}
        <TabsContent value="gray" className="space-y-6">
          <Card 
            style={{ 
              backgroundColor: 'var(--dss-surface-default)', 
              borderColor: 'var(--dss-gray-200)' 
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ color: 'var(--dss-text-body)' }}>
                    Escala de Cinza
                  </CardTitle>
                  <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
                    11 tons de cinza para fundos, bordas e textos
                  </CardDescription>
                </div>
                <Badge 
                  style={{ 
                    backgroundColor: 'var(--dss-surface-subtle)',
                    color: 'var(--dss-text-subtle)'
                  }}
                >
                  11 tokens
                </Badge>
              </div>
              
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
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbackColors.map((feedback) => (
              <FeedbackCard key={feedback.category} {...feedback} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Usage Guidelines */}
      <section className="space-y-4">
        <h2 
          className="text-xl font-semibold"
          style={{ color: 'var(--dss-text-body)' }}
        >
          Diretrizes de Uso
        </h2>
        <Card 
          style={{ 
            backgroundColor: 'var(--dss-surface-subtle)', 
            borderColor: 'var(--dss-gray-200)' 
          }}
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Use var(--token) para referenciar cores",
                "Prefira tokens semânticos sobre valores hex",
                "Respeite a hierarquia: Principal > Hover > Deep",
                "Cores de feedback para estados do sistema",
                "Escala de cinza para elementos neutros",
                "Tokens de marca para identidade visual"
              ].map((guideline, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 
                    className="h-4 w-4 flex-shrink-0" 
                    style={{ color: 'var(--dss-positive)' }} 
                  />
                  <span className="text-sm" style={{ color: 'var(--dss-text-body)' }}>
                    {guideline}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
