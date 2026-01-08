import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const globalColors = {
  primary: [
    { name: "color-primary-50", value: "#E8F7F9", desc: "Fundos sutis" },
    { name: "color-primary-100", value: "#B8E8EE", desc: "Hover states" },
    { name: "color-primary-500", value: "#00A3B4", desc: "Cor principal" },
    { name: "color-primary-600", value: "#008999", desc: "Pressed states" },
    { name: "color-primary-900", value: "#003D44", desc: "Textos escuros" },
  ],
  neutral: [
    { name: "color-neutral-0", value: "#FFFFFF", desc: "Branco puro" },
    { name: "color-neutral-50", value: "#F8FAFC", desc: "Fundos" },
    { name: "color-neutral-200", value: "#E2E8F0", desc: "Bordas" },
    { name: "color-neutral-500", value: "#64748B", desc: "Texto secundário" },
    { name: "color-neutral-900", value: "#0F172A", desc: "Texto principal" },
  ],
  semantic: [
    { name: "color-success", value: "#22C55E", desc: "Sucesso" },
    { name: "color-warning", value: "#F59E0B", desc: "Atenção" },
    { name: "color-error", value: "#EF4444", desc: "Erro" },
    { name: "color-info", value: "#3B82F6", desc: "Informação" },
  ],
};

const brandColors = {
  water: { primary: "#0EA5E9", name: "Sansys Water" },
  waste: { primary: "#10B981", name: "Sansys Waste" },
  hub: { primary: "#8B5CF6", name: "Sansys Hub" },
};

export default function ColorsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/tokens/cores" className="hover:text-foreground">Fundações</Link>
          <span>/</span>
          <span className="text-foreground">Cores</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Tokens de Cor
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Sistema de cores do DSS com suporte a múltiplas marcas e modo escuro.
        </p>
      </section>

      {/* Brand Switcher */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Cores por Marca</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(brandColors).map(([key, brand]) => (
            <Card key={key} className="overflow-hidden">
              <div 
                className="h-20" 
                style={{ backgroundColor: brand.primary }}
              />
              <CardContent className="p-4">
                <p className="font-medium text-foreground">{brand.name}</p>
                <code className="text-xs text-muted-foreground">{brand.primary}</code>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Color Tokens */}
      <Tabs defaultValue="primary" className="space-y-6">
        <TabsList>
          <TabsTrigger value="primary">Primárias</TabsTrigger>
          <TabsTrigger value="neutral">Neutras</TabsTrigger>
          <TabsTrigger value="semantic">Semânticas</TabsTrigger>
        </TabsList>

        <TabsContent value="primary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escala Primária</CardTitle>
              <CardDescription>
                Cores principais usadas para ações, links e destaque.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {globalColors.primary.map((color) => (
                  <div 
                    key={color.name}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border"
                  >
                    <div 
                      className="h-12 w-12 rounded-md border border-border flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono text-foreground">{color.name}</code>
                      <p className="text-sm text-muted-foreground">{color.desc}</p>
                    </div>
                    <code className="text-xs text-muted-foreground font-mono">
                      {color.value}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escala Neutra</CardTitle>
              <CardDescription>
                Cores para textos, fundos e bordas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {globalColors.neutral.map((color) => (
                  <div 
                    key={color.name}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border"
                  >
                    <div 
                      className="h-12 w-12 rounded-md border border-border flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono text-foreground">{color.name}</code>
                      <p className="text-sm text-muted-foreground">{color.desc}</p>
                    </div>
                    <code className="text-xs text-muted-foreground font-mono">
                      {color.value}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semantic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cores Semânticas</CardTitle>
              <CardDescription>
                Cores com significado específico para feedback e estados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {globalColors.semantic.map((color) => (
                  <div 
                    key={color.name}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border"
                  >
                    <div 
                      className="h-12 w-12 rounded-md border border-border flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono text-foreground">{color.name}</code>
                      <p className="text-sm text-muted-foreground">{color.desc}</p>
                    </div>
                    <code className="text-xs text-muted-foreground font-mono">
                      {color.value}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Como Usar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2 text-foreground">CSS Variables</p>
            <pre className="code-block p-4 overflow-x-auto">
              <code className="text-sm text-foreground">{`.my-element {
  background-color: var(--color-primary-500);
  color: var(--color-neutral-0);
}`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-foreground">Classes Utilitárias</p>
            <pre className="code-block p-4 overflow-x-auto">
              <code className="text-sm text-foreground">{`<div class="bg-primary text-on-primary">
  Conteúdo
</div>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
