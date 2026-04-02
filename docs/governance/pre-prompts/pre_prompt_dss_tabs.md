# 🎯 PRÉ-PROMPT ESPECÍFICO: DssTabs (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssTabs`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssTabs` |
| **Equivalente Quasar** | `QTabs` |
| **Fase** | Fase 2 (Componente Estrutural/Container) |
| **Nível de Execução** | Nível 2 — Composto |
| **Classificação** | Container de navegação/seleção de abas |
| **Golden Reference** | `DssBtnGroup` (para agrupamento e alinhamento) |
| **Golden Context** | `DssCard` ou `DssHeader` (containers pai comuns) |

**Justificativa da Fase 2:** O `DssTabs` é um componente composto (Nível 2) que orquestra múltiplos `DssTab` (Nível 1). Ele gerencia o estado global de seleção (`v-model`), o alinhamento das abas e a navegação por setas quando o conteúdo excede a largura do container.

---

## 2. O GRANDE RISCO ARQUITETURAL: COMPOSIÇÃO E ALINHAMENTO

### 2.1 O Problema do QTabs
O `QTabs` nativo do Quasar possui controles complexos de alinhamento (`align`), setas de navegação (`left-icon`, `right-icon`) e indicadores de rolagem. Se não for rigorosamente governado, ele pode quebrar o layout do container pai ou exibir setas nativas do Material Design que conflitam com a iconografia do DSS.

**Decisão Arquitetural:**
O `DssTabs` fará o wrap direto do `<q-tabs>`, mas deve:
1. Forçar o uso dos ícones oficiais do DSS para as setas de navegação (ex: `dss-icon-chevron-left`, `dss-icon-chevron-right`).
2. Garantir que o alinhamento padrão (`align="left"`) seja respeitado, a menos que explicitamente sobrescrito.

### 2.2 Gate de Composição v2.4
O `DssTabs` **deve** aceitar apenas `DssTab` ou `DssRouteTab` em seu slot default. O uso de `<q-tab>` direto dentro do `DssTabs` é uma violação arquitetural.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QTabs`, focando em estado e layout.

### Props Expostas (Permitidas)
- `modelValue` (String | Number) → Estado de seleção global (v-model).
- `align` (String) → Alinhamento das abas (`left`, `center`, `right`, `justify`). Padrão: `left`.
- `breakpoint` (Number | String) → Ponto de quebra para exibir setas de navegação.
- `vertical` (Boolean) → Exibe as abas em layout vertical.
- `dense` (Boolean) → Reduz o padding interno do container (não afeta as abas individuais).

### Props Bloqueadas (Proibidas)
- `active-color`, `active-bg-color`, `indicator-color` → O DSS governa as cores de estado via tokens no `DssTab`. O container não deve forçar cores.
- `ripple` → Desativado por padrão, assim como no `DssTab`.
- `no-caps` → Governado por CSS/tokens.

---

## 4. GOVERNANÇA DE TOKENS

A responsabilidade do `DssTabs` é gerenciar o layout do grupo, não o estilo individual das abas.

### 4.1 Tokens de Layout e Espaçamento
- **Background:** Transparente por padrão, herdando do container pai.
- **Borda Inferior (Opcional):** Se o design exigir uma linha separadora abaixo de todas as abas, deve usar `var(--dss-border-width-sm)` e `var(--dss-border-subtle)`.
- **Setas de Navegação:** Devem usar a cor de texto secundária (`var(--dss-text-subtle)`) e reagir ao hover.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssTabs` é o container do grupo de abas.
- Deve receber `role="tablist"`.
- Deve gerenciar a navegação por teclado (setas esquerda/direita) entre as abas filhas (comportamento nativo do Quasar mantido).
- As setas de rolagem (quando visíveis) devem ser acessíveis via teclado ou ocultas do leitor de tela se forem apenas visuais (`aria-hidden="true"`).

---

## 6. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssCard",
  "subcomponents": ["DssTab"],
  "compositionRequirements": ["DssTab", "DssIcon"],
  "compositionFuture": ["DssTabPanels"]
}
```

---

## 7. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Grupo de abas simples com `v-model`.
2. **Alinhamento** — Demonstração de `align="justify"` ou `align="center"`.
3. **Rolagem (Scrollable)** — Muitas abas forçando a exibição das setas de navegação.
4. **Vertical** — Layout vertical (`vertical="true"`).

---

## 8. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita de Setas de Navegação
- **Justificativa:** O Quasar utiliza classes internas (`.q-tabs__arrow`) para renderizar as setas de rolagem. O DSS precisa sobrescrever essas classes para aplicar tokens de cor e hover (`var(--dss-text-subtle)`, `var(--dss-surface-hover)`). Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2).

---

## 9. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é um container (Nível 2) e deve orquestrar o estado global das abas.
2. **Confirmar** a necessidade de bloquear props de cor nativas do Quasar, delegando o estilo visual ao `DssTab`.
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
