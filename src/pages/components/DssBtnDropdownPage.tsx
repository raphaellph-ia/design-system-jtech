import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Shield,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
  type FeedbackColor,
} from "@/components/ui/playground";

// ============================================================================
// DADOS ESPECÍFICOS DO DSSBTNDROPDOWN
// ============================================================================

const variants = [
  { name: "elevated", label: "Elevated", desc: "Botão com sombra (padrão)" },
  { name: "flat", label: "Flat", desc: "Sem elevação nem borda" },
  { name: "outline", label: "Outline", desc: "Com borda visível" },
  { name: "unelevated", label: "Unelevated", desc: "Sólido sem shadow" },
];

const sizes = [
  { name: "xs", label: "XS", height: "32px", padding: "4px 8px", fontSize: "12px", minWidth: "48px" },
  { name: "sm", label: "SM", height: "36px", padding: "6px 12px", fontSize: "13px", minWidth: "56px" },
  { name: "md", label: "MD", height: "44px", padding: "8px 16px", fontSize: "14px", minWidth: "64px", isDefault: true },
  { name: "lg", label: "LG", height: "52px", padding: "12px 20px", fontSize: "16px", minWidth: "80px" },
  { name: "xl", label: "XL", height: "64px", padding: "16px 24px", fontSize: "18px", minWidth: "96px" },
];

const feedbackColors: Record<string, FeedbackColor> = {
  positive: { ...DSS_FEEDBACK_COLORS.positive, icon: CheckCircle },
  negative: { ...DSS_FEEDBACK_COLORS.negative, icon: XCircle },
  warning: { ...DSS_FEEDBACK_COLORS.warning, icon: AlertTriangle },
  info: { ...DSS_FEEDBACK_COLORS.info, icon: Info },
};

const propsData = [
  { category: "Conteúdo", prop: "label", type: "String", default: "undefined", description: "Rótulo do botão trigger." },
  { category: "Conteúdo", prop: "icon", type: "String", default: "undefined", description: "Ícone à esquerda do label (Material Icons)." },
  { category: "Conteúdo", prop: "iconRight", type: "String", default: "undefined", description: "Ícone à direita do label (antes da seta)." },
  { category: "Estilo Visual", prop: "variant", type: "BtnDropdownVariant", default: "'elevated'", description: "Variante visual. Mapeada internamente para props booleanas do Quasar." },
  { category: "Estilo Visual", prop: "color", type: "String", default: "undefined", description: "Cor do trigger (paleta Quasar/DSS)." },
  { category: "Estilo Visual", prop: "textColor", type: "String", default: "undefined", description: "Cor do texto (sobrescreve contraste automático)." },
  { category: "Estilo Visual", prop: "size", type: "BtnDropdownSize", default: "'md'", description: "Tamanho do botão: xs, sm, md, lg, xl." },
  { category: "Estilo Visual", prop: "square", type: "Boolean", default: "false", description: "Remove border-radius (cantos retos)." },
  { category: "Estilo Visual", prop: "rounded", type: "Boolean", default: "false", description: "Border-radius pill completo." },
  { category: "Estilo Visual", prop: "dense", type: "Boolean", default: "false", description: "Modo compacto (reduz padding e altura)." },
  { category: "Comportamento", prop: "split", type: "Boolean", default: "false", description: "Separa botão de ação da seta de dropdown." },
  { category: "Comportamento", prop: "disable", type: "Boolean", default: "false", description: "Desabilita o componente inteiro." },
  { category: "Comportamento", prop: "loading", type: "Boolean", default: "false", description: "Indica estado de carregamento no trigger." },
  { category: "Comportamento", prop: "closeOnEsc", type: "Boolean", default: "true", description: "Fecha o dropdown ao pressionar Escape." },
  { category: "Comportamento", prop: "dropdownIcon", type: "String", default: "'arrow_drop_down'", description: "Ícone de seta do dropdown." },
  { category: "Comportamento", prop: "menuAnchor", type: "String", default: "'bottom left'", description: "Ponto de âncora do painel." },
  { category: "Comportamento", prop: "menuSelf", type: "String", default: "'top left'", description: "Ponto de self do painel." },
  { category: "Comportamento", prop: "menuOffset", type: "[Number, Number]", default: "[0, 0]", description: "Offset do painel em pixels." },
  { category: "Comportamento", prop: "stretch", type: "Boolean", default: "false", description: "Largura mínima do painel igual à do trigger." },
  { category: "Comportamento", prop: "persistent", type: "Boolean", default: "false", description: "Mantém conteúdo montado quando fechado." },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Acento visual de marca na borda inferior do trigger." },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label acessível para o trigger." },
];

const anatomyData = {
  structure: {
    files: ["DssBtnDropdown.ts.vue"],
    description: "Template Vue com div wrapper, QBtnDropdown interno e composable de classes. Mapeia variant para props booleanas Quasar.",
    responsibilities: [
      "Template div wrapper com classes DSS computadas",
      "QBtnDropdown interno com props mapeadas via composable",
      "Slot default para conteúdo do painel dropdown",
      "Slot label para trigger personalizado",
      "Emits: click, show, hide, before-show, before-hide",
    ],
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais do container, modo split e painel teleportado usando tokens genéricos.",
    responsibilities: [
      "Container inline-flex com vertical-align middle",
      "Split mode: border-radius 0 na junção (EXC-01)",
      "Square variant: border-radius 0 no trigger (EXC-02)",
      "Painel teleportado: background, shadow, radius, min-width (EXC-05)",
    ],
  },
  variants: {
    files: ["3-variants/_elevated.scss", "_flat.scss", "_outline.scss", "_unelevated.scss"],
    description: "Ajustes visuais por variante: separadores entre botão e seta no modo split.",
    responsibilities: [
      "Flat: separador --dss-gray-300 entre botão e seta no split",
      "Outline: borda --dss-border-width-thin no separador split",
      "Unelevated: separador --dss-gray-200 entre botão e seta",
      "Elevated: comportamento padrão do Quasar (sem override)",
    ],
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss"],
    description: "Camada final: brandabilidade, dark mode, forced-colors, high contrast e print.",
    responsibilities: [
      "Brand Hub/Water/Waste via box-shadow inset na borda inferior",
      "Dark mode: cores de brand ajustadas (hub-400, water-400, waste-500)",
      "Dark mode divider: rgba(255,255,255,0.12) [EXC-03]",
      "Forced-colors: 1px solid ButtonBorder [EXC-04]",
      "High contrast: border com --dss-border-width-md",
      "Print: painel oculto (display: none)",
    ],
  },
};

// ============================================================================
// PREVIEW DO BTNDROPDOWN
// ============================================================================

interface DssBtnDropdownPreviewProps {
  variant: string;
  color: string | null;
  brand: string | null;
  size: string;
  split: boolean;
  rounded: boolean;
  square: boolean;
  dense: boolean;
  disable: boolean;
  loading: boolean;
}

function DssBtnDropdownPreview({
  variant,
  color,
  brand,
  size,
  split,
  rounded,
  square,
  dense,
  disable,
  loading,
}: DssBtnDropdownPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getBrandColor = () => {
    if (!brand) return null;
    if (brand === "hub") return DSS_BRAND_COLORS.hub.principal;
    if (brand === "water") return DSS_BRAND_COLORS.water.principal;
    if (brand === "waste") return DSS_BRAND_COLORS.waste.principal;
    return null;
  };

  const brandColor = getBrandColor();

  // Resolve effective color from color prop or default primary
  const baseColor = color || "#1f86de";
  const baseColorHover = color ? `color-mix(in srgb, ${color} 80%, black)` : "#0f5295";

  const sizeConfig = sizes.find((s) => s.name === size) || sizes[2];

  const getBorderRadius = () => {
    if (square) return "0";
    return rounded ? "9999px" : "4px";
  };

  const getButtonStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      fontWeight: 500,
      fontFamily: "system-ui, -apple-system, sans-serif",
      textTransform: "uppercase",
      letterSpacing: "0.089em",
      cursor: disable ? "not-allowed" : "pointer",
      minHeight: sizeConfig.height,
      borderRadius: split ? `${getBorderRadius()} 0 0 ${getBorderRadius()}` : getBorderRadius(),
      opacity: disable ? 0.5 : loading ? 0.7 : 1,
      position: "relative",
    };

    switch (variant) {
      case "flat":
        return {
          ...base,
          backgroundColor: isHovered && !disable ? `color-mix(in srgb, ${baseColor} 10%, transparent)` : "transparent",
          color: baseColor,
          border: "none",
          boxShadow: brandColor ? `inset 0 -3px 0 ${brandColor}` : "none",
        };
      case "outline":
        return {
          ...base,
          backgroundColor: isHovered && !disable ? `color-mix(in srgb, ${baseColor} 10%, transparent)` : "transparent",
          color: baseColor,
          border: `1px solid ${baseColor}`,
          boxShadow: brandColor ? `inset 0 -3px 0 ${brandColor}` : "none",
          borderRight: split ? "none" : undefined,
        };
      case "unelevated":
        return {
          ...base,
          backgroundColor: isHovered && !disable ? baseColorHover : baseColor,
          color: "#ffffff",
          border: "none",
          boxShadow: brandColor ? `inset 0 -3px 0 ${brandColor}` : "none",
        };
      default: // elevated
        return {
          ...base,
          backgroundColor: isHovered && !disable ? baseColorHover : baseColor,
          color: "#ffffff",
          border: "none",
          boxShadow: brandColor
            ? `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08), inset 0 -3px 0 ${brandColor}`
            : isHovered
              ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.12)"
              : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        };
    }
  };

  const getArrowStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: sizeConfig.padding.replace(/\d+px \d+px/, (m) => {
        const parts = m.split(" ");
        return `${parts[0]} 10px`;
      }),
      cursor: disable ? "not-allowed" : "pointer",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: sizeConfig.height,
      borderRadius: `0 ${getBorderRadius()} ${getBorderRadius()} 0`,
      opacity: disable ? 0.5 : 1,
    };

    const getSplitBorder = () => {
      switch (variant) {
        case "flat": return { borderLeft: "1px solid #d1d5db" };
        case "outline": return { border: `1px solid ${baseColor}`, borderLeft: `1px solid color-mix(in srgb, ${baseColor} 30%, transparent)` };
        case "unelevated": return { borderLeft: "1px solid rgba(255,255,255,0.2)" };
        default: return { borderLeft: "1px solid rgba(255,255,255,0.2)" };
      }
    };

    switch (variant) {
      case "flat":
        return { ...base, backgroundColor: "transparent", color: baseColor, border: "none", ...getSplitBorder() };
      case "outline":
        return { ...base, backgroundColor: "transparent", color: baseColor, ...getSplitBorder() };
      case "unelevated":
        return { ...base, backgroundColor: baseColor, color: "#ffffff", border: "none", ...getSplitBorder() };
      default:
        return { ...base, backgroundColor: baseColor, color: "#ffffff", border: "none", ...getSplitBorder() };
    }
  };

  const menuItems = ["Exportar PDF", "Exportar Excel", "Exportar CSV"];

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div style={{ display: "inline-flex", alignItems: "stretch" }}>
        <button
          style={getButtonStyle()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => !disable && !loading && (split ? null : setIsOpen(!isOpen))}
          disabled={disable}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {loading && (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
            </svg>
          )}
          <span>Exportar</span>
          {!split && (
            <ChevronDown
              style={{
                width: "16px",
                height: "16px",
                transition: "transform 0.2s",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          )}
        </button>

        {split && (
          <button
            style={getArrowStyle()}
            onClick={() => !disable && setIsOpen(!isOpen)}
            disabled={disable}
            aria-label="Abrir menu"
          >
            <ChevronDown
              style={{
                width: "16px",
                height: "16px",
                transition: "transform 0.2s",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: "160px",
            backgroundColor: "var(--jtech-card-bg, #fff)",
            border: "1px solid var(--jtech-card-border, #e5e7eb)",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 16px",
                textAlign: "left",
                fontSize: "14px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--jtech-text-body, #374151)",
                transition: "background-color 0.15s",
                borderBottom: i < menuItems.length - 1 ? "1px solid var(--jtech-card-border, #e5e7eb)" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(31,134,222,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssBtnDropdownPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("md");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    split: false,
    rounded: false,
    square: false,
    dense: false,
    disable: false,
    loading: false,
  });

  // Color Application Domain — mutual exclusivity
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    setSelectedColor(null);
  };

  // Effective color: brand > feedback/color > default
  const effectiveColor = selectedBrand
    ? DSS_BRAND_COLORS[selectedBrand as keyof typeof DSS_BRAND_COLORS]?.principal || null
    : selectedColor;

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const generateCode = () => {
    const props: string[] = [];
    props.push(`label="Exportar"`);
    if (selectedVariant !== "elevated") props.push(`variant="${selectedVariant}"`);
    if (selectedColor) props.push(`color="${selectedColor}"`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    if (selectedSize !== "md") props.push(`size="${selectedSize}"`);
    if (booleanStates.split) props.push("split");
    if (booleanStates.rounded) props.push("rounded");
    if (booleanStates.square) props.push("square");
    if (booleanStates.dense) props.push("dense");
    if (booleanStates.disable) props.push("disable");
    if (booleanStates.loading) props.push("loading");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";

    return `<DssBtnDropdown${propsStr}
>
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>Exportar PDF</q-item-section>
    </q-item>
    <q-item clickable v-close-popup>
      <q-item-section>Exportar Excel</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>`;
  };

  const shapeToggles = [
    { name: "rounded", label: "Rounded" },
    { name: "square", label: "Square" },
    { name: "dense", label: "Dense" },
  ];

  const behaviorToggles = [
    { name: "split", label: "Split" },
    { name: "disable", label: "Disable" },
    { name: "loading", label: "Loading" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO
       * ================================================================ */}
      <PageHeader
        icon={ChevronDown}
        badge="Golden Context: DssCard"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssBtnDropdown"
        subtitle="DssBtnDropdown é um componente composto Fase 2 que orquestra um botão de acionamento (trigger) e um menu contextual (dropdown). Envolve QBtnDropdown com governança DSS, mapeando a prop variant para props booleanas do Quasar internamente e aplicando tokens de superfície, elevação e brandabilidade ao painel teleportado."
        subtitleHighlights={["componente composto", "wrapper governado", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2.0", variant: "info" },
          { label: "Fase 2", variant: "success" },
          { label: "Selo DSS v2.2", variant: "success" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / QUANDO NÃO USAR
       * ================================================================ */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-lg border"
          style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", borderColor: "var(--dss-positive)" }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" />
            Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Botão com menu de opções contextuais (exportar, ações secundárias)",
              "Split button: ação principal + menu dropdown auxiliar",
              "Menu de ações com ícones e itens clicáveis",
              "Formulários com opções de envio múltiplas",
              "Toolbars com agrupamento de ações relacionadas",
              "Navegação contextual com lista de destinos",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="p-5 rounded-lg border"
          style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", borderColor: "var(--dss-negative)" }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <XCircle className="h-5 w-5" />
            Quando NÃO Usar
          </h4>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Cenário</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Alternativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { scenario: "Seleção de valor com v-model", alt: "DssSelect" },
                { scenario: "Toggle entre opções mutuamente exclusivas", alt: "DssBtnToggle" },
                { scenario: "Agrupamento visual de botões sem menu", alt: "DssBtnGroup" },
                { scenario: "Menu de navegação completo", alt: "DssMenu (futuro)" },
                { scenario: "Ação única sem opções adicionais", alt: "DssButton" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.scenario}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>
                    {row.alt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 3: ARQUITETURA — WRAPPER vs REBUILD
       * ================================================================ */}
      <div
        className="p-5 rounded-lg border"
        style={{ backgroundColor: "rgba(31, 134, 222, 0.08)", borderColor: "var(--dss-info)" }}
      >
        <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-info)" }}>
          <Info className="h-5 w-5" />
          Decisão Arquitetural: Wrapper (não Rebuild)
        </h4>
        <p className="text-sm mb-3" style={{ color: "var(--jtech-text-body)" }}>
          O DssBtnDropdown <strong>envolve QBtnDropdown</strong> do Quasar em vez de reconstruí-lo do zero.
          QBtnDropdown fornece posicionamento, acessibilidade WAI-ARIA, animações e keyboard navigation nativos.
          O DSS injeta tokens de superfície, elevação e brand via classes CSS e <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ backgroundColor: "var(--jtech-code-bg)" }}>popup-content-class</code>.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-medium" style={{ color: "var(--dss-info)" }}>Variant Mapping</span>
            <pre className="mt-1 p-3 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "var(--jtech-code-bg)", color: "var(--jtech-text-body)" }}>
{`variant="elevated" → (padrão Quasar)
variant="flat"     → flat: true
variant="outline"  → outline: true
variant="unelevated" → unelevated: true`}
            </pre>
          </div>
          <div>
            <span className="text-xs font-medium" style={{ color: "var(--dss-info)" }}>Painel Teleportado</span>
            <pre className="mt-1 p-3 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "var(--jtech-code-bg)", color: "var(--jtech-text-body)" }}>
{`<!-- O QMenu teleporta para o body -->
<!-- Seletores scoped NÃO funcionam -->
popup-content-class="dss-btn-dropdown__panel"
/* ↑ Mecanismo de escopo de estilos */`}
            </pre>
          </div>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 4: PLAYGROUND INTERATIVO
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o BtnDropdown"
        description="Explore TODAS as props visuais e comportamentais do DssBtnDropdown em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssBtnDropdownPreview
            variant={selectedVariant}
            color={effectiveColor}
            brand={selectedBrand}
            size={selectedSize}
            split={booleanStates.split}
            rounded={booleanStates.rounded}
            square={booleanStates.square}
            dense={booleanStates.dense}
            disable={booleanStates.disable}
            loading={booleanStates.loading}
          />
        }
        controls={
          <ControlGrid columns={5}>
            {/* Variant */}
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />

            {/* Size */}
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Color Domain — Semantic */}
            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            {/* Color Domain — Brand */}
            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            {/* Color Domain — Feedback */}
            <FeedbackColorPicker
              label="Feedback"
              colors={feedbackColors}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            {/* Shape */}
            <ToggleGroup
              label="Forma"
              options={shapeToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />

            {/* Behavior */}
            <ToggleGroup
              label="Comportamento"
              options={behaviorToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 5: ESTADOS
       * ================================================================ */}
      <SectionHeader title="Estados" titleAccent="do Componente" badge="Comportamento" />

      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "var(--jtech-card-border)" }}>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" style={{ color: "var(--dss-info)" }} />
            <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
              O DssBtnDropdown é um <strong>wrapper de QBtnDropdown</strong> — estados interativos (hover, focus, active) são 
              gerenciados pelo QBtnDropdown interno. O componente DSS gerencia estados de container: default, disabled, loading.
            </p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Responsável</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", description: "Estado padrão — dropdown fechado", responsible: "DssBtnDropdown (container)" },
              { state: "Hover", description: "Mudança visual ao passar o mouse", responsible: "QBtnDropdown interno" },
              { state: "Focus", description: "Focus ring com :focus-visible", responsible: "QBtnDropdown interno" },
              { state: "Active", description: "Feedback visual de pressão", responsible: "QBtnDropdown interno" },
              { state: "Disabled", description: "Opacidade reduzida, cursor not-allowed", responsible: "DssBtnDropdown (classe --disabled)" },
              { state: "Loading", description: "Spinner no trigger, bloqueio de interação", responsible: "DssBtnDropdown (classe --loading)" },
              { state: "Open", description: "Painel visível, seta rotacionada", responsible: "QBtnDropdown (aria-expanded)" },
              { state: "Touch Target", description: "Min 44x44px (WCAG 2.5.5)", responsible: "QBtnDropdown interno (Opção B)" },
              { state: "Keyboard Nav", description: "Enter/Space abre, Escape fecha, Arrows navegam", responsible: "QBtnDropdown interno" },
              { state: "Brand Accent", description: "Box-shadow inset na borda inferior", responsible: "DssBtnDropdown (L4 brands)" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.description}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.responsible}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================================================================
       * SEÇÃO 6: ANATOMIA 4 CAMADAS
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssBtnDropdown" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS
       * ================================================================ */}

      {/* 7.1 Props API */}
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

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Evento</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Payload</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { event: "click", payload: "MouseEvent", desc: "Emitido ao clicar no trigger; relevante em modo split." },
                  { event: "show", payload: "—", desc: "Emitido quando o dropdown abre." },
                  { event: "hide", payload: "—", desc: "Emitido quando o dropdown fecha." },
                  { event: "before-show", payload: "—", desc: "Emitido antes do dropdown abrir." },
                  { event: "before-hide", payload: "—", desc: "Emitido antes do dropdown fechar." },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.event}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.payload}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas (Quasar)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop Quasar</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Motivo do Bloqueio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { prop: "dark", reason: "DSS gerencia dark mode via [data-theme='dark'] global" },
                  { prop: "glossy", reason: "Não faz parte da linguagem visual DSS v2.2" },
                  { prop: "push", reason: "Estilo push (3D) não suportado para dropdowns" },
                  { prop: "no-caps", reason: "Casing gerenciado por tokens de tipografia DSS" },
                  { prop: "no-wrap", reason: "Controle de wrapping via CSS contextual" },
                  { prop: "ripple", reason: "Efeito ripple gerenciado globalmente pelo Quasar" },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-negative)" }}>{row.prop}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.2 Slots */}
      <CollapsibleSection icon={Code} title="Slots">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Conteúdo Típico</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { slot: "default", desc: "Conteúdo do painel dropdown", content: "QList com QItem elements" },
                { slot: "label", desc: "Conteúdo personalizado do trigger (substitui label + icon)", content: "HTML/componentes customizados" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.slot}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.desc}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>Slot default</span>
              <pre className="mt-1 p-3 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "var(--jtech-code-bg)", color: "var(--jtech-text-body)" }}>
{`<DssBtnDropdown label="Exportar">
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>PDF</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>`}
              </pre>
            </div>
            <div>
              <span className="text-xs font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>Slot label</span>
              <pre className="mt-1 p-3 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "var(--jtech-code-bg)", color: "var(--jtech-text-body)" }}>
{`<DssBtnDropdown>
  <template #label>
    <q-icon name="account_circle" />
    <span>Perfil</span>
    <q-badge color="positive" label="3" />
  </template>
  <!-- conteúdo do painel -->
</DssBtnDropdown>`}
              </pre>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens */}
      <CollapsibleSection icon={Code} title="Tokens" titleAccent="CSS">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Token</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Camada</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { token: "--dss-surface-default", layer: "L2", usage: "Background do painel dropdown" },
                { token: "--dss-elevation-2", layer: "L2", usage: "Sombra do painel dropdown" },
                { token: "--dss-radius-md", layer: "L2", usage: "Border-radius do painel" },
                { token: "--dss-border-width-thin", layer: "L2 + L3", usage: "Separadores em modo split e colapso de outline" },
                { token: "--dss-border-width-thick", layer: "L4", usage: "Acento de brand (inset box-shadow)" },
                { token: "--dss-border-width-md", layer: "L4", usage: "High contrast border do painel" },
                { token: "--dss-gray-200", layer: "L3", usage: "Separador split unelevated" },
                { token: "--dss-gray-300", layer: "L3", usage: "Separador split flat" },
                { token: "--dss-hub-600 / --dss-hub-400", layer: "L4", usage: "Brand Hub (claro/dark)" },
                { token: "--dss-water-500 / --dss-water-400", layer: "L4", usage: "Brand Water (claro/dark)" },
                { token: "--dss-waste-600 / --dss-waste-500", layer: "L4", usage: "Brand Waste (claro/dark)" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.token}</TableCell>
                  <TableCell className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>{row.layer}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.4 Classes CSS */}
      <CollapsibleSection icon={Code} title="Classes" titleAccent="CSS">
        <div className="pt-4 space-y-4">
          {[
            {
              title: "Classes de Variante",
              classes: [
                { cls: "dss-btn-dropdown", condition: "Sempre presente (container wrapper)" },
                { cls: "dss-btn-dropdown--flat", condition: 'variant="flat"' },
                { cls: "dss-btn-dropdown--outline", condition: 'variant="outline"' },
                { cls: "dss-btn-dropdown--unelevated", condition: 'variant="unelevated"' },
              ],
            },
            {
              title: "Classes de Forma e Estado",
              classes: [
                { cls: "dss-btn-dropdown--split", condition: "split === true" },
                { cls: "dss-btn-dropdown--square", condition: "square === true" },
                { cls: "dss-btn-dropdown--rounded", condition: "rounded === true" },
                { cls: "dss-btn-dropdown--dense", condition: "dense === true" },
                { cls: "dss-btn-dropdown--disabled", condition: "disable === true" },
                { cls: "dss-btn-dropdown--loading", condition: "loading === true" },
              ],
            },
            {
              title: "Classes de Brand",
              classes: [
                { cls: "dss-btn-dropdown--brand-hub", condition: "brand === 'hub'" },
                { cls: "dss-btn-dropdown--brand-water", condition: "brand === 'water'" },
                { cls: "dss-btn-dropdown--brand-waste", condition: "brand === 'waste'" },
              ],
            },
            {
              title: "Classes Internas",
              classes: [
                { cls: "dss-btn-dropdown__trigger", condition: "Sempre (no QBtnDropdown via class)" },
                { cls: "dss-btn-dropdown__panel", condition: "Sempre (painel teleportado via popup-content-class)" },
              ],
            },
          ].map((group, gi) => (
            <div key={gi}>
              <h4 className="font-medium mb-2 text-sm" style={{ color: "var(--jtech-heading-tertiary)" }}>{group.title}</h4>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Classe</TableHead>
                    <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Condição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.classes.map((row, i) => (
                    <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                      <TableCell className="font-mono font-medium text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.cls}</TableCell>
                      <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.condition}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 7.5 Acessibilidade WCAG */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                'aria-haspopup="true" gerenciado pelo QBtnDropdown',
                "aria-expanded refletindo estado aberto/fechado",
                "aria-label configurável via prop ariaLabel",
                "Enter/Space no trigger abre o dropdown",
                "Escape fecha o dropdown e retorna foco ao trigger",
                "ArrowDown/ArrowUp navegam itens do menu",
                "Touch target delegado ao QBtnDropdown (Opção B)",
                "Suporte a forced-colors: active [EXC-04]",
                "Suporte a prefers-contrast: more",
                "Print: painel oculto (display: none)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Atributos ARIA</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Atributo</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Condição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { attr: "role", value: '"button"', condition: "Gerenciado pelo QBtnDropdown" },
                  { attr: "aria-haspopup", value: '"true"', condition: "Sempre presente" },
                  { attr: "aria-expanded", value: '"true" / "false"', condition: "Reflete estado do dropdown" },
                  { attr: "aria-label", value: "valor da prop", condition: "Quando ariaLabel fornecida" },
                  { attr: "aria-disabled", value: '"true"', condition: 'Quando disable="true"' },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.attr}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.value}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.condition}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.6 Exceções Documentadas */}
      <CollapsibleSection icon={AlertTriangle} title="Exceções" titleAccent="Documentadas">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>ID</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Local</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "EXC-01", value: "border-radius: 0", local: "2-composition/_base.scss", reason: "Modo split — junção entre botão e seta. Valor semântico." },
                { id: "EXC-02", value: "border-radius: 0", local: "2-composition/_base.scss", reason: "Square variant — semanticamente 'sem radius'." },
                { id: "EXC-03", value: "rgba(255,255,255,0.12)", local: "4-output/_states.scss", reason: "Dark mode divider — sem token DSS equivalente. Padrão Material Design." },
                { id: "EXC-04", value: "1px solid ButtonBorder", local: "4-output/_states.scss", reason: "Forced-colors mode — system keywords obrigatórios." },
                { id: "EXC-05", value: "min-width: 160px", local: "2-composition/_base.scss", reason: "UX contextual — sem token de sizing genérico para painel flutuante." },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-warning)" }}>{row.id}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.value}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{row.local}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.7 Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Usar props bloqueadas do Quasar",
              wrong: `<DssBtnDropdown\n  label="Ações"\n  glossy\n  push\n  dark\n/>`,
              correct: `<DssBtnDropdown\n  label="Ações"\n  variant="elevated"\n/>`,
              reason: "Props glossy, push e dark são bloqueadas no DSS. Use variant para controlar o estilo visual.",
            },
            {
              title: "Estilizar o painel com :deep() ou scoped",
              wrong: `<style scoped>\n.dss-btn-dropdown .q-menu {\n  /* NÃO funciona — painel teleportado */\n}\n</style>`,
              correct: `<!-- Use popup-content-class -->\npopup-content-class="dss-btn-dropdown__panel"\n\n/* Estilo global (sem scoped) */\n.dss-btn-dropdown__panel {\n  background: var(--dss-surface-default);\n}`,
              reason: "O painel é teleportado para o body. Seletores scoped não alcançam elementos teleportados.",
            },
            {
              title: "Usar DssBtnDropdown para seleção com v-model",
              wrong: `<DssBtnDropdown label="Selecionar">\n  <q-item @click="value = 'a'">A</q-item>\n  <q-item @click="value = 'b'">B</q-item>\n</DssBtnDropdown>`,
              correct: `<DssSelect\n  v-model="value"\n  :options="['A', 'B']"\n/>`,
              reason: "DssBtnDropdown é para ações contextuais. Para seleção de valor, usar DssSelect.",
            },
          ].map((pattern, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border"
              style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
            >
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>{pattern.title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono overflow-x-auto" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.correct}
                  </pre>
                </div>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--jtech-text-muted)" }}>
                <strong>Por quê:</strong> {pattern.reason}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 7.8 Vinculantes DSS v2.2 */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.2">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssBtnDropdown</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Delegado ao QBtnDropdown — não gerenciado pelo wrapper DSS" },
                { rule: "Uso de brightness()", application: "Não utilizado — estados de hover/active delegados ao QBtnDropdown" },
                { rule: "Classificação do componente", application: "Wrapper Governado (Fase 2 — componente composto)" },
                { rule: "Variant Mapping", application: "prop variant mapeada para props booleanas Quasar via composable" },
                { rule: "Entry Point Wrapper", application: "DssBtnDropdown.vue → re-export puro de 1-structure/DssBtnDropdown.ts.vue" },
                { rule: "Scoped CSS", application: "Sem scoped — necessário para popup-content-class e painel teleportado" },
                { rule: "Painel teleportado", application: "popup-content-class='dss-btn-dropdown__panel' para escopo de estilos" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.rule}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.application}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.9 Referências Normativas */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "DSSBTNDROPDOWN_API.md",
              "components/base/DssBtnDropdown/types/btn-dropdown.types.ts",
              "components/base/DssBtnDropdown/composables/useBtnDropdownClasses.ts",
              "docs/governance/pre-prompts/pre_prompt_dss_btn_dropdown.md",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <span className="font-mono text-xs">{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
