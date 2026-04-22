# Plano Técnico — DSS MCP Fase 4 (Serviço Remoto)

## 1. Objetivo
Transformar o servidor MCP do DSS, atualmente um processo local via `stdio`, em um serviço HTTP remoto hospedado na AWS. Isso permitirá que ferramentas de design (como o Figma Make) e agentes de IA (como Cursor e Claude Code) se conectem ao DSS via uma URL fixa, sem necessidade de clonar o repositório ou rodar Node.js localmente.

## 2. Arquitetura Proposta

A arquitetura escolhida é **AWS Lambda + API Gateway** com deploy automatizado via **GitHub Actions**.

### Por que AWS Lambda?
- **Custo-efetividade:** O tráfego de um servidor MCP de design system é esporádico (ocorre apenas durante sessões de design/desenvolvimento). O modelo serverless garante custo zero quando ocioso.
- **Escalabilidade:** Lida perfeitamente com picos de uso sem configuração adicional.
- **Manutenção:** Não há servidores para gerenciar ou atualizar.

### Fluxo de Dados
1. O cliente (Figma Make, Claude Code) envia uma requisição HTTP POST para a URL do API Gateway.
2. O API Gateway roteia a requisição para a função AWS Lambda.
3. A função Lambda, rodando o código do servidor MCP adaptado para HTTP, processa a requisição e retorna a resposta.

## 3. Etapas de Implementação

### Etapa 1: Adaptação do Código do Servidor MCP
O código atual em `mcp/src/server.ts` usa `StdioServerTransport`. Ele precisa ser adaptado para suportar requisições HTTP.

**Mudanças necessárias:**
- Adicionar dependência de um framework web leve (ex: `express` ou `fastify`).
- Substituir `StdioServerTransport` por `SSEServerTransport` (Server-Sent Events) ou implementar um endpoint HTTP POST simples que o SDK do MCP suporte para comunicação stateless.
- Criar um handler que receba o corpo da requisição HTTP, passe para a instância do `Server` do MCP e retorne a resposta formatada.

### Etapa 2: Preparação para AWS Lambda
Para rodar no AWS Lambda, o servidor precisa ser empacotado corretamente.

**Mudanças necessárias:**
- Adicionar a biblioteca `serverless-http` (ou similar) para envelopar a aplicação Express/Fastify e torná-la compatível com o formato de handler do Lambda.
- Atualizar o script de build no `package.json` para gerar um bundle otimizado (ex: usando `esbuild` ou `webpack`) que inclua todas as dependências, reduzindo o tempo de cold start.

### Etapa 3: Infraestrutura como Código (IaC)
Definir a infraestrutura da AWS de forma declarativa para garantir reprodutibilidade.

**Mudanças necessárias:**
- Criar um arquivo `serverless.yml` (usando o Serverless Framework) ou um template do AWS SAM/CDK na raiz do diretório `mcp/`.
- Configurar a função Lambda, o API Gateway e as permissões necessárias.

### Etapa 4: Pipeline de CI/CD no GitHub Actions
Automatizar o deploy para que o servidor MCP remoto esteja sempre sincronizado com a branch `main`.

**Mudanças necessárias:**
- Criar um workflow em `.github/workflows/deploy-mcp.yml`.
- Configurar os secrets da AWS (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) no repositório GitHub.
- O workflow deve:
  1. Fazer checkout do código.
  2. Instalar dependências (`npm install`).
  3. Rodar o build (`npm run build`).
  4. Executar o deploy para a AWS (ex: `npx serverless deploy`).

## 4. Impacto na Segurança
- O servidor MCP expõe informações do repositório (tokens, componentes, documentação).
- Como o serviço será público via URL, é recomendável implementar uma camada de autenticação simples (ex: API Key via header `Authorization`) no API Gateway para evitar acesso não autorizado.

## 5. Resultado Esperado
Ao final da Fase 4, a equipe terá uma URL (ex: `https://api.sansys.aws.com/mcp`) que poderá ser inserida diretamente nas configurações do Figma Make ou do Claude Code, conectando instantaneamente a ferramenta ao ecossistema do DSS.
