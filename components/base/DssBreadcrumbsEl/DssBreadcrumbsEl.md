# DssBreadcrumbsEl — Documentação Normativa DSS v2.2

**Versão:** v1.0.0  
**Status:** Pronto para Auditoria  
**Fase:** 2 — Componente Estrutural/Interativo  
**Golden Reference:** DssButton  
**Golden Context:** DssBreadcrumbs (futuro — Fase 3)  
**Equivalente Quasar:** QBreadcrumbsEl  
**Data:** 2026-04-10

---

## 1. Visão Geral

O `DssBreadcrumbsEl` é o elemento individual de uma trilha de navegação (breadcrumb). É um wrapper DSS governado sobre o `QBreadcrumbsEl` do Quasar.

### O que FAZ

- Renderiza um item de breadcrumb clicável (link) quando `to` ou `href` está presente
- Renderiza um item estático (item atual, página corrente) quando sem `to`/`href`
- Compõe `DssIcon` internamente para ícone opcional antes do conteúdo
- Propaga `aria-current="page"` e demais `$attrs` para o elemento raiz via `inheritAttrs: false`
- Aplica tokens DSS de cor, tipografia, transição e foco ao elemento renderizado

### O que NÃO FAZ

- Não renderiza separadores entre itens — responsabilidade do `DssBreadcrumbs` pai
- Não gerencia o `<nav>` com `aria-label` — responsabilidade do `DssBreadcrumbs` pai
- Não controla qual item é o atual — essa lógica pertence ao consumidor (ou ao `DssBreadcrumbs` pai via `aria-current`)
- Não implementa ripple, animações de clique ou feedback visual além de hover/focus/active

### Dualidade Clicável/Estático

Esta é a característica central e mais importante do `DssBreadcrumbsEl`. O `QBreadcrumbsEl` renderiza elementos distintos dependendo das props:

| Condição | Tag renderizada | Classe BEM DSS | Interatividade |
|----------|----------------|----------------|----------------|
| `to` ou `href` presente | `<a>` | `--clickable` | hover, focus, active, disabled |
| Sem `to` e sem `href` | tag padrão (div) | `--current` | Nenhuma — `pointer-events: none` |

Esta dualidade é uma exceção prevista ao Gate de Responsabilidade v2.4, documentada formalmente.

---

## 2. Instalação

```js
import { DssBreadcrumbsEl } from '@dss/components'
```

---

## 3. Uso Básico

```vue
<template>
  <!-- Item clicável com Vue Router -->
  <DssBreadcrumbsEl to="/inicio" label="Início" />

  <!-- Item clicável com link externo -->
  <DssBreadcrumbsEl href="https://example.com" label="Site Externo" />

  <!-- Item com ícone -->
  <DssBreadcrumbsEl to="/produtos" icon="shopping_cart" label="Produtos" />

  <!-- Item atual (página corrente) — injetar aria-current="page" -->
  <DssBreadcrumbsEl label="Detalhes do Produto" aria-current="page" />
</template>
```

### Contexto Típico (sem DssBreadcrumbs)

Até a implementação do `DssBreadcrumbs`, use `<nav>` como container:

```vue
<template>
  <nav aria-label="Trilha de navegação">
    <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
    <span aria-hidden="true"> / </span>
    <DssBreadcrumbsEl to="/produtos" label="Produtos" />
    <span aria-hidden="true"> / </span>
    <DssBreadcrumbsEl label="Fone de Ouvido Pro" aria-current="page" />
  </nav>
</template>
```

---

## 4. Props

### Props Expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | `undefined` | Texto do item |
| `icon` | `string` | `undefined` | Nome do ícone Material Icons |
| `to` | `string \| Record<string, unknown>` | `undefined` | Destino Vue Router |
| `href` | `string` | `undefined` | URL externa |
| `disable` | `boolean` | `false` | Desabilita a interação |
| `tag` | `string` | QBreadcrumbsEl default | Sobrescreve a tag HTML |

### Props Bloqueadas

| Prop | Motivo |
|------|--------|
| `ripple` | DSS não usa ripple em navegação estrutural |
| `exact` | Gerenciado pelo `DssBreadcrumbs` pai |
| `active-class` | DSS governa via BEM + tokens |
| `exact-active-class` | Mesmo motivo |

---

## 5. Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `VNode[]` | Conteúdo personalizado. Sobrepõe `label`. O ícone (`icon`) renderiza antes, independentemente do slot. |

---

## 6. Eventos

Sem eventos próprios. Navegação gerenciada via `to`/`href`. Eventos DOM nativos (`click`, `keydown`, etc.) propagados via `$attrs`.

---

## 7. Estados

### 7.1 Item Clicável (`--clickable`)

| Estado | Token Principal | Comportamento |
|--------|----------------|---------------|
| `default` | `--dss-text-subtle` | Cor muted, sem underline |
| `hover` | `--dss-text-body` | Cor principal + `text-decoration: underline` (EXC-02) |
| `focus-visible` | `dss-focus-ring` mixin | Outline DSS + `border-radius: --dss-radius-sm` |
| `active` | `--dss-text-body` | Igual ao hover |
| `disabled` | `--dss-opacity-disabled` | Opacidade 0.4, `pointer-events: none` |

### 7.2 Item Atual (`--current`)

| Estado | Token Principal | Comportamento |
|--------|----------------|---------------|
| `default` | `--dss-text-body` + `--dss-font-weight-semibold` | Cor principal, peso semibold |

Estados `hover`, `focus`, `active` **não aplicáveis** ao item atual (`pointer-events: none`).

### Estados Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `loading` | Pertence à página de destino, não ao elemento de breadcrumb |
| `error` | Pertence ao roteamento/network |
| `indeterminate` | Não aplicável a trilhas de navegação |

---

## 8. Acessibilidade (WCAG 2.1 AA)

### 8.1 `aria-current="page"`

O atributo `aria-current="page"` deve ser aplicado ao **último item da trilha** (item atual). Responsabilidade do consumidor ou do `DssBreadcrumbs` pai. O `DssBreadcrumbsEl` propaga qualquer `$attrs` para o elemento raiz via `inheritAttrs: false`.

```vue
<!-- Correto: consumidor injeta aria-current -->
<DssBreadcrumbsEl label="Página Atual" aria-current="page" />
```

### 8.2 Ícone Decorativo

Quando `icon` é usado junto ao `label`, o `DssIcon` recebe `aria-hidden="true"` — o label fornece a alternativa textual.

> **Atenção (RES-02):** Se usar APENAS ícone (sem label e sem slot com texto), adicione `aria-label` no `DssBreadcrumbsEl`:
> ```vue
> <DssBreadcrumbsEl to="/home" icon="home" aria-label="Início" />
> ```

### 8.3 Navegação por Teclado

| Tecla | Comportamento |
|-------|---------------|
| `Tab` | Move foco para o próximo item **clicável** |
| `Enter` | Ativa o link (item clicável) |
| `Shift + Tab` | Move foco para o item clicável anterior |

O item estático (`--current`) não é focável — `pointer-events: none` remove-o do tab order.

### 8.4 Outline Permanente em `prefers-contrast: high` (Decisão de Design)

Em `@media (prefers-contrast: high)`, todos os itens com estado `--clickable` recebem um `outline: var(--dss-border-width-thin) solid currentColor` **permanente** (não restrito ao `:focus-visible`). Esta é uma **decisão de design intencional** para elementos de navegação estrutural:

- Usuários com baixa visão que ativam high contrast precisam identificar rapidamente quais elementos são interativos dentro de uma trilha de navegação.
- A percepção visual de links interativos vs. item atual é reforçada pelo outline permanente — diferente de controles de ação como DssButton, onde o outline permanente seria excessivo.
- O item `--current` **não** recebe outline (apenas `font-weight: bold` reforçado), preservando a distinção visual entre clicável e estático em high contrast.

> **Divergência intencional do Golden Reference (DssButton):** DssButton aplica outline apenas em `:focus-visible`. A diferença é justificada pela semântica de navegação estrutural do DssBreadcrumbsEl — múltiplos itens clicáveis em sequência, onde a identificação visual imediata é prioritária.

### 8.5 `<nav>` e `aria-label`

O `DssBreadcrumbsEl` não renderiza o `<nav>`. O consumidor (ou `DssBreadcrumbs` pai) é responsável por:
```html
<nav aria-label="Trilha de navegação">
  <!-- DssBreadcrumbsEl items -->
</nav>
```

---

## 9. Tokens Utilizados

| Token | Local | Uso |
|-------|-------|-----|
| `--dss-text-subtle` | `2-composition/_base.scss` | Cor do item clicável (default) |
| `--dss-text-body` | `2-composition/_base.scss` | Cor em hover/active e item atual |
| `--dss-font-weight-semibold` | `2-composition/_base.scss` | Peso do item atual |
| `--dss-font-weight-bold` | `4-output/_states.scss` | Peso reforçado em prefers-contrast |
| `--dss-spacing-1` | `2-composition/_base.scss` | Gap entre ícone e label |
| `--dss-duration-150` | `2-composition/_base.scss` | Duração da transição |
| `--dss-easing-standard` | `2-composition/_base.scss` | Easing da transição |
| `--dss-opacity-disabled` | `2-composition/_base.scss` | Opacidade disabled (0.4) |
| `--dss-radius-sm` | `2-composition/_base.scss` | Border-radius focus ring |
| `--dss-border-width-thin` | `4-output/_states.scss` | Outline em prefers-contrast |
| `--dss-border-width-thick` | `4-output/_states.scss` | Outline focus em prefers-contrast |
| `--dss-hub-600` | `4-output/_brands.scss` | Cor hub light mode |
| `--dss-hub-400` | `4-output/_brands.scss` | Cor hub dark mode |
| `--dss-water-500` | `4-output/_brands.scss` | Cor water light mode |
| `--dss-water-400` | `4-output/_brands.scss` | Cor water dark mode |
| `--dss-waste-600` | `4-output/_brands.scss` | Cor waste light mode |
| `--dss-waste-500` | `4-output/_brands.scss` | Cor waste dark mode |

---

## 10. Comportamentos Implícitos

### 10.1 Forwarding de Atributos (`inheritAttrs: false`)

`DssBreadcrumbsEl` usa `inheritAttrs: false`. Todos os atributos não declarados como props (incluindo `aria-current`, `data-*`, `class` adicional, event listeners) são forwarded para `<q-breadcrumbs-el>` via `v-bind="$attrs"`, que os aplica ao elemento raiz renderizado (`<a>` ou elemento estático).

### 10.2 Composição do Slot

O slot `default` sobrepõe a prop `label` como fallback. O ícone (`icon` prop) é **sempre renderizado antes** do conteúdo do slot/label, independentemente do que o slot contenha.

```vue
<!-- label é o fallback do slot -->
<DssBreadcrumbsEl to="/home" label="Início" />

<!-- slot sobrepõe label -->
<DssBreadcrumbsEl to="/home" label="Início">
  <strong>Início</strong>
</DssBreadcrumbsEl>

<!-- icon + slot -->
<DssBreadcrumbsEl to="/home" icon="home">
  Início ← slot content
</DssBreadcrumbsEl>
```

### 10.3 Routing

Quando `to` é um objeto, é interpretado como `RouteLocationRaw` pelo `QBreadcrumbsEl` / Vue Router:

```vue
<DssBreadcrumbsEl
  :to="{ name: 'produto-detalhes', params: { id: '123' } }"
  label="Produto"
/>
```

### 10.4 `-webkit-tap-highlight-color: transparent`

Aplicado via seletor composto `.dss-breadcrumbs-el.q-breadcrumbs__el` (EXC-01) para remover o highlight nativo do iOS/Android ao tocar o item clicável.

---

## 11. Exceções Documentadas

### EXC-01 — Seletor Composto `.dss-breadcrumbs-el.q-breadcrumbs__el`

- **Valor:** Seletor composto — duas classes no mesmo elemento raiz
- **Local:** `2-composition/_base.scss`
- **Justificativa:** Level 1 DOM pattern: `.dss-breadcrumbs-el` é aplicado ao mesmo elemento raiz que `.q-breadcrumbs__el` (renderizado pelo QBreadcrumbsEl). O seletor composto garante especificidade suficiente para sobrescrever `display:flex`, `-webkit-tap-highlight-color` e demais estilos nativos do Quasar sem seletores descendentes. Precedente: DssTabPanel EXC-01 (`.dss-tab-panel.q-tab-panel`).

### EXC-02 — `text-decoration: underline`

- **Valor:** `text-decoration: underline`
- **Local:** `2-composition/_base.scss` — estado `:hover` e `:active`
- **Justificativa:** Não existe token DSS para `text-decoration`. O underline em hover/active é padrão de UX amplamente aceito para links em contexto de navegação estrutural — conforme WCAG 2.1 Success Criterion 1.4.1 (Use of Color), que recomenda distinguir links do texto circundante por meio adicional além da cor.

---

### Exceções aos Gates v2.4

#### Gate de Composição v2.4 — Regra 1 (Uso de componente Quasar no template)

**GATE-EXC-01 — Uso de `<q-breadcrumbs-el>` como elemento raiz**

- **Local:** `1-structure/DssBreadcrumbsEl.ts.vue`
- **Justificativa:** `DssBreadcrumbsEl` usa `<q-breadcrumbs-el>` como elemento raiz (Level 1 DOM pattern). O `QBreadcrumbsEl` gerencia o roteamento Vue Router (prop `to` → `RouterLink`/`<a>`), a dualidade de renderização clicável/estático e os atributos de link (`tabindex`, `role`) — funcionalidade que não pode ser reimplementada sem o componente Quasar sem reimplementar o Vue Router link handling.

> Exceção registrada formalmente em `dss.meta.json` → `gateExceptions.compositionGateV24`. Precedente: `DssTabPanel` (Golden Context da família Tabs), `DssTabPanels`.

---

## 12. Reservas

| ID | Descrição | Impacto |
|----|-----------|---------|
| RES-01 | DssBreadcrumbs (container com separadores automáticos) ainda não implementado | Baixo — usar `<nav>` manualmente como workaround |
| RES-02 | Uso exclusivo de ícone sem label pode ser inacessível sem `aria-label` explícito | Baixo — caso raro, documentado como uso avançado |
| RES-03 | Sem unit tests em v1.0.0 | Baixo — lógica mínima (composable de classes) |

---

## 13. Paridade com Golden Reference (DssButton)

| Aspecto | DssButton | DssBreadcrumbsEl | Divergência Intencional |
|---------|-----------|-----------------|------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — |
| `v-bind="$attrs"` no root | ✅ | ✅ | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | — |
| `dss-focus-ring` mixin | ✅ | ✅ (apenas --clickable) | — |
| `prefers-reduced-motion` | ✅ | ✅ | — |
| `prefers-contrast: high` | ✅ | ✅ | — |
| `forced-colors: active` | ✅ | ✅ | — |
| `--dss-opacity-disabled` | ✅ | ✅ | — |
| Touch target `::before` WCAG 2.5.5 | ✅ | ❌ | DssBreadcrumbsEl v1.0.0 — RES-03 (v1.1.0) |
| Ripple effect | ✅ | ❌ | Proposital — ripple bloqueado (propsBlocked) |
| Estado `loading` | ✅ | ❌ | Proposital — loading pertence à página de destino |
| Elemento raiz próprio (`<button>`) | ✅ | ❌ `<q-breadcrumbs-el>` | GATE-EXC-01 — roteamento Vue Router |
| Dualidade interativo/estático | ❌ | ✅ | Característica central do DssBreadcrumbsEl |
| Brand tokens numéricos | ✅ | ✅ | Padrão DSS v1.0.0 |

---

## 14. Matriz de Composição DSS (Fase 2)

### Papel Estrutural

`DssBreadcrumbsEl` é o **bloco de construção atômico** da família Breadcrumbs. É Nível 1 — independente, sem subcomponentes DSS obrigatórios além do `DssIcon` opcional.

### Hierarquia da Família

```
DssBreadcrumbs          ← Nível 2 (futuro) — container com separadores + nav aria
  └── DssBreadcrumbsEl  ← Nível 1 (este componente) — item individual
        └── DssIcon     ← Composição interna opcional
```

### Componentes DSS na Composição

| Componente | Status | Papel |
|------------|--------|-------|
| `DssIcon` | ✅ Implementado | Ícone antes do label — `compositionRequirements` |
| `DssBreadcrumbs` | 🟡 Planejado (Fase 3) | Container pai com separadores e `<nav>` |

### Limites de Responsabilidade

| Responsabilidade | DssBreadcrumbsEl | DssBreadcrumbs (futuro) |
|-----------------|------------------|------------------------|
| Renderizar item individual | ✅ | — |
| Estilizar estado clicável/atual | ✅ | — |
| Renderizar separador | ❌ | ✅ |
| Gerenciar `<nav aria-label>` | ❌ | ✅ |
| Injetar `aria-current="page"` | ❌ (via $attrs) | ✅ |
| Controlar item ativo | ❌ | ✅ |

### Anti-Patterns de Composição

```vue
<!-- ❌ Incorreto: usar QBreadcrumbsEl diretamente -->
<nav>
  <q-breadcrumbs-el to="/home" label="Início" />
</nav>

<!-- ✅ Correto: usar DssBreadcrumbsEl -->
<nav aria-label="Trilha de navegação">
  <DssBreadcrumbsEl to="/home" label="Início" />
</nav>

<!-- ❌ Incorreto: usar QIcon em vez de DssIcon (QIcon é gerenciado pelo Quasar internamente) -->
<!-- O ícone no DssBreadcrumbsEl é sempre via prop `icon` → DssIcon -->

<!-- ❌ Incorreto: sobrescrever estilos internos do DssBreadcrumbsEl -->
<style>
.dss-breadcrumbs-el--clickable { color: red !important; }
</style>
```

---

## 15. Gate de Conformidade DSS v2.2

### Gate Estrutural (Bloqueante)
- [x] 4 camadas existem em completude
- [x] Entry Point Wrapper (`DssBreadcrumbsEl.vue`) — re-export puro
- [x] Orquestrador SCSS (`DssBreadcrumbsEl.module.scss`) — L2 → L3 → L4
- [x] Barrel export (`index.js`) — componente + types + composables
- [x] `dss.meta.json` com `goldenReference` e `goldenContext`

### Gate Técnico (Bloqueante)
- [x] Nenhum valor hardcoded — EXC-01 e EXC-02 documentados
- [x] Gate de Composição v2.4 — GATE-EXC-01 em `gateExceptions`
- [x] `defineOptions({ name, inheritAttrs: false })`
- [x] `v-bind="$attrs"` no elemento raiz
- [x] `-webkit-tap-highlight-color: transparent`
- [x] `dss-focus-ring` mixin (item clicável)
- [x] `prefers-reduced-motion: reduce`
- [x] `prefers-contrast: high`
- [x] `forced-colors: active` — system color keywords
- [x] `@media print`

### Gate Documental (Bloqueante para Selo)
- [x] Tokens listados com nomes exatos (1:1 com SCSS)
- [x] README completo
- [x] Documentação normativa (Template 13.1)
- [x] API Reference
- [x] Exemplo funcional (mínimo 4 cenários)
- [x] Reservas documentadas
- [x] Paridade com Golden Reference
- [x] Matriz de Composição

---

> **Declaração:** Componente **PRONTO PARA AUDITORIA DSS v2.2**.  
> Nenhum selo emitido. Nenhuma auto-certificação de conformidade.
