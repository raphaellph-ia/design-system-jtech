# Pré-prompt de Criação de Componente DSS: DssToolbarTitle

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssToolbarTitle`
- **Família:** Estrutura de Página (Composição de Primeiro Grau)
- **Nível de Composição:** Nível 2
- **Golden Reference:** `DssBadge` (Golden Reference oficial para componentes não-interativos)
- **Golden Context:** `DssItemLabel` (baseline de auditoria — tipográfico, não-interativo, EXC-01 precedente)
- **Contexto Estrutural:** `DssToolbar` (container pai semântico — não é Golden Context arquitetural)
- **Componente Quasar Base:** `QToolbarTitle`
- **Dependências Diretas:** Nenhuma (depende apenas de tipografia)

**Justificativa da Fase 2:** O `DssToolbarTitle` é um componente tipográfico projetado especificamente para viver dentro do `DssToolbar`. Ele encapsula o `QToolbarTitle` do Quasar, substituindo a tipografia nativa hardcoded pelos tokens semânticos do DSS, garantindo consistência visual em cabeçalhos e barras de ferramentas.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Herança de Tipografia Incorreta

O `QToolbarTitle` nativo aplica estilos tipográficos próprios (`font-size: 21px`, `font-weight: normal`, `letter-spacing: 0.01em`). O risco é que o `DssToolbarTitle` não sobrescreva esses valores corretamente, resultando em uma tipografia que não pertence à escala do DSS.

**Mitigação:** O `DssToolbarTitle` deve sobrescrever explicitamente a tipografia nativa usando os tokens de heading do DSS (ex: `--dss-heading-4-size`, `--dss-heading-4-weight`).

### 2.2. Gate de Responsabilidade v2.4

O `DssToolbarTitle` é responsável por:
1. Fornecer o container de texto flexível (`flex: 1 1 0%`) dentro da toolbar.
2. Aplicar a tipografia correta do DSS para títulos de página/seção.
3. Gerenciar o truncamento de texto (ellipsis) quando o espaço for insuficiente.

Ele **não é responsável** por:
1. Cor do texto (herdada do `DssToolbar` pai via cascata ou `[data-brand]`).
2. Interatividade (não possui hover, focus ou active).
3. Alinhamento vertical (gerenciado pelo `DssToolbar` pai).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-toolbar-title>`. O slot `default` é destinado a texto simples ou elementos inline. O uso de componentes de bloco ou layouts complexos dentro do `DssToolbarTitle` viola sua semântica tipográfica.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `shrink` (Boolean) — Permite que o título encolha (shrink) em vez de crescer (grow) para ocupar o espaço disponível. Útil quando há múltiplos títulos ou elementos flexíveis na mesma toolbar.

### 3.2. Props Bloqueadas (Governança DSS)

```json
"propsBlocked": ["active", "color"],
"propsBlockedJustification": {
  "active": "O DssToolbarTitle não possui estado ativo. A navegação é feita via DssTab ou DssMenu.",
  "color": "A cor do texto é herdada do DssToolbar pai (que gerencia a brand) para garantir contraste acessível."
}
```

## 4. Governança de Tokens e CSS

O `DssToolbarTitle` deve utilizar os seguintes tokens tipográficos para sobrescrever o padrão do Quasar:

- **Font Family:** `--dss-font-family-sans`
- **Font Size:** `--dss-heading-4-size` (20px) — substitui os 21px nativos
- **Font Weight:** `--dss-heading-4-weight` (Medium/500) — substitui o normal/400 nativo
- **Line Height:** `--dss-heading-4-line-height` (1.2)
- **Letter Spacing:** `normal` (remove o 0.01em nativo)

*Nota: A cor do texto (`color`) não deve ser definida no componente, permitindo que ele herde `--dss-text-body` ou `--dss-text-inverse` do `DssToolbar` pai.*

## 5. Acessibilidade e Estados

- **Role:** O `QToolbarTitle` não aplica um role específico. O texto deve ser semanticamente claro. Se for o título principal da página, o consumidor deve envolvê-lo em uma tag `<h1>` via slot, ou o componente deve permitir a prop `tag="h1"`.
- **Touch Target:** Não aplicável (componente não-interativo).
- **Estados aplicáveis:** Nenhum estado interativo. O componente reage passivamente ao dark mode e alto contraste herdando as cores do pai.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssToolbarTitle.example.vue` deve cobrir:

1. **Básico:** `DssToolbarTitle` padrão dentro de um `DssToolbar` com botões nas extremidades.
2. **Truncamento (Ellipsis):** Título muito longo em uma toolbar estreita para demonstrar o truncamento automático.
3. **Com Shrink:** Uso da prop `shrink` ao lado de outro elemento flexível.
4. **Com Brand:** `DssToolbarTitle` dentro de um `DssToolbar brand="hub"` para demonstrar a herança correta da cor do texto (branco sobre fundo colorido).

## 7. Exceções aos Gates v2.4

### EXC-01: Sobrescrita de Tipografia Nativa

- **Regra Violada:** Gate de Composição v2.4 — Regra 2 (Proibição de sobrescrever estilos internos do Quasar).
- **Justificativa:** O `QToolbarTitle` aplica estilos tipográficos hardcoded na classe `.q-toolbar__title`. A única forma de garantir que o título use a escala tipográfica do DSS (Heading 4) é sobrescrevendo essas propriedades via CSS no `.dss-toolbar-title`. Precedente canônico: `DssItemLabel` (EXC-01).

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Texto do Título**: [Input de texto] — permite testar diferentes comprimentos de string e o comportamento de truncamento.
- **Shrink**: [true, false] — permite testar o comportamento flexbox do título (prop `shrink`).
- **Contexto (Brand do Pai)**: [default, hub, water, waste] — controle externo que altera a prop `brand` do `DssToolbar` pai para demonstrar a herança de cor.
- **Largura do Container**: [100%, 300px, 200px] — controle externo para forçar o truncamento do texto (ellipsis).

### 8.2 Composite Logic

- O `DssToolbarTitle` é estritamente um componente filho do `DssToolbar`.
- Ele **não possui cor própria**; herda a cor do texto do `DssToolbar` pai (que alterna entre `--dss-text-body` e `--dss-text-inverse` dependendo da brand ativa).
- O comportamento de truncamento (ellipsis) é nativo, mas depende do contexto flexbox fornecido pelo `DssToolbar` pai.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Repouso** | Título com tipografia Heading 4 do DSS | Visual | Padrão |
| **Truncado (Ellipsis)** | Título longo cortado com "..." no final | Visual | Reduzir largura do container ou inserir texto longo |
| **Shrink Ativo** | Título ocupa apenas o espaço necessário | Visual | Prop `shrink=true` |
| **Sobre Brand (Inverso)** | Texto branco sobre fundo colorido | Visual | Configurar `brand` no DssToolbar pai |
| **Modo Escuro** | Cor do texto ajustada automaticamente via herança | Visual | Toggle de tema |
| **Alto Contraste** | Tipografia legível em modo de alto contraste | Visual | Ativar prefers-contrast |
