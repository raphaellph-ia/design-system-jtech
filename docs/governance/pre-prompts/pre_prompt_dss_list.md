# 🎯 PRÉ-PROMPT ESPECÍFICO: DssList (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssList`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssList` |
| **Equivalente Quasar** | `QList` |
| **Fase** | Fase 2 (Componente Composto) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Container de layout — Agrupa itens de lista (`DssItem`) e separadores |
| **Golden Reference** | `DssBadge` (não interativo) |
| **Golden Context** | `DssCard` (container estrutural) |

**Justificativa da Fase 2:** O `DssList` é um container estrutural que orquestra componentes da Fase 1 (`DssItem`, `DssSeparator`). Ele define o contexto visual (bordas, padding, separadores automáticos) para seus filhos.

---

## 2. O GRANDE RISCO ARQUITETURAL: DELEGAÇÃO DE ESTADOS E BORDAS

### 2.1 O Problema do QList
O `QList` nativo do Quasar é muito permissivo. Ele permite aplicar estilos globais (como `dark` ou `dense`) que cascateiam para os itens. No DSS, a responsabilidade visual é estritamente controlada.

**Decisão Arquitetural:**
O `DssList` atua **apenas** como um container de layout (flexbox/grid) e provedor de bordas externas/separadores. Ele **NÃO DEVE** capturar eventos de clique, hover ou focus. Toda a interatividade pertence aos filhos (`DssItem`).

### 2.2 Gate de Responsabilidade v2.4
- **Interatividade:** O `DssList` é 100% não-interativo. Não possui `:hover`, `:focus-visible` ou `cursor: pointer`.
- **Bordas e Separadores:** O `DssList` pode aplicar bordas externas (prop `bordered`) e gerenciar separadores entre itens (prop `separator`), mas não deve alterar o padding interno dos `DssItem`s.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

### Props Expostas (Permitidas)
- `bordered` (Boolean) → Aplica borda externa ao container.
- `padding` (Boolean) → Aplica padding vertical no topo e na base da lista.
- `separator` (Boolean) → Aplica divisores automáticos entre os itens filhos.

### Props Bloqueadas (Proibidas)
- `dark` → O DSS gerencia dark mode via CSS global.
- `dense` → A densidade deve ser controlada individualmente nos `DssItem`s ou via tokens de contexto, não forçada globalmente pelo container.

---

## 4. GOVERNANÇA DE TOKENS

### 4.1 Tokens de Borda e Separador
- **Borda Externa (`bordered`):** `border: var(--dss-border-width-md) solid var(--dss-border-gray-300)`
- **Separadores Internos (`separator`):** Se implementado via CSS no container, usar `border-bottom: var(--dss-border-width-md) solid var(--dss-border-gray-200)` nos filhos (exceto o último).
- **Border-Radius:** `border-radius: var(--dss-radius-md)` (aplicado apenas se `bordered` for true).

### 4.2 Tokens de Espaçamento
- **Padding (`padding`):** `padding: var(--dss-spacing-2) 0` (espaçamento vertical nas extremidades).

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

### 5.1 Role ARIA
- O container deve ter `role="list"`.
- O Quasar geralmente aplica isso nativamente, mas deve ser garantido. Os filhos (`DssItem`) assumirão `role="listitem"`.

---

## 6. ESTADOS DO COMPONENTE

O `DssList` não possui estados interativos próprios. Ele é um container estático.

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssCard",
  "subcomponents": [],
  "compositionRequirements": ["DssItem", "DssSeparator"],
  "compositionFuture": ["DssItemSection", "DssItemLabel"]
}
```

---

## 8. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 3)

1. **Básico** — Lista simples com `DssItem`s.
2. **Com Bordas e Separadores** — Uso das props `bordered` e `separator`.
3. **Com Padding** — Demonstração da prop `padding`.

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Seletores Descendentes para Separadores (Gate de Composição v2.4)
- **Justificativa:** Se a prop `separator` for implementada via CSS no `DssList` (ex: `.dss-list--separator > .dss-item + .dss-item { border-top: ... }`), isso viola a regra de não invadir o CSS do filho. Deve ser formalizado como exceção no `dss.meta.json`, pois é a forma mais performática de aplicar separadores automáticos sem exigir que o usuário insira `<dss-separator>` manualmente entre cada item.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o `DssList` é um container não-interativo.
2. **Confirmar** o Golden Context: `DssCard`.
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
