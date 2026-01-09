import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Copy, Check, Layers, Sun, Droplets, Leaf, Focus, MousePointer, Square } from "lucide-react";
import { useState } from "react";

// =============================================
// DSS TOKENS - Conforme _shadows.scss
// =============================================

// Sombras Base (Elevação) - Light Mode
const baseShadows = [
  { 
    token: "--dss-shadow-xs", 
    value: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    desc: "Borda sutil",
    elevation: 0
  },
  { 
    token: "--dss-shadow-sm", 
    value: "0 1px 3px rgba(0, 0, 0, 0.25)",
    desc: "Elevação baixa",
    elevation: 1
  },
  { 
    token: "--dss-shadow-md", 
    value: "0 4px 6px rgba(0, 0, 0, 0.30)",
    desc: "Elevação média",
    elevation: 2
  },
  { 
    token: "--dss-shadow-lg", 
    value: "0 10px 15px rgba(0, 0, 0, 0.35)",
    desc: "Elevação alta",
    elevation: 3
  },
  { 
    token: "--dss-shadow-xl", 
    value: "0 20px 25px rgba(0, 0, 0, 0.40)",
    desc: "Elevação muito alta",
    elevation: 4
  },
  { 
    token: "--dss-shadow-2xl", 
    value: "0 25px 50px rgba(0, 0, 0, 0.45)",
    desc: "Elevação máxima",
    elevation: 5
  },
];

// Sombras internas
const innerShadows = [
  { 
    token: "--dss-shadow-inner", 
    value: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
    desc: "Inset padrão"
  },
  { 
    token: "--dss-shadow-inner-lg", 
    value: "inset 0 4px 8px rgba(0, 0, 0, 0.08)",
    desc: "Inset grande"
  },
];

// Sombras semânticas
const semanticShadows = {
  focus: [
    { 
      token: "--dss-shadow-focus", 
      value: "0 0 0 3px rgba(31, 134, 222, 0.5)",
      color: "#1f86de",
      desc: "Foco padrão (Primary)"
    },
    { 
      token: "--dss-shadow-focus-error", 
      value: "0 0 0 3px rgba(216, 24, 46, 0.5)",
      color: "#d8182e",
      desc: "Foco erro (Negative)"
    },
    { 
      token: "--dss-shadow-focus-success", 
      value: "0 0 0 3px rgba(77, 210, 40, 0.5)",
      color: "#4dd228",
      desc: "Foco sucesso (Positive)"
    },
  ],
  overlay: [
    { 
      token: "--dss-shadow-overlay", 
      value: "0 10px 38px rgba(0, 0, 0, 0.2)",
      desc: "Overlay/Backdrop"
    },
    { 
      token: "--dss-shadow-modal", 
      value: "0 20px 60px rgba(0, 0, 0, 0.3)",
      desc: "Modais e diálogos"
    },
  ],
  states: [
    { 
      token: "--dss-shadow-hover", 
      value: "var(--dss-shadow-md)",
      desc: "Estado hover"
    },
    { 
      token: "--dss-shadow-active", 
      value: "var(--dss-shadow-inner)",
      desc: "Estado ativo/pressed"
    },
    { 
      token: "--dss-shadow-drag", 
      value: "0 10px 20px rgba(0, 0, 0, 0.15)",
      desc: "Drag & drop"
    },
  ]
};

// Sombras de Marca
const brandShadows = {
  hub: {
    name: "Hub",
    color: "#f5911a",
    shadows: [
      { token: "--dss-shadow-hub-sm", value: "0 1px 3px rgba(245, 145, 26, 0.15)", desc: "Pequena" },
      { token: "--dss-shadow-hub-md", value: "0 4px 6px rgba(245, 145, 26, 0.15)", desc: "Média" },
      { token: "--dss-shadow-hub-lg", value: "0 10px 15px rgba(245, 145, 26, 0.15)", desc: "Grande" },
    ]
  },
  water: {
    name: "Water",
    color: "#0e88e4",
    shadows: [
      { token: "--dss-shadow-water-sm", value: "0 1px 3px rgba(14, 136, 228, 0.15)", desc: "Pequena" },
      { token: "--dss-shadow-water-md", value: "0 4px 6px rgba(14, 136, 228, 0.15)", desc: "Média" },
      { token: "--dss-shadow-water-lg", value: "0 10px 15px rgba(14, 136, 228, 0.15)", desc: "Grande" },
    ]
  },
  waste: {
    name: "Waste",
    color: "#18b173",
    shadows: [
      { token: "--dss-shadow-waste-sm", value: "0 1px 3px rgba(24, 177, 115, 0.15)", desc: "Pequena" },
      { token: "--dss-shadow-waste-md", value: "0 4px 6px rgba(24, 177, 115, 0.15)", desc: "Média" },
      { token: "--dss-shadow-waste-lg", value: "0 10px 15px rgba(24, 177, 115, 0.15)", desc: "Grande" },
    ]
  },
};

// Elevação semântica
const elevationLevels = [
  { token: "--dss-elevation-0", value: "none", level: 0, desc: "Sem elevação", usage: "Elementos planos" },
  { token: "--dss-elevation-1", value: "var(--dss-shadow-sm)", level: 1, desc: "Baixa", usage: "Cards, containers" },
  { token: "--dss-elevation-2", value: "var(--dss-shadow-md)", level: 2, desc: "Média", usage: "Cards hover, tooltips" },
  { token: "--dss-elevation-3", value: "var(--dss-shadow-lg)", level: 3, desc: "Alta", usage: "Toasts, notificações" },
  { token: "--dss-elevation-4", value: "var(--dss-shadow-xl)", level: 4, desc: "Muito alta", usage: "Modais, diálogos" },
  { token: "--dss-elevation-5", value: "var(--dss-shadow-2xl)", level: 5, desc: "Máxima", usage: "Fullscreen modals" },
];

function ShadowPreview({ 
  token, 
  value, 
  desc,
  showCopy = true,
  bgColor = "var(--jtech-card-bg)",
  accentColor
}: { 
  token: string; 
  value: string;
  desc: string;
  showCopy?: boolean;
  bgColor?: string;
  accentColor?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="p-4 rounded-lg transition-all duration-200 cursor-pointer group"
      style={{ 
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--jtech-card-border)'
      }}
      onClick={handleCopy}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-hover-border)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
      }}
    >
      {/* Shadow preview box */}
      <div 
        className="h-20 rounded-lg mb-3 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ 
          backgroundColor: bgColor,
          boxShadow: value,
          border: accentColor ? `2px solid ${accentColor}` : 'none'
        }}
      >
        <span 
          className="text-xs font-medium"
          style={{ color: accentColor || 'var(--jtech-text-muted)' }}
        >
          {desc}
        </span>
      </div>
      
      {/* Token info */}
      <div className="flex items-center justify-between">
        <code 
          className="text-xs font-mono"
          style={{ color: 'var(--jtech-heading-secondary)' }}
        >
          {token}
        </code>
        {showCopy && (
          copied ? (
            <Check size={12} style={{ color: '#4dd228' }} />
          ) : (
            <Copy 
              size={12} 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--jtech-text-muted)' }}
            />
          )
        )}
      </div>
    </div>
  );
}

function TokenRow({ 
  token, 
  value, 
  desc,
  color
}: { 
  token: string; 
  value: string; 
  desc: string;
  color?: string;
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
      {color && (
        <div 
          className="w-8 h-8 rounded-lg flex-shrink-0"
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            boxShadow: `0 0 0 3px ${color}80`
          }}
        />
      )}
      <div className="flex-1 min-w-0">
        <code 
          className="text-xs font-mono font-medium"
          style={{ color: 'var(--jtech-heading-secondary)' }}
        >
          {token}
        </code>
        <p className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <code 
          className="text-[10px] font-mono hidden md:block"
          style={{ color: 'var(--jtech-text-muted)' }}
        >
          {value.length > 30 ? value.substring(0, 30) + '...' : value}
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

export default function ShadowsPage() {
  return (
    <div 
      className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Hero Section - Jtech Style */}
      <PageHeader
        icon={Layers}
        badge="Fundações"
        badgeVariant="accent"
        title="Sombras e"
        titleAccent="Elevação"
        subtitle="Sistema de profundidade visual com sombras base, semânticas e de marca. Inclui suporte a Dark Mode com opacidades ajustadas automaticamente."
        subtitleHighlights={["profundidade visual", "Dark Mode"]}
        extraBadges={[
          { label: "25+ Tokens", variant: "info" },
          { label: "Light/Dark", variant: "success" }
        ]}
      />

      {/* Tabs Navigation */}
      <Tabs defaultValue="base" className="space-y-6">
        <TabsList 
          className="w-full justify-start gap-1 p-1 h-auto flex-wrap"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}
        >
          {[
            { value: "base", label: "Sombras Base", icon: Layers },
            { value: "elevation", label: "Elevação", icon: Square },
            { value: "semantic", label: "Semânticas", icon: Focus },
            { value: "brands", label: "Marcas", icon: Sun },
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

        {/* Sombras Base */}
        <TabsContent value="base" className="space-y-6">
          <SectionHeader 
            title="Sombras" 
            titleAccent="Base"
            badge="Light Mode"
          />
          
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                <strong style={{ color: 'var(--jtech-heading-secondary)' }}>Estratégia de opacidade:</strong> Light Mode usa opacidades médias (25%-45%). 
                Dark Mode usa opacidades altas (50%-90%) para melhor contraste.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {baseShadows.map((shadow) => (
                  <ShadowPreview
                    key={shadow.token}
                    token={shadow.token}
                    value={shadow.value}
                    desc={shadow.desc}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sombras internas */}
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                Sombras Internas (Inset)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {innerShadows.map((shadow) => (
                  <ShadowPreview
                    key={shadow.token}
                    token={shadow.token}
                    value={shadow.value}
                    desc={shadow.desc}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Elevação */}
        <TabsContent value="elevation" className="space-y-6">
          <SectionHeader 
            title="Sistema de" 
            titleAccent="Elevação"
            badge="0 → 5"
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
                Use tokens de elevação semântica para manter consistência. Nível <strong style={{ color: 'var(--jtech-heading-secondary)' }}>1</strong> para cards, 
                <strong style={{ color: 'var(--jtech-heading-secondary)' }}> 2</strong> para hover, <strong style={{ color: 'var(--jtech-heading-secondary)' }}>4</strong> para modais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visual elevation scale */}
              <div className="flex items-end justify-between gap-2 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                {elevationLevels.map((level) => (
                  <div 
                    key={level.token}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div 
                      className="w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: 'var(--jtech-card-bg)',
                        boxShadow: level.level === 0 ? 'none' : baseShadows[level.level]?.value || baseShadows[baseShadows.length - 1].value,
                        maxWidth: '80px'
                      }}
                    >
                      <span 
                        className="text-lg font-bold"
                        style={{ color: 'var(--dss-jtech-accent)' }}
                      >
                        {level.level}
                      </span>
                    </div>
                    <span 
                      className="text-[10px] text-center"
                      style={{ color: 'var(--jtech-text-muted)' }}
                    >
                      {level.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Token list */}
              <div className="space-y-2">
                {elevationLevels.map((level) => (
                  <div 
                    key={level.token}
                    className="flex items-center gap-4 p-3 rounded-lg transition-all duration-200"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--jtech-card-border)'
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: 'var(--dss-jtech-accent)',
                        color: 'white'
                      }}
                    >
                      {level.level}
                    </div>
                    <div className="flex-1">
                      <code 
                        className="text-xs font-mono"
                        style={{ color: 'var(--jtech-heading-secondary)' }}
                      >
                        {level.token}
                      </code>
                      <p className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
                        {level.usage}
                      </p>
                    </div>
                    <code 
                      className="text-[10px] font-mono"
                      style={{ color: 'var(--jtech-text-muted)' }}
                    >
                      {level.value}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Uso em componentes */}
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                Exemplo de Uso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre 
                className="p-4 rounded-lg overflow-x-auto text-sm font-mono"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--jtech-card-border)'
                }}
              >
                <code style={{ color: 'var(--jtech-heading-secondary)' }}>{`.dss-card {
  box-shadow: var(--dss-elevation-1);  /* default */

  &:hover {
    box-shadow: var(--dss-elevation-2);
  }

  &--elevated {
    box-shadow: var(--dss-elevation-2);
  }
}

.dss-modal {
  box-shadow: var(--dss-elevation-4);  /* alta elevação */
}

.dss-toast {
  box-shadow: var(--dss-elevation-3);  /* notificações */
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Semânticas */}
        <TabsContent value="semantic" className="space-y-6">
          <SectionHeader 
            title="Sombras" 
            titleAccent="Semânticas"
            badge="Focus & States"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Focus */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  <Focus size={16} style={{ color: '#1f86de' }} />
                  Focus Rings
                </CardTitle>
                <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                  Alternativa a outline para foco
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {semanticShadows.focus.map((shadow) => (
                  <TokenRow
                    key={shadow.token}
                    token={shadow.token}
                    value={shadow.value}
                    desc={shadow.desc}
                    color={shadow.color}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Overlay */}
            <Card 
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  <Square size={16} style={{ color: 'var(--dss-jtech-accent)' }} />
                  Overlay & Modal
                </CardTitle>
                <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                  Backdrop e diálogos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {semanticShadows.overlay.map((shadow) => (
                  <TokenRow
                    key={shadow.token}
                    token={shadow.token}
                    value={shadow.value}
                    desc={shadow.desc}
                  />
                ))}
              </CardContent>
            </Card>

            {/* States */}
            <Card 
              className="md:col-span-2"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
            >
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  <MousePointer size={16} style={{ color: '#fabd14' }} />
                  Estados Interativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {semanticShadows.states.map((shadow) => (
                    <ShadowPreview
                      key={shadow.token}
                      token={shadow.token}
                      value={shadow.value}
                      desc={shadow.desc}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preferências do usuário */}
          <Card 
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)', 
              borderColor: 'var(--jtech-card-border)' 
            }}
          >
            <CardHeader>
              <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                Preferências do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: "🔄", text: "prefers-reduced-motion: remove transições de sombra" },
                { icon: "🎯", text: "prefers-contrast: high: aumenta opacidade do focus ring para 80%" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(12, 196, 233, 0.1)',
                    border: '1px solid rgba(12, 196, 233, 0.2)'
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
        </TabsContent>

        {/* Marcas */}
        <TabsContent value="brands" className="space-y-6">
          <SectionHeader 
            title="Sombras de" 
            titleAccent="Marca"
            badge="Hub • Water • Waste"
            variant="accent"
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(brandShadows).map(([key, brand]) => (
              <Card 
                key={key}
                className="overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)',
                  borderTopWidth: '3px',
                  borderTopColor: brand.color
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: brand.color }}
                    >
                      {key === 'hub' && <Sun className="h-5 w-5 text-white" />}
                      {key === 'water' && <Droplets className="h-5 w-5 text-white" />}
                      {key === 'waste' && <Leaf className="h-5 w-5 text-white" />}
                    </div>
                    <CardTitle className="text-base" style={{ color: 'var(--jtech-heading-secondary)' }}>
                      Sansys {brand.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {brand.shadows.map((shadow) => (
                    <ShadowPreview
                      key={shadow.token}
                      token={shadow.token}
                      value={shadow.value}
                      desc={shadow.desc}
                      accentColor={brand.color}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
