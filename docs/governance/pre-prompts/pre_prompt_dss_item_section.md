# 🎯 PRÉ-PROMPT ESPECÍFICO: DssItemSection (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssItemSection`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssItemSection` |
| **Equivalente Quasar** | `QItemSection` |
| **Fase** | Fase 2 (Componente Estrutural) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Container de layout interno para itens de lista |
| **Golden Reference** | `DssAvatar` (para seções de mídia) |
| **Golden Context** | `DssList` (container pai da família) |

**Justificativa da Fase 2:** O `DssItemSection` é um componente estrutural que orquestra o layout interno de um `DssItem`. Ele gerencia o alinhamento e o espaçamento de avatares, ícones, textos e ações secundárias dentro de uma lista, caracterizando composição de layout.

---

## 2. O GRANDE RISCO ARQUITETURAL: ESPAÇAMENTO E ALINHAMENTO

### 2.1 O Problema do QItemSection
O `QItemSection` nativo do Quasar possui regras de espaçamento interno (padding/margin) que podem conflitar com os tokens de espaçamento do DSS. Além disso, ele altera seu comportamento dependendo das props `avatar`, `side` e `thumbnail`.

**Decisão Arquitetural:**
O `DssItemSection` fará o wrap direto do `<q-item-section>`, mas deve sobrescrever rigorosamente os espaçamentos nativos do Quasar utilizando os tokens do DSS (`var(--dss-spacing-*)`).

### 2.2 Gate de Responsabilidade v2.4
O `DssItemSection` é **estritamente não-interativo**. Ele não deve possuir estados de `:hover`, `:focus` ou `:active`. Toda a interatividade pertence ao `DssItem` (Fase 1) ou aos botões/ações colocados dentro da seção.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QItemSection`, mantendo a simplicidade estrutural.

### Props Expostas (Permitidas)
- `avatar` (Boolean) → Reduz o espaçamento e alinha para conter um `DssAvatar` ou `DssIcon`.
- `thumbnail` (Boolean) → Ajusta o layout para conter uma imagem em miniatura.
- `side` (Boolean) → Indica que a seção é secundária (geralmente alinhada à direita, contendo ações ou meta-informações).
- `top` (Boolean) → Alinha o conteúdo da seção ao topo (útil para itens com múltiplas linhas de texto).
- `noWrap` (Boolean) → Impede a quebra de linha do conteúdo interno.

### Props Bloqueadas (Proibidas)
- Nenhuma prop nativa do `QItemSection` precisa ser bloqueada, pois sua API já é minimalista e focada apenas em layout.

---

## 4. GOVERNANÇA DE TOKENS

A responsabilidade do `DssItemSection` é garantir que o ritmo vertical e horizontal dentro do `DssItem` siga o sistema de design.

### 4.1 Tokens de Espaçamento
- O gap entre múltiplas seções (`DssItemSection` adjacentes) deve ser controlado via tokens de espaçamento do DSS (ex: `var(--dss-spacing-3)` ou `var(--dss-spacing-4)`).
- Seções marcadas com `side` ou `avatar` devem ter suas margens ajustadas para os tokens DSS correspondentes, sobrescrevendo os valores padrão do Quasar.

### 4.2 Tipografia (Herdada)
- O `DssItemSection` não deve forçar tokens de tipografia globais, pois isso é responsabilidade do `DssItemLabel` (próximo componente). Ele apenas atua como um flex-container.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssItemSection` é um elemento de apresentação (`role="presentation"` ou `<div>` genérico). Ele não requer atributos ARIA específicos, a menos que contenha ações interativas (que devem gerenciar sua própria acessibilidade).

---

## 6. ESTADOS DO COMPONENTE

O componente não possui estados visuais próprios. Ele apenas reage ao layout (ex: `side`, `avatar`).

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssList",
  "subcomponents": [],
  "compositionRequirements": ["DssItem"],
  "compositionFuture": ["DssItemLabel"]
}
```

---

## 8. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Seção principal contendo texto simples.
2. **Com Avatar (`avatar`)** — Seção à esquerda contendo um `DssAvatar`, seguida por uma seção principal.
3. **Ação Secundária (`side`)** — Seção à direita contendo um `DssButton` (flat/round) ou `DssIcon`.
4. **Alinhamento ao Topo (`top`)** — Seção lateral alinhada ao topo em um item de múltiplas linhas.

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita de Margens do Quasar
- **Justificativa:** O Quasar aplica margens hardcoded (ex: `margin-left: 16px`) em `.q-item__section--side`. O DSS precisa sobrescrever essas classes internas do Quasar para aplicar `var(--dss-spacing-*)`. Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2), pois é a única forma de garantir o ritmo visual do Design System.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é estritamente estrutural e não-interativo.
2. **Confirmar** a necessidade de sobrescrever os espaçamentos nativos do Quasar (EXC-01).
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
