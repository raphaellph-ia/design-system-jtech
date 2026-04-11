# Pré-prompt de Criação de Componente DSS: DssBreadcrumbs

## 1. Classificação e Contexto
- **Nome do Componente:** `DssBreadcrumbs`
- **Família:** Navegação
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssBtnGroup` (para agrupamento horizontal e alinhamento)
- **Golden Context:** `DssCard` ou Layouts de Página (container pai mais comum)
- **Componente Quasar Base:** `QBreadcrumbs`
- **Dependência Direta:** `DssBreadcrumbsEl` (Nível 1)

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Separadores e Alinhamento
O `QBreadcrumbs` nativo injeta separadores (ícones ou texto) entre os elementos filhos. O risco é que esses separadores não respeitem a tipografia e as cores do DSS, ou que o alinhamento vertical entre os separadores e os itens (`DssBreadcrumbsEl`) fique quebrado.
**Mitigação:** O `DssBreadcrumbs` deve sobrescrever os estilos dos separadores nativos (`.q-breadcrumbs__separator`) usando tokens DSS. O alinhamento deve ser garantido via flexbox (`align-items: center`).

### 2.2. Gate de Responsabilidade v2.4
Como componente de Nível 2, o `DssBreadcrumbs` é um **container orquestrador**. Ele **não deve** gerenciar estados interativos (`:hover`, `:focus-visible`, `:active`) — essa responsabilidade é exclusiva dos filhos (`DssBreadcrumbsEl`). A responsabilidade do `DssBreadcrumbs` é gerenciar o layout (flexbox), o espaçamento (gap) e a renderização dos separadores.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-breadcrumbs>`. O slot `default` deve aceitar **apenas** componentes `DssBreadcrumbsEl`. O uso de HTML nativo ou outros componentes dentro do slot viola a governança da Fase 2.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `separator` (String) - Caractere separador de texto (ex: `/`, `>`).
- `separator-color` (String) - Cor do separador (deve mapear para tokens DSS).
- `gutter` (String) - Espaçamento entre os itens (deve mapear para tokens DSS, ex: `sm`, `md`).
- `align` (String) - Alinhamento horizontal (`left`, `center`, `right`, `between`, `around`).

### 3.2. Props Bloqueadas (Governança DSS)
- `active-color` - Bloqueado (a cor do item ativo é governada pelo `DssBreadcrumbsEl`).
- `separator-class` - Bloqueado (estilos do separador são governados pelo CSS do componente).

## 4. Governança de Tokens e CSS

O `DssBreadcrumbs` deve utilizar os seguintes tokens:
- **Tipografia (Separadores):** `--dss-font-size-sm`, `--dss-line-height-md`.
- **Cores (Separadores):** `--dss-text-subtle` (padrão).
- **Espaçamento (Gutter):** `--dss-spacing-2` (sm), `--dss-spacing-3` (md), `--dss-spacing-4` (lg).

## 5. Acessibilidade e Estados

- **Role:** O `QBreadcrumbs` gerencia o `role="navigation"` e `aria-label="Breadcrumb"` nativamente.
- **Aria-current:** O `DssBreadcrumbs` não gerencia o `aria-current` diretamente; isso deve ser passado como prop para o último `DssBreadcrumbsEl` da lista.
- **Separadores:** Os separadores injetados pelo Quasar recebem `aria-hidden="true"` nativamente, o que está correto para evitar leitura redundante por screen readers.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssBreadcrumbs.example.vue` deve cobrir:
1. **Básico:** Trilha de navegação simples com separador padrão (`/`).
2. **Separador Customizado:** Uso da prop `separator` com um caractere diferente (ex: `>`).
3. **Alinhamento:** Demonstração da prop `align` (`center` ou `right`).
4. **Com Ícones:** Trilha onde os itens (`DssBreadcrumbsEl`) possuem ícones.

## 7. Exceções aos Gates v2.4

### EXC-01: Seletor de Classe Interna do Quasar (Gate de Composição)
- **Regra Violada:** Regra 1 (Proibição de seletores CSS que referenciam classes internas do Quasar).
- **Justificativa:** O `QBreadcrumbs` injeta elementos DOM para os separadores com a classe `.q-breadcrumbs__separator`. Para aplicar a tipografia e cor do DSS a esses separadores, é estritamente necessário usar o seletor `.dss-breadcrumbs .q-breadcrumbs__separator`. Esta é uma exceção formal e documentada, seguindo o precedente de componentes orquestradores.
