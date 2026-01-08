import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Terminal,
  FileCode,
  ArrowRight,
  ExternalLink,
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
  "Vue 3.x",
  "Quasar 2.x",
  "Node.js 18+",
  "TypeScript 5.x (recomendado)",
];

export default function GettingStartedPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <span className="text-foreground">Primeiros Passos</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Primeiros Passos
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Configure o Design System Sansys no seu projeto em poucos minutos.
        </p>
      </section>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requisitos</CardTitle>
          <CardDescription>
            Certifique-se de que seu ambiente atende aos requisitos mínimos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {requirements.map((req) => (
              <li key={req} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--dss-success))]" />
                <span className="text-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Installation Steps */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Instalação</h2>
        
        {steps.map((step) => (
          <Card key={step.number}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {step.number}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-base">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="code-block p-4 overflow-x-auto">
                  <code className="text-sm text-foreground">{step.code}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => copyToClipboard(step.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Brand Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            Configuração de Marca
          </CardTitle>
          <CardDescription>
            O DSS suporta múltiplas marcas. Configure a marca do seu produto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Sansys Water</Badge>
            <Badge variant="outline">Sansys Waste</Badge>
            <Badge variant="outline">Sansys Hub</Badge>
          </div>
          
          <div className="relative">
            <pre className="code-block p-4 overflow-x-auto">
              <code className="text-sm text-foreground">{`// quasar.config.js
export default {
  dss: {
    brand: 'water' // 'water' | 'waste' | 'hub'
  }
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Próximos Passos</h2>
        
        <div className="grid gap-3">
          <Link
            to="/componentes/dss-button"
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Explore o DssButton</p>
                <p className="text-sm text-muted-foreground">
                  Veja o componente Golden Sample em ação
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          
          <Link
            to="/tokens/cores"
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-gradient-to-br from-primary to-accent" />
              <div>
                <p className="font-medium text-foreground">Explore os Tokens</p>
                <p className="text-sm text-muted-foreground">
                  Conheça as fundações visuais do sistema
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </section>
    </div>
  );
}
