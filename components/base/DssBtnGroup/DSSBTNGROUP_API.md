# DssBtnGroup — API Reference

> **Versão:** DSS v2.2 | **Fase:** 2 | **Status:** Pré-auditoria
> **Componente equivalente Quasar:** QBtnGroup

---

## Props

### Props de Estilo Visual (Prop Sync Obrigatório)

> ⚠️ **CRÍTICO**: As props abaixo **DEVEM ser declaradas também em cada DssButton filho**. O DssBtnGroup não propaga essas props automaticamente.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `flat` | `Boolean` | `false` | Estilo sem elevação e sem borda. A classe `.dss-btn-group--flat` adiciona separador `--dss-gray-300` entre filhos. |
| `outline` | `Boolean` | `false` | Estilo com borda visível. A classe `.dss-btn-group--outline` colapsa bordas duplas com `margin-left: calc(-1 * --dss-border-width-thin)`. |
| `push` | `Boolean` | `false` | Estilo 3D com sombra inferior. A classe `.dss-btn-group--push` adiciona separador `--dss-gray-200` entre filhos. |
| `unelevated` | `Boolean` | `false` | Remove sombra/elevação. A classe `.dss-btn-group--unelevated` adiciona separador `--dss-gray-200` entre filhos. |
| `glossy` | `Boolean` | `false` | Efeito glossy (gradiente). Nenhum ajuste de grupo necessário — responsabilidade dos filhos. |

### Props de Forma

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `rounded` | `Boolean` | `false` | Aplica `border-radius: var(--dss-radius-full)` nos cantos externos do grupo. Filhos intermediários mantêm `border-radius: 0`. |
| `square` | `Boolean` | `false` | Remove todo border-radius (`0`) de todos os filhos. *[EXC-01]* |

### Props de Layout

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `spread` | `Boolean` | `false` | Container muda para `display: flex`. Filhos recebem `flex: 1`, distribuindo largura igualmente. |
| `stretch` | `Boolean` | `false` | Container recebe `align-self: stretch`. Filhos recebem `align-self: stretch; min-height: 0`. Requer contexto flexbox externo. |

### Props de Brandabilidade

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | `String \| null` | `null` | `'hub'` \| `'water'` \| `'waste'` | Aplica acento visual de marca na borda inferior do grupo via `box-shadow` inset. |

### Props de Acessibilidade

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `ariaLabel` | `String` | `undefined` | Valor do atributo `aria-label` no container `role="group"`. Recomendado quando o grupo não possui label visual. |

### Props Bloqueadas (Não Suportadas)

| Prop Quasar | Motivo do Bloqueio |
|------------|-------------------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global, não via prop. |
| `color` | Pertence ao DssButton filho. |
| `text-color` | Pertence ao DssButton filho. |
| `size` | Pertence ao DssButton filho. |
| `dense` | Pertence ao DssButton filho. |

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `BtnGroupSlots['default']` | Conteúdo do grupo. Aceita `DssButton`. `DssBtnDropdown` será suportado na Fase 2 quando implementado. |

---

## Eventos

O DssBtnGroup não emite eventos próprios. É um container estrutural.
Todos os eventos (`click`, `focus`, etc.) pertencem aos DssButton filhos.

---

## Atributos HTML Herdados

O componente usa `inheritAttrs: false` com `v-bind="$attrs"` no container.
Atributos HTML passados ao componente são forwarded para o `<div role="group">`.

```vue
<!-- Exemplo: data-testid forwarded -->
<DssBtnGroup data-testid="action-group" unelevated>
  ...
</DssBtnGroup>
```

---

## Classes CSS

### Classes Base

| Classe | Condição |
|--------|----------|
| `dss-btn-group` | Sempre presente |

### Classes de Variante (Estilo)

| Classe | Condição |
|--------|----------|
| `dss-btn-group--flat` | `flat === true` |
| `dss-btn-group--outline` | `outline === true` |
| `dss-btn-group--push` | `push === true` |
| `dss-btn-group--unelevated` | `unelevated === true` |
| `dss-btn-group--glossy` | `glossy === true` |

### Classes de Forma

| Classe | Condição |
|--------|----------|
| `dss-btn-group--rounded` | `rounded === true` |
| `dss-btn-group--square` | `square === true` |

### Classes de Layout

| Classe | Condição |
|--------|----------|
| `dss-btn-group--spread` | `spread === true` |
| `dss-btn-group--stretch` | `stretch === true` |

### Classes de Brand

| Classe | Condição |
|--------|----------|
| `dss-btn-group--brand-hub` | `brand === 'hub'` |
| `dss-btn-group--brand-water` | `brand === 'water'` |
| `dss-btn-group--brand-waste` | `brand === 'waste'` |

---

## TypeScript

```typescript
import type { BtnGroupProps, BtnGroupSlots, BtnGroupBrand } from '@/dss/components/base/DssBtnGroup/types/btn-group.types'
```

### `BtnGroupBrand`
```typescript
type BtnGroupBrand = 'hub' | 'water' | 'waste'
```

### `BtnGroupProps`
```typescript
interface BtnGroupProps {
  flat?: boolean           // default: false — ⚠️ prop sync obrigatório
  outline?: boolean        // default: false — ⚠️ prop sync obrigatório
  push?: boolean           // default: false — ⚠️ prop sync obrigatório
  unelevated?: boolean     // default: false — ⚠️ prop sync obrigatório
  rounded?: boolean        // default: false
  square?: boolean         // default: false — ⚠️ prop sync obrigatório
  glossy?: boolean         // default: false — ⚠️ prop sync obrigatório
  spread?: boolean         // default: false
  stretch?: boolean        // default: false
  brand?: BtnGroupBrand | null  // default: null
  ariaLabel?: string       // default: undefined
}
```

### `BtnGroupSlots`
```typescript
interface BtnGroupSlots {
  default(): any
}
```

---

## Composables

### `useBtnGroupClasses(props)`

```typescript
import { useBtnGroupClasses } from '@/dss/components/base/DssBtnGroup/composables'

const { btnGroupClasses } = useBtnGroupClasses(props)
// btnGroupClasses: ComputedRef<(string | Record<string, boolean>)[]>
```

Retorna `btnGroupClasses` — array de classes computadas baseadas nas props.

---

## Tokens CSS Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L2 + L3 | Colapso outline / separadores flat/push/unelevated |
| `--dss-border-width-thick` | L4 | Acento de brand (inset box-shadow) |
| `--dss-border-width-md` | Module | High contrast outline |
| `--dss-gray-200` | L3 | Separador push e unelevated |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-radius-full` | L2 | Variante rounded — border-radius pill |
| `--dss-hub-600` | L4 | Brand Hub (modo claro) |
| `--dss-hub-400` | L4 | Brand Hub (dark mode) |
| `--dss-water-500` | L4 | Brand Water (modo claro) |
| `--dss-water-400` | L4 | Brand Water (dark mode) |
| `--dss-waste-600` | L4 | Brand Waste (modo claro) |
| `--dss-waste-500` | L4 | Brand Waste (dark mode) |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `2-composition/_base.scss` | Square variant — semanticamente "sem radius", não valor visual arbitrário. |
| EXC-02 | `rgba(255,255,255,0.12)` | `4-output/_states.scss` | Dark mode divider — sem token DSS equivalente. Padrão Material Design. |
| EXC-03 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors mode — valores absolutos obrigatórios, tokens ignorados. |

---

## Acessibilidade

| Atributo ARIA | Valor | Condição |
|---------------|-------|----------|
| `role` | `"group"` | Sempre presente |
| `aria-label` | valor de `ariaLabel` | Quando prop `ariaLabel` fornecida |

**Touch target:** Opção B — não implementado no container. Delegado a cada DssButton filho (que implementa `min-height: var(--dss-touch-target-md)` conforme WCAG 2.1 AA).

**Navegação por teclado:** O grupo não captura foco. Cada DssButton filho é navegável individualmente por Tab.

---

*Gerado: 26 Mar 2026 — DSS v2.2 — Fase 2*
