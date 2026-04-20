# DssDrawer — Documentação Normativa DSS v2.2

> **Status**: Pendente Auditoria DSS v2.2
> **Versão**: 1.0.0 | **Fase**: 2 | **Data**: 2026-04-19

---

## 1. Identificação e Classificação

| Atributo | Valor |
|---|---|
| **Nome** | DssDrawer |
| **Família** | Layout — Estrutura de Página |
| **Fase** | 2 — Componente Composto (Nível 3) |
| **Nível de Composição** | Nível 3 (Composição de Segundo Grau) |
| **Componente Base Quasar** | QDrawer |
| **Dependências DSS Diretas** | DssList, DssItem, DssMenu (como consumidores do slot) |
| **Golden Reference** | DssHeader |
| **Golden Context** | DssHeader |
| **Status** | Pendente Auditoria DSS v2.2 |

---

## 2. Escopo Funcional

### O que o DssDrawer FAZ

- Encapsula `<q-drawer>` expondo apenas props semanticamente relevantes ao DSS
- Gerencia a visibilidade do painel lateral via `v-model` (modelValue)
- Governa a cor de fundo via token `--dss-surface-default` (com suporte a dark mode)
- Aplica variantes de elevação (`elevated`) e borda (`bordered`)
- Suporta modo minimizado (`mini`) para exibir apenas ícones
- Aplica `role="navigation"` por padrão (sobrescritível para painéis informativos)
- Interpola o backdrop do modo overlay/mobile com `--dss-opacity-backdrop`
- Delega comportamento responsivo ao QDrawer via `behavior="default"`

### O que o DssDrawer NÃO FAZ

- Não gerencia brand — responsabilidade dos componentes filhos (DssList, DssMenu)
- Não estiliza os itens de navegação internos — responsabilidade dos DssItem filhos
- Não controla o z-index nem o posicionamento — gerenciados pelo QLayout/QDrawer
- Não expõe prop `dark` — dark mode é global via CSS (`[data-theme="dark"]`)
- Não expõe prop `behavior` — padronizado como `"default"` (bloqueado)
- Não implementa estados interativos (hover, focus, active) — pertence aos filhos
- Não cria dependência estrutural rígida — slot é aberto para composição

---

## 3. Modelo Arquitetural

**Quasar = camada de execução. DSS = camada de governança, semântica e tokenização.**

O DssDrawer é um wrapper DSS governado sobre infraestrutura Quasar — não é réplica da API do QDrawer.

---

## 4. Mapeamento Estrutural

### 4.1 Equivalente Quasar

| Quasar | Uso junto | Padrão |
|--------|-----------|--------|
| `QDrawer` | `QLayout`, `QPageContainer`, `QHeader` | Padrão de layout de SPA |

### 4.2 Superfície de Composição DSS

| Status | Componente | Papel no DssDrawer |
|--------|-----------|---------------------|
| 🟢 Existente | DssList | Conteúdo primário — lista de navegação |
| 🟢 Existente | DssItem | Itens de navegação (via DssList) |
| 🟢 Existente | DssMenu | Sub-menus contextuais |
| 🟢 Existente | DssSeparator | Divisores de seção |
| 🟢 Existente | DssIcon | Ícones nos itens (via DssItem slot leading) |
| 🟡 Planejado | DssLayout | Container de layout de página (Nível 4) |
| ⚪ Inexistente | DssDrawerHeader | Cabeçalho interno fixo do drawer |

### 4.3 Declaração de Impacto

- **Existentes**: DssList, DssItem, DssMenu, DssSeparator, DssIcon ✅
- **Planejados**: DssLayout (necessário para substituir q-layout no exemplo) 🟡
- **Inexistentes**: DssDrawerHeader (não crítico para Fase 1 de uso) ⚪

**Risco se DssLayout não existir**: Baixo — exemplos usam q-layout via EXC-01 (isenção formal).
**Impacto arquitetural**: O DssDrawer funciona completamente sem DssLayout.
**Recomendação**: Criar DssLayout como próxima prioridade da família Layout.

---

## 5. Arquitetura de Arquivos

```
DssDrawer/
├── 1-structure/
│   └── DssDrawer.ts.vue         ← Implementação canônica (Vue 3 + TS)
├── 2-composition/
│   └── _base.scss               ← Estilos base com tokens genéricos
├── 3-variants/
│   ├── _elevated.scss           ← Variante com sombra
│   ├── _bordered.scss           ← Variante com borda lateral
│   ├── _mini.scss               ← Variante minimizada
│   └── index.scss               ← Orchestrador L3
├── 4-output/
│   ├── _states.scss             ← Dark mode, contrast, forced-colors, print
│   ├── _brands.scss             ← Delegação de brand (comentário normativo)
│   └── index.scss               ← Orchestrador L4
├── composables/
│   ├── useDrawerClasses.ts      ← Lógica de classes CSS
│   └── index.ts                 ← Barrel export
├── types/
│   └── drawer.types.ts          ← DrawerProps, DrawerEmits, DrawerSlots, DrawerSide
├── DssDrawer.vue                ← Entry Point Wrapper (re-export puro)
├── DssDrawer.module.scss        ← Orchestrador SCSS: L2 → L3 → L4
├── DssDrawer.example.vue        ← 5 exemplos interativos
├── DssDrawer.md                 ← Este documento
├── DSSDRAWER_API.md             ← Referência técnica de API
├── DssDrawer.test.js            ← Testes unitários e comportamentais
├── dss.meta.json                ← Metadados de auditoria DSS
├── README.md                    ← Quick start
└── index.js                     ← Barrel export
```

---

## 6. Props

### 6.1 Props Expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `boolean` | `true` | Controla visibilidade (`v-model`). `true` = aberto. |
| `side` | `'left' \| 'right'` | `'left'` | Lado de ancoramento. |
| `overlay` | `boolean` | `false` | Força sobreposição do conteúdo em todos os breakpoints. |
| `elevated` | `boolean` | `false` | Aplica `box-shadow: var(--dss-elevation-2)`. |
| `bordered` | `boolean` | `false` | Aplica borda lateral (`border-right` ou `border-left`). |
| `mini` | `boolean` | `false` | Modo minimizado — exibe apenas ícones (largura: 57px nativa QDrawer). |
| `width` | `number` | `256` | Largura em pixels. Equivale a `--dss-spacing-64`. |

### 6.2 Props Bloqueadas

| Prop QDrawer | Motivo |
|---|---|
| `dark` | Dark mode gerenciado via `[data-theme="dark"]` e `--dss-surface-default`. |
| `behavior` | Padronizado como `"default"` (desktop=push, mobile=overlay). Hardcoded no template. |

### 6.3 Props Passadas via $attrs

- `aria-label`, `aria-labelledby` — recomendados para acessibilidade
- `role` — padrão `"navigation"`, sobrescritível para `"complementary"`

---

## 7. Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `void` | Conteúdo do drawer. Aceita DssList, DssMenu ou cabeçalhos de seção DSS. Uso de HTML nativo ou texto solto é violação do Gate de Composição v2.4. |

---

## 8. Emits

| Evento | Payload | Quando |
|--------|---------|--------|
| `update:modelValue` | `boolean` | Drawer abre ou fecha. Suporta `v-model`. |

---

## 9. Estados

### 9.1 Aplicáveis

| Estado | Descrição |
|--------|-----------|
| `default` | Estado padrão — drawer aberto sem variantes |
| `elevated` | Box-shadow via `--dss-elevation-2` |
| `bordered` | Borda lateral via `--dss-border-width-thin` + `--dss-gray-200` |
| `mini` | Modo minimizado — ícones apenas |

### 9.2 Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover` | DssDrawer é container não-interativo. Responsabilidade dos DssItem filhos. |
| `focus` | Idem. QDrawer recebe `tabindex="-1"` nativamente (não é foco de usuário). |
| `active` | Idem. Estado ativo pertence aos DssItem internos. |
| `disabled` | Containers de layout não têm estado disabled. |
| `loading` | Container não carrega dados. |
| `error` | Pertence ao conteúdo interno, não ao container. |
| `indeterminate` | Não aplicável semanticamente a painéis laterais. |

---

## 10. Tokens Utilizados

| Token | Propriedade CSS | Variante |
|-------|-----------------|---------|
| `--dss-surface-default` | `background-color` | Base |
| `--dss-text-body` | `color` | Base |
| `--dss-elevation-2` | `box-shadow` | Elevated |
| `--dss-border-width-thin` | `border-width` | Bordered |
| `--dss-gray-200` | `border-color` | Bordered |
| `--dss-border-width-md` | `border-width` | Bordered + prefers-contrast |
| `--dss-opacity-backdrop` | `background` do backdrop | Overlay/Mobile |

**Todos os tokens acima são idênticos aos utilizados pelo DssHeader (Golden Context).**

---

## 11. Comportamentos Implícitos

### 11.1 Forwarding de Atributos

`inheritAttrs: false` + `v-bind="drawerAttrs"` garante que atributos não-declarados como props sejam repassados ao `<q-drawer>`. O computed `drawerAttrs` mescla `role: 'navigation'` (padrão DSS) com `useAttrs()`, permitindo que o consumidor sobrescreva o role quando necessário.

### 11.2 Role "navigation" por padrão

```typescript
const drawerAttrs = computed(() => ({
  role: 'navigation',  // padrão DSS
  ...attrs             // attrs.role sobrescreve se fornecido
}))
```

### 11.3 behavior="default" hardcoded

`behavior="default"` é posicionado APÓS `v-bind="drawerAttrs"` no template, garantindo que o consumidor não possa sobrescrever via $attrs mesmo que tente.

### 11.4 Backdrop em modo overlay/mobile

O elemento `.q-drawer__backdrop` é renderizado internamente pelo QDrawer em modo overlay ou mobile. O DssDrawer aplica `--dss-opacity-backdrop` via seletor descendente global (não-scoped). Se o QDrawer usar inline styles para o backdrop, o token pode não ter efeito (RES-02).

### 11.5 Mini mode — largura padrão

Em modo mini, o QDrawer reduz a largura para 57px (padrão interno, não configurável pelo DssDrawer). A prop `width` (256px) é ignorada quando `mini=true`. Os DssItem filhos devem suportar o modo mini por conta própria via CSS cascade do QDrawer.

### 11.6 Comportamento responsive

O DssDrawer usa `behavior="default"`:
- **Desktop**: drawer empurra o conteúdo da página (push mode) — sem backdrop
- **Mobile**: drawer sobrepõe o conteúdo com backdrop semi-transparente (overlay mode)
- **Breakpoint**: controlado pelo QLayout pai (padrão 1023px)

---

## 12. Paridade com Golden Component (DssHeader)

| Aspecto | DssHeader | DssDrawer | Status | Justificativa |
|---------|-----------|-----------|--------|---------------|
| Entry Point Wrapper | `DssHeader.vue` re-export puro | `DssDrawer.vue` re-export puro | **Igual** | Padrão obrigatório DSS |
| `defineOptions({ inheritAttrs: false })` | ✅ | ✅ | **Igual** | Padrão forwarding |
| `v-bind="$attrs"` no primitivo Quasar | ✅ | ✅ | **Igual** | Forwarding de attrs |
| Primitivo Quasar como elemento raiz | `<q-header>` | `<q-drawer>` | **Igual** | Ambos são primitivos de layout |
| `background-color !important` | ✅ (`--dss-surface-default`) | ✅ (`--dss-surface-default`) | **Igual** | EXC-02 em ambos |
| Token `--dss-elevation-2` (elevated) | ✅ | ✅ | **Igual** | Mesma semântica |
| Token `--dss-border-width-thin` (bordered) | ✅ | ✅ | **Igual** | Mesma semântica |
| Delegação de brand para filhos | ✅ DssToolbar | ✅ DssList/DssMenu | **Igual** | Gate Responsabilidade v2.4 |
| Estados interativos | Nenhum (container) | Nenhum (container) | **Igual** | Ambos 100% não-interativos |
| Dark mode via `[data-theme="dark"]` | ✅ | ✅ | **Igual** | Token cascade |
| `forced-colors` system keywords | Canvas/CanvasText | Canvas/CanvasText | **Igual** | EXC-05 / EXC-03 |
| `@media print` hardcoded | ✅ (`#fff`, `#000`) | ✅ (`#fff`, `#000`) | **Igual** | EXC-06 / EXC-04 |
| `role` semântico | `banner` (herdado de QHeader) | `navigation` (explícito DSS) | **Diferente** | QDrawer não herda role — DSS aplica explicitamente |
| Prop `color` bloqueada | ✅ (dark mode) | ✅ equivalente | **Diferente** | DssDrawer bloqueia `dark` em vez de `color` |
| Props Bloqueadas | `color`, `height-hint` | `dark`, `behavior` | **Diferente** | Props relevantes são distintas por semântica |
| Borda direcional | `border-bottom` | `border-right` / `border-left` | **Diferente** | Orientação lateral vs. superior |
| Touch target | Opção B | Opção B | **Igual** | Ambos não-interativos |

---

## 13. Matriz de Composição DSS

### Papel estrutural

DssDrawer ancora conteúdo de navegação na lateral da página. É um container puro — não determina o conteúdo interno.

### Componentes recomendados no slot

| Componente | Papel |
|------------|-------|
| `DssList` | **Recomendado** — lista de itens de navegação |
| `DssMenu` | Sub-menus contextuais |
| `DssItem` | Acesso direto (via DssList) |
| `DssSeparator` | Divisores de seção |

### Padrões de layout

```vue
<!-- Padrão básico -->
<DssDrawer v-model="open">
  <DssList>
    <DssItem clickable active>
      <template #leading><DssIcon name="home" /></template>
      Dashboard
    </DssItem>
  </DssList>
</DssDrawer>

<!-- Com seções -->
<DssDrawer v-model="open">
  <DssList>
    <DssItem clickable>...</DssItem>
    <DssSeparator />
    <DssItem clickable>...</DssItem>
  </DssList>
</DssDrawer>

<!-- Painel informativo à direita -->
<DssDrawer side="right" role="complementary" aria-label="Detalhes">
  <DssList>...</DssList>
</DssDrawer>
```

### Limites de responsabilidade

- DssDrawer **não** define brand/cor — delegado aos filhos
- DssDrawer **não** estiliza DssItem internamente
- DssDrawer **não** controla z-index ou posicionamento
- DssDrawer **não** assume presença de componentes específicos

### Anti-patterns

```vue
<!-- ❌ HTML nativo no slot -->
<DssDrawer><nav><ul><li>Item</li></ul></nav></DssDrawer>

<!-- ❌ Texto solto -->
<DssDrawer>Menu de navegação</DssDrawer>

<!-- ❌ Sobrescrever z-index -->
<DssDrawer style="z-index: 9999">...</DssDrawer>

<!-- ❌ DssDrawer fora de QLayout -->
<DssDrawer v-model="open">...</DssDrawer>  <!-- sem q-layout pai -->

<!-- ❌ Prop bloqueada via :dark -->
<DssDrawer :dark="true">...</DssDrawer>

<!-- ❌ DssHeader dentro do DssDrawer -->
<DssDrawer><DssHeader>...</DssHeader></DssDrawer>
```

---

## 14. Acessibilidade

- **Role**: `navigation` por padrão — landmark de navegação ARIA.
  - Sobrescreva com `role="complementary"` para painéis informativos (ex: painel de detalhes à direita).
  - Com múltiplos landmarks `navigation` na página, todos devem ter `aria-label` distintos.
- **aria-label**: Recomendado — `<DssDrawer aria-label="Menu principal">`.
- **Teclado**: QDrawer nativo suporta `Escape` para fechar em mobile. Navegação entre itens é responsabilidade dos DssItem internos.
- **Touch target**: Opção B — não implementado no container. Touch targets pertencem aos DssItem filhos.
- **WCAG 2.1 AA**: Backdrop em modo overlay tem opacidade de 0.75 (não impede navegação de leitores de tela no conteúdo sob o backdrop).

---

## 15. Exceções aos Gates v2.4

### EXC-01 — Uso de `<q-layout>` no arquivo de exemplo
- **Arquivo**: `DssDrawer.example.vue`
- **Gate violado**: Gate de Composição v2.4 — Regra 1
- **Justificativa**: DssDrawer requer contexto QLayout para renderizar. DssLayout (Nível 4) não existe ainda. Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md.
- **Escopo**: Apenas `DssDrawer.example.vue`. O componente principal permanece 100% aderente.
- **Precedente**: DssHeader (EXC-01), mesma justificativa.

### EXC-02 — `!important` em `background-color`
- **Arquivo**: `2-composition/_base.scss`, `4-output/_states.scss`
- **Gate violado**: Nenhum (documentado para clareza)
- **Justificativa**: Necessário para que `--dss-surface-default` governe o fundo sobre o tema nativo do QDrawer.
- **Precedente**: DssHeader (EXC-02), mesma justificativa.

### EXC-03 — `<q-drawer>` como elemento raiz
- **Arquivo**: `1-structure/DssDrawer.ts.vue`
- **Gate violado**: Gate de Composição v2.4 — Regra 1 (primitivo Quasar como raiz)
- **Justificativa**: QDrawer depende de `provide/inject` do QLayout pai. Envolver em `<div>` quebraria a comunicação de layout. Classes DSS aplicadas ao mesmo elemento.
- **Precedente**: DssHeader (EXC-03), mesma família e justificativa.

### EXC-04 — Seletor descendente `.q-drawer__backdrop`
- **Arquivo**: `2-composition/_base.scss`, `4-output/_states.scss`
- **Gate violado**: Gate de Composição v2.4 — Regra 2
- **Justificativa**: `.q-drawer__backdrop` é elemento DOM interno do QDrawer. Seletor descendente é a única forma de aplicar `--dss-opacity-backdrop`. Estilos globais (não-scoped) necessários.
- **Precedente**: DssTabs (EXC-01) — `.dss-tabs .q-tabs__arrow`, mesma natureza.

### EXC-05 — System color keywords em `forced-colors`
- **Arquivo**: `4-output/_states.scss`
- **Valores**: `Canvas`, `CanvasText`, `ButtonFace`
- **Justificativa**: Padrão canônico DSS. Tokens CSS ignorados pelo navegador em forced-colors mode.
- **Precedente**: DssHeader (EXC-03), DssTabs (EXC-02), DssCard.

### EXC-06 — Valores hardcoded em `@media print`
- **Arquivo**: `4-output/_states.scss`
- **Valores**: `#fff`, `#000`, `1px solid #000`, `position: static`
- **Justificativa**: Garantia de legibilidade em impressão monocromática. `position: static` cancela `position: fixed` do QDrawer.
- **Precedente**: DssHeader (EXC-04), DssTabs (EXC-03).

---

## 16. Reservas

| ID | Descrição | Impacto |
|----|-----------|---------|
| RES-01 | Token `--dss-opacity-backdrop` não verificado contra DSS_TOKEN_REFERENCE.md | NC potencial se token não existir (fallback 0.75 garante comportamento) |
| RES-02 | Backdrop styling pode não funcionar se QDrawer usar inline styles | Baixo — backdrop nativo Quasar é funcionalmente aceitável |
| RES-03 | Mini mode: governança de conteúdo delegada a DssList/DssItem | Médio — funcionalidade mini pode ser incompleta sem suporte explícito no DssItem |

---

## 17. Declaração Final

> **Componente PRONTO PARA AUDITORIA DSS v2.2**
>
> 🚫 Nenhum selo emitido.
> 🚫 Nenhuma auto-certificação de conformidade.
>
> A conformidade será determinada exclusivamente pelo auditor DSS com base
> nos gates documentados, verificação de tokens e comparação com o Golden Context (DssHeader).
