import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  FileCode,
  ArrowRight,
  Rocket,
  Package,
  Settings,
  Palette,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Instalação do pacote",
    description: "Adicione o DSS ao seu projeto Vue/Quasar",
    code: "npm install @jtech/dss",
  },
  {
    number: 2,
    title: "Importar tokens globais",
    description: "Configure os design tokens no seu projeto",
    code: `// main.ts
import '@jtech/dss/tokens/global.css'
import '@jtech/dss/tokens/semantic.css'`,
  },
  {
    number: 3,
    title: "Usar componentes",
    description: "Importe e utilize os componentes DSS",
    code: `<template>
  <DssButton variant="primary">
    Clique aqui
  </DssButton>
</template>

<script setup>
import { DssButton } from '@jtech/dss'
</script>`,
  },
];

const requirements = [
  { name: "Vue 3.x", icon: "🟢" },
  { name: "Quasar 2.x", icon: "🔷" },
  { name: "Node.js 18+", icon: "🟩" },
  { name: "TypeScript 5.x (recomendado)", icon: "🔵" },
];

const brands = [
  { name: "Sansys Hub", color: "#ef7a11" },
  { name: "Sansys Water", color: "#0e88e4" },
  { name: "Sansys Waste", color: "#0b8154" },
];

function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      <pre 
        className="p-4 rounded-lg overflow-x-auto text-sm font-mono"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.4)',
          border: '1px solid var(--jtech-card-border)'
        }}
      >
        <code style={{ color: 'var(--jtech-heading-secondary)' }}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'var(--jtech-text-body)'
        }}
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <div 
      className="p-6 lg:p-8 max-w-4xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--dss-page-bg)' }}
    >
      {/* Header - Jtech Style */}
      <PageHeader
        icon={Rocket}
        badge="Guia"
        badgeVariant="accent"
        title="Primeiros"
        titleAccent="Passos"
        subtitle="Configure o Design System Sansys no seu projeto em poucos minutos. Siga o passo a passo abaixo para começar."
        subtitleHighlights={["Design System Sansys", "poucos minutos"]}
      />

      {/* Requirements */}
      <section className="space-y-4">
        <SectionHeader 
          title="Requisitos" 
          icon={Package}
        />
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardContent className="p-6">
            <p 
              className="text-sm mb-4"
              style={{ color: 'var(--jtech-text-body)' }}
            >
              Certifique-se de que seu ambiente atende aos requisitos mínimos:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {requirements.map((req) => (
                <div 
                  key={req.name}
                  className="flex items-center gap-2 p-3 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--jtech-card-border)'
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: '#4dd228' }} />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--jtech-heading-secondary)' }}
                  >
                    {req.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Installation Steps */}
      <section className="space-y-6">
        <SectionHeader 
          title="Instalação" 
          titleAccent="Passo a Passo"
          icon={Terminal}
          variant="accent"
        />
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="transition-all duration-300 hover:shadow-lg overflow-hidden group"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--jtech-card-hover-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--dss-jtech-accent)' }}
                  >
                    <span className="text-white font-bold text-lg">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <CardTitle 
                      className="text-base"
                      style={{ color: 'var(--jtech-heading-secondary)' }}
                    >
                      {step.title}
                    </CardTitle>
                    <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
                      {step.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeBlock code={step.code} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brand Configuration */}
      <section className="space-y-4">
        <SectionHeader 
          title="Configuração de" 
          titleAccent="Marca"
          icon={Settings}
        />
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardHeader>
            <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
              O DSS suporta múltiplas marcas. Configure a marca do seu produto no arquivo de configuração.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Badge 
                  key={brand.name}
                  variant="outline"
                  className="transition-all duration-200 hover:scale-105"
                  style={{ 
                    borderColor: brand.color,
                    color: brand.color,
                    backgroundColor: `${brand.color}15`
                  }}
                >
                  {brand.name}
                </Badge>
              ))}
            </div>
            
            <CodeBlock 
              code={`// quasar.config.js
export default {
  dss: {
    brand: 'water' // 'water' | 'waste' | 'hub'
  }
}`} 
            />
          </CardContent>
        </Card>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <SectionHeader 
          title="Próximos" 
          titleAccent="Passos"
          icon={ArrowRight}
          variant="accent"
        />
        
        <div className="grid gap-3">
          <Link
            to="/componentes/dss-button"
            className="flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:shadow-lg group"
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
            <div className="flex items-center gap-4">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: 'var(--jtech-badge-bg)' }}
              >
                <Terminal className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
              </div>
              <div>
                <p 
                  className="font-medium"
                  style={{ color: 'var(--jtech-heading-secondary)' }}
                >
                  Explore o DssButton
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--jtech-text-body)' }}
                >
                  Veja o componente Golden Sample em ação
                </p>
              </div>
            </div>
            <ArrowRight 
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: 'var(--jtech-text-muted)' }} 
            />
          </Link>
          
          <Link
            to="/tokens/cores"
            className="flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:shadow-lg group"
            style={{ 
              backgroundColor: 'var(--jtech-card-bg)',
              border: '1px solid var(--jtech-card-border)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0e88e4';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: 'rgba(14, 136, 228, 0.15)' }}
              >
                <Palette className="h-5 w-5" style={{ color: '#0e88e4' }} />
              </div>
              <div>
                <p 
                  className="font-medium"
                  style={{ color: 'var(--jtech-heading-secondary)' }}
                >
                  Explore os Tokens
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--jtech-text-body)' }}
                >
                  Conheça as fundações visuais do sistema
                </p>
              </div>
            </div>
            <ArrowRight 
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: 'var(--jtech-text-muted)' }} 
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
