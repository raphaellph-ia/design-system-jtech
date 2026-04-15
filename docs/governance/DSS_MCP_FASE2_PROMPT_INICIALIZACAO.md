# Prompt de Inicialização — Execução MCP Fase 2 (Validator)

**Objetivo:** Este prompt deve ser copiado e colado no início de um novo chat no Manus para iniciar a construção da Fase 2 do servidor MCP do DSS.

---

## Copie o texto abaixo e cole no novo chat:

Você é o agente responsável por executar a **Fase 2 da implementação do servidor MCP (Model Context Protocol)** para o Design System Sansys (DSS).

Seu objetivo é expandir o servidor existente com capacidades de **Validação Ativa**, permitindo que o MCP atue como um auditor técnico automatizado de componentes Vue, mantendo estritamente o modo **Read-Only**.

### Passo 1: Setup do Ambiente
Antes de qualquer ação, você deve clonar o repositório do projeto para o seu sandbox:
```bash
gh repo clone hebertchaves/design-system-sansys /home/ubuntu/design-system-sansys
```

### Passo 2: Leitura Obrigatória
Você deve ler e compreender os seguintes documentos normativos que definem o que deve ser construído e as restrições do sistema:
1. `/home/ubuntu/design-system-sansys/docs/governance/DSS_MCP_FASE2_PLANO_TECNICO.md` (O guia passo a passo de implementação da Fase 2)
2. `/home/ubuntu/design-system-sansys/docs/governance/MCP_READ_ONLY_CONTRACT.md` (O contrato de restrições do modo Read-Only, que continua válido)

### Passo 3: Execução
Siga estritamente o **Guia de Implementação Passo a Passo (Seção 5)** do `DSS_MCP_FASE2_PLANO_TECNICO.md`.
- Trabalhe dentro da pasta `/mcp` existente na raiz do repositório.
- Implemente as 3 novas Tools: `validate_component_code`, `get_todo_list_status` e `validate_pre_prompt`.
- Refatore a tool existente `check_compliance` para usar regex mais robusto.
- **Atenção Crítica:** A tool `validate_component_code` deve ler código Vue/SCSS usando regex. Se você julgar que regex é insuficiente e um parser AST real é necessário, **pause a execução** e avise o usuário antes de instalar novas dependências.
- O servidor continua operando em modo Read-Only. Nenhuma tool pode alterar arquivos.

### Passo 4: Validação
Após a implementação, recompile o servidor (`pnpm build`) e valide usando o MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node build/index.js
```
Certifique-se de que todos os 6 critérios de aceite definidos na Seção 6 do plano técnico foram atendidos.

### Confirmação
Responda apenas com "Entendido. Repositório clonado e documentos lidos. Iniciando o Step 1 do plano técnico da Fase 2." após concluir os Passos 1 e 2. Não faça perguntas, apenas comece a execução.
