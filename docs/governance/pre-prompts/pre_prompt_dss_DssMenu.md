# Pré-prompt Oficial — DssMenu
**Versão do Pré-prompt:** 1.0
**Data de Criação:** 2026-04-18
**Status:** Aprovado (componente selado em 2026-04-18)
**Família:** Navegação / Overlays
**Nível:** 2 — Composição de Primeiro Grau

---

## 1. Classificação e Contexto

- **Nome do Componente:** DssMenu
- **Família:** Navegação / Overlays
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** DssTooltip (overlay não-interativo como container)
- **Golden Context:** DssList (container de itens de lista, mesma estrutura de agrupamento)
- **Componente Quasar Base:** QMenu
- **Dependências Diretas:** DssList, DssItem (Nível 1)

**Justificativa de Fase 2:** DssMenu é um overlay de navegação que:
1. Encapsula `<q-menu>` (primitivo Quasar de layout/overlay)
2. Orquestra DssList e DssItem (componentes DSS Fase 1) via slot
3. Gerencia estado de visibilidade via v-model (ciclo de vida de overlay)
4. Depende de comportamento de teleport do Quasar (renderiza fora da árvore Vue normal)

---

## 2. Grande Risco Arquitetural

### Risco Principal: Teleport para `<body>` e CSS Scoping

O QMenu teleporta automaticamente seu conteúdo para `<body>` para gerenciar z-index e posicionamento. Isso quebra o CSS scoped do Vue:

**Padrão incorreto (❌):**
```vue
<!-- NÃO FAZER: scoped style não acompanha o teleport -->
<style lang="scss" scoped>
@import '../DssMenu.module.scss';
</style>
```

**Padrão correto (✅):**
```
// Importar GLOBALMENTE via components/index.scss:
@import 'base/DssMenu/DssMenu.module';

// No .ts.vue — NENHUM <style> tag (ou não-scoped se necessário)
<!-- Estilos carregados globalmente via components/index.scss -->
```

### Risco Secundário: Override de background/box-shadow do QMenu

QMenu aplica `background` e `box-shadow` via `.q-menu` com especificidade equivalente aos seletores DSS. Para sobrescrever com tokens DSS:

**Padrão correto (✅):**
```scss
/* 2-composition/_base.scss */
.dss-menu {
  background-color: var(--dss-surface-default) !important; /* EXC-01 */
  box-shadow: var(--dss-elevation-3) !important;           /* EXC-01 */
}
```

**Anti-pattern (❌):**
```scss
/* NÃO sobrescrever z-index ou position */
.dss-menu {
  z-index: 9999;        /* quebra a matemática de overlays do Quasar */
  position: sticky;     /* quebra o teleport */
}
```

### Risco Terciário: DssItem com label + slot content

Ao usar DssItem com ícones (slot content + DssItemSection), NÃO usar a prop `label` simultaneamente. O slot default SUBSTITUI o label.

**Padrão correto (✅):**
```vue
<DssItem clickable v-close-popup>
  <DssItemSection avatar><DssIcon name="edit" /></DssItemSection>
  <DssItemSection>Editar</DssItemSection>
</DssItem>
```

**Anti-pattern (❌):**
```vue
<!-- label="Editar" é redundante — slot substitui o label -->
<DssItem label="Editar" clickable v-close-popup>
  <DssItemSection>Editar</DssItemSection>
</DssItem>
```

---

## 3. Mapeamento de API (DSS vs Quasar)

### Props Expostas (Permitidas)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `Boolean` | `false` | Controle de visibilidade (v-model) |
| `fit` | `Boolean` | `false` | Menu adota largura do trigger |
| `cover` | `Boolean` | `false` | Menu sobrepõe o trigger |
| `anchor` | `MenuPosition` | `undefined` | Ponto de ancoragem no trigger |
| `self` | `MenuPosition` | `undefined` | Ponto de alinhamento do menu |
| `offset` | `[number, number]` | `undefined` | Deslocamento [x, y] em pixels |

### Props Bloqueadas (Governança DSS)

| Prop QMenu | Motivo |
|------------|--------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |
| `square` | Cantos quadrados violam `--dss-radius-md` |

### Props Repassadas via $attrs

| Prop | Descrição |
|------|-----------|
| `transition-show` | Animação de abertura |
| `transition-hide` | Animação de fechamento |
| `max-height` | Altura máxima |
| `max-width` | Largura máxima |
| `persistent` | Não fecha ao clicar fora |
| `no-focus` | Não transfere foco ao abrir |
| `touch-position` | Posiciona no ponto de toque |

---

## 4. Governança de Tokens

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Fundo do menu (EXC-01 !important) |
| `--dss-elevation-3` | Sombra de elevação (EXC-01 !important) |
| `--dss-radius-md` | Borda arredondada |
| `--dss-font-family-sans` | Família tipográfica |
| `--dss-text-body` | Cor de texto |
| `--dss-border-width-thin` | Borda no dark mode |
| `--dss-gray-200` | Cor da borda no dark mode |
| `--dss-border-width-md` | Borda reforçada em prefers-contrast |

**Dark mode:** Adicionar `border: var(--dss-border-width-thin) solid var(--dss-gray-200)`. Sombra perde visibilidade em fundo escuro — borda sutil compensa.

---

## 5. Acessibilidade e Estados

### Role ARIA
- `role="menu"` aplicado nativamente pelo QMenu
- Deve haver `aria-label` ou `aria-labelledby` via `$attrs`
- Elemento trigger deve ter `aria-haspopup="menu"`

### Decisão Touch Target
**Opção B — não implementado.** DssMenu é container overlay não-interativo. Touch targets são responsabilidade exclusiva dos filhos (DssItem).

### Delegação de Estados

| Estado | Pertence a |
|--------|-----------|
| `hover` | Filhos (DssItem, DssButton) |
| `focus` | QMenu nativo + filhos |
| `active` | Filhos |
| `disabled` | Filhos ou elemento trigger |
| `loading` | Não aplicável ao container |
| `error` | Não aplicável ao container |

### Estados do DssMenu

| Estado | Implementado | Descrição |
|--------|-------------|-----------|
| `visible` | ✅ | Via v-model / QMenu nativo |
| `hidden` | ✅ | Via v-model / QMenu nativo |
| `dark mode` | ✅ | Via `[data-theme="dark"]` com borda |
| `prefers-contrast` | ✅ | Borda reforçada |
| `forced-colors` | ✅ | System keywords (EXC-02) |
| `print` | ✅ | `display: none` (EXC-03) |

---

## 6. Exceções Formais Previstas

| ID | Descrição | Arquivo |
|----|-----------|---------|
| EXC-01 | `!important` em background-color e box-shadow (QMenu override) | `2-composition/_base.scss` |
| EXC-02 | System color keywords em forced-colors (Canvas, CanvasText, ButtonText) | `4-output/_states.scss` |
| EXC-03 | `display: none !important` em @media print | `4-output/_states.scss` |

---

## 7. Cenários de Uso Obrigatórios

1. **Básico** — DssButton trigger + DssList + DssItems simples
2. **Com Ícones** — DssItemSection com DssIcon (sem `label` prop simultânea)
3. **Com Separadores** — DssSeparator entre grupos semânticos
4. **Posicionamento Customizado** — Props anchor + self + offset
5. **Fit** — Menu com mesma largura do trigger

---

## 8. Histórico

| Data | Evento |
|------|--------|
| 2026-04-18 | Pré-prompt entregue inline + componente implementado |
| 2026-04-18 | Auditoria DSS v2.5 executada — 0 NCs, 3 GAPs identificados |
| 2026-04-18 | GAPs resolvidos — Pré-prompt persistido (GAP-01), exemplo corrigido (GAP-02), limitação MCP registrada (GAP-03) |
| 2026-04-18 | Selo DSS v2.2 emitido |
