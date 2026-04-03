# DSSTABS_API.md — Referência Técnica

> Versão: 1.0.0 | DSS v2.2 | Fase 2 — Componente Composto

---

## Importação

```js
import { DssTabs } from '@/dss/components/base/DssTabs'
import type { TabsProps, TabsBrand, TabsAlign } from '@/dss/components/base/DssTabs'
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string \| number` | `undefined` | Identificador da aba ativa (v-model) |
| `align` | `TabsAlign` | `'left'` | Alinhamento das abas: `left`, `center`, `right`, `justify` |
| `breakpoint` | `number` | `600` | Largura (px) abaixo da qual as setas de scroll são exibidas |
| `vertical` | `boolean` | `false` | Layout vertical (coluna) com indicador lateral |
| `dense` | `boolean` | `false` | Modo compacto — reduz padding das setas de navegação |
| `brand` | `TabsBrand \| null` | `null` | Marca Sansys: `hub`, `water`, `waste` |
| `ariaLabel` | `string` | `undefined` | Label acessível para o grupo (aria-label) |

### Props Bloqueadas

| Prop QTabs | Motivo do Bloqueio |
|------------|-------------------|
| `active-color` | DSS governa cor ativa via tokens `--dss-action-primary` no DssTab |
| `active-bg-color` | DSS governa cor de fundo via tokens no DssTab |
| `indicator-color` | DSS governa cor do indicador via `currentColor` cascade no DssTab |
| `ripple` | Forçado `:ripple="false"` — DSS usa overlay `::after` para feedback |
| `no-caps` | CSS/tokens DSS governam transformação de texto no DssTab |

---

## Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Emitido quando o usuário seleciona uma aba |

### Uso com v-model

```vue
<DssTabs v-model="abaAtiva">
  <DssTab name="tab1" label="Primeira" />
  <DssTab name="tab2" label="Segunda" />
</DssTabs>
```

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do grupo. **Aceita apenas DssTab** (ou DssRouteTab futuro) |

### Regra de Composição

```html
<!-- ✅ CORRETO -->
<DssTabs v-model="aba">
  <DssTab name="a" label="A" />
  <DssTab name="b" label="B" />
</DssTabs>

<!-- ❌ INCORRETO — violação arquitetural -->
<DssTabs v-model="aba">
  <q-tab name="a" label="A" />  <!-- q-tab bruto não permitido -->
</DssTabs>
```

---

## Types

```typescript
export type TabsBrand = 'hub' | 'water' | 'waste'
export type TabsAlign = 'left' | 'center' | 'right' | 'justify'

export interface TabsProps {
  modelValue?: string | number
  align?: TabsAlign
  breakpoint?: number
  vertical?: boolean
  dense?: boolean
  brand?: TabsBrand | null
  ariaLabel?: string
}

export interface TabsEmits {
  (e: 'update:modelValue', value: string | number): void
}

export interface TabsSlots {
  default(): any
}
```

---

## Tokens Utilizados

| Token DSS | Uso |
|-----------|-----|
| `--dss-text-subtle` | Cor padrão das setas de navegação |
| `--dss-surface-hover` | Background das setas em hover |
| `--dss-surface-active` | Background das setas em active |
| `--dss-focus-ring` | Cor do outline de focus-visible nas setas |
| `--dss-border-width-md` | Espessura do outline de focus |
| `--dss-border-width-thick` | Espessura do outline em high-contrast |
| `--dss-spacing-1` | Padding inline das setas em modo dense |
| `--dss-hub-600` | Cor das setas em brand Hub |
| `--dss-water-600` | Cor das setas em brand Water |
| `--dss-waste-600` | Cor das setas em brand Waste |

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-tabs` | Sempre presente |
| `dss-tabs--align-center` | `align="center"` |
| `dss-tabs--align-right` | `align="right"` |
| `dss-tabs--align-justify` | `align="justify"` |
| `dss-tabs--vertical` | `vertical=true` |
| `dss-tabs--dense` | `dense=true` |
| `dss-tabs--brand-hub` | `brand="hub"` |
| `dss-tabs--brand-water` | `brand="water"` |
| `dss-tabs--brand-waste` | `brand="waste"` |

---

## Acessibilidade

| Aspecto | Detalhe |
|---------|---------|
| `role` | `tablist` (nativo QTabs) |
| `aria-label` | Prop `ariaLabel` — recomendada quando sem label visual |
| `aria-selected` | Gerenciado automaticamente pelo QTabs nos DssTab filhos |
| Teclado | Setas ←/→ navegam entre abas (comportamento nativo Quasar) |
| Touch target | Responsabilidade dos DssTab filhos (WCAG 2.5.5) |

---

## Comportamentos Implícitos

### Forwarding de Atributos (`v-bind="$attrs"`)

O DssTabs usa `inheritAttrs: false` e aplica `v-bind="$attrs"` explicitamente no `<q-tabs>`. Atributos HTML adicionais (ex: `data-testid`, `id`) são encaminhados ao elemento raiz renderizado pelo QTabs.

### Propagação de Brand

Quando `brand` é definido, o DssTabs aplica o atributo `data-brand` no elemento raiz. Os DssTab filhos reagem automaticamente via seletor CSS `[data-brand='x'] .dss-tab`, sem necessidade de passar `brand` explicitamente para cada DssTab.

### Ícones das Setas de Navegação

As setas de navegação (`left-icon` e `right-icon`) são fixadas em `chevron_left` e `chevron_right` (Material Icons padrão). Não é possível alterar os ícones via props externas — esta é uma decisão intencional de governança DSS.

---

## Composables Exportados

```js
import { useTabsClasses } from '@/dss/components/base/DssTabs'

// Retorna { tabsClasses: ComputedRef<string[]> }
const { tabsClasses } = useTabsClasses(props)
```
