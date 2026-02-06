# DSS_TOGGLE_API.md

## DssToggle — API Reference

**Versao:** 1.0.0
**DSS:** v2.2
**Status:** Draft (elegivel para auditoria)
**Golden Component:** DssCheckbox (primario), DssRadio (secundario)
**Classificacao:** Compact Control interativo | Form / Selection | Fase 1

---

## Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `modelValue` | `boolean \| null \| any[]` | `false` | Valor reativo (v-model). Boolean para toggle simples, array para grupo. |
| `trueValue` | `any` | `true` | Valor emitido quando toggle esta ativo (on). |
| `falseValue` | `any` | `false` | Valor emitido quando toggle esta inativo (off). |
| `val` | `any` | — | Valor para array mode (grupo de toggles). |
| `label` | `string` | `''` | Texto do label. Alternativa ao slot default. |
| `leftLabel` | `boolean` | `false` | Posiciona label a esquerda do toggle. |
| `color` | `string` | `'primary'` | Cor quando ativo. Sem brand: classes utilitarias. Com brand: tokens semanticos. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do toggle. Usa tokens `--dss-compact-control-height-*`. |
| `disable` | `boolean` | `false` | Desabilita o toggle. Aplica `opacity: var(--dss-opacity-disabled)`. |
| `dense` | `boolean` | `false` | Modo denso. Reduz gap, altura, font-size. Remove touch target. |
| `error` | `boolean` | `false` | Estado de erro. Aplica cor de erro ao track e label. |
| `errorMessage` | `string` | `''` | Mensagem de erro. Exibida quando `error=true`. Associada via `aria-describedby`. |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca do produto. Ativa tokens semanticos de brand. |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado para o input nativo. |
| `ariaLabel` | `string` | — | Label de acessibilidade para screen readers. |

---

## Events

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `update:modelValue` | `boolean \| any[]` | Emitido quando o valor do toggle muda. |

---

## Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo customizado do label. Sobrescreve prop `label`. |

---

## Expose (API publica)

| Metodo | Descricao |
|--------|-----------|
| `focus()` | Foca o input nativo programaticamente. |
| `blur()` | Remove foco do input nativo. |

---

## Estados

| Estado | Classe CSS | ARIA | Descricao |
|--------|-----------|------|-----------|
| default | `.dss-toggle` | — | Track vazio com borda `currentColor` |
| hover | — (via `:hover`) | — | `brightness(0.95)` no track |
| active | — (via `:active`) | — | `brightness(0.90)` no track |
| focus | `.dss-toggle__track--focused` | — | Outline `--dss-focus-ring` |
| checked | `.dss-toggle--checked`, `.dss-toggle__track--checked` | `aria-checked="true"` | Track colorido, thumb a direita |
| disabled | `.dss-toggle--disabled` | `aria-disabled="true"`, `tabindex="-1"` | `opacity: var(--dss-opacity-disabled)` |
| error | `.dss-toggle--error` | `aria-invalid="true"`, `aria-describedby` | Cor `--dss-error-600` |
| dense | `.dss-toggle--dense` | — | Reduz gap, altura, font-size. Remove touch target. |

---

## Estados NAO aplicaveis

| Estado | Justificativa |
|--------|---------------|
| indeterminate | Toggle e binario (on/off). Nao suporta estado intermediario. |
| loading | Nao aplicavel para toggle na Fase 1. Propor via RFC se necessario. |

---

## Subset controlado vs. Quasar QToggle

DssToggle implementa um **subset controlado** da API do Quasar QToggle.

| Feature QToggle | DssToggle | Justificativa |
|-----------------|-----------|---------------|
| `v-model` | Suportado | Binding reativo |
| `val` | Suportado | Array mode |
| `true-value` / `false-value` | Suportado | Valores customizados |
| `label` | Suportado | Texto do label |
| `left-label` | Suportado | Posicao do label |
| `color` | Suportado | Cor quando ativo |
| `size` | Suportado | xs/sm/md/lg |
| `disable` | Suportado | Estado desabilitado |
| `dense` | Suportado | Modo denso |
| `icon` | NAO suportado | Fase 1. Propor via RFC. |
| `checked-icon` / `unchecked-icon` | NAO suportado | Fase 1. Propor via RFC. |
| `toggle-order` | NAO suportado | Complexidade desnecessaria na Fase 1. |
| `keep-color` | NAO suportado | Cores unchecked via CSS padrao. |
