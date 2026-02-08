/**
 * ==========================================================================
 * DssPlayground - Componente Unificado de Playground
 * ==========================================================================
 *
 * Componente principal que orquestra todo o playground:
 * - Layout consistente em duas colunas
 * - Área de preview padronizada
 * - Controles organizados por seção
 * - Geração de código automática
 *
 * @example
 * ```tsx
 * <DssPlayground
 *   title="Configure o Componente"
 *   description="Selecione as props e veja o resultado em tempo real."
 *   previewContent={<MyComponentPreview {...state} />}
 *   controls={<MyControls state={state} onChange={handleChange} />}
 *   codePreview={generateCode(state)}
 *   isDarkMode={isDarkMode}
 *   onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
 * />
 * ```
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code } from "lucide-react";
import { PlaygroundPreviewArea } from "./PlaygroundPreviewArea";
import { PlaygroundCodePreview } from "./PlaygroundCodePreview";
import { ThemeToggle } from "./PlaygroundControls";

/**
 * PLAYGROUND_STANDARD v3.1 Props
 * 
 * PROIBIDO (v3.1):
 * - activeToken/tokenValue: Metadados de debug abaixo do código
 * - showHeader: Header é sempre mostrado no layout canonical
 * - layout !== "canonical": Layouts alternativos são proibidos
 */
interface DssPlaygroundProps {
  /** Título do playground */
  title?: string;
  /** Descrição do playground */
  description?: string;
  /** Conteúdo do preview (componente renderizado) */
  previewContent: React.ReactNode;
  /** Controles do playground */
  controls: React.ReactNode;
  /** Código gerado */
  codePreview: string;
  /** @deprecated PROIBIDO pelo v3.1 - Token debug não é permitido */
  activeToken?: string;
  /** @deprecated PROIBIDO pelo v3.1 - Token debug não é permitido */
  tokenValue?: string;
  /** Modo escuro ativo */
  isDarkMode: boolean;
  /** Callback para toggle do tema */
  onDarkModeToggle: () => void;
  /** Altura mínima do preview */
  previewMinHeight?: string;
  /**
   * Layout do playground:
   * - "canonical": ÚNICO layout válido (PLAYGROUND_STANDARD v3.1)
   * @deprecated Outros layouts são proibidos pelo v3.1
   */
  layout?: "canonical" | "horizontal" | "vertical";
  /** Mostrar header do card */
  showHeader?: boolean;
  /** Classes adicionais para o container */
  className?: string;
  /** Proporção do preview no layout canonical (0.5 a 0.8, default 0.7) */
  previewRatio?: number;
}

export function DssPlayground({
  title = "Configure o Componente",
  description = "Selecione as props e veja o resultado em tempo real.",
  previewContent,
  controls,
  codePreview,
  // PROIBIDO pelo v3.1 - ignoramos activeToken e tokenValue
  activeToken: _activeToken,
  tokenValue: _tokenValue,
  isDarkMode,
  onDarkModeToggle,
  previewMinHeight = "360px",
  layout = "canonical",
  showHeader = true,
  className = "",
  previewRatio = 0.7,
}: DssPlaygroundProps) {
  // PLAYGROUND_STANDARD v3.1: Apenas layout canônico é válido
  const isCanonical = layout === "canonical";
  const isHorizontal = layout === "horizontal";

  // Calcular proporções para grid flexbox
  const previewWidth = `${Math.round(previewRatio * 100)}%`;
  const codeWidth = `${Math.round((1 - previewRatio) * 100)}%`;

  return (
    <Card
      className={`overflow-hidden ${className}`}
      style={{
        backgroundColor: "var(--jtech-card-bg)",
        borderColor: "var(--dss-jtech-accent)",
        borderWidth: "2px",
      }}
    >
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle
              className="flex items-center gap-2 text-lg"
              style={{ color: "var(--jtech-heading-secondary)" }}
            >
              <Code className="h-5 w-5" style={{ color: "var(--dss-jtech-accent)" }} />
              {title}
            </CardTitle>
            <CardDescription style={{ color: "var(--jtech-text-body)" }}>
              {description}
            </CardDescription>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
        </CardHeader>
      )}

      <CardContent className="p-6">
        {isCanonical ? (
          /* ========================================
           * LAYOUT CANÔNICO (PLAYGROUND_STANDARD v3.1)
           * ========================================
           * Estrutura:
           * ┌──────────────────────────────────────┐
           * │ CONTROLS ZONE (topo, grid horizontal)│
           * └──────────────────────────────────────┘
           * ┌────────────────────────┬─────────────┐
           * │     PREVIEW PANEL      │  CODE PANEL │
           * │   (título obrigatório) │  (título)   │
           * │    (widthRatio 0.7)    │ (ratio 0.3) │
           * └────────────────────────┴─────────────┘
           */
          <div className="space-y-6">
            {/* CONTROLS ZONE - Topo (grid horizontal obrigatório) */}
            <div className="space-y-4">
              {!showHeader && (
                <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
              )}
              {controls}
            </div>

            {/* CONTENT ZONE - Preview + Code lado a lado, alinhados pelo topo */}
            <div className="flex gap-6 items-start">
              {/* Preview Panel - Maior, com título obrigatório */}
              <div style={{ width: previewWidth, minWidth: 0 }}>
                <PlaygroundPreviewArea 
                  isDarkMode={isDarkMode} 
                  minHeight={previewMinHeight}
                  title="Preview"
                >
                  {previewContent}
                </PlaygroundPreviewArea>
              </div>

              {/* Code Panel - Menor, com título obrigatório */}
              <div style={{ width: codeWidth, minWidth: 0 }} className="flex flex-col">
                <PlaygroundCodePreview
                  code={codePreview}
                  label="Código"
                  maxHeight="320px"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ========================================
           * LAYOUT LEGACY (horizontal/vertical)
           * @deprecated PROIBIDO pelo PLAYGROUND_STANDARD v3.1
           * ======================================== */
          <div
            className={`gap-6 ${
              isHorizontal ? "grid grid-cols-1 lg:grid-cols-2" : "space-y-6"
            }`}
          >
            {/* Área de Preview */}
            <PlaygroundPreviewArea isDarkMode={isDarkMode} minHeight={previewMinHeight}>
              {previewContent}
            </PlaygroundPreviewArea>

            {/* Controles e Código */}
            <div className="space-y-5">
              {!showHeader && (
                <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
              )}
              {controls}
              <PlaygroundCodePreview
                code={codePreview}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================================================
// RE-EXPORTS para facilitar importação
// ==========================================================================

export { PlaygroundPreviewArea } from "./PlaygroundPreviewArea";
export { PlaygroundCodePreview } from "./PlaygroundCodePreview";
export {
  ControlSection,
  ControlGrid,
  ThemeToggle,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  IconSelector,
} from "./PlaygroundControls";

export type {
  SemanticColor,
  FeedbackColor,
  BrandColor,
  Variant,
  Size,
  PlaygroundState,
  PlaygroundConfig,
} from "./types";

export {
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
} from "./types";
