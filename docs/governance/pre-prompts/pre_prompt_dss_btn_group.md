# Pre-Prompt de Criação — DssBtnGroup

> **Status:** Artefato de Governança — DSS v2.2
> **Criado:** 26 Mar 2026
> **Nota de Origem:** Especificação original fornecida inline durante sessão de trabalho (26 Mar 2026).
> Este documento é a reconstrução fiel da especificação normativa utilizada para criar o componente.
> Toda a informação deriva dos arquivos de documentação gerados (`DssBtnGroup.md`, `DSSBTNGROUP_API.md`, `dss.meta.json`).

---

## Contexto do Componente

Você é o Agente DSS responsável por criar o componente **DssBtnGroup** conforme a especificação normativa DSS v2.2.

---

## Classificação Normativa

| Campo | Valor |
|-------|-------|
| **Nome** | DssBtnGroup |
| **Componente Quasar Equivalente** | QBtnGroup |
| **Categoria** | Container de Composição (Action Group) |
| **Fase** | 2 — Componente Composto |
| **Golden Reference** | DssChip |
| **Golden Context** | DssCard |
| **Status Inicial** | Pré-auditoria |
| **DSS Version** | v2.2 |

**Justificativa Fase 2:** O DssBtnGroup gerencia estado visual compartilhado entre múltiplos DssButton filhos (border-radius, separadores, layout). Isso caracteriza composição interna — critério da Fase 2.

**Justificativa Golden Context (DssCard):** DssCard é o componente composto de Fase 2 mais próximo semanticamente. Ambos são containers estruturais de composição.

---

## 2. O Grande Risco Arquitetural

### 2.1 Prop Sync Obrigatório

> ⚠️ CRÍTICO — Esta é a regra mais importante do componente.

O DssBtnGroup **não propaga automaticamente** as props de estilo para os filhos. As props de estilo (`flat`, `outline`, `push`, `unelevated`, `glossy`, `square`) **DEVEM ser declaradas tanto no DssBtnGroup quanto em cada DssButton filho**.

Fonte: Quasar oficial — *"You must use same design props (flat, outline, push, …) on both the parent QBtnGroup and the children QBtn/QBtnDropdown."*

```vue
<!-- ❌ INCORRETO: botões filhos não herdarão o estilo flat -->
<DssBtnGroup flat>
  <DssButton label="Primeiro" />
  <DssButton label="Segundo" />
</DssBtnGroup>

<!-- ✅ CORRETO: prop declarada no grupo E em cada filho -->
<DssBtnGroup flat>
  <DssButton flat label="Primeiro" />
  <DssButton flat label="Segundo" />
</DssBtnGroup>
```

### 2.2 Escopo de Estilo: Não-Scoped Obrigatório

O `<style>` do Vue component **deve ser não-scoped** (`<style lang="scss">`, sem `scoped`). Com `scoped`, os filhos passados via `<slot>` não recebem o atributo de escopo do Vue e nenhum seletor `.dss-btn-group > .dss-button` produziria efeito em runtime.

```vue
<!-- ❌ INCORRETO — child selectors não funcionam com scoped -->
<style lang="scss" scoped>

<!-- ✅ CORRETO — estilos globais necessários para o grouping funcionar -->
<style lang="scss">
```

### 2.3 Gate de Responsabilidade v2.4

**Atenção:** O componente não deve capturar estados interativos (`:hover`, `:focus-visible`) dos filhos via CSS. No caso do `_outline.scss`, o uso de `z-index` no hover do filho foi registrado como uma exceção formal (`responsibilityGateV24`) no `dss.meta.json`, pois altera apenas o contexto de empilhamento, não a aparência do botão.

```scss
/* ❌ ANTI-PATTERN — pai capturando estado do filho sem exceção formal */
.dss-btn-group--outline > .dss-button:hover {
  color: red; /* altera aparência do filho */
}

/* ✅ EXCEÇÃO FORMAL DOCUMENTADA — altera apenas z-index de empilhamento */
/* Ver dss.meta.json > gateExceptions > responsibilityGateV24 */
.dss-btn-group--outline > .dss-button:hover,
.dss-btn-group--outline > .dss-button:focus-visible {
  position: relative;
  z-index: 1; /* contexto de empilhamento apenas — sem mudança visual no botão */
}
```

---

## API do Componente

### Props

#### Props de Estilo Visual (Prop Sync Obrigatório)

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `flat` | Boolean | `false` | Sem elevação/borda. Adiciona separador `--dss-gray-300` entre filhos no container. |
| `outline` | Boolean | `false` | Com borda visível. Colapsa bordas duplas com `margin-left: calc(-1 * --dss-border-width-thin)`. |
| `push` | Boolean | `false` | Estilo 3D. Adiciona separador `--dss-gray-200` entre filhos. |
| `unelevated` | Boolean | `false` | Remove sombra. Adiciona separador `--dss-gray-200` entre filhos. |
| `glossy` | Boolean | `false` | Efeito glossy. Nenhum ajuste de grupo necessário — responsabilidade dos filhos. |

#### Props de Forma

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `rounded` | Boolean | `false` | `border-radius: var(--dss-radius-full)` nos cantos externos. Filhos intermediários mantêm `border-radius: 0`. |
| `square` | Boolean | `false` | Remove todo border-radius (`0`) de todos os filhos. |

#### Props de Layout

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `spread` | Boolean | `false` | `display: flex`. Filhos recebem `flex: 1`. |
| `stretch` | Boolean | `false` | `align-self: stretch`. Filhos: `align-self: stretch; min-height: 0`. Requer contexto flexbox externo. |

#### Props de Brandabilidade

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | `String \| null` | `null` | `'hub'` \| `'water'` \| `'waste'` | Acento visual de marca na borda inferior via `box-shadow` inset. |

#### Props de Acessibilidade

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Valor do `aria-label` no container `role="group"`. |

### Props Bloqueadas (Não Suportadas)

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global. |
| `color` | Pertence ao DssButton filho. |
| `text-color` | Pertence ao DssButton filho. |
| `size` | Pertence ao DssButton filho. |
| `dense` | Pertence ao DssButton filho. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Aceita `DssButton`. `DssBtnDropdown` previsto para Fase 2. |

### Eventos

Nenhum. Container estrutural — eventos pertencem aos DssButton filhos.

---

## Arquitetura CSS Obrigatória

### Estrutura de Arquivos

```
DssBtnGroup/
├── 1-structure/DssBtnGroup.ts.vue
├── 2-composition/_base.scss
├── 3-variants/
│   ├── _flat.scss
│   ├── _outline.scss
│   ├── _push.scss
│   ├── _unelevated.scss
│   ├── _glossy.scss          ← placeholder intencional
│   └── index.scss
├── 4-output/
│   ├── _states.scss          ← dark mode, forced-colors
│   ├── _brands.scss          ← Hub, Water, Waste
│   └── index.scss
├── composables/
│   ├── useBtnGroupClasses.ts
│   └── index.ts
├── types/btn-group.types.ts
├── DssBtnGroup.module.scss
├── DssBtnGroup.vue            ← Entry Point Wrapper
├── DssBtnGroup.example.vue
├── DssBtnGroup.md
├── DSSBTNGROUP_API.md
├── dss.meta.json
├── index.js
└── README.md
```

### Exceção Arquitetural de Composição (Documentada)

O DssBtnGroup **usa seletores CSS globais** do tipo `.dss-btn-group > .dss-button` para gerenciar border-radius e separadores dos filhos. Esta é a única exceção permitida à regra "componentes DSS não estilizam filhos internamente".

**Justificativa:** Gerenciar visualmente os filhos É o propósito do componente group. Não usa `::v-deep` (estilos globais, não scoped). O `<style>` do Vue component **deve ser não-scoped** para que esses seletores funcionem.

### Seletores Obrigatórios (Layer 2)

```scss
/* Primeiro filho */
.dss-btn-group > .dss-button:first-child:not(:only-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* Último filho */
.dss-btn-group > .dss-button:last-child:not(:only-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Filhos intermediários */
.dss-btn-group > .dss-button:not(:first-child):not(:last-child) {
  border-radius: 0; /* EXC-01 documentada */
}
```

---

## Tokens CSS Obrigatórios

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L2 + L3 | Colapso outline / separadores |
| `--dss-border-width-thick` | L4 | Acento de brand (inset box-shadow) |
| `--dss-border-width-md` | Module | High contrast outline |
| `--dss-gray-200` | L3 | Separador push e unelevated |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-radius-full` | L2 | Variante rounded — border-radius pill |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

---

## Exceções Documentadas (Obrigatórias)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `2-composition/_base.scss` | Square variant — `0` é semântico, não hardcoded visual. Padrão DssCard EXC-03. |
| EXC-02 | `rgba(255,255,255,0.12)` | `4-output/_states.scss` | Dark mode divider — sem token DSS equivalente. Padrão Material Design. Padrão DssCard EXC-01. |
| EXC-03 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors — system keywords obrigatórios. Padrão DssCard EXC-04. |

---

## Acessibilidade

| Atributo | Valor | Condição |
|----------|-------|----------|
| `role` | `"group"` | Sempre |
| `aria-label` | valor de `ariaLabel` | Quando prop fornecida |

- **Touch target:** Opção B — delegado a cada DssButton filho. DssBtnGroup não é Compact Control.
- **Foco:** O container não captura foco. Cada DssButton filho é navegável por Tab individualmente.
- **`inheritAttrs: false`** + `v-bind="$attrs"` no container `<div>`.

---

## Estados

| Estado | Aplicável ao DssBtnGroup |
|--------|--------------------------|
| default | ✅ Único estado do container |
| hover, focus, active, disabled, loading, error, indeterminate | ❌ Pertencem aos DssButton filhos |

---

## Exemplos Obrigatórios (mínimo 6)

1. Básico unelevated com 3 botões
2. Outline com ícones
3. Flat (toolbar de formatação)
4. Spread (largura total)
5. Brand Hub + Brand Water
6. Rounded (pill)
7. Anti-pattern: prop sync incorreto vs correto

---

## Requisitos de Documentação

- `DssBtnGroup.md` — Template 13.1 completo (17 seções mínimas)
- `DSSBTNGROUP_API.md` — API Reference com todos os contratos
- `README.md` — Quick start com Prop Sync Rule destacada
- `dss.meta.json` — goldenReference, goldenContext, phase, exceptions, tokens, propsBlocked
- `DssBtnGroup.example.vue` — 6+ cenários + anti-pattern

---

*Artefato de Governança — DSS v2.2 — 26 Mar 2026*
