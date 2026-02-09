import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, Box, Palette, Sparkles, 
  ChevronDown, ChevronUp, X,
  FileCode, Puzzle, Brush, Zap
} from "lucide-react";

interface LayerContent {
  files: string[];
  description: string;
  responsibilities: string[];
  tokens?: string[];
  codeExample?: string;
}

interface AnatomySectionProps {
  componentName: string;
  layers: {
    structure: LayerContent;
    composition: LayerContent;
    variants: LayerContent;
    output: LayerContent;
  };
}

const layerConfig = [
  {
    id: "structure",
    number: 1,
    title: "Structure",
    subtitle: "Template & Props",
    icon: Box,
    color: "#0cc4e9",
    bgColor: "rgba(12, 196, 233, 0.1)",
  },
  {
    id: "composition",
    number: 2,
    title: "Composition",
    subtitle: "Estilos Base",
    icon: Puzzle,
    color: "#4dd228",
    bgColor: "rgba(77, 210, 40, 0.1)",
  },
  {
    id: "variants",
    number: 3,
    title: "Variants",
    subtitle: "Variações Visuais",
    icon: Brush,
    color: "#fabd14",
    bgColor: "rgba(250, 189, 20, 0.1)",
  },
  {
    id: "output",
    number: 4,
    title: "Output",
    subtitle: "Estados & Brand",
    icon: Zap,
    color: "#e91e63",
    bgColor: "rgba(233, 30, 99, 0.1)",
  },
];

export function AnatomySection({ componentName, layers }: AnatomySectionProps) {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const handleLayerClick = (layerId: string) => {
    setExpandedLayer(expandedLayer === layerId ? null : layerId);
  };

  const getLayerContent = (layerId: string): LayerContent => {
    return layers[layerId as keyof typeof layers];
  };

  return (
    <div className="space-y-6">
      {/* Diagrama Visual */}
      <div 
        className="relative p-6 rounded-xl border"
        style={{ 
          backgroundColor: 'var(--jtech-card-bg)',
          borderColor: 'var(--jtech-card-border)'
        }}
      >
        {/* Título do Diagrama */}
        <div className="flex items-center gap-3 mb-6">
          <Layers className="h-5 w-5" style={{ color: 'var(--dss-jtech-accent)' }} />
          <h3 
            className="text-lg font-semibold"
            style={{ color: 'var(--jtech-heading-primary)' }}
          >
            Arquitetura de Camadas
          </h3>
          <Badge
            className="text-xs"
            style={{ 
              backgroundColor: 'rgba(12, 196, 233, 0.1)',
              color: '#0cc4e9'
            }}
          >
            {componentName}
          </Badge>
        </div>

        {/* Grid de Cards das Camadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {layerConfig.map((layer) => {
            const Icon = layer.icon;
            const isExpanded = expandedLayer === layer.id;
            const content = getLayerContent(layer.id);

            return (
              <div
                key={layer.id}
                onClick={() => handleLayerClick(layer.id)}
                className={`
                  relative cursor-pointer rounded-lg border-2 p-4 
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-lg
                  ${isExpanded ? 'ring-2 ring-offset-2' : ''}
                `}
                style={{ 
                  backgroundColor: layer.bgColor,
                  borderColor: isExpanded ? layer.color : 'transparent',
                  boxShadow: isExpanded ? `0 8px 24px ${layer.color}40` : 'none',
                  ['--tw-ring-color' as string]: layer.color,
                  ['--tw-ring-offset-color' as string]: 'var(--jtech-card-bg)'
                }}
              >
                {/* Número da Camada */}
                <div 
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ 
                    backgroundColor: layer.color,
                    color: '#0d1117'
                  }}
                >
                  {layer.number}
                </div>

                {/* Conteúdo do Card */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${layer.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: layer.color }} />
                  </div>
                  
                  <h4 
                    className="font-semibold text-sm"
                    style={{ color: layer.color }}
                  >
                    {layer.title}
                  </h4>
                  
                  <p 
                    className="text-xs"
                    style={{ color: 'var(--jtech-text-body)' }}
                  >
                    {layer.subtitle}
                  </p>

                  {/* Indicador de Expansão */}
                  <div 
                    className="flex items-center gap-1 text-xs mt-2"
                    style={{ color: layer.color }}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3" />
                        <span>Fechar</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" />
                        <span>Ver detalhes</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arquivos */}
                <div className="mt-3 pt-3 border-t border-dashed" style={{ borderColor: `${layer.color}40` }}>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {content.files.slice(0, 2).map((file, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline"
                        className="text-[10px] font-mono"
                        style={{ 
                          borderColor: `${layer.color}60`,
                          color: layer.color,
                          backgroundColor: 'transparent'
                        }}
                      >
                        {file}
                      </Badge>
                    ))}
                    {content.files.length > 2 && (
                      <Badge 
                        variant="outline"
                        className="text-[10px]"
                        style={{ 
                          borderColor: `${layer.color}60`,
                          color: layer.color
                        }}
                      >
                        +{content.files.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conectores visuais (apenas em desktop) */}
        <div className="hidden lg:flex absolute top-1/2 left-[25%] right-[25%] -translate-y-1/2 justify-between pointer-events-none z-0">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="w-8 h-0.5 opacity-30"
              style={{ backgroundColor: 'var(--jtech-card-border)' }}
            />
          ))}
        </div>
      </div>

      {/* Painel de Detalhes Expandido */}
      {expandedLayer && (
        <div 
          className="rounded-xl border overflow-hidden animate-fade-in"
          style={{ 
            backgroundColor: 'var(--jtech-card-bg)',
            borderColor: layerConfig.find(l => l.id === expandedLayer)?.color
          }}
        >
          {(() => {
            const layer = layerConfig.find(l => l.id === expandedLayer)!;
            const content = getLayerContent(expandedLayer);
            const Icon = layer.icon;

            return (
              <>
                {/* Header do Painel */}
                <div 
                  className="flex items-center justify-between p-4 border-b"
                  style={{ 
                    backgroundColor: layer.bgColor,
                    borderColor: `${layer.color}30`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${layer.color}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: layer.color }} />
                    </div>
                    <div>
                      <h4 
                        className="font-semibold"
                        style={{ color: layer.color }}
                      >
                        Camada {layer.number}: {layer.title}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--jtech-text-body)' }}
                      >
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedLayer(null)}
                    className="p-2 rounded-lg hover:bg-black/20 transition-colors"
                  >
                    <X className="h-4 w-4" style={{ color: 'var(--jtech-text-body)' }} />
                  </button>
                </div>

                {/* Conteúdo do Painel */}
                <div className="p-6 space-y-6">
                  {/* Descrição */}
                  <div>
                    <h5 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--jtech-heading-secondary)' }}
                    >
                      Descrição
                    </h5>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--jtech-text-body)' }}
                    >
                      {content.description}
                    </p>
                  </div>

                  {/* Arquivos */}
                  <div>
                    <h5 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--jtech-heading-secondary)' }}
                    >
                      Arquivos
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {content.files.map((file, idx) => (
                        <Badge 
                          key={idx}
                          className="font-mono text-xs"
                          style={{ 
                            backgroundColor: layer.bgColor,
                            color: layer.color
                          }}
                        >
                          <FileCode className="h-3 w-3 mr-1" />
                          {file}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Responsabilidades */}
                  <div>
                    <h5 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--jtech-heading-secondary)' }}
                    >
                      Responsabilidades
                    </h5>
                    <ul className="space-y-2">
                      {content.responsibilities.map((resp, idx) => (
                        <li 
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--jtech-text-body)' }}
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: layer.color }}
                          />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tokens (se houver) */}
                  {content.tokens && content.tokens.length > 0 && (
                    <div>
                      <h5 
                        className="text-sm font-medium mb-2"
                        style={{ color: 'var(--jtech-heading-secondary)' }}
                      >
                        Tokens Utilizados
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {content.tokens.map((token, idx) => (
                          <code 
                            key={idx}
                            className="text-xs px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: 'var(--jtech-code-bg)',
                              color: layer.color
                            }}
                          >
                            {token}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exemplo de Código (se houver) */}
                  {content.codeExample && (
                    <div>
                      <h5 
                        className="text-sm font-medium mb-2"
                        style={{ color: 'var(--jtech-heading-secondary)' }}
                      >
                        Exemplo
                      </h5>
                      <pre 
                        className="text-xs p-4 rounded-lg overflow-x-auto"
                        style={{ 
                          backgroundColor: 'var(--jtech-code-bg)',
                          color: 'var(--jtech-heading-secondary)'
                        }}
                      >
                        <code>{content.codeExample}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
