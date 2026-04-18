# Pré-prompt: DssFooter (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssFooter` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssFooter`
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Golden Reference:** `DssCard` (como container estrutural de alto nível)
- **Golden Context:** `DssHeader` (componente com Selo v2.2 de mesma família e arquitetura). *Nota: Golden Context original era DssLayout, corrigido para DssHeader conforme definição formal de Golden Context.*
- **Componente Quasar Base:** `QFooter`
- **Dependência Direta:** `DssToolbar` (Nível 1)

**Justificativa da Fase 2:** O `DssFooter` é o container inferior de layout de página, par simétrico do `DssHeader`. Como componente de Nível 3, ele orquestra componentes de Nível 1 (`DssToolbar`) e interage diretamente com o sistema de layout do Quasar (`QLayout`).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Injeção de Layout e Z-Index
Assim como o `QHeader`, o `QFooter` nativo injeta variáveis CSS no `QLayout` pai para calcular o offset do conteúdo da página e gerencia seu próprio `z-index` para ficar sobreposto ao conteúdo rolado. O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar ou cause problemas de empilhamento (z-index) com modais e drawers.

**Mitigação:** O `DssFooter` **não deve** alterar o `z-index` nativo nem as propriedades de posicionamento (`position: fixed/absolute`) aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation) e cores de fundo.

### 2.2. Gate de Responsabilidade v2.4
O `DssFooter` é um **container estrutural de layout 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo no rodapé da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo rolado.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-footer>`. O slot `default` é destinado **exclusivamente** a componentes `DssToolbar` (ou `DssTabs` em cenários específicos de navegação global). O uso de HTML nativo ou texto solto diretamente no `DssFooter` viola a governança de Nível 3.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `elevated` (Boolean) - Aplica a sombra padrão de elevação do DSS para destacar o footer do conteúdo da página (sombra invertida, projetada para cima).
- `bordered` (Boolean) - Aplica uma borda superior sutil em vez de sombra (alternativa ao `elevated` para layouts mais flat).
- `reveal` (Boolean) - Permite que o footer se esconda ao rolar a página para baixo e reapareça ao rolar para cima (comportamento nativo do Quasar repassado via `$attrs`).

### 3.2. Props Bloqueadas (Governança DSS)
- `height-hint` - Bloqueada. A altura é calculada automaticamente pelo Quasar com base no conteúdo (`DssToolbar`).
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso.

## 4. Governança de Tokens e CSS

O `DssFooter` deve utilizar os seguintes tokens:
- **Elevação (Elevated):** `--dss-elevation-2` / `--dss-shadow-md` (sombra padrão para footers/navbars). *Nota: Como o token de sombra invertida não existe (`--dss-elevation-up-*`), deve-se documentar uma exceção (EXC-05) com o valor equivalente invertido de `--dss-shadow-md`.*
- **Borda (Bordered):** `--dss-border-width-sm` solid `--dss-border-subtle` (aplicada no `border-top`).
- **Cor de Fundo:** O `QFooter` nativo aplica a cor `primary` por padrão. O `DssFooter` deve sobrescrever isso para `--dss-surface-base` (fundo branco/escuro padrão), delegando a responsabilidade de cor (brand) para o `DssToolbar` interno.

## 5. Acessibilidade e Estados

- **Role:** O `QFooter` nativamente recebe `role="contentinfo"`. O `DssFooter` deve preservar essa semântica, que é a correta para rodapés de página (landmarks).
- **Estados aplicáveis:** `elevated`, `bordered`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssFooter.example.vue` deve cobrir:
1. **Básico:** Footer simples contendo um `DssToolbar` com texto de copyright ou links.
2. **Elevated:** Footer com a prop `elevated` ativa (com sombra projetada para cima).
3. **Bordered:** Footer com a prop `bordered` ativa (com borda superior).
4. **Com Brand:** Footer contendo um `DssToolbar` com a prop `brand="primary"` (demonstrando que a cor vem do toolbar, não do footer).
5. **Com Múltiplos Toolbars:** Footer contendo dois `DssToolbar` empilhados (ex: um para navegação secundária, outro para copyright).

> **Nota para o Exemplo:** Como o `DssLayout` (Nível 4) ainda não existe, os exemplos do `DssFooter` devem ser encapsulados em um `<q-layout view="hHh lpR fFf" style="min-height: 300px">` nativo temporariamente, para que o footer renderize corretamente no Storybook/Playground.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QLayout no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssFooter` requer um contexto de layout para funcionar (elevação, posicionamento fixo). Como o `DssLayout` (Nível 4) ainda não foi construído, é estritamente necessário usar o `<q-layout>` nativo **apenas no arquivo `DssFooter.example.vue`** para fins de demonstração. O código fonte do componente (`DssFooter.ts.vue`) permanece 100% aderente aos gates. Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md — exemplo.vue tem contexto de scaffolding.

### EXC-02: Uso de !important para sobrescrever background-color do QFooter
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** O `QFooter` do Quasar aplica `bg-primary !important` via sistema de classes utilitárias quando a prop `color` não é passada. Para que `--dss-surface-default` governe o fundo, é necessário `!important`. A prop `color` do `QFooter` é bloqueada no `DssFooter` (governança DSS). Este `!important` é estritamente contido no escopo do elemento `.dss-footer` e não afeta filhos.

### EXC-03: System color keywords em forced-colors mode
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** Em forced-colors mode, system color keywords (`Canvas`, `CanvasText`, `ButtonFace`) são obrigatórios, pois tokens CSS são ignorados pelo navegador. Padrão canônico DSS.

### EXC-04: Valores hardcoded em @media print
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** Em impressão monocromática, tokens CSS podem não ser resolvidos. Valores hardcoded garantem legibilidade. `position: static` cancela o `position: fixed` do `QFooter` para evitar que o footer apareça flutuando na impressão. Precedente: `DssHeader`, `DssToolbar`.

---

## 8. Histórico de Auditoria

- **18 Abr 2026:** Componente auditado e selado. GAPs documentais corrigidos neste pré-prompt (Golden Context ajustado para DssHeader; token de elevação corrigido com nota sobre EXC-05).
