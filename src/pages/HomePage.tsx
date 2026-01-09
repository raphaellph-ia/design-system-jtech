import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
  { name: "1. Structure", description: "Componente Vue (.vue)", color: "#ef7a11" },
  { name: "2. Composition", description: "Estilos base (_base.scss)", color: "#0e88e4" },
  { name: "3. Variants", description: "Variantes visuais", color: "#0b8154" },
  { name: "4. Output", description: "CSS compilado final", color: "#666666" },
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
          borderColor: 'var(--dss-jtech-accent)', 
          color: 'var(--dss-jtech-accent-light)', 
          bgColor: 'var(--jtech-badge-bg)' 
        };
      case 'stable':
        return { 
          label: 'Estável', 
          borderColor: '#4dd228', 
          color: '#4dd228', 
          bgColor: 'rgba(77, 210, 40, 0.1)' 
        };
      default:
        return { 
          label: 'Beta', 
          borderColor: '#fabd14', 
          color: '#fabd14', 
          bgColor: 'rgba(250, 189, 20, 0.1)' 
        };
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10" style={{ backgroundColor: 'var(--dss-page-bg)' }}>
      {/* Hero Section - Jtech Style */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge 
            variant="outline"
            className="text-xs font-medium"
            style={{ 
              borderColor: 'var(--dss-jtech-accent)', 
              color: 'var(--dss-jtech-accent-light)',
              backgroundColor: 'var(--jtech-badge-bg)'
            }}
          >
            v2.0.0
          </Badge>
          <Badge 
            className="text-xs font-medium"
            style={{ 
              backgroundColor: 'rgba(77, 210, 40, 0.1)', 
              color: '#4dd228' 
            }}
          >
            ✓ Migração 100% Completa
          </Badge>
          <Badge 
            className="text-xs font-medium"
            style={{ 
              backgroundColor: 'rgba(12, 196, 233, 0.1)', 
              color: '#0cc4e9' 
            }}
          >
            WCAG 2.1 AA
          </Badge>
        </div>
        
        <h1 
          className="text-3xl lg:text-4xl font-bold"
          style={{ color: 'var(--jtech-heading-primary)' }}
        >
          Design System{" "}
          <span style={{ color: 'var(--dss-jtech-accent)' }}>Sansys</span>
        </h1>
        
        <p 
          className="text-lg max-w-3xl leading-relaxed"
          style={{ color: 'var(--jtech-text-body)' }}
        >
          A <strong style={{ color: 'var(--jtech-heading-secondary)' }}>Fonte Única da Verdade</strong> para componentes, tokens e padrões de design
          dos produtos Sansys. Construído com <strong style={{ color: 'var(--jtech-heading-secondary)' }}>Vue 3 + Quasar Framework</strong>.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button 
            asChild 
            className="transition-all duration-200 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--dss-jtech-accent)',
              color: 'white'
            }}
          >
            <Link to="/primeiros-passos">
              Primeiros Passos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="transition-all duration-200 hover:scale-105"
            style={{ 
              borderColor: 'var(--dss-jtech-accent)', 
              color: 'var(--dss-jtech-accent-light)',
              backgroundColor: 'transparent'
            }}
          >
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
            className="transition-all duration-300 hover:shadow-lg group"
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
            <CardContent className="p-6 flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: 'var(--jtech-badge-bg)' }}
              >
                <stat.icon className="h-6 w-6" style={{ color: 'var(--dss-jtech-accent)' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: 'var(--jtech-heading-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  {stat.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--jtech-text-muted)' }}>
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Token Philosophy */}
      <section className="space-y-4">
        <SectionHeader 
          title="Filosofia de" 
          titleAccent="Tokens"
          badge="Core Concept"
          variant="accent"
        />
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tokenPhilosophy.map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--jtech-badge-bg)' }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: 'var(--jtech-heading-secondary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Architecture */}
      <section className="space-y-4">
        <SectionHeader 
          title="Arquitetura em" 
          titleAccent="4 Camadas"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {architectureLayers.map((layer, index) => (
            <Card 
              key={layer.name}
              className="transition-all duration-300 hover:shadow-lg overflow-hidden"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)',
                borderTopWidth: '3px',
                borderTopColor: layer.color
              }}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: layer.color }}
                >
                  {index + 1}
                </div>
                <p className="font-medium text-sm" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  {layer.name.split('. ')[1]}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--jtech-text-muted)' }}>
                  {layer.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brand Colors - Demo Section */}
      <section className="space-y-4">
        <SectionHeader 
          title="Marcas" 
          titleAccent="Suportadas"
          badge="Demo"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <Card 
              key={brand.name}
              className="transition-all duration-300 hover:shadow-lg group"
              style={{ 
                backgroundColor: 'var(--jtech-card-bg)', 
                borderColor: 'var(--jtech-card-border)' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = brand.principal;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="h-12 w-12 rounded-lg transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: brand.principal }}
                  />
                  <div>
                    <span className="font-medium block" style={{ color: 'var(--jtech-heading-secondary)' }}>
                      {brand.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--jtech-text-body)' }}>
                      {brand.description}
                    </span>
                  </div>
                </div>
                <code 
                  className="text-xs px-2 py-1 rounded block text-center font-mono"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    color: 'var(--jtech-text-body)' 
                  }}
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
        <SectionHeader title="Características" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4 group">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: 'rgba(12, 196, 233, 0.1)' }}
              >
                <feature.icon className="h-5 w-5" style={{ color: '#0cc4e9' }} />
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionHeader 
            title="Componentes" 
            titleAccent="DSS"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="transition-all duration-200 hover:scale-105"
          >
            <Link to="/componentes/dss-button" style={{ color: 'var(--dss-jtech-accent-light)' }}>
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
                className="transition-all duration-200 hover:shadow-lg group"
                style={{ 
                  backgroundColor: 'var(--jtech-card-bg)', 
                  borderColor: 'var(--jtech-card-border)' 
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
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <Box className="h-5 w-5" style={{ color: 'var(--jtech-text-muted)' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium" style={{ color: 'var(--jtech-heading-secondary)' }}>
                          {component.name}
                        </p>
                        <code 
                          className="text-xs px-1 rounded font-mono"
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.05)', 
                            color: 'var(--jtech-text-muted)' 
                          }}
                        >
                          {component.quasarBase}
                        </code>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--jtech-text-body)' }}>
                        {component.description}
                      </p>
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
        <SectionHeader 
          title="Diretrizes do" 
          titleAccent="DSS"
          icon={CheckCircle2}
          variant="accent"
        />
        <Card 
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guidelines.map((guideline, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: '#4dd228' }} />
                  <span className="text-sm" style={{ color: 'var(--jtech-heading-secondary)' }}>
                    {guideline}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="transition-all duration-300 hover:shadow-lg group"
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
          <CardHeader className="pb-2">
            <CardTitle 
              className="text-base flex items-center gap-2"
              style={{ color: 'var(--jtech-heading-secondary)' }}
            >
              <Zap className="h-4 w-4" style={{ color: 'var(--dss-jtech-accent)' }} />
              Golden Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
              DssButton como referência máxima de qualidade: uso de tokens, API pública, documentação e padrões.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2 transition-all duration-200" asChild>
              <Link to="/componentes/dss-button" style={{ color: 'var(--dss-jtech-accent-light)' }}>
                Explorar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg group"
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0e88e4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle 
              className="text-base flex items-center gap-2"
              style={{ color: 'var(--jtech-heading-secondary)' }}
            >
              <Palette className="h-4 w-4" style={{ color: '#0e88e4' }} />
              Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
              Sistema de tokens em camadas: globais, semânticos, de marca. Zero hardcoded values.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2 transition-all duration-200" asChild>
              <Link to="/tokens/cores" style={{ color: '#0e88e4' }}>
                Ver tokens <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300 hover:shadow-lg group"
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)', 
            borderColor: 'var(--jtech-card-border)' 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0b8154';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--jtech-card-border)';
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle 
              className="text-base flex items-center gap-2"
              style={{ color: 'var(--jtech-heading-secondary)' }}
            >
              <BookOpen className="h-4 w-4" style={{ color: '#0b8154' }} />
              Governança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription style={{ color: 'var(--jtech-text-body)' }}>
              Entenda a arquitetura, fluxo de mudanças e como contribuir para o DSS.
            </CardDescription>
            <Button variant="link" className="px-0 mt-2 transition-all duration-200" asChild>
              <Link to="/governanca/arquitetura" style={{ color: '#0b8154' }}>
                Ler mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Stakeholders */}
      <section className="space-y-4">
        <SectionHeader 
          title="Públicos do" 
          titleAccent="Repositório"
          icon={Users}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Desenvolvedores", icon: Box, description: "Frontend Vue/Quasar" },
            { name: "Designers", icon: Palette, description: "UI/UX e Figma" },
            { name: "Product Managers", icon: Users, description: "Roadmap e features" },
            { name: "Stakeholders", icon: Target, description: "Visão técnica/executiva" },
          ].map((audience) => (
            <Card 
              key={audience.name}
              className="transition-all duration-300 hover:shadow-lg group"
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
              <CardContent className="p-4 text-center">
                <audience.icon 
                  className="h-8 w-8 mx-auto mb-2 transition-transform duration-200 group-hover:scale-110"
                  style={{ color: 'var(--jtech-text-muted)' }} 
                />
                <p className="font-medium text-sm" style={{ color: 'var(--jtech-heading-secondary)' }}>
                  {audience.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--jtech-text-muted)' }}>
                  {audience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
