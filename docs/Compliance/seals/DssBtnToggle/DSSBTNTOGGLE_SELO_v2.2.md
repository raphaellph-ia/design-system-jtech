# Selo de Conformidade DSS v2.2 — DssBtnToggle

> **Status:** ✅ CONFORME
> **Data de Emissão:** 27 Mar 2026
> **DSS Version:** v2.2
> **Fase:** 2 — Componente Composto

---

## Identificação do Componente

| Campo | Valor |
|-------|-------|
| **Nome** | DssBtnToggle |
| **Equivalente Quasar** | QBtnToggle |
| **Categoria** | Container de Seleção Exclusiva (Grupo de Alternância) |
| **Fase** | 2 — Componente Composto |
| **Abordagem** | WRAP QBtnToggle |
| **Golden Reference** | DssChip |
| **Golden Context** | DssBtnGroup (selado Mar 2026) |
| **Path** | `DSS/components/base/DssBtnToggle/` |

---

## Resultado da Auditoria

| Gate | Status | Observação |
|------|--------|------------|
| Gate Estrutural | ✅ CONFORME | 4 camadas + wrapper + orchestrator + barrel |
| Gate Técnico | ✅ CONFORME | Token First, reatividade, acessibilidade |
| Gate Documental | ✅ CONFORME | 5 eixos do pré-prompt + docs completos |
| Gate de Composição v2.4 | ✅ CONFORME (com exceções formais) | 2 exceções registradas |
| Gate de Responsabilidade v2.4 | ✅ CONFORME (com exceção formal) | 1 exceção registrada |

---

## Ciclo de Auditoria

### Auditoria Inicial (27 Mar 2026)

**Resultado:** 2 NCs não-bloqueantes + 3 GAPs de baixa severidade

| ID | Tipo | Descrição | Resolvido |
|----|------|-----------|-----------|
| NC-01 | Não-bloqueante | Gate Composição Regra 1 sem exceção formal em `gateExceptions` | ✅ |
| NC-02 | Não-bloqueante | `DssBtnToggle.md §13` sem campo "Decisão arquitetural" | ✅ |
| GAP-01 | Baixa | `example.vue` com `<style>` não-scopado (CSS global desnecessário) | ✅ |
| GAP-02 | Baixa | Variante `push` ausente do Cenário 3 (showcase de variantes) | ✅ |
| GAP-03 | Baixa | `prefers-reduced-motion` duplicado no `module.scss` | ✅ |

**Total NCs bloqueantes:** 0
**Total NCs não-bloqueantes:** 2 (ambas resolvidas)
**Total GAPs:** 3 (todos resolvidos)

### Correções Aplicadas (27 Mar 2026)

1. `dss.meta.json` — Adicionado `gateExceptions.compositionGateV24_rule1` (NC-01)
2. `DssBtnToggle.md §13` — Adicionado campo "Decisão arquitetural" em todas as tabelas de gate exceptions (NC-02)
3. `DssBtnToggle.example.vue` — `<style>` alterado para `<style scoped>` (GAP-01)
4. `DssBtnToggle.example.vue` — Cenário 3 expandido com demonstração da variante `push` (GAP-02)
5. `DssBtnToggle.module.scss` — Bloco `prefers-reduced-motion` manual removido (GAP-03)

### Resultado Final: ✅ ELEGÍVEL PARA SELO

---

## Reservas Registradas (Não-Bloqueantes)

| ID | Descrição | Severidade |
|----|-----------|------------|
| RES-01 | Tokens de brand numéricos (`--dss-hub-600`, etc.) — sem tokens semânticos no catálogo DSS v2.2 | Baixa |
| RES-02 | `<style>` sem scoped em `1-structure/` — necessário para seletores `.q-btn-item` | Baixa |
| RES-03 | Sem testes unitários | Baixa |

---

## Gate Exceptions Formalizadas

### Gate de Composição v2.4 — Regra 1

| Campo | Valor |
|-------|-------|
| Violação | Uso direto de `<q-btn-toggle>` no template |
| Justificativa | Abordagem WRAP obrigatória — QBtnToggle provê v-model, aria-pressed, keyboard navigation nativos |
| Precedente | DssBtnDropdown (selado Mar 2026) |
| Aprovação | Chat Estratégico DSS — Decisão Arquitetural Fase 2 (Mar 2026) |

### Gate de Composição v2.4 — Regra 2

| Campo | Valor |
|-------|-------|
| Violação | Seletores CSS `.q-btn-item` (elemento DOM Quasar interno) |
| Justificativa | Necessário para gerenciar border-radius e separadores. `.q-btn-item` é DOM do Quasar, não componente DSS filho |
| Precedente | DssBtnGroup (selado Mar 2026) |
| Aprovação | Chat Estratégico DSS — Pré-formalizado no pre-prompt (Mar 2026) |

### Gate de Responsabilidade v2.4

| Campo | Valor |
|-------|-------|
| Violação | `:hover`/`:focus-visible` em `.q-btn-item` em `_outline.scss` |
| Justificativa | Ajuste estrutural de z-index apenas (não captura aparência). Necessário para visibilidade de borda ativa com `margin-left` negativo |
| Precedente | DssBtnGroup Ciclo 2 (selado Mar 2026) |
| Aprovação | Chat Estratégico DSS — Pré-formalizado no pre-prompt (Mar 2026) |

---

## Exceções de Token (CSS Hard Values)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `_base.scss` | Square variant — semântico (sem radius). Padrão DssBtnGroup EXC-01 |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `_states.scss` | Dark mode dividers — sem token DSS para white alpha. Padrão Material Design |
| EXC-03 | `1px solid ButtonText` | `_states.scss` | Forced-colors — system keywords obrigatórios pelo navegador |

---

## Tokens Utilizados (9)

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L3 | Separadores flat/unelevated; colapso outline |
| `--dss-border-width-thick` | L4 | Acento brand (inset box-shadow) |
| `--dss-border-width-md` | Module | High contrast outline |
| `--dss-radius-full` | L2 | Border-radius pill (rounded) |
| `--dss-gray-200` | L3 | Separador unelevated |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

---

## Pontos de Destaque Arquitetural

- **Pré-aplicação de lições anteriores:** NC-02 de DssBtnDropdown (reatividade de `variant`) evitada via `computed()` desde o início
- **Gate exceptions pré-formalizadas:** Ambas as exceções registradas no pré-prompt antes da codificação, resultando em 0 NCs técnicas
- **Paridade com Golden Context:** Tabela completa (§10 de DssBtnToggle.md) documentando divergências intencionais vs. DssBtnGroup
- **SCSS:** 2930 linhas de CSS gerado, zero erros de compilação

---

## Arquivos do Componente

```
DssBtnToggle/ (14 arquivos)
├── 1-structure/DssBtnToggle.ts.vue
├── 2-composition/_base.scss
├── 3-variants/_flat.scss, _outline.scss, _unelevated.scss, _push.scss, index.scss
├── 4-output/_states.scss, _brands.scss, index.scss
├── composables/useBtnToggleClasses.ts, index.ts
├── types/btn-toggle.types.ts
├── DssBtnToggle.module.scss
├── DssBtnToggle.vue
├── DssBtnToggle.example.vue
├── DssBtnToggle.md
├── DSSBTNTOGGLE_API.md
├── dss.meta.json
├── index.js
└── README.md
```

---

*Design System Sansys — Selo de Conformidade DSS v2.2*
*Emitido em: 27 Mar 2026*
*Componente: DssBtnToggle | Fase 2 | Status: ✅ CONFORME*
