import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Circle, Square, RectangleHorizontal, Layers, Palette, AlertCircle, Info, CheckCircle, XCircle, AlertTriangle, Focus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ===== BORDER WIDTH TOKENS =====
const borderWidths = [
  { token: "--dss-border-width-none", value: "0", desc: "Sem borda", usage: "Elementos sem bordas visíveis" },
  { token: "--dss-border-width-hairline", value: "0.5px", desc: "Ultra fino", usage: "Retina displays, linhas sutis" },
  { token: "--dss-border-width-thin", value: "1px", desc: "Padrão", usage: "A maioria dos casos, inputs, cards", isDefault: true },
  { token: "--dss-border-width-md", value: "2px", desc: "Ênfase", usage: "Foco, destaque, seleção" },
  { token: "--dss-border-width-thick", value: "3px", desc: "Ênfase média", usage: "Elementos destacados" },
  { token: "--dss-border-width-heavy", value: "4px", desc: "Forte ênfase", usage: "Bordas decorativas, accent" },
  { token: "--dss-border-width-extra-heavy", value: "8px", desc: "Decorativo", usage: "Elementos decorativos, divisores" },
];

// ===== BORDER RADIUS TOKENS =====
const borderRadius = [
  { token: "--dss-radius-none", value: "0", px: "0px", desc: "Sem arredondamento" },
  { token: "--dss-radius-sm", value: "var(--dss-spacing-1)", px: "4px", desc: "Botões, badges", isDefault: true },
  { token: "--dss-radius-md", value: "var(--dss-spacing-2)", px: "8px", desc: "Inputs, avatares" },
  { token: "--dss-radius-lg", value: "var(--dss-spacing-3)", px: "12px", desc: "Cards, modais" },
  { token: "--dss-radius-xl", value: "var(--dss-spacing-4)", px: "16px", desc: "Containers grandes" },
  { token: "--dss-radius-2xl", value: "var(--dss-spacing-5)", px: "20px", desc: "Painéis, seções" },
  { token: "--dss-radius-3xl", value: "var(--dss-spacing-6)", px: "24px", desc: "Elementos hero" },
  { token: "--dss-radius-full", value: "9999px", px: "9999px", desc: "Círculos, pílulas" },
];

// ===== NEUTRAL BORDERS =====
const neutralBorders = [
  { token: "--dss-border-gray-50", color: "#f9fafb", desc: "Bordas mais sutis" },
  { token: "--dss-border-gray-100", color: "#f3f4f6", desc: "Dividers sutis" },
  { token: "--dss-border-gray-200", color: "#e5e7eb", desc: "Cards, containers", isDefault: true },
  { token: "--dss-border-gray-300", color: "#d1d5db", desc: "Inputs, elevados" },
  { token: "--dss-border-gray-400", color: "#9ca3af", desc: "Hover states" },
  { token: "--dss-border-gray-500", color: "#6b7280", desc: "Médio contraste" },
  { token: "--dss-border-gray-600", color: "#4b5563", desc: "Bordas fortes" },
  { token: "--dss-border-gray-700", color: "#374151", desc: "Alto contraste" },
  { token: "--dss-border-gray-800", color: "#1f2937", desc: "Bordas escuras" },
  { token: "--dss-border-gray-900", color: "#111827", desc: "Máximo contraste" },
  { token: "--dss-border-gray-950", color: "#030712", desc: "Preto absoluto" },
];

// ===== ACTION BORDERS =====
const actionBorders = [
  { 
    category: "Primary",
    tokens: [
      { token: "--dss-border-primary-disable", state: "disable", desc: "Desabilitado" },
      { token: "--dss-border-primary-light", state: "light", desc: "Leve" },
      { token: "--dss-border-primary", state: "default", desc: "Padrão", isDefault: true },
      { token: "--dss-border-primary-hover", state: "hover", desc: "Hover" },
      { token: "--dss-border-primary-deep", state: "deep", desc: "Profundo" },
    ]
  },
  { 
    category: "Secondary",
    tokens: [
      { token: "--dss-border-secondary-disable", state: "disable", desc: "Desabilitado" },
      { token: "--dss-border-secondary-light", state: "light", desc: "Leve" },
      { token: "--dss-border-secondary", state: "default", desc: "Padrão", isDefault: true },
      { token: "--dss-border-secondary-hover", state: "hover", desc: "Hover" },
      { token: "--dss-border-secondary-deep", state: "deep", desc: "Profundo" },
    ]
  },
  { 
    category: "Tertiary",
    tokens: [
      { token: "--dss-border-tertiary-disable", state: "disable", desc: "Desabilitado" },
      { token: "--dss-border-tertiary-light", state: "light", desc: "Leve" },
      { token: "--dss-border-tertiary", state: "default", desc: "Padrão", isDefault: true },
      { token: "--dss-border-tertiary-hover", state: "hover", desc: "Hover" },
      { token: "--dss-border-tertiary-deep", state: "deep", desc: "Profundo" },
    ]
  },
  { 
    category: "Accent",
    tokens: [
      { token: "--dss-border-accent-disable", state: "disable", desc: "Desabilitado" },
      { token: "--dss-border-accent-light", state: "light", desc: "Leve" },
      { token: "--dss-border-accent", state: "default", desc: "Padrão", isDefault: true },
      { token: "--dss-border-accent-hover", state: "hover", desc: "Hover" },
      { token: "--dss-border-accent-deep", state: "deep", desc: "Profundo" },
    ]
  },
];

// ===== FEEDBACK BORDERS =====
const feedbackBorders = [
  {
    category: "Positive",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    tokens: [
      { token: "--dss-border-positive-disable", state: "disable" },
      { token: "--dss-border-positive-light", state: "light" },
      { token: "--dss-border-positive", state: "default", isDefault: true },
      { token: "--dss-border-positive-hover", state: "hover" },
      { token: "--dss-border-positive-deep", state: "deep" },
    ]
  },
  {
    category: "Negative",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    tokens: [
      { token: "--dss-border-negative-disable", state: "disable" },
      { token: "--dss-border-negative-light", state: "light" },
      { token: "--dss-border-negative", state: "default", isDefault: true },
      { token: "--dss-border-negative-hover", state: "hover" },
      { token: "--dss-border-negative-deep", state: "deep" },
    ]
  },
  {
    category: "Warning",
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    tokens: [
      { token: "--dss-border-warning-disable", state: "disable" },
      { token: "--dss-border-warning-light", state: "light" },
      { token: "--dss-border-warning", state: "default", isDefault: true },
      { token: "--dss-border-warning-hover", state: "hover" },
      { token: "--dss-border-warning-deep", state: "deep" },
    ]
  },
  {
    category: "Info",
    icon: Info,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    tokens: [
      { token: "--dss-border-info-disable", state: "disable" },
      { token: "--dss-border-info-light", state: "light" },
      { token: "--dss-border-info", state: "default", isDefault: true },
      { token: "--dss-border-info-hover", state: "hover" },
      { token: "--dss-border-info-deep", state: "deep" },
    ]
  },
];

// ===== BRAND BORDERS =====
const brandBorders = [
  {
    brand: "Hub",
    color: "#6366f1",
    tokens: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
  },
  {
    brand: "Water",
    color: "#0ea5e9",
    tokens: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
  },
  {
    brand: "Waste",
    color: "#22c55e",
    tokens: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
  },
];

// ===== FUNCTIONAL BORDERS =====
const functionalBorders = [
  { token: "--dss-border-focus", value: "2px solid var(--dss-action-primary)", desc: "Focus ring primário", icon: Focus },
  { token: "--dss-border-focus-subtle", value: "1px solid var(--dss-action-primary)", desc: "Focus sutil", icon: Focus },
  { token: "--dss-border-active", value: "2px solid var(--dss-action-secondary)", desc: "Estado ativo", icon: CheckCircle },
  { token: "--dss-border-selected", value: "2px solid var(--dss-action-tertiary)", desc: "Estado selecionado", icon: CheckCircle },
  { token: "--dss-border-disabled", value: "1px solid var(--dss-gray-300)", desc: "Estado desabilitado", icon: XCircle },
  { token: "--dss-border-readonly", value: "1px dashed var(--dss-gray-400)", desc: "Somente leitura", icon: AlertCircle },
];

// ===== COMPONENT TOKEN ROW =====
interface TokenRowProps {
  token: string;
  value: string;
  desc?: string;
  px?: string;
  usage?: string;
  isDefault?: boolean;
  preview?: React.ReactNode;
}

function TokenRow({ token, value, desc, px, usage, isDefault, preview }: TokenRowProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-border"
      onClick={copyToClipboard}
    >
      {preview && (
        <div className="flex-shrink-0 w-16 flex items-center justify-center">
          {preview}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono text-primary truncate">{token}</code>
          {isDefault && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              default
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">{value}</span>
          {px && px !== value && (
            <span className="text-xs text-muted-foreground/60">• {px}</span>
          )}
        </div>
        {(desc || usage) && (
          <p className="text-xs text-muted-foreground/80 mt-0.5 truncate">
            {desc}{usage && ` • ${usage}`}
          </p>
        )}
      </div>
      
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

// ===== RADIUS PREVIEW =====
function RadiusPreview({ px }: { px: string }) {
  const radiusValue = px === "9999px" ? "50%" : px;
  return (
    <div 
      className="h-10 w-10 bg-primary/20 border-2 border-primary"
      style={{ borderRadius: radiusValue }}
    />
  );
}

// ===== WIDTH PREVIEW =====
function WidthPreview({ value }: { value: string }) {
  return (
    <div 
      className="h-8 w-12 rounded-md border-primary"
      style={{ borderWidth: value, borderStyle: "solid" }}
    />
  );
}

export default function BordersPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <PageHeader
        badge="Design Tokens"
        title="Bordas e"
        titleAccent="Arredondamento"
        subtitle="Sistema completo de tokens de borda incluindo espessuras, raios, cores neutras, ações, feedback e marcas. Baseado na filosofia 'Tokens = Provedores, Componentes = Consumidores'."
        subtitleHighlights={["espessuras", "raios", "feedback"]}
        extraBadges={[
          { label: "90+ tokens", variant: "info" },
          { label: "Jan 2025", variant: "info" }
        ]}
      />

      {/* Tabs */}
      <Tabs defaultValue="widths" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="widths" className="text-xs">Espessuras</TabsTrigger>
          <TabsTrigger value="radius" className="text-xs">Arredondamento</TabsTrigger>
          <TabsTrigger value="neutral" className="text-xs">Neutras</TabsTrigger>
          <TabsTrigger value="action" className="text-xs">Ações</TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
          <TabsTrigger value="brand" className="text-xs">Marcas</TabsTrigger>
          <TabsTrigger value="functional" className="text-xs">Funcionais</TabsTrigger>
        </TabsList>

        {/* ESPESSURAS */}
        <TabsContent value="widths" className="space-y-6">
          <SectionHeader 
            title="Espessuras de Borda"
            titleAccent="— escala genérica"
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RectangleHorizontal className="h-5 w-5 text-primary" />
                Escala de Border Width
              </CardTitle>
              <CardDescription>
                De 0px (sem borda) até 8px (elementos decorativos). 1px é o padrão para a maioria dos casos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {borderWidths.map((item) => (
                <TokenRow
                  key={item.token}
                  token={item.token}
                  value={item.value}
                  desc={item.desc}
                  usage={item.usage}
                  isDefault={item.isDefault}
                  preview={<WidthPreview value={item.value} />}
                />
              ))}
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Guia de Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Inputs</h4>
                  <code className="text-xs block bg-muted p-2 rounded">
                    {`border-width: var(--dss-border-width-thin); // 1px padrão`}
                    <br />
                    {`&:focus { border-width: var(--dss-border-width-md); } // 2px`}
                  </code>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Focus Rings</h4>
                  <code className="text-xs block bg-muted p-2 rounded">
                    {`outline: var(--dss-border-width-md) solid var(--dss-primary);`}
                    <br />
                    {`outline-offset: 2px;`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ARREDONDAMENTO */}
        <TabsContent value="radius" className="space-y-6">
          <SectionHeader 
            title="Border Radius"
            titleAccent="— múltiplos de 4px"
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-primary" />
                Escala de Arredondamento
              </CardTitle>
              <CardDescription>
                De 0px (quadrado) até 9999px (círculo/pílula). Valores derivados de --dss-spacing-*.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {borderRadius.map((item) => (
                <TokenRow
                  key={item.token}
                  token={item.token}
                  value={item.value}
                  px={item.px}
                  desc={item.desc}
                  isDefault={item.isDefault}
                  preview={<RadiusPreview px={item.px} />}
                />
              ))}
            </CardContent>
          </Card>

          {/* Component Mapping */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mapeamento por Componente</CardTitle>
              <CardDescription>Quais tokens cada componente utiliza por padrão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { component: "DssButton", radius: "--dss-radius-sm", px: "4px" },
                  { component: "DssInput", radius: "--dss-radius-md", px: "8px" },
                  { component: "DssCard", radius: "--dss-radius-lg", px: "12px" },
                  { component: "DssAvatar", radius: "--dss-radius-md", px: "8px" },
                ].map((item) => (
                  <div key={item.component} className="p-3 rounded-lg border bg-muted/30">
                    <span className="font-medium text-sm">{item.component}</span>
                    <code className="text-xs text-muted-foreground block mt-1">{item.radius}</code>
                    <span className="text-xs text-muted-foreground/60">{item.px}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NEUTRAS */}
        <TabsContent value="neutral" className="space-y-6">
          <SectionHeader 
            title="Bordas Neutras"
            titleAccent="— escala Gray"
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Escala Gray (50-950)
              </CardTitle>
              <CardDescription>
                Cada token inclui a espessura padrão de 1px com a cor correspondente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {neutralBorders.map((item) => (
                <TokenRow
                  key={item.token}
                  token={item.token}
                  value={`1px solid ${item.token.replace("--dss-border-", "--dss-")}`}
                  desc={item.desc}
                  isDefault={item.isDefault}
                  preview={
                    <div 
                      className="h-10 w-10 rounded-md"
                      style={{ border: `1px solid ${item.color}` }}
                    />
                  }
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AÇÕES */}
        <TabsContent value="action" className="space-y-6">
          <SectionHeader 
            title="Bordas de Ação"
            titleAccent="— estados interativos"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {actionBorders.map((group) => (
              <Card key={group.category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Square className="h-4 w-4 text-primary" />
                    {group.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {group.tokens.map((item) => (
                    <TokenRow
                      key={item.token}
                      token={item.token}
                      value={item.state}
                      desc={item.desc}
                      isDefault={item.isDefault}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FEEDBACK */}
        <TabsContent value="feedback" className="space-y-6">
          <SectionHeader 
            title="Bordas de Feedback"
            titleAccent="— estados semânticos"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {feedbackBorders.map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.category} className={`border-l-4 ${group.bgColor}`} style={{ borderLeftColor: "currentColor" }}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-base flex items-center gap-2 ${group.color}`}>
                      <Icon className="h-4 w-4" />
                      {group.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {group.tokens.map((item) => (
                      <TokenRow
                        key={item.token}
                        token={item.token}
                        value={item.state}
                        isDefault={item.isDefault}
                      />
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* MARCAS */}
        <TabsContent value="brand" className="space-y-6">
          <SectionHeader 
            title="Bordas de Marca"
            titleAccent="— Hub, Water, Waste"
          />

          <div className="grid gap-6">
            {brandBorders.map((brand) => (
              <Card key={brand.brand}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div 
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: brand.color }}
                    />
                    <span>{brand.brand}</span>
                    <Badge variant="outline" className="ml-auto">
                      11 tokens
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Escala completa de --dss-border-{brand.brand.toLowerCase()}-50 até --dss-border-{brand.brand.toLowerCase()}-950
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Visual scale bar */}
                  <div className="flex gap-1 mb-4">
                    {brand.tokens.map((level, idx) => (
                      <div
                        key={level}
                        className="flex-1 h-8 first:rounded-l-md last:rounded-r-md flex items-center justify-center"
                        style={{ 
                          backgroundColor: brand.color,
                          opacity: 0.1 + (idx * 0.08)
                        }}
                      >
                        <span className="text-[10px] font-mono opacity-70">{level}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Token examples */}
                  <div className="grid gap-2 sm:grid-cols-3">
                    {["200", "500", "800"].map((level) => (
                      <div key={level} className="p-2 rounded border bg-muted/30">
                        <code className="text-xs font-mono text-primary">
                          --dss-border-{brand.brand.toLowerCase()}-{level}
                        </code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FUNCIONAIS */}
        <TabsContent value="functional" className="space-y-6">
          <SectionHeader 
            title="Bordas Funcionais"
            titleAccent="— estados e acessibilidade"
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Focus className="h-5 w-5 text-primary" />
                Estados Funcionais
              </CardTitle>
              <CardDescription>
                Bordas semânticas para feedback visual de interação e acessibilidade.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {functionalBorders.map((item) => {
                const Icon = item.icon;
                return (
                  <TokenRow
                    key={item.token}
                    token={item.token}
                    value={item.value}
                    desc={item.desc}
                    preview={
                      <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    }
                  />
                );
              })}
            </CardContent>
          </Card>

          {/* Accessibility Note */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                Nota de Acessibilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                O token <code className="text-primary">--dss-border-focus</code> deve ser usado em conjunto com 
                <code className="text-primary"> :focus-visible</code> para garantir conformidade com WCAG 2.4.7.
              </p>
              <p>
                O <code className="text-primary">--dss-border-readonly</code> utiliza <code>dashed</code> para 
                diferenciar visualmente de estados desabilitados.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
