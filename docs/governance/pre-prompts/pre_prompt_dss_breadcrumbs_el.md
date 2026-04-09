# 🎯 PRÉ-PROMPT ESPECÍFICO: DssBreadcrumbsEl (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssBreadcrumbsEl`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssBreadcrumbsEl` |
| **Equivalente Quasar** | `QBreadcrumbsEl` |
| **Fase** | Fase 2 (Componente Estrutural/Interativo) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Elemento individual de trilha de navegação (breadcrumb) |
| **Golden Reference** | `DssButton` (para estados interativos quando clicável) |
| **Golden Context** | `DssBreadcrumbs` (container pai futuro — Nível 2) |

**Justificativa da Fase 2:** O `DssBreadcrumbsEl` é um elemento de navegação que pode ser clicável (link) ou estático (item atual). Ele compõe `DssIcon` internamente e serve como bloco de construção fundamental para o `DssBreadcrumbs` (Nível 2).

---

## 2. O GRANDE RISCO ARQUITETURAL: DUALIDADE LINK/TEXTO

### 2.1 O Problema do QBreadcrumbsEl

O `QBreadcrumbsEl` nativo do Quasar renderiza um `<a>` quando possui a prop `to` (roteamento Vue Router) ou `href`, e um `<span>` quando é apenas texto estático. Essa dualidade cria dois cenários distintos de acessibilidade e estilo que o DSS deve gerenciar explicitamente.

**Decisão Arquitetural:**
O `DssBreadcrumbsEl` fará o wrap direto do `<q-breadcrumbs-el>`, mas deve:
1. Aplicar estilos distintos para o estado **clicável** (link — com hover e cursor pointer) e **estático** (item atual — sem interação).
2. Garantir que o item atual (último da trilha) seja visualmente diferenciado e marcado com `aria-current="page"`.

### 2.2 Gate de Responsabilidade v2.4

O `DssBreadcrumbsEl` é **condicionalmente interativo**. Quando clicável (prop `to` ou `href` presente), deve possuir estados de `:hover` e `:focus-visible`. Quando estático (item atual), **não deve ter estados de interação** — é um elemento puramente informativo.

Esta dualidade é uma exceção prevista ao Gate de Responsabilidade e deve ser documentada formalmente.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

### Props Expostas (Permitidas)
- `label` (String) → Texto do item de breadcrumb.
- `icon` (String) → Ícone opcional a ser exibido antes do label.
- `to` (String | Object) → Destino de roteamento Vue Router (torna o item clicável).
- `href` (String) → URL externa (alternativa ao `to`).
- `disable` (Boolean) → Desabilita a interação com o item.
- `tag` (String) → Permite sobrescrever a tag HTML renderizada (padrão: `a` quando clicável, `span` quando estático).

### Props Bloqueadas (Proibidas)
- `ripple` → O DSS não usa ripple em elementos de navegação estrutural.
- `exact` → Gerenciado pelo `DssBreadcrumbs` pai, não pelo elemento individual.
- `active-class` / `exact-active-class` → O DSS governa as classes de estado ativo via CSS/tokens.

---

## 4. GOVERNANÇA DE TOKENS

### 4.1 Estado Clicável (com `to` ou `href`)
- **Padrão:** Cor de texto secundária (`var(--dss-text-subtle)`) com `text-decoration: none`.
- **Hover/Focus:** Cor de texto principal (`var(--dss-text-body)`) e `text-decoration: underline`.
- **Focus-visible:** `outline` padrão do DSS (`var(--dss-focus-ring)`).
- **Disabled:** Opacidade reduzida (`var(--dss-opacity-disabled)`) e `pointer-events: none`.

### 4.2 Estado Estático (item atual — sem `to` ou `href`)
- **Padrão:** Cor de texto principal (`var(--dss-text-body)`) com `font-weight` semibold (`var(--dss-font-weight-semibold)`).
- **Sem hover, sem cursor pointer, sem interação.**

### 4.3 Ícone
- O ícone deve usar o tamanho `sm` do DSS (`var(--dss-icon-size-sm)`) e herdar a cor do texto do estado atual.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssBreadcrumbsEl` é um elemento de navegação estrutural.

- O item atual (último da trilha) **deve** receber `aria-current="page"` — este atributo é gerenciado pelo `DssBreadcrumbs` pai via prop, mas o `DssBreadcrumbsEl` deve aceitar e propagar o atributo via `v-bind="$attrs"`.
- Quando clicável, deve ser um `<a>` com `href` válido para garantir navegabilidade por teclado nativa.
- O separador entre itens (ex: `/` ou `>`) é responsabilidade do `DssBreadcrumbs` pai — **não** do `DssBreadcrumbsEl`.

---

## 6. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenReference": "DssButton",
  "goldenContext": "DssBreadcrumbs",
  "subcomponents": [],
  "compositionRequirements": ["DssIcon"],
  "compositionFuture": ["DssBreadcrumbs"]
}
```

---

## 7. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Item clicável apenas com `label` e prop `to`.
2. **Com Ícone** — Item clicável com `icon` e `label`.
3. **Item Atual** — Item estático (sem `to`), representando a página atual, com `aria-current="page"`.
4. **Estados** — Demonstração de item clicável, item atual e item desabilitado (`disable`).

---

## 8. EXCEÇÕES PREVISTAS

### EXC-01: Dualidade de Renderização (Link vs. Span)
- **Justificativa:** O `QBreadcrumbsEl` renderiza `<a>` ou `<span>` dependendo das props. O DSS precisa aplicar estilos distintos para cada caso via seletores CSS (`.dss-breadcrumbs-el a` e `.dss-breadcrumbs-el span`). Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 1) — o seletor descendente é necessário porque o elemento renderizado é interno ao Quasar.

### EXC-02: `text-decoration` Hardcoded
- **Justificativa:** O `text-decoration: underline` no estado hover é um padrão de UX amplamente aceito para links em contexto de navegação estrutural (WCAG 2.1 Success Criterion 1.4.1). Não existe token DSS para `text-decoration` — esta é uma exceção formal.

---

## 9. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento da dualidade link/texto e a necessidade de estilos distintos para cada estado.
2. **Confirmar** que o separador entre itens **não** é responsabilidade deste componente.
3. **Confirmar** a necessidade de propagar `aria-current` via `v-bind="$attrs"`.
4. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
