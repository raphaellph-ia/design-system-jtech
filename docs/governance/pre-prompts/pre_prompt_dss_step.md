# Pré-prompt de Criação de Componente DSS: DssStep

## 1. Classificação e Contexto
- **Nome do Componente:** `DssStep`
- **Família:** Navegação (Stepper)
- **Nível de Composição:** Nível 1 (Independente)
- **Golden Reference:** `DssTab` (para estados de seleção e interatividade)
- **Golden Context:** `DssStepper` (container pai futuro, Nível 2)
- **Componente Quasar Base:** `QStep`
- **Dependências Diretas:** `DssIcon` (interno ao Quasar)

**Justificativa da Fase 2:** O `DssStep` é o bloco de construção fundamental para fluxos de assistente (wizards). Ele gerencia seu próprio estado visual (ativo, concluído, erro, desabilitado) e conteúdo interno, mas depende do `DssStepper` para orquestração global.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Ícones e Conectores Nativos
O `QStep` nativo renderiza ícones de status (check, edit, error) e linhas conectoras entre os passos usando classes internas (`.q-stepper__dot`, `.q-stepper__line`). O risco é que esses elementos não utilizem as cores semânticas e a tipografia do DSS.
**Mitigação:** O `DssStep` deve sobrescrever os estilos desses elementos internos via CSS descendente, garantindo o uso de tokens como `--dss-success-500` para passos concluídos e `--dss-error-500` para passos com erro.

### 2.2. Gate de Responsabilidade v2.4
O `DssStep` é um componente **híbrido**: a área do cabeçalho (título/ícone) é interativa (se o stepper for navegável), enquanto a área de conteúdo (painel) é um container estático. O componente deve garantir estados claros de `:hover` e `:focus-visible` apenas na área clicável (`.q-stepper__tab`), sem afetar o painel de conteúdo.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-step>`. O slot `default` é destinado ao conteúdo do passo e pode receber qualquer componente DSS.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `name` (String | Number) - Identificador único do passo (obrigatório).
- `title` (String) - Título principal do passo.
- `caption` (String) - Texto secundário abaixo do título.
- `icon` (String) - Ícone customizado para o passo (sobrescreve o número padrão).
- `active-icon` (String) - Ícone exibido quando o passo está ativo.
- `done-icon` (String) - Ícone exibido quando o passo está concluído.
- `error-icon` (String) - Ícone exibido quando o passo tem erro.
- `done` (Boolean) - Marca o passo como concluído.
- `error` (Boolean) - Marca o passo com estado de erro.
- `disable` (Boolean) - Desabilita a interação com o passo.

### 3.2. Props Bloqueadas (Governança DSS)
- `color` / `active-color` / `done-color` / `error-color` - Bloqueadas. As cores de estado são estritamente governadas pelo CSS do DSS (brand para ativo, success para done, error para erro).
- `prefix` - Bloqueado. O DSS utiliza apenas números ou ícones no dot, não prefixos textuais customizados.

## 4. Governança de Tokens e CSS

O `DssStep` deve utilizar os seguintes tokens:
- **Tipografia (Título):** `--dss-text-body`, `--dss-font-weight-medium`.
- **Tipografia (Caption):** `--dss-text-subtle`, `--dss-font-size-sm`.
- **Cores de Estado (Dot/Ícone):**
  - Ativo: `--dss-brand-primary-500` (ou a brand ativa via `data-brand`).
  - Concluído (`done`): `--dss-success-500`.
  - Erro (`error`): `--dss-error-500`.
  - Inativo: `--dss-surface-muted` ou `--dss-gray-300`.
- **Conectores (Linhas):** `--dss-border-color-light`.

## 5. Acessibilidade e Estados

- **Role:** O `QStep` gerencia a semântica de abas/painéis nativamente quando inserido em um `QStepper`.
- **Foco:** A área clicável do passo (`.q-stepper__tab`) deve receber o `--dss-focus-ring` padrão quando navegada por teclado.
- **Contraste:** Garantir que os ícones brancos dentro dos dots coloridos (success, error, brand) tenham contraste mínimo de 3:1 (WCAG AA para elementos gráficos).

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssStep.example.vue` deve cobrir (simulando um stepper pai simples ou usando o componente isolado se possível):
1. **Básico:** Passo inativo padrão.
2. **Ativo:** Passo atualmente selecionado.
3. **Concluído:** Passo com a prop `done` ativa.
4. **Erro:** Passo com a prop `error` ativa.
5. **Com Caption:** Passo exibindo título e subtítulo.

## 7. Exceções aos Gates v2.4

### EXC-01: Seletores de Classe Interna do Quasar (Gate de Composição)
- **Regra Violada:** Regra 1 (Proibição de seletores CSS que referenciam classes internas do Quasar).
- **Justificativa:** O `QStep` renderiza uma estrutura DOM complexa que inclui o cabeçalho (`.q-stepper__tab`), o dot do ícone (`.q-stepper__dot`), o título (`.q-stepper__title`) e o painel de conteúdo (`.q-stepper__step-content`). Para aplicar a tipografia, cores de estado (success/error) e focus ring do DSS, é estritamente necessário usar seletores descendentes como `.dss-step .q-stepper__dot`. Esta é uma exceção formal e documentada para garantir a fidelidade visual do Design System.
