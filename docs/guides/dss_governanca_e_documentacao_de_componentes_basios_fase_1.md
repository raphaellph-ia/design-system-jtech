# DSS — Checklist de Documentação de Componentes

Este documento define o **Checklist de Referência para Documentação de Componentes do Design System Sansys (DSS)**.

Ele é derivado da Seção 13.1 (Governança) do PRD e tem como objetivo:
- garantir **consistência documental**
- reduzir subjetividade em revisões
- permitir **escala saudável** do DSS

---

## 1️⃣ Princípios de Documentação

### Golden Sample (Documentacao)

O **DSSButton** e o Golden Sample oficial — referencia de **documentacao** (Template 13.1). Use-o como modelo para estrutura, profundidade e qualidade de documentacao.

> **Nota**: Golden Sample e diferente de Golden Reference (governanca de categoria) e Golden Context (baseline de auditoria). Para definicoes completas, consulte [DSS_GOLDEN_COMPONENTS.md](../governance/DSS_GOLDEN_COMPONENTS.md).

### Fonte da Verdade

A **documentação oficial do Quasar** do componente equivalente (q-btn, q-input, etc.) deve ser consultada como base. A documentação DSS complementa e adapta, não reinventa.

### Linguagem DSS-First (OBRIGATORIO)

> **CRITICO**: Componentes DSS sao **wrappers governados pelo Design System Sansys**, NAO copias ou espelhos do Quasar.

**Linguagem PROIBIDA:**
- ❌ "100% compativel com a API do Quasar"
- ❌ "Props 100% implementadas do QComponent"
- ❌ "Checklist de conformidade Quasar"
- ❌ "Espelho do componente Quasar"

**Linguagem OBRIGATORIA:**
- ✅ "Wrapper DSS baseado no QComponent"
- ✅ "API publica governada pelo Design System Sansys"
- ✅ "Props governadas pelo DSS (API Publica)"
- ✅ "O DSS curou deliberadamente esta API"

### Regra de Ouro

> ❗ **Nunca invente informação para preencher uma seção. Se não há conteúdo relevante, a seção pode ser omitida ou marcada como N/A.**

---

## 2️⃣ Checklist de Referência (11 Seções)

As seções abaixo servem como **guia de referência**. Preencha as seções que tiverem conteúdo relevante baseado na pesquisa do componente Quasar equivalente.

### 📘 1. Visão Geral
- [ ] Descrição clara do componente
- [ ] Responsabilidade principal definida

---

### 📘 2. Quando Usar / Quando Não Usar
- [ ] Casos de uso recomendados
- [ ] Casos de uso proibidos ou inadequados

---

### 📘 3. Anatomia do Componente
- [ ] Estrutura visual descrita
- [ ] Partes nomeadas claramente

---

### 📘 4. Tokens Utilizados

**OBRIGATORIO - Nivel de Detalhe:**
- [ ] Nomes EXATOS dos tokens (ex: `--dss-feedback-positive`, NAO "cores de feedback")
- [ ] Link para secao especifica do [`DSS_TOKEN_REFERENCE.md`](../reference/DSS_TOKEN_REFERENCE.md)
- [ ] Tabela com colunas: Categoria | Tokens Usados | Onde Encontrar | Aplicacao no Componente
- [ ] Nota defensiva: "O componente NAO aceita valores arbitrarios" (quando aplicavel)
- [ ] Nenhum token especifico de componente criado
- [ ] Fallbacks semanticos descritos

**Exemplo de Tabela Obrigatoria:**
```markdown
| Categoria | Tokens Usados | Onde Encontrar | Aplicacao |
|-----------|---------------|----------------|-----------|
| **Cores Semanticas** | `--dss-feedback-positive`, `--dss-feedback-negative` | [Secao 2.3](../reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Cores de fundo |
```

---

### 📘 5. API Pública
- [ ] Props documentadas
- [ ] Slots documentados (quando existirem)
- [ ] Eventos documentados

---

### 📘 6. Estados
- [ ] Estados suportados listados
- [ ] Prioridade entre estados definida

---

### 📘 7. Acessibilidade
- [ ] Considerações de teclado
- [ ] ARIA quando aplicável
- [ ] Estados de foco descritos

---

### 📘 8. Exemplos de Uso
- [ ] Exemplo básico
- [ ] Exemplo avançado (quando aplicável)

---

### 📘 9. Anti-patterns
- [ ] Uso incorreto documentado
- [ ] Justificativa do porquê é incorreto

---

### 📘 10. Troubleshooting
- [ ] Problemas comuns documentados
- [ ] Soluções recomendadas

---

### 📘 11. Governança do Componente
- [ ] Extensões permitidas
- [ ] Extensões proibidas
- [ ] Critérios para evolução

---

## 3️⃣ Fluxo de Documentação

```
1. Consultar documentação do Quasar (q-componente)
   ↓
2. Identificar seções com conteúdo relevante
   ↓
3. Adaptar e complementar para contexto DSS
   ↓
4. Omitir seções sem conteúdo (não inventar)
   ↓
5. Revisar usando DSSButton como referência
```

---

## 4️⃣ Regras de Governança

- O **DSSButton** é o Golden Sample oficial
- Consultar documentação Quasar é obrigatório antes de documentar
- Seções sem conteúdo relevante podem ser omitidas
- Exceções devem ser explicitadas na documentação
- Revisores validam qualidade, não quantidade de seções

### Brandabilidade na Documentacao (OBRIGATORIO)

Ao documentar brandabilidade (Hub, Water, Waste):

**NAO FACA:**
- ❌ Listar valores especificos de cores por brand (ex: `--dss-hub-600: #EF7A11`)
- ❌ Criar tabelas detalhando RGB/hex de cada marca
- ❌ Duplicar informacao que ja existe no DSS_TOKEN_REFERENCE

**FACA:**
- ✅ Explicar COMO o componente reage a brands (`data-brand`, `prop brand`)
- ✅ Descrever prioridade entre metodos de aplicacao
- ✅ Referenciar DSS_TOKEN_REFERENCE para paletas de cores:
  ```markdown
  > Para detalhes das paletas de cores, consulte
  > [`DSS_TOKEN_REFERENCE.md - Secao 2.2`](../reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes)
  ```
- ✅ Documentar comportamento de hover por brand (se aplicavel)
- ✅ Documentar fallback quando nenhum brand esta definido

---

## 5️⃣ Integração com PR Checklist

Nenhuma PR de componente DSS deve ser aprovada sem:
- [ ] Documentação criada seguindo este checklist como referência
- [ ] Consulta à documentação Quasar realizada
- [ ] Seções omitidas justificadas (quando questionado)
- [ ] Documentação revisada
- [ ] **Linguagem DSS-First verificada** (nenhuma afirmacao de "100% compatibilidade Quasar")
- [ ] **Tokens com nomes exatos e links** para DSS_TOKEN_REFERENCE
- [ ] **Brandabilidade referencia DSS_TOKEN_REFERENCE** (nao detalha cores por brand)

---

## Regra Final

> ❗ **Documentação não é opcional no DSS. A qualidade importa mais que a quantidade de seções preenchidas.**

Este checklist é parte integrante da governança do Design System Sansys.
