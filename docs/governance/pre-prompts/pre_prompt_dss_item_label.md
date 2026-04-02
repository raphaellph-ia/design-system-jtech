# 🎯 PRÉ-PROMPT ESPECÍFICO: DssItemLabel (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssItemLabel`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssItemLabel` |
| **Equivalente Quasar** | `QItemLabel` |
| **Fase** | Fase 2 (Componente Estrutural) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Container tipográfico para itens de lista |
| **Golden Reference** | `DssBadge` (para tipografia secundária) |
| **Golden Context** | `DssItemSection` (container pai direto) |

**Justificativa da Fase 2:** O `DssItemLabel` é um componente estrutural que orquestra a hierarquia tipográfica dentro de um `DssItemSection`. Ele gerencia o estilo de texto (header, caption, overline) e o truncamento de linhas, caracterizando composição tipográfica.

---

## 2. O GRANDE RISCO ARQUITETURAL: HIERARQUIA TIPOGRÁFICA

### 2.1 O Problema do QItemLabel
O `QItemLabel` nativo do Quasar possui regras tipográficas próprias (font-size, line-height, color) que conflitam com os tokens de tipografia do DSS. Além disso, ele altera seu comportamento dependendo das props `header`, `caption` e `overline`.

**Decisão Arquitetural:**
O `DssItemLabel` fará o wrap direto do `<q-item-label>`, mas deve sobrescrever rigorosamente a tipografia nativa do Quasar utilizando os tokens do DSS (`var(--dss-text-*)` e `var(--dss-font-*)`).

### 2.2 Gate de Responsabilidade v2.4
O `DssItemLabel` é **estritamente não-interativo**. Ele não deve possuir estados de `:hover`, `:focus` ou `:active`. Toda a interatividade pertence ao `DssItem` (Fase 1) ou aos botões/ações colocados dentro da seção.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QItemLabel`, mantendo a simplicidade estrutural.

### Props Expostas (Permitidas)
- `header` (Boolean) → Define o label como um cabeçalho de lista (tipografia mais forte, com padding superior).
- `caption` (Boolean) → Define o label como texto secundário (tipografia menor, cor mutada).
- `overline` (Boolean) → Define o label como texto de sobreposição (tipografia muito pequena, uppercase).
- `lines` (Number | String) → Define o número máximo de linhas antes de truncar o texto (ellipsis).

### Props Bloqueadas (Proibidas)
- Nenhuma prop nativa do `QItemLabel` precisa ser bloqueada, pois sua API já é minimalista e focada apenas em tipografia.

---

## 4. GOVERNANÇA DE TOKENS

A responsabilidade do `DssItemLabel` é garantir que a tipografia dentro do `DssItem` siga o sistema de design.

### 4.1 Tokens de Tipografia
- **Padrão (sem props):** Deve usar a tipografia base do DSS (`var(--dss-text-body)`).
- **`header`:** Deve usar a cor de texto principal (`var(--dss-text-body)`) com font-size e font-weight adequados ao nível de cabeçalho.
- **`caption`:** Deve usar a cor de texto secundária (`var(--dss-text-subtle)`) com `var(--dss-font-size-sm)` e `var(--dss-line-height-sm)` (pareamento semântico obrigatório — `line-height-sm` para `font-size-sm`).
- **`overline`:** Deve usar a cor de texto secundária (`var(--dss-text-subtle)`) com tipografia reduzida.

> **⚠️ Atenção:** Os tokens `--dss-text-heading-*`, `--dss-text-caption`, `--dss-text-muted` e `--dss-text-overline` **NÃO existem** no catálogo DSS. Use exclusivamente `--dss-text-body` e `--dss-text-subtle` para cor de texto.

### 4.2 Espaçamento (Herdado)
- O `DssItemLabel` não deve forçar tokens de espaçamento globais, exceto quando usado como `header` (que pode requerer um padding superior para separar grupos de itens).

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssItemLabel` é um elemento de apresentação (`role="presentation"` ou `<div>` genérico). Ele não requer atributos ARIA específicos.

---

## 6. ESTADOS DO COMPONENTE

O componente não possui estados visuais próprios. Ele apenas reage à hierarquia tipográfica (ex: `header`, `caption`).

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssItemSection",
  "subcomponents": [],
  "compositionRequirements": ["DssItemSection"],
  "compositionFuture": []
}
```

---

## 8. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Label principal com texto simples.
2. **Caption (`caption`)** — Label secundário com texto mutado.
3. **Header (`header`)** — Label de cabeçalho de lista.
4. **Truncamento (`lines`)** — Label com texto longo truncado em 1 ou 2 linhas.

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita de Tipografia do Quasar
- **Justificativa:** O Quasar aplica tipografia hardcoded (ex: `font-size: 14px`, `color: rgba(0,0,0,0.54)`) em `.q-item__label--caption` e `.q-item__label--header`. O DSS precisa sobrescrever essas classes internas do Quasar para aplicar `var(--dss-text-*)` e `var(--dss-font-*)`. Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2), pois é a única forma de garantir a consistência tipográfica do Design System.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é estritamente tipográfico e não-interativo.
2. **Confirmar** a necessidade de sobrescrever a tipografia nativa do Quasar (EXC-01).
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
