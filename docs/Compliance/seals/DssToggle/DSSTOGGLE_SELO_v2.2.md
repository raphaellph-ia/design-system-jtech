# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssToggle |
| **Versao do Componente** | 1.0.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Compact Control interativo — Form / Selection |
| **Status Pre-Selo** | Draft (elegivel para auditoria) |
| **Golden Component de Referencia** | DssCheckbox (Compact Control interativo, Selo DSS v2.2) |
| **Golden Component Secundario** | DssRadio (Form/Selection, error state, aria-describedby, Selo DSS v2.2) |
| **Data de Emissao** | 05 de Fevereiro de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial | 05 Fevereiro 2026 | 3 NCs identificadas, 6 GAPs |
| Correcao Tecnica + Documental | 05 Fevereiro 2026 | 3 NCs corrigidas, 0 regressoes |
| Re-Auditoria | 05 Fevereiro 2026 | 0 NCs, 6 ressalvas nao-bloqueantes |
| Auditoria Final | 05 Fevereiro 2026 | NC = 0, Aprovado |

---

## Nao-Conformidades

**Nenhuma nao-conformidade encontrada.**

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | Classe `text-white` ausente em `trackColorClasses` — thumb (`background-color: currentColor`) permanecia escuro sobre track colorido sem brand | Adicionado `text-white` ao retorno: `bg-${color} text-white` | `composables/useToggleClasses.ts:96` — alinhado com DssCheckbox golden (`useCheckboxClasses.ts`) |
| NC-02 | Guard de erro ausente em `trackColorClasses` — `bg-{color}` conflitava com estilizacao de erro | Adicionado `if (props.error) return ''` antes da atribuicao de cor | `composables/useToggleClasses.ts:93` — alinhado com DssRadio golden (`useRadioClasses.ts`) |
| NC-03 | Documentacao listava tecla Enter como ativadora do toggle — `<input type="checkbox">` nao responde a Enter nativamente | Removida linha Enter da tabela de teclado, adicionada nota explicativa | `DssToggle.md:139-141` — comportamento nativo verificado |

---

## Ressalvas (nao-bloqueantes)

As ressalvas abaixo foram identificadas e aceitas. Nenhuma impede a emissao do selo.

| ID | Descricao | Justificativa | Monitoramento |
|----|-----------|---------------|---------------|
| R-01 | `defineExpose({ focus, blur })` presente em DssToggle, ausente em DssCheckbox golden | Funcionalidade correta e documentada. Cria inconsistencia entre goldens mas nao viola normativa. | Considerar alinhar DssCheckbox em futuro ciclo. |
| R-02 | Dark mode hover/active aplica-se apenas a `.dss-toggle__track--checked`. Track unchecked sem ajuste dark. | Gap sistemico: DssCheckbox golden apresenta o mesmo comportamento. Nao especifico do DssToggle. | Monitorar resolucao sistemica em futuras revisoes do DSS. |
| R-03 | `.dss-toggle` nao declara `color` root property explicitamente. Herda via cascata CSS. | Funciona corretamente. Heranca implicita aceita. | Nenhum; comportamento CSS padrao. |
| R-04 | Mixins DSS (`dss-transition`, `dss-focus-ring`, `dss-touch-target`) nao utilizados | DssCheckbox e DssRadio goldens tambem nao usam. Mixins sao facilitadores, nao mandatorios. Tokens aplicados corretamente de forma direta. | Nenhum; consistente com goldens. |
| R-05 | `prefers-reduced-motion` usa `transition: none` sem `!important` | DssCheckbox golden apresenta o mesmo padrao. Funcional se nao houver conflito de especificidade. | Monitorar se especificidade causa problemas em integracao. |
| R-06 | `.dss-toggle__error` posicionado inline com `display: block`. Pode causar quebra em contextos inline-flex complexos. | Aceitavel na Fase 1. Funcional em cenarios documentados. | Monitorar em integracao com formularios complexos. |

> Nenhuma ressalva impede a concessao do selo.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes
- Zero tokens especificos de componente (`--dss-toggle-*` = 0 resultados)
- Tokens genericos de compact control: `--dss-compact-control-height-{xs,sm,md,lg}`
- Touch target via `--dss-touch-target-min` (48px)
- Tokens de brand semanticos: `--dss-{hub,water,waste}-{primary,secondary,accent,on-primary,on-secondary,on-accent}`
- Tokens de motion: `--dss-duration-200`, `--dss-easing-standard`
- Tokens de opacidade: `--dss-opacity-disabled` (0.4), `--dss-opacity-50`
- Tokens de borda: `--dss-border-width-md`, `--dss-border-width-thick`
- Tokens de focus: `--dss-focus-ring`
- Tokens de tipografia: `--dss-font-family-sans`, `--dss-font-size-{xs,sm,md}`, `--dss-line-height-normal`
- Tokens de erro: `--dss-error-600` (light), `--dss-error-400` (dark)
- 8 excepcoes documentadas (EXC-01 a EXC-08) com ID, valor, arquivo e racional
- Valores de brightness canonicos: 0.90, 0.95 (light), 1.10, 1.20 (dark)
- Valor de saturate canonico: 1.2 (high contrast)
- Zero valores hardcoded nao-documentados (exceto `1px` em sr-only — padrao aceito)

### Touch Target — CONFORME

- 48px via `::before` no elemento raiz com `min-width`/`min-height: var(--dss-touch-target-min)`
- `::before` reservado exclusivamente para touch target (conforme CLAUDE.md Principio #7)
- `::after` nao utilizado (conforme convencao)
- `pointer-events: none` no pseudo-elemento
- Centralizado via `top: 50%; left: 50%; transform: translate(-50%, -50%)`
- Dense: touch target removido (`::before { display: none }`)
- Print: touch target removido (`::before { display: none }`)
- Nenhuma violacao de pseudo-elementos

### Arquitetura — CONFORME

- Layer 1 (Structure): `1-structure/DssToggle.ts.vue` — TypeScript + Composition API + `<script setup>`
- Layer 2 (Composition): `2-composition/_base.scss` — tokens genericos, layout, tamanhos, estados (367 linhas)
- Layer 3 (Variants): `3-variants/index.scss` — vazio por design (Fase 1, controle atomico)
- Layer 4 (Output): `4-output/_brands.scss` + `4-output/_states.scss`
- Orchestrador: `DssToggle.module.scss` (3 `@use` imports com aliases, sem duplicacao)
- CSS compilado: `DssToggle.module.css` (803 linhas, zero erros)
- Entry point: `DssToggle.vue` (re-export para Layer 1)
- Tipos: `types/toggle.types.ts` com interfaces completas (ToggleProps, ToggleEmits, ToggleSlots)
- Composables: `composables/useToggleClasses.ts` com logica de classes separada
- `defineOptions({ name: 'DssToggle', inheritAttrs: false })` com `v-bind="$attrs"` no root
- Nenhuma camada omitida
- Nenhuma heranca indevida
- Nenhum acoplamento com outros componentes DSS

### Estados — CONFORME

| Estado | SCSS | Vue/ARIA | Evidencia |
|--------|------|----------|-----------|
| default | `_base.scss:26-67` | Template raiz | Track vazio com borda `currentColor`, thumb `currentColor` |
| hover | `_base.scss:326-328` | — | `brightness(0.95)` light, `brightness(1.1)` dark (checked) |
| active | `_base.scss:340-342` | — | `brightness(0.90)` light, `brightness(1.2)` dark (checked) |
| focus | `_base.scss:353-356` | `isFocused` ref | Outline tokenizado `--dss-focus-ring` via `.dss-toggle__track--focused` |
| checked | `_base.scss:166-174` | `isChecked` computed | Track colorido + thumb deslocado via `left: calc(...)` |
| disabled | `_base.scss:362-366` | `aria-disabled`, `tabindex="-1"` | `opacity: var(--dss-opacity-disabled)`, `cursor: not-allowed`, `pointer-events: none` |
| error | `_base.scss:206-222` | `aria-invalid`, `role="alert"`, `aria-describedby` | `color: var(--dss-error-600)`, guard em composable |
| dense | `_base.scss:301-310` | Classe `dss-toggle--dense` | Reduz gap, altura, fonte; remove touch target |
| loading | — | — | Declarado como "Nao aplicavel" com justificativa (Fase 1) |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 2.5.5 Touch Target (AA) | CONFORME | `::before` com `min-width`/`min-height: var(--dss-touch-target-min)` = 48px |
| 2.4.7 Focus Visible (AA) | CONFORME | Outline com `var(--dss-focus-ring)` e `var(--dss-spacing-0_5)` offset |
| 1.3.1 Info and Relationships (A) | CONFORME | `<label>` nativo como raiz, `<input type="checkbox" role="switch">` nativo |
| 4.1.2 Name, Role, Value (A) | CONFORME | `role="switch"`, `aria-checked`, `aria-disabled`, `aria-invalid`, `aria-label` |
| 3.3.1 Error Identification (A) | CONFORME | `role="alert"`, `aria-live="assertive"`, `aria-describedby` com ID unico |
| 2.1.1 Keyboard (A) | CONFORME | Tab, Shift+Tab, Space (nativo). Enter corretamente documentado como nao-ativador. |
| `prefers-reduced-motion` | CONFORME | `transition: none` em `.dss-toggle`, `.dss-toggle__track`, `.dss-toggle__thumb` |
| `prefers-contrast: more` | CONFORME | Borda `--dss-border-width-thick`, `saturate(1.2)`, disabled com `line-through` e `--dss-opacity-50` |
| `forced-colors: active` | CONFORME | System colors: `ButtonText`, `Highlight`, `HighlightText`, `GrayText`, `ButtonFace`, `LinkText`. `forced-color-adjust: none`. |
| `prefers-color-scheme: dark` | CONFORME | Brightness invertido, erro `--dss-error-400`, disabled `--dss-opacity-disabled` |
| Print styles | CONFORME | Sem filtros, borda `currentColor`, sem touch target, thumb `currentColor` |
| `aria-hidden="true"` decorativo | CONFORME | Track `<span>` e Thumb `<span>` com `aria-hidden="true"` |
| IDs unicos automaticos | CONFORME | `dss-toggle-error-{hash}` para associacao input/error via `aria-describedby` |
| `-webkit-tap-highlight-color` | CONFORME | `transparent` no root `.dss-toggle` |
| Keyboard navigation | CONFORME | Tabindex somente no input, expose `focus()`/`blur()` |

### Documentacao — CONFORME

- `DssToggle.md` — Documentacao principal completa (13 secoes, 385 linhas)
- `README.md` — Quick Reference (13 secoes, 178 linhas, 7 exemplos)
- `DSS_TOGGLE_API.md` — API Reference (103 linhas, contrato completo)
- `DssToggle.example.vue` — Showcase visual (9 exemplos)
- `DssToggle.test.js` — Testes unitarios em 9 suites (props, value/model, events, slots, a11y, colors, brands, structure, edge cases)
- API documentada = API implementada (14 props, 1 evento, 1 slot, 2 expose)
- 8 excepcoes com rastreabilidade completa (ID, valor, arquivo, justificativa)
- Tokens listados com nomes exatos em 7 categorias
- Subset controlado declarado explicitamente (diferencas vs. QToggle documentadas)
- Estado indeterminate declarado como "Nao aplicavel" com justificativa (binario)
- Estado loading declarado como "Nao aplicavel" com justificativa (Fase 1)
- Anti-patterns documentados (4 usos incorretos: AP-01 a AP-04)
- Diferenca semantica Toggle vs Checkbox documentada
- Nenhuma linguagem absoluta proibida ("100% compativel", "Golden Sample")

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssCheckbox (primario), DssRadio (secundario) | Mesma categoria (Compact Control interativo), mesma familia (Form/Selection) |
| ARIA role | `role="switch"` no `<input type="checkbox">` | WAI-ARIA 1.1 define `role="switch"` para controles on/off imediatos |
| Touch target canonico | 48px via `--dss-touch-target-min` | WCAG 2.5.5 AA; pseudo-elemento `::before` reservado |
| Dense touch target | Removido (`display: none`) | Dense reduz densidade visual e area de toque; precedente DssRadio |
| Tokens de altura | `--dss-compact-control-height-{xs,sm,md,lg}` | Compact Control; nao usa tokens especificos |
| Track shape | `border-radius: 9999px` (excecao) | Pill shape inerente ao componente, nao tokenizavel |
| Thumb shape | `border-radius: 50%` (excecao) | Forma circular inerente ao componente; precedente DssRadio |
| Indicador visual | Elementos `<span>` reais (track + thumb), nao pseudo-elementos | Decorativos com `aria-hidden="true"` |
| Layer 3 (Variants) | Vazia por design | Controle atomico Fase 1, sem variantes visuais |
| Estado indeterminate | Nao aplicavel | Toggle e binario (on/off), nao suporta estado intermediario |
| Estado loading | Nao aplicavel | Fase 1; propor via RFC se necessario |
| Opacidade disabled | 0.4 via `--dss-opacity-disabled` | DSS_TOKEN_REFERENCE.md |
| Estrategia de cores | Bifurcada: sem brand = classes utilitarias Quasar, com brand = CSS `_brands.scss` | Padrao DssCheckbox golden |
| Hierarquia error > color | Error impede aplicacao de cor no composable | Padrao DssRadio golden |

---

## Veredito Final

| Criterio | Status |
|----------|--------|
| Tokens | CONFORME |
| Touch Target | CONFORME |
| Arquitetura | CONFORME |
| Estados | CONFORME |
| Acessibilidade | CONFORME |
| Documentacao | CONFORME |

---

## CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente:** DssToggle
**Versao:** 1.0.0
**Data de Emissao:** 05 de Fevereiro de 2026
**Classificacao:** Compact Control interativo — Form / Selection — Fase 1

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssToggle invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/Compliance/seals/DssToggle/DSSTOGGLE_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `1-structure/DssToggle.ts.vue` | Layer 1 | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/index.scss` | Layer 3 | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 | CONFORME |
| `DssToggle.module.scss` | Orchestrador | CONFORME |
| `DssToggle.module.css` | Compilado | CONFORME |
| `DssToggle.vue` | Entry Point | CONFORME |
| `composables/useToggleClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel | CONFORME |
| `types/toggle.types.ts` | Tipos | CONFORME |
| `DssToggle.md` | Doc Principal | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DSS_TOGGLE_API.md` | Doc API | CONFORME |
| `DssToggle.example.vue` | Showcase | CONFORME |
| `DssToggle.test.js` | Testes | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
| `index.js` | API Publica | CONFORME |
