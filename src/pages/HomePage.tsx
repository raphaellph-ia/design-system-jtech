import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Box,
  Palette,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Componentes", value: "5", icon: Box },
  { label: "Tokens", value: "50+", icon: Palette },
  { label: "Documentados", value: "100%", icon: FileText },
];

const products = [
  { name: "Sansys Water", color: "bg-blue-500" },
  { name: "Sansys Waste", color: "bg-emerald-500" },
  { name: "Sansys Hub", color: "bg-purple-500" },
];

const recentComponents = [
  { name: "DssButton", status: "stable", description: "Botão primário com variantes" },
  { name: "DssInput", status: "beta", description: "Campo de entrada de texto" },
  { name: "DssCard", status: "beta", description: "Container de conteúdo" },
];

const statusConfig = {
  stable: { label: "Estável", className: "bg-[hsl(var(--dss-success))]/10 text-[hsl(var(--dss-success))] border-[hsl(var(--dss-success))]/20" },
  beta: { label: "Beta", className: "bg-[hsl(var(--dss-warning))]/10 text-[hsl(var(--dss-warning))] border-[hsl(var(--dss-warning))]/20" },
  experimental: { label: "Experimental", className: "bg-[hsl(var(--dss-info))]/10 text-[hsl(var(--dss-info))] border-[hsl(var(--dss-info))]/20" },
};

export default function HomePage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-primary border-primary/30">
            v1.0.0
          </Badge>
          <Badge variant="secondary">Fase 1 - Wrappers</Badge>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Design System Sansys
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl">
          A fonte única da verdade para componentes, tokens e padrões de design
          dos produtos Sansys. Construído com Vue + Quasar.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <Link to="/primeiros-passos">
              Primeiros Passos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/componentes/dss-button">
              Ver Golden Sample
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Products Coverage */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Produtos Atendidos
        </h2>
        <div className="flex flex-wrap gap-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary"
            >
              <div className={`h-3 w-3 rounded-full ${product.color}`} />
              <span className="text-sm font-medium text-foreground">{product.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Components */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Componentes</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/componentes/dss-button">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-3">
          {recentComponents.map((component) => (
            <Card key={component.name} className="bg-card hover:bg-accent/5 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Box className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{component.name}</p>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={statusConfig[component.status as keyof typeof statusConfig].className}
                >
                  {statusConfig[component.status as keyof typeof statusConfig].label}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Golden Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Veja o DssButton como referência de implementação completa.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/componentes/dss-button">
                Explorar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore as fundações visuais do sistema: cores, tipografia e mais.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/tokens/cores">
                Ver tokens <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Governança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Entenda a arquitetura e como contribuir para o DSS.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/governanca/arquitetura">
                Ler mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
