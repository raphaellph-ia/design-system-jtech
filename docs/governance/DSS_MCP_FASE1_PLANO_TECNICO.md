# DSS MCP — Plano Técnico da Fase 1 (Read-Only Foundation)

## 1. Visão Geral

Este documento detalha a implementação técnica da **Fase 1** do servidor MCP (Model Context Protocol) para o Design System Sansys (DSS).

O objetivo desta fase é estabelecer a fundação do servidor em modo **Read-Only**, permitindo que agentes de IA (como Claude ou Manus) consultem a documentação, tokens e regras de governança do DSS de forma estruturada, sem capacidade de mutação.

Esta implementação segue estritamente o contrato definido em `MCP_READ_ONLY_CONTRACT.md`.

---

## 2. Arquitetura e Stack Tecnológica

O servidor será construído como um pacote Node.js/TypeScript integrado ao monorepo existente do DSS.

- **Linguagem:** TypeScript
- **Runtime:** Node.js (compatível com o ambiente atual do projeto)
- **SDK Base:** `@modelcontextprotocol/sdk` (versão 1.x estável — versão atual: 1.29.0)
- **Transporte:** `stdio` (Standard I/O), padrão para integração local com Claude Desktop e Cursor
- **Localização:** Diretório `/mcp` na raiz do repositório `design-system-sansys`

---

## 3. Estrutura de Diretórios

A implementação criará a seguinte estrutura dentro do repositório:

```text
design-system-sansys/
└── mcp/
    ├── package.json           # Dependências isoladas do servidor MCP
    ├── tsconfig.json          # Configuração TypeScript
    ├── src/
    │   ├── index.ts           # Ponto de entrada e inicialização do servidor
    │   ├── server.ts          # Configuração do MCP Server e transporte stdio
    │   ├── resources/         # Lógica de exposição de arquivos como Resources
    │   │   └── index.ts
    │   └── tools/             # Implementação das ferramentas (Tools)
    │       ├── index.ts
    │       ├── queryComponent.ts
    │       ├── queryToken.ts
    │       └── checkCompliance.ts
    └── build/                 # Código compilado (gerado, não versionado)
```

---

## 4. Dependências Necessárias

O `package.json` dentro da pasta `/mcp` deverá incluir:

**Dependencies:**

| Pacote | Versão | Finalidade |
|---|---|---|
| `@modelcontextprotocol/sdk` | `^1.29.0` | SDK base do protocolo MCP |
| `zod` | `^3.x` | Validação de schemas de input das tools |

**Dev Dependencies:**

| Pacote | Finalidade |
|---|---|
| `typescript` | Compilação TypeScript |
| `@types/node` | Tipos Node.js |
| `tsup` | Build rápido para Node.js |

---

## 5. Capacidades Expostas (Capabilities)

A Fase 1 implementará duas das três capacidades principais do protocolo MCP: **Resources** e **Tools**. Prompts não serão utilizados nesta fase.

### 5.1 Resources (Recursos Estáticos)

Os Resources permitem que o LLM leia arquivos inteiros sob demanda. O servidor exporá os seguintes documentos normativos do DSS como recursos com URIs `dss://`:

| URI do Resource | Arquivo Mapeado | Descrição |
|---|---|---|
| `dss://governance/claude` | `/CLAUDE.md` | Regras normativas e arquitetura base |
| `dss://governance/faseamento` | `/docs/reference/DSS_FASEAMENTO_COMPONENTES.md` | Classificação e fases dos componentes |
| `dss://governance/tokens` | `/docs/reference/DSS_TOKEN_REFERENCE.md` | Referência completa de tokens |
| `dss://governance/golden-model` | `/docs/governance/DSS_GOLDEN_COMPONENTS.md` | Modelo de referência para componentes |
| `dss://governance/criterios-fase2` | `/docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md` | Critérios de avaliação da Fase 2 |
| `dss://todo/fase2` | `/docs/reference/DSS_FASE2_TODO.md` | Estado atual do To Do list da Fase 2 |

### 5.2 Tools (Ferramentas Dinâmicas)

As Tools permitem que o LLM faça consultas específicas com parâmetros. As seguintes ferramentas serão implementadas:

#### Tool: `query_component`

- **Descrição:** Retorna informações detalhadas sobre um componente específico do DSS.
- **Input Schema:**
  - `componentName` (string, required): Nome do componente (ex: `DssButton`).
- **Comportamento:** Lê o `dss.meta.json` do componente, busca seu pré-prompt em `docs/governance/pre-prompts/` e retorna um resumo consolidado com status de conformidade.

#### Tool: `query_token`

- **Descrição:** Busca a definição e regras de uso de um token específico ou categoria.
- **Input Schema:**
  - `tokenName` (string, optional): Nome exato do token (ex: `--dss-color-brand-primary`).
  - `category` (string, optional): Categoria (ex: `color`, `spacing`, `radius`).
- **Comportamento:** Faz parse do `DSS_TOKEN_REFERENCE.md` e retorna apenas a seção relevante ao token ou categoria solicitada.

#### Tool: `check_compliance`

- **Descrição:** Avalia se um uso descrito está em conformidade com as regras do DSS. Modo Read-Only: apenas avalia, nunca corrige ou sugere mutações.
- **Input Schema:**
  - `context` (string, required): Descrição do uso a ser avaliado (ex: `"Usar DssCard com border-radius de 8px"`).
  - `ruleType` (string, required): Tipo de regra a validar — `"composition"`, `"token"` ou `"accessibility"`.
- **Comportamento:** Cruza o contexto fornecido com as regras do `CLAUDE.md` e `DSS_CRITERIOS_AVALIACAO_FASE2.md` e retorna um parecer técnico baseado em fatos, sem autonomia criativa.

---

## 6. Guia de Implementação Passo a Passo

Para o agente que for executar a construção, o fluxo deve ser:

**Step 1 — Setup do Ambiente:**
- Criar a pasta `mcp/` na raiz do repositório.
- Inicializar o `package.json` com `name: "@sansys/dss-mcp"`.
- Instalar `@modelcontextprotocol/sdk` e `zod`.
- Configurar o `tsconfig.json` com `"module": "ESNext"` e `"target": "ES2022"`.

**Step 2 — Servidor Base (`src/server.ts`):**
- Instanciar a classe `Server` do SDK com `name: "dss-mcp"` e `version: "1.0.0"`.
- Configurar o `StdioServerTransport`.
- Conectar o transporte ao servidor via `server.connect(transport)`.

**Step 3 — Resources (`src/resources/index.ts`):**
- Implementar o handler para `ListResourcesRequestSchema` retornando o array de recursos mapeados.
- Implementar o handler para `ReadResourceRequestSchema` mapeando as URIs `dss://` para os caminhos reais no sistema de arquivos via `fs.readFileSync`.

**Step 4 — Tools (`src/tools/`):**
- Implementar o handler para `ListToolsRequestSchema` definindo os schemas Zod de cada tool.
- Implementar o handler para `CallToolRequestSchema` com a lógica de leitura e parse dos arquivos do DSS para cada tool.

**Step 5 — Build e Teste:**
- Adicionar script `"build": "tsup src/index.ts --format esm --out-dir build"` no `package.json`.
- Compilar com `pnpm build`.
- Testar a execução: `node build/index.js`.
- Validar com o MCP Inspector: `npx @modelcontextprotocol/inspector node build/index.js`.

---

## 7. Critérios de Aceite da Fase 1

A Fase 1 será considerada concluída quando todos os critérios abaixo forem atendidos:

| Critério | Validação |
|---|---|
| Servidor compila sem erros TypeScript | `pnpm build` sem erros |
| Servidor inicia via stdio sem falhas | `node build/index.js` sem crash |
| Cliente MCP consegue listar Resources | MCP Inspector lista os 6 recursos |
| Cliente MCP consegue listar Tools | MCP Inspector lista as 3 tools |
| `query_component` retorna dados reais | Testar com `DssCard` |
| `query_token` retorna seção correta | Testar com `--dss-color-brand-primary` |
| Nenhuma capacidade de mutação presente | Revisão manual do código — zero `fs.writeFile` ou equivalente |

---

## 8. Integração com Claude Desktop (Pós-Fase 1)

Após a Fase 1 estar funcional, o servidor poderá ser conectado ao Claude Desktop adicionando a seguinte configuração no `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "dss": {
      "command": "node",
      "args": ["/caminho/para/design-system-sansys/mcp/build/index.js"]
    }
  }
}
```

---

## 9. Referências

- `MCP_READ_ONLY_CONTRACT.md` — Contrato formal de operação em modo Read-Only
- `DSS_OBSERVABILITY_BASELINE.md` — Princípios e taxonomia de eventos
- `DSS_OBSERVABILITY_ACTORS.md` — Atores do sistema de observabilidade
- `DSS_OBSERVABILITY_SIGNALS.md` — 9 sinais canônicos em 6 categorias
