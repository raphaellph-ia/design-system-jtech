import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DssTabs, DssTabsContent, DssTabsList, DssTabsTrigger } from "@/components/ui/dss-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Copy,
  Check,
  Layers,
  Code,
  FileText,
  Palette,
  Box,
  Loader2,
  ChevronRight,
  Save,
  Send,
  Upload,
  Plus,
  Trash2,
  Settings,
  Menu,
  ArrowRight,
  Download,
  Eye,
  EyeOff,
  Heart,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

// ============================================================================
// TOKENS REAIS DO DSS - Extraídos de index.css e globals.scss
// ============================================================================

// Cores Semânticas REAIS do DSS
const semanticColors = {
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
      base: "--dss-primary",
      hover: "--dss-primary-hover",
      light: "--dss-primary-light",
      disable: "--dss-primary-disable",
      deep: "--dss-primary-deep",
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
      base: "--dss-secondary",
      hover: "--dss-secondary-hover",
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
      base: "--dss-tertiary",
      hover: "--dss-tertiary-hover",
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
      base: "--dss-accent",
      hover: "--dss-accent-hover",
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
      base: "--dss-dark",
      hover: "--dss-dark-hover",
    },
  },
};

// Cores de Feedback REAIS do DSS
const feedbackColors = {
  positive: {
    name: "positive",
    label: "Positive",
    icon: CheckCircle,
    bg: "#4dd228",
    hover: "#27910D",
    light: "#b9f2a4",
    disable: "#dbf8d1",
    deep: "#246714",
    tokens: {
      base: "--dss-positive",
      hover: "--dss-positive-hover",
    },
  },
  negative: {
    name: "negative",
    label: "Negative",
    icon: XCircle,
    bg: "#d8182e",
    hover: "#a01424",
    light: "#ffa0ab",
    disable: "#ffcfd4",
    deep: "#720e19",
    tokens: {
      base: "--dss-negative",
      hover: "--dss-negative-hover",
    },
  },
  warning: {
    name: "warning",
    label: "Warning",
    icon: AlertTriangle,
    bg: "#fabd14",
    hover: "#dd8e02",
    light: "#fff488",
    disable: "#fff9c3",
    deep: "#a66d08",
    tokens: {
      base: "--dss-warning",
      hover: "--dss-warning-hover",
    },
  },
  info: {
    name: "info",
    label: "Info",
    icon: Info,
    bg: "#0cc4e9",
    hover: "#0c8bae",
    light: "#a7effa",
    disable: "#d2f6fc",
    deep: "#0d7491",
    tokens: {
      base: "--dss-info",
      hover: "--dss-info-hover",
    },
  },
};

// Paletas de Marca REAIS do DSS (Sansys)
const brandColors = {
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

// Variantes Visuais do DssButton
const variants = [
  { name: "elevated", label: "Elevated", desc: "Botão com elevação/shadow (padrão)", hasElevation: true },
  { name: "flat", label: "Flat", desc: "Background transparente, apenas texto", hasElevation: false },
  { name: "outline", label: "Outline", desc: "Background transparente com borda", hasElevation: false },
  { name: "unelevated", label: "Unelevated", desc: "Botão sólido sem shadow", hasElevation: false },
  { name: "push", label: "Push", desc: "Efeito 3D pressionável", hasElevation: true },
  { name: "glossy", label: "Glossy", desc: "Efeito brilhante/glossy", hasElevation: true },
];

// Tamanhos REAIS baseados em Touch Targets DSS (WCAG 2.1 AA)
const sizes = [
  {
    name: "xs",
    label: "XS",
    height: "32px",
    padding: "4px 8px",
    fontSize: "12px",
    minWidth: "48px",
    token: "--dss-touch-target-xs",
  },
  {
    name: "sm",
    label: "SM",
    height: "36px",
    padding: "6px 12px",
    fontSize: "13px",
    minWidth: "56px",
    token: "--dss-touch-target-sm",
  },
  {
    name: "md",
    label: "MD",
    height: "44px",
    padding: "8px 16px",
    fontSize: "14px",
    minWidth: "64px",
    token: "--dss-touch-target-md",
    isDefault: true,
  },
  {
    name: "lg",
    label: "LG",
    height: "52px",
    padding: "12px 20px",
    fontSize: "16px",
    minWidth: "80px",
    token: "--dss-touch-target-lg",
  },
  {
    name: "xl",
    label: "XL",
    height: "64px",
    padding: "16px 24px",
    fontSize: "18px",
    minWidth: "96px",
    token: "--dss-touch-target-xl",
  },
];

// Props API do DssButton
const propsData = [
  { category: "Conteúdo", prop: "label", type: "String", default: "''", description: "Texto do botão" },
  {
    category: "Conteúdo",
    prop: "icon",
    type: "String",
    default: "''",
    description: "Ícone à esquerda (Material Icons)",
  },
  {
    category: "Conteúdo",
    prop: "icon-right",
    type: "String",
    default: "''",
    description: "Ícone à direita (Material Icons)",
  },
  {
    category: "Variantes",
    prop: "variant",
    type: "'elevated' | 'flat' | 'outline' | 'unelevated' | 'push' | 'glossy'",
    default: "'elevated'",
    description: "Estilo visual do botão",
  },
  {
    category: "Variantes",
    prop: "color",
    type: "'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info'",
    default: "'primary'",
    description: "Cor semântica",
  },
  {
    category: "Tamanhos",
    prop: "size",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: "Tamanho (baseado em touch targets)",
  },
  {
    category: "Tamanhos",
    prop: "round",
    type: "Boolean",
    default: "false",
    description: "Bordas completamente arredondadas",
  },
  {
    category: "Tamanhos",
    prop: "square",
    type: "Boolean",
    default: "false",
    description: "Bordas quadradas (sem border-radius)",
  },
  { category: "Tamanhos", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta" },
  {
    category: "Estados",
    prop: "loading",
    type: "Boolean",
    default: "false",
    description: "Exibe spinner de carregamento",
  },
  {
    category: "Estados",
    prop: "percentage",
    type: "Number",
    default: "null",
    description: "Barra de progresso (0-100)",
  },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Estado desabilitado" },
  {
    category: "Brandabilidade",
    prop: "brand",
    type: "'hub' | 'water' | 'waste'",
    default: "null",
    description: "Tema de marca Sansys",
  },
];

// Tokens utilizados pelo DssButton
const tokensUsed = [
  // ============================================================================
  // ACTION COLORS - Cores de ação semânticas
  // ============================================================================
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Background primary button" },
  { category: "Action", token: "--dss-action-primary-hover", value: "#0f5295", usage: "Hover primary" },
  { category: "Action", token: "--dss-action-primary-light", value: "#86c0f3", usage: "Light primary (outline bg)" },
  { category: "Action", token: "--dss-action-primary-deep", value: "#0a3a6a", usage: "Deep primary (pressed)" },
  { category: "Action", token: "--dss-action-primary-disable", value: "#b3dcff", usage: "Disabled primary" },
  { category: "Action", token: "--dss-action-secondary", value: "#26a69a", usage: "Background secondary" },
  { category: "Action", token: "--dss-action-secondary-hover", value: "#1c857e", usage: "Hover secondary" },
  { category: "Action", token: "--dss-action-secondary-light", value: "#6ddbcb", usage: "Light secondary" },
  { category: "Action", token: "--dss-action-tertiary", value: "#ff6607", usage: "Background tertiary" },
  { category: "Action", token: "--dss-action-tertiary-hover", value: "#de5500", usage: "Hover tertiary" },
  { category: "Action", token: "--dss-action-accent", value: "#b454c4", usage: "Background accent" },
  { category: "Action", token: "--dss-action-accent-hover", value: "#883b90", usage: "Hover accent" },
  { category: "Action", token: "--dss-action-dark", value: "#454545", usage: "Background dark" },
  { category: "Action", token: "--dss-action-dark-hover", value: "#313131", usage: "Hover dark" },

  // ============================================================================
  // FEEDBACK COLORS - Cores de feedback
  // ============================================================================
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Positive/Success button" },
  { category: "Feedback", token: "--dss-feedback-success-hover", value: "#27910D", usage: "Hover positive" },
  { category: "Feedback", token: "--dss-feedback-success-light", value: "#b9f2a4", usage: "Light positive" },
  { category: "Feedback", token: "--dss-feedback-success-deep", value: "#246714", usage: "Deep positive" },
  { category: "Feedback", token: "--dss-feedback-error", value: "#d8182e", usage: "Negative/Error button" },
  { category: "Feedback", token: "--dss-feedback-error-hover", value: "#a01424", usage: "Hover negative" },
  { category: "Feedback", token: "--dss-feedback-error-light", value: "#ffa0ab", usage: "Light negative" },
  { category: "Feedback", token: "--dss-feedback-error-deep", value: "#720e19", usage: "Deep negative" },
  { category: "Feedback", token: "--dss-feedback-warning", value: "#fabd14", usage: "Warning button" },
  { category: "Feedback", token: "--dss-feedback-warning-hover", value: "#dd8e02", usage: "Hover warning" },
  { category: "Feedback", token: "--dss-feedback-warning-light", value: "#fff488", usage: "Light warning" },
  { category: "Feedback", token: "--dss-feedback-info", value: "#0cc4e9", usage: "Info button" },
  { category: "Feedback", token: "--dss-feedback-info-hover", value: "#0c8bae", usage: "Hover info" },
  { category: "Feedback", token: "--dss-feedback-info-light", value: "#a7effa", usage: "Light info" },

  // ============================================================================
  // BRANDS - Cores de marca Sansys
  // ============================================================================
  { category: "Brand Hub", token: "--dss-hub-50", value: "#fff9ed", usage: "Hub background light" },
  { category: "Brand Hub", token: "--dss-hub-100", value: "#fef2d6", usage: "Hub surface" },
  { category: "Brand Hub", token: "--dss-hub-300", value: "#fbcb76", usage: "Hub light accent" },
  { category: "Brand Hub", token: "--dss-hub-500", value: "#f5911a", usage: "Hub medium" },
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Hub principal (button bg)" },
  { category: "Brand Hub", token: "--dss-hub-700", value: "#bf590f", usage: "Hub hover" },
  { category: "Brand Hub", token: "--dss-hub-800", value: "#984614", usage: "Hub deep/pressed" },
  { category: "Brand Water", token: "--dss-water-50", value: "#f0f7ff", usage: "Water background light" },
  { category: "Brand Water", token: "--dss-water-100", value: "#e0eefe", usage: "Water surface" },
  { category: "Brand Water", token: "--dss-water-300", value: "#7dc4fc", usage: "Water light accent" },
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Water principal (button bg)" },
  { category: "Brand Water", token: "--dss-water-600", value: "#026cc7", usage: "Water hover" },
  { category: "Brand Water", token: "--dss-water-700", value: "#0356a1", usage: "Water deep/pressed" },
  { category: "Brand Waste", token: "--dss-waste-50", value: "#edfcf4", usage: "Waste background light" },
  { category: "Brand Waste", token: "--dss-waste-100", value: "#d3f8e2", usage: "Waste surface" },
  { category: "Brand Waste", token: "--dss-waste-300", value: "#74e1ae", usage: "Waste light accent" },
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Waste principal (button bg)" },
  { category: "Brand Waste", token: "--dss-waste-600", value: "#0b8154", usage: "Waste hover" },
  { category: "Brand Waste", token: "--dss-waste-700", value: "#0a724e", usage: "Waste deep/pressed" },

  // ============================================================================
  // SIZING - Touch targets e dimensões
  // ============================================================================
  { category: "Sizing", token: "--dss-touch-target-xs", value: "24px", usage: "Altura extra small" },
  { category: "Sizing", token: "--dss-touch-target-sm", value: "32px", usage: "Altura small" },
  { category: "Sizing", token: "--dss-touch-target-md", value: "44px", usage: "Altura mínima WCAG 2.1 AA" },
  { category: "Sizing", token: "--dss-touch-target-lg", value: "52px", usage: "Altura large" },
  { category: "Sizing", token: "--dss-touch-target-xl", value: "64px", usage: "Altura extra large" },
  { category: "Sizing", token: "--dss-btn-min-width", value: "64px", usage: "Largura mínima" },
  { category: "Sizing", token: "--dss-btn-icon-size-xs", value: "14px", usage: "Ícone extra small" },
  { category: "Sizing", token: "--dss-btn-icon-size-sm", value: "16px", usage: "Ícone small" },
  { category: "Sizing", token: "--dss-btn-icon-size-md", value: "20px", usage: "Ícone medium" },
  { category: "Sizing", token: "--dss-btn-icon-size-lg", value: "24px", usage: "Ícone large" },

  // ============================================================================
  // SPACING - Espaçamentos internos
  // ============================================================================
  { category: "Spacing", token: "--dss-spacing-1", value: "4px", usage: "Gap icon-label (xs)" },
  { category: "Spacing", token: "--dss-spacing-2", value: "8px", usage: "Gap icon-label (sm/md)" },
  { category: "Spacing", token: "--dss-spacing-3", value: "12px", usage: "Padding horizontal (sm)" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding horizontal (md)" },
  { category: "Spacing", token: "--dss-spacing-5", value: "20px", usage: "Padding horizontal (lg)" },
  { category: "Spacing", token: "--dss-spacing-6", value: "24px", usage: "Padding horizontal (xl)" },
  { category: "Spacing", token: "--dss-gap-2", value: "8px", usage: "Gap entre botões (group)" },
  { category: "Spacing", token: "--dss-gap-3", value: "12px", usage: "Gap button group (md)" },

  // ============================================================================
  // BORDER RADIUS - Arredondamento
  // ============================================================================
  { category: "Border Radius", token: "--dss-radius-none", value: "0", usage: "Sem arredondamento" },
  { category: "Border Radius", token: "--dss-radius-sm", value: "4px", usage: "Radius padrão (xs/sm)" },
  { category: "Border Radius", token: "--dss-radius-md", value: "8px", usage: "Radius médio (md/lg)" },
  { category: "Border Radius", token: "--dss-radius-lg", value: "12px", usage: "Radius grande (xl)" },
  { category: "Border Radius", token: "--dss-radius-full", value: "9999px", usage: "Botão round/pill" },

  // ============================================================================
  // ELEVATION - Sombras
  // ============================================================================
  { category: "Elevation", token: "--dss-elevation-0", value: "none", usage: "Sem sombra (flat/outline)" },
  { category: "Elevation", token: "--dss-elevation-1", value: "0 1px 3px rgba(0,0,0,0.25)", usage: "Sombra elevated" },
  { category: "Elevation", token: "--dss-elevation-2", value: "0 4px 6px rgba(0,0,0,0.30)", usage: "Sombra hover" },
  {
    category: "Elevation",
    token: "--dss-shadow-focus",
    value: "0 0 0 3px rgba(31,134,222,0.5)",
    usage: "Focus ring primary",
  },
  {
    category: "Elevation",
    token: "--dss-shadow-focus-error",
    value: "0 0 0 3px rgba(216,24,46,0.5)",
    usage: "Focus ring error",
  },
  {
    category: "Elevation",
    token: "--dss-shadow-hub-sm",
    value: "0 2px 4px rgba(239,122,17,0.25)",
    usage: "Sombra Hub",
  },
  {
    category: "Elevation",
    token: "--dss-shadow-water-sm",
    value: "0 2px 4px rgba(14,136,228,0.25)",
    usage: "Sombra Water",
  },
  {
    category: "Elevation",
    token: "--dss-shadow-waste-sm",
    value: "0 2px 4px rgba(24,177,115,0.25)",
    usage: "Sombra Waste",
  },

  // ============================================================================
  // BORDERS - Bordas
  // ============================================================================
  { category: "Borders", token: "--dss-border-gray-300", value: "1px solid #d4d4d4", usage: "Borda outline light" },
  { category: "Borders", token: "--dss-border-gray-400", value: "1px solid #a3a3a3", usage: "Borda outline hover" },
  {
    category: "Borders",
    token: "--dss-border-primary",
    value: "1px solid var(--dss-primary)",
    usage: "Borda outline primary",
  },
  {
    category: "Borders",
    token: "--dss-border-focus",
    value: "2px solid var(--dss-action-primary)",
    usage: "Focus outline",
  },
  { category: "Borders", token: "--dss-border-hub-600", value: "1px solid #ef7a11", usage: "Borda outline Hub" },
  { category: "Borders", token: "--dss-border-water-500", value: "1px solid #0e88e4", usage: "Borda outline Water" },
  { category: "Borders", token: "--dss-border-waste-500", value: "1px solid #18b173", usage: "Borda outline Waste" },

  // ============================================================================
  // TYPOGRAPHY - Tipografia
  // ============================================================================
  { category: "Typography", token: "--dss-font-size-xs", value: "10px", usage: "Texto extra small" },
  { category: "Typography", token: "--dss-font-size-sm", value: "12px", usage: "Texto small" },
  { category: "Typography", token: "--dss-font-size-md", value: "14px", usage: "Texto medium (padrão)" },
  { category: "Typography", token: "--dss-font-size-lg", value: "16px", usage: "Texto large" },
  { category: "Typography", token: "--dss-font-weight-medium", value: "500", usage: "Peso label" },
  { category: "Typography", token: "--dss-font-weight-semibold", value: "600", usage: "Peso label forte" },
  { category: "Typography", token: "--dss-text-transform-btn", value: "none", usage: "Transformação texto" },
  { category: "Typography", token: "--dss-letter-spacing-btn", value: "0.02em", usage: "Espaçamento letras" },

  // ============================================================================
  // TEXT COLORS - Cores de texto
  // ============================================================================
  { category: "Text", token: "--dss-text-inverse", value: "#ffffff", usage: "Texto sobre bg escuro" },
  { category: "Text", token: "--dss-text-body", value: "#454545", usage: "Texto sobre bg claro" },
  { category: "Text", token: "--dss-text-disabled", value: "#d4d4d4", usage: "Texto desabilitado" },
  { category: "Text", token: "--dss-text-action", value: "var(--dss-action-primary)", usage: "Texto link/flat button" },

  // ============================================================================
  // MOTION - Animações e transições
  // ============================================================================
  { category: "Motion", token: "--dss-duration-fast", value: "150ms", usage: "Transição rápida (hover)" },
  { category: "Motion", token: "--dss-duration-base", value: "250ms", usage: "Transição padrão" },
  { category: "Motion", token: "--dss-duration-slow", value: "300ms", usage: "Transição lenta" },
  { category: "Motion", token: "--dss-easing-standard", value: "cubic-bezier(0.4,0,0.2,1)", usage: "Easing padrão" },
  {
    category: "Motion",
    token: "--dss-easing-ease-out",
    value: "cubic-bezier(0,0,0.58,1)",
    usage: "Easing saída (hover)",
  },
  { category: "Motion", token: "--dss-transition-base", value: "all 250ms ease", usage: "Transição completa" },
  { category: "Motion", token: "--dss-transition-transform", value: "transform 150ms ease", usage: "Transição scale" },

  // ============================================================================
  // OPACITY - Transparências
  // ============================================================================
  { category: "Opacity", token: "--dss-opacity-disabled", value: "0.4", usage: "Estado desabilitado" },
  { category: "Opacity", token: "--dss-opacity-hover", value: "0.1", usage: "Hover overlay flat" },
  { category: "Opacity", token: "--dss-opacity-active", value: "0.2", usage: "Active/pressed overlay" },
  { category: "Opacity", token: "--dss-opacity-loading", value: "0.7", usage: "Loading state" },

  // ============================================================================
  // STATES - Estados visuais
  // ============================================================================
  { category: "States", token: "--dss-state-hover-scale", value: "1.02", usage: "Scale no hover" },
  { category: "States", token: "--dss-state-active-scale", value: "0.98", usage: "Scale no pressed" },
  { category: "States", token: "--dss-state-focus-outline", value: "2px", usage: "Espessura focus ring" },
  { category: "States", token: "--dss-state-focus-offset", value: "2px", usage: "Offset focus ring" },

  // ============================================================================
  // GRAY SCALE - Escala de cinza
  // ============================================================================
  { category: "Gray Scale", token: "--dss-gray-50", value: "#ffffff", usage: "Branco" },
  { category: "Gray Scale", token: "--dss-gray-100", value: "#fafafa", usage: "Cinza muito claro" },
  { category: "Gray Scale", token: "--dss-gray-200", value: "#f5f5f5", usage: "Cinza claro (disabled bg)" },
  { category: "Gray Scale", token: "--dss-gray-300", value: "#e5e5e5", usage: "Borda light" },
  { category: "Gray Scale", token: "--dss-gray-400", value: "#d4d4d4", usage: "Borda médio" },
  { category: "Gray Scale", token: "--dss-gray-500", value: "#a3a3a3", usage: "Cinza médio" },
  { category: "Gray Scale", token: "--dss-gray-600", value: "#737373", usage: "Texto secundário" },
  { category: "Gray Scale", token: "--dss-gray-700", value: "#525252", usage: "Texto dark mode" },
  { category: "Gray Scale", token: "--dss-gray-800", value: "#404040", usage: "Background dark" },
  { category: "Gray Scale", token: "--dss-gray-900", value: "#262626", usage: "Background very dark" },
];

// Anatomia 4 Camadas DSS - Novo formato expandido
const anatomyData = {
  structure: {
    files: ["DssButton.vue"],
    description:
      "Camada responsável pelo template Vue, definição de props e interface do componente. Aqui é onde toda a lógica de renderização e comunicação com o exterior acontece.",
    responsibilities: [
      "Definição do template HTML semântico (<button> ou <a>)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (@click, @focus, @blur)",
      "Binding de slots (default, icon, icon-right)",
      "Lógica de estados (loading, disabled)",
      "Composables locais (useButtonBase)",
    ],
    tokens: [],
    codeExample: `<template>
  <button
    class="dss-button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot name="icon" />
    <span class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>
    <slot name="icon-right" />
  </button>
</template>`,
  },
  composition: {
    files: ["_base.scss", "_reset.scss", "_layout.scss"],
    description:
      "Estilos fundamentais que definem o layout, tipografia e reset do componente. Utiliza apenas tokens genéricos do design system, sem cores específicas.",
    responsibilities: [
      "Reset de estilos nativos do browser",
      "Display flex e alinhamento de conteúdo",
      "Tipografia base (font-family, font-weight, letter-spacing)",
      "Espaçamentos internos via tokens --dss-spacing-*",
      "Cursor e user-select",
      "Transições base com --dss-duration-*",
    ],
    tokens: [
      "--dss-font-size-md",
      "--dss-font-weight-medium",
      "--dss-spacing-2",
      "--dss-spacing-4",
      "--dss-duration-fast",
      "--dss-easing-standard",
    ],
    codeExample: `.dss-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);
  font-family: var(--dss-font-family);
  font-weight: var(--dss-font-weight-medium);
  cursor: pointer;
  transition: all var(--dss-duration-fast) var(--dss-easing-standard);
}`,
  },
  variants: {
    files: ["_elevated.scss", "_flat.scss", "_outline.scss", "_unelevated.scss", "_push.scss", "_glossy.scss"],
    description:
      "Define as variações visuais do componente sem incluir cores. Cada variante aplica estilos específicos como sombras, bordas e efeitos especiais.",
    responsibilities: [
      "Elevated: box-shadow com --dss-elevation-1",
      "Flat: background transparent, sem borda",
      "Outline: borda 1px, background transparent",
      "Unelevated: background sólido, sem shadow",
      "Push: efeito 3D com sombra inferior",
      "Glossy: gradiente de brilho sobreposto",
    ],
    tokens: [
      "--dss-elevation-0",
      "--dss-elevation-1",
      "--dss-elevation-2",
      "--dss-radius-sm",
      "--dss-radius-md",
      "--dss-radius-full",
    ],
    codeExample: `// _elevated.scss
.dss-button--elevated {
  box-shadow: var(--dss-elevation-1);
  
  &:hover {
    box-shadow: var(--dss-elevation-2);
  }
}

// _outline.scss
.dss-button--outline {
  background: transparent;
  border: 1px solid currentColor;
}`,
  },
  output: {
    files: ["_colors.scss", "_brands.scss", "_states.scss", "_sizes.scss"],
    description:
      "Camada final que aplica cores semânticas, temas de brand (Hub, Water, Waste), estados interativos e dimensionamento. É a orquestração final de todos os tokens visuais.",
    responsibilities: [
      "Aplicação de cores semânticas (primary, secondary, etc.)",
      "Brandability completa (Hub, Water, Waste)",
      "Estados hover, focus, active, disabled",
      "Sizing responsivo (xs, sm, md, lg, xl)",
      "Focus ring com --dss-shadow-focus",
      "Opacity de disabled com --dss-opacity-disabled",
    ],
    tokens: [
      "--dss-action-primary",
      "--dss-action-primary-hover",
      "--dss-hub-600",
      "--dss-water-500",
      "--dss-waste-500",
      "--dss-touch-target-md",
      "--dss-shadow-focus",
      "--dss-opacity-disabled",
    ],
    codeExample: `// _colors.scss
.dss-button--primary {
  background: var(--dss-action-primary);
  color: var(--dss-text-inverse);
  
  &:hover {
    background: var(--dss-action-primary-hover);
  }
}

// _brands.scss
[data-brand="hub"] .dss-button {
  background: var(--dss-hub-600);
  &:hover { background: var(--dss-hub-700); }
}`,
  },
};

// ============================================================================
// COMPONENTE BUTTON PREVIEW COM TOKENS REAIS
// ============================================================================

interface DssButtonPreviewProps {
  label?: string;
  variant?: string;
  colorKey?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  brand?: string;
  showToken?: boolean;
}

function DssButtonPreview({
  label = "Button",
  variant = "elevated",
  colorKey = "primary",
  size = "md",
  disabled = false,
  loading = false,
  round = false,
  icon,
  iconRight,
  brand,
  showToken = false,
}: DssButtonPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Obter cores REAIS do DSS incluindo light para hover de flat/outline
  const getColors = () => {
    if (brand && brandColors[brand as keyof typeof brandColors]) {
      const b = brandColors[brand as keyof typeof brandColors];
      return {
        bg: b.principal,
        hover: b.scale[700] || b.scale[600],
        light: b.scale[100],
        deep: b.scale[800],
        textColor: "#ffffff",
      };
    }

    if (feedbackColors[colorKey as keyof typeof feedbackColors]) {
      const f = feedbackColors[colorKey as keyof typeof feedbackColors];
      const textColor = colorKey === "warning" ? "#1a1a1a" : "#ffffff";
      return {
        bg: f.bg,
        hover: f.hover,
        light: f.light,
        deep: f.deep,
        textColor,
      };
    }

    if (semanticColors[colorKey as keyof typeof semanticColors]) {
      const s = semanticColors[colorKey as keyof typeof semanticColors];
      return {
        bg: s.bg,
        hover: s.hover,
        light: s.light,
        deep: s.deep,
        textColor: "#ffffff",
      };
    }

    return {
      bg: "#1f86de",
      hover: "#0f5295",
      light: "#86c0f3",
      deep: "#0a3a6a",
      textColor: "#ffffff",
    };
  };

  const getSizeStyles = () => {
    const sizeData = sizes.find((s) => s.name === size) || sizes[2];
    return {
      height: sizeData.height,
      padding: sizeData.padding,
      fontSize: sizeData.fontSize,
    };
  };

  const colors = getColors();
  const sizeStyles = getSizeStyles();

  // Estilos baseados na variante COM suporte a hover dinâmico
  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.0892857143em",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      borderRadius: round ? "9999px" : "4px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: sizeStyles.height,
      padding: sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      fontFamily: "system-ui, -apple-system, sans-serif",
    };

    switch (variant) {
      case "flat":
        // Hover: bg usa light, text usa hover
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.light : "transparent",
          color: isHovered && !disabled ? colors.hover : colors.bg,
          border: "none",
          boxShadow: "none",
        };
      case "outline":
        // Hover: bg usa light, text/borda usa hover
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.light : "transparent",
          color: isHovered && !disabled ? colors.hover : colors.bg,
          border: `1px solid ${isHovered && !disabled ? colors.hover : colors.bg}`,
          boxShadow: "none",
        };
      case "unelevated":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "none",
        };
      case "push":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: isHovered && !disabled ? `0 2px 0 ${colors.deep}` : `0 4px 0 ${colors.hover}`,
          transform: isHovered && !disabled ? "translateY(0px)" : "translateY(-2px)",
        };
      case "glossy":
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.12) 51%, transparent 100%)",
        };
      case "elevated":
      default:
        return {
          ...base,
          backgroundColor: isHovered && !disabled ? colors.hover : colors.bg,
          color: colors.textColor,
          border: "none",
          boxShadow:
            isHovered && !disabled
              ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.12)"
              : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        };
    }
  };

  const tokenName = brand
    ? brandColors[brand as keyof typeof brandColors]?.tokens.principal
    : semanticColors[colorKey as keyof typeof semanticColors]?.tokens.base ||
      feedbackColors[colorKey as keyof typeof feedbackColors]?.tokens.base;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        style={getVariantStyles()}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" style={{ width: sizeStyles.fontSize, height: sizeStyles.fontSize }} />
        ) : (
          <>
            {icon}
            {label && <span>{label}</span>}
            {iconRight}
          </>
        )}
      </button>
      {showToken && tokenName && (
        <code className="text-[10px] font-mono mt-1" style={{ color: "var(--jtech-text-muted)" }}>
          {tokenName}
        </code>
      )}
    </div>
  );
}

// ============================================================================
// TOKEN ROW COMPONENT (Jtech Style)
// ============================================================================

function TokenRow({ token, value, usage }: { token: string; value: string; usage: string }) {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = value.startsWith("#") || value.startsWith("rgb");

  return (
    <div
      className="group flex items-center gap-4 py-3 px-4 rounded-lg transition-all cursor-pointer"
      onClick={copyToken}
      style={{
        backgroundColor: "var(--jtech-card-bg)",
        border: "1px solid var(--jtech-card-border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--jtech-card-hover-border)";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--jtech-card-border)";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {isColor && (
        <div
          className="w-8 h-8 rounded-md flex-shrink-0"
          style={{ backgroundColor: value, boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        />
      )}
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono" style={{ color: "var(--jtech-heading-secondary)" }}>
          {token}
        </code>
        <p className="text-xs mt-0.5" style={{ color: "var(--jtech-text-body)" }}>
          {usage}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-[10px] font-mono" style={{ color: "var(--jtech-text-muted)" }}>
          {value}
        </code>
        {copied ? (
          <Check className="h-4 w-4" style={{ color: "var(--dss-positive)" }} />
        ) : (
          <Copy
            className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--jtech-text-muted)" }}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssButtonPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRound, setIsRound] = useState(false);
  const [hasIcon, setHasIcon] = useState(false);
  const [hasIconRight, setHasIconRight] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Lógica de exclusão mútua: brand tem precedência sobre color
  // Quando brand está selecionado, color não é incluído no código
  const effectiveColor = selectedBrand ? null : selectedColor;

  const codeExample = `<DssButton
  label="Clique aqui"
  variant="${selectedVariant}"${effectiveColor ? `\n  color="${effectiveColor}"` : ""}
  size="${selectedSize}"${selectedBrand ? `\n  brand="${selectedBrand}"` : ""}${isDisabled ? "\n  disabled" : ""}${isLoading ? "\n  loading" : ""}${isRound ? "\n  round" : ""}${hasIcon ? '\n  icon="save"' : ""}${hasIconRight ? '\n  icon-right="arrow_forward"' : ""}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokensByCategory = tokensUsed.reduce(
    (acc, token) => {
      if (!acc[token.category]) acc[token.category] = [];
      acc[token.category].push(token);
      return acc;
    },
    {} as Record<string, typeof tokensUsed>,
  );

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10" style={{ backgroundColor: "var(--dss-page-bg)" }}>
      {/* Badges + Título + Descrição */}
      <PageHeader
        icon={Box}
        badge="Golden Sample"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssButton"
        subtitle="DssButton é o componente utilizado para representar ações na interface, como confirmar, cancelar, enviar ou navegar.
Ele oferece variações visuais e comportamentais bem definidas para diferentes contextos de uso, garantindo clareza de intenção, feedback imediato ao usuário e consistência entre estados interativos."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.1.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />
      {/* Interactive Playground - Jtech Style */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <Card
        className="overflow-hidden"
        style={{
          backgroundColor: "var(--jtech-card-bg)",
          borderColor: "var(--dss-jtech-accent)",
          borderWidth: "2px",
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: "var(--jtech-heading-secondary)" }}>
            <Code className="h-5 w-5" style={{ color: "var(--dss-jtech-accent)" }} />
            Configure o Botão
          </CardTitle>
          <CardDescription style={{ color: "var(--jtech-text-body)" }}>
            Selecione as props e veja o resultado em tempo real com tokens DSS reais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div
            className="p-8 rounded-lg flex items-center justify-center min-h-[140px] relative transition-colors duration-300"
            style={{
              backgroundColor: isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.95)",
              backgroundImage: isDarkMode
                ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)"
                : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)",
              backgroundSize: "20px 20px",
              border: isDarkMode ? "1px solid var(--jtech-card-border)" : "1px solid #e5e5e5",
            }}
          >
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                color: isDarkMode ? "#ffffff" : "#1a1a1a",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
              }}
              title={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Theme Label */}
            <span
              className="absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded"
              style={{
                backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              }}
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </span>

            <DssButtonPreview
              label="Clique aqui"
              variant={selectedVariant}
              colorKey={selectedColor}
              size={selectedSize}
              disabled={isDisabled}
              loading={isLoading}
              round={isRound}
              brand={selectedBrand || undefined}
              icon={hasIcon ? <Save className="w-4 h-4" /> : undefined}
              iconRight={hasIconRight ? <ChevronRight className="w-4 h-4" /> : undefined}
              showToken={true}
            />
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out
                      hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                      ${selectedVariant === v.name ? 'shadow-lg shadow-[var(--dss-jtech-accent)]/25' : 'hover:bg-white/15'}`}
                    style={{
                      backgroundColor:
                        selectedVariant === v.name ? "var(--dss-jtech-accent)" : "rgba(255,255,255,0.05)",
                      color: selectedVariant === v.name ? "#ffffff" : "var(--jtech-text-body)",
                      border: `1px solid ${selectedVariant === v.name ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)"}`,
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(semanticColors).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c.name);
                      setSelectedBrand(null);
                    }}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out flex items-center gap-1.5
                      hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                      ${selectedColor === c.name && !selectedBrand ? 'shadow-lg' : 'hover:bg-white/15'}`}
                    style={{
                      backgroundColor: selectedColor === c.name && !selectedBrand ? c.bg : "rgba(255,255,255,0.05)",
                      color: selectedColor === c.name && !selectedBrand ? "#ffffff" : "var(--jtech-text-body)",
                      border: `1px solid ${selectedColor === c.name && !selectedBrand ? c.bg : "var(--jtech-card-border)"}`,
                      boxShadow: selectedColor === c.name && !selectedBrand ? `0 10px 15px -3px ${c.bg}40` : undefined,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: c.bg }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Colors */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Feedback
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(feedbackColors).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c.name);
                      setSelectedBrand(null);
                    }}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out flex items-center gap-1.5
                      hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                      ${selectedColor === c.name && !selectedBrand ? 'shadow-lg' : 'hover:bg-white/15'}`}
                    style={{
                      backgroundColor: selectedColor === c.name && !selectedBrand ? c.bg : "rgba(255,255,255,0.05)",
                      color:
                        selectedColor === c.name && !selectedBrand
                          ? c.name === "warning"
                            ? "#1a1a1a"
                            : "#ffffff"
                          : "var(--jtech-text-body)",
                      border: `1px solid ${selectedColor === c.name && !selectedBrand ? c.bg : "var(--jtech-card-border)"}`,
                      boxShadow: selectedColor === c.name && !selectedBrand ? `0 10px 15px -3px ${c.bg}40` : undefined,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.bg }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Brand (Sansys)
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out
                    hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                    ${!selectedBrand ? 'shadow-lg shadow-[var(--dss-jtech-accent)]/25' : 'hover:bg-white/15'}`}
                  style={{
                    backgroundColor: !selectedBrand ? "var(--dss-jtech-accent)" : "rgba(255,255,255,0.05)",
                    color: !selectedBrand ? "#ffffff" : "var(--jtech-text-body)",
                    border: `1px solid ${!selectedBrand ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)"}`,
                  }}
                >
                  Nenhum
                </button>
                {Object.values(brandColors).map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedColor("primary");
                    }}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out flex items-center gap-1.5
                      hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                      ${selectedBrand === b.name ? 'shadow-lg' : 'hover:bg-white/15'}`}
                    style={{
                      backgroundColor: selectedBrand === b.name ? b.principal : "rgba(255,255,255,0.05)",
                      color: selectedBrand === b.name ? "#ffffff" : "var(--jtech-text-body)",
                      border: `1px solid ${selectedBrand === b.name ? b.principal : "var(--jtech-card-border)"}`,
                      boxShadow: selectedBrand === b.name ? `0 10px 15px -3px ${b.principal}40` : undefined,
                    }}
                  >
                    <span className="transition-transform duration-200 hover:scale-110">{b.icon}</span>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out
                      hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                      ${selectedSize === s.name ? 'shadow-lg shadow-[var(--dss-jtech-accent)]/25' : 'hover:bg-white/15'}`}
                    style={{
                      backgroundColor: selectedSize === s.name ? "var(--dss-jtech-accent)" : "rgba(255,255,255,0.05)",
                      color: selectedSize === s.name ? "#ffffff" : "var(--jtech-text-body)",
                      border: `1px solid ${selectedSize === s.name ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)"}`,
                    }}
                  >
                    {s.label}
                    {s.isDefault && <span className="ml-1 opacity-50">•</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* States & Icons */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Estados & Ícones
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "disabled", label: "Disabled", active: isDisabled, toggle: () => setIsDisabled(!isDisabled) },
                  { key: "loading", label: "Loading", active: isLoading, toggle: () => setIsLoading(!isLoading) },
                  { key: "round", label: "Round", active: isRound, toggle: () => setIsRound(!isRound) },
                  { key: "icon", label: "Icon Left", active: hasIcon, toggle: () => setHasIcon(!hasIcon) },
                  {
                    key: "iconRight",
                    label: "Icon Right",
                    active: hasIconRight,
                    toggle: () => setHasIconRight(!hasIconRight),
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={item.toggle}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 ease-out
                      hover:scale-105 active:scale-95 hover:shadow-md hover:brightness-125
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]
                      ${item.active ? 'shadow-lg shadow-[var(--dss-positive)]/25' : 'hover:bg-white/15'}`}
                    style={{
                      backgroundColor: item.active ? "var(--dss-positive)" : "rgba(255,255,255,0.05)",
                      color: item.active ? "#ffffff" : "var(--jtech-text-body)",
                      border: `1px solid ${item.active ? "var(--dss-positive)" : "var(--jtech-card-border)"}`,
                    }}
                  >
                    <span className={`inline-block transition-transform duration-200 ${item.active ? 'scale-110' : ''}`}>
                      {item.active && "✓ "}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="relative">
            <pre
              className="p-4 overflow-x-auto rounded-lg font-mono text-sm"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "var(--jtech-heading-secondary)",
                border: "1px solid var(--jtech-card-border)",
              }}
            >
              <code>{codeExample}</code>
            </pre>
            <button
              className="absolute top-2 right-2 p-2 rounded hover:bg-white/10 transition-colors"
              onClick={copyCode}
              style={{ color: "var(--jtech-text-muted)" }}
            >
              {copied ? (
                <Check className="h-4 w-4" style={{ color: "var(--dss-positive)" }} />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Anatomia 4 Camadas */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />

      <AnatomySection componentName="DssButton" layers={anatomyData} />

      {/* Documentação Técnica - Seção Colapsável */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Categoria</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Type</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propsData.map((p, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-muted)" }}>{p.category}</TableCell>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    {p.prop}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>
                    {p.type}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>
                    {p.default}
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>
              ✅ Implementado
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Touch target mínimo 44x44px (WCAG 2.5.5)",
                "Focus ring visível com :focus-visible",
                "Contraste mínimo 4.5:1 em todas as cores",
                "Respeita prefers-reduced-motion",
                "Suporte a prefers-contrast: high",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>
              📋 Media Queries
            </h4>
            <pre
              className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "var(--jtech-text-body)",
                border: "1px solid var(--jtech-card-border)",
              }}
            >
              {`/* High contrast mode */
@media (prefers-contrast: high) {
  .dss-button {
    border-width: 2px !important;
    font-weight: 600;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dss-button {
    transition: none !important;
  }
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
