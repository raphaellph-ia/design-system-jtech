/**
 * ==========================================================================
 * Playground Components - Public API
 * ==========================================================================
 *
 * Exportação pública de todos os componentes do sistema de Playground
 *
 * @example
 * ```tsx
 * import {
 *   DssPlayground,
 *   VariantSelector,
 *   ColorPicker,
 *   BrandPicker,
 *   DSS_SEMANTIC_COLORS,
 *   DSS_BRAND_COLORS,
 * } from "@/components/ui/playground";
 * ```
 */

// Componente principal
export { DssPlayground } from "./DssPlayground";

// Área de preview
export { PlaygroundPreviewArea } from "./PlaygroundPreviewArea";

// Preview de código
export { PlaygroundCodePreview } from "./PlaygroundCodePreview";

// Controles individuais
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

// Tipos
export type {
  SemanticColor,
  FeedbackColor,
  BrandColor,
  Variant,
  Size,
  ControlGroup,
  ControlOption,
  ControlType,
  PlaygroundState,
  PlaygroundConfig,
  BasePreviewProps,
  OnStateChange,
  CodeGenerator,
} from "./types";

// Dados padrão do DSS
export {
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
} from "./types";
