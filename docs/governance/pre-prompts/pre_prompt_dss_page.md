# Pré-prompt de Criação de Componente DSS: DssPage

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssPage`
- **Família:** Layout Global (Composição de Terceiro Grau)
- **Nível de Composição:** Nível 4
- **Golden Reference:** `DssBadge` (Golden Reference oficial para componentes não-interativos)
- **Golden Context:** `DssLayout` (baseline arquitetural — container estrutural com lógica de min-height)
- **Contexto Estrutural:** `DssPageContainer` (container pai semântico obrigatório)
- **Componente Quasar Base:** `QPage`
- **Dependências Diretas:** Nenhuma

**Justificativa da Fase 2:** O `DssPage` é o componente que define a área de conteúdo principal da aplicação. Ele encapsula o `QPage` do Quasar, que é responsável por calcular dinamicamente a altura mínima (`min-height`) da página para garantir que o footer (se existir) fique sempre no final da tela, mesmo quando há pouco conteúdo. O DSS adiciona governança sobre o padding padrão e a semântica de acessibilidade (`role="main"`).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Quebra do Cálculo de Altura Mínima

O `QPage` nativo injeta um estilo inline (`min-height`) calculado via JavaScript com base nas dimensões da janela e dos offsets do layout. O risco é que o `DssPage` seja envolvido em uma `<div>` extra, o que faria o cálculo de altura mínima ser aplicado ao elemento errado, quebrando o comportamento de "sticky footer" do layout.

**Mitigação:** O `DssPage` deve ser um wrapper direto do `<q-page>` (EXC-01), sem elementos HTML adicionais ao redor. Ele deve repassar `$attrs` corretamente para que o Quasar possa injetar o `style` inline.

### 2.2. Gate de Responsabilidade v2.4

O `DssPage` é um **container estrutural 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é fornecer a área de conteúdo e garantir a altura mínima da página.

Ele **não é responsável** por:
1. Cor de fundo (herdada do `DssLayout` via `--dss-surface-muted`).
2. Scrollbars customizadas (isso é responsabilidade do `DssScrollArea` ou do navegador).
3. Layout interno do conteúdo (grids, flexbox, etc. são responsabilidade do desenvolvedor que consome o componente).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-page>`. O slot `default` é livre para receber qualquer conteúdo da aplicação.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `padding` (Boolean) - Aplica o padding padrão do DSS ao redor do conteúdo da página. Padrão: `false`.
- `style-fn` (Function) - Permite sobrescrever a função de cálculo de altura mínima do Quasar. O DSS deve repassar essa prop nativa sem modificações.

### 3.2. Props Bloqueadas (Governança DSS)

Nenhuma prop nativa do `QPage` precisa ser bloqueada.

## 4. Governança de Tokens e CSS

O `DssPage` aplica tokens apenas quando a prop `padding` é verdadeira.

- **Padding:** Quando `padding="true"`, o componente deve aplicar `--dss-container-padding` (que mapeia para `--dss-spacing-4` / 16px) em todos os lados. Isso substitui a classe `.q-layout-padding` nativa do Quasar, que usa valores hardcoded.
- **Cor de Fundo:** Transparente (herda `--dss-surface-muted` do `DssLayout`).
- **Cor de Texto:** Herda `--dss-text-body` do `DssLayout`.

## 5. Acessibilidade e Estados

- **Role:** O `DssPage` **deve** aplicar `role="main"` por padrão, pois representa o conteúdo principal do documento. Isso é uma melhoria de acessibilidade sobre o Quasar nativo.
- **Touch Target:** Não aplicável (componente não-interativo).
- **Estados aplicáveis:** Nenhum estado interativo.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssPage.example.vue` deve cobrir:

1. **Básico (Sem Padding):** `DssPage` padrão com conteúdo encostado nas bordas (útil para dashboards ou layouts edge-to-edge).
2. **Com Padding:** `DssPage` com a prop `padding="true"`, demonstrando o espaçamento interno governado por tokens.
3. **Sticky Footer Demo:** Uma página com pouco conteúdo para demonstrar que o `min-height` calculado empurra o footer para o final da tela.

*Nota: Todos os exemplos devem ser renderizados dentro de um `DssLayout` e `DssPageContainer` completos.*

## 7. Exceções aos Gates v2.4

### EXC-01: QPage como elemento raiz

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (uso de primitivo Quasar como raiz).
- **Justificativa:** `DssPage` usa `<q-page>` diretamente como raiz do template. O componente recebe estilos inline dinâmicos (`min-height`) calculados pelo Quasar. Envolver em `<div>` aplicaria a altura mínima ao wrapper, mas não garantiria que o `<q-page>` interno expandisse, quebrando o layout. Precedente canônico: `DssLayout`, `DssPageContainer`.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Padding**: [true, false] — alterna a prop `padding` para demonstrar o espaçamento interno governado por `--dss-container-padding`.
- **Volume de Conteúdo**: [Pouco, Muito] — controle externo que injeta 1 parágrafo ou 50 parágrafos no slot default.

### 8.2 Composite Logic

- O `DssPage` **não pode ser testado isoladamente**. Ele exige a presença de um `DssLayout` e um `DssPageContainer` pai para que o cálculo de `min-height` funcione.
- O playground **deve** renderizar um `DssLayout` com um `DssFooter` visível.
- A demonstração crítica do componente é: quando o "Volume de Conteúdo" for "Pouco", o `DssFooter` deve permanecer colado na parte inferior da tela (graças ao `min-height` do `DssPage`). Quando for "Muito", a página deve rolar normalmente.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Edge-to-Edge** | Conteúdo sem padding (padrão) | Visual | `padding="false"` |
| **Conteúdo Contido** | Conteúdo com padding DSS | Visual | `padding="true"` |
| **Sticky Footer** | Altura mínima garantindo footer no final | Comportamental | Volume de Conteúdo = Pouco |
| **Scrollable** | Altura natural excedendo a tela | Comportamental | Volume de Conteúdo = Muito |
