# Pre-Prompt de Criação — DssBtnToggle

> **Status:** Artefato de Governança — DSS v2.2
> **Criado:** 27 Mar 2026
> **Nota de Origem:** Especificação original fornecida inline durante sessão de trabalho (27 Mar 2026).
> Este documento é a reconstrução fiel da especificação normativa utilizada para criar o componente.
> Toda a informação deriva dos arquivos de documentação gerados (`DssBtnToggle.md`, `DSSBTNTOGGLE_API.md`, `dss.meta.json`).

---

## 1. Classificação e Contexto

Você é o Agente DSS responsável por criar o componente **DssBtnToggle** conforme a especificação normativa DSS v2.2.

| Campo | Valor |
|-------|-------|
| **Nome** | DssBtnToggle |
| **Componente Quasar Equivalente** | QBtnToggle |
| **Categoria** | Container de Seleção Exclusiva (Grupo de Alternância) |
| **Fase** | 2 — Componente Composto |
| **Golden Reference** | DssChip |
| **Golden Context** | DssBtnGroup (irmão arquitetural direto) |
| **Status Inicial** | Pré-auditoria |
| **DSS Version** | v2.2 |

**Justificativa Fase 2:** O DssBtnToggle gerencia estado de seleção (v-model) compartilhado entre múltiplos botões internos, orquestrados via prop `options`. Este gerenciamento de estado cruzado e a renderização interna pelo Quasar caracterizam composição interna — critério da Fase 2.

**Justificativa Golden Context (DssBtnGroup):** DssBtnGroup é o irmão arquitetural mais próximo — mesmo padrão de container de grupo de botões, mesma governança de border-radius, separadores e brand accent. A diferença fundamental: DssBtnGroup aceita DssButton via `<slot>`; DssBtnToggle gera botões internamente via `options`.

**Abordagem obrigatória: WRAP** — DssBtnToggle deve envolver o `QBtnToggle`, não reconstruir gerenciamento de seleção do zero. Justificativa: QBtnToggle fornece v-model, aria-pressed, keyboard navigation nativos. Precedente: DssBtnDropdown (selado Mar 2026) usa mesma estratégia.

---

## 2. Diferença Fundamental vs. DssBtnGroup

> ⚠️ CRÍTICO — Principal fonte de confusão arquitetural.

| Aspecto | DssBtnGroup | DssBtnToggle |
|---------|-------------|--------------|
| Filhos | `DssButton` via `<slot>` | Gerados internamente pelo Quasar via `options` |
| Estado | Sem v-model (layout puro) | Com v-model (seleção exclusiva) |
| Seletores CSS | `.dss-button:first/last-child` | `.q-btn-item:first/last-child` |
| Prop sync | Obrigatório (filhos precisam replicar estilo) | Não necessário (Quasar propaga via `flat`/`outline`) |
| Variante API | Props booleanas individuais | `variant` string única |

---

## 3. O Grande Risco Arquitetural

### 3.1 Seletores CSS e Gate de Composição v2.4

> ⚠️ CRÍTICO — Registro preemptivo obrigatório.

O QBtnToggle renderiza botões internos com a classe `.q-btn-item`. Para gerenciar border-radius e separadores, o SCSS precisa de seletores como:

```scss
/* ✅ CORRETO — .q-btn-item é DOM interno Quasar, não componente DSS filho */
.dss-btn-toggle > .q-btn-item:first-child { border-radius: 0; }
```

**Este padrão DEVE ser registrado em `dss.meta.json → gateExceptions.compositionGateV24`** desde o início. Precedente: DssBtnGroup (selado Mar 2026).

**Anti-pattern:**
```scss
/* ❌ INCORRETO — tentar usar seletores de DssButton (eles não existem aqui) */
.dss-btn-toggle > .dss-button:first-child { ... }
```

### 3.2 Gate de Responsabilidade v2.4

O modo `outline` usa `:hover` e `:focus-visible` em `.q-btn-item` para ajuste de z-index:

```scss
/* ✅ CORRETO — ajuste estrutural de posicionamento, não captura de aparência */
.dss-btn-toggle--outline > .q-btn-item:not(:first-child) {
  &:hover, &:focus-visible {
    position: relative;
    z-index: 1;
  }
}
```

**Este padrão DEVE ser registrado em `dss.meta.json → gateExceptions.responsibilityGateV24`**. Precedente: DssBtnGroup Ciclo 2.

### 3.3 `<style>` sem scoped

Obrigatório `<style lang="scss">` **sem** `scoped`. Com `scoped`, os seletores `.q-btn-item` não funcionariam em runtime. Precedente: DssBtnGroup NC-01 (Ciclo 1, Mar 2026).

### 3.4 Reatividade do Mapeamento de Variante

A prop `variant` (string) é mapeada para props booleanas do Quasar (`flat`, `outline`, etc.). Este mapeamento **DEVE ser reativo**:

```typescript
// ❌ INCORRETO — não reativo a mudanças dinâmicas de variant
const flat = props.variant === 'flat'

// ✅ CORRETO — computed rastreia props.variant reativamente
const variantProps = computed(() => ({
  flat: props.variant === 'flat',
  outline: props.variant === 'outline',
  // ...
}))
```

Precedente: DssBtnDropdown NC-02 (Ciclo 1, Mar 2026).

---

## 4. Mapeamento de API

### Props Expostas (Permitidas)

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `any` | `undefined` | Valor selecionado (v-model) |
| `options` | `BtnToggleOption[]` | — | Array de opções (**obrigatório**) |
| `variant` | `BtnToggleVariant` | `'elevated'` | Variante visual (API simplificada DSS) |
| `color` | `string` | `undefined` | Cor dos botões inativos |
| `toggleColor` | `string` | `undefined` | Cor do botão ativo |
| `textColor` | `string` | `undefined` | Cor do texto inativos |
| `toggleTextColor` | `string` | `undefined` | Cor do texto ativo |
| `rounded` | `boolean` | `false` | Cantos pill nas extremidades |
| `square` | `boolean` | `false` | Remove border-radius |
| `spread` | `boolean` | `false` | Ocupa largura total |
| `stretch` | `boolean` | `false` | Estica até altura do pai |
| `disable` | `boolean` | `false` | Desabilita o grupo |
| `readonly` | `boolean` | `false` | Somente leitura |
| `clearable` | `boolean` | `false` | Permite desmarcar |
| `brand` | `BtnToggleBrand\|null` | `null` | Acento de marca |
| `ariaLabel` | `string` | `undefined` | Label acessível |

### Props Bloqueadas (Proibidas)

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `size` | Deve seguir tokens `--dss-compact-control-height-*` |
| `dense` | Mesmo motivo de `size` |
| `noCaps` (externo) | Componente aplica internamente; casing por tokens de tipografia |

### Mapeamento variant → QBtnToggle

| `variant` DSS | Props booleanas Quasar |
|---------------|------------------------|
| `elevated` | *(nenhuma — padrão Quasar)* |
| `flat` | `flat: true` |
| `outline` | `outline: true` |
| `unelevated` | `unelevated: true` |
| `push` | `push: true` |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido ao clicar numa opção ou desmarcar (clearable) |

### Slots

| Slot | Descrição |
|------|-----------|
| `[nome-do-slot]` (dinâmico) | Slot por opção — disponível quando `option.slot` está definido |

---

## 5. Governança de Tokens

### Tokens Obrigatórios

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L3 | Separadores flat/unelevated; colapso outline |
| `--dss-border-width-thick` | L4 | Acento brand (inset box-shadow) |
| `--dss-border-width-md` | Module | High contrast |
| `--dss-radius-full` | L2 | Border-radius pill (rounded) |
| `--dss-gray-200` | L3 | Separador unelevated (sutil) |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

### Exceções Documentadas Obrigatórias

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `_base.scss` | Square variant. Semântico. Padrão DssBtnGroup EXC-01. |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `_states.scss` | Dark mode dividers. Sem token DSS para white alpha. |
| EXC-03 | `1px solid ButtonText` | `_states.scss` | Forced-colors — system keywords obrigatórios. |

---

## 6. Acessibilidade e Estados

### ARIA

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `group` | DssBtnToggle (explícito no template) |
| `aria-label` | prop `ariaLabel` | Quando fornecido |
| `aria-pressed` | `true`/`false` | QBtnToggle (automático por botão) |
| `aria-disabled` | `true` | QBtnToggle (automático quando `disable`) |

### Touch Target

**Opção B — Delegado ao QBtnToggle interno.** O DssBtnToggle não é um Compact Control standalone.

### Delegação de Estados

| Estado | Aplicável | Proprietário |
|--------|-----------|--------------|
| `default` | ✅ | DssBtnToggle |
| `disabled` | ✅ | Delegado ao QBtnToggle (prop `disable`) |
| `readonly` | ✅ | DssBtnToggle (`.dss-btn-toggle--readonly`) |
| `hover`, `focus`, `active` | Delegado | Pertencem aos botões internos |
| `error`, `indeterminate`, `loading` | ❌ | Não aplicáveis a grupos de alternância |

---

## Estrutura de Arquivos Obrigatória

```
DssBtnToggle/
├── 1-structure/DssBtnToggle.ts.vue     ← Implementação canônica
├── 2-composition/_base.scss            ← Container + border-radius (EXC-01)
├── 3-variants/
│   ├── _flat.scss                      ← Separador flat
│   ├── _outline.scss                   ← Colapso borda + z-index (responsibilityGateV24)
│   ├── _unelevated.scss                ← Separador unelevated
│   ├── _push.scss                      ← Placeholder (push gerenciado pelo Quasar)
│   └── index.scss
├── 4-output/
│   ├── _states.scss                    ← Dark (EXC-02), forced-colors (EXC-03)
│   ├── _brands.scss                    ← Hub, Water, Waste
│   └── index.scss
├── composables/useBtnToggleClasses.ts
├── types/btn-toggle.types.ts
├── DssBtnToggle.module.scss            ← Orquestrador L2→L3→L4
├── DssBtnToggle.vue                    ← Entry Point Wrapper (re-export puro)
├── DssBtnToggle.example.vue            ← 7 cenários
├── DssBtnToggle.md                     ← Documentação normativa
├── DSSBTNTOGGLE_API.md                 ← API Reference
├── dss.meta.json                       ← Metadados + exceções + gateExceptions
├── index.js                            ← Barrel export
└── README.md
```

---

*Artefato de Governança — DSS v2.2 — 27 Mar 2026*
