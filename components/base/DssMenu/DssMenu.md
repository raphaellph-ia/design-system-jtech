# DssMenu — Documentação Normativa DSS v2.2

> **Status:** ✅ CONFORME — Selo DSS v2.2 emitido em 2026-04-18
> **Versão DSS:** 2.2
> **Fase:** 2 — Overlay de Navegação / Composição de Primeiro Grau
> **Golden Reference:** DssTooltip
> **Golden Context:** DssList

---

## 1. Identidade do Componente

### 1.1 Nome e Classificação

- **Nome:** `DssMenu`
- **Família:** Navegação / Overlays
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Componente Quasar Base:** `QMenu`
- **Dependência Direta:** `DssList` + `DssItem` (Nível 1)

### 1.2 Papel Semântico

DssMenu é o overlay de navegação flutuante do DSS. Encapsula o `QMenu` do Quasar com governança DSS, bloqueando props de cor e forma (`dark`, `square`) e aplicando `--dss-surface-default` como fundo padrão e `--dss-elevation-3` como sombra.

Como componente de Nível 2, ele **orquestra** DssList e DssItem (Nível 1) via slot, sem instanciar filhos automaticamente. A composição é responsabilidade do consumidor.

### 1.3 O Que Faz

- Fornece o container `role="menu"` flutuante posicionado pelo Quasar
- Aplica `--dss-surface-default` como fundo (sobrescreve background do QMenu via EXC-01)
- Aplica `--dss-elevation-3` como sombra (sobrescreve box-shadow do QMenu via EXC-01)
- Aplica `--dss-radius-md` como borda arredondada
- Gerencia visibilidade via `v-model` (modelValue)
- Repassa atributos extras via `$attrs` ao QMenu
- Teleporta para `<body>` via comportamento nativo do QMenu

### 1.4 O Que NÃO Faz

- Não define brand/cor dos itens — responsabilidade dos DssItems internos
- Não instancia filhos automaticamente
- Não estiliza componentes filhos internamente
- Não possui estados de interação próprios (hover, focus, active)
- Não gerencia z-index (delegado ao Quasar)
- Não expõe prop `dark` ou `square` (bloqueadas)
- Não define posicionamento — delegado ao QMenu via props

---

## 2. Modelo Arquitetural

### 2.1 Quasar × DSS

- **Quasar** = camada de execução (teleport para body, z-index, posicionamento, transições)
- **DSS** = camada de governança (tokens, visual, API controlada)

DssMenu **diverge da API QMenu** intencionalmente:
- Bloqueia `dark` e `square`
- Garante `--dss-surface-default` e `--dss-elevation-3` via EXC-01
- Remove comportamentos não utilizados no DSS

### 2.2 Teleport para Body

QMenu teleporta seu conteúdo para `<body>` automaticamente para gerenciar z-index e posicionamento. Isso implica:
- `<style scoped>` no componente Vue seria **ineficaz** (hash de scoped não acompanha o teleport)
- CSS deve ser carregado **globalmente** via `components/index.scss`
- Seletor `.dss-menu` escopa os estilos no elemento teleportado

### 2.3 Hierarquia de Composição

```
[Elemento Trigger: DssButton, q-btn, qualquer elemento]
└── DssMenu (Nível 2 — este componente, teleportado para body)
    └── DssList (Nível 1 — container de itens)
        └── DssItem (Nível 1 — item clicável)
            └── DssItemSection, DssIcon (Nível 1)
```

---

## 3. API

### 3.1 Props Expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `Boolean` | `false` | Controle de visibilidade (v-model) |
| `fit` | `Boolean` | `false` | Menu adota largura do trigger |
| `cover` | `Boolean` | `false` | Menu sobrepõe o trigger |
| `anchor` | `MenuPosition` | `undefined` | Ponto de ancoragem no trigger |
| `self` | `MenuPosition` | `undefined` | Ponto de alinhamento do menu |
| `offset` | `[number, number]` | `undefined` | Deslocamento [x, y] em pixels |

### 3.2 Props Bloqueadas

| Prop QMenu | Motivo do Bloqueio |
|------------|-------------------|
| `dark` | Modo escuro governado por `[data-theme="dark"]` global. |
| `square` | Cantos quadrados violam `--dss-radius-md`. |

### 3.3 Props Repassadas via `$attrs`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `transition-show` | `String` | Animação de abertura |
| `transition-hide` | `String` | Animação de fechamento |
| `max-height` | `String` | Altura máxima |
| `max-width` | `String` | Largura máxima |
| `persistent` | `Boolean` | Não fecha ao clicar fora |
| `no-focus` | `Boolean` | Não transfere foco ao abrir |
| `touch-position` | `Boolean` | Posiciona no ponto de toque |

### 3.4 Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `void` | Conteúdo do menu. Deve conter exclusivamente `DssList > DssItem`. |

### 3.5 Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | Sincronização de v-model |
| `show` | `Event` | Menu terminou de abrir |
| `hide` | `Event` | Menu terminou de fechar |

---

## 4. Acessibilidade

### 4.1 Role e Landmark

- `role="menu"` — aplicado nativamente pelo `QMenu`
- Identifica o elemento como menu de navegação (ARIA landmark)
- O elemento trigger deve ter `aria-haspopup="menu"` e `aria-controls="[id-do-menu]"`

### 4.2 Atributos Recomendados

```vue
<DssMenu aria-label="Menu de ações do registro">
```

`$attrs` é encaminhado corretamente via `v-bind="$attrs"`.

### 4.3 Navegação por Teclado

- `Esc` — fecha o menu (nativo QMenu)
- `Setas ↑↓` — navegação entre itens (nativo QMenu via aria-activedescendant)
- `Enter/Espaço` — ativa o item focado (responsabilidade do DssItem)

### 4.4 Touch Target

Opção B — Não implementado. DssMenu é container overlay não-interativo. Touch targets são responsabilidade dos filhos (`DssItem`).

---

## 5. Comportamentos Implícitos

### 5.1 Teleport para Body

QMenu teleporta automaticamente o overlay para `<body>`. O elemento `.dss-menu` existe no DOM do body, não na árvore do componente Vue. Isso garante z-index correto e evita clipping por overflow:hidden nos containers pais.

### 5.2 Forwarding de `$attrs`

`inheritAttrs: false` + `v-bind="$attrs"` no `<q-menu>`. Todo atributo não declarado como prop é encaminhado ao QMenu nativo.

### 5.3 Z-Index e Position

DssMenu **não altera** `z-index` nem `position` do QMenu. O posicionamento flutuante é responsabilidade do Quasar.

### 5.4 CSS Global

Estilos são carregados via `components/index.scss` (importação global). `<style scoped>` não é usado pois seria ineficaz para conteúdo teleportado.

---

## 6. Estados

### 6.1 Estados Aplicáveis

| Estado | Descrição |
|--------|-----------|
| `visible` | Menu aberto (controlado via v-model / QMenu) |
| `hidden` | Menu fechado (padrão, display: none via QMenu) |

### 6.2 Estados NÃO Aplicáveis

| Estado | Justificativa |
|--------|--------------|
| `hover` | Container overlay não-interativo |
| `focus` | Foco gerenciado pelo QMenu nativamente |
| `active` | Container overlay não-interativo |
| `disabled` | Não aplicável a containers overlay |
| `loading` | Não aplicável (Fase 2 síncrona) |
| `error` | Não aplicável a containers overlay |
| `indeterminate` | Não aplicável |

---

## 7. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 base | Cor de fundo (EXC-01 !important) |
| `--dss-elevation-3` | L2 base | Sombra de elevação (EXC-01 !important) |
| `--dss-radius-md` | L2 base | Borda arredondada |
| `--dss-font-family-sans` | L2 base | Família tipográfica |
| `--dss-text-body` | L2 base | Cor de texto |
| `--dss-border-width-thin` | L4 dark mode | Borda no dark mode |
| `--dss-gray-200` | L4 dark mode | Cor da borda no dark mode |
| `--dss-border-width-md` | L4 states | Borda reforçada (prefers-contrast) |

---

## 8. Exceções

| ID | Regra Violada | Local | Justificativa |
|----|---------------|-------|---------------|
| EXC-01 | Token First implícito | `2-composition/_base.scss` | QMenu aplica background e box-shadow via `.q-menu` com especificidade CSS equivalente. `!important` necessário para que `--dss-surface-default` e `--dss-elevation-3` prevaleçam. Prop `dark` bloqueada. Precedente: DssFooter (EXC-02), DssHeader (EXC-02). |
| EXC-02 | — (documentado para clareza) | `4-output/_states.scss` forced-colors | System color keywords obrigatórios em `forced-colors` mode. Padrão canônico DSS. Precedente: DssTooltip, DssCard, DssFooter. |
| EXC-03 | — (documentado para clareza) | `4-output/_states.scss` print | `display: none` em print. Menus são overlays sem utilidade em papel. Precedente: DssTooltip. |

---

## 9. Matriz de Composição DSS

### 9.1 Componentes DSS Recomendados

| Componente | Status | Uso |
|-----------|--------|-----|
| `DssList` | ✅ Existente | Container primário de itens do menu |
| `DssItem` | ✅ Existente | Itens clicáveis individuais |
| `DssItemSection` | ✅ Existente | Seções dentro de DssItem (ícone, texto) |
| `DssIcon` | ✅ Existente | Ícones nos itens |
| `DssSeparator` | ✅ Existente | Divisão entre grupos de itens |
| `DssButton` | ✅ Existente | Elemento trigger padrão |

### 9.2 Anti-Patterns de Composição

- ❌ Usar HTML nativo (`<ul>`, `<li>`, `<div>`) diretamente no DssMenu
- ❌ Adicionar texto ou botões diretamente no slot sem DssList intermediário
- ❌ Sobrescrever `z-index` ou `position` do QMenu
- ❌ Usar DssMenu sem um elemento trigger no contexto imediato
- ❌ Usar prop bloqueada `dark` — usar `[data-theme="dark"]` globalmente

---

## 10. Paridade com Golden Context (DssList)

| Aspecto | DssList | DssMenu | Diferença |
|---------|---------|---------|-----------|
| Primitivo Quasar | Sem primitivo (HTML nativo) | `QMenu` | Esperada |
| Role ARIA | `list` | `menu` | **Intencional** |
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `withDefaults(defineProps<...>())` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` | ✅ | ✅ | Igual |
| 4 camadas SCSS | ✅ | ✅ | Igual |
| CSS global vs scoped | Scoped | Global | **Intencional** — teleport |
| Container não-interativo | ✅ | ✅ | Igual |
| Brand delegation | Para DssItems | Para DssItems | Igual |
| Touch target | Opção B | Opção B | Igual |

---

## 11. Debugging e Troubleshooting

### 11.1 Menu não aparece

- Verificar se o elemento pai do DssMenu é o trigger correto (q-btn, DssButton)
- O QMenu se posiciona relativo ao elemento pai imediato

### 11.2 Fundo não é a superfície padrão

- O override de background via `!important` está em `2-composition/_base.scss`
- Verificar se `components/index.scss` está sendo importado globalmente

### 11.3 Menu sem borda no dark mode

- Borda é aplicada em `4-output/_states.scss` via `[data-theme='dark'] .dss-menu`
- Verificar se o atributo `data-theme="dark"` está em um ancestral na DOM

### 11.4 Posicionamento incorreto

- `anchor` define o ponto no trigger, `self` define o ponto no menu
- `cover: true` faz o menu cobrir o trigger
- `fit: true` iguala a largura do menu à do trigger

---

## 12. Checklist de Conformidade (Gate Estrutural DSS)

### Gate Estrutural
- [x] 4 camadas existem em completude (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`)
- [x] Entry Point Wrapper (`DssMenu.vue`) existe e é re-export puro
- [x] Orchestrador SCSS (`DssMenu.module.scss`) importa L2 → L3 → L4 na ordem
- [x] Barrel export (`index.js`) exporta componente, types e composables
- [x] `dss.meta.json` existe com `goldenReference` e `goldenContext` declarados

### Gate Técnico
- [x] Nenhum valor hardcoded não documentado (Token First)
- [x] Cores via tokens (não classes utilitárias de cor no SCSS)
- [x] Estados documentados (apenas visible/hidden aplicáveis)
- [x] Acessibilidade: `role="menu"` via QMenu, `aria-label` via `$attrs`
- [ ] SCSS compila sem erros — pendente verificação pós-auditoria

### Gate Documental
- [x] Tokens listados com nomes exatos (1:1 com SCSS)
- [x] README completo
- [x] Documentação normativa (esta) com Template 13.x
- [x] API Reference (`DSSMENU_API.md`) com tabela de diferenças intencionais
- [x] Exemplo funcional com 5 cenários
- [x] Paridade com Golden Context documentada
- [x] Comportamentos implícitos documentados
- [x] Exceções documentadas com ID, valor, local e justificativa

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**

> 🚫 Este documento NÃO emite selo. A certificação de conformidade é responsabilidade exclusiva do processo de auditoria DSS.
