/**
 * ==========================================================================
 * DssPlayground - TypeScript Types
 * ==========================================================================
 *
 * Definições de tipos para o sistema unificado de Playground
 * Garante consistência em todas as páginas de documentação de componentes
 */

import { LucideIcon } from "lucide-react";

// ==========================================================================
// CORES E TOKENS
// ==========================================================================

/**
 * Definição de uma cor semântica DSS
 */
export interface SemanticColor {
  name: string;
  label: string;
  bg: string;
  hover: string;
  light: string;
  disable?: string;
  deep?: string;
  focus?: string;
  icon?: LucideIcon;
  tokens: {
    base: string;
    hover?: string;
    light?: string;
    disable?: string;
    deep?: string;
    focus?: string;
  };
}

/**
 * Definição de uma cor de feedback DSS
 */
export interface FeedbackColor {
  name: string;
  label: string;
  icon: LucideIcon;
  bg: string;
  hover: string;
  light: string;
  disable?: string;
  deep?: string;
  tokens: {
    base: string;
    hover?: string;
    light?: string;
  };
}

/**
 * Definição de uma paleta de marca (brand)
 */
export interface BrandColor {
  name: string;
  label: string;
  icon: string; // Emoji
  principal: string;
  scale: Record<number, string>;
  tokens: {
    principal: string;
    hover: string;
    light: string;
    disable?: string;
  };
}

// ==========================================================================
// VARIANTES E TAMANHOS
// ==========================================================================

/**
 * Definição de uma variante visual
 */
export interface Variant {
  name: string;
  label: string;
  desc: string;
  hasElevation?: boolean;
  hasOutline?: boolean;
  hasBorder?: boolean;
}

/**
 * Definição de um tamanho
 */
export interface Size {
  name: string;
  label: string;
  height?: string;
  padding?: string;
  fontSize?: string;
  minWidth?: string;
  token?: string;
  isDefault?: boolean;
}

// ==========================================================================
// CONTROLES DO PLAYGROUND
// ==========================================================================

/**
 * Tipos de controles disponíveis no playground
 */
export type ControlType = 
  | "button-group"      // Grupo de botões para seleção única
  | "toggle"            // Switch on/off
  | "color-picker"      // Seletor de cores semânticas
  | "brand-picker"      // Seletor de brands
  | "size-picker"       // Seletor de tamanhos
  | "text-input"        // Campo de texto
  | "select"            // Dropdown
  | "icon-picker";      // Seletor de ícones

/**
 * Definição de uma opção de controle
 */
export interface ControlOption {
  name: string;
  label: string;
  value?: string | number | boolean;
  icon?: LucideIcon | string;
  color?: string;
  desc?: string;
}

/**
 * Definição de um grupo de controles
 */
export interface ControlGroup {
  id: string;
  label: string;
  type: ControlType;
  options?: ControlOption[];
  defaultValue?: string | number | boolean;
  mutuallyExclusiveWith?: string[]; // IDs de outros grupos que são mutuamente exclusivos
}

// ==========================================================================
// CONFIGURAÇÃO DO PLAYGROUND
// ==========================================================================

/**
 * Configuração completa do playground
 */
export interface PlaygroundConfig {
  /** Nome do componente */
  componentName: string;

  /** Cores semânticas disponíveis */
  semanticColors: Record<string, SemanticColor>;

  /** Cores de feedback disponíveis */
  feedbackColors: Record<string, FeedbackColor>;

  /** Paletas de marca disponíveis */
  brandColors: Record<string, BrandColor>;

  /** Variantes visuais */
  variants: Variant[];

  /** Tamanhos disponíveis */
  sizes?: Size[];

  /** Grupos de controles */
  controls: ControlGroup[];

  /** Estados padrão */
  defaultState: Record<string, unknown>;
}

// ==========================================================================
// ESTADO DO PLAYGROUND
// ==========================================================================

/**
 * Estado atual do playground
 */
export interface PlaygroundState {
  // Visual
  variant: string;
  size?: string;
  
  // Cores (mutuamente exclusivas)
  semanticColor: string | null;
  brand: string | null;
  
  // Tema
  isDarkMode: boolean;
  
  // Estados booleanos genéricos
  booleanStates: Record<string, boolean>;
  
  // Valores de texto
  textValues: Record<string, string>;
  
  // Valores customizados
  customValues: Record<string, unknown>;
}

// ==========================================================================
// SEÇÕES DO PLAYGROUND
// ==========================================================================

/**
 * Seção de controles do playground
 */
export interface PlaygroundControlSection {
  id: string;
  title: string;
  controls: ControlGroup[];
}

// ==========================================================================
// EVENTOS E CALLBACKS
// ==========================================================================

/**
 * Callback para mudança de estado
 */
export type OnStateChange = (key: string, value: unknown) => void;

/**
 * Callback para geração de código
 */
export type CodeGenerator = (state: PlaygroundState) => string;

// ==========================================================================
// PREVIEW COMPONENT PROPS
// ==========================================================================

/**
 * Props base para componentes de preview
 */
export interface BasePreviewProps {
  variant: string;
  size?: string;
  semanticColor: string | null;
  brand: string | null;
  isDarkMode: boolean;
  isHovered?: boolean;
  booleanStates?: Record<string, boolean>;
  textValues?: Record<string, string>;
}

// ==========================================================================
// DADOS PADRÃO DO DSS
// ==========================================================================

/**
 * Cores semânticas padrão do DSS
 */
export const DSS_SEMANTIC_COLORS: Record<string, SemanticColor> = {
  primary: {
    name: "primary",
    label: "Primary",
    bg: "#1f86de",
    hover: "#0f5295",
    light: "#86c0f3",
    disable: "#b3dcff",
    deep: "#0a3a6a",
    focus: "#006AC5",
    tokens: {
      base: "--dss-action-primary",
      hover: "--dss-action-primary-hover",
      light: "--dss-action-primary-light",
      disable: "--dss-action-primary-disable",
      deep: "--dss-action-primary-deep",
    },
  },
  secondary: {
    name: "secondary",
    label: "Secondary",
    bg: "#26a69a",
    hover: "#1c857e",
    light: "#6ddbcb",
    disable: "#b5ece4",
    deep: "#116761",
    focus: "#009C8D",
    tokens: {
      base: "--dss-action-secondary",
      hover: "--dss-action-secondary-hover",
    },
  },
  tertiary: {
    name: "tertiary",
    label: "Tertiary",
    bg: "#ff6607",
    hover: "#de5500",
    light: "#ff9452",
    disable: "#ffd2b5",
    deep: "#ad4200",
    focus: "#E95900",
    tokens: {
      base: "--dss-action-tertiary",
      hover: "--dss-action-tertiary-hover",
    },
  },
  accent: {
    name: "accent",
    label: "Accent",
    bg: "#b454c4",
    hover: "#883b90",
    light: "#e3bceb",
    disable: "#f0ddf4",
    deep: "#642f6a",
    focus: "#B02EC5",
    tokens: {
      base: "--dss-action-accent",
      hover: "--dss-action-accent-hover",
    },
  },
  dark: {
    name: "dark",
    label: "Dark",
    bg: "#454545",
    hover: "#313131",
    light: "#b0b0b0",
    disable: "#d7d7d7",
    deep: "#1d1d1d",
    focus: "#3E3E3E",
    tokens: {
      base: "--dss-action-dark",
      hover: "--dss-action-dark-hover",
    },
  },
};

/**
 * Cores de feedback padrão do DSS
 */
export const DSS_FEEDBACK_COLORS: Record<string, Omit<FeedbackColor, "icon">> = {
  positive: {
    name: "positive",
    label: "Positive",
    bg: "#4dd228",
    hover: "#27910D",
    light: "#b9f2a4",
    disable: "#dbf8d1",
    deep: "#246714",
    tokens: {
      base: "--dss-feedback-success",
      hover: "--dss-feedback-success-hover",
    },
  },
  negative: {
    name: "negative",
    label: "Negative",
    bg: "#d8182e",
    hover: "#a01424",
    light: "#ffa0ab",
    disable: "#ffcfd4",
    deep: "#720e19",
    tokens: {
      base: "--dss-feedback-error",
      hover: "--dss-feedback-error-hover",
    },
  },
  warning: {
    name: "warning",
    label: "Warning",
    bg: "#fabd14",
    hover: "#dd8e02",
    light: "#fff488",
    disable: "#fff9c3",
    deep: "#a66d08",
    tokens: {
      base: "--dss-feedback-warning",
      hover: "--dss-feedback-warning-hover",
    },
  },
  info: {
    name: "info",
    label: "Info",
    bg: "#0cc4e9",
    hover: "#0c8bae",
    light: "#a7effa",
    disable: "#d2f6fc",
    deep: "#0d7491",
    tokens: {
      base: "--dss-feedback-info",
      hover: "--dss-feedback-info-hover",
    },
  },
};

/**
 * Paletas de marca padrão do DSS
 */
export const DSS_BRAND_COLORS: Record<string, BrandColor> = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",
    scale: {
      50: "#fff9ed",
      100: "#fef2d6",
      200: "#fde2ab",
      300: "#fbcb76",
      400: "#f8aa3f",
      500: "#f5911a",
      600: "#ef7a11",
      700: "#bf590f",
      800: "#984614",
      900: "#7a3614",
      950: "#421d08",
    },
    tokens: {
      principal: "--dss-hub-600",
      hover: "--dss-hub-700",
      light: "--dss-hub-300",
      disable: "--dss-hub-200",
    },
  },
  water: {
    name: "water",
    label: "Water",
    icon: "🔵",
    principal: "#0e88e4",
    scale: {
      50: "#f0f7ff",
      100: "#e0eefe",
      200: "#badefd",
      300: "#7dc4fc",
      400: "#38a6f8",
      500: "#0e88e4",
      600: "#026cc7",
      700: "#0356a1",
      800: "#074a85",
      900: "#0c3e6e",
      950: "#082749",
    },
    tokens: {
      principal: "--dss-water-500",
      hover: "--dss-water-600",
      light: "--dss-water-300",
      disable: "--dss-water-200",
    },
  },
  waste: {
    name: "waste",
    label: "Waste",
    icon: "🟢",
    principal: "#18b173",
    scale: {
      50: "#edfcf4",
      100: "#d3f8e2",
      200: "#abefcb",
      300: "#74e1ae",
      400: "#3ccb8d",
      500: "#18b173",
      600: "#0b8154",
      700: "#0a724e",
      800: "#0a5b3e",
      900: "#0a4a34",
      950: "#042a1e",
    },
    tokens: {
      principal: "--dss-waste-500",
      hover: "--dss-waste-600",
      light: "--dss-waste-300",
      disable: "--dss-waste-200",
    },
  },
};
