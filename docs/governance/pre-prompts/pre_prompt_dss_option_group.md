# 🎯 PRÉ-PROMPT ESPECÍFICO: DssOptionGroup (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssOptionGroup`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssOptionGroup` |
| **Equivalente Quasar** | `QOptionGroup` |
| **Fase** | Fase 2 (Componente Composto) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Container de seleção — Agrupa múltiplos controles de seleção (Radio, Checkbox ou Toggle) |
| **Golden Reference** | `DssChip` (interativo) |
| **Golden Context** | `DssBtnToggle` (componente composto irmão de seleção) |

**Justificativa da Fase 2:** O `DssOptionGroup` orquestra múltiplos componentes da Fase 1 (`DssRadio`, `DssCheckbox`, `DssToggle`) baseando-se em um array de opções, gerenciando o estado de seleção (`v-model`) de forma centralizada.

---

## 2. O GRANDE RISCO ARQUITETURAL: COMPOSIÇÃO VS. WRAPPER NATIVO

### 2.1 O Problema do QOptionGroup
O `QOptionGroup` nativo do Quasar renderiza internamente instâncias de `QRadio`, `QCheckbox` e `QToggle`. Se fizermos um wrapper direto do `QOptionGroup`, perderemos toda a governança, tokens e acessibilidade que já construímos nos componentes `DssRadio`, `DssCheckbox` e `DssToggle` (Fase 1).

**Decisão Arquitetural (MUITO IMPORTANTE):**
O `DssOptionGroup` **NÃO DEVE** fazer wrap do `<q-option-group>`. 
Em vez disso, ele deve ser construído do zero iterando sobre a prop `options` (via `v-for`) e renderizando explicitamente os componentes DSS da Fase 1 (`<dss-radio>`, `<dss-checkbox>` ou `<dss-toggle>`), dependendo da prop `type`.

**Mitigação:**
- Isso garante 100% de fidelidade visual e comportamental com a Fase 1.
- O componente atuará como um "controlador de estado" (State Manager), repassando o `v-model` e as props visuais para os filhos DSS.

### 2.2 Gate de Responsabilidade v2.4
O container `DssOptionGroup` não deve ter estilos interativos próprios. Todo o hover, focus e touch target pertence aos componentes filhos (`DssRadio`, etc.). O container apenas gerencia o layout (flexbox/grid) e o espaçamento (gap) entre os itens.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QOptionGroup`, mas adaptada para alimentar os componentes DSS internos.

### Props Expostas (Permitidas)
- `modelValue` / `v-model` (Array ou String/Number/Boolean) → Controle do valor selecionado.
- `options` (Array de objetos) → Define os itens (label, value, disable, etc.).
- `type` (String: 'radio', 'checkbox', 'toggle') → Define qual componente DSS renderizar. Padrão: 'radio'.
- `color` / `keepColor` → Repassado aos filhos.
- `inline` (Boolean) → Altera o layout de vertical (padrão) para horizontal.
- `disable`, `readonly` → Estado global repassado a todos os filhos.
- `dense` → Repassado aos filhos (se suportado) ou usado para reduzir o gap do container.

### Props Bloqueadas (Proibidas)
- `dark` → O DSS gerencia dark mode via CSS global.
- `size` → Os controles da Fase 1 já possuem tamanhos padronizados via tokens.
- `leftLabel` → O alinhamento do label deve seguir o padrão do DSS.

---

## 4. GOVERNANÇA DE TOKENS

Como o componente é construído com base nos componentes da Fase 1, a maioria dos tokens já está resolvida nos filhos. A responsabilidade do `DssOptionGroup` é apenas o **espaçamento (gap)**.

### 4.1 Tokens de Espaçamento (Gap)
- **Layout Vertical (Padrão):** `gap: var(--dss-spacing-2)` (ou equivalente para espaçamento vertical entre itens).
- **Layout Horizontal (`inline`):** `gap: var(--dss-spacing-4)` (ou equivalente para espaçamento horizontal).
- **Modo `dense`:** Reduzir o gap pela metade (ex: `var(--dss-spacing-1)` e `var(--dss-spacing-2)`).

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

### 5.1 Role ARIA
O container deve prover a semântica de grupo:
- `role="group"` ou `role="radiogroup"` (se `type="radio"`).
- `aria-labelledby` apontando para um ID de label externo (se fornecido) ou `aria-label`.

### 5.2 Navegação por Teclado
Como usaremos os componentes DSS da Fase 1, a navegação por `Tab` e `Space` já estará garantida individualmente. Para `type="radio"`, é necessário garantir que as setas do teclado funcionem para alternar a seleção (comportamento nativo de radio groups).

---

## 6. ESTADOS DO COMPONENTE

O `DssOptionGroup` gerencia o estado de **seleção** (`v-model` array para checkbox/toggle, valor único para radio).
Os estados visuais (`hover`, `focus`, `disabled`) são delegados 100% aos componentes filhos.

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssBtnToggle",
  "subcomponents": [],
  "compositionRequirements": ["DssRadio", "DssCheckbox", "DssToggle"],
  "compositionFuture": []
}
```

---

## 8. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 5)

1. **Básico (Radio)** — Grupo vertical de DssRadio.
2. **Checkbox Múltiplo** — Grupo de DssCheckbox com `v-model` em array.
3. **Toggle Inline** — Grupo de DssToggle com prop `inline` (horizontal).
4. **Estados (Disable/Readonly)** — Grupo inteiro desabilitado vs. apenas uma opção desabilitada (via array `options`).
5. **Brand Context** — Comportamento sob `data-brand="hub"`, `water` e `waste`.

---

## 9. EXCEÇÕES PREVISTAS

Nenhuma exceção aos Gates v2.4 é prevista inicialmente, pois a abordagem de reconstrução (em vez de wrap) evita conflitos de CSS e garante o isolamento perfeito.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento da Decisão Arquitetural Crítica: **NÃO usar `<q-option-group>`**, mas sim iterar e renderizar `<dss-radio>`, `<dss-checkbox>` e `<dss-toggle>`.
2. **Confirmar** o Golden Context: `DssBtnToggle`.
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
