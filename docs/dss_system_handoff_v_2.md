# DSS SYSTEM HANDOFF — v2.2 → Fase 2

Este documento representa o **estado canônico, normativo e operacional** do Design System Sansys (DSS) ao final da Fase 1 e **DEVE ser tratado como a fonte única da verdade** para qualquer novo chat, agente ou ciclo de desenvolvimento a partir da Fase 2.

Ele substitui histórico de conversa, contexto implícito e decisões dispersas.

---

## 1. IDENTIDADE DO SISTEMA

- **Nome:** Design System Sansys (DSS)
- **Versão normativa:** v2.2
- **Fase concluída:** Fase 1 (componentes base e compact controls)
- **Fase em andamento:** Fase 2 (componentes compostos)
- **Modelo de governança:** Manual, explícito, baseado em auditoria formal
- **Status geral:** Estável, auditável, escalável

---

## 2. COMPONENTES SELADOS (ESTADO ATUAL)

Todos os componentes abaixo possuem **Selo DSS v2.2 emitido** e são considerados referência válida. A lista de faseamento canônica e completa está em [`docs/reference/DSS_FASEAMENTO_COMPONENTES.md`](./reference/DSS_FASEAMENTO_COMPONENTES.md).

### Fase 1 — Concluída

| Componente | Categoria | Golden Reference |
|---|---|---|
| **DssButton** | Action Control (Golden Sample do DSS) | — |
| **DssCheckbox** | Compact Control interativo (Golden Primário) | DssChip |
| **DssRadio** | Compact Control interativo (Golden Secundário) | DssChip |
| **DssToggle** | Compact Control interativo | DssToggle |
| **DssInput** | Form Control | DssChip |
| **DssTextarea** | Form Control | DssChip |
| **DssSelect** | Form Control | DssChip |
| **DssSlider** | Form Control / Range | DssToggle |
| **DssRange** | Form Control / Range (2 thumbs) | DssSlider |
| **DssIcon** | Feedback simples | — |
| **DssBadge** | Feedback simples | DssBadge |
| **DssChip** | Feedback simples | DssChip |
| **DssAvatar** | Feedback simples | DssChip |
| **DssTooltip** | Feedback simples | DssChip |
| **DssSeparator** | Estrutural simples | DssBadge |
| **DssSpace** | Estrutural simples | DssBadge |
| **DssItem** | Estrutural dual-mode | DssChip |
| **DssSpinner** | Feedback de Status — indicador de carregamento | DssIcon |
| **DssFile** | Action Control — campo de seleção de arquivos | DssChip |

### Fase 2 — Em andamento

| Componente | Categoria | Golden Reference | Status |
|---|---|---|---|
| **DssCard** | Container / Superfície | DssChip | `conformant` — Selado |
| **DssBtnGroup** | Container de Composicao (Action Group) | DssChip | `conformant` — Selado (26 Mar 2026) |
| **DssBtnDropdown** | Action Group Composto (Botao com Dropdown Integrado) | DssChip | `conformant` — Selado (27 Mar 2026) |

> Componentes selados **NÃO DEVEM ser re-arquitetados**. Apenas correções pontuais mediante nova auditoria.

---

## 3. GOLDEN COMPONENTS (REFERÊNCIA NORMATIVA)

Golden Components são **baseline vinculante**, não inspiração.

### 3.1 Golden Primários

- **DssCheckbox**
  - Categoria: Compact Control interativo
  - Referência para:
    - Touch target via `::before`
    - WCAG 2.5.5
    - Estrutura de estados
    - Hierarquia de estados (error > color > brand)

### 3.2 Golden Secundários

- **DssRadio**
  - Referência para:
    - Error state
    - defineExpose
    - Guardas de estado em composables

- **DssChip**
  - Referência estrutural
  - Convenções de SCSS e output

### 3.3 Não interativos

- **DssBadge**
  - Referência para componentes não interativos
  - Touch target é responsabilidade do wrapper

❌ **É proibido misturar Golden Components**
❌ **É proibido criar componente “do zero”**

---

## 4. ARQUITETURA DSS (NÃO NEGOCIÁVEL)

Todo componente DSS **DEVE** implementar exatamente **4 camadas**:

1. **1-structure/**
   - Vue / React
   - Lógica, template, ARIA
   - Sem estilos complexos

2. **2-composition/**
   - `_base.scss`
   - Tokens genéricos
   - Layout, tamanhos, estados base

3. **3-variants/**
   - `_*.scss` ou `index.scss`
   - Variantes visuais
   - Pode estar vazio (Fase 1), mas **nunca ausente**

4. **4-output/**
   - `_brands.scss`
   - `_states.scss`
   - Media queries, brand, contrast, forced-colors, print

+ **Orquestrador** obrigatório (`Component.module.scss`)

❌ Nunca pular camadas
❌ Nunca misturar responsabilidades

---

## 5. TOKENS (TOKEN-FIRST ABSOLUTO)

### 5.1 Regras obrigatórias

- ❌ Proibido criar tokens específicos de componente (`--dss-toggle-*`, etc.)
- ❌ Proibido usar valores hardcoded sem exceção documentada
- ✅ Usar **apenas tokens existentes**
- ✅ Usar nomes **exatamente como definidos** no catálogo
- ✅ Tokens semânticos **sempre preferidos** a numéricos

### 5.2 Tokens de brand

- **Obrigatório:** `--dss-{brand}-primary`, `secondary`, `accent`, `on-primary`
- ❌ Nunca usar `--dss-hub-600`, `--dss-water-700` em novos componentes

### 5.3 Altura visual (Compact Controls)

Usar **APENAS**:

- `--dss-compact-control-height-{xs|sm|md|lg}`

❌ Nunca usar spacing ou size como altura

---

## 6. TOUCH TARGET (DECISÃO EXPLÍCITA)

Todo componente **DEVE declarar explicitamente** sua estratégia:

### Opção A — Interativo

- WCAG 2.5.5
- Touch target ≥ 48px
- Implementação via `::before`
- Token: `--dss-touch-target-min`

### Opção B — Não interativo

- NÃO implementar touch target
- Documentar que o wrapper é responsável
- Referenciar DssBadge

❌ Nunca misturar estratégias
❌ Nunca deixar implícito

---

## 7. PSEUDO-ELEMENTOS (REGRA VINCULANTE)

- `::before` → **EXCLUSIVAMENTE** touch target
- `::after` → efeitos visuais (quando aplicável)

❌ Nunca usar `::before` para efeitos
❌ Nunca sobrescrever `::before`

---

## 8. ACESSIBILIDADE (WCAG 2.1 AA)

Obrigatório conforme aplicabilidade:

- `:focus-visible` (tokenizado)
- `prefers-reduced-motion`
- `prefers-contrast: more`
- `forced-colors: active`
- Print styles
- ARIA coerente com HTML nativo

Se algo **não se aplicar**, deve ser **explicitamente documentado**.

---

## 9. HIERARQUIA DE ESTADOS (REGRA CRÍTICA)

Hierarquia canônica DSS:

```
error > disabled > loading > checked/selected > color > brand > default
```

Implicações práticas:

- Composables **DEVEM ter guardas explícitas**
- `error` sempre tem prioridade visual absoluta
- Nenhuma classe de cor pode competir com erro

Este foi um **erro recorrente** na Fase 1 e agora é **regra explícita**.

---

## 10. EXCEÇÕES (POLÍTICA FORMAL)

Exceções são permitidas **somente se**:

- Tecnicamente não tokenizáveis (ex.: `brightness()`)
- Necessárias para acessibilidade

Exceções **canonizadas**:

- `brightness()` / `saturate()`
- `border-radius: 50%`
- `sr-only` com 1px
- forced-colors ignora tokens

Toda exceção deve:

- Estar comentada no SCSS
- Ter ID
- Estar listada na documentação

---

## 11. ERROS RECORRENTES (ANTI-PATTERNS CONSOLIDADOS)

Estes erros **NÃO DEVEM reaparecer**:

1. Classe de cor aplicada sem guarda de erro
2. Documentação divergente do código
3. Tecla Enter documentada para checkbox/switch
4. Dense mode apenas removendo touch target
5. Tokens de brand numéricos em novos componentes
6. Composable gerando classes inconsistentes com Golden

---

## 12. AUDITORIA DSS

- Auditoria é **não-destrutiva**
- Auditor **não re-arquiteta**
- NCs podem ser técnicas ou documentais
- NCs documentais pós-correção são **esperadas**
- GAPs sistêmicos são registrados como **reservas**

### Severidade

- **ALTA:** comportamento, acessibilidade, hierarquia de estados
- **MEDIA:** documentação, inconsistência factual
- **BAIXA:** estilo, cobertura de testes

---

## 13. SELO DSS v2.2

- Selo **NÃO é automático**
- Exige:
  - 0 NCs pendentes
  - Re-auditoria positiva
  - Instrução explícita do responsável de governança

- Selo é emitido em arquivo imutável
- Alterações posteriores invalidam o selo

---

## 14. FASEAMENTO DE COMPONENTES

A classificação oficial de todos os componentes Quasar por fase está documentada em:

**[`docs/reference/DSS_FASEAMENTO_COMPONENTES.md`](./reference/DSS_FASEAMENTO_COMPONENTES.md)**

Este arquivo é a **fonte única de verdade** para decisões de faseamento. Qualquer dúvida sobre em qual fase um componente deve ser criado deve ser resolvida consultando-o.

> **Nota de revisão (Março 2026):** `QOptionGroup`, `QBtnGroup`, `QFab` e `QFabAction` foram reclassificados da Fase 1 para a Fase 2, pois envolvem composição interna e gestão de estado entre filhos, violando a regra de ouro da Fase 1.

---

## 15. ORIENTAÇÃO PARA FASE 2 (COMPONENTES COMPOSTOS)

Fase 2 introduz maior complexidade:

- Composição de múltiplos componentes DSS
- Estados cruzados
- Maior risco de NCs documentais

Portanto:

- Prompts de criação e auditoria **devem ser mais prescritivos**
- Guardas de estado devem ser declaradas antes do código
- Documentação deve ser escrita **em paralelo**, não ao final

---

## 16. USO DESTE DOCUMENTO

Este arquivo deve ser:

- Colado ou anexado no início de qualquer novo chat
- Lido integralmente antes de criar componentes
- Considerado superior a histórico de conversa

Qualquer agente que ignore este documento **NÃO está operando no DSS**.

---

**Design System Sansys — DSS v2.2**
**Estado canônico ao final da Fase 1**

