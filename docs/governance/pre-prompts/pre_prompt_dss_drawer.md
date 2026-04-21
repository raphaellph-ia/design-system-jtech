# Pré-prompt: DssDrawer (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssDrawer` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssDrawer`
- **Família:** Layout (Estrutura de Página)
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Golden Reference:** `DssHeader` (como container estrutural de layout)
- **Golden Context:** `DssHeader` (componente com Selo v2.2 de mesma família e arquitetura)
- **Componente Quasar Base:** `QDrawer`
- **Dependência Direta:** `DssList`, `DssMenu` (Nível 2)

**Justificativa da Fase 2:** O `DssDrawer` é o painel lateral de navegação (sidebar). Como componente de Nível 3, ele orquestra componentes de Nível 2 (`DssList`, `DssMenu`) e interage diretamente com o sistema de layout do Quasar (`QLayout`).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Injeção de Layout, Z-Index e Backdrop
O `QDrawer` nativo injeta variáveis CSS no `QLayout` pai para calcular o offset do conteúdo da página, gerencia seu próprio `z-index` e cria um elemento de backdrop quando em modo overlay (mobile). O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar, cause problemas de empilhamento ou altere a opacidade padrão do backdrop.

**Mitigação:** O `DssDrawer` **não deve** alterar o `z-index` nativo nem as propriedades de posicionamento aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation), cores de fundo e largura padrão. O backdrop deve usar o token `--dss-opacity-backdrop` (0.75) caso o Quasar permita customização via CSS, ou aceitar o padrão nativo se for hardcoded.

### 2.2. Gate de Responsabilidade v2.4
O `DssDrawer` é um **container estrutural de layout 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo na lateral da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo principal. A interatividade de navegação pertence exclusivamente aos `DssList` e `DssItem`s contidos nele.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-drawer>`. O slot `default` é destinado **exclusivamente** a componentes de navegação (`DssList`, `DssMenu`) ou cabeçalhos de seção. O uso de HTML nativo ou texto solto diretamente no `DssDrawer` viola a governança de Nível 3.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `modelValue` (Boolean) - Controla a visibilidade do drawer (v-model).
- `side` (String) - Lado do drawer: `'left'` (padrão) ou `'right'`.
- `overlay` (Boolean) - Força o drawer a sobrepor o conteúdo da página em vez de empurrá-lo.
- `elevated` (Boolean) - Aplica a sombra padrão de elevação do DSS.
- `bordered` (Boolean) - Aplica uma borda sutil separando o drawer do conteúdo.
- `mini` (Boolean) - Modo minimizado (apenas ícones).
- `width` (Number) - Largura do drawer em pixels (padrão: 256px, equivalente a `--dss-spacing-64`).

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueada. O DSS gerencia dark mode via CSS global (`[data-theme="dark"]`).
- `behavior` - Bloqueada. O comportamento responsivo é padronizado pelo DSS (desktop = empurra conteúdo, mobile = overlay).
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso.

## 4. Governança de Tokens e CSS

O `DssDrawer` deve utilizar os seguintes tokens:
- **Largura Padrão:** 256px (equivalente a `--dss-spacing-64`).
- **Elevação (Elevated):** `--dss-elevation-2` (sombra padrão para painéis laterais).
- **Borda (Bordered):** `--dss-border-width-thin` solid `--dss-gray-200`. Se `side="left"`, aplica `border-right`. Se `side="right"`, aplica `border-left`.
- **Cor de Fundo:** O `QDrawer` nativo aplica fundo branco. O `DssDrawer` deve garantir o uso de `--dss-surface-default` para suportar dark mode corretamente.
- **Backdrop:** `--dss-opacity-backdrop` (0.75) para o fundo escuro quando em modo overlay/mobile. **Token confirmado** no catálogo DSS_TOKEN_REFERENCE.md linha 569, documentado explicitamente para uso em "modal/dialog/drawer". Nenhuma reserva necessária.

## 5. Acessibilidade e Estados

- **Role:** O `QDrawer` não aplica um role específico nativamente na maioria dos casos. O `DssDrawer` deve aplicar `role="navigation"` se for usado primariamente para navegação, ou `role="complementary"` se for um painel lateral de informações. Como o uso principal é navegação, recomenda-se `role="navigation"` por padrão.
- **Aria-label:** Recomendado via `$attrs`: `<DssDrawer aria-label="Menu principal">`.
- **Estados aplicáveis:** `elevated`, `bordered`, `mini`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssDrawer.example.vue` deve cobrir:
1. **Básico:** Drawer esquerdo simples contendo um `DssList` de navegação.
2. **Elevated:** Drawer com a prop `elevated` ativa (com sombra).
3. **Bordered:** Drawer com a prop `bordered` ativa (com borda lateral).
4. **Mini Mode:** Drawer com a prop `mini` ativa (apenas ícones visíveis).
5. **Right Side:** Drawer posicionado à direita (`side="right"`).

> **Nota para o Exemplo:** Como o `DssLayout` (Nível 4) ainda não existe, os exemplos do `DssDrawer` devem ser encapsulados em um `<q-layout view="hHh lpR fFf" style="min-height: 400px">` nativo temporariamente, para que o drawer renderize corretamente no Storybook/Playground.
>
> **Atenção:** O Exemplo 5 (`side="right"`) deve usar obrigatoriamente `view="hHh lpR fFf"` (uppercase `R`) — **não** `view="hHh lpr fFf"` (lowercase `r`). O `R` maiúsculo indica que o drawer direito ocupa a altura total entre header e footer. O `r` minúsculo posiciona o drawer abaixo do header, quebrando o layout visual esperado. (NC-01 da auditoria — corrigido neste pré-prompt.)

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QLayout no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssDrawer` requer um contexto de layout para funcionar (posicionamento, injeção de margens). Como o `DssLayout` (Nível 4) ainda não foi construído, é estritamente necessário usar o `<q-layout>` nativo **apenas no arquivo `DssDrawer.example.vue`** para fins de demonstração. O código fonte do componente (`DssDrawer.ts.vue`) permanece 100% aderente aos gates. Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md.

### EXC-02: Uso de !important para sobrescrever background-color
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** Para garantir que `--dss-surface-default` governe o fundo e suporte dark mode corretamente, é necessário `!important` no escopo do `.dss-drawer`. Precedente: `DssHeader`, `DssFooter`.

---

## 8. Nota de Curadoria de Catálogo (GAP-02 da Auditoria — ✅ RESOLVIDO)

O token `--dss-surface-default` e toda a família `--dss-surface-*` foram adicionados ao `DSS_TOKEN_REFERENCE.md` na **Seção 4.7 — Surface Hierarchy** (Abr 2026), cobrindo 12 tokens em 3 subfamílias (Hierarchy, States, Brand).

**Status:** ✅ Gap resolvido. O catálogo oficial agora documenta `--dss-surface-default`, `--dss-surface-subtle`, `--dss-surface-muted`, `--dss-surface-overlay`, os 4 tokens de estado (`hover`, `active`, `selected`, `disabled`) e os 4 tokens de brand (`brand-subtle`, `brand-light`, `brand-medium`, `brand-strong`). Nenhuma ação adicional necessária para novos componentes que usem esses tokens.

---

## 9. Histórico

| Data | Evento |
|------|--------|
| 2026-04-19 | Pré-prompt criado pelo Chat Estratégico (Manus) |
| 2026-04-19 | Componente implementado pelo Claude |
| 2026-04-19 | Auditoria DSS v2.5 executada — 1 NC não-bloqueante, 5 GAPs identificados |
| 2026-04-19 | NC-01 corrigida no pré-prompt (view string do Exemplo 5); GAP-01 e GAP-02 documentados |
