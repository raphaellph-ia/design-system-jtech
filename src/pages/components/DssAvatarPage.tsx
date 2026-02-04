import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Crown,
  Droplet,
  Leaf,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

// Importar sistema de Playground UNIFICADO
import {
  DssPlayground,
  ControlGrid,
  ColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS ESPECÍFICOS DO DSSAVATAR
// ============================================================================

// Cores de Status
const statusColors = {
  online: { label: "Online", color: "#4dd228", token: "--dss-positive" },
  away: { label: "Away", color: "#fabd14", token: "--dss-warning" },
  busy: { label: "Busy", color: "#d8182e", token: "--dss-negative" },
  offline: { label: "Offline", color: "#9ca3af", token: "--dss-neutral-400" },
};

// Tamanhos do Avatar baseados no DssAvatar.md
const sizes = [
  { name: "xs", label: "XS", dimension: "32px", fontSize: "12px", iconSize: "16px", token: "32px (fixo)", usage: "Listas compactas, comentários" },
  { name: "sm", label: "SM", dimension: "40px", fontSize: "14px", iconSize: "20px", token: "40px (fixo)", usage: "Listas, menus" },
  { name: "md", label: "MD", dimension: "48px", fontSize: "16px", iconSize: "24px", token: "--dss-touch-target-min", isDefault: true, usage: "Padrão, cards" },
  { name: "lg", label: "LG", dimension: "64px", fontSize: "18px", iconSize: "32px", token: "--dss-touch-target-xl", usage: "Perfis, destaque" },
  { name: "xl", label: "XL", dimension: "80px", fontSize: "20px", iconSize: "48px", token: "80px (fixo)", usage: "Páginas de perfil, hero" },
];

// Formas do Avatar
const shapes = [
  { name: "circular", label: "Circular", desc: "Padrão, para pessoas/usuários" },
  { name: "rounded", label: "Rounded", desc: "Bordas arredondadas (8px), empresas" },
  { name: "square", label: "Square", desc: "Sem border-radius, logos" },
];

// Props API do DssAvatar
const propsData = [
  { category: "Tamanho", prop: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | string", default: "'md'", description: "Tamanho do avatar (predefinido ou CSS unit)" },
  { category: "Tamanho", prop: "fontSize", type: "String", default: "null", description: "Tamanho da fonte customizado" },
  { category: "Visual", prop: "color", type: "'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info'", default: "null", description: "Cor semântica do fundo" },
  { category: "Visual", prop: "textColor", type: "String", default: "null", description: "Cor customizada do texto/ícone" },
  { category: "Visual", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Sansys" },
  { category: "Conteúdo", prop: "icon", type: "String", default: "null", description: "Nome do ícone Material Icons" },
  { category: "Forma", prop: "square", type: "Boolean", default: "false", description: "Avatar quadrado (border-radius: 0)" },
  { category: "Forma", prop: "rounded", type: "Boolean", default: "false", description: "Avatar arredondado (border-radius: 8px)" },
  { category: "Status", prop: "status", type: "'online' | 'away' | 'busy' | 'offline'", default: "null", description: "Indicador de status" },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label ARIA para screen readers" },
  { category: "Acessibilidade", prop: "alt", type: "String", default: "undefined", description: "Alt text para imagens no slot" },
];

// Tokens utilizados pelo DssAvatar
const tokensUsed = [
  // Cores Semânticas
  { category: "Cores Semânticas", token: "--dss-positive", value: "#4dd228", usage: "Status online" },
  { category: "Cores Semânticas", token: "--dss-warning", value: "#fabd14", usage: "Status away" },
  { category: "Cores Semânticas", token: "--dss-negative", value: "#d8182e", usage: "Status busy" },
  { category: "Cores Semânticas", token: "--dss-neutral-400", value: "#9ca3af", usage: "Status offline" },
  // Brand
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Borda Hub" },
  { category: "Brand Water", token: "--dss-water-600", value: "#026cc7", usage: "Borda Water" },
  { category: "Brand Waste", token: "--dss-waste-600", value: "#0b8154", usage: "Borda Waste" },
  // Dimensões
  { category: "Dimensões", token: "--dss-touch-target-min", value: "48px", usage: "Tamanho md" },
  { category: "Dimensões", token: "--dss-touch-target-xl", value: "64px", usage: "Tamanho lg" },
  // Tipografia
  { category: "Tipografia", token: "--dss-font-family-sans", value: "system-ui, sans-serif", usage: "Fonte padrão" },
  { category: "Tipografia", token: "--dss-font-size-md", value: "16px", usage: "Texto size md" },
  { category: "Tipografia", token: "--dss-font-weight-medium", value: "500", usage: "Peso do texto" },
  // Bordas
  { category: "Bordas", token: "--dss-radius-full", value: "9999px", usage: "Forma circular" },
  { category: "Bordas", token: "--dss-radius-md", value: "8px", usage: "Forma rounded" },
  { category: "Bordas", token: "--dss-border-width-md", value: "2px", usage: "Borda de brand" },
  // Acessibilidade
  { category: "Acessibilidade", token: "--dss-focus-ring", value: "0 0 0 2px var(--dss-action-primary)", usage: "Focus ring" },
  // Motion
  { category: "Motion", token: "--dss-transition-base", value: "150ms ease-in-out", usage: "Transições hover/focus" },
];

// Anatomia 4 Camadas DSS
const anatomyData = {
  structure: {
    files: ["DssAvatar.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Definição do template HTML semântico (<div> com role)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (@click)",
      "Binding de slots (default)",
      "Composables useAvatarClasses e useAvatarStyles",
    ],
    tokens: [],
    codeExample: `<template>
  <div
    ref="rootRef"
    :class="avatarClasses"
    :style="avatarStyle"
    :role="ariaLabel ? 'img' : undefined"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span v-if="icon" class="dss-avatar__icon material-icons">
      {{ icon }}
    </span>
    <div v-if="!icon" class="dss-avatar__content">
      <slot></slot>
    </div>
    <span v-if="status" class="dss-avatar__status" />
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/base.scss"],
    description: "Estilos fundamentais que definem o layout, tipografia e reset do componente.",
    responsibilities: [
      "Display flex e centralização de conteúdo",
      "Tipografia base (font-family, font-weight)",
      "Tamanhos predefinidos (xs, sm, md, lg, xl)",
      "Reset de estilos nativos",
    ],
    tokens: ["--dss-font-family-sans", "--dss-font-weight-medium", "--dss-radius-full"],
    codeExample: `.dss-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--dss-font-family-sans);
  font-weight: var(--dss-font-weight-medium);
  border-radius: var(--dss-radius-full);
  overflow: hidden;
  position: relative;
}`,
  },
  variants: {
    files: ["3-variants/_brands.scss", "3-variants/_status.scss"],
    description: "Define as variações visuais do componente: brands e status indicators.",
    responsibilities: [
      "Brand borders: Hub (laranja), Water (azul), Waste (verde)",
      "Status indicators: online, away, busy, offline",
      "Formas: circular, rounded, square",
    ],
    tokens: ["--dss-hub-600", "--dss-water-600", "--dss-waste-600", "--dss-positive", "--dss-warning", "--dss-negative"],
    codeExample: `.dss-avatar--brand-hub {
  border: var(--dss-border-width-md) solid var(--dss-hub-600);
}

.dss-avatar__status--online {
  background-color: var(--dss-positive);
}`,
  },
  output: {
    files: ["4-output/DssAvatar.scss", "_states.scss", "_accessibility.scss"],
    description: "Camada final que aplica estados interativos e acessibilidade.",
    responsibilities: [
      "Estados hover, focus, active para avatares clicáveis",
      "Focus ring com --dss-focus-ring",
      "Suporte a prefers-reduced-motion",
      "Suporte a prefers-contrast e forced-colors",
    ],
    tokens: ["--dss-focus-ring", "--dss-transition-base"],
    codeExample: `.dss-avatar:focus-visible {
  outline: 2px solid var(--dss-action-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .dss-avatar { transition: none; }
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO AVATAR
// ============================================================================

interface DssAvatarPreviewProps {
  content?: string;
  colorKey?: string;
  size?: string;
  shape?: string;
  status?: string | null;
  brand?: string | null;
  showIcon?: boolean;
}

function DssAvatarPreview({
  content = "JD",
  colorKey = "primary",
  size = "md",
  shape = "circular",
  status = null,
  brand = null,
  showIcon = false,
}: DssAvatarPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Obter cores do DSS
  const getColors = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      const b = DSS_BRAND_COLORS[brand];
      return {
        bg: "#e5e5e5",
        borderColor: b.principal,
        textColor: "#454545",
      };
    }

    if (DSS_SEMANTIC_COLORS[colorKey]) {
      const s = DSS_SEMANTIC_COLORS[colorKey];
      return {
        bg: s.bg,
        borderColor: "transparent",
        textColor: "#ffffff",
      };
    }

    return {
      bg: "#e5e5e5",
      borderColor: "transparent",
      textColor: "#454545",
    };
  };

  const getSizeStyles = () => {
    const sizeData = sizes.find((s) => s.name === size) || sizes[2];
    return {
      width: sizeData.dimension,
      height: sizeData.dimension,
      fontSize: sizeData.fontSize,
      iconSize: sizeData.iconSize,
    };
  };

  const getBorderRadius = () => {
    switch (shape) {
      case "square":
        return "0";
      case "rounded":
        return "8px";
      default:
        return "50%";
    }
  };

  const colors = getColors();
  const sizeStyles = getSizeStyles();

  const getStatusColor = () => {
    if (!status) return null;
    return statusColors[status as keyof typeof statusColors]?.color || null;
  };

  const getStatusSize = () => {
    const baseSize = parseInt(sizeStyles.width);
    return Math.max(8, baseSize * 0.25);
  };

  const avatarStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: sizeStyles.width,
    height: sizeStyles.height,
    borderRadius: getBorderRadius(),
    backgroundColor: colors.bg,
    color: colors.textColor,
    fontSize: sizeStyles.fontSize,
    fontWeight: 500,
    fontFamily: "system-ui, -apple-system, sans-serif",
    border: brand ? `2px solid ${colors.borderColor}` : "none",
    position: "relative",
    overflow: "visible",
    cursor: "pointer",
    transition: "all 0.15s ease-in-out",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
  };

  const statusIndicatorStyle: React.CSSProperties = status
    ? {
        position: "absolute",
        bottom: "0",
        right: "0",
        width: `${getStatusSize()}px`,
        height: `${getStatusSize()}px`,
        borderRadius: "50%",
        backgroundColor: getStatusColor() || undefined,
        border: "2px solid white",
      }
    : {};

  return (
    <div
      style={avatarStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={`Avatar ${content}`}
    >
      {showIcon ? (
        <User style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
      ) : (
        <span>{content}</span>
      )}
      {status && <span style={statusIndicatorStyle} aria-label={`Status: ${status}`} />}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssAvatarPage() {
  // Estados do Playground
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState("circular");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    showIcon: false,
  });

  // Exclusividade Brand vs Color
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    if (brand) setSelectedColor(null);
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  // Cor efetiva
  const effectiveColor = selectedBrand ? null : selectedColor || "primary";

  // Geração de código
  const generateCode = () => {
    const props: string[] = [];
    
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor && selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    
    if (selectedSize !== "md") props.push(`size="${selectedSize}"`);
    if (selectedShape === "square") props.push("square");
    if (selectedShape === "rounded") props.push("rounded");
    if (selectedStatus) props.push(`status="${selectedStatus}"`);
    if (booleanStates.showIcon) props.push('icon="person"');

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
    const content = booleanStates.showIcon ? "" : ">JD</DssAvatar>";
    const closing = booleanStates.showIcon ? "/>" : "";

    return `<DssAvatar${propsStr}${closing}${content}`;
  };

  // Token ativo baseado na seleção
  const getActiveToken = () => {
    if (selectedBrand) {
      return DSS_BRAND_COLORS[selectedBrand]?.tokens.principal;
    }
    if (selectedStatus) {
      return statusColors[selectedStatus as keyof typeof statusColors]?.token;
    }
    if (selectedColor) {
      return DSS_SEMANTIC_COLORS[selectedColor]?.tokens.base;
    }
    return undefined;
  };

  // Opções de toggle
  const toggleOptions = [{ name: "showIcon", label: "Usar Ícone" }];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* SEÇÃO 1: BADGES + TÍTULO */}
      <PageHeader
        icon={User}
        badge="Golden Component"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssAvatar"
        subtitle="DssAvatar é o componente para representação visual de usuários, entidades ou placeholders. Suporta brandabilidade multi-marca, status indicators e conformidade WCAG 2.1 AA."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA", "status indicators"]}
        extraBadges={[
          { label: "v2.2", variant: "info" },
          { label: "DSS Selo Aprovado", variant: "success" },
        ]}
      />

      {/* SEÇÃO 2: QUANDO USAR / NÃO USAR */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-lg border"
          style={{
            backgroundColor: "rgba(77, 210, 40, 0.1)",
            borderColor: "var(--dss-positive)",
          }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" />
            Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Perfis de usuário (foto ou iniciais)",
              "Listas de contatos e comentários",
              "Cards de perfil e menus de usuário",
              "Grupos de usuários (avatares empilhados)",
              "Representação de entidades/empresas",
              "Placeholders quando sem foto",
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
          style={{
            backgroundColor: "rgba(216, 24, 46, 0.1)",
            borderColor: "var(--dss-negative)",
          }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <XCircle className="h-5 w-5" />
            Quando NÃO Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Imagens de conteúdo → use <img> ou DssImage",
              "Ícones de ação → use DssIcon ou DssButton",
              "Thumbnails de galeria → use componentes de galeria",
              "Badges standalone → use DssBadge",
              "Botões circulares → use DssButton round",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-negative)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SEÇÃO 3: PLAYGROUND INTERATIVO */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Avatar"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewContent={
          <DssAvatarPreview
            content="JD"
            colorKey={effectiveColor || "primary"}
            size={selectedSize}
            shape={selectedShape}
            status={selectedStatus}
            brand={selectedBrand}
            showIcon={booleanStates.showIcon}
          />
        }
        controls={
          <ControlGrid columns={3}>
            {/* Seletor de Forma */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--jtech-text-muted)" }}>
                Forma
              </label>
              <div className="flex flex-wrap gap-2">
                {shapes.map((shape) => (
                  <PlaygroundButton
                    key={shape.name}
                    isActive={selectedShape === shape.name}
                    onClick={() => setSelectedShape(shape.name)}
                    title={shape.desc}
                  >
                    {shape.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
              disabled={!!selectedBrand}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Seletor de Status */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--jtech-text-muted)" }}>
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                <PlaygroundButton
                  isActive={selectedStatus === null}
                  onClick={() => setSelectedStatus(null)}
                >
                  None
                </PlaygroundButton>
                {Object.entries(statusColors).map(([key, value]) => (
                  <PlaygroundButton
                    key={key}
                    isActive={selectedStatus === key}
                    onClick={() => setSelectedStatus(key)}
                    style={{
                      borderColor: selectedStatus === key ? value.color : undefined,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-1.5"
                      style={{ backgroundColor: value.color }}
                    />
                    {value.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            <ToggleGroup
              label="Opções"
              options={toggleOptions}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
        activeToken={getActiveToken()}
      />

      {/* SEÇÃO 4: ANATOMIA 4 CAMADAS */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssAvatar" layers={anatomyData} />

      {/* SEÇÃO 5: DOCUMENTAÇÃO TÉCNICA COLAPSÁVEL */}
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

          {/* Eventos */}
          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>
              Eventos
            </h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Evento</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Payload</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    click
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>
                    MouseEvent
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>
                    Emitido quando o avatar é clicado
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Slots */}
          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>
              Slots
            </h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso Recomendado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    default
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>
                    Conteúdo principal do avatar
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>
                    Iniciais, imagens, elementos customizados
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* Tokens Utilizados */}
      <CollapsibleSection icon={Code} title="Tokens" titleAccent="Utilizados">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Categoria</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Token</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokensUsed.map((t, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-muted)" }}>{t.category}</TableCell>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    {t.token}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>
                    <span className="flex items-center gap-2">
                      {t.value.startsWith("#") && (
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: t.value }}
                        />
                      )}
                      {t.value}
                    </span>
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{t.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* Acessibilidade */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>
              ✅ Implementado
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "aria-label para avatares com ícone",
                "role=\"img\" quando tem aria-label",
                "Status indicators com aria-label",
                "Focus ring em avatares clicáveis",
                "Contraste mínimo 4.5:1",
                "Suporte a prefers-reduced-motion",
                "Suporte a prefers-contrast: more (CSS Level 5)",
                "Suporte a forced-colors: active (Windows)",
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
              📋 Critérios WCAG Atendidos
            </h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Critério</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Nível</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { criterion: "1.1.1 Conteúdo Não-Textual", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AA" ? "var(--dss-positive)" : "var(--dss-action-primary)",
                        }}
                      >
                        {item.level}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Avatar sem identificação acessível",
              wrong: '<DssAvatar icon="person" />',
              correct: '<DssAvatar icon="person" aria-label="Avatar do usuário" />',
              reason: "Screen readers precisam de contexto.",
            },
            {
              title: "Imagem sem alt text",
              wrong: '<DssAvatar>\n  <img src="/photo.jpg" />\n</DssAvatar>',
              correct: '<DssAvatar>\n  <img src="/photo.jpg" alt="Foto de João" />\n</DssAvatar>',
              reason: "WCAG 1.1.1 exige alternativas textuais.",
            },
            {
              title: "Cores hardcoded",
              wrong: '<DssAvatar style="background-color: #ff0000;" />',
              correct: '<DssAvatar color="negative" />',
              reason: "Bypassa tokens e brandabilidade.",
            },
          ].map((pattern, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border"
              style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
            >
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>
                {pattern.title}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>
                    ❌ Incorreto
                  </span>
                  <pre
                    className="mt-1 p-2 rounded text-xs font-mono"
                    style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}
                  >
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>
                    ✅ Correto
                  </span>
                  <pre
                    className="mt-1 p-2 rounded text-xs font-mono"
                    style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}
                  >
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

      {/* Exceções Documentadas */}
      <CollapsibleSection icon={Info} title="Exceções" titleAccent="Documentadas (Selo DSS v2.2)">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            Valores mantidos intencionalmente sem token DSS, com justificativa técnica. 
            Cada exceção é referenciada no código-fonte via comentário <code>/* EXCEÇÃO DOCUMENTADA */</code>.
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>ID</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "EXC-01", value: "Touch target tokens para sizing", justification: "DssAvatar é Visual/Identity (não interativo). Reutiliza --dss-touch-target-* porque DSS não possui --dss-size-* genéricos." },
                { id: "EXC-02", value: "40px, 80px (sizes sm, xl)", justification: "Nenhum token canônico corresponde. Mantidos para fidelidade dimensional ao QAvatar." },
                { id: "EXC-03", value: "outline: 2px, outline-offset: 2px", justification: "Focus ring com valores fixos por convenção CSS de acessibilidade WCAG." },
                { id: "EXC-04", value: "@media (max-width: 768px)", justification: "CSS @media queries não suportam var(). Limitação técnica." },
                { id: "EXC-05", value: "8-20px (status indicators)", justification: "Dimensões proporcionais ao avatar. Não existem tokens para sub-elementos proporcionais." },
                { id: "EXC-06", value: "TypeScript maps (SIZE_MAP, etc.)", justification: "TS não consome CSS custom properties. Alternativa (getComputedStyle) tem custo inaceitável." },
              ].map((exc, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    {exc.id}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>
                    {exc.value}
                  </TableCell>
                  <TableCell style={{ color: "var(--jtech-text-muted)" }}>{exc.justification}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>
    </div>
  );
}
