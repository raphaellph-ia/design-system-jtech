# DssBreadcrumbsEl

Elemento individual de trilha de navegação (breadcrumb). Wrapper DSS governado sobre `QBreadcrumbsEl`.

Condicionalmente interativo: quando `to` ou `href` está presente, comporta-se como link; quando estático (sem `to`/`href`), representa o item atual da trilha (página corrente).

## Instalação

```js
import { DssBreadcrumbsEl } from '@dss/components'
```

## Uso Básico

```vue
<template>
  <!-- Item clicável -->
  <DssBreadcrumbsEl to="/home" label="Início" />

  <!-- Item com ícone -->
  <DssBreadcrumbsEl to="/produtos" icon="shopping_cart" label="Produtos" />

  <!-- Item atual (página corrente) — sem to/href -->
  <DssBreadcrumbsEl label="Detalhes" aria-current="page" />
</template>
```

## Trilha Completa (contexto típico)

```vue
<template>
  <nav aria-label="Trilha de navegação">
    <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
    <!-- Separador é responsabilidade do DssBreadcrumbs pai -->
    <DssBreadcrumbsEl to="/produtos" label="Produtos" />
    <DssBreadcrumbsEl label="Fone Pro" aria-current="page" />
  </nav>
</template>
```

> **Nota:** O `DssBreadcrumbs` (container com separadores automáticos e `aria-label` do `<nav>`) ainda não está implementado. Use `<nav>` manualmente como contexto temporário.

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | — | Texto do item de breadcrumb |
| `icon` | `string` | — | Ícone Material Icons antes do conteúdo |
| `to` | `string \| object` | — | Destino Vue Router — torna o item clicável |
| `href` | `string` | — | URL externa — alternativa ao `to` |
| `disable` | `boolean` | `false` | Desabilita a interação |
| `tag` | `string` | — | Sobrescreve a tag HTML renderizada |

### Props Bloqueadas

| Prop | Motivo |
|------|--------|
| `ripple` | DSS não usa ripple em navegação estrutural |
| `exact` | Gerenciado pelo DssBreadcrumbs pai |
| `active-class` | DSS governa classes de estado via tokens |
| `exact-active-class` | Mesmo motivo de `active-class` |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo personalizado. Sobrepõe `label`. O ícone (`icon`) sempre é renderizado antes do slot. |

## Eventos

Sem eventos próprios. Navegação gerenciada via `to`/`href`. Eventos DOM nativos (`click`, etc.) propagados via `$attrs`.

## Estados

| Estado | Aplicável | Observação |
|--------|-----------|------------|
| default | ✅ | Cor `--dss-text-subtle` (clicável) ou `--dss-text-body` semibold (atual) |
| hover | ✅ | Apenas item clicável |
| focus-visible | ✅ | Apenas item clicável — DSS focus ring |
| active | ✅ | Apenas item clicável |
| disabled | ✅ | `--dss-opacity-disabled`, `pointer-events: none` |
| loading | ❌ | Pertence à página de destino |
| error | ❌ | Pertence ao roteamento |
| indeterminate | ❌ | Não aplicável a trilhas de navegação |

## Acessibilidade

- `aria-current="page"` deve ser injetado pelo consumidor (ou pelo `DssBreadcrumbs` pai) no último item da trilha
- `aria-hidden="true"` no ícone quando usado junto ao label
- Item estático (`--current`) tem `pointer-events: none` — não é focável por teclado
- Navegação por teclado: `Tab` foca itens clicáveis, `Enter` ativa o link

## Links

- [Documentação Normativa](./DssBreadcrumbsEl.md)
- [API Reference](./DSSBREADCRUMBSEL_API.md)
- [Exemplos](./DssBreadcrumbsEl.example.vue)
- [DssIcon](../DssIcon/README.md)
