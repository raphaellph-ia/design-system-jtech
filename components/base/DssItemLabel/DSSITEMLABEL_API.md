# DssItemLabel — API Reference

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

---

## Componente

```typescript
import { DssItemLabel } from '@dss/components/base/DssItemLabel'
```

---

## Props

### `header`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `Boolean` |
| **Padrão** | `false` |
| **Obrigatório** | Não |

Define o label como cabeçalho de grupo de lista.

**Comportamento visual:**
- `font-size`: `--dss-font-size-xs` (12px)
- `font-weight`: `--dss-font-weight-semibold` (600)
- `color`: `--dss-text-subtle`
- `text-transform`: `uppercase`
- `letter-spacing`: `--dss-letter-spacing-widest`
- `padding-top`: `--dss-spacing-3` (12px) — separação visual entre grupos

**Uso típico:** Direto dentro de `q-list`, fora de `DssItem`, para rotular seções.

```vue
<DssItemLabel header>Favoritos</DssItemLabel>
```

---

### `caption`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `Boolean` |
| **Padrão** | `false` |
| **Obrigatório** | Não |

Define o label como texto secundário (caption).

**Comportamento visual:**
- `font-size`: `--dss-font-size-sm` (14px)
- `font-weight`: `--dss-font-weight-normal` (400)
- `line-height`: `--dss-line-height-sm` (1.45)
- `color`: `--dss-text-subtle`
- `margin-top`: `--dss-spacing-0_5` (2px)

**Uso típico:** Abaixo do label principal dentro de `DssItemSection`.

```vue
<DssItemLabel>João da Silva</DssItemLabel>
<DssItemLabel caption>Gerente de operações</DssItemLabel>
```

---

### `overline`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `Boolean` |
| **Padrão** | `false` |
| **Obrigatório** | Não |

Define o label como texto de sobreposição (overline).

**Comportamento visual:**
- `font-size`: `--dss-font-size-xs` (12px)
- `font-weight`: `--dss-font-weight-medium` (500)
- `line-height`: `--dss-line-height-tight` (1.25)
- `color`: `--dss-text-subtle`
- `text-transform`: `uppercase`
- `letter-spacing`: `--dss-letter-spacing-widest`
- `margin-bottom`: `--dss-spacing-0_5` (2px)

**Uso típico:** Acima do label principal, indicando categoria ou tipo.

```vue
<DssItemLabel overline>Alerta Crítico</DssItemLabel>
<DssItemLabel>Pressão fora do limite operacional</DssItemLabel>
```

---

### `lines`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `Number \| String` |
| **Padrão** | `undefined` |
| **Obrigatório** | Não |

Número máximo de linhas antes de truncar o texto com ellipsis (`...`).

**Mecanismo:** Delegado ao `QItemLabel` nativo, que injeta a variável CSS
`--q-item-label-lines` e aplica `-webkit-line-clamp`. O DSS complementa
com `overflow: hidden` e `overflow-wrap: anywhere` para comportamento correto.

```vue
<DssItemLabel caption :lines="2">
  Texto longo que será truncado na segunda linha com ellipsis ao final...
</DssItemLabel>
```

---

## Slots

### `default`

Conteúdo de texto do label. Aceita texto simples ou elementos inline.

```vue
<DssItemLabel>Texto simples</DssItemLabel>

<DssItemLabel>
  Texto com <strong>ênfase</strong> no conteúdo
</DssItemLabel>
```

---

## Eventos

**Nenhum.** O componente é estritamente não-interativo. Eventos de interação
(click, hover) devem ser tratados no `DssItem` pai via prop `clickable`.

---

## $attrs Forwarding

O componente utiliza `inheritAttrs: false` e aplica `v-bind="$attrs"` no
elemento raiz `q-item-label`. Todos os atributos não declarados como props
são encaminhados diretamente para o `QItemLabel` nativo.

```vue
<!-- class e style são forwarded para q-item-label -->
<DssItemLabel class="custom-class" style="opacity: 0.8">
  Texto com atributos adicionais
</DssItemLabel>
```

---

## Acessibilidade

| Critério | Implementação |
|----------|---------------|
| **Role** | `div` genérico (herdado do QItemLabel) — sem role explícito |
| **Touch target** | Não aplicável — componente não-interativo (Option B, como DssBadge) |
| **ARIA** | Nenhum atributo ARIA obrigatório |
| **Navegação por teclado** | Não aplicável — pertence ao DssItem pai |
| **WCAG 2.1 AA** | Conformidade tipográfica via tokens DSS |

---

## Classes CSS geradas

| Classe | Condição | Descrição |
|--------|----------|-----------|
| `dss-item-label` | Sempre | Classe base do componente |
| `dss-item-label--header` | `header = true` | Variante cabeçalho de grupo |
| `dss-item-label--caption` | `caption = true` | Variante texto secundário |
| `dss-item-label--overline` | `overline = true` | Variante texto de categoria |
| `dss-item-label--lines` | `lines` definido | Comportamento de truncamento |
| `q-item__label` | Sempre (Quasar) | Classe nativa do QItemLabel |
| `q-item__label--header` | `header = true` (Quasar) | Modificador nativo (sobrescrito via EXC-01) |
| `q-item__label--caption` | `caption = true` (Quasar) | Modificador nativo (sobrescrito via EXC-01) |
| `q-item__label--overline` | `overline = true` (Quasar) | Modificador nativo (sobrescrito via EXC-01) |

---

## Tokens utilizados

| Token | Categoria | Uso |
|-------|-----------|-----|
| `--dss-font-family-sans` | Tipografia | Família base |
| `--dss-font-size-xs` | Tipografia | Header e overline (12px) |
| `--dss-font-size-sm` | Tipografia | Caption (14px) |
| `--dss-font-size-md` | Tipografia | Label padrão (16px) |
| `--dss-font-weight-normal` | Tipografia | Label padrão e caption (400) |
| `--dss-font-weight-medium` | Tipografia | Overline (500) |
| `--dss-font-weight-semibold` | Tipografia | Header (600) |
| `--dss-line-height-tight` | Tipografia | Overline (1.25) |
| `--dss-line-height-sm` | Tipografia | Caption (1.45) |
| `--dss-line-height-normal` | Tipografia | Label padrão e header (1.5) |
| `--dss-letter-spacing-widest` | Tipografia | Header e overline (0.1em) |
| `--dss-text-body` | Cor | Label padrão |
| `--dss-text-subtle` | Cor | Header, caption e overline |
| `--dss-text-inverse` | Cor | Label em dark mode |
| `--dss-spacing-0_5` | Espaçamento | Margin caption (2px) e overline (2px) |
| `--dss-spacing-1` | Espaçamento | Padding-bottom do header (4px) |
| `--dss-spacing-3` | Espaçamento | Padding-top do header (12px) |

---

## Exceções documentadas

### EXC-01 — Sobrescrita de Tipografia Quasar

**Localização:** `2-composition/_base.scss`

**Seletores afetados:**
- `.dss-item-label.q-item__label--header`
- `.dss-item-label.q-item__label--caption`
- `.dss-item-label.q-item__label--overline`

**Justificativa:** O QItemLabel aplica tipografia hardcoded nas suas classes de modificador.
Os seletores compostos são a única forma de substituir CSS de terceiros com tokens DSS.
Formalizado no Pré-Prompt DssItemLabel Fase 2 (seção 9, EXC-01).

### EXC-02 — System Color Keywords em forced-colors

**Localização:** `4-output/_states.scss`

**Valores:** `ButtonText` (texto principal), `GrayText` (texto secundário)

**Justificativa:** Em `forced-colors: active`, tokens CSS são ignorados pelo navegador.
System color keywords são obrigatórios para garantir visibilidade. Padrão canônico DSS.

---

## Paridade com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssItemLabel | Justificativa de divergência |
|---------|----------|--------------|------------------------------|
| `defineOptions` presente | ✅ | ✅ | — |
| `inheritAttrs: false` | ❌ | ✅ | DssItemLabel forwards $attrs (necessário para q-item-label) |
| `v-bind="$attrs"` | ❌ | ✅ | Idem |
| Touch target | ❌ Option B | ❌ Option B | Ambos não-interativos |
| Estados hover/focus/active | ❌ | ❌ | Ambos não-interativos |
| Elemento decorativo `aria-hidden` | N/A | N/A | Sem elementos decorativos |
| Dark mode via `[data-theme]` | ✅ | ✅ | — |
| Forced-colors com system keywords | ✅ | ✅ | — |
| Token First (zero hardcoded) | ✅ | ✅ | — |
