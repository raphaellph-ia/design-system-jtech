# Modelo de Governanca Golden — DSS v2.2

**Versao**: 2.2.1
**Data**: 19 Fev 2026
**Status**: Normativo vinculante

> Este documento define o modelo de governanca **Golden** do Design System Sansys.
> E o documento raiz para os conceitos de Golden Reference, Golden Context e Golden Sample.

---

## 1. Definicoes Formais

O DSS utiliza tres conceitos distintos sob o termo "Golden". Cada um tem escopo, funcao e aplicacao diferentes.

### 1.1 Golden Reference

**Definicao**: Componente oficialmente designado como referencia normativa **global** para toda uma categoria de componentes. Serve como baseline de governanca transversal.

**Caracteristicas**:
- Aprovado com Selo de Conformidade DSS v2.2
- Designado explicitamente como referencia global (nao automatico)
- Define padroes que TODOS os componentes da categoria devem seguir
- Autoridade maxima para decisoes arquiteturais da categoria

**Golden References Oficiais (Janeiro 2026)**:

| Componente | Categoria | Interativo | Touch Target | Designacao |
|------------|-----------|------------|--------------|------------|
| **DssChip** | Compact Control | Sim | Implementado via `::before` | Golden Reference interativo |
| **DssBadge** | Compact Control | Nao | Contextual (delegado ao pai) | Golden Reference nao interativo |

**O que Golden Reference define para a categoria**:
- Uso correto dos tokens `--dss-compact-control-height-*`
- Decisoes de touch target (implementado vs delegado ao contexto)
- Convencao obrigatoria de pseudo-elementos (`::before` / `::after`)
- Documentacao de excecoes visuais
- Implementacao de acessibilidade avancada (media queries)

### 1.2 Golden Context

**Definicao**: Componente especifico usado como **baseline de auditoria** para um determinado componente. Pode ser qualquer componente certificado (com Selo DSS v2.2), nao apenas um Golden Reference.

**Caracteristicas**:
- Escolhido por proximidade semantica/funcional com o componente auditado
- Pode ser um Golden Reference OU um componente certificado
- Define o baseline concreto para comparacao na auditoria
- Cada componente declara seu Golden Context no campo de identificacao

**Exemplos de Golden Context**:

| Componente Auditado | Golden Context (primario) | Golden Context (secundario) | Justificativa |
|---------------------|--------------------------|----------------------------|---------------|
| DssCheckbox | DssChip | — | Compact Control interativo mais proximo |
| DssRadio | DssCheckbox | DssChip | Mesmo padrao Form/Selection + touch target de referencia |
| DssToggle | DssCheckbox | DssRadio | Mesmo padrao Form/Selection + error state |
| DssTooltip | DssBadge | — | Elemento nao interativo mais proximo |
| DssIcon | DssBadge | — | Elemento nao interativo de exibicao |
| DssCard | DssChip | DssBadge | Superficie com tokens genericos + decisoes contextuais |
| DssItem | DssChip | — | Elemento dual-mode com interatividade |

### 1.3 Golden Sample

**Definicao**: Componente designado como referencia de **documentacao** (Template 13.1). Define estrutura, profundidade e qualidade da documentacao — NAO define arquitetura ou implementacao.

**Golden Sample Oficial**: **DssButton**

**O que Golden Sample define**:
- Estrutura completa de documentacao (13 secoes)
- Formato de tabelas (tokens, estados, props)
- Estilo de escrita e exemplos
- Nivel de detalhe esperado
- Organizacao de anti-patterns e governanca

**Importante**: Golden Sample NAO e sinonimo de Golden Reference. Golden Sample define DOCUMENTACAO. Golden Reference define ARQUITETURA e GOVERNANCA.

---

## 2. Regras de Uso

### 2.1 Quando usar cada conceito

| Situacao | Conceito | Exemplo |
|----------|----------|---------|
| Definir padrao global para categoria | **Golden Reference** | "DssChip define o padrao de touch target para todos os Compact Controls" |
| Escolher baseline para auditoria de componente | **Golden Context** | "DssRadio sera auditado usando DssCheckbox como baseline" |
| Definir modelo de documentacao | **Golden Sample** | "Use DssButton.md como referencia de estrutura" |

### 2.2 Regras vinculantes

1. **NUNCA** auditar componentes sem declarar um Golden Context
2. **SEMPRE** usar Golden Reference como baseline global quando o componente pertence a categoria coberta
3. **NUNCA** usar Golden Sample como sinonimo de Golden Reference
4. Golden Context pode ser qualquer componente com Selo DSS v2.2
5. Golden Context deve ter proximidade semantica/funcional com o componente auditado
6. Quando o Golden Context e diferente do Golden Reference da categoria, AMBOS devem ser declarados

### 2.3 Hierarquia de autoridade

```
Golden Reference (global, define a categoria)
  └── Golden Context (especifico, baseline de auditoria)
        └── Componente auditado
```

Se houver conflito entre Golden Reference e Golden Context, o Golden Reference prevalece para decisoes transversais (tokens, pseudo-elementos, touch target).

---

## 3. Cadeia de Certificacao

A evolucao da cadeia mostra como componentes certificados tornam-se Golden Context para novos componentes:

```
DssChip (Golden Reference interativo)
  ├── DssCheckbox (Golden Context: DssChip)
  │     ├── DssRadio (Golden Context: DssCheckbox)
  │     └── DssToggle (Golden Context: DssCheckbox)
  ├── DssAvatar (Golden Context: DssChip)
  ├── DssCard (Golden Context: DssChip + DssBadge)
  └── DssItem (Golden Context: DssChip)

DssBadge (Golden Reference nao interativo)
  ├── DssTooltip (Golden Context: DssBadge)
  ├── DssIcon (Golden Context: DssBadge)
  └── DssCard (Golden Context secundario: DssBadge)
```

---

## 4. Diretriz Normativa

> Nem todo Compact Control e interativo.
> Touch target e uma decisao semantica e contextual, nao uma obrigacao universal do componente.

Esta diretriz e **vinculante** para novos componentes do DSS a partir da versao **v2.2**.

---

## 5. Historico

### Declaracao Original (27 Jan 2026)

Com a aprovacao dos componentes DssChip e DssBadge, foram declarados oficialmente como **Golden Compact Controls** do DSS v2.2:
- **DssChip** — Compact Control interativo
- **DssBadge** — Compact Control nao interativo

### Evolucao para Modelo Dual (19 Fev 2026)

O conceito unico "Golden Component" foi formalizado em tres conceitos distintos para eliminar ambiguidade:
- **Golden Reference** — governanca global de categoria
- **Golden Context** — baseline especifico de auditoria
- **Golden Sample** — referencia de documentacao

---

## 6. Documentos Relacionados

- [CLAUDE.md](../../CLAUDE.md) — Principio #9: Modelo Golden (vinculante)
- [DSS_COMPONENT_ARCHITECTURE.md](../reference/DSS_COMPONENT_ARCHITECTURE.md) — Secao Golden References
- [CERTIFIED_COMPONENTS.md](./CERTIFIED_COMPONENTS.md) — Registro oficial de certificacoes
- [COMPONENT_DOCUMENTATION_CHECKLIST.md](../specs/COMPONENT_DOCUMENTATION_CHECKLIST.md) — Golden Sample (Template 13.1)
- [DSS_TOKEN_REFERENCE.md](../reference/DSS_TOKEN_REFERENCE.md) — Secoes 7.7 e 7.13

---

**Design System Sansys — Governanca DSS v2.2**
