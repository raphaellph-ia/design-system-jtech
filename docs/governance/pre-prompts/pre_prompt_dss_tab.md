# 🎯 PRÉ-PROMPT ESPECÍFICO: DssTab (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssTab`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssTab` |
| **Equivalente Quasar** | `QTab` |
| **Fase** | Fase 2 (Componente Estrutural/Interativo) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Aba individual de navegação/seleção |
| **Golden Reference** | `DssButton` (para interatividade e estados) |
| **Golden Context** | `DssTabs` (container pai futuro) |

**Justificativa da Fase 2:** O `DssTab` é um componente interativo que compõe ícones, labels e badges internamente. Ele gerencia estados de seleção (`active`) e foco, e serve como bloco de construção fundamental para o `DssTabs` (Nível 2).

---

## 2. O GRANDE RISCO ARQUITETURAL: ESTADOS E INDICADORES

### 2.1 O Problema do QTab
O `QTab` nativo do Quasar possui um indicador de seleção (a linha inferior) que é renderizado via pseudo-elementos ou divs internas (`.q-tab__indicator`). A cor, espessura e animação desse indicador podem conflitar com os tokens de borda e animação do DSS.

**Decisão Arquitetural:**
O `DssTab` fará o wrap direto do `<q-tab>`, mas deve sobrescrever rigorosamente o indicador nativo do Quasar utilizando os tokens do DSS (`var(--dss-border-width-*)` e `var(--dss-brand-*)`).

### 2.2 Gate de Responsabilidade v2.4
O `DssTab` é **altamente interativo**. Ele deve possuir estados claros de `:hover`, `:focus-visible` e `:active` (selecionado). A responsabilidade de gerenciar qual aba está ativa pertence ao `DssTabs` (pai), mas o `DssTab` deve reagir visualmente quando a prop `active` (ou classe equivalente do Quasar) for aplicada.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QTab`, focando em conteúdo e estado.

### Props Expostas (Permitidas)
- `name` (String | Number) → Identificador único da aba (obrigatório para o v-model do pai).
- `label` (String) → Texto principal da aba.
- `icon` (String) → Ícone a ser exibido acima ou ao lado do label.
- `alert` (Boolean | String) → Exibe um ponto de alerta (vermelho ou cor customizada).
- `disable` (Boolean) → Desabilita a interação com a aba.

### Props Bloqueadas (Proibidas)
- `ripple` → O DSS possui sua própria política de feedback visual (geralmente background mutado no hover/active), o ripple nativo do Material Design deve ser desativado por padrão (`:ripple="false"`).
- `no-caps` → O DSS governa a tipografia. Se as abas devem ser uppercase ou sentence case, isso será definido via CSS/tokens, não via prop.

---

## 4. GOVERNANÇA DE TOKENS

A responsabilidade do `DssTab` é garantir que a navegação por abas seja consistente com o sistema de design.

### 4.1 Tokens de Cor e Estado
- **Padrão:** Cor de texto secundária (`var(--dss-text-subtle)`).
- **Hover/Focus:** Background sutil (`var(--dss-surface-hover)`) e cor de texto principal (`var(--dss-text-body)`).
- **Active (Selecionado):** Cor de texto da brand ativa (`var(--dss-brand-primary-500)` ou equivalente) e indicador inferior visível.
- **Disabled:** Opacidade reduzida (`var(--dss-opacity-disabled)`) e cursor `not-allowed`.

### 4.2 Indicador (Border)
- O indicador de seleção deve usar a espessura definida pelo DSS (`var(--dss-border-width-md)` ou `lg`) e a cor da brand ativa.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssTab` é um elemento interativo de navegação.
- Deve receber `role="tab"`.
- O estado de seleção deve ser refletido via `aria-selected="true|false"`.
- Deve suportar navegação por teclado (foco visível via `:focus-visible` com `outline` padrão do DSS).

---

## 6. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssTabs",
  "subcomponents": [],
  "compositionRequirements": ["DssIcon", "DssBadge"],
  "compositionFuture": ["DssTabs", "DssRouteTab"]
}
```

---

## 7. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Aba apenas com texto (`label`).
2. **Com Ícone** — Aba com `icon` e `label`.
3. **Com Alerta/Badge** — Aba com a prop `alert` ativa ou contendo um `DssBadge` no slot.
4. **Estados** — Demonstração de abas ativas, inativas e desabilitadas (`disable`).

---

## 8. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita do Indicador Quasar
- **Justificativa:** O Quasar utiliza a classe `.q-tab__indicator` para renderizar a linha de seleção. O DSS precisa sobrescrever essa classe interna para aplicar a espessura e cor governadas por tokens (`var(--dss-border-width-*)`). Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2).

---

## 9. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é interativo e deve gerenciar estados visuais claros (hover, focus, active).
2. **Confirmar** a necessidade de desativar o ripple nativo e sobrescrever o indicador do Quasar (EXC-01).
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
