# Checklist de Documentação de Componentes DSS

**Template 13.1 - Design System Sansys**

Use este checklist ao criar ou revisar documentação de componentes DSS. Baseado no Golden Sample: [DssButton.md](./components/base/DssButton/DssButton.md)

---

## ⚠️ Principios de Linguagem DSS-First (OBRIGATORIO)

Antes de escrever qualquer documentacao, internalize estas regras:

### Linguagem PROIBIDA (causa rejeicao de PR)
- ❌ "100% compativel com a API do Quasar"
- ❌ "Props 100% implementadas do QComponent"
- ❌ "Checklist de conformidade Quasar"
- ❌ "Espelho do componente Quasar"

### Linguagem OBRIGATORIA
- ✅ "Wrapper DSS baseado no QComponent"
- ✅ "API publica governada pelo Design System Sansys"
- ✅ "Props governadas pelo DSS (API Publica)"
- ✅ "O DSS curou deliberadamente esta API"

### Por que isso importa?
O DSS e uma **camada de governanca** sobre o Quasar, nao um espelho. Componentes DSS podem intencionalmente:
- Omitir props do Quasar que nao fazem sentido no contexto DSS
- Adicionar props exclusivas DSS (ex: `brand`, `ariaLabel`)
- Restringir valores aceitos (ex: apenas cores semanticas)

---

## ✅ Estrutura Obrigatória (13 Seções)

### Seção 1 - Visão Geral
- [ ] Nome do componente definido
- [ ] Descrição clara e concisa
- [ ] Tipo identificado (Básico - wrapper Quasar | Composto - composição DSS)
- [ ] Características principais (bullets conceituais, não detalhadas)
- [ ] Badge "Golden Sample" se aplicável

### Seção 2 - Quando Usar / Quando Não Usar
- [ ] Lista de casos de uso recomendados (✅ Quando Usar)
- [ ] Lista de casos de uso não recomendados (❌ Quando Não Usar)
- [ ] Exemplos práticos para cada caso
- [ ] Alternativas sugeridas para "Quando Não Usar"

### Seção 3 - Anatomia do Componente
- [ ] Estrutura visual (diagrama ASCII ou descrição)
- [ ] Partes internas listadas (com classes CSS)
- [ ] Slots disponíveis documentados
- [ ] Subcomponentes DSS utilizados (ou "Nenhum" se atômico)
- [ ] Dependências externas identificadas

### Seção 4 - Tokens Utilizados
- [ ] **Tabela rastreável** com 4 colunas: Categoria | Tokens Usados | Onde Encontrar | Aplicacao no Componente
- [ ] **Nomes EXATOS dos tokens** (ex: `--dss-feedback-positive`, NAO apenas "cores de feedback")
- [ ] **Links para secoes do DSS_TOKEN_REFERENCE.md** (ex: `[Secao 2.3](../reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base)`)
- [ ] Tokens de **cor** documentados com nomes exatos
- [ ] Tokens de **acessibilidade** documentados (com 🔒)
- [ ] Tokens de **espaçamento** documentados com nomes exatos
- [ ] Tokens de **forma** documentados com nomes exatos
- [ ] Tokens de **brand** documentados (se aplicável) - **SEM listar valores especificos**
- [ ] **Flags de proteção** (🔒) em tokens críticos
- [ ] **Nota de fallback** explicando comportamento padrão
- [ ] **Nota defensiva**: "O componente NAO aceita valores/cores arbitrarias" (quando aplicavel)

### Seção 5 - API Pública
- [ ] Props organizadas por categoria (Principais, Forma, Estado, Layout, etc.)
- [ ] Cada prop tem: Nome | Type | Default | Valores | Descrição
- [ ] Validações documentadas quando aplicável
- [ ] Eventos documentados com: Nome | Payload | Quando Emitido | Descrição
- [ ] Slots documentados com: Nome | Descrição | Uso Recomendado

### Seção 6 - Estados
- [ ] **Tabela única** centralizando todos os estados
- [ ] Colunas: Estado | Aparência | Interação | Tokens Aplicados | Notas
- [ ] Estados mínimos: Default, Hover, Focus, Active, Disabled
- [ ] Estados adicionais se aplicável: Loading, Error, Success
- [ ] **Diagrama de transição** entre estados

### Seção 7 - Variantes / Especializações
- [ ] Cada variante documentada separadamente
- [ ] **Descrição** da variante
- [ ] **Características técnicas** (CSS aplicado, tokens, etc.)
- [ ] **Quando usar** cada variante
- [ ] **Exemplo de código** para cada variante

### Seção 8 - Brandabilidade
- [ ] Métodos de aplicação documentados (prop brand vs data-brand)
- [ ] Prioridade entre métodos explicada
- [ ] Comportamento de cada brand (Hub, Water, Waste) - **APENAS descritivo, NAO listar cores**
- [ ] Sistema de hover para brands (se aplicável)
- [ ] **Nota de fallback**: comportamento sem brand
- [ ] **Referencia obrigatoria ao DSS_TOKEN_REFERENCE** para detalhes de paletas de cores

**⚠️ NAO documentar valores especificos de cores por brand!**
```markdown
<!-- ❌ ERRADO -->
| Brand | Cor Primaria |
|-------|--------------|
| Hub   | `--dss-hub-600` (#EF7A11) |

<!-- ✅ CORRETO -->
> Para detalhes das paletas de cores por brand, consulte
> [`DSS_TOKEN_REFERENCE.md - Secao 2.2`](../reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes)
```

### Seção 9 - Acessibilidade
- [ ] **Conformidade WCAG 2.1 AA** documentada
- [ ] Tabela de critérios atendidos (Critério | Nível | Como Implementado)
- [ ] **Navegação por teclado** documentada (Tab, Enter, Space, etc.)
- [ ] **ARIA labels obrigatórios** identificados
- [ ] Estados ARIA aplicados automaticamente listados
- [ ] Lista de leitores de tela testados

### Seção 10 - Exemplos de Uso
- [ ] **Instalação** com nota sobre variação por produto
- [ ] **Uso básico** (mínimo necessário)
- [ ] **Exemplos por categoria** (cores, tamanhos, variantes)
- [ ] **Exemplos avançados** (layout, loading, navegação)
- [ ] **Todo código é executável** e testado
- [ ] Exemplos cobrem casos reais de uso

### Seção 11 - Anti-patterns
- [ ] **Mínimo 5 anti-patterns** documentados
- [ ] Cada anti-pattern tem: Título | Problema | Exemplo ❌ | Exemplo ✅ | Por quê
- [ ] **Tabela de combinações não permitidas** (se aplicável)
- [ ] Explicação clara do impacto de cada anti-pattern

### Seção 12 - Governança do Componente
- [ ] **Extensões válidas** definidas (permitido sem aprovação)
- [ ] **O que exige novo componente** definido
- [ ] **O que é proibido** listado claramente
- [ ] **Quem decide** cada tipo de mudança (tabela)
- [ ] **Processo de mudança** documentado (7 etapas)

### Seção 13 - Troubleshooting
- [ ] **Mínimo 5 problemas comuns** documentados
- [ ] Cada problema tem: Título | Causa | Solução | Código exemplo
- [ ] Problemas cobrem: funcionamento, estilos, acessibilidade

---

## ✅ Documento de API Referencial (DSSCOMPONENT_API.md)

Alem do documento normativo (DssComponente.md), cada componente PODE ter um documento de API referencial.

### Estrutura do Documento API
- [ ] **Titulo claro**: "DssComponente API - Referencia Tecnica"
- [ ] **Nota de governanca**: "Documento referencial - Para governanca, consulte [DssComponente.md]"
- [ ] **Visao geral com linguagem DSS-First** (wrapper governado, NAO "100% compativel")

### Conteudo Obrigatorio
- [ ] Props organizadas por categoria com tipos e defaults
- [ ] Slots com descricao e exemplo
- [ ] Eventos com payload e quando emitido
- [ ] Casos de uso comuns com codigo

### Secao "Relacao com Quasar QComponente" (OBRIGATORIO)
Esta secao deve:
- [ ] Explicitar que e um **wrapper governado**, NAO copia
- [ ] Listar props **governadas pelo DSS** (API Publica)
- [ ] Listar props **exclusivas DSS** (extensoes)
- [ ] Listar props do Quasar **fora de escopo** (com justificativa)

```markdown
<!-- Exemplo de linguagem correta -->
> **Governanca**: O DssComponente e um **wrapper governado pelo DSS**, nao uma copia
> do QComponente. A API publica e deliberadamente curada para garantir consistencia,
> acessibilidade e brandabilidade.
```

---

## ✅ Validações de Qualidade

### Linguagem DSS-First
- [ ] **ZERO** afirmacoes de "100% compatibilidade Quasar"
- [ ] **ZERO** checklists de conformidade Quasar
- [ ] Linguagem de **wrapper governado** usada consistentemente
- [ ] Secao "Relacao com Quasar" (se existir) usa linguagem de governanca

### Tokens
- [ ] **Todos os tokens usados** no componente estão na tabela COM NOMES EXATOS
- [ ] **Links para DSS_TOKEN_REFERENCE.md** em cada categoria
- [ ] **Flags de proteção** (🔒) em tokens de acessibilidade e touch targets
- [ ] **Nota de fallback** explica comportamento padrão sem brand/props
- [ ] **Nota defensiva** sobre nao aceitar valores arbitrarios (quando aplicavel)
- [ ] Tokens de **brand** NAO listam valores especificos - referenciam DSS_TOKEN_REFERENCE

### Exemplos de Código
- [ ] **Todo código é válido** e segue sintaxe Vue 3
- [ ] **Exemplos são testáveis** (podem ser copiados e colados)
- [ ] **Comentários explicativos** quando necessário
- [ ] **Formatação consistente** (Vue, JS, CSS)

### Links e Recursos
- [ ] Links para **documentação oficial Quasar** (quando aplicável)
- [ ] Links para **WCAG 2.1** (quando aplicável)
- [ ] Links para **Material Icons** (quando aplicável)
- [ ] Links para **tokens DSS** internos
- [ ] Todos os links **testados e funcionando**

### Observações e Notas
- [ ] **Nota de instalação** menciona variação por produto
- [ ] **Nota de fallback** explica comportamento sem brand
- [ ] **Avisos críticos** (⚠️) quando aplicável
- [ ] **Observações importantes** após tabela de tokens

---

## ✅ Conformidade com Template 13.1

### Estrutura
- [ ] **13 seções obrigatórias** presentes
- [ ] Seções na **ordem correta**
- [ ] Títulos seguem **padrão exato** do template
- [ ] **Badge de Golden Sample** se for modelo de referência

### Conteúdo
- [ ] **Anti-patterns**: mínimo 5 exemplos práticos
- [ ] **Governança**: extensões válidas, proibições, quem decide
- [ ] **Tokens**: formato tabular padronizado (4 colunas)
- [ ] **Estados**: tabela única centralizada + diagrama
- [ ] **Quando Usar/Não Usar**: exemplos práticos

### Qualidade
- [ ] **Nenhum conteúdo duplicado** entre seções
- [ ] **Visão Geral** é conceitual, não detalhada
- [ ] **Exemplos** são práticos e executáveis
- [ ] **Linguagem clara** e acessível

---

## ✅ Ciclo de Revisão

### Antes do PR
- [ ] **Validado por mantenedor do DSS**
- [ ] **Exemplos testados** em ambiente real
- [ ] **Links externos verificados**
- [ ] **Sincronizado com código-fonte** atual
- [ ] **Changelog atualizado** com mudanças
- [ ] **Linguagem DSS-First verificada** (buscar por "100%", "compativel", "espelho")
- [ ] **Tokens com nomes exatos** verificados (nao apenas categorias genericas)
- [ ] **Brandabilidade referencia DSS_TOKEN_REFERENCE** (nao detalha cores)

### Durante o PR
- [ ] **Checklist incluído** no corpo do PR
- [ ] **Reviewers** do time de Design + DSS
- [ ] **Screenshots** de exemplos (se aplicável)
- [ ] **Breaking changes** documentados claramente

### Após Aprovação
- [ ] Documentação **mergeada** junto com código
- [ ] **CHANGELOG.md** atualizado
- [ ] **Versão do componente** incrementada
- [ ] Time notificado sobre mudanças

---

## 📊 Métricas de Qualidade

Use estas métricas para avaliar a documentação:

| Métrica | Objetivo | Como Medir |
|---------|----------|------------|
| **Completude** | 100% | Todas as 13 seções preenchidas |
| **Tokens rastreáveis** | 100% | Todos os tokens usados documentados |
| **Exemplos executáveis** | 100% | Todo código exemplo testado |
| **Anti-patterns** | ≥5 | Mínimo 5 anti-patterns documentados |
| **Links funcionando** | 100% | Todos os links testados |
| **Aderência ao template** | 100% | Estrutura exata do Template 13.1 |

---

## 🏆 Golden Sample de Referência

**Componente:** [DssButton](./components/base/DssButton/DssButton.md)
**Status:** Golden Sample Oficial - Template 13.1
**Versão:** DSS v2.2.0
**Última atualização:** Janeiro 2025

Use este componente como referência para:
- Estrutura completa de documentação
- Formato de tabelas (tokens, estados, props)
- Estilo de escrita e exemplos
- Nível de detalhe esperado
- Organização de anti-patterns e governança

---

## 📝 Como Usar Este Checklist

### Para Novos Componentes
1. Copie este checklist para o corpo do PR
2. Marque cada item conforme completa
3. Use DssButton.md como referência
4. Solicite revisão quando todos os itens estiverem ✅

### Para Componentes Existentes
1. Use o checklist para auditoria
2. Identifique gaps na documentação atual
3. Crie PRs incrementais para preencher gaps
4. Priorize: Tokens → Anti-patterns → Governança

### Para Revisores
1. Verifique se todos os itens estão ✅
2. Teste exemplos de código
3. Valide links externos
4. Compare com DssButton.md como referência
5. Aprove apenas se 100% completo

---

**Mantido por:** Equipe Design System Sansys
**Atualizado em:** Janeiro 2025
**Versão:** 1.0.0
