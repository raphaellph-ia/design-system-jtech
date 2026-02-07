/**
 * ==========================================================================
 * DssTogglePage - Documentação do Componente DssToggle
 * ==========================================================================
 *
 * Página de documentação seguindo o padrão Golden Sample V2.2
 * DssToggle é um Compact Control (interativo) do Design System Sansys
 *
 * Template: 13.1 (13 seções padronizadas)
 * Selo: DSS v2.2 - Aprovado em 07/02/2026
 * Golden Component de Referência: DssCheckbox
 */

import React, { useState } from "react";
import {
  DssPlayground,
  ControlSection,
  SizeSelector,
  ToggleGroup,
  ColorPicker,
  BrandPicker,
  type SemanticColor,
  type BrandColor,
  type Size,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground/DssPlayground";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Info,
} from "lucide-react";

// ==========================================================================
// TIPOS E CONSTANTES
// ==========================================================================

interface DssToggleState {
  size: Size;
  color: SemanticColor | null;
  brand: BrandColor | null;
  checked: boolean;
  disabled: boolean;
  dense: boolean;
  leftLabel: boolean;
  label: string;
  error: boolean;
  errorMessage: string;
}

// ==========================================================================
// COMPONENTE DE PREVIEW
// ==========================================================================

interface DssTogglePreviewProps extends DssToggleState {
  isDarkMode: boolean;
}

function DssTogglePreview({
  size,
  color,
  brand,
  checked,
  disabled,
  dense,
  leftLabel,
  label,
  error,
  errorMessage,
  isDarkMode,
}: DssTogglePreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // Resolução de cor (brand tem prioridade, error sobrescreve)
  const resolvedColor = error
    ? "var(--dss-negative)"
    : brand
    ? `var(--dss-${brand}-primary)`
    : color
    ? `var(--dss-${color})`
    : "var(--dss-primary)";

  // Tamanhos do toggle
  const sizeMap: Record<Size, { trackW: number; trackH: number; thumbSize: number; gap: string; fontSize: string }> = {
    xs: { trackW: 28, trackH: 16, thumbSize: 12, gap: "6px", fontSize: "var(--dss-font-size-xs)" },
    sm: { trackW: 36, trackH: 20, thumbSize: 16, gap: "8px", fontSize: "var(--dss-font-size-sm)" },
    md: { trackW: 44, trackH: 24, thumbSize: 20, gap: "10px", fontSize: "var(--dss-font-size-sm)" },
    lg: { trackW: 52, trackH: 28, thumbSize: 24, gap: "12px", fontSize: "var(--dss-font-size-md)" },
  };

  const sizeStyles = sizeMap[size];

  const getContainerStyles = (): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "flex-start",
    gap: dense ? "4px" : sizeStyles.gap,
    flexDirection: leftLabel ? "row-reverse" : "row",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    fontFamily: "var(--dss-font-family-sans)",
    fontSize: sizeStyles.fontSize,
    color: error 
      ? "var(--dss-negative)" 
      : isDarkMode ? "var(--dss-text-primary-dark)" : "var(--dss-text-primary)",
    userSelect: "none",
    position: "relative",
  });

  const getTrackStyles = (): React.CSSProperties => {
    let filter = "none";
    if (!disabled) {
      if (isActive && isChecked) {
        filter = isDarkMode ? "brightness(1.2)" : "brightness(0.90)";
      } else if (isHovered && isChecked) {
        filter = isDarkMode ? "brightness(1.1)" : "brightness(0.95)";
      }
    }

    return {
      position: "relative",
      width: sizeStyles.trackW,
      height: sizeStyles.trackH,
      borderRadius: sizeStyles.trackH / 2,
      backgroundColor: isChecked 
        ? resolvedColor 
        : isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
      transition: "all var(--dss-duration-200) var(--dss-easing-standard)",
      flexShrink: 0,
      filter,
    };
  };

  const getThumbStyles = (): React.CSSProperties => {
    const padding = 2;
    const translateX = isChecked 
      ? sizeStyles.trackW - sizeStyles.thumbSize - padding 
      : padding;

    return {
      position: "absolute",
      top: "50%",
      left: 0,
      transform: `translate(${translateX}px, -50%)`,
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: "50%",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: "transform var(--dss-duration-200) var(--dss-easing-standard)",
    };
  };

  const handleClick = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div
        style={getContainerStyles()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        aria-invalid={error || undefined}
        tabIndex={disabled ? -1 : 0}
      >
        {/* Toggle Track */}
        <div style={getTrackStyles()}>
          {/* Touch Target (::before equivalent) */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
            }}
            aria-hidden="true"
          />
          
          {/* Thumb */}
          <div style={getThumbStyles()} aria-hidden="true" />
        </div>

        {/* Label */}
        {label && <span>{label}</span>}

        {/* Hidden native input for accessibility */}
        <input
          type="checkbox"
          role="switch"
          checked={isChecked}
          disabled={disabled}
          onChange={() => {}}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Error message */}
      {error && errorMessage && (
        <span 
          style={{ 
            fontSize: "var(--dss-font-size-xs)", 
            color: "var(--dss-negative)",
            marginLeft: leftLabel ? 0 : `calc(${sizeStyles.trackW}px + ${sizeStyles.gap})`,
          }}
          role="alert"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

// ==========================================================================
// GERADOR DE CÓDIGO
// ==========================================================================

function generateToggleCode(state: DssToggleState): string {
  const props: string[] = [];

  if (state.size !== "md") props.push(`size="${state.size}"`);
  if (state.brand) props.push(`brand="${state.brand}"`);
  else if (state.color && state.color !== "primary") props.push(`color="${state.color}"`);
  if (state.checked) props.push("v-model=\"enabled\"");
  if (state.disabled) props.push("disable");
  if (state.dense) props.push("dense");
  if (state.leftLabel) props.push("left-label");
  if (state.label) props.push(`label="${state.label}"`);
  if (state.error) props.push("error");
  if (state.errorMessage) props.push(`error-message="${state.errorMessage}"`);

  if (props.length <= 3) {
    return `<DssToggle ${props.join(" ")} />`;
  }

  return `<DssToggle\n  ${props.join("\n  ")}\n/>`;
}

// ==========================================================================
// PÁGINA PRINCIPAL
// ==========================================================================

export default function DssTogglePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, setState] = useState<DssToggleState>({
    size: "md",
    color: "primary",
    brand: null,
    checked: false,
    disabled: false,
    dense: false,
    leftLabel: false,
    label: "Ativar notificações",
    error: false,
    errorMessage: "",
  });

  const handleChange = <K extends keyof DssToggleState>(key: K, value: DssToggleState[K]) => {
    setState((prev) => {
      // Exclusividade mútua: brand limpa color e vice-versa
      if (key === "brand" && value) {
        return { ...prev, [key]: value, color: null };
      }
      if (key === "color" && value) {
        return { ...prev, [key]: value, brand: null };
      }
      // Error toggle: adiciona mensagem padrão
      if (key === "error" && value) {
        return { ...prev, [key]: value, errorMessage: prev.errorMessage || "Este campo é obrigatório" };
      }
      if (key === "error" && !value) {
        return { ...prev, [key]: value, errorMessage: "" };
      }
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
          SEÇÃO 1: BADGES DE METADADOS
          ================================================================ */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge
          variant="outline"
          className="bg-green-500/10 text-green-600 border-green-500/30"
        >
          ✓ Selo de Conformidade DSS v2.2
        </Badge>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
          DSS v2.2
        </Badge>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30">
          Compact Control
        </Badge>
        <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
          WCAG 2.1 AA
        </Badge>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
          Ref: DssCheckbox
        </Badge>
      </div>

      {/* ================================================================
          SEÇÃO 2: TÍTULO E DESCRIÇÃO
          ================================================================ */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--jtech-heading-primary)" }}
        >
          DssToggle
        </h1>
        <p
          className="text-lg max-w-3xl"
          style={{ color: "var(--jtech-text-body)" }}
        >
          Componente de toggle/switch moderno com suporte a estado de erro,
          acessibilidade WCAG 2.1 AA (role="switch"), brandabilidade multi-marca (Hub/Water/Waste)
          e touch target de 48px. <strong>Compact Control interativo</strong> do Design System Sansys.
        </p>
      </div>

      {/* ================================================================
          SEÇÃO 3: QUICK STATS
          ================================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="text-2xl font-bold" style={{ color: "var(--dss-jtech-accent)" }}>
            4
          </div>
          <div className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
            Tamanhos
          </div>
        </div>
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="text-2xl font-bold" style={{ color: "var(--dss-jtech-accent)" }}>
            8
          </div>
          <div className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
            Cores Semânticas
          </div>
        </div>
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="text-2xl font-bold" style={{ color: "var(--dss-jtech-accent)" }}>
            3
          </div>
          <div className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
            Brands
          </div>
        </div>
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="text-2xl font-bold" style={{ color: "var(--dss-jtech-accent)" }}>
            3
          </div>
          <div className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
            Estados (checked, disabled, error)
          </div>
        </div>
      </div>

      {/* ================================================================
          SEÇÃO 4: QUANDO USAR / QUANDO NÃO USAR
          ================================================================ */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-lg border-l-4"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderLeftColor: "var(--dss-positive)",
          }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <Check size={18} /> Quando Usar
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            <li>• Configurações on/off com efeito imediato</li>
            <li>• Preferências de usuário (notificações, modo escuro)</li>
            <li>• Features toggles em painéis de admin</li>
            <li>• Ativar/desativar funcionalidades</li>
            <li>• Controles de privacidade e permissões</li>
            <li>• Estados binários sem necessidade de submit</li>
          </ul>
        </div>

        <div
          className="p-5 rounded-lg border-l-4"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderLeftColor: "var(--dss-negative)",
          }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <X size={18} /> Quando NÃO Usar
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            <li>• Seleção múltipla em listas → use <code>DssCheckbox</code></li>
            <li>• Seleção única exclusiva → use <code>DssRadio</code></li>
            <li>• Aceite de termos (requer submit) → use <code>DssCheckbox</code></li>
            <li>• Ações com feedback visual → use <code>DssButton</code></li>
            <li>• Estado intermediário/indeterminate → use <code>DssCheckbox</code></li>
          </ul>
        </div>
      </div>

      {/* ================================================================
          SEÇÃO 5: ANTI-PATTERNS
          ================================================================ */}
      <div
        className="p-5 rounded-lg border"
        style={{
          backgroundColor: "var(--jtech-card-bg)",
          borderColor: "var(--dss-warning)",
        }}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-warning)" }}>
          <AlertCircle size={18} /> Anti-patterns
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ color: "var(--jtech-text-body)" }}>
          <div>
            <strong className="text-red-500">❌ Evite:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Toggle sem label ou aria-label</li>
              <li>• Usar toggle para seleção múltipla</li>
              <li>• Misturar brand e color na mesma interface</li>
              <li>• Toggle com ação que requer confirmação</li>
              <li>• Toggle para valores não-binários</li>
            </ul>
          </div>
          <div>
            <strong className="text-green-500">✓ Prefira:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Label sempre visível e descritivo</li>
              <li>• Feedback visual imediato ao alternar</li>
              <li>• Usar error state para validação</li>
              <li>• Touch target mínimo de 48px (automático via DSS)</li>
              <li>• Agrupar toggles relacionados visualmente</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================================================================
          SEÇÃO 6: PLAYGROUND INTERATIVO
          ================================================================ */}
      <DssPlayground
        title="Configure o DssToggle"
        description="Ajuste as propriedades e veja o resultado em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewContent={<DssTogglePreview {...state} isDarkMode={isDarkMode} />}
        codePreview={generateToggleCode(state)}
        controls={
          <div className="space-y-5">
            <SizeSelector
              label="Tamanho"
              sizes={[
                { name: "xs", label: "XS" },
                { name: "sm", label: "SM" },
                { name: "md", label: "MD", isDefault: true },
                { name: "lg", label: "LG" },
              ]}
              selectedSize={state.size}
              onSelect={(size) => handleChange("size", size as Size)}
            />

            <ColorPicker
              label="Cor Semântica"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={state.color}
              onSelect={(color) => handleChange("color", color)}
              disabled={!!state.brand}
            />

            <BrandPicker
              label="Brand (Sansys)"
              brands={DSS_BRAND_COLORS}
              selectedBrand={state.brand}
              onSelect={(brand) => handleChange("brand", brand)}
            />

            <ToggleGroup
              label="Estados"
              options={[
                { name: "checked", label: "Checked" },
                { name: "disabled", label: "Disabled" },
                { name: "error", label: "Error" },
                { name: "dense", label: "Dense" },
                { name: "leftLabel", label: "Label à esquerda" },
              ]}
              values={{
                checked: state.checked,
                disabled: state.disabled,
                error: state.error,
                dense: state.dense,
                leftLabel: state.leftLabel,
              }}
              onToggle={(name) => {
                if (name === "checked") handleChange("checked", !state.checked);
                if (name === "disabled") handleChange("disabled", !state.disabled);
                if (name === "error") handleChange("error", !state.error);
                if (name === "dense") handleChange("dense", !state.dense);
                if (name === "leftLabel") handleChange("leftLabel", !state.leftLabel);
              }}
            />

            <ControlSection label="Texto do label">
              <div className="w-full">
                <input
                  type="text"
                  value={state.label}
                  onChange={(e) => handleChange("label", e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded border"
                  style={{
                    backgroundColor: "var(--jtech-card-bg)",
                    borderColor: "var(--jtech-card-border)",
                    color: "var(--jtech-text-body)",
                  }}
                />
              </div>
            </ControlSection>
          </div>
        }
      />

      {/* ================================================================
          SEÇÃO 7: ANATOMIA DE 4 CAMADAS
          ================================================================ */}
      <AnatomySection
        componentName="DssToggle"
        layers={{
          structure: {
            files: ["components/base/DssToggle/1-structure/DssToggle.ts.vue"],
            description:
              "Template base do toggle com input nativo, track e thumb. Define a estrutura semântica com role='switch' e acessibilidade.",
            responsibilities: [
              "Input nativo oculto para acessibilidade e submit de formulários",
              "Track (trilha) e thumb (knob) com estrutura BEM",
              "Label via prop ou slot, com suporte a leftLabel",
              "ARIA: role='switch', aria-checked, aria-describedby para erro",
            ],
            codeExample: `<DssToggle v-model="enabled" label="Ativar notificações" />`,
          },
          composition: {
            files: ["components/base/DssToggle/composables/useToggleClasses.ts"],
            description:
              "Composables e computeds que gerenciam estados, classes e acessibilidade.",
            responsibilities: [
              "useToggleClasses: classes do root + cor do track",
              "isChecked: suporta boolean e array mode",
              "computedTabindex: foco consistente e previsível",
              "errorDescribedBy: ligação entre input e mensagem de erro",
            ],
          },
          variants: {
            files: ["components/base/DssToggle/DssToggle.vue"],
            description:
              "Variações visuais por tamanho, cor/brand e estados (checked/disabled/error/dense).",
            responsibilities: [
              "Tamanhos: xs, sm, md, lg",
              "Cores semânticas no track quando checked (sem brand)",
              "Brand via data-brand + classe dss-toggle--{color}",
              "Estados: checked, disabled, error, dense, left-label",
            ],
          },
          output: {
            files: ["components/base/DssToggle/DssToggle.vue"],
            description:
              "Componente final exportado com tipagem TypeScript e API pública (focus/blur).",
            responsibilities: [
              "Props tipadas via ToggleProps + defaults",
              "Emits: update:modelValue",
              "Expose: focus(), blur()",
              "Slots: default (label customizado)",
            ],
          },
        }}
      />

      {/* ================================================================
          SEÇÃO 8-13: DOCUMENTAÇÃO TÉCNICA COLAPSÁVEL
          ================================================================ */}
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-opacity-50 transition-colors group"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <Info size={18} style={{ color: "var(--dss-jtech-accent)" }} />
            <span className="font-semibold" style={{ color: "var(--jtech-heading-secondary)" }}>
              Documentação Técnica
            </span>
          </div>
          <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" style={{ color: "var(--jtech-text-body)" }} />
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-6">
          <Tabs defaultValue="props" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="props">Props</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="slots">Slots</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="a11y">Acessibilidade</TabsTrigger>
            </TabsList>

            {/* Props Tab */}
            <TabsContent value="props">
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--jtech-card-border)" }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--jtech-card-bg)" }}>
                      <TableHead>Prop</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-sm">modelValue</TableCell>
                      <TableCell className="font-mono text-xs">boolean | any[]</TableCell>
                      <TableCell className="font-mono text-xs">false</TableCell>
                      <TableCell>Valor reativo (v-model). Boolean para toggle simples, array para grupo.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">trueValue</TableCell>
                      <TableCell className="font-mono text-xs">any</TableCell>
                      <TableCell className="font-mono text-xs">true</TableCell>
                      <TableCell>Valor emitido quando toggle está ativo (on).</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">falseValue</TableCell>
                      <TableCell className="font-mono text-xs">any</TableCell>
                      <TableCell className="font-mono text-xs">false</TableCell>
                      <TableCell>Valor emitido quando toggle está inativo (off).</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">val</TableCell>
                      <TableCell className="font-mono text-xs">any</TableCell>
                      <TableCell className="font-mono text-xs">—</TableCell>
                      <TableCell>Valor para array mode (grupo de toggles).</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">label</TableCell>
                      <TableCell className="font-mono text-xs">string</TableCell>
                      <TableCell className="font-mono text-xs">''</TableCell>
                      <TableCell>Texto do label. Alternativa ao slot default.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">leftLabel</TableCell>
                      <TableCell className="font-mono text-xs">boolean</TableCell>
                      <TableCell className="font-mono text-xs">false</TableCell>
                      <TableCell>Posiciona label à esquerda do toggle.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">color</TableCell>
                      <TableCell className="font-mono text-xs">string</TableCell>
                      <TableCell className="font-mono text-xs">'primary'</TableCell>
                      <TableCell>Cor quando ativo. Com brand: tokens semânticos.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">size</TableCell>
                      <TableCell className="font-mono text-xs">'xs' | 'sm' | 'md' | 'lg'</TableCell>
                      <TableCell className="font-mono text-xs">'md'</TableCell>
                      <TableCell>Tamanho do toggle.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">disable</TableCell>
                      <TableCell className="font-mono text-xs">boolean</TableCell>
                      <TableCell className="font-mono text-xs">false</TableCell>
                      <TableCell>Desabilita o toggle.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">dense</TableCell>
                      <TableCell className="font-mono text-xs">boolean</TableCell>
                      <TableCell className="font-mono text-xs">false</TableCell>
                      <TableCell>Modo denso. Reduz gap e remove touch target.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">error</TableCell>
                      <TableCell className="font-mono text-xs">boolean</TableCell>
                      <TableCell className="font-mono text-xs">false</TableCell>
                      <TableCell>Estado de erro. Aplica cor de erro.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">errorMessage</TableCell>
                      <TableCell className="font-mono text-xs">string</TableCell>
                      <TableCell className="font-mono text-xs">''</TableCell>
                      <TableCell>Mensagem de erro exibida quando error=true.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">brand</TableCell>
                      <TableCell className="font-mono text-xs">'hub' | 'water' | 'waste' | null</TableCell>
                      <TableCell className="font-mono text-xs">null</TableCell>
                      <TableCell>Marca do produto. Ativa tokens de brand.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">tabindex</TableCell>
                      <TableCell className="font-mono text-xs">number | string | null</TableCell>
                      <TableCell className="font-mono text-xs">null</TableCell>
                      <TableCell>Tabindex customizado para o input nativo.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">ariaLabel</TableCell>
                      <TableCell className="font-mono text-xs">string</TableCell>
                      <TableCell className="font-mono text-xs">—</TableCell>
                      <TableCell>Label de acessibilidade para screen readers.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--jtech-card-border)" }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--jtech-card-bg)" }}>
                      <TableHead>Evento</TableHead>
                      <TableHead>Payload</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-sm">update:modelValue</TableCell>
                      <TableCell className="font-mono text-xs">boolean | any[]</TableCell>
                      <TableCell>Emitido quando o valor do toggle muda.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Slots Tab */}
            <TabsContent value="slots">
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--jtech-card-border)" }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--jtech-card-bg)" }}>
                      <TableHead>Slot</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-sm">default</TableCell>
                      <TableCell>Conteúdo customizado do label. Sobrescreve prop label.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tokens Tab */}
            <TabsContent value="tokens">
              <div className="space-y-4">
                <div className="rounded-lg border p-4" style={{ borderColor: "var(--jtech-card-border)", backgroundColor: "var(--jtech-card-bg)" }}>
                  <h4 className="font-semibold mb-3" style={{ color: "var(--jtech-heading-secondary)" }}>
                    Tokens de Sizing
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <code className="p-2 rounded bg-black/10">--dss-compact-control-height-xs</code>
                    <code className="p-2 rounded bg-black/10">--dss-compact-control-height-sm</code>
                    <code className="p-2 rounded bg-black/10">--dss-compact-control-height-md</code>
                    <code className="p-2 rounded bg-black/10">--dss-compact-control-height-lg</code>
                  </div>
                </div>

                <div className="rounded-lg border p-4" style={{ borderColor: "var(--jtech-card-border)", backgroundColor: "var(--jtech-card-bg)" }}>
                  <h4 className="font-semibold mb-3" style={{ color: "var(--jtech-heading-secondary)" }}>
                    Tokens de Cor
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <code className="p-2 rounded bg-black/10">--dss-primary</code>
                    <code className="p-2 rounded bg-black/10">--dss-secondary</code>
                    <code className="p-2 rounded bg-black/10">--dss-positive</code>
                    <code className="p-2 rounded bg-black/10">--dss-negative</code>
                    <code className="p-2 rounded bg-black/10">--dss-warning</code>
                    <code className="p-2 rounded bg-black/10">--dss-info</code>
                  </div>
                </div>

                <div className="rounded-lg border p-4" style={{ borderColor: "var(--jtech-card-border)", backgroundColor: "var(--jtech-card-bg)" }}>
                  <h4 className="font-semibold mb-3" style={{ color: "var(--jtech-heading-secondary)" }}>
                    Tokens de Brand
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <code className="p-2 rounded bg-black/10">--dss-hub-primary</code>
                    <code className="p-2 rounded bg-black/10">--dss-water-primary</code>
                    <code className="p-2 rounded bg-black/10">--dss-waste-primary</code>
                  </div>
                </div>

                <div className="rounded-lg border p-4" style={{ borderColor: "var(--jtech-card-border)", backgroundColor: "var(--jtech-card-bg)" }}>
                  <h4 className="font-semibold mb-3" style={{ color: "var(--jtech-heading-secondary)" }}>
                    Tokens de Motion
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <code className="p-2 rounded bg-black/10">--dss-duration-200</code>
                    <code className="p-2 rounded bg-black/10">--dss-easing-standard</code>
                  </div>
                </div>

                <div className="rounded-lg border p-4" style={{ borderColor: "var(--jtech-card-border)", backgroundColor: "var(--jtech-card-bg)" }}>
                  <h4 className="font-semibold mb-3" style={{ color: "var(--jtech-heading-secondary)" }}>
                    Tokens de Estados
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <code className="p-2 rounded bg-black/10">--dss-opacity-disabled</code>
                    <code className="p-2 rounded bg-black/10">--dss-focus-ring</code>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Accessibility Tab */}
            <TabsContent value="a11y">
              <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--jtech-card-border)" }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--jtech-card-bg)" }}>
                      <TableHead>Critério WCAG</TableHead>
                      <TableHead>Nível</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Implementação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1.4.3 Contraste (Mínimo)</TableCell>
                      <TableCell>AA</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-600">✓ Conforme</Badge>
                      </TableCell>
                      <TableCell>Cores seguem tokens com ratio ≥4.5:1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2.1.1 Teclado</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-600">✓ Conforme</Badge>
                      </TableCell>
                      <TableCell>Space/Enter ativam o toggle, Tab navega</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2.4.7 Foco Visível</TableCell>
                      <TableCell>AA</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-600">✓ Conforme</Badge>
                      </TableCell>
                      <TableCell>Focus ring via --dss-focus-ring</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2.5.5 Tamanho do Alvo</TableCell>
                      <TableCell>AAA</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-600">✓ Conforme</Badge>
                      </TableCell>
                      <TableCell>Touch target de 48px via ::before</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4.1.2 Nome, Função, Valor</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-600">✓ Conforme</Badge>
                      </TableCell>
                      <TableCell>role="switch", aria-checked, aria-disabled</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3.3.1 Identificação de Erro</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-600">✓ Conforme</Badge>
                      </TableCell>
                      <TableCell>aria-invalid, aria-describedby para erros</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: "var(--dss-info)", backgroundColor: "var(--jtech-card-bg)" }}>
                <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: "var(--dss-info)" }}>
                  <Info size={16} /> Diferença do DssCheckbox
                </h4>
                <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
                  O DssToggle usa <code>role="switch"</code> (WAI-ARIA switch pattern) ao invés de 
                  <code>role="checkbox"</code>. Isso indica semanticamente que a ação tem efeito imediato,
                  não requerendo submit. Toggle é binário puro (não suporta indeterminate).
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
