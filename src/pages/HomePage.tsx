import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Box,
  Palette,
  FileText,
  ArrowRight,
  Zap,
  Sparkles,
  Shield,
} from "lucide-react";

const stats = [
  { label: "Componentes", value: "5", icon: Box },
  { label: "Tokens", value: "150+", icon: Palette },
  { label: "Documentados", value: "100%", icon: FileText },
];

const products = [
  { name: "Sansys Hub", colorVar: "--dss-hub-500" },
  { name: "Sansys Water", colorVar: "--dss-water-500" },
  { name: "Sansys Waste", colorVar: "--dss-waste-500" },
];

const recentComponents = [
  { name: "DssButton", status: "stable", description: "Botão primário com variantes" },
  { name: "DssInput", status: "beta", description: "Campo de entrada de texto" },
  { name: "DssCard", status: "beta", description: "Container de conteúdo" },
];

const features = [
  {
    icon: Sparkles,
    title: "Tokens Semânticos",
    description: "Sistema de tokens organizado em camadas: globais, semânticos e de marca.",
  },
  {
    icon: Shield,
    title: "Acessibilidade WCAG 2.1",
    description: "Contraste validado e suporte a redução de movimento.",
  },
  {
    icon: Zap,
    title: "Dark Mode Nativo",
    description: "Alternância automática com tokens específicos.",
  },
];

export default function HomePage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8" style={{ backgroundColor: 'var(--dss-surface-default)' }}>
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            style={{ 
              borderColor: 'var(--dss-primary-light)', 
              color: 'var(--dss-primary)' 
            }}
          >
            v1.0.0
          </Badge>
          <Badge 
            style={{ 
              backgroundColor: 'var(--dss-feedback-info-surface)', 
              color: 'var(--dss-info)' 
            }}
          >
            Fase 1 - Wrappers
          </Badge>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--dss-text-body)' }}>
          Design System{" "}
          <span style={{ color: 'var(--dss-primary)' }}>Sansys</span>
        </h1>
        
        <p className="text-lg max-w-2xl" style={{ color: 'var(--dss-text-subtle)' }}>
          A fonte única da verdade para componentes, tokens e padrões de design
          dos produtos Sansys. Construído com Vue + Quasar.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild style={{ backgroundColor: 'var(--dss-primary)' }}>
            <Link to="/primeiros-passos">
              Primeiros Passos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild style={{ borderColor: 'var(--dss-gray-300)' }}>
            <Link to="/componentes/dss-button">
              Ver Golden Sample
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--dss-feedback-info-surface)' }}
              >
                <stat.icon className="h-6 w-6" style={{ color: 'var(--dss-primary)' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: 'var(--dss-text-body)' }}>{stat.value}</p>
                <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Brand Colors Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
          Marcas Suportadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card 
              key={product.name}
              style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div 
                  className="h-10 w-10 rounded-lg"
                  style={{ backgroundColor: `var(${product.colorVar})` }}
                />
                <span className="font-medium" style={{ color: 'var(--dss-text-body)' }}>
                  {product.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>Recursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--dss-feedback-info-surface)' }}
              >
                <feature.icon className="h-5 w-5" style={{ color: 'var(--dss-primary)' }} />
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Components */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>Componentes</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/componentes/dss-button" style={{ color: 'var(--dss-text-action)' }}>
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-3">
          {recentComponents.map((component) => (
            <Card 
              key={component.name} 
              className="transition-colors"
              style={{ 
                backgroundColor: 'var(--dss-surface-default)', 
                borderColor: 'var(--dss-gray-200)' 
              }}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
                  >
                    <Box className="h-5 w-5" style={{ color: 'var(--dss-text-subtle)' }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--dss-text-body)' }}>{component.name}</p>
                    <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{component.description}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: component.status === 'stable' ? 'var(--dss-positive)' : 'var(--dss-warning)',
                    color: component.status === 'stable' ? 'var(--dss-positive)' : 'var(--dss-warning)',
                    backgroundColor: component.status === 'stable' ? 'var(--dss-feedback-success-surface)' : 'var(--dss-feedback-warning-surface)'
                  }}
                >
                  {component.status === 'stable' ? 'Estável' : 'Beta'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="transition-shadow hover:shadow-md"
          style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--dss-text-body)' }}>
              <Zap className="h-4 w-4" style={{ color: 'var(--dss-primary)' }} />
              Golden Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
              Veja o DssButton como referência de implementação completa.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/componentes/dss-button" style={{ color: 'var(--dss-text-action)' }}>
                Explorar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="transition-shadow hover:shadow-md"
          style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--dss-text-body)' }}>
              <Palette className="h-4 w-4" style={{ color: 'var(--dss-primary)' }} />
              Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
              Explore as fundações visuais: cores, tipografia e mais.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/tokens/cores" style={{ color: 'var(--dss-text-action)' }}>
                Ver tokens <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="transition-shadow hover:shadow-md"
          style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--dss-text-body)' }}>
              <FileText className="h-4 w-4" style={{ color: 'var(--dss-primary)' }} />
              Governança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
              Entenda a arquitetura e como contribuir para o DSS.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/governanca/arquitetura" style={{ color: 'var(--dss-text-action)' }}>
                Ler mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Semantic Colors Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>Cores Semânticas</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { name: "Primary", var: "--dss-primary" },
            { name: "Secondary", var: "--dss-secondary" },
            { name: "Tertiary", var: "--dss-tertiary" },
            { name: "Accent", var: "--dss-accent" },
            { name: "Positive", var: "--dss-positive" },
            { name: "Negative", var: "--dss-negative" },
            { name: "Warning", var: "--dss-warning" },
            { name: "Info", var: "--dss-info" },
          ].map((color) => (
            <div key={color.name} className="text-center">
              <div 
                className="w-full h-12 rounded-lg mb-2 border"
                style={{ 
                  backgroundColor: `var(${color.var})`,
                  borderColor: 'var(--dss-gray-200)'
                }}
              />
              <p className="text-xs font-medium" style={{ color: 'var(--dss-text-body)' }}>{color.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
