# Pré-prompt de Criação de Componente DSS: DssRouteTab

## 1. Classificação e Contexto
- **Nome do Componente:** `DssRouteTab`
- **Família:** Tabs
- **Nível de Composição:** Nível 1 (Atômico)
- **Golden Reference:** `DssTab` (irmão arquitetural direto)
- **Golden Context:** `DssTabs` (container pai obrigatório)
- **Componente Quasar Base:** `QRouteTab`

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Duplicação de Lógica Visual
O `DssRouteTab` é visualmente idêntico ao `DssTab`. O maior risco é duplicar CSS, tokens e lógica de estados.
**Mitigação:** O `DssRouteTab` deve reutilizar o máximo possível da infraestrutura do `DssTab`. Se necessário, extraia a lógica visual compartilhada para um composable ou arquivo SCSS comum (ex: `_tab-shared.scss`), ou simplesmente importe os estilos do `DssTab` se a arquitetura permitir sem acoplamento frágil. A abordagem preferida é que o `DssRouteTab` aplique as mesmas classes CSS (`.dss-tab`) que o `DssTab`.

### 2.2. Gate de Responsabilidade v2.4
Como componente interativo, o `DssRouteTab` **deve** gerenciar seus próprios estados de `:hover`, `:focus-visible` e `:active`. Não delegue esses estados ao container `DssTabs`.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-route-tab>`. Como é um componente de Nível 1 (análogo ao `DssTab`), o uso do componente Quasar como raiz do template é permitido e esperado para manter a semântica de roteamento nativa do Vue Router/Quasar.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `name` (String/Number) - Identificador único da aba.
- `label` (String) - Texto da aba.
- `icon` (String) - Ícone da aba.
- `disable` (Boolean) - Estado desabilitado.
- `to` (String/Object) - Rota de destino (específico do QRouteTab).
- `exact` (Boolean) - Correspondência exata de rota.
- `replace` (Boolean) - Substituir histórico de navegação.
- `href` (String) - Link externo (fallback).
- `target` (String) - Target do link externo.

### 3.2. Props Bloqueadas (Governança DSS)
- `ripple` - Forçado para `false` (DSS usa transições CSS puras).
- `no-caps` - Bloqueado (text-transform é governado por tokens tipográficos).
- `color`, `text-color` - Bloqueados (cores governadas por tokens/brands).
- `alert`, `alert-icon` - Bloqueados (se necessário, usar composição com `DssBadge` no slot).

## 4. Governança de Tokens e CSS

O `DssRouteTab` deve utilizar exatamente os mesmos tokens que o `DssTab`:
- **Tipografia:** `--dss-text-body-strong` (padrão), `--dss-text-subtle` (desabilitado).
- **Cores (Light):** `--dss-surface-transparent` (base), `--dss-surface-hover` (hover), `--dss-surface-active` (active/selected).
- **Cores (Dark):** `--dss-surface-transparent` (base), `--dss-surface-hover-dark` (hover), `--dss-surface-active-dark` (active/selected).
- **Foco:** `--dss-focus-ring` via `outline`.
- **Transições:** `--dss-motion-duration-fast` e `--dss-motion-easing-standard`.

## 5. Acessibilidade e Estados

- **Role:** O `QRouteTab` gerencia o `role="tab"` nativamente.
- **Aria-selected:** Gerenciado nativamente pelo Quasar em conjunto com o Vue Router.
- **Navegação por Teclado:** O foco deve ser visível (`:focus-visible`) e a ativação via `Enter`/`Space` deve acionar a navegação de rota.
- **High Contrast / Forced Colors:** Garantir que o estado selecionado seja distinguível sem depender apenas de cor (ex: borda inferior ou outline).

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssRouteTab.example.vue` deve cobrir:
1. **Básico:** Abas de rota simples (texto).
2. **Com Ícones:** Abas com ícone e texto.
3. **Desabilitado:** Aba de rota desabilitada.
4. **Navegação Exata vs Parcial:** Demonstração do uso da prop `exact`.
5. **Links Externos:** Uso de `href` e `target="_blank"`.
