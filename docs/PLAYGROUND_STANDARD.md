# 📋 PLAYGROUND STANDARD v3.0

## Padrão Declarativo e AI‑First para Playgrounds de Componentes DSS

Este documento define o **contrato obrigatório, declarativo e não‑interpretativo** para todos os playgrounds de documentação de componentes do **Design System Sansys (DSS)**.

> ⚠️ Este documento **não é um guideline visual**.
> Ele é um **contrato de implementação** entre:
>
> * o Design System
> * a engine de Playground
> * e a AI da plataforma (Lovable)

Qualquer desvio deste contrato é considerado **erro de implementação**.

---

## 🧭 Golden Reference

**Golden Sample:** `DssButtonPage.tsx`

Toda decisão estrutural, comportamental ou visual do playground deve ser compatível com este padrão.

---

## 🎯 Objetivos do Playground DSS

O playground **não é uma demo**.

Ele deve:

* simular **uso real de produção**
* gerar **código funcional e confiável**
* refletir **100% da API real do componente**
* expor **estados visuais, comportamentais e de acessibilidade**
* manter **consistência absoluta entre páginas**

---

## 🧠 Princípios Fundamentais

1. **Declarativo acima de tudo**
   Nenhuma página decide layout, lógica ou estrutura.

2. **Single Source of Truth**
   O `playgroundConfig` é a única fonte válida de verdade.

3. **Zero interpretação da AI**
   A AI executa. Ela não decide.

4. **Código de produção**
   Tudo que é copiado deve funcionar em um projeto real.

5. **Consistência > Flexibilidade**

---

## 🧱 Arquitetura Oficial

```
src/components/ui/playground/
├── engine/
│   ├── PlaygroundEngine.tsx
│   ├── stateManager.ts
│   ├── codeGenerator.ts
│   └── validators.ts
│
├── layout/
│   ├── PlaygroundLayout.tsx
│   └── sections.ts
│
├── controls/
│   ├── VariantSelector
│   ├── SizeSelector
│   ├── ColorSelector
│   ├── BrandSelector
│   ├── StateToggleGroup
│   └── SlotEditor
│
├── preview/
│   ├── PreviewRenderer.tsx
│   └── PreviewFallback.tsx
│
├── types.ts
└── index.ts
```

---

## 🧩 Playground Config (Obrigatório)

Cada página de componente **DEVE** exportar um único objeto:

```ts
export const playgroundConfig: PlaygroundConfig;
```

A página **NÃO DEVE**:

* criar estado manual
* criar lógica de exclusividade
* montar layout
* gerar código

---

## 🧬 Tipagem Base

```ts
interface PlaygroundConfig {
  componentName: string;
  level: "basic" | "standard" | "advanced";

  layout: PlaygroundLayoutConfig;
  preview: PreviewConfig;
  globals: GlobalControlsConfig;

  sectionOrder: PlaygroundSection[];

  props: Record<string, PlaygroundPropConfig>;
  visualStates?: VisualStatesConfig;
}
```

---

## 📐 Layout Canônico (ÚNICO)

### Estrutura Oficial

```
┌──────────────────────────────────────────────┐
│ CONTROLS ZONE (topo, fixa)                   │
│ Grid horizontal obrigatório (mín. 4 cols)   │
└──────────────────────────────────────────────┘

┌───────────────────────────────┬──────────────┐n│                               │              │
│        PREVIEW PANEL          │  CODE PANEL  │
│   (área prioritária maior)    │              │
│   com título obrigatório      │  com título  │
│                               │              │
└───────────────────────────────┴──────────────┘
```

### Contrato Declarativo

```
┌──────────────────────────────────────────────┐
│ CONTROLS ZONE (topo, fixa)                   │
└──────────────────────────────────────────────┘

┌───────────────────────────────┬──────────────┐
│                               │              │
│        PREVIEW AREA           │  CODE AREA   │
│   (área prioritária maior)    │              │
│                               │              │
└───────────────────────────────┴──────────────┘
```

### Contrato Declarativo

```ts
layout: {
  structure: "controls-top-preview-bottom",

  controls: {
    position: "top",
    layout: "grid",
    minColumns: 4,
    maxColumns: 6,
    wrap: true,
    avoidVerticalStack: true
  },

  content: {
    orientation: "horizontal",

    previewArea: {
      widthRatio: 0.7,
      minHeight: 360
    },

    codeArea: {
      widthRatio: 0.3,
      maxHeight: 240
    }
  }
}
```

---

## 🤖 AI Layout Rules (MANDATORY)

* AI MUST render controls **only at the top**

* AI MUST render controls in a **horizontal grid layout**

* AI MUST ensure a minimum of **4 selectors per row** when space allows

* AI MUST NOT stack selectors vertically when horizontal space exists

* AI MUST render Preview and Code as **semantic panels**

* AI MUST render a **title/header** for Preview Panel and Code Panel

* AI MUST align Preview Panel and Code Panel by top edge

* AI MUST NOT decide layout variations

* AI MUST render controls **only at the top**

* AI MUST NOT render controls on left or right

* AI MUST render Preview and Code **side by side below controls**

* Preview MUST be visually larger than Code

* AI MUST NOT decide layout variations

---

## 🎛️ Ordem Oficial das Seções

A ordem **NUNCA** pode variar:

```ts
sectionOrder: [
  "variant",
  "size",
  "color",
  "brand",
  "visualStates",
  "behavior",
  "slots"
]
```

---

## 🎨 Color × Brand (Exclusividade Total)

### Regra Sistêmica

* `color` e `brand` são **mutuamente exclusivos**
* **NÃO EXISTE** botão "nenhum"
* ausência de seleção é implícita
* estados nulos **não são representados por UI**

### Contrato

```ts
color: {
  type: "semanticColor",
  exclusiveWith: "brand"
},

brand: {
  type: "brand",
  exclusiveWith: "color",
  ui: {
    showNoneOption: false,
    forbidNoneOption: true
  }
}
```

---

## 🎯 Estados Visuais e Acessibilidade

Estados **não são opcionais**.

```ts
visualStates: {
  focus: { supported: true },
  hover: { supported: true },
  active: { supported: true },
  focusVisible: { supported: true },
  disabled: { supported: true }
}
```

AI MUST expose **all supported visual states** as controls or preview modes.

---

## 🟢 Padrão Único de Seleção

* **Todo estado selecionado usa semântica POSITIVE (verde)**
* Não existe vermelho para seleção

```ts
selectionStyle: {
  activeColor: "positive"
}
```

---

## 👁️ Preview

```ts
preview: {
  mode: "single" | "variants" | "states",
  fallbackOnInvalidState: true,
  allowScroll: true,
  allowZoom: true
}
```

O componente **NUNCA pode desaparecer**.

---

## 🧾 Código Gerado (Fonte de Verdade)

O código é **produção real**.

⚠️ Elementos de debug ou metadados auxiliares são **explicitamente proibidos**.

```ts
codeGeneration: {
  mode: "production",
  omitDefaults: true,
  validateAgainstTypes: true,
  sourceOfTruth: "component-api",
  forbidTokenMetadataUI: true
}
```

### Regras

* Código deve compilar
* Código deve funcionar
* Código deve refletir estado atual
* Exclusividades respeitadas

---

## ❌ Itens Proibidos

* Botão "nenhum" (em qualquer seletor)

* Qualquer UI representando estado nulo

* Token debug, token label ou metadata abaixo do código

* Layout empilhado de seletores quando houver espaço horizontal

* Preview sem título

* Código sem título

* Layout alternativo

* Preview invisível

* Estado inválido silencioso

* Botão "nenhum"

* Token debug abaixo do código

* Layout alternativo

* Preview invisível

* Estado inválido silencioso

---

## ✅ Checklist de Validação Automática

* Layout canônico aplicado
* Ordem das seções correta
* Exclusividade Color × Brand
* Estados visuais expostos
* Código funcional
* Seleção sempre verde

---

## 🧠 Conclusão

O Playground DSS é um **simulador de contrato de componente**.

Ele existe para:

* ensinar
* validar
* confiar

Não para improvisar.

---

**Versão:** 3.0
**Status:** Declarative • AI‑First • DSS Fase 2 Ready
**Autor:** Design System Sansys Team
