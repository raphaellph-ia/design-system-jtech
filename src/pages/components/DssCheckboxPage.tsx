/**
 * ==========================================================================
 * DssCheckboxPage - Documentação do Componente DssCheckbox
 * ==========================================================================
 *
 * Página de documentação seguindo o padrão Golden Sample V2.2
 * DssCheckbox é um Compact Control (interativo) do Design System Sansys
 *
 * Template: 13.1 (13 seções padronizadas)
 * Selo: DSS v2.2 - Aprovado em 01/02/2026
 * Golden Component de Referência: DssChip
 */

import React, { useState } from "react";
import {
  DssPlayground,
  ControlSection,
  ControlGrid,
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
  Minus,
  AlertCircle,
  Info,
} from "lucide-react";

// ==========================================================================
// TIPOS E CONSTANTES
// ==========================================================================

interface DssCheckboxState {
  size: Size;
  color: SemanticColor | null;
  brand: BrandColor | null;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  dense: boolean;
  leftLabel: boolean;
  label: string;
}

// ==========================================================================
// COMPONENTE DE PREVIEW
// ==========================================================================

interface DssCheckboxPreviewProps extends DssCheckboxState {
  isDarkMode: boolean;
}

function DssCheckboxPreview({
  size,
  color,
  brand,
  checked,
  indeterminate,
  disabled,
  dense,
  leftLabel,
  label,
  isDarkMode,
}: DssCheckboxPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);
  const [isIndeterminate, setIsIndeterminate] = useState(indeterminate);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  React.useEffect(() => {
    setIsIndeterminate(indeterminate);
  }, [indeterminate]);

  // Resolução de cor (brand tem prioridade)
  const resolvedColor = brand
    ? `var(--dss-${brand}-primary)`
    : color
    ? `var(--dss-${color})`
    : "var(--dss-primary)";

  // Tamanhos do checkbox
  const sizeMap: Record<Size, { box: number; icon: number; gap: string; fontSize: string }> = {
    xs: { box: 14, icon: 10, gap: "6px", fontSize: "var(--dss-font-size-xs)" },
    sm: { box: 16, icon: 12, gap: "8px", fontSize: "var(--dss-font-size-sm)" },
    md: { box: 20, icon: 14, gap: "10px", fontSize: "var(--dss-font-size-sm)" },
    lg: { box: 24, icon: 18, gap: "12px", fontSize: "var(--dss-font-size-md)" },
  };

  const sizeStyles = sizeMap[size];

  const getContainerStyles = (): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: dense ? "4px" : sizeStyles.gap,
    flexDirection: leftLabel ? "row-reverse" : "row",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    fontFamily: "var(--dss-font-family-sans)",
    fontSize: sizeStyles.fontSize,
    color: isDarkMode ? "var(--dss-text-primary-dark)" : "var(--dss-text-primary)",
    userSelect: "none",
    position: "relative",
  });

  const getBoxStyles = (): React.CSSProperties => {
    const isActive_ = isChecked || isIndeterminate;
    
    let filter = "none";
    if (!disabled) {
      if (isActive && isActive_) {
        filter = isDarkMode ? "brightness(1.2)" : "brightness(0.90)";
      } else if (isHovered && isActive_) {
        filter = isDarkMode ? "brightness(1.1)" : "brightness(0.95)";
      }
    }

    return {
      position: "relative",
      width: sizeStyles.box,
      height: sizeStyles.box,
      borderRadius: "var(--dss-radius-sm)",
      border: isActive_ ? "none" : `2px solid ${isHovered && !disabled ? resolvedColor : "var(--dss-border-default)"}`,
      backgroundColor: isActive_ ? resolvedColor : "transparent",
      transition: "all var(--dss-duration-200) var(--dss-easing-standard)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      filter,
    };
  };

  const handleClick = () => {
    if (disabled) return;
    if (isIndeterminate) {
      setIsIndeterminate(false);
      setIsChecked(true);
    } else {
      setIsChecked(!isChecked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
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
      role="checkbox"
      aria-checked={isIndeterminate ? "mixed" : isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Checkbox Box */}
      <div style={getBoxStyles()}>
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
        
        {/* Check/Indeterminate Icon */}
        {(isChecked || isIndeterminate) && (
          <div style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isIndeterminate ? (
              <Minus size={sizeStyles.icon} strokeWidth={3} aria-hidden="true" />
            ) : (
              <Check size={sizeStyles.icon} strokeWidth={3} aria-hidden="true" />
            )}
          </div>
        )}
      </div>

      {/* Label */}
      {label && <span>{label}</span>}

      {/* Hidden native input for accessibility */}
      <input
        type="checkbox"
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
  );
}

// ==========================================================================
// GERADOR DE CÓDIGO
// ==========================================================================

function generateCheckboxCode(state: DssCheckboxState): string {
  const props: string[] = [];

  if (state.size !== "md") props.push(`size="${state.size}"`);
  if (state.brand) props.push(`brand="${state.brand}"`);
  else if (state.color && state.color !== "primary") props.push(`color="${state.color}"`);
  if (state.checked) props.push("v-model=\"checked\"");
  if (state.indeterminate) props.push("indeterminate");
  if (state.disabled) props.push("disable");
  if (state.dense) props.push("dense");
  if (state.leftLabel) props.push("left-label");
  if (state.label) props.push(`label="${state.label}"`);

  if (props.length <= 3) {
    return `<DssCheckbox ${props.join(" ")} />`;
  }

  return `<DssCheckbox\n  ${props.join("\n  ")}\n/>`;
}

// ==========================================================================
// PÁGINA PRINCIPAL
// ==========================================================================

export default function DssCheckboxPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, setState] = useState<DssCheckboxState>({
    size: "md",
    color: "primary",
    brand: null,
    checked: false,
    indeterminate: false,
    disabled: false,
    dense: false,
    leftLabel: false,
    label: "Aceito os termos",
  });

  const handleChange = <K extends keyof DssCheckboxState>(key: K, value: DssCheckboxState[K]) => {
    setState((prev) => {
      // Exclusividade mútua: brand limpa color e vice-versa
      if (key === "brand" && value) {
        return { ...prev, [key]: value, color: null };
      }
      if (key === "color" && value) {
        return { ...prev, [key]: value, brand: null };
      }
      // Exclusividade: indeterminate desativa checked
      if (key === "indeterminate" && value) {
        return { ...prev, [key]: value, checked: false };
      }
      if (key === "checked" && value) {
        return { ...prev, [key]: value, indeterminate: false };
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
          Ref: DssChip
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
          DssCheckbox
        </h1>
        <p
          className="text-lg max-w-3xl"
          style={{ color: "var(--jtech-text-body)" }}
        >
          Componente de checkbox compacto com suporte a estado indeterminate,
          acessibilidade WCAG 2.1 AA, brandabilidade multi-marca (Hub/Water/Waste)
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
            Estados (checked, indeterminate, disabled)
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
            <li>• Seleção múltipla em listas (todos podem ser marcados)</li>
            <li>• Termos de aceite e consentimento</li>
            <li>• Preferências de configuração (on/off)</li>
            <li>• Filtros opcionais em formulários</li>
            <li>• Estado "Selecionar todos" com indeterminate</li>
            <li>• Listas de tarefas (todo lists)</li>
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
            <li>• Seleção única exclusiva → use <code>DssRadio</code></li>
            <li>• Toggle instantâneo → use <code>DssSwitch</code></li>
            <li>• Ações com feedback visual → use <code>DssButton</code></li>
            <li>• Seleção de valores → use <code>DssSelect</code></li>
            <li>• Filtros tipo tag → use <code>DssChip</code></li>
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
              <li>• Checkbox sem label ou aria-label</li>
              <li>• Usar checkbox para ações imediatas (sem submit)</li>
              <li>• Misturar brand e color na mesma interface</li>
              <li>• Checkbox com label muito longo (&gt;50 caracteres)</li>
            </ul>
          </div>
          <div>
            <strong className="text-green-500">✓ Prefira:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Label sempre visível e descritivo</li>
              <li>• Agrupar checkboxes relacionados visualmente</li>
              <li>• Usar indeterminate para "Selecionar todos" parcial</li>
              <li>• Touch target mínimo de 48px (automático via DSS)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================================================================
          SEÇÃO 6: PLAYGROUND INTERATIVO
          ================================================================ */}
      <DssPlayground
        title="Configure o DssCheckbox"
        description="Selecione as props e veja o resultado em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewContent={
          <DssCheckboxPreview
            {...state}
            isDarkMode={isDarkMode}
          />
        }
        codePreview={generateCheckboxCode(state)}
        controls={
          <ControlGrid columns={2}>
            {/* Tamanho */}
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

            {/* Cor Semântica */}
            <ColorPicker
              label="Cor Semântica"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={state.color?.name || state.color}
              onSelect={(color) => handleChange("color", color as SemanticColor)}
              disabled={!!state.brand}
            />

            {/* Brand */}
            <BrandPicker
              label="Brand (exclusivo com cor)"
              brands={DSS_BRAND_COLORS}
              selectedBrand={state.brand?.name || state.brand}
              onSelect={(brand) => handleChange("brand", brand as BrandColor | null)}
            />

            {/* Estados */}
            <ToggleGroup
              label="Estados"
              options={[
                { name: "checked", label: "Checked" },
                { name: "indeterminate", label: "Indeterminate" },
                { name: "disabled", label: "Disabled" },
                { name: "dense", label: "Dense" },
                { name: "leftLabel", label: "Left Label" },
              ]}
              values={{
                checked: state.checked,
                indeterminate: state.indeterminate,
                disabled: state.disabled,
                dense: state.dense,
                leftLabel: state.leftLabel,
              }}
              onToggle={(name) => {
                if (name === "checked") {
                  handleChange("checked", !state.checked);
                } else if (name === "indeterminate") {
                  handleChange("indeterminate", !state.indeterminate);
                } else if (name === "disabled") {
                  handleChange("disabled", !state.disabled);
                } else if (name === "dense") {
                  handleChange("dense", !state.dense);
                } else if (name === "leftLabel") {
                  handleChange("leftLabel", !state.leftLabel);
                }
              }}
            />

            {/* Label */}
            <ControlSection label="Label">
              <input
                type="text"
                value={state.label}
                onChange={(e) => handleChange("label", e.target.value)}
                className="w-full px-3 py-2 rounded border text-sm"
                style={{
                  backgroundColor: "var(--jtech-card-bg)",
                  borderColor: "var(--jtech-card-border)",
                  color: "var(--jtech-text-body)",
                }}
                placeholder="Digite o label..."
              />
            </ControlSection>
          </ControlGrid>
        }
      />

      {/* ================================================================
          SEÇÃO 7: ANATOMIA DE 4 CAMADAS
          ================================================================ */}
      <AnatomySection
        componentName="DssCheckbox"
        layers={{
          structure: {
            files: ["_1-structure.scss"],
            description: "Tokens de sizing, border-radius, touch target",
            responsibilities: [
              "Define dimensões base via tokens",
              "Touch target >= 48px via ::before",
              "Border-radius via --dss-radius-sm",
            ],
            tokens: [
              "--dss-compact-control-height-xs",
              "--dss-compact-control-height-sm",
              "--dss-compact-control-height-md",
              "--dss-compact-control-height-lg",
              "--dss-radius-sm",
            ],
          },
          composition: {
            files: ["_2-composition.scss"],
            description: "Slots para label e posicionamento",
            responsibilities: [
              "Slot default para label customizado",
              "Prop leftLabel para posição",
              "Prop dense para espaçamento compacto",
            ],
          },
          variants: {
            files: ["_3-variants.scss"],
            description: "Estados visuais do checkbox",
            responsibilities: [
              "Estados: unchecked, checked, indeterminate",
              "7 exceções documentadas (EXC-01 a EXC-07)",
              "Fase 1: sem variantes visuais adicionais",
            ],
          },
          output: {
            files: ["DssCheckbox.module.scss", "index.ts"],
            description: "Orchestrator final que compõe todas as camadas",
            responsibilities: [
              "Importa Layers 2, 3, 4 em ordem",
              "Barrel exports em index.ts",
              "Re-export wrapper para Vue SFC",
            ],
          },
        }}
      />

      {/* ================================================================
          SEÇÃO 8: DOCUMENTAÇÃO TÉCNICA COLAPSÁVEL
          ================================================================ */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <span className="font-semibold" style={{ color: "var(--jtech-heading-secondary)" }}>
            Documentação Técnica
          </span>
          <ChevronDown className="h-5 w-5 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Tabs defaultValue="props" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="props">Props</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="slots">Slots</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="a11y">Acessibilidade</TabsTrigger>
            </TabsList>

            {/* Props Tab */}
            <TabsContent value="props" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">modelValue</TableCell>
                    <TableCell className="font-mono">boolean | null | any[]</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Valor do checkbox (v-model)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">val</TableCell>
                    <TableCell className="font-mono">any</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Valor no modo grupo (array)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">trueValue</TableCell>
                    <TableCell className="font-mono">any</TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>Valor customizado para estado marcado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">falseValue</TableCell>
                    <TableCell className="font-mono">any</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Valor customizado para estado desmarcado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">indeterminateValue</TableCell>
                    <TableCell className="font-mono">any</TableCell>
                    <TableCell>null</TableCell>
                    <TableCell>Valor para estado indeterminate</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">toggleIndeterminate</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Habilita ciclo de 3 estados</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">label</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Texto do label</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">leftLabel</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Posiciona label à esquerda</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">color</TableCell>
                    <TableCell className="font-mono">SemanticColor</TableCell>
                    <TableCell>primary</TableCell>
                    <TableCell>Cor semântica do checkbox</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">size</TableCell>
                    <TableCell className="font-mono">xs | sm | md | lg</TableCell>
                    <TableCell>md</TableCell>
                    <TableCell>Tamanho do checkbox</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">disable</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Estado desabilitado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">dense</TableCell>
                    <TableCell className="font-mono">boolean</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Modo compacto</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">brand</TableCell>
                    <TableCell className="font-mono">hub | water | waste</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Override de marca</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">tabindex</TableCell>
                    <TableCell className="font-mono">number | string</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>Tabindex customizado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">ariaLabel</TableCell>
                    <TableCell className="font-mono">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Label de acessibilidade</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Payload</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">update:modelValue</TableCell>
                    <TableCell className="font-mono">boolean | null | any[]</TableCell>
                    <TableCell>Emitido quando o valor do checkbox muda</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
                  <Info className="inline h-4 w-4 mr-2" />
                  <strong>Nota:</strong> O componente não emite eventos de loading pois a alternância
                  de estado é instantânea (justificativa documentada no selo NC-02).
                </p>
              </div>
            </TabsContent>

            {/* Slots Tab */}
            <TabsContent value="slots" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Slot</TableHead>
                    <TableHead>Props</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">default</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Conteúdo customizado do label (substitui prop label)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Tokens Tab */}
            <TabsContent value="tokens" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Uso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">--dss-compact-control-height-*</TableCell>
                    <TableCell>Sizing</TableCell>
                    <TableCell>Altura do checkbox por tamanho (xs, sm, md, lg)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">--dss-touch-target-min</TableCell>
                    <TableCell>Accessibility</TableCell>
                    <TableCell>Touch target mínimo (48px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">--dss-radius-sm</TableCell>
                    <TableCell>Border Radius</TableCell>
                    <TableCell>Arredondamento do box</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">--dss-border-default</TableCell>
                    <TableCell>Borders</TableCell>
                    <TableCell>Cor da borda no estado unchecked</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">--dss-primary</TableCell>
                    <TableCell>Semantic</TableCell>
                    <TableCell>Cor padrão do checkbox checked</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">--dss-duration-200</TableCell>
                    <TableCell>Motion</TableCell>
                    <TableCell>Duração das transições</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">--dss-easing-standard</TableCell>
                    <TableCell>Motion</TableCell>
                    <TableCell>Curva de easing padrão</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--jtech-heading-secondary)" }}>
                  Exceções Documentadas (EXC-01 a EXC-07):
                </p>
                <ul className="text-sm space-y-1" style={{ color: "var(--jtech-text-body)" }}>
                  <li>• EXC-01 a EXC-05: Valores de brightness canônicos (0.90, 0.95, 1.10, 1.20)</li>
                  <li>• EXC-06: :active light mode (brightness 0.90)</li>
                  <li>• EXC-07: :active dark mode (brightness 1.20)</li>
                </ul>
              </div>
            </TabsContent>

            {/* Accessibility Tab */}
            <TabsContent value="a11y" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Critério WCAG</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Implementação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1.4.3 Contraste</TableCell>
                    <TableCell>AA</TableCell>
                    <TableCell className="text-green-500">✓ PASS</TableCell>
                    <TableCell>Contraste mínimo 4.5:1 via tokens DSS</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2.1.1 Teclado</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell className="text-green-500">✓ PASS</TableCell>
                    <TableCell>Tab (foco), Space (toggle)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2.5.5 Alvo de Toque</TableCell>
                    <TableCell>AAA</TableCell>
                    <TableCell className="text-green-500">✓ PASS</TableCell>
                    <TableCell>Touch target &gt;= 48px via ::before</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4.1.2 Nome, Função, Valor</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell className="text-green-500">✓ PASS</TableCell>
                    <TableCell>aria-checked, aria-disabled, aria-checked="mixed"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1.4.1 Uso de Cor</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell className="text-green-500">✓ PASS</TableCell>
                    <TableCell>Ícone de check/minus além da cor</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <p className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
                  <strong>Media Queries suportadas:</strong> prefers-reduced-motion, prefers-contrast: more,
                  forced-colors: active, prefers-color-scheme: dark, print
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>

      {/* ================================================================
          SEÇÃO 9: RESSALVAS DO SELO
          ================================================================ */}
      <div
        className="p-5 rounded-lg border"
        style={{
          backgroundColor: "var(--jtech-card-bg)",
          borderColor: "var(--dss-info)",
        }}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-info)" }}>
          <Info size={18} /> Ressalvas do Selo de Conformidade
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Mitigação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">R-01</TableCell>
              <TableCell>Divergência textual entre prompt de auditoria e CLAUDE.md sobre convenção de pseudo-elementos</TableCell>
              <TableCell>Código segue CLAUDE.md (normativo vinculante): ::before = touch target, ::after = efeitos visuais</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">R-02</TableCell>
              <TableCell>Brand suporta 3 de 8 cores semânticas (primary, secondary, accent)</TableCell>
              <TableCell>Consistente com golden component DssChip; limitação documentada</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">R-03</TableCell>
              <TableCell>text-white aplicado sem lógica de auto-contraste</TableCell>
              <TableCell>Segue padrão Quasar fielmente (Princípio #2); monitorar futuras iterações</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="mt-4 text-sm" style={{ color: "var(--jtech-text-body)" }}>
          Nenhuma ressalva impede a concessão do selo. <strong>Selo emitido em 01/02/2026.</strong>
        </p>
      </div>
    </div>
  );
}
