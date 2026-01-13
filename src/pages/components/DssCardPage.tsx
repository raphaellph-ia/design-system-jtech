import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { 
  Copy, Check, Layers, Code, FileText, 
  LayoutDashboard, Image, CreditCard, User, Settings,
  ChevronRight, MoreHorizontal, Heart, Share2, Bookmark
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ============================================================================
// TOKENS REAIS DO DSS - Extraídos de index.css e globals.scss
// ============================================================================

// Variantes Visuais do DssCard
const variants = [
  { name: "elevated", label: "Elevated", desc: "Card com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Sem elevação, apenas background", hasElevation: false },
  { name: "bordered", label: "Bordered", desc: "Com borda + elevação", hasElevation: true },
  { name: "outlined", label: "Outlined", desc: "Com borda, sem elevação", hasElevation: false },
];

// Paletas de Marca REAIS do DSS (Veolia Brands)
const brandColors = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",
    scale: {
      50: "#fff9ed", 100: "#fef2d6", 200: "#fde2ab", 300: "#fbcb76", 
      400: "#f8aa3f", 500: "#f5911a", 600: "#ef7a11", 700: "#bf590f", 
      800: "#984614", 900: "#7a3614", 950: "#421d08"
    },
    tokens: {
      principal: "--dss-hub-600",
      hover: "--dss-hub-700",
      light: "--dss-hub-300",
      disable: "--dss-hub-200"
    }
  },
  water: {
    name: "water",
    label: "Water",
    icon: "🔵",
    principal: "#0e88e4",
    scale: {
      50: "#f0f7ff", 100: "#e0eefe", 200: "#badefd", 300: "#7dc4fc", 
      400: "#38a6f8", 500: "#0e88e4", 600: "#026cc7", 700: "#0356a1", 
      800: "#074a85", 900: "#0c3e6e", 950: "#082749"
    },
    tokens: {
      principal: "--dss-water-500",
      hover: "--dss-water-600",
      light: "--dss-water-300",
      disable: "--dss-water-200"
    }
  },
  waste: {
    name: "waste",
    label: "Waste",
    icon: "🟢",
    principal: "#18b173",
    scale: {
      50: "#edfcf4", 100: "#d3f8e2", 200: "#abefcb", 300: "#74e1ae", 
      400: "#3ccb8d", 500: "#18b173", 600: "#0b8154", 700: "#0a724e", 
      800: "#0a5b3e", 900: "#0a4a34", 950: "#042a1e"
    },
    tokens: {
      principal: "--dss-waste-500",
      hover: "--dss-waste-600",
      light: "--dss-waste-300",
      disable: "--dss-waste-200"
    }
  }
};

// Props API do DssCard
const propsData = [
  { category: "Visual", prop: "variant", type: "'elevated' | 'flat' | 'bordered' | 'outlined'", default: "'elevated'", description: "Estilo visual do card" },
  { category: "Visual", prop: "square", type: "Boolean", default: "false", description: "Remove border-radius (cantos quadrados)" },
  { category: "Interação", prop: "clickable", type: "Boolean", default: "false", description: "Torna o card interativo (hover/focus)" },
  { category: "Tema", prop: "dark", type: "Boolean", default: "false", description: "Aplica modo escuro ao card" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Veolia" },
];

// Props do DssCardSection
const sectionPropsData = [
  { prop: "horizontal", type: "Boolean", default: "false", description: "Layout horizontal (flex-row)" },
];

// Props do DssCardActions
const actionsPropsData = [
  { prop: "align", type: "'left' | 'center' | 'right' | 'between' | 'around'", default: "'right'", description: "Alinhamento dos botões" },
  { prop: "vertical", type: "Boolean", default: "false", description: "Layout vertical para ações" },
];

// Tokens utilizados pelo DssCard
const tokensUsed = [
  { category: "Surface", token: "--dss-surface-default", value: "#ffffff", usage: "Background padrão" },
  { category: "Surface", token: "--dss-surface-dark", value: "#2a2a2a", usage: "Background dark mode" },
  { category: "Surface", token: "--dss-surface-hover", value: "rgba(0,0,0,0.04)", usage: "Hover em cards flat" },
  { category: "Elevation", token: "--dss-elevation-1", value: "0 1px 3px rgba(0,0,0,0.1)", usage: "Elevação padrão" },
  { category: "Elevation", token: "--dss-elevation-2", value: "0 4px 6px rgba(0,0,0,0.12)", usage: "Hover elevation" },
  { category: "Border", token: "--dss-gray-300", value: "#d4d4d4", usage: "Borda bordered/outlined" },
  { category: "Border", token: "--dss-gray-400", value: "#a3a3a3", usage: "Borda hover" },
  { category: "Border Radius", token: "--dss-radius-lg", value: "12px", usage: "Border-radius padrão" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding actions" },
  { category: "Spacing", token: "--dss-spacing-6", value: "24px", usage: "Padding sections" },
  { category: "Brands", token: "--dss-hub-600", value: "#ef7a11", usage: "Brand Hub border" },
  { category: "Brands", token: "--dss-water-500", value: "#0e88e4", usage: "Brand Water border" },
  { category: "Brands", token: "--dss-waste-500", value: "#18b173", usage: "Brand Waste border" },
];

// Anatomia 4 Camadas DSS
const anatomyLayers = [
  { layer: 1, name: "Structure", file: "1-structure/DssCard.vue", desc: "Template Vue + Props + Slots", color: "#ef7a11" },
  { layer: 2, name: "Composition", file: "2-composition/_base.scss", desc: "Layout, padding, overflow", color: "#0e88e4" },
  { layer: 3, name: "Variants", file: "3-variants/*.scss", desc: "elevated, flat, bordered, outlined", color: "#18b173" },
  { layer: 4, name: "Output", file: "4-output/*.scss", desc: "Dark mode, brands, estados", color: "#ff6607" },
];

// ============================================================================
// COMPONENTE CARD PREVIEW COM TOKENS REAIS
// ============================================================================

interface DssCardPreviewProps {
  variant?: string;
  clickable?: boolean;
  square?: boolean;
  dark?: boolean;
  brand?: string | null;
  children?: React.ReactNode;
  showToken?: boolean;
}

function DssCardPreview({
  variant = "elevated",
  clickable = false,
  square = false,
  dark = false,
  brand = null,
  children,
  showToken = false,
}: DssCardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Obter cor da marca
  const getBrandColor = () => {
    if (brand && brandColors[brand as keyof typeof brandColors]) {
      return brandColors[brand as keyof typeof brandColors].principal;
    }
    return null;
  };

  const brandColor = getBrandColor();

  // Estilos baseados na variante COM suporte a hover dinâmico
  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      backgroundColor: dark ? "#2a2a2a" : "#ffffff",
      color: dark ? "#ffffff" : "#1a1a1a",
      borderRadius: square ? "0" : "12px",
      overflow: "hidden",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: clickable ? "pointer" : "default",
      borderLeft: brand ? `4px solid ${brandColor}` : undefined,
    };

    switch (variant) {
      case "flat":
        return {
          ...base,
          boxShadow: "none",
          backgroundColor: isHovered && clickable 
            ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)") 
            : (dark ? "#2a2a2a" : "#ffffff"),
        };
      case "bordered":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? "#a3a3a3" : "#d4d4d4"}`,
          borderLeftWidth: brand ? "4px" : "1px",
          borderLeftColor: brand ? brandColor : (isHovered && clickable ? "#a3a3a3" : "#d4d4d4"),
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.1)",
        };
      case "outlined":
        return {
          ...base,
          border: `1px solid ${isHovered && clickable ? (brand ? brandColor : "#1f86de") : "#d4d4d4"}`,
          borderLeftWidth: brand ? "4px" : "1px",
          borderLeftColor: brand ? brandColor : (isHovered && clickable ? "#1f86de" : "#d4d4d4"),
          boxShadow: "none",
          backgroundColor: isHovered && clickable 
            ? (brand ? `${brandColor}0d` : "rgba(31, 134, 222, 0.05)") 
            : (dark ? "#2a2a2a" : "#ffffff"),
        };
      case "elevated":
      default:
        return {
          ...base,
          boxShadow: isHovered && clickable
            ? "0 4px 6px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.1)",
        };
    }
  };

  const tokenName = `--dss-elevation-${variant === "elevated" ? "1" : "0"}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        style={getVariantStyles()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? "button" : undefined}
      >
        {children}
      </div>
      {showToken && (
        <code 
          className="text-[10px] font-mono mt-2"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {tokenName}
        </code>
      )}
    </div>
  );
}

// Card Section Component
function CardSection({ 
  children, 
  horizontal = false,
  className = "",
  style = {},
  isFirst = false,
  brand = null
}: { 
  children: React.ReactNode; 
  horizontal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isFirst?: boolean;
  brand?: string | null;
}) {
  const brandColor = brand ? brandColors[brand as keyof typeof brandColors]?.principal : null;
  
  return (
    <div 
      className={`p-6 ${horizontal ? "flex items-center gap-4" : ""} ${className}`}
      style={{
        ...style,
        backgroundColor: isFirst && brand ? `${brandColor}0d` : undefined,
      }}
    >
      {children}
    </div>
  );
}

// Card Actions Component
function CardActions({ 
  children, 
  align = "right" 
}: { 
  children: React.ReactNode; 
  align?: "left" | "center" | "right" | "between" | "around";
}) {
  const justifyMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
    between: "space-between",
    around: "space-around",
  };

  return (
    <div 
      className="flex gap-2 p-4"
      style={{
        justifyContent: justifyMap[align],
        borderTop: "1px solid #e5e5e5",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// TOKEN ROW COMPONENT (Jtech Style)
// ============================================================================

function TokenRow({ token, value, usage }: { token: string; value: string; usage: string }) {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = value.startsWith("#") || value.startsWith("rgb");

  return (
    <div 
      className="group flex items-center gap-4 py-3 px-4 rounded-lg transition-all cursor-pointer"
      onClick={copyToken}
      style={{ 
        backgroundColor: 'var(--jtech-card-bg)',
        border: '1px solid var(--jtech-card-border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-hover-border)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {isColor && (
        <div 
          className="w-8 h-8 rounded-md flex-shrink-0"
          style={{ backgroundColor: value, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        />
      )}
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono" style={{ color: 'var(--jtech-heading-secondary)' }}>
          {token}
        </code>
        <p className="text-xs mt-0.5" style={{ color: 'var(--jtech-text-body)' }}>{usage}</p>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-[10px] font-mono" style={{ color: 'var(--jtech-text-muted)' }}>
          {value}
        </code>
        {copied ? (
          <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} />
        ) : (
          <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--jtech-text-muted)' }} />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssCardPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isClickable, setIsClickable] = useState(false);
  const [isSquare, setIsSquare] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeExample = `<DssCard
  variant="${selectedVariant}"${selectedBrand ? `\n  brand="${selectedBrand}"` : ""}${isClickable ? "\n  clickable" : ""}${isSquare ? "\n  square" : ""}${isDark ? "\n  dark" : ""}
>
  <DssCardSection>
    <h3>Título do Card</h3>
    <p>Conteúdo do card aqui.</p>
  </DssCardSection>
  <DssCardActions>
    <DssButton variant="flat">Cancelar</DssButton>
    <DssButton>Confirmar</DssButton>
  </DssCardActions>
</DssCard>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokensByCategory = tokensUsed.reduce((acc, token) => {
    if (!acc[token.category]) acc[token.category] = [];
    acc[token.category].push(token);
    return acc;
  }, {} as Record<string, typeof tokensUsed>);

  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Header - Jtech Style */}
      <PageHeader
        icon={LayoutDashboard}
        badge="DSS Component"
        badgeVariant="default"
        title="Componente"
        titleAccent="DssCard"
        subtitle="Container flexível para agrupamento de conteúdo. Implementa tokens genéricos DSS, arquitetura 4 camadas, brandability completa e acessibilidade WCAG 2.1 AA."
        subtitleHighlights={["tokens genéricos DSS", "arquitetura 4 camadas", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* Quick Stats - Jtech Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "4", label: "Variantes", color: "#1f86de" },
          { value: "3", label: "Subcomponentes", color: "#26a69a" },
          { value: "3", label: "Brands Veolia", color: brandColors.hub.principal },
          { value: "2", label: "Temas", color: brandColors.waste.principal },
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

      {/* Interactive Playground - Jtech Style */}
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
            Configure o Card
          </CardTitle>
          <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
            Selecione as props e veja o resultado em tempo real com tokens DSS reais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div 
            className="p-8 rounded-lg flex items-center justify-center min-h-[280px] relative"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.3)',
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          >
            <DssCardPreview
              variant={selectedVariant}
              clickable={isClickable}
              square={isSquare}
              dark={isDark}
              brand={selectedBrand}
              showToken={true}
            >
              <CardSection isFirst={true} brand={selectedBrand}>
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: selectedBrand 
                        ? brandColors[selectedBrand as keyof typeof brandColors]?.scale[100]
                        : '#e5f0ff'
                    }}
                  >
                    <User className="w-5 h-5" style={{ color: selectedBrand ? brandColors[selectedBrand as keyof typeof brandColors]?.principal : '#1f86de' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: isDark ? '#ffffff' : '#1a1a1a' }}>
                      Título do Card
                    </h4>
                    <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#666' }}>
                      Subtítulo ou descrição
                    </p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : '#444' }}>
                  Este é um exemplo de conteúdo dentro do DssCard. O componente é flexível e suporta qualquer tipo de conteúdo.
                </p>
              </CardSection>
              <CardActions align="right">
                <button 
                  className="px-3 py-1.5 text-xs font-medium rounded"
                  style={{ 
                    color: selectedBrand ? brandColors[selectedBrand as keyof typeof brandColors]?.principal : '#1f86de',
                    backgroundColor: 'transparent'
                  }}
                >
                  Cancelar
                </button>
                <button 
                  className="px-3 py-1.5 text-xs font-medium text-white rounded"
                  style={{ 
                    backgroundColor: selectedBrand 
                      ? brandColors[selectedBrand as keyof typeof brandColors]?.principal 
                      : '#1f86de'
                  }}
                >
                  Confirmar
                </button>
              </CardActions>
            </DssCardPreview>
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

            {/* States */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>Estados & Opções</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'clickable', label: 'Clickable', active: isClickable, toggle: () => setIsClickable(!isClickable) },
                  { key: 'square', label: 'Square', active: isSquare, toggle: () => setIsSquare(!isSquare) },
                  { key: 'dark', label: 'Dark', active: isDark, toggle: () => setIsDark(!isDark) },
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
              <code>{codeExample}</code>
            </pre>
            <button
              className="absolute top-2 right-2 p-2 rounded hover:bg-white/10 transition-colors"
              onClick={copyCode}
              style={{ color: 'var(--jtech-text-muted)' }}
            >
              {copied ? <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Galeria Tabs - Jtech Style */}
      <SectionHeader
        title="Galeria de"
        titleAccent="Variantes"
        badge="4 variantes • 3 brands"
      />

      <Tabs defaultValue="variantes" className="space-y-4">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}
        >
          {["Variantes", "Brands", "Exemplos", "Dark Mode"].map((tab) => (
            <TabsTrigger 
              key={tab.toLowerCase().replace(" ", "-")}
              value={tab.toLowerCase().replace(" ", "-")}
              className="data-[state=active]:bg-[var(--dss-jtech-accent)] data-[state=active]:text-white"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Variantes Tab */}
        <TabsContent value="variantes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <DssCardPreview variant={v.name} clickable={true}>
                      <CardSection>
                        <h4 className="font-semibold text-sm mb-2">Card {v.label}</h4>
                        <p className="text-xs" style={{ color: '#666' }}>
                          Passe o mouse para ver o efeito de hover.
                        </p>
                      </CardSection>
                    </DssCardPreview>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(brandColors).map((b) => (
              <Card 
                key={b.name}
                className="transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{b.icon}</span>
                    <Badge 
                      className="text-xs"
                      style={{ backgroundColor: b.principal, color: 'white' }}
                    >
                      {b.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <DssCardPreview variant="bordered" brand={b.name} clickable={true}>
                      <CardSection isFirst={true} brand={b.name}>
                        <h4 className="font-semibold text-sm mb-2">Brand {b.label}</h4>
                        <p className="text-xs" style={{ color: '#666' }}>
                          Card com identidade visual {b.label}.
                        </p>
                      </CardSection>
                      <CardActions align="right">
                        <button 
                          className="px-3 py-1.5 text-xs font-medium rounded"
                          style={{ color: b.principal }}
                        >
                          Ver mais
                        </button>
                      </CardActions>
                    </DssCardPreview>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exemplos Tab */}
        <TabsContent value="exemplos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Card */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-2">
                <Badge className="w-fit text-xs" style={{ backgroundColor: '#1f86de', color: 'white' }}>
                  Product Card
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <DssCardPreview variant="elevated" clickable={true}>
                    <div 
                      className="h-32 flex items-center justify-center"
                      style={{ backgroundColor: '#f5f5f5' }}
                    >
                      <Image className="w-12 h-12" style={{ color: '#ccc' }} />
                    </div>
                    <CardSection>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">Produto Premium</h4>
                        <span className="font-bold text-sm" style={{ color: '#1f86de' }}>R$ 299</span>
                      </div>
                      <p className="text-xs mb-3" style={{ color: '#666' }}>
                        Descrição breve do produto.
                      </p>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-3 py-2 text-xs font-medium text-white rounded"
                          style={{ backgroundColor: '#1f86de' }}
                        >
                          Comprar
                        </button>
                        <button 
                          className="p-2 rounded"
                          style={{ backgroundColor: '#f5f5f5' }}
                        >
                          <Heart className="w-4 h-4" style={{ color: '#666' }} />
                        </button>
                      </div>
                    </CardSection>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>

            {/* User Profile Card */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-2">
                <Badge className="w-fit text-xs" style={{ backgroundColor: '#26a69a', color: 'white' }}>
                  Profile Card
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <DssCardPreview variant="bordered">
                    <CardSection horizontal={true}>
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#e5f0ff' }}
                      >
                        <User className="w-8 h-8" style={{ color: '#1f86de' }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">João Silva</h4>
                        <p className="text-xs" style={{ color: '#666' }}>Desenvolvedor Senior</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="text-[10px]" variant="secondary">React</Badge>
                          <Badge className="text-[10px]" variant="secondary">TypeScript</Badge>
                        </div>
                      </div>
                      <button className="p-2 rounded-full" style={{ backgroundColor: '#f5f5f5' }}>
                        <MoreHorizontal className="w-4 h-4" style={{ color: '#666' }} />
                      </button>
                    </CardSection>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-2">
                <Badge className="w-fit text-xs" style={{ backgroundColor: '#18b173', color: 'white' }}>
                  Stats Card
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <DssCardPreview variant="flat" brand="waste">
                    <CardSection isFirst={true} brand="waste">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium" style={{ color: '#666' }}>
                          ECONOMIA MENSAL
                        </span>
                        <Settings className="w-4 h-4" style={{ color: '#666' }} />
                      </div>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#18b173' }}>
                        42.5%
                      </div>
                      <p className="text-xs" style={{ color: '#666' }}>
                        <span style={{ color: '#18b173' }}>↑ 12%</span> vs mês anterior
                      </p>
                    </CardSection>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Dark Mode Tab */}
        <TabsContent value="dark-mode" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light vs Dark comparison */}
            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Badge className="text-xs" variant="outline">Light Mode</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#f5f5f5' }}>
                  <DssCardPreview variant="elevated" clickable={true} dark={false}>
                    <CardSection>
                      <h4 className="font-semibold text-sm mb-2">Card Light</h4>
                      <p className="text-xs" style={{ color: '#666' }}>
                        Visualização no tema claro padrão.
                      </p>
                    </CardSection>
                    <CardActions>
                      <button className="px-3 py-1.5 text-xs font-medium text-white rounded" style={{ backgroundColor: '#1f86de' }}>
                        Ação
                      </button>
                    </CardActions>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Badge className="text-xs" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Dark Mode</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
                  <DssCardPreview variant="elevated" clickable={true} dark={true}>
                    <CardSection>
                      <h4 className="font-semibold text-sm mb-2">Card Dark</h4>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Visualização no tema escuro.
                      </p>
                    </CardSection>
                    <CardActions>
                      <button className="px-3 py-1.5 text-xs font-medium text-white rounded" style={{ backgroundColor: '#1f86de' }}>
                        Ação
                      </button>
                    </CardActions>
                  </DssCardPreview>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Arquitetura 4 Camadas */}
      <SectionHeader
        title="Arquitetura"
        titleAccent="4 Camadas"
        badge="DSS Pattern"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {anatomyLayers.map((layer) => (
              <div 
                key={layer.layer}
                className="p-4 rounded-lg transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderLeft: `4px solid ${layer.color}`
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.layer}
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--jtech-heading-secondary)' }}>
                    {layer.name}
                  </span>
                </div>
                <code className="text-xs block mb-2" style={{ color: layer.color }}>
                  {layer.file}
                </code>
                <p className="text-xs" style={{ color: 'var(--jtech-text-muted)' }}>
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Props Table */}
      <SectionHeader
        title="Public"
        titleAccent="API"
        badge="Props Reference"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg" style={{ color: 'var(--jtech-heading-secondary)' }}>
            <FileText className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
            DssCard Props
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Categoria</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Prop</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Tipo</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Default</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propsData.map((row) => (
                  <TableRow key={row.prop}>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{row.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--dss-jtech-accent)' }}>{row.prop}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.type}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.default}</code>
                    </TableCell>
                    <TableCell style={{ color: 'var(--jtech-text-body)' }}>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Subcomponents Props */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg" style={{ color: 'var(--jtech-heading-secondary)' }}>
              <Layers className="h-5 w-5" style={{ color: '#26a69a' }} />
              DssCardSection Props
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Prop</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Tipo</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionPropsData.map((row) => (
                  <TableRow key={row.prop}>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: '#26a69a' }}>{row.prop}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.type}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.default}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs mt-3" style={{ color: 'var(--jtech-text-muted)' }}>
              {sectionPropsData[0].description}
            </p>
          </CardContent>
        </Card>

        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg" style={{ color: 'var(--jtech-heading-secondary)' }}>
              <Layers className="h-5 w-5" style={{ color: '#ff6607' }} />
              DssCardActions Props
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Prop</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Tipo</TableHead>
                  <TableHead style={{ color: 'var(--jtech-heading-tertiary)' }}>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actionsPropsData.map((row) => (
                  <TableRow key={row.prop}>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: '#ff6607' }}>{row.prop}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.type}</code>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono" style={{ color: 'var(--jtech-text-muted)' }}>{row.default}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs mt-3" style={{ color: 'var(--jtech-text-muted)' }}>
              {actionsPropsData[0].description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tokens Reference */}
      <SectionHeader
        title="Tokens"
        titleAccent="Utilizados"
        badge={`${tokensUsed.length} tokens`}
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardContent className="p-6">
          <div className="space-y-6">
            {Object.entries(tokensByCategory).map(([category, tokens]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--jtech-heading-tertiary)' }}>
                  {category}
                </h4>
                <div className="grid gap-2">
                  {tokens.map((token) => (
                    <TokenRow key={token.token} {...token} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acessibilidade */}
      <SectionHeader
        title="Acessibilidade"
        titleAccent="WCAG 2.1 AA"
        badge="A11y"
      />

      <Card 
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)', 
          borderColor: 'var(--jtech-card-border)' 
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>
                Navegação por Teclado
              </h4>
              <div className="space-y-2">
                {[
                  { key: "Tab", action: "Move focus para o card (se clickable)" },
                  { key: "Enter/Space", action: "Ativa o card clickable" },
                  { key: "Escape", action: "Remove focus do card" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <kbd 
                      className="px-2 py-1 text-xs font-mono rounded"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--jtech-card-border)'
                      }}
                    >
                      {item.key}
                    </kbd>
                    <span className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{item.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--jtech-heading-tertiary)' }}>
                Atributos ARIA
              </h4>
              <div className="space-y-2">
                {[
                  { attr: "role='button'", desc: "Aplicado quando clickable" },
                  { attr: "tabindex='0'", desc: "Permite focus em cards clickable" },
                  { attr: "aria-label", desc: "Descrição acessível (quando necessário)" },
                ].map((item) => (
                  <div key={item.attr} className="flex items-start gap-3">
                    <code 
                      className="px-2 py-1 text-xs font-mono rounded flex-shrink-0"
                      style={{ 
                        backgroundColor: 'rgba(31, 134, 222, 0.1)',
                        color: '#1f86de'
                      }}
                    >
                      {item.attr}
                    </code>
                    <span className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
