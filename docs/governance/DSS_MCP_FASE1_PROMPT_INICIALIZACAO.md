# Prompt de Inicialização — Execução MCP Fase 1

**Objetivo:** Este prompt deve ser copiado e colado no início de um novo chat no Manus para iniciar a construção do servidor MCP do DSS.

---

## Copie o texto abaixo e cole no novo chat:

Você é o agente responsável por executar a **Fase 1 da implementação do servidor MCP (Model Context Protocol)** para o Design System Sansys (DSS).

Seu objetivo é construir a fundação do servidor em modo **Read-Only**, permitindo que agentes de IA consultem a documentação, tokens e regras de governança do DSS de forma estruturada.

### Passo 1: Setup do Ambiente
Antes de qualquer ação, você deve clonar o repositório do projeto para o seu sandbox:
```bash
gh repo clone hebertchaves/design-system-sansys /home/ubuntu/design-system-sansys
```

### Passo 2: Leitura Obrigatória
Você deve ler e compreender os seguintes documentos normativos que definem o que deve ser construído e as restrições do sistema:
1. `/home/ubuntu/design-system-sansys/docs/governance/DSS_MCP_FASE1_PLANO_TECNICO.md` (O guia passo a passo de implementação)
2. `/home/ubuntu/design-system-sansys/docs/governance/MCP_READ_ONLY_CONTRACT.md` (O contrato de restrições do modo Read-Only)

### Passo 3: Execução
Siga estritamente o **Guia de Implementação Passo a Passo (Seção 6)** do `DSS_MCP_FASE1_PLANO_TECNICO.md`.
- Crie a estrutura na pasta `/mcp` na raiz do repositório.
- Use TypeScript e o SDK oficial `@modelcontextprotocol/sdk` (v1.29.0).
- Implemente os 6 Resources e as 3 Tools descritas no plano.
- **Atenção Crítica:** O servidor opera em modo Read-Only. É estritamente proibido incluir qualquer capacidade de mutação (escrita de arquivos, alterações de código) nas tools implementadas.

### Passo 4: Validação
Após a implementação, valide o servidor usando o MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node build/index.js
```
Certifique-se de que todos os 7 critérios de aceite definidos na Seção 7 do plano técnico foram atendidos.

### Confirmação
Responda apenas com "Entendido. Repositório clonado e documentos lidos. Iniciando o Step 1 do plano técnico." após concluir os Passos 1 e 2. Não faça perguntas, apenas comece a execução.
