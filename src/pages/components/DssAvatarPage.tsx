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
  BookOpen,
  Shield,
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
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE
// ============================================================================

const statusOptions = [
  { name: "online", label: "Online", color: "#4dd228" },
  { name: "away", label: "Away", color: "#fabd14" },
  { name: "busy", label: "Busy", color: "#d8182e" },
  { name: "offline", label: "Offline", color: "#9ca3af" },
];

const shapes = [
  { name: "circular", label: "Circular", desc: "Padrão, para pessoas/usuários" },
  { name: "rounded", label: "Rounded", desc: "Bordas arredondadas (8px), empresas" },
  { name: "square", label: "Square", desc: "Sem border-radius, logos" },
];

const sizes = [
  { name: "xs", label: "XS", dimension: "32px", fontSize: "12px", iconSize: "16px" },
  { name: "sm", label: "SM", dimension: "40px", fontSize: "14px", iconSize: "20px" },
  { name: "md", label: "MD", dimension: "48px", fontSize: "16px", iconSize: "24px", isDefault: true },
  { name: "lg", label: "LG", dimension: "64px", fontSize: "18px", iconSize: "32px" },
  { name: "xl", label: "XL", dimension: "80px", fontSize: "20px", iconSize: "48px" },
];

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
// PREVIEW DO AVATAR
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

  const getColors = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      return {
        bg: "#e5e5e5",
        borderColor: DSS_BRAND_COLORS[brand].principal,
        textColor: "#454545",
      };
    }
    if (DSS_SEMANTIC_COLORS[colorKey]) {
      return {
        bg: DSS_SEMANTIC_COLORS[colorKey].bg,
        borderColor: "transparent",
        textColor: "#ffffff",
      };
    }
    return { bg: "#e5e5e5", borderColor: "transparent", textColor: "#454545" };
  };

  const sizeData = sizes.find((s) => s.name === size) || sizes[2];
  const colors = getColors();

  const getBorderRadius = () => {
    if (shape === "square") return "0";
    if (shape === "rounded") return "8px";
    return "50%";
  };

  const statusColor = status ? statusOptions.find((s) => s.name === status)?.color : null;
  const statusSize = Math.max(8, parseInt(sizeData.dimension) * 0.25);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: sizeData.dimension,
        height: sizeData.dimension,
        borderRadius: getBorderRadius(),
        backgroundColor: colors.bg,
        color: colors.textColor,
        fontSize: sizeData.fontSize,
        fontWeight: 500,
        fontFamily: "system-ui, -apple-system, sans-serif",
        border: brand ? `2px solid ${colors.borderColor}` : "none",
        position: "relative",
        overflow: "visible",
        cursor: "pointer",
        transition: "all 0.15s ease-in-out",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={`Avatar ${content}`}
    >
      {showIcon ? (
        <User style={{ width: sizeData.iconSize, height: sizeData.iconSize }} />
      ) : (
        <span>{content}</span>
      )}
      {status && statusColor && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: `${statusSize}px`,
            height: `${statusSize}px`,
            borderRadius: "50%",
            backgroundColor: statusColor,
            border: "2px solid white",
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssAvatarPage() {
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState("circular");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({ showIcon: false });

  // Exclusividade Color × Brand (v3.1)
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    if (brand) {
      setSelectedBrand(brand);
      setSelectedColor(null);
    }
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

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

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";
    if (booleanStates.showIcon) {
      return `<DssAvatar${propsStr}\n/>`;
    }
    return `<DssAvatar${propsStr}\n>JD</DssAvatar>`;
  };

  const statusVariants = statusOptions.map((s) => ({
    name: s.name,
    label: s.label,
    desc: s.label,
  }));

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO (COMPONENT_PAGE_STRUCTURE §1, §2)
       * ================================================================ */}
      <PageHeader
        icon={User}
        badge="Golden Component"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssAvatar"
        subtitle="DssAvatar é o componente de representação visual de identidade, utilizado para exibir usuários, entidades ou placeholders em contextos como perfis, listas e menus. Ele se integra ao sistema de brandabilidade multi-marca e suporta indicadores de status em tempo real, sendo composto junto a componentes como DssCard, DssList e DssMenu."
        subtitleHighlights={["brandabilidade multi-marca", "indicadores de status", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2", variant: "info" },
          { label: "DSS Selo Aprovado", variant: "success" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / QUANDO NÃO USAR (§3)
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
              "Perfis de usuário com foto, iniciais ou ícone placeholder",
              "Listas de contatos, comentários e menções",
              "Cards de perfil, menus de usuário e headers",
              "Grupos de usuários (avatares empilhados)",
              "Representação visual de entidades ou empresas",
              "Indicação de presença/status em tempo real",
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
                { scenario: "Imagens de conteúdo ou galeria", alt: "DssImage" },
                { scenario: "Ícones de ação isolados", alt: "DssIcon ou DssButton" },
                { scenario: "Thumbnails de galeria", alt: "Componentes de galeria" },
                { scenario: "Badges standalone", alt: "DssBadge" },
                { scenario: "Botões circulares", alt: "DssButton round" },
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
       * SEÇÃO 3: PLAYGROUND INTERATIVO (§4, PLAYGROUND_STANDARD v3.1)
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Avatar"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssAvatarPreview
            content="JD"
            colorKey={effectiveColor}
            size={selectedSize}
            shape={selectedShape}
            status={selectedStatus}
            brand={selectedBrand}
            showIcon={booleanStates.showIcon}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <VariantSelector
              label="Forma"
              variants={shapes}
              selectedVariant={selectedShape}
              onSelect={setSelectedShape}
            />

            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <VariantSelector
              label="Status"
              variants={statusVariants}
              selectedVariant={selectedStatus || ""}
              onSelect={(s) => setSelectedStatus(selectedStatus === s ? null : s)}
            />

            <ToggleGroup
              label="Opções"
              options={[{ name: "showIcon", label: "Usar Ícone" }]}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 4: ESTADOS INTERATIVOS (§5)
       * ================================================================ */}
      <SectionHeader title="Estados" titleAccent="Interativos" badge="Comportamento" />

      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Visual</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Interação</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens Aplicados</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", visual: "Aparência padrão com iniciais/ícone", interaction: "Pronto para interação", tokens: "--dss-action-primary", a11y: "—" },
              { state: "Hover", visual: "Scale 1.05, box-shadow sutil", interaction: "Pointer over", tokens: "--dss-transition-base", a11y: "—" },
              { state: "Focus", visual: "Focus ring 2px visível", interaction: "Navegação por teclado", tokens: "--dss-focus-ring", a11y: "WCAG 2.4.7" },
              { state: "Active", visual: "Scale reduzido", interaction: "Clique / toque", tokens: "--dss-transition-base", a11y: "—" },
              { state: "Disabled", visual: "Opacidade reduzida (0.4)", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.visual}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.interaction}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.tokens}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.a11y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS (§6)
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssAvatar" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES (§7)
       * ================================================================ */}

      {/* 7.1 Props API & Eventos */}
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
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
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
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>click</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>MouseEvent</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o avatar é clicado</TableCell>
                </TableRow>
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso Recomendado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo principal do avatar</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Iniciais, imagens, elementos customizados</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens (TIPOS aceitos, não tokens individuais) */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            Este componente aceita os seguintes tipos de tokens DSS:
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo de Token</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Papel no Componente</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { type: "Cores Semânticas", role: "Background do avatar em estados padrão e feedback", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Borda de identidade visual (Hub, Water, Waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Tamanhos e touch targets (xs–xl)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Fonte e peso do texto de iniciais", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius (circular, rounded, square)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições hover e focus", ref: "DSS_TOKEN_REFERENCE.md" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.type}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.role}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.4 Acessibilidade WCAG */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "aria-label para avatares com ícone",
                'role="img" quando tem aria-label',
                "Status indicators com aria-label",
                "Focus ring em avatares clicáveis",
                "Contraste mínimo 4.5:1",
                "Suporte a prefers-reduced-motion",
                "Suporte a prefers-contrast: more",
                "Suporte a forced-colors: active",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Critérios WCAG Atendidos</h4>
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

      {/* ================================================================
       * SEÇÃO 8: ANTI-PATTERNS (§8)
       * ================================================================ */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Avatar sem identificação acessível",
              wrong: '<DssAvatar icon="person" />',
              correct: '<DssAvatar icon="person" aria-label="Avatar do usuário" />',
              reason: "Screen readers precisam de contexto para comunicar o papel do elemento.",
            },
            {
              title: "Imagem sem alt text",
              wrong: '<DssAvatar>\n  <img src="/photo.jpg" />\n</DssAvatar>',
              correct: '<DssAvatar>\n  <img src="/photo.jpg" alt="Foto de João" />\n</DssAvatar>',
              reason: "WCAG 1.1.1 exige alternativas textuais para conteúdo não-textual.",
            },
            {
              title: "Cores hardcoded em vez de tokens",
              wrong: '<DssAvatar style="background-color: #ff0000;" />',
              correct: '<DssAvatar color="negative" />',
              reason: "Bypassa o sistema de tokens e quebra a brandabilidade.",
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
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
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

      {/* ================================================================
       * SEÇÃO 9: VINCULANTES DSS v2.2 (§9)
       * ================================================================ */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.2">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssAvatar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Utilizado em ::after para o status indicator posicionamento" },
                { rule: "Uso de brightness()", application: "Não utilizado — estados são controlados via tokens de opacidade e scale" },
                { rule: "Classificação do componente", application: "Visual Component (representação, não ação)" },
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

      {/* ================================================================
       * SEÇÃO 10: REFERÊNCIAS NORMATIVAS (§10)
       * ================================================================ */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "DSS/docs/compliance/seals/DssAvatar/DSS_AVATAR_SELO_v2.2.md",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{ref}</code>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
