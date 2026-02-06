# DssToggle — Documentacao Principal

**Versao:** 1.0.0
**DSS:** v2.2
**Status:** Draft (elegivel para auditoria)
**Classificacao:** Compact Control interativo | Form / Selection | Fase 1

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssToggle |
| **Versao** | 1.0.0 |
| **DSS** | v2.2 |
| **Golden Component Primario** | DssCheckbox (Compact Control interativo, Selo DSS v2.2) |
| **Golden Component Secundario** | DssRadio (Form/Selection, Selo DSS v2.2) |
| **Paralelo Framework** | Quasar QToggle |
| **Escopo** | Subset controlado da API QToggle |

---

## 2. Descricao

### O que e
DssToggle e um componente de controle de alternancia (toggle/switch) que permite ao usuario ativar ou desativar uma opcao. Visualmente representado como um track (trilho) com um thumb (botao deslizante) que se move entre as posicoes off (esquerda) e on (direita).

### Quando usar
- Configuracoes on/off (ex.: "Ativar notificacoes")
- Preferencias binarias imediatas (ex.: "Modo escuro")
- Quando a acao tem efeito imediato (sem necessidade de submit)
- Grupos de toggles independentes (array mode)

### Quando NAO usar
- Para selecao de uma opcao entre varias: usar DssRadio
- Para selecao multipla com acao atrasada: usar DssCheckbox
- Para acoes destrutivas: preferir botao com confirmacao
- Para selecao de formulario que requer submit: preferir DssCheckbox

### Diferenca semantica: Toggle vs Checkbox
| Aspecto | Toggle | Checkbox |
|---------|--------|----------|
| ARIA role | `switch` | (nativo checkbox) |
| Efeito | Imediato | Atrasado (submit) |
| Estado | Binario (on/off) | Binario + indeterminate |
| Metafora visual | Interruptor fisico | Caixa de selecao |

---

## 3. Arquitetura

### 3.1 Camadas (4-Layer Architecture)

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| Layer 1 - Structure | `1-structure/DssToggle.ts.vue` | Componente Vue + logica |
| Layer 2 - Composition | `2-composition/_base.scss` | Tokens genericos, layout, estados |
| Layer 3 - Variants | `3-variants/index.scss` | Vazio (Fase 1, sem variantes) |
| Layer 4 - Output | `4-output/_brands.scss` + `_states.scss` | Brands e estados especiais |

### 3.2 Estrutura de Arquivos

```
DSS/components/base/DssToggle/
├── 1-structure/
│   └── DssToggle.ts.vue          # Componente Vue principal
├── 2-composition/
│   └── _base.scss                # Estilos base (tokens genericos)
├── 3-variants/
│   └── index.scss                # Vazio (Fase 1)
├── 4-output/
│   ├── _brands.scss              # Hub, Water, Waste
│   ├── _states.scss              # Dark, contrast, motion, forced-colors, print
│   └── index.scss                # Orchestrador Layer 4
├── composables/
│   ├── useToggleClasses.ts       # Composable de classes CSS
│   └── index.ts                  # Barrel export
├── types/
│   └── toggle.types.ts           # Interfaces TypeScript
├── DssToggle.vue                 # Entry point (re-export)
├── DssToggle.module.scss         # Orchestrador de camadas
├── DssToggle.example.vue         # Showcase visual
├── DssToggle.test.js             # Testes unitarios
├── DssToggle.md                  # Esta documentacao
├── DSS_TOGGLE_API.md             # API Reference
├── README.md                     # Quick Reference
├── dss.meta.json                 # Metadados DSS
└── index.js                      # Barrel export
```

---

## 4. Estrategia de Touch Target

**Opcao A — Componente INTERATIVO**

- Touch target >= 48px via `::before` no elemento raiz `<label>`
- Token: `--dss-touch-target-min`
- `pointer-events: none` no pseudo-elemento
- `::before` reservado exclusivamente para touch target (CLAUDE.md Principio #7)
- `::after` nao utilizado

### Dense mode
- Touch target removido via `::before { display: none }`
- Justificativa: Dense reduz densidade visual e area de toque (seguindo DssRadio)

---

## 5. ARIA e Acessibilidade

### 5.1 role="switch"

DssToggle usa `role="switch"` no `<input type="checkbox">` nativo.

**Justificativa:** O padrao WAI-ARIA define `role="switch"` para controles que representam um estado on/off imediato. Diferente de um checkbox (que tipicamente requer submit), um toggle tem efeito imediato. O `role="switch"` comunica essa semantica para tecnologias assistivas.

**Referencia:** [WAI-ARIA 1.1 - Switch Role](https://www.w3.org/TR/wai-aria-1.1/#switch)

### 5.2 Atributos ARIA

| Atributo | Elemento | Valor | Descricao |
|----------|----------|-------|-----------|
| `role="switch"` | `<input>` | — | Semantica de switch |
| `aria-checked` | `<input>` | `true`/`false` | Estado atual |
| `aria-disabled` | `<input>` | `true`/undefined | Estado desabilitado |
| `aria-invalid` | `<input>` | `true`/undefined | Estado de erro |
| `aria-label` | `<input>` | string | Label para screen readers |
| `aria-describedby` | `<input>` | ID | Referencia a mensagem de erro |
| `aria-hidden="true"` | Track `<span>` | — | Decorativo |
| `aria-hidden="true"` | Thumb `<span>` | — | Decorativo |

### 5.3 Navegacao por Teclado

| Tecla | Acao |
|-------|------|
| Tab | Foca o toggle |
| Shift+Tab | Foco anterior |
| Space | Toggle on/off (nativo) |

> **Nota:** A tecla Enter NAO ativa `<input type="checkbox">` nativamente na maioria dos navegadores. Apenas Space alterna o estado. Este comportamento e inerente ao elemento HTML, nao ao componente.

### 5.4 WCAG 2.1 AA

| Criterio | Status | Implementacao |
|----------|--------|---------------|
| 2.5.5 Touch Target (AA) | Implementado | `::before` com `var(--dss-touch-target-min)` = 48px |
| 2.4.7 Focus Visible (AA) | Implementado | Outline com `var(--dss-focus-ring)` |
| 1.3.1 Info and Relationships (A) | Implementado | `<label>` nativo, `<input type="checkbox" role="switch">` |
| 4.1.2 Name, Role, Value (A) | Implementado | `aria-checked`, `aria-disabled`, `aria-invalid`, `aria-label` |
| 3.3.1 Error Identification (A) | Implementado | `role="alert"`, `aria-live="assertive"`, `aria-describedby` |
| 2.1.1 Keyboard (A) | Implementado | Tab, Space (nativo) |

---

## 6. Comportamentos Implicitos (Declaracao Obrigatoria)

| Comportamento | Declaracao |
|---------------|------------|
| `inheritAttrs` | `false` — atributos encaminhados via `v-bind="$attrs"` no root `<label>` |
| Elementos decorativos | Track (`<span>`) e Thumb (`<span>`) com `aria-hidden="true"` |
| Estado indeterminate | NAO aplicavel — toggle e binario (on/off) |
| Estado loading | NAO aplicavel — Fase 1; propor via RFC se necessario |
| `defineExpose` | `focus()` e `blur()` expostos para controle programatico |

---

## 7. Tokens Utilizados

### 7.1 Tokens de Layout

| Token | Uso |
|-------|-----|
| `--dss-spacing-0_5` | Offset do thumb, outline-offset |
| `--dss-spacing-1` | Gap em xs e dense |
| `--dss-spacing-1_5` | Gap em sm |
| `--dss-spacing-2` | Gap padrao (md) |
| `--dss-spacing-3` | Gap em lg, thumb xs |
| `--dss-spacing-4` | Thumb md/sm, track height xs |
| `--dss-spacing-5` | Track height md/sm, thumb lg |
| `--dss-spacing-6` | Track height lg |
| `--dss-spacing-7` | Track width xs |
| `--dss-spacing-8` | Track width sm |
| `--dss-spacing-9` | Track width md |
| `--dss-spacing-11` | Track width lg |

### 7.2 Tokens de Compact Control

| Token | Uso |
|-------|-----|
| `--dss-compact-control-height-xs` | min-height xs (20px) |
| `--dss-compact-control-height-sm` | min-height sm/dense (24px) |
| `--dss-compact-control-height-md` | min-height md (28px) |
| `--dss-compact-control-height-lg` | min-height lg (32px) |

### 7.3 Tokens de Tipografia

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Familia de fontes |
| `--dss-font-size-xs` | Font-size xs/sm/dense |
| `--dss-font-size-sm` | Font-size md (padrao) |
| `--dss-font-size-md` | Font-size lg |
| `--dss-line-height-normal` | Line-height |

### 7.4 Tokens de Interacao

| Token | Uso |
|-------|-----|
| `--dss-duration-200` | Transicoes |
| `--dss-easing-standard` | Curva de easing |
| `--dss-touch-target-min` | Touch target 48px |
| `--dss-opacity-disabled` | Opacidade disabled (0.4) |
| `--dss-opacity-50` | Opacidade high contrast disabled |

### 7.5 Tokens de Borda e Focus

| Token | Uso |
|-------|-----|
| `--dss-border-width-md` | Borda do track, outline focus |
| `--dss-border-width-thick` | Borda em high contrast |
| `--dss-focus-ring` | Cor do focus ring |

### 7.6 Tokens de Erro

| Token | Uso |
|-------|-----|
| `--dss-error-600` | Cor de erro (light mode) |
| `--dss-error-400` | Cor de erro (dark mode) |

### 7.7 Tokens de Brand

| Token | Uso |
|-------|-----|
| `--dss-{brand}-primary` | Cor primaria da marca |
| `--dss-{brand}-secondary` | Cor secundaria da marca |
| `--dss-{brand}-accent` | Cor de destaque da marca |
| `--dss-{brand}-on-primary` | Cor sobre primaria |
| `--dss-{brand}-on-secondary` | Cor sobre secundaria |
| `--dss-{brand}-on-accent` | Cor sobre destaque |

---

## 8. Excecoes Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `brightness(0.95)` | `_base.scss` | Hover light mode. Valor canonico DSS. Nao tokenizavel. Precedente: DssCheckbox. |
| EXC-02 | `brightness(0.90)` | `_base.scss` | Active light mode. Valor canonico DSS. Precedente: DssCheckbox. |
| EXC-03 | `brightness(1.1)` | `_states.scss` | Hover dark mode (checked). Valor canonico DSS. Precedente: DssCheckbox. |
| EXC-04 | `brightness(1.2)` | `_states.scss` | Active dark mode (checked). Valor canonico DSS. Precedente: DssCheckbox. |
| EXC-05 | `saturate(1.2)` | `_states.scss` | High contrast checked. Valor canonico DSS. Precedente: DssCheckbox. |
| EXC-06 | `2px`, `3px` | `_states.scss` | Forced-colors mode. Tokens CSS ignorados. Precedente: DssCheckbox. |
| EXC-07 | `border-radius: 9999px` | `_base.scss` | Pill shape do track. Inerente ao componente. Nao tokenizavel. |
| EXC-08 | `border-radius: 50%` | `_base.scss` | Forma circular do thumb. Precedente: DssRadio. Nao tokenizavel. |

---

## 9. Dense Mode

### Comportamento

Dense mode aplica as seguintes reducoes visuais:

| Propriedade | Normal (md) | Dense |
|-------------|-------------|-------|
| gap | `--dss-spacing-2` (8px) | `--dss-spacing-1` (4px) |
| min-height | `--dss-compact-control-height-md` (28px) | `--dss-compact-control-height-sm` (24px) |
| font-size | `--dss-font-size-sm` (14px) | `--dss-font-size-xs` (12px) |
| touch target | 48px via `::before` | Removido (`display: none`) |

### Comparacao com Golden Component (DssCheckbox)

| Aspecto | DssCheckbox (dense) | DssToggle (dense) |
|---------|--------------------|--------------------|
| gap | `--dss-spacing-1` | `--dss-spacing-1` |
| min-height | `--dss-compact-control-height-sm` | `--dss-compact-control-height-sm` |
| font-size | `--dss-font-size-xs` | `--dss-font-size-xs` |
| touch target | Nao removido explicitamente | Removido (`display: none`) |

> **Nota:** DssCheckbox golden nao remove touch target explicitamente em dense mode.
> DssToggle segue o padrao do DssRadio que remove touch target em dense.
> Esta diferenca esta documentada como decisao arquitetural.

---

## 10. Anti-patterns

### AP-01: Usar toggle para formularios com submit
```vue
<!-- INCORRETO: Toggle tem efeito imediato, nao deve esperar submit -->
<form @submit="save">
  <DssToggle v-model="accepted" label="Aceito os termos" />
  <button type="submit">Enviar</button>
</form>

<!-- CORRETO: Usar DssCheckbox para formularios com submit -->
<form @submit="save">
  <DssCheckbox v-model="accepted" label="Aceito os termos" />
  <button type="submit">Enviar</button>
</form>
```

### AP-02: Criar tokens especificos de componente
```scss
/* INCORRETO: Token especifico de componente */
--dss-toggle-track-width: 36px;
--dss-toggle-thumb-size: 16px;

/* CORRETO: Usar tokens genericos existentes */
width: var(--dss-spacing-9); /* 36px */
height: var(--dss-spacing-4); /* 16px */
```

### AP-03: Usar ::before para efeitos visuais
```scss
/* INCORRETO: ::before reservado para touch target */
.dss-toggle__track::before {
  content: '';
  background: rgba(0, 0, 0, 0.1);
  /* hover overlay */
}

/* CORRETO: Usar filter no proprio elemento */
.dss-toggle:hover .dss-toggle__track {
  filter: brightness(0.95);
}
```

### AP-04: Usar tokens numericos de brand
```scss
/* INCORRETO: Tokens numericos */
background-color: var(--dss-hub-600);

/* CORRETO: Tokens semanticos */
background-color: var(--dss-hub-primary);
```

---

## 11. Decisoes Arquiteturais

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssCheckbox (primario) | Mesma categoria: Compact Control interativo |
| Golden Secundario | DssRadio | Error state e aria-describedby como referencia |
| ARIA role | `switch` | WAI-ARIA recomenda `role="switch"` para controles on/off |
| Touch target | 48px via `::before` | WCAG 2.5.5 AA; `::before` reservado |
| Dense touch target | Removido (`display: none`) | Seguindo DssRadio |
| Layer 3 | Vazia | Fase 1, controle atomico sem variantes |
| Estado indeterminate | Nao aplicavel | Toggle e binario |
| Estado loading | Nao aplicavel | Fase 1 |
| Track shape | Pill (`border-radius: 9999px`) | Inerente ao componente |
| Thumb shape | Circular (`border-radius: 50%`) | Precedente DssRadio |

---

## 12. Paridade com Quasar QToggle

| Feature | QToggle | DssToggle | Status |
|---------|---------|-----------|--------|
| v-model | Sim | Sim | Igual |
| val (array) | Sim | Sim | Igual |
| true-value / false-value | Sim | Sim | Igual |
| label | Sim | Sim | Igual |
| left-label | Sim | Sim | Igual |
| color | Sim | Sim (subset) | Diferente: limitado a cores Quasar validas |
| size | Sim | Sim | Igual |
| disable | Sim | Sim | Igual |
| dense | Sim | Sim (comportamento DSS) | Diferente: reduz visual + remove touch target |
| icon | Sim | Nao | Nao aplicavel Fase 1 |
| checked-icon | Sim | Nao | Nao aplicavel Fase 1 |
| unchecked-icon | Sim | Nao | Nao aplicavel Fase 1 |
| toggle-order | Sim | Nao | Nao aplicavel |
| keep-color | Sim | Nao | Nao aplicavel |
| tabindex | Sim | Sim | Igual |

---

## 13. Changelog

| Versao | Data | Descricao |
|--------|------|-----------|
| 1.0.0 | 2026-02-05 | Criacao inicial. Draft para auditoria DSS v2.2. |
