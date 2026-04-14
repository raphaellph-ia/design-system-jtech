# DSS MCP — Plano Técnico da Fase 2 (Validator)

## 1. Visão Geral

Este documento detalha a implementação técnica da **Fase 2** do servidor MCP (Model Context Protocol) para o Design System Sansys (DSS).

Enquanto a Fase 1 estabeleceu a fundação de leitura (Resources) e consultas simples (Tools), a Fase 2 introduz a capacidade de **Validação Ativa**. O objetivo é permitir que o MCP atue como um auditor técnico automatizado, capaz de ler o código-fonte de componentes em desenvolvimento e apontar violações das regras do DSS antes mesmo do code review humano.

**Importante:** A Fase 2 continua operando sob o `MCP_READ_ONLY_CONTRACT.md`. O MCP pode ler código e apontar erros, mas **nunca** deve alterar arquivos ou aplicar correções automaticamente.

---

## 2. Arquitetura e Evolução

A Fase 2 expande a estrutura existente na pasta `/mcp` sem quebrar a compatibilidade com a Fase 1.

- **Novas Dependências:** Nenhuma dependência externa nova é estritamente necessária, mas o uso do módulo nativo `fs` e `path` do Node.js será intensificado para leitura de AST/Regex.
- **Transporte:** Continua usando `stdio`.
- **Integração:** O servidor continuará sendo compilado via `tsup` para um único arquivo ESM.

---

## 3. Novas Capacidades Expostas (Tools)

A Fase 2 adiciona três novas ferramentas focadas em validação de código e estado do projeto.

### 3.1 Tool: `validate_component_code`

- **Descrição:** Analisa o código-fonte de um componente Vue do DSS e verifica a conformidade com a arquitetura de 4 camadas, uso de tokens e regras de composição.
- **Input Schema:**
  - `componentName` (string, required): Nome do componente (ex: `DssButton`).
- **Comportamento:**
  1. Localiza a pasta do componente em `src/components/base/` ou `src/components/composed/`.
  2. Lê os arquivos `.vue` e `.scss`.
  3. Verifica a presença das 4 camadas (`1-structure`, `2-composition`, `3-variants`, `4-output`).
  4. Verifica se há cores hardcoded no SCSS (violação do Princípio #2).
  5. Verifica se há uso de `:deep()` para alterar filhos (violação do Gate de Composição v2.4).
  6. Retorna um relatório detalhado de conformidade.

### 3.2 Tool: `get_todo_list_status`

- **Descrição:** Retorna o estado atual de progresso da Fase 2 lendo o arquivo `DSS_FASE2_TODO.md`.
- **Input Schema:** Nenhum parâmetro obrigatório.
- **Comportamento:**
  1. Lê o arquivo `docs/reference/DSS_FASE2_TODO.md`.
  2. Faz parse da tabela de progresso e das listas de componentes.
  3. Retorna um JSON estruturado com o total de componentes, quantidade selada, e a lista dos próximos componentes pendentes (não bloqueados).

### 3.3 Tool: `validate_pre_prompt`

- **Descrição:** Verifica se um pré-prompt gerado para um componente cobre todos os 5 eixos obrigatórios definidos nos critérios da Fase 2.
- **Input Schema:**
  - `componentName` (string, required): Nome do componente (ex: `DssBtnGroup`).
- **Comportamento:**
  1. Localiza o arquivo em `docs/governance/pre-prompts/pre_prompt_dss_[name].md`.
  2. Verifica a presença das seções: Classificação, Risco Principal, API Mapeada, Tokens e Acessibilidade/Estados.
  3. Retorna `compliant` se todos os eixos estiverem presentes, ou `non-compliant` listando os eixos ausentes.

---

## 4. Evolução das Tools Existentes (Fase 1 → Fase 2)

A ferramenta `check_compliance` criada na Fase 1 era baseada em NLP simples (busca por palavras-chave no contexto fornecido). Na Fase 2, ela deve ser refatorada para ser mais robusta:

- **Melhoria no `check_compliance`:**
  - Adicionar suporte a regex mais avançado para detectar violações de acessibilidade (ex: `outline: none` vs `outline: transparent`).
  - Integrar a leitura do `DSS_CRITERIOS_AVALIACAO_FASE2.md` para validar os Gates v2.4 (Gate de Responsabilidade e Gate de Composição).

---

## 5. Guia de Implementação Passo a Passo

Para o agente que for executar a construção da Fase 2, o fluxo deve ser:

**Step 1 — Setup e Refatoração:**
- Criar os novos arquivos em `mcp/src/tools/`: `validateComponentCode.ts`, `getTodoListStatus.ts`, `validatePrePrompt.ts`.
- Atualizar `mcp/src/tools/index.ts` para exportar as novas tools.

**Step 2 — Implementar `get_todo_list_status`:**
- Escrever a lógica de parse do Markdown do To Do list.
- Extrair a tabela de progresso usando regex ou split de strings.

**Step 3 — Implementar `validate_pre_prompt`:**
- Escrever a lógica para ler o arquivo de pré-prompt.
- Verificar a existência dos 5 eixos obrigatórios usando regex para os headers.

**Step 4 — Implementar `validate_component_code`:**
- Esta é a tool mais complexa. Deve ler o diretório do componente.
- Verificar a existência do `dss.meta.json`.
- Ler o `<style lang="scss">` do arquivo `.vue` e aplicar regex para encontrar hardcoded colors (`#FFF`, `rgb()`) e `:deep()`.

**Step 5 — Atualizar o Servidor (`src/server.ts`):**
- Registrar as novas tools no handler `ListToolsRequestSchema`.
- Adicionar os cases no switch do handler `CallToolRequestSchema`.

**Step 6 — Build e Teste:**
- Compilar com `pnpm build`.
- Validar com o MCP Inspector testando as 3 novas tools.

---

## 6. Critérios de Aceite da Fase 2

A Fase 2 será considerada concluída quando todos os critérios abaixo forem atendidos:

| Critério | Validação |
|---|---|
| Servidor compila sem erros | `pnpm build` sem erros |
| `get_todo_list_status` funciona | Retorna JSON estruturado com o progresso atual |
| `validate_pre_prompt` funciona | Identifica corretamente se um pré-prompt está completo ou faltando eixos |
| `validate_component_code` detecta `:deep()` | Testar com um componente mock que contenha `:deep()` no SCSS |
| `validate_component_code` detecta cores hardcoded | Testar com um componente mock que contenha `color: #ff0000` |
| Contrato Read-Only mantido | Nenhuma tool realiza mutações no sistema de arquivos |

---

## 7. Integração com o Workflow do DSS

Com a Fase 2 concluída, a skill `dss-component-builder` poderá ser atualizada para utilizar o MCP. Em vez de o agente ler os arquivos Markdown diretamente, ele poderá chamar `get_todo_list_status` para saber qual o próximo componente, e `validate_component_code` para realizar a auditoria técnica de forma automatizada e determinística.
