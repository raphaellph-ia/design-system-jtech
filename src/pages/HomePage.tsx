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
  Layers,
  Target,
  BookOpen,
  CheckCircle2,
  Users,
  GitBranch,
  AlertTriangle,
} from "lucide-react";

// Dados reais do DSS conforme README.md e PRD
const stats = [
  { label: "Componentes", value: "5", icon: Box, description: "DssButton, DssCard, DssInput, DssBadge, DssAvatar" },
  { label: "Tokens", value: "200+", icon: Palette, description: "Zero hardcoded values" },
  { label: "Marcas", value: "3", icon: Target, description: "Hub, Water, Waste" },
];

const brands = [
  { 
    name: "Sansys Hub", 
    colorVar: "--dss-hub-600", 
    description: "Plataforma central",
    principal: "#ef7a11"
  },
  { 
    name: "Sansys Water", 
    colorVar: "--dss-water-500", 
    description: "Gestão de água",
    principal: "#0e88e4"
  },
  { 
    name: "Sansys Waste", 
    colorVar: "--dss-waste-600", 
    description: "Gestão de resíduos",
    principal: "#0b8154"
  },
];

// Componentes conforme PRD
const components = [
  { 
    name: "DssButton", 
    status: "golden", 
    description: "Golden Sample - Referência de implementação",
    quasarBase: "q-btn"
  },
  { 
    name: "DssCard", 
    status: "stable", 
    description: "Container flexível com composição",
    quasarBase: "q-card"
  },
  { 
    name: "DssInput", 
    status: "stable", 
    description: "Campo de entrada com validação",
    quasarBase: "q-input"
  },
  { 
    name: "DssBadge", 
    status: "stable", 
    description: "Badge e contador",
    quasarBase: "q-badge"
  },
  { 
    name: "DssAvatar", 
    status: "stable", 
    description: "Avatar de usuário",
    quasarBase: "q-avatar"
  },
];

// Arquitetura em 4 camadas
const architectureLayers = [
  { name: "1. Structure", description: "Componente Vue (.vue)", color: "--dss-hub-600" },
  { name: "2. Composition", description: "Estilos base (_base.scss)", color: "--dss-water-500" },
  { name: "3. Variants", description: "Variantes visuais", color: "--dss-waste-600" },
  { name: "4. Output", description: "CSS compilado final", color: "--dss-gray-600" },
];

// Filosofia de Tokens
const tokenPhilosophy = [
  { 
    icon: Layers, 
    title: "Tokens são Provedores", 
    description: "Tokens fornecem valores, componentes consomem. Separação clara de responsabilidades." 
  },
  { 
    icon: GitBranch, 
    title: "1 Token → N Componentes", 
    description: "Um token serve múltiplos componentes. Tokens são genéricos e abstratos." 
  },
  { 
    icon: AlertTriangle, 
    title: "Novos Componentes = 0 Tokens", 
    description: "Componentes novos usam tokens existentes. Nunca criar tokens específicos." 
  },
];

// Características principais conforme README
const features = [
  {
    icon: Sparkles,
    title: "Tokens Semânticos",
    description: "Sistema completo: globais, semânticos e de marca. 100% baseado em tokens.",
  },
  {
    icon: Shield,
    title: "Acessibilidade WCAG 2.1 AA",
    description: "Contraste 4.5:1, touch targets 48×48px, navegação por teclado, ARIA labels.",
  },
  {
    icon: Zap,
    title: "Dark Mode Nativo",
    description: "Alternância automática com tokens específicos para tema escuro.",
  },
  {
    icon: Layers,
    title: "Arquitetura 4 Camadas",
    description: "Structure → Composition → Variants → Output. Padrão Quasar Framework.",
  },
];

// Diretrizes do DSS conforme PRD
const guidelines = [
  "DSS é a fonte única da verdade",
  "Todos bebem da mesma fonte",
  "Tokens como único mecanismo de customização",
  "Uso direto de Quasar é proibido",
  "Prefixo DSS obrigatório",
  "Documentação é produto",
];

export default function HomePage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'golden':
        return { 
          label: '⭐ Golden Sample', 
          borderColor: 'var(--dss-hub-600)', 
          color: 'var(--dss-hub-600)', 
          bgColor: 'var(--dss-hub-200)' 
        };
      case 'stable':
        return { 
          label: 'Estável', 
          borderColor: 'var(--dss-positive)', 
          color: 'var(--dss-positive)', 
          bgColor: 'var(--dss-feedback-success-surface)' 
        };
      default:
        return { 
          label: 'Beta', 
          borderColor: 'var(--dss-warning)', 
          color: 'var(--dss-warning)', 
          bgColor: 'var(--dss-feedback-warning-surface)' 
        };
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10" style={{ backgroundColor: 'var(--dss-surface-default)' }}>
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge 
            variant="outline" 
            style={{ 
              borderColor: 'var(--dss-hub-600)', 
              color: 'var(--dss-hub-600)' 
            }}
          >
            v2.0.0
          </Badge>
          <Badge 
            style={{ 
              backgroundColor: 'var(--dss-feedback-success-surface)', 
              color: 'var(--dss-positive)' 
            }}
          >
            ✓ Migração 100% Completa
          </Badge>
          <Badge 
            style={{ 
              backgroundColor: 'var(--dss-feedback-info-surface)', 
              color: 'var(--dss-info)' 
            }}
          >
            WCAG 2.1 AA
          </Badge>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--dss-text-body)' }}>
          Design System{" "}
          <span style={{ color: 'var(--dss-hub-600)' }}>Sansys</span>
        </h1>
        
        <p className="text-lg max-w-3xl" style={{ color: 'var(--dss-text-subtle)' }}>
          A <strong style={{ color: 'var(--dss-text-body)' }}>Fonte Única da Verdade</strong> para componentes, tokens e padrões de design
          dos produtos Sansys. Construído com <strong style={{ color: 'var(--dss-text-body)' }}>Vue 3 + Quasar Framework</strong>.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild style={{ backgroundColor: 'var(--dss-hub-600)' }}>
            <Link to="/primeiros-passos">
              Primeiros Passos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild style={{ borderColor: 'var(--dss-hub-600)', color: 'var(--dss-hub-600)' }}>
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
                style={{ backgroundColor: 'var(--dss-hub-200)' }}
              >
                <stat.icon className="h-6 w-6" style={{ color: 'var(--dss-hub-600)' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: 'var(--dss-text-body)' }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--dss-text-body)' }}>{stat.label}</p>
                <p className="text-xs" style={{ color: 'var(--dss-text-subtle)' }}>{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Token Philosophy */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
            Filosofia de Tokens
          </h2>
          <Badge variant="outline" style={{ borderColor: 'var(--dss-positive)', color: 'var(--dss-positive)' }}>
            Core Concept
          </Badge>
        </div>
        <Card style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tokenPhilosophy.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--dss-hub-200)' }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: 'var(--dss-hub-600)' }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Architecture */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
          Arquitetura em 4 Camadas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {architectureLayers.map((layer, index) => (
            <Card 
              key={layer.name}
              style={{ 
                backgroundColor: 'var(--dss-surface-default)', 
                borderColor: 'var(--dss-gray-200)',
                borderTopWidth: '3px',
                borderTopColor: `var(${layer.color})`
              }}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: `var(${layer.color})` }}
                >
                  {index + 1}
                </div>
                <p className="font-medium text-sm" style={{ color: 'var(--dss-text-body)' }}>
                  {layer.name.split('. ')[1]}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--dss-text-subtle)' }}>
                  {layer.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brand Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
          Marcas Suportadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <Card 
              key={brand.name}
              style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="h-12 w-12 rounded-lg"
                    style={{ backgroundColor: `var(${brand.colorVar})` }}
                  />
                  <div>
                    <span className="font-medium block" style={{ color: 'var(--dss-text-body)' }}>
                      {brand.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--dss-text-subtle)' }}>
                      {brand.description}
                    </span>
                  </div>
                </div>
                <code 
                  className="text-xs px-2 py-1 rounded block text-center"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)', color: 'var(--dss-text-body)' }}
                >
                  {brand.colorVar}: {brand.principal}
                </code>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--dss-feedback-info-surface)' }}
              >
                <feature.icon className="h-5 w-5" style={{ color: 'var(--dss-water-500)' }} />
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
            Componentes DSS
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/componentes/dss-button" style={{ color: 'var(--dss-hub-600)' }}>
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-3">
          {components.map((component) => {
            const badge = getStatusBadge(component.status);
            return (
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
                      <div className="flex items-center gap-2">
                        <p className="font-medium" style={{ color: 'var(--dss-text-body)' }}>{component.name}</p>
                        <code className="text-xs px-1 rounded" style={{ backgroundColor: 'var(--dss-surface-subtle)', color: 'var(--dss-text-subtle)' }}>
                          {component.quasarBase}
                        </code>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{component.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      borderColor: badge.borderColor,
                      color: badge.color,
                      backgroundColor: badge.bgColor
                    }}
                  >
                    {badge.label}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
          Diretrizes do DSS
        </h2>
        <Card style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guidelines.map((guideline, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--dss-positive)' }} />
                  <span className="text-sm" style={{ color: 'var(--dss-text-body)' }}>{guideline}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="transition-shadow hover:shadow-md"
          style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: 'var(--dss-text-body)' }}>
              <Zap className="h-4 w-4" style={{ color: 'var(--dss-hub-600)' }} />
              Golden Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
              DssButton como referência máxima de qualidade: uso de tokens, API pública, documentação e padrões.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/componentes/dss-button" style={{ color: 'var(--dss-hub-600)' }}>
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
              <Palette className="h-4 w-4" style={{ color: 'var(--dss-water-500)' }} />
              Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
              Sistema de tokens em camadas: globais, semânticos, de marca. Zero hardcoded values.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/tokens/cores" style={{ color: 'var(--dss-water-500)' }}>
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
              <BookOpen className="h-4 w-4" style={{ color: 'var(--dss-waste-600)' }} />
              Governança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
              Entenda a arquitetura, fluxo de mudanças e como contribuir para o DSS.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/governanca/arquitetura" style={{ color: 'var(--dss-waste-600)' }}>
                Ler mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Stakeholders */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dss-text-body)' }}>
          Públicos do Repositório
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Desenvolvedores", icon: Box, description: "Frontend Vue/Quasar" },
            { name: "Designers", icon: Palette, description: "UI/UX e Figma" },
            { name: "Product Managers", icon: Users, description: "Roadmap e features" },
            { name: "Stakeholders", icon: Target, description: "Visão técnica/executiva" },
          ].map((audience) => (
            <Card 
              key={audience.name}
              style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}
            >
              <CardContent className="p-4 text-center">
                <audience.icon className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--dss-gray-500)' }} />
                <p className="font-medium text-sm" style={{ color: 'var(--dss-text-body)' }}>{audience.name}</p>
                <p className="text-xs" style={{ color: 'var(--dss-text-subtle)' }}>{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
