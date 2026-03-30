# Pré-prompt: DssBtnDropdown

**Fase:** 2
**Nível:** 1 (Independente)
**Dependências (Fase 1):** `DssButton`, `DssIcon`
**Golden Context:** `DssCard` (Baseline para componentes compostos)

---

## 1. CLASSIFICAÇÃO E CONTEXTO

O `DssBtnDropdown` é um componente composto da Fase 2 que orquestra um botão de acionamento (trigger) e um menu contextual (dropdown). Ele pertence à família de "Botões e Controles de Grupo".

**Justificativa de Fase 2:**
Não é um componente atômico. Ele combina a semântica e o visual de um botão com o comportamento de um overlay (menu), gerenciando o estado de abertura/fechamento (`v-model`) e a transição de foco.

---

## 2. O GRANDE RISCO ARQUITETURAL

### Risco 1: Inconsistência Visual com DssButton
O `QBtnDropdown` nativo do Quasar utiliza `QBtn` internamente. Como o DSS possui seu próprio `DssButton` com tokens e variantes específicas (ex: `variant="elevated"`, `variant="outline"`), o maior risco é o `DssBtnDropdown` apresentar diferenças visuais em relação aos botões padrão do sistema.

**Mitigação:**
O `DssBtnDropdown` deve mapear rigorosamente sua API visual para espelhar o `DssButton`. As classes CSS geradas pelo composable do `DssButton` (ou a mesma lógica) devem ser aplicadas ao botão trigger do dropdown para garantir 100% de fidelidade visual.

### Risco 2: Composição vs. Wrapper Direto
A regra da Fase 2 exige o uso de componentes DSS. No entanto, recriar toda a lógica de acessibilidade e posicionamento do `QBtnDropdown` do zero usando `DssButton` + `QMenu` pode ser propenso a erros, especialmente porque `DssMenu` ainda não existe (é Nível 2).
**Decisão Arquitetural:** O componente fará o wrap do `QBtnDropdown` do Quasar, mas **injetará** as classes e tokens do DSS para garantir que o botão renderizado se comporte visualmente como um `DssButton`. O menu interno utilizará os tokens de superfície do DSS.

### Anti-patterns (❌) e Padrões Corretos (✅)
- ❌ **Anti-pattern:** Deixar o menu do dropdown com a sombra e borda padrão do Quasar.
- ✅ **Padrão Correto:** Aplicar `var(--dss-surface-white)`, `var(--dss-shadow-md)` e `var(--dss-radius-md)` ao painel do dropdown.
- ❌ **Anti-pattern:** Criar props de cor exclusivas para o dropdown.
- ✅ **Padrão Correto:** Reutilizar os tipos `ButtonColor` e `ButtonVariant` do `DssButton`.

---

## 3. MAPEAMENTO DE API (DSS vs Quasar)

A API do `DssBtnDropdown` deve ser uma fusão controlada entre a API do `DssButton` (para o visual) e a API de controle de dropdown.

### Props Expostas (Permitidas)
**Visuais (Herdadas do DssButton):**
- `variant` (elevated, flat, outline, etc.)
- `color` (primary, secondary, etc.)
- `size` (sm, md, lg)
- `dense`, `round`, `square`, `disable`

**Comportamentais (Dropdown):**
- `modelValue` / `v-model` (boolean) → Controle de estado aberto/fechado
- `split` (boolean) → Divide o botão em ação principal e seta de dropdown
- `disableMainBtn` (boolean) → Desabilita apenas a ação principal no modo split
- `menuAnchor` / `menuSelf` → Controle de posicionamento do menu
- `autoClose` (boolean) → Fecha o menu ao clicar em um item interno

### Props Bloqueadas (Proibidas)
- `dark` → O DSS gerencia o dark mode via CSS global (`body.body--dark`).
- `glossy`, `push` → Não fazem parte da linguagem visual do DSS.
- `menuOffset` → O espaçamento entre o botão e o menu deve ser padronizado via tokens, não exposto na API.

---

## 4. GOVERNANÇA DE TOKENS

### 4.1 Tokens do Botão (Trigger)
O botão deve consumir exatamente os mesmos tokens do `DssButton`:
- Alturas: `var(--dss-compact-control-height-*)`
- Tipografia: `var(--dss-typography-button)`
- Border-radius: `var(--dss-radius-button)`

### 4.2 Tokens do Menu (Dropdown Panel)
O painel que se abre deve seguir os tokens de superfície e elevação:
- Background: `var(--dss-surface-white)` (com suporte a dark mode via `var(--dss-surface-dark)`)
- Sombra: `var(--dss-shadow-md)`
- Border-radius: `var(--dss-radius-md)`
- Borda (opcional dependendo do tema): `1px solid var(--dss-border-gray-200)`

### 4.3 Ícone de Dropdown
O ícone padrão de seta deve utilizar a cor de texto apropriada para a variante do botão (ex: branco para `elevated primary`, cor primária para `outline primary`).

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

### 5.1 Atributos ARIA
O componente deve garantir que o botão trigger possua:
- `aria-haspopup="true"` (ou `"menu"`)
- `aria-expanded="true/false"` refletindo o estado atual do dropdown
- `aria-controls` apontando para o ID do menu gerado

### 5.2 Navegação por Teclado
- `Enter` ou `Space` no botão deve abrir o menu.
- Quando aberto, o foco deve mover-se para o menu (ou o primeiro item).
- `Escape` deve fechar o menu e retornar o foco para o botão trigger.
- `ArrowDown` / `ArrowUp` devem navegar entre os itens do menu.

### 5.3 Touch Target
O botão trigger deve respeitar o touch target mínimo de 48px, implementado via `::before` (herdando o comportamento do `DssButton`).

---

## 6. ESTADOS DO COMPONENTE

O `DssBtnDropdown` possui dois conjuntos de estados:

**Estados do Botão Trigger:**
- `default`, `hover`, `focus`, `active`, `disabled` (Idênticos ao `DssButton`).

**Estados do Dropdown:**
- `closed` (padrão)
- `open` (menu visível, botão trigger pode receber um estado visual de "ativo" ou "selecionado" dependendo da variante).

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

O `DssBtnDropdown` atua como um container para itens de menu.

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssCard",
  "subcomponents": [],
  "compositionRequirements": ["DssButton", "DssIcon"],
  "compositionFuture": ["DssList", "DssItem"]
}
```
*Nota: Até que `DssList` e `DssItem` sejam criados, os exemplos de documentação podem usar HTML nativo ou texto simples dentro do slot padrão para demonstrar o menu.*

---

## 8. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 5)

1. **Básico** — Dropdown simples com label e ícone de seta.
2. **Variantes Visuais** — Demonstração com `outline`, `flat` e `elevated`.
3. **Split Button** — Botão dividido (ação principal à esquerda, dropdown à direita).
4. **Com Ícone Customizado** — Substituindo o ícone de seta padrão.
5. **Brand Context** — Comportamento sob `data-brand="hub"`, `water` e `waste`.

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Alinhamento de Altura do Split
- **Justificativa:** No modo `split`, o Quasar renderiza dois botões adjacentes. É necessário garantir que não haja gap indesejado e que a altura de ambos seja estritamente igual, aplicando `border-radius: 0` nas bordas de contato. Isso deve ser tratado no CSS da camada 2 (`_base.scss`).

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o visual do trigger deve ser idêntico ao `DssButton`.
2. **Confirmar** o Golden Context: `DssCard`.
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
4. Garantir que o wrapper `DssBtnDropdown.vue` seja um re-export puro.
