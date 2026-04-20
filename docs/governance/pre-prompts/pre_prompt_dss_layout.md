# Pré-prompt: DssLayout (Fase 2)

Este documento define as diretrizes arquiteturais e de governança para a criação do componente `DssLayout` na Fase 2 do Design System Sansys (DSS). O agente executor (Claude) deve seguir estas instruções rigorosamente para garantir a conformidade com os gates de qualidade.

---

## 1. Classificação e Contexto

- **Nome do Componente:** `DssLayout`
- **Família:** Layout Global
- **Nível de Composição:** Nível 4 (Composição de Terceiro Grau)
- **Golden Reference:** `DssCard` (como container estrutural base)
- **Golden Context:** `DssHeader` / `DssDrawer` (componentes de layout que interagem diretamente com ele)
- **Componente Quasar Base:** `QLayout`
- **Dependência Direta:** `DssHeader`, `DssFooter`, `DssDrawer` (Nível 3)

**Justificativa da Fase 2:** O `DssLayout` é o container raiz da aplicação. Como componente de Nível 4 (o mais alto da Fase 2), ele orquestra todos os componentes estruturais de Nível 3 (`DssHeader`, `DssFooter`, `DssDrawer`) e gerencia a injeção de variáveis CSS para cálculo de margens e áreas seguras (safe areas).

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Quebra da Matemática de Layout
O `QLayout` nativo é o motor de cálculo de dimensões da página. Ele recebe informações dos headers, footers e drawers filhos e injeta variáveis CSS (como `--q-layout-margin-top`) no `QPageContainer` para garantir que o conteúdo não fique oculto sob elementos fixos. O risco é que a sobrescrita de estilos ou a alteração da estrutura DOM quebre essa comunicação.

**Mitigação:** O `DssLayout` **não deve** alterar nenhuma propriedade de posicionamento, `z-index` ou `display` nativa do `QLayout`. Ele deve atuar estritamente como um pass-through estrutural, aplicando apenas a cor de fundo base da aplicação.

### 2.2. Gate de Responsabilidade v2.4
O `DssLayout` é um **container estrutural raiz 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua única responsabilidade visual é fornecer a cor de fundo base (`--dss-surface-muted` ou `--dss-surface-default` dependendo do tema) sobre a qual os cards e superfícies elevadas flutuarão.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-layout>`. O slot `default` é destinado **exclusivamente** a componentes de layout (`DssHeader`, `DssFooter`, `DssDrawer`) e ao `DssPageContainer` (que conterá a `DssPage`). O uso de HTML nativo ou texto solto diretamente no `DssLayout` viola severamente a governança de Nível 4.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `view` (String) - Define a estrutura do layout (ex: `hHh lpR fFf`). O DSS deve aceitar o padrão do Quasar, mas recomendar `hHh lpR fFf` como padrão corporativo.
- `container` (Boolean) - Permite que o layout seja renderizado dentro de um elemento pai com dimensões fixas (útil para modais ou iframes), em vez de ocupar a janela inteira.

### 3.2. Props Bloqueadas (Governança DSS)
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente, mas não deve expor props específicas para isso.

## 4. Governança de Tokens e CSS

O `DssLayout` deve utilizar os seguintes tokens:
- **Cor de Fundo (Background):** O `QLayout` nativo não aplica cor de fundo. O `DssLayout` deve aplicar `--dss-surface-muted` (fundo rebaixado, `#f5f5f5` no light mode) como padrão, para que os `DssCard`s (que usam `--dss-surface-default`, `#ffffff`) tenham contraste visual. Em dark mode, o sistema de temas ajustará as variáveis automaticamente.

## 5. Acessibilidade e Estados

- **Role:** O `QLayout` não aplica um role específico. O `DssLayout` não precisa forçar um role, pois a semântica é fornecida pelos filhos (`role="banner"` no Header, `role="navigation"` no Drawer, `role="main"` no Page).
- **Estados aplicáveis:** `dark mode`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssLayout.example.vue` deve cobrir:
1. **Básico:** Layout completo com `DssHeader`, `DssDrawer` (esquerdo), `DssPageContainer` e `DssFooter`.
2. **Container Mode:** Layout renderizado dentro de um card com dimensões fixas (usando a prop `container`).
3. **Right Drawer:** Layout com `DssDrawer` posicionado à direita (`view="hHh lpR fFf"`).

> **Nota para o Exemplo:** Como o `DssPageContainer` e `DssPage` ainda não existem, os exemplos do `DssLayout` devem usar `<q-page-container>` e `<q-page>` nativos temporariamente para renderizar o conteúdo central. Isso deve ser documentado como EXC-01.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QPageContainer e QPage no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssLayout` requer um container de página para demonstrar o cálculo de margens. Como `DssPageContainer` e `DssPage` ainda não foram construídos, é estritamente necessário usar os componentes nativos **apenas no arquivo `DssLayout.example.vue`** para fins de demonstração. O código fonte do componente (`DssLayout.ts.vue`) permanece 100% aderente aos gates. Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md.

### EXC-02: Uso de !important para sobrescrever background-color
- **Regra Violada:** Nenhuma (mas documentada para clareza).
- **Justificativa:** Para garantir que `--dss-surface-muted` governe o fundo global da aplicação e suporte dark mode corretamente, é necessário `!important` no escopo do `.dss-layout`. Precedente: `DssHeader`, `DssFooter`, `DssDrawer`.
