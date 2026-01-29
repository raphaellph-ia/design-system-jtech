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
  /** Token ativo (opcional) */
  activeToken?: string;
  /** Valor do token ativo (opcional) */
  tokenValue?: string;
  /** Modo escuro ativo */
  isDarkMode: boolean;
  /** Callback para toggle do tema */
  onDarkModeToggle: () => void;
  /** Altura mínima do preview */
  previewMinHeight?: string;
  /** Layout: horizontal (2 colunas) ou vertical */
  layout?: "horizontal" | "vertical";
  /** Mostrar header do card */
  showHeader?: boolean;
  /** Classes adicionais para o container */
  className?: string;
}

export function DssPlayground({
  title = "Configure o Componente",
  description = "Selecione as props e veja o resultado em tempo real.",
  previewContent,
  controls,
  codePreview,
  activeToken,
  tokenValue,
  isDarkMode,
  onDarkModeToggle,
  previewMinHeight = "300px",
  layout = "horizontal",
  showHeader = true,
  className = "",
}: DssPlaygroundProps) {
  const isHorizontal = layout === "horizontal";

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
            {/* Toggle de tema inline quando não tem header */}
            {!showHeader && (
              <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
            )}

            {/* Controles customizados */}
            {controls}

            {/* Preview do código */}
            <PlaygroundCodePreview
              code={codePreview}
              activeToken={activeToken}
              tokenValue={tokenValue}
            />
          </div>
        </div>
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
  ThemeToggle,
  VariantSelector,
  ColorPicker,
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
