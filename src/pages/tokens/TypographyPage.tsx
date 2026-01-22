import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DssTabs, DssTabsContent, DssTabsList, DssTabsTrigger } from "@/components/ui/dss-tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Copy, Check, Type, Heading, AlignLeft, Space, Eye, Accessibility } from "lucide-react";

// =============================================
// DSS TOKENS - Conforme accessibility/_typography.scss
// =============================================

// Famílias de Fonte (Página 8 do Guia de Acessibilidade DSS)
const fontFamilies = [
  { 
    token: "--dss-font-family-sans", 
    value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    name: "Sans-serif (Padrão)",
    desc: "Fonte principal para interfaces",
    sample: "The quick brown fox jumps over the lazy dog"
  },
  { 
    token: "--dss-font-family-mono", 
    value: "'Roboto Mono', 'SF Mono', Monaco, 'Courier New', monospace",
    name: "Monospace",
    desc: "Para código e dados técnicos",
    sample: "const dss = { version: '2.0.0' }"
  },
  { 
    token: "--dss-font-family-system", 
    value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    name: "System UI",
    desc: "Fonte nativa do sistema operacional",
    sample: "Integração nativa com o sistema"
  },
];

// Tamanhos de Fonte (WCAG 2.1 AA)
const fontSizes = [
  { token: "--dss-font-size-xs", value: "0.75rem", px: "12px", desc: "Apenas para rótulos, não para corpo", wcag: "⚠️" },
  { token: "--dss-font-size-sm", value: "0.875rem", px: "14px", desc: "Texto secundário mínimo", wcag: "⚠️" },
  { token: "--dss-font-size-md", value: "1rem", px: "16px", desc: "✅ Padrão - WCAG mínimo", wcag: "✅", default: true },
  { token: "--dss-font-size-base", value: "1rem", px: "16px", desc: "Alias para compatibilidade", wcag: "✅" },
  { token: "--dss-font-size-lg", value: "1.125rem", px: "18px", desc: "Texto grande (3:1 contraste)", wcag: "✅" },
  { token: "--dss-font-size-xl", value: "1.25rem", px: "20px", desc: "Extra grande", wcag: "✅" },
  { token: "--dss-font-size-2xl", value: "1.5rem", px: "24px", desc: "Títulos pequenos", wcag: "✅" },
  { token: "--dss-font-size-3xl", value: "1.875rem", px: "30px", desc: "Títulos médios", wcag: "✅" },
  { token: "--dss-font-size-4xl", value: "2.25rem", px: "36px", desc: "Títulos grandes", wcag: "✅" },
];

// Pesos de Fonte
const fontWeights = [
  { token: "--dss-font-weight-light", value: "300", desc: "Leve - uso limitado", sample: "Texto leve" },
  { token: "--dss-font-weight-normal", value: "400", desc: "Normal - texto corporal", sample: "Texto normal", default: true },
  { token: "--dss-font-weight-medium", value: "500", desc: "Médio - destaque sutil", sample: "Texto médio" },
  { token: "--dss-font-weight-semibold", value: "600", desc: "Semi-negrito - ênfase", sample: "Texto semi-negrito" },
  { token: "--dss-font-weight-bold", value: "700", desc: "Negrito - títulos", sample: "Texto negrito" },
  { token: "--dss-font-weight-extrabold", value: "800", desc: "Extra negrito - forte ênfase", sample: "Texto extra negrito" },
];

// Alturas de Linha
const lineHeights = [
  { token: "--dss-line-height-tight", value: "1.25", desc: "Apertado - títulos compactos" },
  { token: "--dss-line-height-snug", value: "1.375", desc: "Ajustado" },
  { token: "--dss-line-height-normal", value: "1.5", desc: "✅ Ideal para corpo", default: true },
  { token: "--dss-line-height-relaxed", value: "1.625", desc: "Relaxado - melhor leitura" },
  { token: "--dss-line-height-loose", value: "1.75", desc: "Solto - acessibilidade extra" },
];

// Espaçamento de Letras
const letterSpacings = [
  { token: "--dss-letter-spacing-tighter", value: "-0.05em", desc: "Muito apertado" },
  { token: "--dss-letter-spacing-tight", value: "-0.025em", desc: "Apertado" },
  { token: "--dss-letter-spacing-normal", value: "0", desc: "Normal - padrão para corpo", default: true },
  { token: "--dss-letter-spacing-wide", value: "0.025em", desc: "Largo" },
  { token: "--dss-letter-spacing-wider", value: "0.05em", desc: "Mais largo" },
  { token: "--dss-letter-spacing-widest", value: "0.1em", desc: "Muito largo - labels" },
];

// Hierarquia Tipográfica Semântica
const headingHierarchy = [
  { 
    level: "H1", 
    sizeToken: "--dss-heading-1-size", 
    sizeValue: "var(--dss-font-size-4xl)", 
    sizePx: "36px",
    weightToken: "--dss-heading-1-weight",
    weightValue: "700",
    lineHeightToken: "--dss-heading-1-line-height",
    lineHeightValue: "1.5",
    desc: "Maior em tudo"
  },
  { 
    level: "H2", 
    sizeToken: "--dss-heading-2-size", 
    sizeValue: "var(--dss-font-size-3xl)", 
    sizePx: "30px",
    weightToken: "--dss-heading-2-weight",
    weightValue: "600",
    lineHeightToken: "--dss-heading-2-line-height",
    lineHeightValue: "1.4",
    desc: "Seções principais"
  },
  { 
    level: "H3", 
    sizeToken: "--dss-heading-3-size", 
    sizeValue: "var(--dss-font-size-2xl)", 
    sizePx: "24px",
    weightToken: "--dss-heading-3-weight",
    weightValue: "500",
    lineHeightToken: "--dss-heading-3-line-height",
    lineHeightValue: "1.3",
    desc: "Subseções"
  },
  { 
    level: "H4", 
    sizeToken: "--dss-heading-4-size", 
    sizeValue: "var(--dss-font-size-xl)", 
    sizePx: "20px",
    weightToken: "--dss-heading-4-weight",
    weightValue: "500",
    lineHeightToken: "--dss-heading-4-line-height",
    lineHeightValue: "1.2",
    desc: "Cards e grupos"
  },
  { 
    level: "H5", 
    sizeToken: "--dss-heading-5-size", 
    sizeValue: "var(--dss-font-size-lg)", 
    sizePx: "18px",
    weightToken: "--dss-heading-5-weight",
    weightValue: "400",
    lineHeightToken: "--dss-heading-5-line-height",
    lineHeightValue: "1.15",
    desc: "Subtítulos"
  },
  { 
    level: "H6", 
    sizeToken: "--dss-heading-6-size", 
    sizeValue: "var(--dss-font-size-base)", 
    sizePx: "16px",
    weightToken: "--dss-heading-6-weight",
    weightValue: "400",
    lineHeightToken: "--dss-heading-6-line-height",
    lineHeightValue: "1.1",
    desc: "Menor em tudo"
  },
];

// Cores de Texto (tokens semânticos)
const textColors = [
  { token: "--dss-text-body", value: "var(--dss-dark)", hex: "#454545", desc: "Texto principal" },
  { token: "--dss-text-subtle", value: "var(--dss-dark-light)", hex: "#B0B0B0", desc: "Texto secundário" },
  { token: "--dss-text-muted", value: "var(--dss-dark-disable)", hex: "#D7D7D7", desc: "Texto terciário" },
  { token: "--dss-text-inverse", value: "var(--dss-gray-50)", hex: "#FFFFFF", desc: "Texto claro" },
  { token: "--dss-text-disabled", value: "var(--dss-gray-400)", hex: "#D4D4D4", desc: "Texto desabilitado" },
];

const textActionColors = [
  { token: "--dss-text-action", value: "var(--dss-action-primary)", desc: "Links padrão" },
  { token: "--dss-text-action-hover", value: "var(--dss-action-primary-hover)", desc: "Links hover" },
  { token: "--dss-text-action-alt", value: "var(--dss-action-secondary)", desc: "Links alternativos" },
];

const textFeedbackColors = [
  { token: "--dss-text-success", value: "var(--dss-positive)", hex: "#4DD228", desc: "Sucesso" },
  { token: "--dss-text-error", value: "var(--dss-negative)", hex: "#D8182E", desc: "Erro" },
  { token: "--dss-text-warning", value: "var(--dss-warning)", hex: "#FABD14", desc: "Aviso" },
  { token: "--dss-text-info", value: "var(--dss-info)", hex: "#0CC4E9", desc: "Informação" },
];

// Utilitários de Acessibilidade
const accessibilityUtils = [
  { token: "--dss-dyslexia-friendly-spacing", value: "0.075em", desc: "Espaçamento para dislexia" },
  { token: "--dss-dyslexia-friendly-weight", value: "var(--dss-font-weight-normal)", desc: "Peso para dislexia" },
  { token: "--dss-low-vision-scale", value: "1.1", desc: "Escala para baixa visão" },
];

function TokenRow({ 
  token, 
  value, 
  desc, 
  isDefault = false,
  extra,
  preview
}: { 
  token: string; 
  value: string; 
  desc: string;
  isDefault?: boolean;
  extra?: React.ReactNode;
  preview?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      {preview && (
        <div className="flex-shrink-0">
          {preview}
        </div>
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
        </div>
        <p className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {extra}
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

export default function TypographyPage() {
  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Section - Jtech Style */}
      <PageHeader
        icon={Type}
        badge="Fundações"
        badgeVariant="accent"
        title="Sistema"
        titleAccent="Tipográfico"
        subtitle="Hierarquia tipográfica completa com famílias de fonte, tamanhos, pesos e tokens de acessibilidade. Baseado no Guia de Acessibilidade DSS e WCAG 2.1 AA."
        subtitleHighlights={["Guia de Acessibilidade DSS", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "40+ Tokens", variant: "info" },
          { label: "Acessível", variant: "success" }
        ]}
      />

      {/* Tabs Navigation */}
      <DssTabs defaultValue="families" className="space-y-6">
        <DssTabsList>
          {[
            { value: "families", label: "Famílias", icon: Type },
            { value: "sizes", label: "Tamanhos", icon: AlignLeft },
            { value: "weights", label: "Pesos", icon: Heading },
            { value: "hierarchy", label: "Hierarquia", icon: Heading },
            { value: "spacing", label: "Espaçamento", icon: Space },
            { value: "colors", label: "Cores de Texto", icon: Eye },
            { value: "a11y", label: "Acessibilidade", icon: Accessibility },
          ].map((tab) => (
            <DssTabsTrigger
              key={tab.value}
              value={tab.value}
              icon={<tab.icon size={14} />}
            >
              {tab.label}
            </DssTabsTrigger>
          ))}
        </DssTabsList>

        {/* Famílias de Fonte */}
        <DssTabsContent value="families" className="space-y-6">
          <SectionHeader 
            title="Famílias de" 
            titleAccent="Fonte"
            badge="Sans-serif preferidas"
          />
          
          <div className="grid gap-4">
            {fontFamilies.map((font) => (
              <Card 
                key={font.token}
                className="transition-all duration-300 hover:shadow-lg overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                        {font.name}
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                        {font.desc}
                      </CardDescription>
                    </div>
                    <code 
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)', 
                        color: 'var(--dss-jtech-accent)' 
                      }}
                    >
                      {font.token}
                    </code>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      fontFamily: font.token.includes('mono') ? 'monospace' : 'Inter, sans-serif'
                    }}
                  >
                    <p 
                      className="text-2xl mb-2"
                      style={{ color: 'var(--jtech-heading-primary)' }}
                    >
                      {font.sample}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--jtech-text-muted)' }}>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                    </p>
                  </div>
                  <code 
                    className="text-xs font-mono block p-2 rounded overflow-x-auto"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.4)', 
                      color: 'var(--jtech-text-body)' 
                    }}
                  >
                    {font.value}
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
        </DssTabsContent>

        {/* Tamanhos */}
        <DssTabsContent value="sizes" className="space-y-6">
          <SectionHeader 
            title="Tamanhos de" 
            titleAccent="Fonte"
            badge="WCAG 2.1 AA"
            variant="accent"
          />
          
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Mínimo <strong style={{ color: 'var(--jtech-heading-secondary)' }}>16px</strong> para texto do corpo, 
                <strong style={{ color: 'var(--jtech-heading-secondary)' }}> 14px</strong> para texto secundário. 
                Escala compatível com Quasar: xs, sm, md, lg, xl.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {fontSizes.map((size) => (
                <TokenRow
                  key={size.token}
                  token={size.token}
                  value={`${size.value} (${size.px})`}
                  desc={size.desc}
                  isDefault={size.default}
                  preview={
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: size.wcag === "✅" ? 'rgba(77, 210, 40, 0.15)' : 'rgba(250, 189, 20, 0.15)',
                        color: size.wcag === "✅" ? '#4dd228' : '#fabd14',
                        fontSize: size.px
                      }}
                    >
                      A
                    </div>
                  }
                  extra={
                    <span 
                      className="text-sm"
                      title={size.wcag === "✅" ? "WCAG Compliant" : "Use com cautela"}
                    >
                      {size.wcag}
                    </span>
                  }
                />
              ))}
            </CardContent>
          </Card>
        </DssTabsContent>

        {/* Pesos */}
        <DssTabsContent value="weights" className="space-y-6">
          <SectionHeader 
            title="Pesos de" 
            titleAccent="Fonte"
            badge="Regular 400 para corpo"
          />
          
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Regular <strong style={{ color: 'var(--jtech-heading-secondary)' }}>(400)</strong> para texto do corpo, 
                Negrito <strong style={{ color: 'var(--jtech-heading-secondary)' }}>(600+)</strong> para ênfase e títulos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {fontWeights.map((weight) => (
                <TokenRow
                  key={weight.token}
                  token={weight.token}
                  value={weight.value}
                  desc={weight.desc}
                  isDefault={weight.default}
                  preview={
                    <div 
                      className="w-24 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: 'var(--jtech-heading-secondary)',
                        fontWeight: weight.value
                      }}
                    >
                      {weight.sample}
                    </div>
                  }
                />
              ))}
            </CardContent>
          </Card>
        </DssTabsContent>

        {/* Hierarquia */}
        <DssTabsContent value="hierarchy" className="space-y-6">
          <SectionHeader 
            title="Hierarquia" 
            titleAccent="Semântica"
            badge="H1 → H6"
            variant="accent"
          />
          
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                Sistema de títulos com tamanho, peso e altura de linha definidos para cada nível.
                Sempre use <strong style={{ color: 'var(--jtech-heading-secondary)' }}>hierarquia semântica</strong> (H1 → H6).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {headingHierarchy.map((heading) => (
                <div 
                  key={heading.level}
                  className="p-4 rounded-lg transition-all duration-200"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--jtech-card-border)'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="flex items-center gap-3"
                      style={{ 
                        fontSize: heading.sizePx,
                        fontWeight: heading.weightValue,
                        lineHeight: heading.lineHeightValue,
                        color: 'var(--jtech-heading-primary)'
                      }}
                    >
                      <span 
                        className="px-2 py-1 rounded text-sm font-bold"
                        style={{ 
                          backgroundColor: 'var(--dss-jtech-accent)',
                          color: 'white',
                          fontSize: '12px'
                        }}
                      >
                        {heading.level}
                      </span>
                      Título de Exemplo
                    </div>
                    <Badge 
                      variant="outline"
                      className="text-xs"
                      style={{ 
                        borderColor: 'var(--jtech-card-border)', 
                        color: 'var(--jtech-text-muted)' 
                      }}
                    >
                      {heading.desc}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div 
                      className="p-2 rounded"
                      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                      <span style={{ color: 'var(--jtech-text-muted)' }}>Size:</span>
                      <code style={{ color: 'var(--dss-jtech-accent-light)' }}> {heading.sizePx}</code>
                    </div>
                    <div 
                      className="p-2 rounded"
                      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                      <span style={{ color: 'var(--jtech-text-muted)' }}>Weight:</span>
                      <code style={{ color: 'var(--dss-jtech-accent-light)' }}> {heading.weightValue}</code>
                    </div>
                    <div 
                      className="p-2 rounded"
                      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                      <span style={{ color: 'var(--jtech-text-muted)' }}>Line-height:</span>
                      <code style={{ color: 'var(--dss-jtech-accent-light)' }}> {heading.lineHeightValue}</code>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </DssTabsContent>

        {/* Espaçamento */}
        <DssTabsContent value="spacing" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Altura de Linha */}
            <div className="space-y-4">
              <SectionHeader 
                title="Altura de" 
                titleAccent="Linha"
                badge="1.4 a 1.6 ideal"
              />
              <Card 
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardContent className="p-4 space-y-2">
                  {lineHeights.map((lh) => (
                    <TokenRow
                      key={lh.token}
                      token={lh.token}
                      value={lh.value}
                      desc={lh.desc}
                      isDefault={lh.default}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Espaçamento de Letras */}
            <div className="space-y-4">
              <SectionHeader 
                title="Espaçamento de" 
                titleAccent="Letras"
                badge="Normal para corpo"
              />
              <Card 
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
                }}
              >
                <CardContent className="p-4 space-y-2">
                  {letterSpacings.map((ls) => (
                    <TokenRow
                      key={ls.token}
                      token={ls.token}
                      value={ls.value}
                      desc={ls.desc}
                      isDefault={ls.default}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </DssTabsContent>

        {/* Cores de Texto */}
        <DssTabsContent value="colors" className="space-y-6">
          <SectionHeader 
            title="Cores de" 
            titleAccent="Texto"
            badge="Semânticos"
            variant="accent"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hierarquia de Texto */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Hierarquia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {textColors.map((color) => (
                  <TokenRow
                    key={color.token}
                    token={color.token}
                    value={color.hex}
                    desc={color.desc}
                    preview={
                      <div 
                        className="w-8 h-8 rounded-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                    }
                  />
                ))}
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {textFeedbackColors.map((color) => (
                  <TokenRow
                    key={color.token}
                    token={color.token}
                    value={color.hex}
                    desc={color.desc}
                    preview={
                      <div 
                        className="w-8 h-8 rounded-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                    }
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </DssTabsContent>

        {/* Acessibilidade */}
        <DssTabsContent value="a11y" className="space-y-6">
          <SectionHeader 
            title="Acessibilidade" 
            titleAccent="Tipográfica"
            badge="WCAG 2.1 AA"
            variant="accent"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  Utilitários Especiais
                </CardTitle>
                <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                  Tokens para dislexia e baixa visão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {accessibilityUtils.map((util) => (
                  <TokenRow
                    key={util.token}
                    token={util.token}
                    value={util.value}
                    desc={util.desc}
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
                  Diretrizes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "✅", text: "Mínimo 16px para texto do corpo" },
                  { icon: "✅", text: "Altura de linha 1.4 a 1.6 para legibilidade" },
                  { icon: "✅", text: "Evitar fontes condensadas no corpo" },
                  { icon: "✅", text: "Regular (400) para texto, Bold (600+) para ênfase" },
                  { icon: "✅", text: "Suporte a prefers-reduced-motion" },
                  { icon: "✅", text: "Zoom do navegador até 200%" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(77, 210, 40, 0.1)',
                      border: '1px solid rgba(77, 210, 40, 0.2)'
                    }}
                  >
                    <span>{item.icon}</span>
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--jtech-heading-secondary)' }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </DssTabsContent>
      </DssTabs>
    </div>
  );
}
