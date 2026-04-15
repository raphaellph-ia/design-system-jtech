// @ts-nocheck
 /**
  * ==========================================================================
  * DssChipPage - Documentação do Golden Reference DssChip
  * ==========================================================================
  *
  * Página de documentação seguindo o padrão Golden Sample V2.2
  * DssChip é um Golden Compact Control (interativo) do Design System Sansys
  *
  * Template: 13.1 (13 seções padronizadas)
  * Selo: DSS v2.2 - Aprovado em 27/01/2026
  */
 
 import React, { useState } from "react";
 import {
   DssPlayground,
   ControlGrid,
   VariantSelector,
   SizeSelector,
   ToggleGroup,
   ColorPicker,
   FeedbackColorPicker,
   BrandPicker,
   type SemanticColor,
   type BrandColor,
   type FeedbackColor,
   type Variant,
   type Size,
   DSS_SEMANTIC_COLORS,
   DSS_FEEDBACK_COLORS,
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
   Tag,
   Star,
   Settings,
   User,
   Heart,
   AlertCircle,
   Info,
 } from "lucide-react";
 
 // ==========================================================================
 // TIPOS E CONSTANTES
 // ==========================================================================
 
 type ChipShape = "round" | "square";
 
 interface DssChipState {
   variant: Variant;
   size: Size;
   shape: ChipShape;
   color: string | null;
   feedbackColor: string | null;
   brand: string | null;
   selected: boolean;
   clickable: boolean;
   removable: boolean;
   disabled: boolean;
   dense: boolean;
   hasIconLeft: boolean;
   hasIconRight: boolean;
   label: string;
 }
 
 const CHIP_ICONS = [
   { value: "none", label: "Nenhum", icon: X },
   { value: "tag", label: "Tag", icon: Tag },
   { value: "star", label: "Star", icon: Star },
   { value: "user", label: "User", icon: User },
   { value: "heart", label: "Heart", icon: Heart },
   { value: "settings", label: "Settings", icon: Settings },
 ];
 
 // ==========================================================================
 // COMPONENTE DE PREVIEW
 // ==========================================================================
 
 interface DssChipPreviewProps extends Omit<DssChipState, 'feedbackColor'> {
   isDarkMode: boolean;
   feedbackColor?: string | null;
 }
 
function DssChipPreview({
    variant,
    size,
    shape,
    color,
    feedbackColor,
    brand,
    selected,
    clickable,
    removable,
    disabled,
    dense,
    hasIconLeft,
    hasIconRight,
    label,
    isDarkMode,
  }: DssChipPreviewProps) {
   const [isHovered, setIsHovered] = useState(false);
   const [isActive, setIsActive] = useState(false);
   const [isSelected, setIsSelected] = useState(selected);
 
   React.useEffect(() => {
     setIsSelected(selected);
   }, [selected]);
 
   // Color Application Domain: brand > feedbackColor > color
   const resolvedColorName = brand || feedbackColor || color || "primary";
   const resolvedColor = brand
     ? `var(--dss-${brand}-primary)`
     : feedbackColor
     ? DSS_FEEDBACK_COLORS[feedbackColor]?.bg || `var(--dss-${feedbackColor})`
     : color
     ? DSS_SEMANTIC_COLORS[color]?.bg || `var(--dss-${color})`
     : "var(--dss-primary)";
 
   // Estilos base por variante
   const getBaseStyles = (): React.CSSProperties => {
     const base: React.CSSProperties = {
       display: "inline-flex",
       alignItems: "center",
       gap: dense ? "var(--dss-spacing-1)" : "var(--dss-spacing-2)",
       fontFamily: "var(--dss-font-family-sans)",
       fontWeight: 500,
       cursor: disabled ? "not-allowed" : clickable ? "pointer" : "default",
       opacity: disabled ? 0.4 : 1,
       transition: "all var(--dss-duration-200) var(--dss-easing-standard)",
       position: "relative",
       userSelect: "none",
     };
 
     // Tamanhos (altura visual via tokens de compact control)
     const sizeMap: Record<Size, { height: string; padding: string; fontSize: string }> = {
       xs: { height: "20px", padding: "0 8px", fontSize: "var(--dss-font-size-xs)" },
       sm: { height: "24px", padding: "0 10px", fontSize: "var(--dss-font-size-sm)" },
       md: { height: "28px", padding: "0 12px", fontSize: "var(--dss-font-size-sm)" },
       lg: { height: "32px", padding: "0 14px", fontSize: "var(--dss-font-size-md)" },
     };
 
     const sizeStyles = sizeMap[size];
     base.minHeight = sizeStyles.height;
     base.padding = dense ? "0 6px" : sizeStyles.padding;
     base.fontSize = sizeStyles.fontSize;
 
     // Forma
     base.borderRadius = shape === "round" ? "var(--dss-radius-full)" : "var(--dss-radius-sm)";
 
     // Variantes
     if (variant === "filled") {
       base.backgroundColor = resolvedColor;
       base.color = "white";
       base.border = "none";
       if (isHovered && clickable && !disabled) {
         base.filter = isDarkMode ? "brightness(1.1)" : "brightness(0.92)";
       }
       if (isActive && clickable && !disabled) {
         base.filter = isDarkMode ? "brightness(1.2)" : "brightness(0.85)";
       }
     } else if (variant === "outline") {
       base.backgroundColor = isHovered && clickable && !disabled ? resolvedColor : "transparent";
       base.color = isHovered && clickable && !disabled ? "white" : resolvedColor;
       base.border = `2px solid ${resolvedColor}`;
     } else if (variant === "flat") {
       base.backgroundColor = isHovered && clickable && !disabled 
         ? `color-mix(in srgb, ${resolvedColor} 15%, transparent)` 
         : "transparent";
       base.color = resolvedColor;
       base.border = "none";
     }
 
     // Estado selecionado
     if (isSelected && !disabled) {
       base.boxShadow = `inset 0 0 0 2px ${isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}`;
     }
 
     return base;
   };
 
   const handleClick = () => {
     if (clickable && !disabled) {
       setIsSelected(!isSelected);
     }
   };
 
   const iconSize = size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : 18;
 
   return (
     <div
       style={getBaseStyles()}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => {
         setIsHovered(false);
         setIsActive(false);
       }}
       onMouseDown={() => setIsActive(true)}
       onMouseUp={() => setIsActive(false)}
       onClick={handleClick}
       role="option"
       aria-selected={isSelected}
       aria-disabled={disabled}
       tabIndex={disabled ? -1 : clickable ? 0 : -1}
     >
       {/* Selected Icon */}
       {isSelected && <Check size={iconSize} aria-hidden="true" />}
 
       {/* Icon Left */}
       {hasIconLeft && !isSelected && <Tag size={iconSize} aria-hidden="true" />}
 
       {/* Label */}
       <span>{label}</span>
 
       {/* Icon Right */}
       {hasIconRight && !removable && <Star size={iconSize} aria-hidden="true" />}
 
       {/* Remove Button */}
       {removable && !disabled && (
         <button
           type="button"
           aria-label="Remover"
           style={{
             display: "inline-flex",
             alignItems: "center",
             justifyContent: "center",
             padding: 0,
             margin: 0,
             marginLeft: "var(--dss-spacing-1)",
             background: "none",
             border: "none",
             cursor: "pointer",
             opacity: 0.7,
             transition: "opacity var(--dss-duration-150)",
           }}
           onClick={(e) => {
             e.stopPropagation();
             console.log("Remove clicked");
           }}
         >
           <X size={iconSize} aria-hidden="true" />
         </button>
       )}
     </div>
   );
 }
 
 // ==========================================================================
 // GERADOR DE CÓDIGO
 // ==========================================================================
 
 function generateChipCode(state: DssChipState): string {
   const props: string[] = [];
 
   if (state.variant !== "filled") props.push(`variant="${state.variant}"`);
   if (state.size !== "md") props.push(`size="${state.size}"`);
   if (state.shape === "square") props.push("square");
   if (state.shape === "round") props.push("round");
   if (state.brand) props.push(`brand="${state.brand}"`);
   else if (state.feedbackColor) props.push(`color="${state.feedbackColor}"`);
   else if (state.color && state.color !== "primary") props.push(`color="${state.color}"`);
   if (state.selected) props.push("selected");
   if (state.clickable) props.push("clickable");
   if (state.removable) props.push("removable");
   if (state.disabled) props.push("disable");
   if (state.dense) props.push("dense");
   if (state.hasIconLeft) props.push('icon="tag"');
   if (state.hasIconRight) props.push('icon-right="star"');
 
   props.push(`label="${state.label}"`);
 
   const events: string[] = [];
   if (state.clickable) events.push("@click=\"handleClick\"");
   if (state.removable) events.push("@remove=\"handleRemove\"");
 
   const allProps = [...props, ...events];
 
   if (allProps.length <= 3) {
     return `<DssChip ${allProps.join(" ")} />`;
   }
 
   return `<DssChip\n  ${allProps.join("\n  ")}\n/>`;
 }
 
 // ==========================================================================
 // PÁGINA PRINCIPAL
 // ==========================================================================
 
 export default function DssChipPage() {
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [state, setState] = useState<DssChipState>({
     variant: "filled",
     size: "md",
     shape: "round",
     color: "primary",
     feedbackColor: null,
     brand: null,
     selected: false,
     clickable: true,
     removable: false,
     disabled: false,
     dense: false,
     hasIconLeft: false,
     hasIconRight: false,
     label: "Categoria",
   });

   // Color Application Domain: substituição implícita e silenciosa
   const handleColorChange = (color: string) => {
     setState((prev) => ({ ...prev, color, feedbackColor: null, brand: null }));
   };
   const handleFeedbackChange = (feedbackColor: string) => {
     setState((prev) => ({ ...prev, feedbackColor, color: null, brand: null }));
   };
   const handleBrandChange = (brand: string | null) => {
     setState((prev) => ({ ...prev, brand, color: null, feedbackColor: null }));
   };

   const handleChange = <K extends keyof DssChipState>(key: K, value: DssChipState[K]) => {
     setState((prev) => ({ ...prev, [key]: value }));
   };

   const toggleBooleanState = (name: string) => {
     setState((prev) => ({ ...prev, [name]: !prev[name as keyof DssChipState] }));
   };

   // Feedback colors array for FeedbackColorPicker
   const feedbackColors = Object.values(DSS_FEEDBACK_COLORS) as FeedbackColor[];
 
   return (
     <div className="p-6 space-y-8 pb-12">
       {/* ================================================================
           SEÇÃO 1: BADGES DE METADADOS
           ================================================================ */}
       <div className="flex flex-wrap gap-2 mb-4">
         <Badge
           variant="outline"
           className="bg-amber-500/10 text-amber-600 border-amber-500/30"
         >
           🏆 Golden Reference
         </Badge>
         <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
           DSS v2.2
         </Badge>
         <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
           ✓ Selo de Conformidade
         </Badge>
         <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30">
           Compact Control
         </Badge>
         <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
           WCAG 2.1 AA
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
           DssChip
         </h1>
         <p
           className="text-lg max-w-3xl"
           style={{ color: "var(--jtech-text-body)" }}
         >
           Componente de chip/tag compacto com suporte a acessibilidade WCAG 2.1 AA,
           brandabilidade multi-marca (Hub/Water/Waste) e interatividade completa.
           <strong> Golden Compact Control (interativo)</strong> do Design System Sansys.
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
             3
           </div>
           <div className="text-sm" style={{ color: "var(--jtech-text-body)" }}>
             Variantes
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
             <li>• Tags de categorização (tecnologias, tópicos)</li>
             <li>• Status badges compactos (Ativo, Pendente)</li>
             <li>• Filtros selecionáveis em listas</li>
             <li>• Inputs de múltiplos valores (tags removíveis)</li>
             <li>• Metadados de conteúdo em cards</li>
             <li>• Seleção múltipla compacta</li>
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
             <li>• Badges numéricos → use <code>DssBadge</code></li>
             <li>• Botões de ação principal → use <code>DssButton</code></li>
             <li>• Avatares com iniciais → use <code>DssAvatar</code></li>
             <li>• Status de formulário → mensagens inline</li>
             <li>• Navegação → tabs ou menus</li>
             <li>• Listas longas → <code>DssSelect</code></li>
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
               <li>• Chips sem label ou aria-label (icon-only)</li>
               <li>• Usar chips como botões de navegação</li>
               <li>• Misturar brand e color na mesma interface</li>
              <li>• Chips com texto muito longo (&gt;30 caracteres)</li>
             </ul>
           </div>
           <div>
             <strong className="text-green-500">✓ Prefira:</strong>
             <ul className="mt-2 space-y-1">
               <li>• Sempre fornecer aria-label para chips icon-only</li>
               <li>• Manter consistência de variante em grupos</li>
               <li>• Usar brand OU color, nunca ambos</li>
               <li>• Truncar texto longo com ellipsis</li>
             </ul>
           </div>
         </div>
       </div>
 
       {/* ================================================================
           SEÇÃO 6: PLAYGROUND INTERATIVO
           ================================================================ */}
       <DssPlayground
         title="Playground Interativo"
         description="Configure as props e veja o resultado em tempo real."
         isDarkMode={isDarkMode}
         onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
         codePreview={generateChipCode(state)}
        previewContent={
           <div className="flex flex-wrap gap-4 items-center justify-center">
             <DssChipPreview {...state} isDarkMode={isDarkMode} />
           </div>
         }
        controls={
          <ControlGrid columns={5}>
            {/* Variant */}
            <VariantSelector
              label="Variante"
              variants={[
                { name: "filled", label: "Filled", desc: "Background sólido" },
                { name: "outline", label: "Outline", desc: "Borda colorida" },
                { name: "flat", label: "Flat", desc: "Sem background" },
              ]}
              selectedVariant={state.variant}
              onSelect={(v) => handleChange("variant", v as Variant)}
            />

            {/* Size */}
            <SizeSelector
              label="Tamanho"
              sizes={[
                { name: "xs", label: "XS" },
                { name: "sm", label: "SM" },
                { name: "md", label: "MD", isDefault: true },
                { name: "lg", label: "LG" },
              ]}
              selectedSize={state.size}
              onSelect={(s) => handleChange("size", s as Size)}
            />

            {/* Color Domain — Semantic */}
            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={state.color}
              onSelect={handleColorChange}
            />

            {/* Color Domain — Brand */}
            <BrandPicker
              label="Brand"
              brands={DSS_BRAND_COLORS}
              selectedBrand={state.brand}
              onSelect={handleBrandChange}
            />

            {/* Color Domain — Feedback */}
            <FeedbackColorPicker
              label="Feedback"
              colors={feedbackColors}
              selectedColor={state.feedbackColor}
              onSelect={handleFeedbackChange}
            />

            {/* Shape */}
            <ToggleGroup
              label="Forma"
              options={[
                { name: "round", label: "Round (Pill)" },
                { name: "square", label: "Square" },
              ]}
              values={{ round: state.shape === "round", square: state.shape === "square" }}
              onToggle={(v) => handleChange("shape", v as ChipShape)}
            />

            {/* Estados */}
            <ToggleGroup
              label="Estados"
              options={[
                { name: "selected", label: "Selected" },
                { name: "clickable", label: "Clickable" },
                { name: "removable", label: "Removable" },
                { name: "disabled", label: "Disabled" },
                { name: "dense", label: "Dense" },
              ]}
              values={{
                selected: state.selected,
                clickable: state.clickable,
                removable: state.removable,
                disabled: state.disabled,
                dense: state.dense,
              }}
              onToggle={toggleBooleanState}
            />

            {/* Ícones */}
            <ToggleGroup
              label="Ícones"
              options={[
                { name: "hasIconLeft", label: "Ícone Esquerda" },
                { name: "hasIconRight", label: "Ícone Direita" },
              ]}
              values={{
                hasIconLeft: state.hasIconLeft,
                hasIconRight: state.hasIconRight,
              }}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
       />
 
       {/* ================================================================
           SEÇÃO 7: ANATOMIA DE 4 CAMADAS
           ================================================================ */}
      <AnatomySection
        componentName="DssChip"
        layers={{
          structure: {
            files: ["DssChip.ts.vue", "types/chip.types.ts"],
            description: "Template Vue + TypeScript + Props API com Composition API",
            responsibilities: [
              "21 props documentadas (label, icon, variant, color, size, etc.)",
              "3 eventos (@click, @remove, @update:selected)",
              "4 slots (default, icon, icon-right, icon-remove)",
              "ARIA completo: role='option', aria-selected, aria-disabled",
            ],
            tokens: ["--dss-chip-height", "--dss-chip-padding", "--dss-chip-font-size"],
          },
          composition: {
            files: ["_base.scss", "_layout.scss", "_focus.scss"],
            description: "Estilos base + touch target + focus ring",
            responsibilities: [
              "Base styles com tokens DSS (spacing, typography, motion)",
              "Touch target 48px via ::before (WCAG 2.5.5)",
              "Focus ring tokenizado via ::after",
              "Layout flexbox com gap responsivo",
              "Suporte a prefers-reduced-motion",
            ],
            tokens: ["--dss-spacing-*", "--dss-font-*", "--dss-duration-*"],
          },
          variants: {
            files: ["_filled.scss", "_outline.scss", "_flat.scss"],
            description: "Filled, Outline, Flat com estados",
            responsibilities: [
              "_filled.scss - Background sólido + texto contrastante",
              "_outline.scss - Borda colorida + hover invertido",
              "_flat.scss - Background transparente + hover sutil",
              "Brightness canônicos: 0.85, 0.90, 0.92, 0.95 (light)",
              "Dark mode: 1.10, 1.20 (invertidos)",
            ],
          },
          output: {
            files: ["_brands.scss", "_states.scss"],
            description: "Brands + Dark Mode + High Contrast",
            responsibilities: [
              "brands.scss - Hub (laranja), Water (azul), Waste (verde)",
              "states.scss - Dark mode, high contrast, forced colors",
              "Suporte a prefers-contrast: more",
              "Compatível com Windows High Contrast Mode",
              "5 media queries de acessibilidade",
            ],
          },
        }}
      />
 
       {/* ================================================================
           SEÇÃO 8: DOCUMENTAÇÃO TÉCNICA COLAPSÁVEL
           ================================================================ */}
       <Collapsible>
         <CollapsibleTrigger className="flex items-center gap-2 w-full p-4 rounded-lg border hover:bg-muted/50 transition-colors">
           <ChevronDown className="h-5 w-5" />
           <span className="font-semibold">Documentação Técnica Completa</span>
         </CollapsibleTrigger>
         <CollapsibleContent className="mt-4 space-y-6">
           <Tabs defaultValue="props" className="w-full">
             <TabsList className="grid w-full grid-cols-5">
               <TabsTrigger value="props">Props API</TabsTrigger>
               <TabsTrigger value="events">Eventos</TabsTrigger>
               <TabsTrigger value="slots">Slots</TabsTrigger>
               <TabsTrigger value="tokens">Tokens</TabsTrigger>
               <TabsTrigger value="a11y">Acessibilidade</TabsTrigger>
             </TabsList>
 
             {/* Props API */}
             <TabsContent value="props" className="mt-4">
               <div className="rounded-lg border overflow-hidden">
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
                       <TableCell className="font-mono text-sm">label</TableCell>
                       <TableCell className="font-mono text-xs">String</TableCell>
                       <TableCell className="font-mono text-xs">''</TableCell>
                       <TableCell>Texto do chip</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">variant</TableCell>
                       <TableCell className="font-mono text-xs">'filled' | 'outline' | 'flat'</TableCell>
                       <TableCell className="font-mono text-xs">'filled'</TableCell>
                       <TableCell>Variante visual</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">color</TableCell>
                       <TableCell className="font-mono text-xs">SemanticColor</TableCell>
                       <TableCell className="font-mono text-xs">'primary'</TableCell>
                       <TableCell>Cor semântica DSS</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">size</TableCell>
                       <TableCell className="font-mono text-xs">'xs' | 'sm' | 'md' | 'lg'</TableCell>
                       <TableCell className="font-mono text-xs">'md'</TableCell>
                       <TableCell>Tamanho do chip</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">brand</TableCell>
                       <TableCell className="font-mono text-xs">'hub' | 'water' | 'waste' | null</TableCell>
                       <TableCell className="font-mono text-xs">null</TableCell>
                       <TableCell>Tema de marca (sobrescreve color)</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">round</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">true</TableCell>
                       <TableCell>Bordas completamente arredondadas (pill)</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">square</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">false</TableCell>
                       <TableCell>Bordas quadradas</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">selected</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">false</TableCell>
                       <TableCell>Estado de seleção</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">clickable</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">false</TableCell>
                       <TableCell>Torna o chip clicável</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">removable</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">false</TableCell>
                       <TableCell>Exibe botão de remoção</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">disable</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">false</TableCell>
                       <TableCell>Desabilita o chip</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">dense</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell className="font-mono text-xs">false</TableCell>
                       <TableCell>Versão compacta</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">icon</TableCell>
                       <TableCell className="font-mono text-xs">String</TableCell>
                       <TableCell className="font-mono text-xs">''</TableCell>
                       <TableCell>Ícone à esquerda (Material Icons)</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">icon-right</TableCell>
                       <TableCell className="font-mono text-xs">String</TableCell>
                       <TableCell className="font-mono text-xs">''</TableCell>
                       <TableCell>Ícone à direita</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">aria-label</TableCell>
                       <TableCell className="font-mono text-xs">String</TableCell>
                       <TableCell className="font-mono text-xs">-</TableCell>
                       <TableCell>Label ARIA (obrigatório para icon-only)</TableCell>
                     </TableRow>
                   </TableBody>
                 </Table>
               </div>
             </TabsContent>
 
             {/* Eventos */}
             <TabsContent value="events" className="mt-4">
               <div className="rounded-lg border overflow-hidden">
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Evento</TableHead>
                       <TableHead>Payload</TableHead>
                       <TableHead>Condição</TableHead>
                       <TableHead>Descrição</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     <TableRow>
                       <TableCell className="font-mono text-sm">@click</TableCell>
                       <TableCell className="font-mono text-xs">MouseEvent</TableCell>
                       <TableCell>clickable=true, !disable</TableCell>
                       <TableCell>Emitido ao clicar no chip</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">@remove</TableCell>
                       <TableCell className="font-mono text-xs">MouseEvent</TableCell>
                       <TableCell>removable=true</TableCell>
                       <TableCell>Emitido ao clicar no botão remover</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">@update:selected</TableCell>
                       <TableCell className="font-mono text-xs">Boolean</TableCell>
                       <TableCell>clickable=true</TableCell>
                       <TableCell>Emitido ao alternar seleção (v-model)</TableCell>
                     </TableRow>
                   </TableBody>
                 </Table>
               </div>
             </TabsContent>
 
             {/* Slots */}
             <TabsContent value="slots" className="mt-4">
               <div className="rounded-lg border overflow-hidden">
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Slot</TableHead>
                       <TableHead>Descrição</TableHead>
                       <TableHead>Uso Recomendado</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     <TableRow>
                       <TableCell className="font-mono text-sm">default</TableCell>
                       <TableCell>Conteúdo principal do chip</TableCell>
                       <TableCell>Label com formatação HTML customizada</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">icon</TableCell>
                       <TableCell>Ícone customizado à esquerda</TableCell>
                       <TableCell>SVG, Font Awesome, Ionicons</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">icon-right</TableCell>
                       <TableCell>Ícone customizado à direita</TableCell>
                       <TableCell>SVG, Font Awesome, Ionicons</TableCell>
                     </TableRow>
                     <TableRow>
                       <TableCell className="font-mono text-sm">icon-remove</TableCell>
                       <TableCell>Ícone do botão remover</TableCell>
                       <TableCell>SVG customizado</TableCell>
                     </TableRow>
                   </TableBody>
                 </Table>
               </div>
             </TabsContent>
 
             {/* Tokens */}
             <TabsContent value="tokens" className="mt-4">
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="rounded-lg border p-4">
                   <h4 className="font-semibold mb-3">Compact Control Heights</h4>
                   <div className="space-y-2 text-sm font-mono">
                     <div>--dss-compact-control-height-xs: 20px</div>
                     <div>--dss-compact-control-height-sm: 24px</div>
                     <div>--dss-compact-control-height-md: 28px</div>
                     <div>--dss-compact-control-height-lg: 32px</div>
                   </div>
                 </div>
                 <div className="rounded-lg border p-4">
                   <h4 className="font-semibold mb-3">Touch Target (WCAG 2.5.5)</h4>
                   <div className="space-y-2 text-sm font-mono">
                     <div>--dss-touch-target-min: 48px</div>
                     <div className="text-muted-foreground text-xs mt-2">
                       Implementado via ::before no root com pointer-events: none
                     </div>
                   </div>
                 </div>
                 <div className="rounded-lg border p-4">
                   <h4 className="font-semibold mb-3">Motion</h4>
                   <div className="space-y-2 text-sm font-mono">
                     <div>--dss-duration-150</div>
                     <div>--dss-duration-200</div>
                     <div>--dss-easing-standard</div>
                   </div>
                 </div>
                 <div className="rounded-lg border p-4">
                   <h4 className="font-semibold mb-3">Opacity</h4>
                   <div className="space-y-2 text-sm font-mono">
                     <div>--dss-opacity-disabled: 0.4</div>
                     <div>--dss-opacity-hover: 0.08</div>
                     <div>--dss-opacity-active: 0.12</div>
                   </div>
                 </div>
               </div>
             </TabsContent>
 
             {/* Acessibilidade */}
             <TabsContent value="a11y" className="mt-4">
               <div className="space-y-4">
                 <div className="rounded-lg border overflow-hidden">
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
                         <TableCell>1.4.3 Contraste (Mínimo)</TableCell>
                         <TableCell>AA</TableCell>
                         <TableCell><Badge variant="outline" className="bg-green-500/10 text-green-600">✓ Pass</Badge></TableCell>
                         <TableCell>Combinações ≥ 4.5:1</TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>2.1.1 Teclado</TableCell>
                         <TableCell>A</TableCell>
                         <TableCell><Badge variant="outline" className="bg-green-500/10 text-green-600">✓ Pass</Badge></TableCell>
                         <TableCell>Tab, Enter, Space, Delete</TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>2.4.7 Foco Visível</TableCell>
                         <TableCell>AA</TableCell>
                         <TableCell><Badge variant="outline" className="bg-green-500/10 text-green-600">✓ Pass</Badge></TableCell>
                         <TableCell>Focus ring 3px tokenizado</TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>2.5.5 Tamanho do Alvo</TableCell>
                         <TableCell>AAA</TableCell>
                         <TableCell><Badge variant="outline" className="bg-green-500/10 text-green-600">✓ Pass</Badge></TableCell>
                         <TableCell>Touch target 48px via ::before</TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>4.1.2 Nome, Função, Valor</TableCell>
                         <TableCell>A</TableCell>
                         <TableCell><Badge variant="outline" className="bg-green-500/10 text-green-600">✓ Pass</Badge></TableCell>
                         <TableCell>role="option", aria-selected, aria-disabled</TableCell>
                       </TableRow>
                     </TableBody>
                   </Table>
                 </div>
 
                 <div className="p-4 rounded-lg border" style={{ borderColor: "var(--dss-info)" }}>
                   <h4 className="font-semibold mb-2 flex items-center gap-2">
                     <Info size={16} /> Media Queries Suportadas
                   </h4>
                   <ul className="text-sm space-y-1" style={{ color: "var(--jtech-text-body)" }}>
                     <li>• <code>prefers-reduced-motion: reduce</code> - Desativa animações</li>
                     <li>• <code>prefers-contrast: more</code> - Aumenta saturação</li>
                     <li>• <code>forced-colors: active</code> - Windows High Contrast</li>
                     <li>• <code>prefers-color-scheme: dark</code> - Dark mode</li>
                   </ul>
                 </div>
               </div>
             </TabsContent>
           </Tabs>
         </CollapsibleContent>
       </Collapsible>
 
       {/* ================================================================
           SEÇÃO 9: DOCUMENTED EXCEPTIONS (DSS v2.2)
           ================================================================ */}
       <div
         className="p-5 rounded-lg border"
         style={{
           backgroundColor: "var(--jtech-card-bg)",
           borderColor: "var(--dss-info)",
         }}
       >
         <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-info)" }}>
           <Info size={18} /> Documented Exceptions (Selo DSS v2.2)
         </h3>
         <div className="space-y-3 text-sm" style={{ color: "var(--jtech-text-body)" }}>
           <div>
             <strong>Valores de Brightness (não tokenizados):</strong>
             <ul className="mt-1 ml-4">
               <li>• Light mode: 0.85, 0.90, 0.92, 0.95</li>
               <li>• Dark mode: 1.10, 1.20</li>
               <li className="text-muted-foreground">Justificativa: Valores canônicos de feedback visual</li>
             </ul>
           </div>
           <div>
             <strong>Touch Target via ::before:</strong>
             <ul className="mt-1 ml-4">
               <li>• Pseudo-elemento invisível para área de toque</li>
               <li>• Convenção obrigatória: ::before = touch target, ::after = efeitos visuais</li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   );
 }