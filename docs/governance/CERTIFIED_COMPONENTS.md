# Componentes Certificados DSS

Indice oficial de componentes com Selo de Conformidade DSS.

> Este arquivo e mantido pelo Agente de Governanca DSS. Cada entrada corresponde a um componente que passou pela auditoria final completa e recebeu selo aprovado.

---

## Registro de Componentes Certificados

| Componente | Categoria | Versao DSS | Data do Selo | Status | Golden Reference | Golden Context | Observacao |
|------------|-----------|------------|--------------|--------|-----------------|----------------|------------|
| DssChip | Compact Control interativo | v2.2 | 27/01/2026 | Aprovado | **Sim** (interativo) | DssChip (auto) | Golden Reference oficial |
| DssBadge | Compact Control nao interativo | v2.2 | 27/01/2026 | Aprovado | **Sim** (nao interativo) | DssChip | Golden Reference oficial; touch target delegado ao contexto (R-02) |
| DssCheckbox | Compact Control interativo | v2.2 | 01/02/2026 | Aprovado | — | DssChip | 3 ressalvas nao-bloqueantes (R-01, R-02, R-03) |
| DssAvatar | Basico (Visual/Identity) | v2.2 | 02/02/2026 | Aprovado | — | DssChip | 2 ressalvas nao-bloqueantes (R-01, R-02); 6 excecoes documentadas |
| DssHeader | Superficie e Layout — container estrutural Nivel 3 | v2.2 | 17/04/2026 | Aprovado | — | DssCard (ref) + DssToolbar (ctx) | 2 NCs resolvidas, 3 GAPs resolvidos/escalados; 4 excecoes documentadas; GAP-03 escalado para Chat Estrategico |
| DssFooter | Superficie e Layout — container estrutural Nivel 3 | v2.2 | 18/04/2026 | Aprovado | — | DssCard (ref) + DssHeader (ctx) | 0 NCs, 5 GAPs resolvidos; 5 excecoes documentadas (EXC-05: sombra upward hardcoded, pendente token --dss-elevation-up-*) |
| DssMenu | Navegacao / Overlays — overlay Nivel 2 (Composicao de Primeiro Grau) | v2.2 | 18/04/2026 | Aprovado | — | DssTooltip (ref) + DssList (ctx) | 0 NCs, 3 GAPs resolvidos; 3 excecoes documentadas; CSS global (nao scoped) por teleport QMenu |

---

## Legenda

- **Aprovado**: Componente em total conformidade com DSS; selo emitido
- **Ressalvas**: Observacoes registradas que nao impedem conformidade
- **Golden Reference**: Referencia normativa global para toda a categoria de componentes
- **Golden Context**: Baseline especifico usado para auditar aquele componente
- **Golden Sample**: Referencia de documentacao (Template 13.1) — DssButton (NAO listado aqui pois e referencia documental, nao certificacao)

---

## Documentos Relacionados

- [DSS_GOLDEN_COMPONENTS.md](./DSS_GOLDEN_COMPONENTS.md) — Modelo de Governanca Golden (definicoes formais)
- [CLAUDE.md](../../CLAUDE.md) — Documento normativo vinculante (Principio #9)
- [DSS_COMPONENT_ARCHITECTURE.md](../reference/DSS_COMPONENT_ARCHITECTURE.md) — Arquitetura de 4 camadas
- [DSS_TOKEN_REFERENCE.md](../reference/DSS_TOKEN_REFERENCE.md) — Catalogo oficial de tokens

---

**Design System Sansys — Governanca DSS v2.2**
