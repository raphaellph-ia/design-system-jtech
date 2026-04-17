# Pré-prompt de Criação de Componente DSS: DssHeader

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto
- **Nome do Componente:** `DssHeader`
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Golden Reference:** `DssCard` (como container estrutural de alto nível)
- **Golden Context:** `DssLayout` (container pai futuro, Nível 4)
- **Componente Quasar Base:** `QHeader`
- **Dependência Direta:** `DssToolbar` (Nível 1)

**Justificativa da Fase 2:** O `DssHeader` é o container superior de layout de página. Como componente de Nível 3, ele orquestra componentes de Nível 1 (`DssToolbar`) e interage diretamente com o sistema de layout do Quasar (`QLayout`).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Injeção de Layout e Z-Index
O `QHeader` nativo injeta variáveis CSS no `QLayout` pai para calcular o offset do conteúdo da página e gerencia seu próprio `z-index` para ficar sobreposto ao conteúdo rolado. O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar ou cause problemas de empilhamento (z-index) com modais e drawers.
**Mitigação:** O `DssHeader` **não deve** alterar o `z-index` nativo nem as propriedades de posicionamento (`position: fixed/absolute`) aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation) e cores de fundo.

### 2.2. Gate de Responsabilidade v2.4
O `DssHeader` é um **container estrutural de layout 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo no topo da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo rolado.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-header>`. O slot `default` é destinado **exclusivamente** a componentes `DssToolbar` (ou `DssTabs` em cenários específicos de navegação global). O uso de HTML nativo ou texto solto diretamente no `DssHeader` viola a governança de Nível 3.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `elevated` (Boolean) - Aplica a sombra padrão de elevação do DSS para destacar o header do conteúdo da página.
- `bordered` (Boolean) - Aplica uma borda inferior sutil em vez de sombra (alternativa ao `elevated` para layouts mais flat).
- `reveal` (Boolean) - Permite que o header se esconda ao rolar a página para baixo e reapareça ao rolar para cima (comportamento nativo do Quasar repassado via `$attrs`).

### 3.2. Props Bloqueadas (Governança DSS)
- `height-hint` - Bloqueada. A altura é calculada automaticamente pelo Quasar com base no conteúdo (`DssToolbar`).
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso.

## 4. Governança de Tokens e CSS

O `DssHeader` deve utilizar os seguintes tokens:
- **Elevação (Elevated):** `--dss-shadow-2` (sombra padrão para headers/navbars).
- **Borda (Bordered):** `--dss-border-width-sm` solid `--dss-border-subtle`.
- **Cor de Fundo:** O `QHeader` nativo aplica a cor `primary` por padrão. O `DssHeader` deve sobrescrever isso para `--dss-surface-base` (fundo branco/escuro padrão), delegando a responsabilidade de cor (brand) para o `DssToolbar` interno.

## 5. Acessibilidade e Estados

- **Role:** O `QHeader` nativamente recebe `role="banner"`. O `DssHeader` deve preservar essa semântica, que é a correta para cabeçalhos de página (landmarks).
- **Estados aplicáveis:** `elevated`, `bordered`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssHeader.example.vue` deve cobrir:
1. **Básico:** Header simples contendo um `DssToolbar` com título.
2. **Elevated:** Header com a prop `elevated` ativa (com sombra).
3. **Bordered:** Header com a prop `bordered` ativa (com borda inferior).
4. **Com Brand:** Header contendo um `DssToolbar` com a prop `brand="primary"` (demonstrando que a cor vem do toolbar, não do header).
5. **Com Múltiplos Toolbars:** Header contendo dois `DssToolbar` empilhados (ex: um para ações globais, outro para navegação de seção).

> **Nota para o Exemplo:** Como o `DssLayout` (Nível 4) ainda não existe, os exemplos do `DssHeader` devem ser encapsulados em um `<q-layout view="hHh lpR fFf" style="min-height: 300px">` nativo temporariamente, para que o header renderize corretamente no Storybook/Playground.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QLayout no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssHeader` requer um contexto de layout para funcionar (elevação, posicionamento fixo). Como o `DssLayout` (Nível 4) ainda não foi construído, é estritamente necessário usar o `<q-layout>` nativo **apenas no arquivo `DssHeader.example.vue`** para fins de demonstração. O código fonte do componente (`DssHeader.ts.vue`) permanece 100% aderente aos gates.
