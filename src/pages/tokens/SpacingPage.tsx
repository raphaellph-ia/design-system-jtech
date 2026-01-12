import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Copy, Check, Space, Grid, Box, Smartphone, Monitor, Maximize, Move } from "lucide-react";
import { useState } from "react";

// =============================================
// DSS TOKENS - Conforme _spacing.scss
// =============================================

// Escala Base (REM Based - 1rem = 16px)
const spacingScale = [
  { token: "--dss-spacing-0", value: "0", px: "0px", desc: "Zero" },
  { token: "--dss-spacing-px", value: "1px", px: "1px", desc: "Bordas finas" },
  { token: "--dss-spacing-0_5", value: "0.125rem", px: "2px", desc: "Micro" },
  { token: "--dss-spacing-1", value: "0.25rem", px: "4px", desc: "Extra pequeno" },
  { token: "--dss-spacing-1_5", value: "0.375rem", px: "6px", desc: "Pequeno+" },
  { token: "--dss-spacing-2", value: "0.5rem", px: "8px", desc: "Pequeno", common: true },
  { token: "--dss-spacing-2_5", value: "0.625rem", px: "10px", desc: "Médio-" },
  { token: "--dss-spacing-3", value: "0.75rem", px: "12px", desc: "Médio" },
  { token: "--dss-spacing-3_5", value: "0.875rem", px: "14px", desc: "Médio+" },
  { token: "--dss-spacing-4", value: "1rem", px: "16px", desc: "Base padrão", common: true, default: true },
  { token: "--dss-spacing-5", value: "1.25rem", px: "20px", desc: "Grande-" },
  { token: "--dss-spacing-6", value: "1.5rem", px: "24px", desc: "Grande", common: true },
  { token: "--dss-spacing-7", value: "1.75rem", px: "28px", desc: "Grande+" },
  { token: "--dss-spacing-8", value: "2rem", px: "32px", desc: "Extra grande", common: true },
  { token: "--dss-spacing-9", value: "2.25rem", px: "36px", desc: "XL-" },
  { token: "--dss-spacing-10", value: "2.5rem", px: "40px", desc: "XL" },
  { token: "--dss-spacing-11", value: "2.75rem", px: "44px", desc: "XL+" },
  { token: "--dss-spacing-12", value: "3rem", px: "48px", desc: "2XL", common: true },
  { token: "--dss-spacing-14", value: "3.5rem", px: "56px", desc: "2XL+" },
  { token: "--dss-spacing-16", value: "4rem", px: "64px", desc: "3XL" },
  { token: "--dss-spacing-20", value: "5rem", px: "80px", desc: "4XL" },
  { token: "--dss-spacing-24", value: "6rem", px: "96px", desc: "5XL" },
];

// Espaçamentos semânticos
const semanticSpacing = {
  layout: [
    { token: "--dss-container-padding", value: "var(--dss-spacing-4)", px: "16px", desc: "Padding do container" },
    { token: "--dss-section-spacing", value: "var(--dss-spacing-12)", px: "48px", desc: "Espaço entre seções" },
    { token: "--dss-component-spacing", value: "var(--dss-spacing-6)", px: "24px", desc: "Espaço entre componentes" },
  ],
  grid: [
    { token: "--dss-grid-gap-sm", value: "var(--dss-spacing-2)", px: "8px", desc: "Gap pequeno" },
    { token: "--dss-grid-gap-md", value: "var(--dss-spacing-4)", px: "16px", desc: "Gap médio (padrão)" },
    { token: "--dss-grid-gap-lg", value: "var(--dss-spacing-6)", px: "24px", desc: "Gap grande" },
    { token: "--dss-grid-gap-xl", value: "var(--dss-spacing-8)", px: "32px", desc: "Gap extra grande" },
  ],
  form: [
    { token: "--dss-form-gap", value: "var(--dss-spacing-4)", px: "16px", desc: "Gap entre campos" },
    { token: "--dss-label-margin-bottom", value: "var(--dss-spacing-1)", px: "4px", desc: "Margem abaixo de labels" },
  ],
};

// Margins semânticas
const margins = [
  { token: "--dss-margin-auto", value: "auto", desc: "Centralizar elementos" },
  { token: "--dss-margin-0", value: "var(--dss-spacing-0)", px: "0px", desc: "Sem margem" },
  { token: "--dss-margin-1", value: "var(--dss-spacing-1)", px: "4px", desc: "Margem mínima" },
  { token: "--dss-margin-2", value: "var(--dss-spacing-2)", px: "8px", desc: "Margem pequena" },
  { token: "--dss-margin-3", value: "var(--dss-spacing-3)", px: "12px", desc: "Margem média" },
  { token: "--dss-margin-4", value: "var(--dss-spacing-4)", px: "16px", desc: "Margem padrão" },
  { token: "--dss-margin-6", value: "var(--dss-spacing-6)", px: "24px", desc: "Margem grande" },
  { token: "--dss-margin-8", value: "var(--dss-spacing-8)", px: "32px", desc: "Margem extra grande" },
  { token: "--dss-margin-12", value: "var(--dss-spacing-12)", px: "48px", desc: "Margem seção" },
  { token: "--dss-margin-16", value: "var(--dss-spacing-16)", px: "64px", desc: "Margem máxima" },
];

// Paddings semânticos
const paddings = [
  { token: "--dss-padding-0", value: "var(--dss-spacing-0)", px: "0px", desc: "Sem padding" },
  { token: "--dss-padding-1", value: "var(--dss-spacing-1)", px: "4px", desc: "Padding mínimo" },
  { token: "--dss-padding-2", value: "var(--dss-spacing-2)", px: "8px", desc: "Padding pequeno" },
  { token: "--dss-padding-3", value: "var(--dss-spacing-3)", px: "12px", desc: "Padding médio" },
  { token: "--dss-padding-4", value: "var(--dss-spacing-4)", px: "16px", desc: "Padding padrão" },
  { token: "--dss-padding-6", value: "var(--dss-spacing-6)", px: "24px", desc: "Padding grande" },
  { token: "--dss-padding-8", value: "var(--dss-spacing-8)", px: "32px", desc: "Padding extra grande" },
  { token: "--dss-padding-12", value: "var(--dss-spacing-12)", px: "48px", desc: "Padding seção" },
  { token: "--dss-padding-16", value: "var(--dss-spacing-16)", px: "64px", desc: "Padding máximo" },
];

// Gaps semânticos (Flex/Grid)
const gaps = [
  { token: "--dss-gap-0", value: "var(--dss-spacing-0)", px: "0px", desc: "Sem gap" },
  { token: "--dss-gap-1", value: "var(--dss-spacing-1)", px: "4px", desc: "Gap mínimo" },
  { token: "--dss-gap-2", value: "var(--dss-spacing-2)", px: "8px", desc: "Gap pequeno" },
  { token: "--dss-gap-3", value: "var(--dss-spacing-3)", px: "12px", desc: "Gap médio" },
  { token: "--dss-gap-4", value: "var(--dss-spacing-4)", px: "16px", desc: "Gap padrão" },
  { token: "--dss-gap-6", value: "var(--dss-spacing-6)", px: "24px", desc: "Gap grande" },
  { token: "--dss-gap-8", value: "var(--dss-spacing-8)", px: "32px", desc: "Gap extra grande" },
  { token: "--dss-gap-12", value: "var(--dss-spacing-12)", px: "48px", desc: "Gap seção" },
];

// Border Radius
const borderRadius = [
  { token: "--dss-radius-none", value: "0", px: "0px", desc: "Sem arredondamento" },
  { token: "--dss-radius-sm", value: "var(--dss-spacing-1)", px: "4px", desc: "Pequeno" },
  { token: "--dss-radius-md", value: "var(--dss-spacing-2)", px: "8px", desc: "Médio (padrão)" },
  { token: "--dss-radius-lg", value: "var(--dss-spacing-3)", px: "12px", desc: "Grande" },
  { token: "--dss-radius-xl", value: "var(--dss-spacing-4)", px: "16px", desc: "Extra grande" },
  { token: "--dss-radius-2xl", value: "var(--dss-spacing-5)", px: "20px", desc: "2XL" },
  { token: "--dss-radius-3xl", value: "var(--dss-spacing-6)", px: "24px", desc: "3XL" },
  { token: "--dss-radius-full", value: "9999px", px: "9999px", desc: "Círculo/Pílula" },
];

// Breakpoints (conforme _breakpoints.scss)
const breakpoints = [
  { name: "xs", token: "--dss-breakpoint-xs", min: "0px", max: "599px", desc: "Mobile Portrait", icon: Smartphone, color: "#d8182e" },
  { name: "sm", token: "--dss-breakpoint-sm", min: "600px", max: "1023px", desc: "Mobile Landscape / Tablet", icon: Smartphone, color: "#fabd14" },
  { name: "md", token: "--dss-breakpoint-md", min: "1024px", max: "1439px", desc: "Tablet Landscape / Desktop", icon: Monitor, color: "#0e88e4" },
  { name: "lg", token: "--dss-breakpoint-lg", min: "1440px", max: "1919px", desc: "Desktop", icon: Monitor, color: "#0b8154" },
  { name: "xl", token: "--dss-breakpoint-xl", min: "1920px", max: "∞", desc: "Large Desktop / 4K", icon: Maximize, color: "#b454c4" },
];

// Gutters por breakpoint
const gutters = [
  { token: "--dss-gutter-xs", value: "var(--dss-spacing-4)", px: "16px", breakpoint: "xs" },
  { token: "--dss-gutter-sm", value: "var(--dss-spacing-6)", px: "24px", breakpoint: "sm" },
  { token: "--dss-gutter-md", value: "var(--dss-spacing-8)", px: "32px", breakpoint: "md" },
  { token: "--dss-gutter-lg", value: "var(--dss-spacing-10)", px: "40px", breakpoint: "lg" },
  { token: "--dss-gutter-xl", value: "var(--dss-spacing-12)", px: "48px", breakpoint: "xl" },
];

// Container max-widths
const containers = [
  { token: "--dss-container-xs", value: "100%", desc: "Full width em mobile" },
  { token: "--dss-container-sm", value: "600px", desc: "Tablet" },
  { token: "--dss-container-md", value: "1024px", desc: "Desktop pequeno" },
  { token: "--dss-container-lg", value: "1440px", desc: "Desktop" },
  { token: "--dss-container-xl", value: "1920px", desc: "Desktop grande" },
];

// Acessibilidade
const accessibilitySpacing = [
  { token: "--dss-touch-spacing", value: "var(--dss-spacing-2)", px: "8px", desc: "Mínimo entre elementos tocáveis (WCAG)" },
];

function TokenRow({ 
  token, 
  value, 
  px,
  desc, 
  isDefault = false,
  isCommon = false,
  showBar = false,
  barColor = "var(--dss-jtech-accent)"
}: { 
  token: string; 
  value: string; 
  px?: string;
  desc: string;
  isDefault?: boolean;
  isCommon?: boolean;
  showBar?: boolean;
  barColor?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pxValue = px ? parseInt(px) : 0;

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
      {showBar && (
        <div 
          className="h-6 rounded transition-all duration-200 group-hover:opacity-80 flex-shrink-0"
          style={{ 
            width: `${Math.min(pxValue, 100)}px`,
            minWidth: '4px',
            backgroundColor: barColor 
          }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <code 
            className="text-xs font-mono font-medium"
            style={{ color: 'var(--jtech-heading-secondary)' }}
          >
            {token}
          </code>
          {isDefault && (
            <Badge 
              className="text-[9px] px-1.5 py-0 h-4 font-semibold"
              style={{ backgroundColor: '#4dd228', color: 'white' }}
            >
              PADRÃO
            </Badge>
          )}
          {isCommon && !isDefault && (
            <Badge 
              className="text-[9px] px-1.5 py-0 h-4 font-semibold"
              style={{ backgroundColor: 'var(--dss-jtech-accent)', color: 'white' }}
            >
              COMUM
            </Badge>
          )}
        </div>
        <p className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {px && (
          <code 
            className="text-sm font-mono font-bold"
            style={{ color: 'var(--dss-jtech-accent-light)' }}
          >
            {px}
          </code>
        )}
        <code 
          className="text-[10px] font-mono"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {value}
        </code>
        {copied ? (
          <Check size={12} style={{ color: '#4dd228' }} />
        ) : (
          <Copy 
            size={12} 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--jtech-text-muted)' }}
          />
        )}
      </div>
    </div>
  );
}

export default function SpacingPage() {
  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Section - Jtech Style */}
      <PageHeader
        icon={Space}
        badge="Fundações"
        badgeVariant="accent"
        title="Sistema de"
        titleAccent="Espaçamento"
        subtitle="Escala completa de espaçamento baseada em múltiplos de 4px. Inclui tokens para margins, paddings, gaps, breakpoints e border-radius."
        subtitleHighlights={["múltiplos de 4px", "margins", "paddings", "gaps"]}
        extraBadges={[
          { label: "50+ Tokens", variant: "info" },
          { label: "REM Based", variant: "info" }
        ]}
      />

      {/* Tabs Navigation */}
      <Tabs defaultValue="scale" className="space-y-6">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}
        >
          {[
            { value: "scale", label: "Escala Base", icon: Space },
            { value: "semantic", label: "Semânticos", icon: Box },
            { value: "radius", label: "Border Radius", icon: Move },
            { value: "breakpoints", label: "Breakpoints", icon: Monitor },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg data-[state=active]:shadow-md"
              style={{ 
                color: 'var(--jtech-text-body)'
              }}
            >
              <tab.icon size={14} />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Escala Base */}
        <TabsContent value="scale" className="space-y-6">
          <SectionHeader 
            title="Escala Base de" 
            titleAccent="Espaçamento"
            badge="REM Based (1rem = 16px)"
          />
          
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Sistema de escala baseado em múltiplos de <strong style={{ color: 'var(--jtech-heading-secondary)' }}>4px</strong>. 
                Use tokens genéricos para máxima flexibilidade. Tokens marcados como <strong style={{ color: 'var(--dss-jtech-accent)' }}>COMUM</strong> são 
                os mais utilizados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {spacingScale.map((space) => (
                <TokenRow
                  key={space.token}
                  token={space.token}
                  value={space.value}
                  px={space.px}
                  desc={space.desc}
                  isDefault={space.default}
                  isCommon={space.common}
                  showBar
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Espaçamentos Semânticos */}
        <TabsContent value="semantic" className="space-y-6">
          <SectionHeader 
            title="Espaçamentos" 
            titleAccent="Semânticos"
            badge="Layout & Grid"
            variant="accent"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Layout */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  <Box size={16} style={{ color: 'var(--dss-jtech-accent)' }} />
                  Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {semanticSpacing.layout.map((space) => (
                  <TokenRow
                    key={space.token}
                    token={space.token}
                    value={space.value}
                    px={space.px}
                    desc={space.desc}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Grid */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  <Grid size={16} style={{ color: '#0e88e4' }} />
                  Grid Gaps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {semanticSpacing.grid.map((space) => (
                  <TokenRow
                    key={space.token}
                    token={space.token}
                    value={space.value}
                    px={space.px}
                    desc={space.desc}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Margins */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Margins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                {margins.map((space) => (
                  <TokenRow
                    key={space.token}
                    token={space.token}
                    value={space.value}
                    px={space.px}
                    desc={space.desc}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Paddings */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Paddings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                {paddings.map((space) => (
                  <TokenRow
                    key={space.token}
                    token={space.token}
                    value={space.value}
                    px={space.px}
                    desc={space.desc}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Gaps */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Gaps (Flex/Grid)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {gaps.map((space) => (
                  <TokenRow
                    key={space.token}
                    token={space.token}
                    value={space.value}
                    px={space.px}
                    desc={space.desc}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Form */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Formulários
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {semanticSpacing.form.map((space) => (
                  <TokenRow
                    key={space.token}
                    token={space.token}
                    value={space.value}
                    px={space.px}
                    desc={space.desc}
                  />
                ))}
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(12, 196, 233, 0.1)', border: '1px solid rgba(12, 196, 233, 0.2)' }}>
                  <p className="text-xs" style={{ color: '#0cc4e9' }}>
                    💡 Tokens específicos de componentes foram removidos. Use tokens genéricos para máxima flexibilidade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acessibilidade */}
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                Acessibilidade (WCAG)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {accessibilitySpacing.map((space) => (
                <TokenRow
                  key={space.token}
                  token={space.token}
                  value={space.value}
                  px={space.px}
                  desc={space.desc}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Border Radius */}
        <TabsContent value="radius" className="space-y-6">
          <SectionHeader 
            title="Border" 
            titleAccent="Radius"
            badge="Arredondamentos"
          />
          
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Escala de arredondamento baseada nos tokens de espaçamento. 
                Use <strong style={{ color: 'var(--jtech-heading-secondary)' }}>--dss-radius-md</strong> como padrão para a maioria dos componentes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {borderRadius.map((radius) => (
                <div 
                  key={radius.token}
                  className="flex items-center gap-4 p-3 rounded-lg transition-all duration-200 cursor-pointer group"
                  style={{ 
                    backgroundColor: 'var(--jtech-card-bg)',
                    border: '1px solid var(--jtech-card-border)'
                  }}
                >
                  <div 
                    className="w-16 h-16 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ 
                      backgroundColor: 'var(--dss-jtech-accent)',
                      borderRadius: radius.px === "9999px" ? "9999px" : radius.px
                    }}
                  />
                  <div className="flex-1">
                    <code 
                      className="text-xs font-mono font-medium"
                      style={{ color: 'var(--jtech-heading-secondary)' }}
                    >
                      {radius.token}
                    </code>
                    <p className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
                      {radius.desc}
                    </p>
                  </div>
                  <code 
                    className="text-sm font-mono font-bold"
                    style={{ color: 'var(--dss-jtech-accent-light)' }}
                  >
                    {radius.px}
                  </code>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Breakpoints */}
        <TabsContent value="breakpoints" className="space-y-6">
          <SectionHeader 
            title="Breakpoints" 
            titleAccent="Responsivos"
            badge="Quasar/Material"
            variant="accent"
          />
          
          {/* Visual Breakpoints */}
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Sistema de breakpoints baseado em <strong style={{ color: 'var(--jtech-heading-secondary)' }}>Quasar v2</strong> e 
                <strong style={{ color: 'var(--jtech-heading-secondary)' }}> Material Design</strong>. Inclui suporte a zoom WCAG.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visual bar */}
              <div className="flex rounded-lg overflow-hidden h-8">
                {breakpoints.map((bp) => (
                  <div 
                    key={bp.name}
                    className="flex-1 flex items-center justify-center text-xs font-bold text-white transition-all duration-200 hover:flex-[1.5]"
                    style={{ backgroundColor: bp.color }}
                  >
                    {bp.name.toUpperCase()}
                  </div>
                ))}
              </div>

              {/* Breakpoint cards */}
              <div className="grid gap-3">
                {breakpoints.map((bp) => (
                  <div 
                    key={bp.token}
                    className="flex items-center gap-4 p-4 rounded-lg transition-all duration-200"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--jtech-card-border)',
                      borderLeftWidth: '4px',
                      borderLeftColor: bp.color
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${bp.color}20` }}
                    >
                      <bp.icon size={20} style={{ color: bp.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="font-bold text-lg"
                          style={{ color: bp.color }}
                        >
                          {bp.name.toUpperCase()}
                        </span>
                        <code 
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.05)', 
                            color: 'var(--jtech-text-muted)' 
                          }}
                        >
                          {bp.token}
                        </code>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                        {bp.desc}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono" style={{ color: 'var(--jtech-heading-secondary)' }}>
                        {bp.min} – {bp.max}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gutters e Containers */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Gutters por Breakpoint
                </CardTitle>
                <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                  Espaçamento lateral responsivo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {gutters.map((gutter) => (
                  <TokenRow
                    key={gutter.token}
                    token={gutter.token}
                    value={gutter.value}
                    px={gutter.px}
                    desc={`Gutter para ${gutter.breakpoint}`}
                  />
                ))}
              </CardContent>
            </Card>

            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Container Max-Width
                </CardTitle>
                <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                  Larguras máximas por breakpoint
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {containers.map((container) => (
                  <TokenRow
                    key={container.token}
                    token={container.token}
                    value={container.value}
                    desc={container.desc}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
