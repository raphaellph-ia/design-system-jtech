# DssDrawer — API Reference

> Wrapper DSS governado sobre QDrawer (Quasar).
> Versão: 1.0.0 | Fase 2 | Status: Pendente Auditoria DSS v2.2

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `modelValue` | `boolean` | `true` | Não | Controla a visibilidade do drawer. `true` = aberto, `false` = fechado. Compatível com `v-model`. |
| `side` | `'left' \| 'right'` | `'left'` | Não | Lado de ancoramento do drawer na página. |
| `overlay` | `boolean` | `false` | Não | Força o drawer a sobrepor o conteúdo em todos os breakpoints (ignora o push mode em desktop). |
| `elevated` | `boolean` | `false` | Não | Aplica sombra de elevação (`--dss-elevation-2`) para destacar o drawer do conteúdo. |
| `bordered` | `boolean` | `false` | Não | Aplica borda lateral sutil separando drawer do conteúdo. Direção: `border-right` (left) / `border-left` (right). |
| `mini` | `boolean` | `false` | Não | Modo minimizado: reduz largura para exibir apenas ícones (largura padrão QDrawer: 57px). |
| `width` | `number` | `256` | Não | Largura do drawer em pixels. Equivalente ao token `--dss-spacing-64`. |

---

## Props Bloqueadas (não expõe ao consumidor)

| Prop QDrawer | Valor Fixo | Motivo |
|---|---|---|
| `dark` | — | Dark mode gerenciado via `[data-theme="dark"]` e `--dss-surface-default`. |
| `behavior` | `"default"` | DSS padroniza: desktop=push, mobile=overlay. Hardcoded no template. |

---

## Emits

| Evento | Payload | Quando |
|--------|---------|--------|
| `update:modelValue` | `value: boolean` | Quando o estado de visibilidade do drawer muda (fechado/aberto). Suporta `v-model`. |

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `void` | Conteúdo do drawer. Aceita DssList, DssMenu ou cabeçalhos de seção DSS. Uso de HTML nativo ou texto solto é violação arquitetural. |

---

## $attrs Forwarding

Atributos não declarados como props são repassados ao `<q-drawer>` via `v-bind="$attrs"` (`inheritAttrs: false`).

| Atributo | Uso recomendado |
|----------|----------------|
| `aria-label` | **Recomendado** — descreve o propósito: `aria-label="Menu principal"` |
| `aria-labelledby` | Alternativa para referenciar elemento de título existente |
| `role` | Padrão `"navigation"`. Sobrescrever com `role="complementary"` para painéis informativos |

**Nota**: `role="navigation"` é o padrão DSS. Se passar `role` via `$attrs`, ele sobrescreve o padrão (comportamento intencional).

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-drawer` | Sempre (bloco BEM raiz) |
| `dss-drawer--left` | `side === 'left'` (padrão) |
| `dss-drawer--right` | `side === 'right'` |
| `dss-drawer--elevated` | `elevated === true` |
| `dss-drawer--bordered` | `bordered === true` |
| `dss-drawer--mini` | `mini === true` |
| `dss-drawer--overlay` | `overlay === true` |

---

## Composables

### `useDrawerClasses(props)`

Computa classes CSS reativas baseadas nas props do DssDrawer.

```typescript
import { useDrawerClasses } from '@sansys/dss/components/DssDrawer'

const { drawerClasses } = useDrawerClasses(props)
// → ['dss-drawer', 'dss-drawer--left', { 'dss-drawer--elevated': true, ... }]
```

---

## Tokens CSS

| Token | Aplicação | Fallback |
|-------|-----------|----------|
| `--dss-surface-default` | `background-color` do drawer | — |
| `--dss-text-body` | `color` do texto padrão | — |
| `--dss-elevation-2` | `box-shadow` (prop `elevated`) | — |
| `--dss-border-width-thin` | `border-width` (prop `bordered`) | — |
| `--dss-gray-200` | `border-color` (prop `bordered`) | — |
| `--dss-border-width-md` | `border-width` em `prefers-contrast: more` | — |
| `--dss-opacity-backdrop` | `background` do `.q-drawer__backdrop` | `0.75` |

---

## Comportamento Responsivo

O DssDrawer usa `behavior="default"` do QDrawer (hardcoded, não configurável):

| Breakpoint | Comportamento |
|------------|---------------|
| Desktop (≥ breakpoint) | Drawer empurra o conteúdo para o lado (push mode) |
| Mobile (< breakpoint) | Drawer sobrepõe o conteúdo com backdrop (overlay mode) |

O breakpoint padrão do QDrawer é `1023px` (configurável apenas via QLayout).

---

## Acessibilidade

| Atributo | Valor padrão | Configurável |
|----------|-------------|--------------|
| `role` | `"navigation"` | Sim, via `$attrs` |
| `aria-label` | — | Sim, via `$attrs` (recomendado) |
| `aria-labelledby` | — | Sim, via `$attrs` |

**Recomendação WCAG**: Quando houver múltiplos landmarks `navigation` na mesma página, todos devem ter `aria-label` único para distingui-los para leitores de tela.

---

## Exceções aos Gates v2.4

| ID | Regra Violada | Local | Justificativa resumida |
|----|---------------|-------|----------------------|
| EXC-01 | Gate Composição — Regra 1 (Quasar no template) | `DssDrawer.example.vue` | DssLayout (Nível 4) não existe — isenção formal |
| EXC-02 | — (documentado para clareza) | `2-composition/_base.scss` | `!important` para sobrescrever background do QDrawer |
| EXC-03 | Gate Composição — Regra 1 (primitivo como raiz) | `1-structure/DssDrawer.ts.vue` | QDrawer precisa ser raiz para funcionar com QLayout |
| EXC-04 | Gate Composição — Regra 2 (estilização de elemento interno) | `2-composition/_base.scss` | `.q-drawer__backdrop` é elemento Quasar interno, não DSS |
| EXC-05 | — (canônico DSS) | `4-output/_states.scss` | System color keywords em `forced-colors` |
| EXC-06 | — (canônico DSS) | `4-output/_states.scss` | Valores hardcoded em `@media print` |

---

## TypeScript

```typescript
import type { DrawerProps, DrawerEmits, DrawerSlots, DrawerSide } from '@sansys/dss/components/DssDrawer'

// DrawerSide
type DrawerSide = 'left' | 'right'

// DrawerProps
interface DrawerProps {
  modelValue?: boolean  // default: true
  side?: DrawerSide     // default: 'left'
  overlay?: boolean     // default: false
  elevated?: boolean    // default: false
  bordered?: boolean    // default: false
  mini?: boolean        // default: false
  width?: number        // default: 256
}

// DrawerEmits
interface DrawerEmits {
  'update:modelValue': [value: boolean]
}

// DrawerSlots
interface DrawerSlots {
  default(): void
}
```
