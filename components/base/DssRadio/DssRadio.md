# DssRadio — Documentacao Principal

**Versao:** 1.0.0
**Status:** Pre-normativo em processo de conformidade DSS v2.2
**Classificacao:** Compact Control interativo — Form / Selection
**Golden Component de referencia:** DssCheckbox (arquitetura, estados, tokens, acessibilidade)
**Golden Component secundario:** DssChip (touch target, pseudo-elementos, contrastes)
**Data:** 04 de Fevereiro de 2026

---

## 1. Definicao

O DssRadio e um componente de selecao exclusiva (mutuamente exclusivo) dentro de um grupo. Permite ao usuario escolher exatamente uma opcao entre varias alternativas. Quando um radio e selecionado, qualquer outro radio do mesmo grupo e automaticamente desmarcado.

### Subset controlado

Este componente implementa um **subset controlado da API do Quasar q-radio**. Nao replica a API completa.

**Diferencias em relacao ao q-radio:**

| Funcionalidade | q-radio (Quasar) | DssRadio (DSS) | Justificativa |
|----------------|------------------|----------------|---------------|
| `keep-color` | Sim | Nao | Cor controlada exclusivamente via sistema DSS |
| `checked-icon` / `unchecked-icon` | Sim | Nao | Indicador visual padronizado (circulo preenchido) |
| `QOptionGroup` integration | Sim | Nao | Agrupamento via prop `name` (nativo HTML) |
| `dark` prop | Sim | Nao | Dark mode via `prefers-color-scheme` (automatico) |
| `dense` | Sim | Sim (reduz gap, altura e fonte; remove touch target expandido) | Conformidade WCAG contextual |
| Cores inline | Sim | Nao | Cores via classes utilitarias ou sistema de brands |

---

## 2. Responsabilidades

### O que o DssRadio faz:
- Exibe um controle circular de selecao exclusiva
- Gerencia estado checked via v-model
- Agrupa radios nativamente via prop `name`
- Aplica cores semanticas DSS e brandabilidade Sansys
- Implementa touch target WCAG 2.5.5 via `::before`
- Suporta 4 tamanhos (xs, sm, md, lg) com tokens genericos
- Implementa estados: default, hover, active, focus-visible, checked, disabled, error
- Suporta acessibilidade completa (WCAG 2.1 AA)

### O que o DssRadio NAO faz:
- Nao gerencia logica de grupo (responsabilidade do contexto via `name`)
- Nao implementa icones customizados no indicador
- Nao aplica cores via CSS inline
- Nao replica a API completa do q-radio
- Nao implementa estado indeterminate (inaplicavel a radios)

---

## 3. Arquitetura

```
DssRadio/
├── 1-structure/
│   └── DssRadio.ts.vue          Layer 1: TypeScript + Composition API
├── 2-composition/
│   └── _base.scss               Layer 2: Tokens genericos, layout, altura
├── 3-variants/
│   └── index.scss               Layer 3: Vazio na Fase 1 (obrigatorio)
├── 4-output/
│   ├── _brands.scss             Layer 4: Hub/Water/Waste
│   ├── _states.scss             Layer 4: Dark, contrast, forced-colors
│   └── index.scss               Barrel import
├── composables/
│   ├── index.ts                 Barrel export
│   └── useRadioClasses.ts       Geracao de classes CSS
├── types/
│   └── radio.types.ts           Interfaces TypeScript
├── DssRadio.module.scss         Orquestrador (3 @use imports)
├── DssRadio.vue                 Entry point (re-export puro)
├── DssRadio.example.vue         Exemplos / Showcase
├── DssRadio.test.ts             Testes unitarios
├── index.js                     API publica
└── dss.meta.json                Metadados DSS
```

### Camadas

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| **Layer 1** | `1-structure/DssRadio.ts.vue` | Template HTML, logica Vue, ARIA |
| **Layer 2** | `2-composition/_base.scss` | Tokens, layout, tamanhos, estados base |
| **Layer 3** | `3-variants/index.scss` | Vazio (controle atomico sem variantes visuais) |
| **Layer 4** | `4-output/_states.scss` | Dark mode, reduced motion, high contrast, forced-colors, print |
| **Layer 4** | `4-output/_brands.scss` | Hub, Water, Waste (3 brands x 3 cores) |

---

## 4. Contrato (Props / Eventos / Slots)

### 4.1 Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `modelValue` | `any` | `undefined` | Valor atual do grupo (v-model) |
| `val` | `any` | `undefined` | Valor que este radio representa |
| `name` | `string` | `undefined` | Nome do grupo (agrupa radios nativamente) |
| `label` | `string` | `undefined` | Texto do label |
| `leftLabel` | `boolean` | `false` | Posicionar label a esquerda |
| `color` | `RadioColor` | `'primary'` | Cor semantica do indicador |
| `size` | `RadioSize` | `'md'` | Tamanho do controle |
| `disable` | `boolean` | `false` | Estado desabilitado |
| `dense` | `boolean` | `false` | Modo compacto: reduz gap, altura e tamanho da fonte, e remove touch target expandido |
| `error` | `boolean` | `false` | Estado de erro |
| `errorMessage` | `string` | `undefined` | Mensagem de erro |
| `brand` | `RadioBrand \| null` | `null` | Brand Sansys |
| `tabindex` | `number \| string \| null` | `null` | Indice de tabulacao |
| `ariaLabel` | `string` | `undefined` | Label acessivel |

### 4.2 Eventos

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido ao selecionar este radio. Payload = `val` |

### 4.3 Slots

| Slot | Descricao | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteudo customizado do label | Texto rico, icones inline |

### 4.4 Expose

| Metodo/Ref | Tipo | Descricao |
|------------|------|-----------|
| `inputRef` | `Ref<HTMLInputElement>` | Referencia ao input nativo |
| `focus()` | `() => void` | Foca o input programaticamente |
| `blur()` | `() => void` | Remove foco do input |

---

## 5. Touch Target

**Estrategia:** Componente INTERATIVO — Opcao A

| Propriedade | Valor | Token |
|-------------|-------|-------|
| **Altura visual** | 28px (md) | `--dss-compact-control-height-md` |
| **Touch target** | 48px | `--dss-touch-target-min` |
| **Implementacao** | `::before` no elemento raiz | Pseudo-elemento reservado |

- Touch target implementado via `::before` com `min-width` e `min-height` de 48px
- `pointer-events: none` para nao interceptar cliques
- Centralizado absolutamente com `transform: translate(-50%, -50%)`
- Modo `dense` desativa touch target expandido (`display: none` no `::before`)

---

## 6. Pseudo-elementos

| Pseudo-elemento | Uso neste componente | Finalidade |
|-----------------|----------------------|------------|
| `::before` | Utilizado | Touch target (WCAG 2.5.5) |
| `::after` | Nao utilizado | — |

Convencao oficial DSS (CLAUDE.md, vinculante):
- `::before` → **RESERVADO** exclusivamente para touch target
- `::after` → Efeitos visuais (hover, active, selected overlays)

O indicador de selecao (circulo preenchido) e implementado como elemento real `<span class="dss-radio__dot">`, nao como pseudo-elemento. Padrao consistente com DssCheckbox.

---

## 7. Tokens Utilizados

### Tokens Genericos (sem tokens especificos de componente)

| Categoria | Token | Uso |
|-----------|-------|-----|
| **Altura** | `--dss-compact-control-height-xs` | min-height XS (20px) |
| **Altura** | `--dss-compact-control-height-sm` | min-height SM (24px) |
| **Altura** | `--dss-compact-control-height-md` | min-height MD (28px) |
| **Altura** | `--dss-compact-control-height-lg` | min-height LG (32px) |
| **Touch Target** | `--dss-touch-target-min` | Area clicavel minima (48px) |
| **Spacing** | `--dss-spacing-0_5` | Focus outline offset (2px) |
| **Spacing** | `--dss-spacing-1` | Gap XS, margem erro (4px) |
| **Spacing** | `--dss-spacing-1_5` | Gap SM (6px) |
| **Spacing** | `--dss-spacing-2` | Gap MD, dot SM (8px) |
| **Spacing** | `--dss-spacing-2_5` | Dot MD (10px) |
| **Spacing** | `--dss-spacing-3` | Gap LG, dot LG (12px) |
| **Spacing** | `--dss-spacing-4` | Controle XS (16px) |
| **Spacing** | `--dss-spacing-5` | Controle MD/SM (20px) |
| **Spacing** | `--dss-spacing-6` | Controle LG (24px) |
| **Tipografia** | `--dss-font-family-sans` | Fonte do label |
| **Tipografia** | `--dss-font-size-xs` | Label XS/SM, erro (12px) |
| **Tipografia** | `--dss-font-size-sm` | Label MD (14px) |
| **Tipografia** | `--dss-font-size-md` | Label LG (16px) |
| **Tipografia** | `--dss-line-height-normal` | Altura de linha |
| **Bordas** | `--dss-border-width-md` | Borda do controle, focus ring |
| **Bordas** | `--dss-border-width-thick` | High contrast (borda e focus) |
| **Motion** | `--dss-duration-200` | Transicoes (todos os estados) |
| **Motion** | `--dss-easing-standard` | Curva de animacao |
| **Opacidade** | `--dss-opacity-disabled` | Estado desabilitado (0.4) |
| **Opacidade** | `--dss-opacity-50` | High contrast disabled |
| **Focus** | `--dss-focus-ring` | Cor do outline de foco |
| **Cor** | `--dss-text-primary` | Cor do texto (label) |
| **Cor** | `--dss-error-600` | Estado de erro |
| **Cor** | `--dss-error-400` | Erro em dark mode |
| **Cor** | `--dss-gray-200` | Texto em dark mode |
| **Cor** | `--dss-gray-400` | Borda em dark mode |
| **Brand** | `--dss-hub-{primary,secondary,accent}` | Cores Hub |
| **Brand** | `--dss-water-{primary,secondary,accent}` | Cores Water |
| **Brand** | `--dss-waste-{primary,secondary,accent}` | Cores Waste |

---

## 8. Estados

| Estado | Aparencia | Interacao | Tokens / Regras CSS | Notas |
|--------|-----------|-----------|---------------------|-------|
| **Default** | Circulo vazio com borda | Clicavel | `border: var(--dss-border-width-md) solid currentColor` | — |
| **Hover** | Escurecimento sutil | Clicavel | `filter: brightness(0.95)` | WCAG 1.4.1 |
| **Focus** | Outline visivel | Via teclado | `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` | WCAG 2.4.7 |
| **Active / Pressed** | Escurecimento intenso | Click/touch | `filter: brightness(0.90)` | — |
| **Checked** | Circulo interno preenchido | Selecao unica | `border-color: currentColor` + `.dss-radio__dot` | — |
| **Disabled** | Opacidade reduzida | Nao interativo | `opacity: var(--dss-opacity-disabled)` | `aria-disabled` |
| **Error** | Borda e texto vermelhos | Clicavel | `color: var(--dss-error-600)` | `aria-invalid`, `role="alert"` |
| **Loading** | Nao aplicavel | — | — | Radio nao suporta loading |

---

## 9. Acessibilidade

### 9.1 Conformidade WCAG

| Criterio WCAG | Nivel | Aplicacao no Componente | Status |
|---------------|-------|-------------------------|--------|
| 2.5.5 Target Size | AA | Touch target 48px via `::before` | Implementado |
| 2.4.7 Focus Visible | AA | Outline com `--dss-focus-ring` | Implementado |
| 1.4.3 Contrast (Minimum) | AA | Cores semanticas DSS | Implementado |
| 1.3.1 Info and Relationships | A | `<label>` nativo, `<input type="radio">` | Implementado |
| 4.1.2 Name, Role, Value | A | `aria-checked`, `aria-disabled`, `aria-invalid` | Implementado |
| 3.3.1 Error Identification | A | `role="alert"`, `aria-live="assertive"`, `aria-describedby` | Implementado |
| 2.1.1 Keyboard | A | Tab, Shift+Tab, setas (nativo) | Implementado |

### 9.2 Navegacao por Teclado

| Tecla | Acao |
|-------|------|
| `Tab` | Move foco para o grupo de radios |
| `Shift+Tab` | Move foco para elemento anterior |
| `Setas (cima/baixo, esquerda/direita)` | Navega entre radios do mesmo grupo (nativo) |
| `Space` | Seleciona o radio focado (nativo) |

### 9.3 Media Queries

| Media Query | Comportamento |
|-------------|---------------|
| `prefers-reduced-motion: reduce` | `transition: none !important` em todos os elementos |
| `prefers-contrast: more` | Bordas e focus mais grossos, `saturate(1.2)`, disabled com `line-through` |
| `forced-colors: active` | System keywords: `ButtonText`, `Highlight`, `HighlightText`, `GrayText`, `ButtonFace`, `LinkText` |
| `print` | Sem filtros, bordas `currentColor`, sem touch target |

---

## 10. Excepcoes Documentadas

| ID | Valor | Localizacao | Justificativa |
|----|-------|-------------|---------------|
| EXC-01 | `brightness(0.95)` | `_base.scss` | Valor canonico DSS para hover light mode |
| EXC-02 | `brightness(0.90)` | `_base.scss` | Valor canonico DSS para active light mode |
| EXC-03 | `brightness(1.10)` | `_states.scss` | Valor canonico DSS para hover dark mode |
| EXC-04 | `brightness(1.20)` | `_states.scss` | Valor canonico DSS para active dark mode |
| EXC-05 | `saturate(1.2)` | `_states.scss` | Valor canonico DSS para high contrast |
| EXC-06 | `2px`, `3px` | `_states.scss` | Tokens ignorados em `forced-colors: active` (system keywords) |
| EXC-07 | `border-radius: 50%` | `_base.scss` | Forma circular inerente ao componente (nao tokenizavel) |

---

## 11. Anti-patterns

### 11.1 Usos Incorretos

#### 1. Radio sem prop `name`

**Problema:** Usar DssRadio sem a prop `name` impede agrupamento nativo.

```vue
<!-- INCORRETO -->
<DssRadio v-model="val" val="a" label="A" />
<DssRadio v-model="val" val="b" label="B" />

<!-- CORRETO -->
<DssRadio v-model="val" val="a" name="grupo" label="A" />
<DssRadio v-model="val" val="b" name="grupo" label="B" />
```

**Por que:** Sem `name`, a navegacao por setas entre radios do grupo nao funciona (WCAG 2.1.1).

#### 2. Radio isolado (selecao unica sem alternativas)

**Problema:** Usar um unico DssRadio sem alternativas.

```vue
<!-- INCORRETO: radio sem alternativa -->
<DssRadio v-model="accept" val="yes" label="Aceito os termos" />

<!-- CORRETO: usar DssCheckbox para selecao booleana -->
<DssCheckbox v-model="accept" label="Aceito os termos" />
```

**Por que:** Radio e semanticamente para selecao exclusiva entre 2+ opcoes. Para booleanos, usar DssCheckbox.

#### 3. Aplicar cores via CSS inline

**Problema:** Tentar definir cores diretamente no style.

```vue
<!-- INCORRETO -->
<DssRadio style="color: #ff0000" />

<!-- CORRETO -->
<DssRadio color="negative" />
<DssRadio brand="hub" color="primary" />
```

**Por que:** Cores devem seguir o sistema de tokens DSS. CSS inline ignora brandabilidade e acessibilidade.

### 11.2 Combinacoes Nao Permitidas

| Combinacao | Por que | Alternativa |
|------------|---------|-------------|
| `brand` + CSS inline colors | Conflito de fontes de cor | Use apenas `brand` ou `color` |
| `disable` + `error` | Estados conflitantes | Use apenas `disable` |
| Radio sem `name` em grupo | Navegacao por teclado quebrada | Sempre definir `name` |
| Radio isolado (sem grupo) | Semantica incorreta | Usar DssCheckbox |

---

## 12. Decisoes Arquiteturais

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssCheckbox | Mesma categoria (form control), mesma arquitetura |
| Indicador visual | `<span>` real | Consistencia com DssCheckbox (nao pseudo-elemento) |
| Touch target | 48px via `::before` | WCAG 2.5.5, mesmo padrao DssCheckbox/DssChip |
| Sem variantes (Layer 3) | Fase 1 atomico | Controle unico, sem variantes visuais |
| Cores sem brand | Classes utilitarias Quasar | `text-primary`, `text-secondary` etc. |
| Cores com brand | `_brands.scss` via mixin | 3 brands x 3 cores, sem duplicacao |
| Estado indeterminate | Nao aplicavel | Declarado explicitamente (radios nao suportam) |
| Agrupamento | Prop `name` (nativo HTML) | Sem dependencia de QOptionGroup |
| Estado error | Prop explicita | Permite validacao de formulario |

---

## 13. Classificacao DSS v2.2

| Aspecto | Valor |
|---------|-------|
| **Tipo** | Compact Control interativo |
| **Touch target obrigatorio** | Sim (WCAG 2.5.5) |
| **Tokens de altura** | `--dss-compact-control-height-{xs,sm,md,lg}` |
| **Estados mandatorios** | default, hover, active, focus, checked, disabled |
| **Pseudo-elementos** | `::before` = touch target |
| **Fase** | Fase 1 (atomico) |
| **Status normativo** | Pre-normativo |

---

## Imutabilidade

Este documento e versionado e pode ser atualizado conforme o componente evolui. Cada alteracao DEVE ser registrada no DOCUMENTATION_CHANGELOG.md. A emissao de um Selo DSS v2.2 torna a versao auditada imutavel.
