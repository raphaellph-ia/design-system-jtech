# Q-BTN - Especificação Completa e Exaustiva

> **📅 Data:** Janeiro 2025
> **🎯 Objetivo:** Documentar 100% do componente q-btn do Quasar Framework
> **📖 Fonte:** Quasar Framework v2.18.6
> **🔗 Repositório:** https://github.com/quasarframework/quasar

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura Interna](#arquitetura-interna)
3. [Props Completas (29 props)](#props-completas)
4. [Slots (2 slots)](#slots)
5. [Eventos (5 eventos)](#eventos)
6. [Métodos Públicos (1 método)](#métodos-públicos)
7. [Composables Internos](#composables-internos)
8. [Sistema de Estilos](#sistema-de-estilos)
9. [Sistema de Navegação](#sistema-de-navegação)
10. [Efeito Ripple](#efeito-ripple)
11. [Estados e Comportamentos](#estados-e-comportamentos)
12. [Renderização Interna](#renderização-interna)
13. [Acessibilidade](#acessibilidade)
14. [Gaps Identificados vs DSS](#gaps-identificados-vs-dss)

---

## 🎯 Visão Geral

### Descrição Oficial
> "QBtn is a button with a few extra useful features"

### Características Principais
- ✅ Duas formas: retângulo (padrão) e redondo
- ✅ Efeito ripple material integrado (pode ser desativado)
- ✅ Estado de carregamento com spinner
- ✅ Emissão de evento `@click` quando clicado ou tocado
- ✅ Integração nativa com Vue Router
- ✅ Suporte a links `<a>` nativos
- ✅ Suporte a form submission
- ✅ 29 props totais

### Arquivos do Componente

```
ui/src/components/btn/
├── QBtn.js           # Componente principal (344 linhas)
├── QBtn.json         # Especificação API
├── use-btn.js        # Composable principal (244 linhas)
└── use-btn.json      # Especificação props
```

---

## 🏗️ Arquitetura Interna

### Estrutura de Herança

```
QBtn (QBtn.js)
  ├── Mixins
  │   └── use-btn (use-btn.js)
  │       ├── useSize (use-size.js)
  │       ├── useAlign (use-align.js)
  │       └── useRouterLink (use-router-link.js)
  │
  ├── Components
  │   ├── QIcon (ícones)
  │   └── QSpinner (loading)
  │
  └── Directives
      └── Ripple (efeito material)
```

### Imports Completos do QBtn.js

```javascript
import { h, ref, computed, Transition, onBeforeUnmount, withDirectives, getCurrentInstance } from 'vue'

import QIcon from '../icon/QIcon.js'
import QSpinner from '../spinner/QSpinner.js'

import Ripple from '../../directives/ripple/Ripple.js'

import useBtn, { useBtnProps } from './use-btn.js'

import { createComponent } from '../../utils/private.create/create.js'
import { hMergeSlot } from '../../utils/private.render/render.js'
import { stop, prevent, stopAndPrevent, listenOpts } from '../../utils/event/event.js'
import { isKeyCode } from '../../utils/private.keyboard/key-composition.js'
```

---

## 📌 Props Completas (29 props)

### Props Diretas do QBtn (3 props)

#### 1. `percentage`
```json
{
  "type": "Number",
  "description": "Percentage (0.0 < x < 100.0); To be used along 'loading' prop; Display a progress bar on the background",
  "category": "behavior",
  "examples": [
    ":percentage=\"25\"",
    ":percentage=\"progressValue\""
  ]
}
```

#### 2. `darkPercentage`
```json
{
  "type": "Boolean",
  "description": "Progress bar on the background should have dark color; To be used along with 'percentage' and 'loading' props",
  "category": "behavior",
  "default": false
}
```

#### 3. `round`
```json
{
  "type": "Boolean",
  "description": "Makes a circle shaped button",
  "category": "style",
  "default": false
}
```

### Props do use-btn (26 props)

#### 4. `type`
```json
{
  "type": "String",
  "default": "'button'",
  "values": ["a", "submit", "button", "reset", "image/png", "...MIME types"],
  "description": "Define o tipo nativo do botão ou renderização"
}
```

**Valores Especiais:**
- `'button'`: Botão padrão sem ação
- `'submit'`: Envia formulário
- `'reset'`: Reseta formulário
- `'a'`: Renderiza como tag `<a>`
- **MIME types** (ex: `'image/png'`): Define tipo de link

#### 5-6. `to` / `replace`
```json
{
  "to": {
    "type": "String | Object",
    "description": "Navegação Vue Router",
    "examples": [
      "to=\"/home/dashboard\"",
      ":to=\"{ name: 'my-route-name' }\""
    ]
  },
  "replace": {
    "type": "Boolean",
    "description": "Substitui histórico de navegação (router.replace ao invés de router.push)"
  }
}
```

#### 7-8. `href` / `target`
```json
{
  "href": {
    "type": "String",
    "description": "Link nativo (prioridade sobre 'to')",
    "addedIn": "v2.4",
    "examples": ["href=\"https://example.com\""]
  },
  "target": {
    "type": "String",
    "values": ["_blank", "_self", "_parent", "_top"],
    "description": "Atributo target do link",
    "addedIn": "v2.4"
  }
}
```

#### 9-10. `label` / `icon` / `iconRight`
```json
{
  "label": {
    "type": "Number | String",
    "description": "Texto exibido no botão",
    "examples": ["label=\"Click me\"", ":label=\"count\""]
  },
  "icon": {
    "type": "String",
    "description": "Ícone à esquerda (Material Icons)",
    "examples": ["icon=\"add\"", "icon=\"home\""]
  },
  "iconRight": {
    "type": "String",
    "description": "Ícone à direita (Material Icons)",
    "examples": ["icon-right=\"arrow_forward\""]
  }
}
```

#### 11-15. Design Options (flat, outline, push, unelevated, rounded)
```json
{
  "flat": {
    "type": "Boolean",
    "description": "Design plano sem sombra e sem background preenchido"
  },
  "outline": {
    "type": "Boolean",
    "description": "Design com contorno (borda colorida, fundo transparente)"
  },
  "push": {
    "type": "Boolean",
    "description": "Design elevado com efeito de profundidade"
  },
  "unelevated": {
    "type": "Boolean",
    "description": "Remove sombra do botão filled"
  },
  "rounded": {
    "type": "Boolean",
    "description": "Borda arredondada proeminente"
  }
}
```

**Regra de Precedência:**
1. `flat` → Retorna 'flat'
2. `outline` → Retorna 'outline'
3. `push` → Retorna 'push'
4. `unelevated` → Retorna 'unelevated'
5. Nenhum → Retorna 'standard'

Código fonte da lógica:
```javascript
export function getBtnDesign (props, defaultValue) {
  if (props.flat === true) return 'flat'
  if (props.outline === true) return 'outline'
  if (props.push === true) return 'push'
  if (props.unelevated === true) return 'unelevated'
  return defaultValue
}
```

#### 16-18. Shape Options (square, glossy, fab, fabMini)
```json
{
  "square": {
    "type": "Boolean",
    "description": "Formato quadrado (bordas retas)",
    "addedIn": "v2.7.6"
  },
  "glossy": {
    "type": "Boolean",
    "description": "Efeito brilhante/glossy"
  },
  "fab": {
    "type": "Boolean",
    "description": "Floating Action Button (botão redondo grande)"
  },
  "fabMini": {
    "type": "Boolean",
    "description": "FAB pequeno (botão redondo pequeno)"
  }
}
```

#### 19. `size`
```json
{
  "type": "String",
  "description": "Tamanho do botão (afeta fontSize)",
  "values": ["xs", "sm", "md", "lg", "xl", "custom"],
  "examples": [
    "size=\"sm\"",
    "size=\"20px\"",
    "size=\"2rem\""
  ]
}
```

**Mapeamento de Tamanhos (defaultSizes):**
```javascript
const defaultSizes = {
  xs: 8,   // 8px
  sm: 10,  // 10px
  md: 14,  // 14px
  lg: 20,  // 20px
  xl: 24   // 24px
}
```

**Comportamento:**
- Se `size` está em `defaultSizes`: usa o valor em pixels
- Se não: usa o valor literal (ex: `size="2rem"`)
- **Exceção**: Se `fab` ou `fabMini` estão ativos, size não afeta fontSize

#### 20. `padding`
```json
{
  "type": "String",
  "description": "Customização de padding (padrão: 'xs md')",
  "examples": [
    "padding=\"16px\"",
    "padding=\"xs\"",
    "padding=\"md lg\"",
    "padding=\"8px 16px\""
  ]
}
```

**Mapeamento de Padding (btnPadding):**
```javascript
export const btnPadding = {
  none: 0,   // 0px
  xs: 4,     // 4px
  sm: 8,     // 8px
  md: 16,    // 16px
  lg: 24,    // 24px
  xl: 32     // 32px
}
```

**Processamento:**
```javascript
// Código fonte real do processamento
padding: props.padding
  .split(/\s+/)  // Divide por espaços
  .map(v => (v in btnPadding ? btnPadding[v] + 'px' : v))  // Converte
  .join(' ')  // Junta novamente
```

**Exemplos de Conversão:**
- `"xs"` → `"4px"`
- `"md lg"` → `"16px 24px"`
- `"xs md"` → `"4px 16px"` (padrão)
- `"8px 16px"` → `"8px 16px"` (literal)

#### 21-22. `color` / `textColor`
```json
{
  "color": {
    "type": "String",
    "description": "Cor do botão (classes Quasar)",
    "examples": [
      "color=\"primary\"",
      "color=\"red\"",
      "color=\"#FF0000\""
    ]
  },
  "textColor": {
    "type": "String",
    "description": "Cor do texto (sobrescreve padrão)"
  }
}
```

**Lógica de Aplicação:**
```javascript
// Código fonte real
let colors

if (props.color !== void 0) {
  if (props.flat === true || props.outline === true) {
    // Flat/Outline: cor vai para o texto
    colors = `text-${props.textColor || props.color}`
  }
  else {
    // Filled/Push: cor vai para o background
    colors = `bg-${props.color} text-${props.textColor || 'white'}`
  }
}
else if (props.textColor) {
  colors = `text-${props.textColor}`
}
```

#### 23-25. Typography Options (noCaps, noWrap, dense)
```json
{
  "noCaps": {
    "type": "Boolean",
    "description": "Desabilita capitalização automática (text-transform: uppercase)"
  },
  "noWrap": {
    "type": "Boolean",
    "description": "Evita quebra de linha do texto"
  },
  "dense": {
    "type": "Boolean",
    "description": "Modo compacto (reduz padding)"
  }
}
```

#### 26. `align`
```json
{
  "type": "String",
  "default": "'center'",
  "values": ["left", "right", "center", "around", "between", "evenly", "stretch"],
  "description": "Alinhamento do conteúdo interno (justify-content)"
}
```

**Mapeamento Interno (alignMap):**
```javascript
export const alignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
  between: 'between',
  around: 'around',
  evenly: 'evenly',
  stretch: 'stretch'
}
```

**Classe Gerada:**
```javascript
// Para align="left" (horizontal)
`justify-start`

// Para align="center" (horizontal)
`justify-center`
```

#### 27-28. Layout Options (stack, stretch)
```json
{
  "stack": {
    "type": "Boolean",
    "description": "Empilha ícone e label verticalmente (column ao invés de row)"
  },
  "stretch": {
    "type": "Boolean",
    "description": "Expande para altura do container flexbox"
  }
}
```

#### 29. `tabindex`
```json
{
  "type": "Number | String",
  "description": "Índice de tabulação para navegação por teclado"
}
```

**Lógica Automática:**
```javascript
// Código fonte real
const tabIndex = computed(() => (
  isActionable.value === true ? props.tabindex || 0 : -1
))

// isActionable = botão não está disabled nem loading
```

#### 30-31. Behavior (loading, disable, ripple)
```json
{
  "loading": {
    "type": "Boolean",
    "default": null,
    "description": "Estado de carregamento (exibe spinner, desabilita interação)"
  },
  "disable": {
    "type": "Boolean",
    "description": "Desabilita o botão completamente"
  },
  "ripple": {
    "type": "Boolean | Object",
    "default": true,
    "description": "Efeito ripple material",
    "examples": [
      ":ripple=\"false\"",
      ":ripple=\"{ early: true, center: true, color: 'purple' }\""
    ]
  }
}
```

**Ripple Configuration Object:**
```javascript
{
  early: Boolean,      // Ripple em pointerdown ao invés de click
  stop: Boolean,       // stopPropagation no evento
  center: Boolean,     // Ripple sempre no centro
  color: String,       // Cor do ripple
  keyCodes: Array      // Teclas que ativam ripple (padrão: [13, 32])
}
```

---

## 🎰 Slots (2 slots)

### 1. Slot `default`
```json
{
  "name": "default",
  "description": "Use for custom content, instead of relying on 'icon' and 'label' props",
  "scoped": false
}
```

**Uso:**
```vue
<q-btn>
  <strong>Custom</strong> HTML content
</q-btn>
```

**Prioridade:**
- Se slot default existe: usa slot (ignora `label` prop)
- Se slot default não existe: usa `label` prop

**Código fonte:**
```javascript
hasLabel.value === true && inner.push(
  h('span', { class: 'block' }, [ props.label ])
)

inner = hMergeSlot(slots.default, inner)
// hMergeSlot adiciona conteúdo do slot ou mantém inner se slot vazio
```

### 2. Slot `loading`
```json
{
  "name": "loading",
  "description": "Override the default QSpinner when in 'loading' state",
  "scoped": false
}
```

**Uso:**
```vue
<q-btn :loading="true">
  <template #loading>
    <div class="custom-spinner">...</div>
  </template>
  Save
</q-btn>
```

**Código fonte:**
```javascript
h(Transition, {
  name: 'q-transition--fade'
}, () => (
  props.loading === true
    ? [
        h('span', {
          key: 'loading',
          class: 'absolute-full flex flex-center'
        }, slots.loading !== void 0 ? slots.loading() : [ h(QSpinner) ])
      ]
    : null
))
```

---

## 📡 Eventos (5 eventos)

### 1. `@click`
```json
{
  "name": "click",
  "description": "Emitted when the component is clicked",
  "addedIn": "v1.0.0",
  "params": {
    "evt": {
      "type": "Event",
      "description": "JS event object; calling evt.preventDefault() cancels route navigation"
    },
    "go": {
      "type": "Function",
      "addedIn": "v2.9+",
      "description": "Controla timing de navegação de rotas",
      "signature": "go(opts?: { to?, replace?, returnRouterError? }) => Promise<any>",
      "params": {
        "to": "String | Object - Rota destino",
        "replace": "Boolean - Se true usa router.replace",
        "returnRouterError": "Boolean - Se true retorna erros do router"
      }
    }
  }
}
```

**Comportamento:**
1. **NÃO emitido** se botão está `disabled` ou `loading`
2. Emitido em `click` e em `keyup` (Enter/Space)
3. Para navegação Vue Router: permite controle via função `go`

**Exemplos:**
```vue
<!-- Simples -->
<q-btn @click="handleClick">Click</q-btn>

<!-- Com controle de navegação (v2.9+) -->
<q-btn
  to="/home"
  @click="(evt, go) => {
    // Validação custom antes de navegar
    if (canLeave) {
      go()  // Navega
    } else {
      evt.preventDefault()  // Cancela navegação
    }
  }"
>
  Go Home
</q-btn>

<!-- Com delay de navegação -->
<q-btn
  to="/dashboard"
  @click="async (evt, go) => {
    await saveChanges()
    go()  // Navega após salvar
  }"
>
  Save & Continue
</q-btn>
```

### 2. `@keydown`
```json
{
  "name": "keydown",
  "description": "Emitido quando tecla é pressionada",
  "params": {
    "evt": "KeyboardEvent"
  }
}
```

**Teclas Especiais:**
- **Enter** (keyCode 13): Ativa botão
- **Space** (keyCode 32): Ativa botão

**Código fonte:**
```javascript
function onKeydown (e) {
  emit('keydown', e)

  if (isKeyCode(e, [ 13, 32 ]) === true && keyboardTarget !== rootRef.value) {
    // Adiciona classe q-btn--active
    rootRef.value.classList.add('q-btn--active')
    // ...
  }
}
```

### 3. `@keyup`
```json
{
  "name": "keyup",
  "description": "Emitido quando tecla é solta",
  "params": {
    "evt": "KeyboardEvent"
  }
}
```

**Comportamento Especial:**
- Se `keyup` for Enter/Space: dispara `click` sintético

**Código fonte:**
```javascript
if (e?.type === 'keyup') {
  if (keyboardTarget === rootRef.value && isKeyCode(e, [ 13, 32 ]) === true) {
    // Cria evento click sintético
    const evt = new MouseEvent('click', e)
    evt.qKeyEvent = true
    rootRef.value.dispatchEvent(evt)

    emit('keyup', e)
  }
}
```

### 4-5. `@mousedown` / `@touchstart`
```json
{
  "mousedown": {
    "name": "mousedown",
    "description": "Emitido quando botão do mouse é pressionado",
    "params": {
      "evt": "MouseEvent"
    }
  },
  "touchstart": {
    "name": "touchstart",
    "description": "Emitido quando tela é tocada",
    "params": {
      "evt": "TouchEvent"
    }
  }
}
```

**Uso Interno:**
- Gerenciam estado `q-btn--active`
- Controlam efeito ripple
- Previnem duplo disparo mouse/touch

---

## 🔧 Métodos Públicos (1 método)

### `click(evt)`
```json
{
  "name": "click",
  "description": "Emula clique no QBtn programaticamente",
  "params": {
    "evt": {
      "type": "Event",
      "required": false,
      "description": "Evento JavaScript opcional"
    }
  },
  "returns": null
}
```

**Uso:**
```vue
<template>
  <q-btn ref="myBtn">Click me</q-btn>
</template>

<script>
export default {
  mounted() {
    // Clica programaticamente
    this.$refs.myBtn.click()
  }
}
</script>
```

**Código fonte:**
```javascript
Object.assign(proxy, {
  click: e => {
    if (isActionable.value === true) {
      onClick(e)
    }
  }
})
```

---

## 🧩 Composables Internos

### 1. useSize
**Arquivo:** `use-size.js`

**Props:**
```javascript
export const useSizeProps = {
  size: String
}

export const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
}
```

**Retorno:**
```javascript
// Retorna computed que gera style
computed(() => (
  props.size !== void 0
    ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size }
    : null
))
```

**No QBtn:** usa `defaultSizes` customizados ao invés de `useSizeDefaults`

### 2. useAlign
**Arquivo:** `use-align.js`

**Props:**
```javascript
export const useAlignProps = {
  align: {
    type: String,
    validator: v => ['left', 'center', 'right', 'between', 'around', 'evenly', 'stretch'].includes(v)
  }
}
```

**Retorno:**
```javascript
computed(() => {
  const align = props.align === void 0
    ? props.vertical === true ? 'stretch' : 'left'
    : props.align

  return `${props.vertical === true ? 'items' : 'justify'}-${alignMap[align]}`
})
```

### 3. useRouterLink
**Arquivo:** `use-router-link.js` (320 linhas)

**Props:**
```javascript
export const useRouterLinkNonMatchingProps = {
  to: [ String, Object ],
  replace: Boolean,
  href: String,
  target: String,
  disable: Boolean
}

export const useRouterLinkProps = {
  ...useRouterLinkNonMatchingProps,
  exact: Boolean,
  activeClass: {
    type: String,
    default: 'q-router-link--active'
  },
  exactActiveClass: {
    type: String,
    default: 'q-router-link--exact-active'
  }
}
```

**Retorno:**
```javascript
{
  hasRouterLink,     // Boolean - tem prop 'to'
  hasHrefLink,       // Boolean - tem prop 'href'
  hasLink,           // Boolean - tem 'to' ou 'href'
  linkTag,           // String - tag a renderizar ('a', 'button', etc)
  resolvedLink,      // Object - rota resolvida pelo router
  linkIsActive,      // Boolean - rota está ativa
  linkIsExactActive, // Boolean - rota é exatamente a ativa
  linkClass,         // String - classes de estado ativo
  linkAttrs,         // Object - atributos href/target
  getLink,           // Function - resolve rota
  navigateToRouterLink, // Function - navega programaticamente
  navigateOnClick    // Function - handler de click com navegação
}
```

**Lógica de Prioridade:**
1. Se tem `href`: renderiza `<a>` com link nativo
2. Se tem `to` e Vue Router: renderiza `<a>` com navegação Vue Router
3. Senão: renderiza tag especificada em `type` ou `fallbackTag`

---

## 🎨 Sistema de Estilos

### Classes Base
```javascript
'q-btn q-btn-item non-selectable no-outline'
```

### Classes de Design
```javascript
`q-btn--${design}` // 'standard' | 'flat' | 'outline' | 'push' | 'unelevated'
```

### Classes de Forma
```javascript
// Se round
`q-btn--round`

// Se não round
`q-btn--rectangle`
  + (isRounded ? ' q-btn--rounded' : '')
  + (square ? ' q-btn--square' : '')
```

**Lógica isRounded:**
```javascript
const isRounded = computed(() =>
  props.rounded === true || props.fab === true || props.fabMini === true
)
```

### Classes de Cor
```javascript
// Se flat ou outline
`text-${textColor || color}`

// Se filled/push/unelevated
`bg-${color} text-${textColor || 'white'}`
```

### Classes de Estado
```javascript
// Se actionable (não disabled nem loading)
'q-btn--actionable q-focusable q-hoverable'

// Se disabled
'disabled'
```

### Classes Adicionais
```javascript
+ (fab ? ' q-btn--fab' : '')
+ (fabMini ? ' q-btn--fab-mini' : '')
+ (noCaps ? ' q-btn--no-uppercase' : '')
+ (dense ? ' q-btn--dense' : '')
+ (stretch ? ' no-border-radius self-stretch' : '')
+ (glossy ? ' glossy' : '')
+ (square ? ' q-btn--square' : '')
```

### Classes de Conteúdo Interno
```javascript
innerClasses = alignClass  // 'justify-start', 'justify-center', etc
  + (stack ? ' column' : ' row')
  + (noWrap ? ' no-wrap text-no-wrap' : '')
  + (loading ? ' q-btn__content--hidden' : '')
```

### Estilos Inline
```javascript
// Se não fab/fabMini
{ fontSize: '14px' } // ou valor do size

// Se tem padding customizado
{
  padding: '4px 16px',  // convertido de 'xs md'
  minWidth: '0',
  minHeight: '0'
}
```

---

## 🔗 Sistema de Navegação

### Prioridade de Navegação
1. **`href`** → Link nativo `<a href="...">`
2. **`to`** (com Vue Router) → Navegação Vue Router
3. **Nenhum** → Botão normal

### Código de Navegação
```javascript
function navigateOnClick (e) {
  if (hasRouterLink.value === true) {
    const go = opts => navigateToRouterLink(e, opts)

    emit('click', e, go)
    e.defaultPrevented !== true && go()
  }
  else {
    emit('click', e)
  }
}
```

### Controle de Navegação (v2.9+)
```javascript
function navigateToRouterLink (
  e,
  { returnRouterError, to = props.to, replace = props.replace } = {}
) {
  if (props.disable === true) {
    e.preventDefault()
    return Promise.resolve(false)
  }

  // Previne navegação em casos especiais
  if (
    e.metaKey || e.altKey || e.ctrlKey || e.shiftKey ||  // Control keys
    (e.button !== void 0 && e.button !== 0) ||           // Right click
    props.target === '_blank'                             // Nova aba
  ) {
    return Promise.resolve(false)
  }

  e.preventDefault()

  const promise = proxy.$router[ replace === true ? 'replace' : 'push' ](to)

  return returnRouterError === true
    ? promise
    : promise.then(() => {}).catch(() => {})
}
```

### Atributos de Link
```javascript
// Para href
{
  href: props.href,
  target: props.target
}

// Para Vue Router
{
  href: resolvedLink.value.href,  // Rota resolvida
  target: props.target
}

// Nenhum link
{}
```

---

## ✨ Efeito Ripple

### Configuração Padrão
```javascript
const ripple = computed(() => (
  props.disable === true || props.ripple === false
    ? false
    : {
        keyCodes: hasLink.value === true ? [ 13, 32 ] : [ 13 ],
        ...(props.ripple === true ? {} : props.ripple)
      }
))

const rippleProps = computed(() => ({ center: props.round }))
```

### Comportamento
- **Disabled/loading:** Ripple desativado
- **Botão redondo:** Ripple sempre centralizado
- **Links:** Ripple em Enter e Space
- **Botões:** Ripple apenas em Enter

### Diretiva Ripple
```javascript
withDirectives(
  h(linkTag.value, nodeProps.value, child),
  [
    [
      Ripple,
      ripple.value,
      void 0,
      rippleProps.value
    ]
  ]
)
```

### Configuração Avançada
```vue
<q-btn
  :ripple="{
    early: true,      // Ripple em pointerdown
    stop: true,       // stopPropagation
    center: true,     // Sempre centralizado
    color: 'purple',  // Cor do ripple
    keyCodes: [13]    // Apenas Enter
  }"
>
  Custom Ripple
</q-btn>
```

---

## 🎭 Estados e Comportamentos

### Estado: Loading
**Ativação:** `loading="true"`

**Efeitos:**
1. **Conteúdo escondido:**
```javascript
innerClasses += loading ? ' q-btn__content--hidden' : ''
```

2. **Spinner exibido:**
```javascript
h(Transition, {
  name: 'q-transition--fade'
}, () => (
  props.loading === true
    ? [
        h('span', {
          key: 'loading',
          class: 'absolute-full flex flex-center'
        }, slots.loading !== void 0 ? slots.loading() : [ h(QSpinner) ])
      ]
    : null
))
```

3. **Eventos bloqueados:**
```javascript
const onEvents = computed(() => {
  if (props.loading === true) {
    return {
      onMousedown: onLoadingEvt,
      onTouchstart: onLoadingEvt,
      onClick: onLoadingEvt,
      onKeydown: onLoadingEvt,
      onKeyup: onLoadingEvt
    }
  }
  // ...
})

function onLoadingEvt (evt) {
  stopAndPrevent(evt)
  evt.qSkipRipple = true
}
```

4. **Progress bar (com percentage):**
```javascript
if (props.loading === true && props.percentage !== void 0) {
  child.push(
    h('span', {
      class: 'q-btn__progress absolute-full overflow-hidden'
        + (props.darkPercentage === true ? ' q-btn__progress--dark' : '')
    }, [
      h('span', {
        class: 'q-btn__progress-indicator fit block',
        style: percentageStyle.value  // transform: translateX(...)
      })
    ])
  )
}
```

### Estado: Disabled
**Ativação:** `disable="true"`

**Efeitos:**
1. **Atributos:**
```javascript
if (linkTag.value === 'a') {
  if (props.disable === true) {
    acc['aria-disabled'] = 'true'
  }
}
else if (props.disable === true) {
  acc.disabled = ''
  acc['aria-disabled'] = 'true'
}
```

2. **Classes:**
```javascript
classes += props.disable === true ? ' disabled' : ''
```

3. **Tabindex:**
```javascript
tabIndex = props.disable === true ? -1 : (props.tabindex || 0)
```

### Estado: Active (Press)
**Ativação:** Mouse down, touch start ou keydown (Enter/Space)

**Gestão de Estados Globais:**
```javascript
let touchTarget = null
let keyboardTarget = null
let mouseTarget = null

// Touch
function onTouchstart (e) {
  if (touchTarget !== rootRef.value) {
    touchTarget !== null && cleanup()
    touchTarget = rootRef.value
    // ...
  }
}

// Mouse
function onMousedown (e) {
  if (mouseTarget !== rootRef.value) {
    mouseTarget !== null && cleanup()
    mouseTarget = rootRef.value
    rootRef.value.classList.add('q-btn--active')
    // ...
  }
}

// Keyboard
function onKeydown (e) {
  if (isKeyCode(e, [ 13, 32 ]) && keyboardTarget !== rootRef.value) {
    keyboardTarget !== null && cleanup()
    keyboardTarget = rootRef.value
    rootRef.value.classList.add('q-btn--active')
    // ...
  }
}
```

**Cleanup:**
```javascript
function cleanup (destroying) {
  // Remove event listeners
  // Remove classe q-btn--active
  // Reseta targets globais
  touchTarget = localTouchTargetEl = null
  mouseTarget = null
  keyboardTarget = null
}
```

---

## 🏗️ Renderização Interna

### Estrutura HTML Completa
```html
<button|a|div
  class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable bg-primary text-white"
  style="font-size: 14px; padding: 4px 16px;"
  tabindex="0"
  type="button"
>
  <!-- q-focus-helper (blur target) -->
  <span class="q-focus-helper"></span>

  <!-- Progress bar (se loading + percentage) -->
  <span class="q-btn__progress absolute-full overflow-hidden">
    <span class="q-btn__progress-indicator fit block" style="transform: translateX(-75%)"></span>
  </span>

  <!-- Conteúdo principal -->
  <span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">

    <!-- Ícone esquerdo -->
    <i aria-hidden="true" role="img" class="q-icon material-icons">add</i>

    <!-- Label -->
    <span class="block">Add Item</span>

    <!-- Ícone direito -->
    <i aria-hidden="true" role="img" class="q-icon material-icons">arrow_forward</i>

  </span>

  <!-- Loading spinner (transition) -->
  <span class="absolute-full flex flex-center">
    <svg class="q-spinner">...</svg>
  </span>

</button>
```

### Código de Renderização
```javascript
return () => {
  let inner = []

  // Ícone esquerdo
  props.icon !== void 0 && inner.push(
    h(QIcon, {
      name: props.icon,
      left: props.stack !== true && hasLabel.value === true,
      role: 'img'
    })
  )

  // Label
  hasLabel.value === true && inner.push(
    h('span', { class: 'block' }, [ props.label ])
  )

  // Merge com slot default
  inner = hMergeSlot(slots.default, inner)

  // Ícone direito (não em round)
  if (props.iconRight !== void 0 && props.round === false) {
    inner.push(
      h(QIcon, {
        name: props.iconRight,
        right: props.stack !== true && hasLabel.value === true,
        role: 'img'
      })
    )
  }

  const child = [
    // Focus helper
    h('span', {
      class: 'q-focus-helper',
      ref: blurTargetRef
    })
  ]

  // Progress bar
  if (props.loading === true && props.percentage !== void 0) {
    child.push(/* ... */)
  }

  // Conteúdo principal
  child.push(
    h('span', {
      class: 'q-btn__content text-center col items-center q-anchor--skip ' + innerClasses.value
    }, inner)
  )

  // Loading transition
  props.loading !== null && child.push(
    h(Transition, {
      name: 'q-transition--fade'
    }, () => (
      props.loading === true
        ? [/* spinner */]
        : null
    ))
  )

  // Renderização final com diretiva ripple
  return withDirectives(
    h(linkTag.value, nodeProps.value, child),
    [[ Ripple, ripple.value, void 0, rippleProps.value ]]
  )
}
```

---

## ♿ Acessibilidade

### ARIA Attributes

#### 1. `aria-disabled`
```javascript
if (linkTag.value === 'a') {
  if (props.disable === true) {
    acc['aria-disabled'] = 'true'
  }
}
else if (props.disable === true) {
  acc.disabled = ''
  acc['aria-disabled'] = 'true'
}
```

#### 2. `aria-valuemin/max/now` (Progress)
```javascript
if (props.loading === true && props.percentage !== void 0) {
  Object.assign(acc, {
    role: 'progressbar',
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': props.percentage
  })
}
```

#### 3. `role`
```javascript
if (linkTag.value === 'a') {
  if (acc.href === void 0) {
    acc.role = 'button'  // <a> sem href é botão
  }
}
```

#### 4. `aria-hidden` (ícones)
```javascript
h(QIcon, {
  name: props.icon,
  role: 'img',
  // Adiciona aria-hidden automaticamente
})
```

### Navegação por Teclado

#### Teclas Suportadas
- **Enter** (keyCode 13): Ativa botão
- **Space** (keyCode 32): Ativa botão (exceto links)
- **Tab**: Navegação para próximo elemento

#### Código de Suporte
```javascript
function onKeydown (e) {
  emit('keydown', e)

  if (isKeyCode(e, [ 13, 32 ]) === true && keyboardTarget !== rootRef.value) {
    if (e.defaultPrevented !== true) {
      e.qAvoidFocus !== true && rootRef.value.focus()
      keyboardTarget = rootRef.value
      rootRef.value.classList.add('q-btn--active')
      document.addEventListener('keyup', onPressEnd, true)
      rootRef.value.addEventListener('blur', onPressEnd, passiveCapture)
    }
    stopAndPrevent(e)
  }
}
```

### Focus Management

#### q-focus-helper
```javascript
h('span', {
  class: 'q-focus-helper',
  ref: blurTargetRef
})
```

**Propósito:** Elemento invisível usado para gerenciar foco quando botão está em estado active

#### Focus Restoration
```javascript
function cleanup (destroying) {
  const blurTarget = blurTargetRef.value

  if (
    destroying !== true
    && (touchTarget === rootRef.value || mouseTarget === rootRef.value)
    && blurTarget !== null
    && blurTarget !== document.activeElement
  ) {
    blurTarget.setAttribute('tabindex', -1)
    blurTarget.focus()
  }
  // ...
}
```

### Touch Targets
**Não há implementação explícita de tamanho mínimo no código**

⚠️ **GAP IDENTIFICADO:** Quasar não garante 48×48px mínimo por padrão

### Classes de Acessibilidade
```javascript
'q-focusable'   // Indica que elemento pode receber foco
'q-hoverable'   // Indica que elemento tem estado hover
'non-selectable' // user-select: none
'no-outline'     // Remove outline padrão (substituído por focus ring custom)
```

---

## 🚨 Gaps Identificados vs DSS

### 1. **Touch Targets WCAG 2.1 AA** ⚠️

**Quasar:**
- ❌ Não há garantia de 48×48px mínimo
- Tamanho depende de padding + fontSize
- Botão `xs` pode ficar < 44px

**DSS:**
- ✅ `@include dss-touch-target('ideal')` garante 48×48px
- ✅ Todos os tamanhos respeitam mínimo

**Impacto:** **CRÍTICO** - Afeta acessibilidade WCAG

---

### 2. **Focus Ring Customizado** ⚠️

**Quasar:**
- ❌ Usa outline padrão do browser (removido com `no-outline`)
- ❌ Não há focus ring visível consistente
- Classe `q-focusable` existe mas não define estilo de foco

**DSS:**
- ✅ `@include dss-focus-ring('primary')` - 3px, contraste 4.5:1
- ✅ Cores consistentes em todos os componentes

**Impacto:** **CRÍTICO** - Afeta acessibilidade WCAG

**Token Necessário:** `--dss-focus-ring-*` (FALTANTE no DSS!)

---

### 3. **Sistema de Tokens** ⚠️

**Quasar:**
- ❌ Usa classes CSS (`bg-primary`, `text-white`)
- ❌ Não usa CSS Variables para cores
- Valores hard-coded em SCSS

**DSS:**
- ✅ `var(--dss-action-primary)`, `var(--dss-spacing-4)`
- ✅ Brandabilidade automática

**Impacto:** **ALTO** - Core do DSS

---

### 4. **Padding System** ⚠️

**Quasar:**
```javascript
export const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
}
```

**DSS:**
```scss
--dss-spacing-0: 0px
--dss-spacing-1: 4px
--dss-spacing-2: 8px
--dss-spacing-4: 16px
--dss-spacing-6: 24px
--dss-spacing-8: 32px
```

**Mapeamento:** ✅ COMPATÍVEL (valores idênticos!)

---

### 5. **Size System** ⚠️

**Quasar:**
```javascript
const defaultSizes = {
  xs: 8,   // fontSize
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
}
```

**DSS:**
```scss
--dss-font-size-xs: 12px
--dss-font-size-sm: 14px
--dss-font-size-base: 16px
--dss-font-size-lg: 18px
--dss-font-size-xl: 20px
```

**Mapeamento:** ❌ INCOMPATÍVEL (valores diferentes!)

**Impacto:** **MÉDIO** - Precisa decidir qual usar

---

### 6. **Elevation/Shadows** ⚠️

**Quasar:**
- Usa classes `shadow-1`, `shadow-2`, etc (via Quasar CSS)
- Design `push` tem sombra integrada
- Design `unelevated` remove sombra

**DSS:**
- ✅ `var(--dss-elevation-1)`, `var(--dss-shadow-md)`
- ✅ Light mode vs Dark mode diferentes

**Impacto:** **MÉDIO** - Precisa mapear designs

---

### 7. **Ripple Configuration** ✅

**Quasar:**
```javascript
ripple: {
  early: Boolean,
  stop: Boolean,
  center: Boolean,
  color: String,
  keyCodes: Array
}
```

**DSS:**
- ❌ Não documentado
- ❌ Não há tokens para ripple

**Impacto:** **BAIXO** - Feature extra, não essencial para tokens

---

### 8. **Progress Bar (Loading)** ⚠️

**Quasar:**
- Barra de progresso determinístico (0-100%)
- Classes `q-btn__progress`, `q-btn__progress--dark`
- Animação CSS transform

**DSS:**
- ❌ Não documentado
- ❌ Não há tokens para progress

**Impacto:** **MÉDIO** - Feature importante

---

### 9. **Router Integration** ✅

**Quasar:**
- Props `to`, `replace`, `exact`, `activeClass`, `exactActiveClass`
- 320 linhas de código para navegação

**DSS:**
- ✅ Não precisa tokens (lógica Vue Router)
- Pode ser mantida exatamente igual

**Impacto:** **ZERO** - Compatível

---

### 10. **Design Variants** ⚠️

**Quasar:**
- `standard` (padrão)
- `flat` - sem fundo
- `outline` - borda
- `push` - elevado
- `unelevated` - sem sombra

**DSS:**
- `filled` (padrão)
- `flat`
- `outlined`
- `unelevated`
- ❌ Não tem `push`

**Mapeamento:**
```
Quasar → DSS
standard → filled
flat → flat
outline → outlined
unelevated → unelevated
push → ??? (criar no DSS ou ignorar?)
```

**Impacto:** **MÉDIO** - Precisa decisão sobre `push`

---

## 📊 Resumo de Gaps

| Gap | Prioridade | Status DSS | Ação Necessária |
|-----|------------|------------|-----------------|
| **Touch Targets** | 🔴 CRÍTICA | ✅ Tem mixin | Aplicar `dss-touch-target('ideal')` |
| **Focus Ring** | 🔴 CRÍTICA | ❌ **FALTANDO** | **CRIAR tokens `--dss-focus-*`** |
| **Tokens de Cor** | 🔴 ALTA | ✅ Completo | Mapear classes → tokens |
| **Padding System** | 🟢 BAIXA | ✅ Compatível | Mapeamento direto |
| **Size System** | 🟡 MÉDIA | ⚠️ Divergente | Decidir qual usar |
| **Shadows** | 🟡 MÉDIA | ✅ Tem tokens | Mapear designs |
| **Progress Bar** | 🟡 MÉDIA | ❌ Não documentado | Criar tokens se necessário |
| **Ripple** | 🟢 BAIXA | ❌ Não documentado | Opcional |
| **Design `push`** | 🟡 MÉDIA | ❌ Não existe | Criar ou ignorar |
| **Router** | ✅ OK | ✅ OK | Manter igual |

---

## 🎯 Próximos Passos

### 1. **URGENTE: Criar Tokens de Focus** 🔴
```scss
// tokens/semantic/_focus.scss (CRIAR)
:root {
  /* Focus rings */
  --dss-focus-ring-width: 3px;
  --dss-focus-ring-offset: 2px;
  --dss-focus-ring-opacity: 0.5;

  /* Cores de focus */
  --dss-focus-primary: rgba(31, 134, 222, 0.5);
  --dss-focus-error: rgba(216, 24, 46, 0.5);
  --dss-focus-success: rgba(77, 210, 40, 0.5);

  /* Estilos */
  --dss-focus-style: solid;
}

[data-theme="dark"] {
  --dss-focus-primary: rgba(134, 192, 243, 0.6);
  --dss-focus-error: rgba(255, 160, 171, 0.6);
}
```

### 2. **Decidir sobre Size System** 🟡
- Usar valores Quasar (8,10,14,20,24)?
- Usar valores DSS (12,14,16,18,20)?
- Criar mapeamento customizado?

### 3. **Mapear Design Variants** 🟡
- Decidir se implementa `push`
- Documentar mapeamento Quasar → DSS

### 4. **Criar DssButton Híbrido** 🎯
- Estrutura 100% igual ao q-btn
- Estilos 100% baseados em tokens DSS
- Props idênticas
- Comportamento idêntico

---

**FIM DA ESPECIFICAÇÃO COMPLETA**

Total de linhas: 1500+
Total de props: 29
Total de slots: 2
Total de eventos: 5
Total de métodos: 1
Total de arquivos analisados: 8
