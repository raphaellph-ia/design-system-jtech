# Pré-prompt de Criação de Componente DSS: DssStepper

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssStepper`
- **Família:** Navegação (Composição de Primeiro Grau)
- **Nível de Composição:** Nível 2
- **Golden Reference:** `DssTabs` (como container de navegação com painéis associados)
- **Golden Context:** `DssCard` (como container estrutural pai)
- **Componente Quasar Base:** `QStepper`
- **Dependências Diretas:** `DssStep` (obrigatório como filho)

**Justificativa da Fase 2:** O `DssStepper` é um componente composto que orquestra múltiplos `DssStep`. Ele gerencia o estado de navegação (qual passo está ativo) e fornece a estrutura visual (linha conectora, painéis de conteúdo) para fluxos de trabalho em etapas.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Quebra de Encapsulamento do DssStep

O `QStepper` nativo injeta estilos diretamente nos seus filhos (`QStep`). O risco é que o `DssStepper` tente estilizar o `DssStep` internamente usando seletores como `:deep()`, violando o Gate de Composição.

**Mitigação:** O `DssStepper` deve gerenciar apenas a estrutura do container principal (linha conectora, header do stepper, painéis). A aparência individual de cada passo (ícone, cor, label) já foi resolvida e encapsulada no `DssStep`. O `DssStepper` não deve sobrescrever estilos do `DssStep`.

### 2.2. Gate de Responsabilidade v2.4

O `DssStepper` é responsável por:
1. Gerenciar o estado ativo (`v-model`).
2. Fornecer o layout geral (horizontal ou vertical).
3. Renderizar a linha conectora entre os passos.
4. Renderizar o painel de conteúdo do passo ativo.

Ele **delega** a renderização do cabeçalho de cada passo para o `DssStep`.

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-stepper>`. O slot `default` é destinado exclusivamente a componentes `DssStep`. O slot `message` pode ser exposto para mensagens globais do stepper.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `modelValue` (String/Number) — O passo atualmente ativo.
- `vertical` (Boolean) — Define o layout vertical (padrão é horizontal).
- `header-nav` (Boolean) — Permite navegação clicando no cabeçalho dos passos.
- `animated` (Boolean) — Ativa transições entre os painéis.
- `flat` (Boolean) — Remove a sombra e borda do container (útil quando usado dentro de um DssCard).
- `bordered` (Boolean) — Adiciona borda ao container.

### 3.2. Props Bloqueadas (Governança DSS)

```json
"propsBlocked": ["dark", "color", "active-color", "done-color", "error-color", "inactive-color"],
"propsBlockedJustification": {
  "dark": "Modo escuro governado globalmente pelo DSS via [data-theme='dark'].",
  "color": "Cores de estado são governadas pelos tokens DSS internamente no DssStep.",
  "active-color": "Cor ativa governada pelo DssStep via --dss-action-primary.",
  "done-color": "Cor de sucesso governada pelo DssStep via --dss-feedback-success.",
  "error-color": "Cor de erro governada pelo DssStep via --dss-feedback-error.",
  "inactive-color": "Cor inativa governada pelo DssStep via --dss-gray-300."
}
```

## 4. Governança de Tokens e CSS

O `DssStepper` deve utilizar os seguintes tokens para a estrutura do container e linha conectora:

- **Borda do container (se bordered):** `--dss-border-width-thin` solid `--dss-gray-200`.
- **Linha conectora (horizontal/vertical):** `--dss-gray-300` (cor) e `--dss-border-width-thin` (espessura).
- **Background do container:** `--dss-surface-base`.
- **Raio da borda:** `--dss-radius-md`.

*Nota: As cores dos ícones e textos dos passos já estão resolvidas no `DssStep`.*

## 5. Acessibilidade e Estados

- **Role:** O `QStepper` nativamente gerencia roles apropriados (`tablist` para o header, `tabpanel` para o conteúdo). O `DssStepper` deve preservar essa semântica.
- **Touch Target: Opção B** — O `DssStepper` é um container. Os touch targets interativos (cabeçalhos dos passos) são responsabilidade do `DssStep`.
- **Estados aplicáveis:** O container em si não possui estados interativos. O estado de navegação é repassado aos filhos.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssStepper.example.vue` deve cobrir:

1. **Básico Horizontal:** Stepper horizontal com 3 passos (DssStep), navegação linear (botões "Próximo"/"Anterior" no painel).
2. **Navegação Livre:** Stepper com `header-nav` ativo, permitindo clique direto nos passos.
3. **Vertical:** Stepper com layout vertical (`vertical` prop).
4. **Estados dos Passos:** Stepper demonstrando passos com estados `done` e `error` (configurados nos DssStep filhos).
5. **Flat/Bordered:** Stepper integrado dentro de um `DssCard` usando a prop `flat`.

## 7. Exceções aos Gates v2.4

### EXC-01: Estilização da Linha Conectora

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de seletores CSS que referenciam classes internas do Quasar).
- **Justificativa:** O Quasar renderiza a linha conectora entre os passos usando classes internas (`.q-stepper__dot:before`, `.q-stepper__dot:after`, `.q-stepper__line:before`). Como esses elementos não são componentes Vue expostos, a única forma de aplicar as cores do DSS (`--dss-gray-300`) à linha conectora é sobrescrevendo essas classes internas a partir do `DssStepper`. Esta é uma exceção formal e documentada.
