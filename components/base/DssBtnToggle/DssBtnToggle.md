# DssBtnToggle

**Design System Sansys v2.2 — Componente Fase 2**
**Categoria:** Container de Seleção Exclusiva (Grupo de Alternância)
**Status:** ✅ Selado — DSS v2.2 (27 Mar 2026)

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Nome | DssBtnToggle |
| Equivalente Quasar | QBtnToggle |
| Fase | 2 — Componente Composto |
| Golden Reference | DssChip (interativo) |
| Golden Context | DssBtnGroup (irmão arquitetural direto) |
| Versão DSS | v2.2 |
| Abordagem | WRAP QBtnToggle |

---

## 2. Descrição

O DssBtnToggle é um container de seleção exclusiva que agrupa botões funcionando como radio buttons visuais. Permite que o usuário selecione **uma opção por vez** (ou nenhuma, com `clearable`) a partir de um conjunto de alternativas.

**Diferença fundamental vs. DssBtnGroup:**
- DssBtnToggle **gerencia estado** (`v-model`) e **renderiza os botões** a partir de um array `options`
- DssBtnGroup é um **container de layout** que aceita `DssButton` como filhos explícitos via `<slot>`

**Quando usar:**
- Seleção de uma opção entre um conjunto mutuamente exclusivo (2–5 opções)
- Alternância entre modos de visualização
- Controles de formatação (alinhamento, tamanho, modo)
- Filtros toggle com estado persistente

**Quando NÃO usar:**
- Mais de 5 opções → `DssSelect` ou `DssRadio` com `DssRadioGroup`
- Seleção múltipla simultânea → `DssCheckbox`
- Botões de ação sem estado de seleção → `DssBtnGroup`
- Navegação entre conteúdo → `DssTabs`

---

## 3. Justificativa da Fase 2

O DssBtnToggle é classificado como Fase 2 porque:
- Gerencia **estado de seleção compartilhado** entre múltiplos botões
- Orquestra botões internos com base em um array de opções
- Coordena a lógica de seleção/deseleção (incluindo o modo `clearable`)
- Aplica **estilos de grupo** (border-radius nas extremidades, separadores) em elementos DOM gerados pelo Quasar

Este gerenciamento de estado cruzado é o critério definidor da Fase 2.

---

## 4. API

### 4.1 Props Expostas

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `any` | `undefined` | Valor selecionado (v-model) |
| `options` | `BtnToggleOption[]` | — | Array de opções (**obrigatório**) |
| `variant` | `BtnToggleVariant` | `'elevated'` | Variante visual |
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

### 4.2 Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `glossy` | Não é parte da linguagem visual DSS v2.2 |
| `size` | Deve seguir tokens `--dss-compact-control-height-*` (implementação futura) |
| `dense` | Mesmo motivo de `size` |
| `noCaps` (externo) | Componente aplica internamente. Casing por tokens de tipografia |

### 4.3 Mapeamento variant → QBtnToggle

| `variant` DSS | Props booleanas Quasar |
|---------------|------------------------|
| `elevated` | *(nenhuma — padrão Quasar)* |
| `flat` | `flat: true` |
| `outline` | `outline: true` |
| `unelevated` | `unelevated: true` |
| `push` | `push: true` |

### 4.4 Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido ao clicar numa opção ou ao desmarcar (clearable) |

### 4.5 Slots

| Slot | Descrição |
|------|-----------|
| `[nome-do-slot]` (dinâmico) | Conteúdo personalizado para opções com `slot: 'nome'` definido |

---

## 5. Variantes Visuais

### 5.1 elevated (padrão)
Botões com sombra — aparência elevada padrão do Quasar.

### 5.2 flat
Botões sem sombra e sem borda. Separador sutil (`--dss-gray-300`) entre botões adjacentes.

### 5.3 outline
Botões com borda visível. Borda dupla entre adjacentes colapsada via `margin-left` negativo.

### 5.4 unelevated
Botões com fundo sólido, sem sombra. Separador mais sutil (`--dss-gray-200`).

### 5.5 push
Botões com efeito 3D (sombra inferior). Efeito gerenciado integralmente pelo Quasar.

---

## 6. Estados

### 6.1 Estados Aplicáveis

| Estado | Proprietário | Implementação |
|--------|-------------|---------------|
| `default` | DssBtnToggle | Estilos base + `options` renderizadas |
| `disabled` | Delegado ao QBtnToggle | Prop `disable: true` |
| `readonly` | DssBtnToggle | `.dss-btn-toggle--readonly` → `pointer-events: none` |

### 6.2 Estados Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover` | Pertence aos botões internos (QBtnToggle gerencia) |
| `focus` | Pertence aos botões internos (QBtnToggle gerencia) |
| `active` | Pertence aos botões internos (QBtnToggle gerencia) |
| `error` | Grupos de alternância não têm estado de validação |
| `indeterminate` | Container de seleção exclusiva — sempre determinado |
| `loading` | Fase 2 Ciclo 1 — sem operações assíncronas de seleção |

### 6.3 Estado Selecionado (Active)

O estado de seleção é gerenciado inteiramente pelo QBtnToggle:
- O botão ativo recebe a classe `bg-{toggleColor}` e `text-{toggleTextColor}`
- `aria-pressed="true"` no botão ativo (Quasar automático)
- O DssBtnToggle não sobrescreve este comportamento

---

## 7. Acessibilidade

### 7.1 ARIA

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `group` | DssBtnToggle (explícito no template) |
| `aria-label` | prop `ariaLabel` | Quando fornecido |
| `aria-pressed` | `true`/`false` | QBtnToggle (automático por botão) |
| `aria-disabled` | `true` | QBtnToggle (automático quando `disable`) |

### 7.2 Touch Target

**Opção B — Delegado ao QBtnToggle interno.** Os botões internos já implementam touch target adequado. DssBtnToggle não é um Compact Control standalone.

### 7.3 Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Tab` | Move foco entre botões do grupo |
| `Enter` / `Space` | Ativa/desativa a opção focada |

---

## 8. Comportamentos Implícitos

### 8.1 Forwarding de Atributos

`inheritAttrs: false` com `v-bind="$attrs"` passado ao `q-btn-toggle`. Atributos não reconhecidos chegam ao elemento raiz do QBtnToggle.

### 8.2 `no-caps` Interno

O componente passa `no-caps` internamente ao QBtnToggle para garantir consistência visual com os tokens de tipografia DSS. O consumidor não precisa (nem deve) passar esta prop.

### 8.3 Slots Dinâmicos

O DssBtnToggle re-expõe slots de opções para o consumidor. Para cada opção com `slot: 'nome'`, o template verifica e expõe o slot correspondente. O consumidor pode personalizar o conteúdo de qualquer botão via slots nomeados.

---

## 9. Decisões Arquiteturais

### 9.1 Abordagem WRAP vs. Rebuild

O DssBtnToggle usa WRAP QBtnToggle porque:
- QBtnToggle fornece gerenciamento de v-model, seleção, aria-pressed nativo
- Keyboard navigation integrada
- Rebuilding seria duplicação sem ganho arquitetural
- Precedente: DssBtnDropdown (selado Mar 2026) usa mesma estratégia

### 9.2 `variant` como String vs. Props Booleanas Individuais

**Escolha: `variant: string`** (API simplificada DSS).
- DssBtnGroup usa props booleanas individuais (flat, outline, push, unelevated)
- DssBtnToggle usa `variant` string para API mais limpa e menos verbosa
- Alinhamento com DssBtnDropdown (mesmo padrão, selado Mar 2026)
- Justificativa: DssBtnGroup recebe filhos via slot (precisa de sync de props), DssBtnToggle gerencia internamente (não precisa de sync)

### 9.3 Gate de Composição v2.4 (pré-formalizado)

Seletores `.q-btn-item` são Quasar DOM internals — não subcomponentes DSS filhos. A exceção é documentada preemptivamente para evitar NC de auditoria. Precedente: DssBtnGroup.

### 9.4 Gate de Responsabilidade v2.4 (pré-formalizado)

`:hover`/`:focus-visible` em `_outline.scss` é ajuste estrutural de z-index — não captura aparência visual dos estados. Exceção documentada para evitar NC de auditoria. Precedente: DssBtnGroup Ciclo 2.

---

## 10. Paridade com Golden Context (DssBtnGroup)

| Aspecto | DssBtnGroup | DssBtnToggle | Divergência |
|---------|-------------|--------------|-------------|
| Container base | `<div>` via template | `<q-btn-toggle>` via wrapper | Intencional — DssBtnToggle não usa slot |
| Border-radius extremidades | `.dss-button:first/last-child` | `.q-btn-item:first/last-child` | Intencional — seletor Quasar (compositionGateV24) |
| Separadores flat | `border-right: --dss-gray-300` | `border-right: --dss-gray-300` | Igual |
| Separadores unelevated | `border-right: --dss-gray-200` | `border-right: --dss-gray-200` | Igual |
| Outline colapso | `margin-left calc(-1 * thin)` | `margin-left calc(-1 * thin)` | Igual |
| `-webkit-tap-highlight` | Sim | Sim | Igual |
| `dss-transition` mixin | Sim | Sim | Igual |
| Brand accent | `box-shadow inset bottom` | `box-shadow inset bottom` | Igual |
| Dark dividers | `rgba(255,255,255,0.12)` | `rgba(255,255,255,0.12)` | Igual |
| Forced-colors | `outline ButtonText` | `outline ButtonText` | Igual |
| `role="group"` | Sim | Sim | Igual |
| `<style>` sem scoped | Sim | Sim | Igual |
| gateExceptions | compositionGateV24 + responsibilityGateV24 | compositionGateV24 + responsibilityGateV24 | Igual |
| Props de variante | booleanas individuais | `variant` string | **Intencional** — DssBtnToggle não precisa de prop sync com filhos explícitos |
| v-model | Não (sem seleção) | Sim (seleção exclusiva) | **Diferença fundamental de propósito** |
| `options` | Não (usa slot) | Sim (array de opções) | **Diferença fundamental de propósito** |

---

## 11. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L3 | Separadores; colapso outline |
| `--dss-border-width-thick` | L4 | Acento brand |
| `--dss-border-width-md` | Module | High contrast |
| `--dss-radius-full` | L2 | Border-radius pill (rounded) |
| `--dss-gray-200` | L3 | Separador unelevated |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste |

---

## 12. Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `_base.scss` | Square variant. Semântico. Padrão DssBtnGroup EXC-01. |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `_states.scss` | Dark mode dividers. Sem token DSS para white alpha. Padrão DssBtnGroup EXC-02. |
| EXC-03 | `1px solid ButtonText` | `_states.scss` | Forced-colors — system keywords obrigatórios. Padrão DssBtnGroup EXC-03. |

---

## 13. Gate Exceptions (v2.4)

### Gate de Composição v2.4 — Regra 1 (Uso direto de QBtnToggle no template)

| Campo | Valor |
|-------|-------|
| Regra violada | Regra 1 — Uso Exclusivo de DSS |
| Arquivo | `1-structure/DssBtnToggle.ts.vue` |
| Violação | Uso direto de `<q-btn-toggle>` (componente Quasar) no template |
| Justificativa | Abordagem WRAP obrigatória. QBtnToggle fornece v-model, aria-pressed, keyboard navigation e gerenciamento de seleção nativos. Rebuilding seria duplicação sem ganho arquitetural. Precedente: DssBtnDropdown (selado Mar 2026) usa mesma estratégia WRAP. |
| Decisão arquitetural | Chat Estratégico DSS — Pré-formalizado no pre-prompt (27 Mar 2026) |

### Gate de Composição v2.4 — Regra 2 (Seletores CSS .q-btn-item)

| Campo | Valor |
|-------|-------|
| Seletor | `.q-btn-item` |
| Arquivos | `_base.scss`, `_flat.scss`, `_outline.scss`, `_unelevated.scss`, `_states.scss` |
| Justificativa | `.q-btn-item` é elemento DOM interno do QBtnToggle (Quasar), não subcomponente DSS. O Gate v2.4 aplica-se exclusivamente a componentes DSS filhos. Precedente: DssBtnGroup (selado Mar 2026). |
| Decisão arquitetural | Chat Estratégico DSS — Pré-formalizado no pre-prompt (27 Mar 2026) |

### Gate de Responsabilidade v2.4

| Campo | Valor |
|-------|-------|
| Seletor | `.q-btn-item:hover, .q-btn-item:focus-visible` |
| Arquivos | `_outline.scss` |
| Justificativa | Ajuste de z-index (posicionamento estrutural) — não captura aparência visual dos estados interativos dos filhos. Necessário para que borda ativa fique visível sobre adjacente com margin-left negativo. Precedente: DssBtnGroup Ciclo 2 (selado Mar 2026). |
| Decisão arquitetural | Chat Estratégico DSS — Pré-formalizado no pre-prompt (27 Mar 2026) |

---

## 14. Reservas

| ID | Descrição | Severidade | Bloqueante |
|----|-----------|-----------|-----------|
| RES-01 | Tokens de brand numéricos | baixa | não |
| RES-02 | `<style>` sem scoped (necessário) | baixa | não |
| RES-03 | Sem testes unitários | baixa | não |

---

## 15. Estrutura de Arquivos

```
DssBtnToggle/
├── 1-structure/DssBtnToggle.ts.vue     ← Implementação canônica
├── 2-composition/_base.scss            ← Container + border-radius + layout (EXC-01)
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
├── composables/
│   ├── useBtnToggleClasses.ts
│   └── index.ts
├── types/
│   └── btn-toggle.types.ts
├── DssBtnToggle.module.scss            ← Orquestrador L2→L3→L4
├── DssBtnToggle.vue                    ← Entry Point Wrapper (re-export puro)
├── DssBtnToggle.example.vue            ← 7 cenários
├── DssBtnToggle.md                     ← Este arquivo
├── DSSBTNTOGGLE_API.md                 ← API Reference
├── dss.meta.json                       ← Metadados + exceções + gateExceptions
├── index.js                            ← Barrel export
└── README.md
```

---

## 16. Matriz de Composição DSS

### 16.1 Papel Estrutural

O DssBtnToggle é um **container de seleção** — ele gera e gerencia seus filhos internamente. Não aceita DssButton como filho explícito (diferença vs. DssBtnGroup).

### 16.2 Componentes DSS Relacionados

| Componente | Relação | Status |
|------------|---------|--------|
| DssBtnGroup | Irmão arquitetural (container de layout) | ✅ Selado Mar 2026 |
| DssButton | Usado internamente pelo QBtnToggle | ✅ Selado Fase 1 |
| DssRadio | Alternativa semântica para seleção com labels extensos | ✅ Selado Fase 1 |
| DssSelect | Alternativa para muitas opções (>5) | ✅ Selado Mar 2026 |

### 16.3 Anti-Patterns de Composição

- ❌ Colocar `DssButton` dentro do `<slot>` (DssBtnToggle não tem slot de botões)
- ❌ Usar `DssBtnToggle` para seleção múltipla → usar `DssCheckbox`
- ❌ Usar `DssBtnToggle` com mais de 5 opções → usar `DssSelect`
- ❌ Usar para navegação → usar `DssTabs`
- ❌ Passar `dark` prop → DSS gerencia dark mode globalmente

---

*Design System Sansys — DSS v2.2 — DssBtnToggle*
*Status: ✅ Selado — 27 Mar 2026*
