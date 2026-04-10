# DSSBREADCRUMBSEL_API — API Reference

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `label` | `string` | `undefined` | Não | Texto do item. Alternativa ao slot `default`. |
| `icon` | `string` | `undefined` | Não | Nome do ícone Material Icons. Renderizado antes do `label`/slot via `DssIcon`. |
| `to` | `string \| Record<string, unknown>` | `undefined` | Não | Destino de roteamento Vue Router. Torna o item clicável (`--clickable`). |
| `href` | `string` | `undefined` | Não | URL externa. Alternativa ao `to` para links externos. |
| `disable` | `boolean` | `false` | Não | Desabilita a interação: `opacity: --dss-opacity-disabled`, `pointer-events: none`. |
| `tag` | `string` | QBreadcrumbsEl default | Não | Sobrescreve a tag HTML renderizada pelo QBreadcrumbsEl. |

## Props Bloqueadas

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `ripple` | DSS não usa ripple em navegação estrutural. Reservado para controles de ação. |
| `exact` | Gerenciado pelo `DssBreadcrumbs` pai. |
| `active-class` | DSS governa classes de estado via BEM + tokens. |
| `exact-active-class` | Mesmo motivo de `active-class`. |

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `() => VNode[]` | Conteúdo personalizado. Sobrepõe `label`. O ícone (`icon`) sempre é renderizado antes. |

## Emits

Sem eventos próprios. Eventos DOM nativos propagados via `inheritAttrs: false` + `v-bind="$attrs"`.

## Expose

Sem expose. DssBreadcrumbsEl não expõe métodos ou referências de template.

## Modifier Classes (BEM)

| Classe | Quando Aplicada |
|--------|----------------|
| `dss-breadcrumbs-el--clickable` | `to` ou `href` definido |
| `dss-breadcrumbs-el--current` | Sem `to` e sem `href` (item estático) |
| `dss-breadcrumbs-el--disabled` | `disable: true` |

## Tokens CSS Utilizados

| Token | Uso |
|-------|-----|
| `--dss-text-subtle` | Cor do item clicável (estado default) |
| `--dss-text-body` | Cor do item clicável em hover/active; cor do item atual |
| `--dss-font-weight-semibold` | Peso do item atual (--current) |
| `--dss-font-weight-bold` | Peso reforçado em prefers-contrast: high |
| `--dss-spacing-1` | Gap entre ícone e label |
| `--dss-duration-150` | Duração da transição de cor |
| `--dss-easing-standard` | Easing da transição |
| `--dss-opacity-disabled` | Opacidade do estado disabled (0.4) |
| `--dss-radius-sm` | Border-radius do focus ring |
| `--dss-border-width-thin` | Outline em prefers-contrast: high |
| `--dss-border-width-thick` | Outline em focus-visible + prefers-contrast: high |
| `--dss-hub-600` | Cor hub (light mode) |
| `--dss-hub-400` | Cor hub (dark mode) |
| `--dss-water-500` | Cor water (light mode) |
| `--dss-water-400` | Cor water (dark mode) |
| `--dss-waste-600` | Cor waste (light mode) |
| `--dss-waste-500` | Cor waste (dark mode) |

## Exceções CSS

| ID | Valor | Justificativa |
|----|-------|---------------|
| EXC-01 | Seletor composto `.dss-breadcrumbs-el.q-breadcrumbs__el` | Level 1 DOM — especificidade para override Quasar. Precedente: DssTabPanel EXC-01. |
| EXC-02 | `text-decoration: underline` | Sem token DSS para text-decoration. Padrão WCAG 2.1 SC 1.4.1. |

## Gate de Composição v2.4 — Exceção Formal

| ID | Local | Justificativa |
|----|-------|---------------|
| GATE-EXC-01 | `1-structure/DssBreadcrumbsEl.ts.vue` — template | `<q-breadcrumbs-el>` gerencia roteamento Vue Router e dualidade `<a>`/estático. |

## Comportamentos Implícitos

- **`inheritAttrs: false`**: Atributos não declarados (incluindo `aria-current="page"`) são forwarded para `<q-breadcrumbs-el>` via `v-bind="$attrs"`.
- **Ícone**: Sempre renderizado antes do conteúdo textual (slot/label). `aria-hidden="true"` — decorativo quando usado com label.
- **Slot priority**: Slot sobrepõe `label`. Icon prop é independente do slot — sempre renderizado se definido.
- **Routing**: Quando `to` é objeto, interpreta como `RouteLocationRaw` do Vue Router.
