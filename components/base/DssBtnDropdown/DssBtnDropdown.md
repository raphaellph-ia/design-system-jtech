# DssBtnDropdown — Documentação Normativa DSS v2.2

> **Versão do Componente:** 1.0.0
> **DSS Version:** v2.2
> **Fase:** 2 — Componente Composto
> **Status:** Pré-auditoria
> **Data de Criação:** 26 Mar 2026
> **Baseado em:** QBtnDropdown (Quasar)
> **Golden Reference:** DssChip
> **Golden Context:** DssCard

---

## 1. Identidade do Componente

### 1.1 Definição

O **DssBtnDropdown** é um componente composto de Fase 2 que combina um botão de ação (trigger) com um painel dropdown integrado. Permite ao usuário executar uma ação primária diretamente ou escolher entre múltiplas ações secundárias via menu suspenso.

### 1.2 Justificativa de Fase 2

O DssBtnDropdown é classificado como Fase 2 porque:
- Gerencia **estado visual compartilhado** entre trigger (botão) e painel (dropdown)
- Coordena **posicionamento relativo** entre dois elementos distintos
- Gerencia **transições de estado** (aberto/fechado) que afetam múltiplos sub-elementos
- Delega parcialmente responsabilidades de acessibilidade ao QBtnDropdown interno

### 1.3 Equivalente Quasar

| DSS | Quasar | Nota |
|-----|--------|------|
| `DssBtnDropdown` | `QBtnDropdown` | Wrapper governado — envolve QBtnDropdown sem reconstruir |

### 1.4 Abordagem Arquitetural: WRAP

**Decisão:** DssBtnDropdown ENVOLVE `QBtnDropdown`, não reconstrói do zero.

**Justificativa:**
- QBtnDropdown fornece posicionamento, acessibilidade WAI-ARIA (aria-haspopup, aria-expanded), animações e keyboard navigation nativos
- Rebuilding seria duplicação de esforço sem ganho arquitetural
- Precedente: DssSelect (selado Mar 2026) usa mesma estratégia wrap para QSelect

---

## 2. Classificação Normativa

| Campo | Valor |
|-------|-------|
| **Categoria** | Action Group Composto |
| **Fase DSS** | 2 — Composto |
| **Golden Reference** | DssChip |
| **Golden Context** | DssCard |
| **Touch Target** | Opção B — Delegado ao QBtnDropdown |
| **Interativo** | Sim |
| **ARIA Role** | `button` (com `aria-haspopup="true"`) |

---

## 3. O Grande Risco Arquitetural

### 3.1 Painel Teleportado — Escopo de Estilos

> ⚠️ CRÍTICO — Maior risco de NC de implementação.

O QBtnDropdown (via QMenu) **teleporta o painel para o `body`**. Seletores como `.dss-btn-dropdown .q-menu` **não funcionam** em runtime porque o painel não é filho DOM do trigger.

**Anti-pattern:**
```scss
/* ❌ INCORRETO — seletor descendente não alcança o painel teleportado */
.dss-btn-dropdown {
  .q-menu {
    border-radius: var(--dss-radius-md); /* nunca aplicado */
  }
}
```

**Solução correta:**
```vue
<!-- ✅ CORRETO: popup-content-class injeta classe no painel teleportado -->
<q-btn-dropdown popup-content-class="dss-btn-dropdown__panel">
```
```scss
/* ✅ CORRETO: classe global para o painel */
.dss-btn-dropdown__panel {
  border-radius: var(--dss-radius-md);
}
```

**Precedente:** DssSelect (selado Mar 2026) usa `popup-content-class` para estilizar painel do QSelect.

### 3.2 `<style scoped>` Bloqueando Seletores Globais

Com `<style scoped>`, o Vue adiciona `data-v-xxx` apenas ao template deste componente. O painel teleportado não recebe este atributo. **Nenhum seletor de painel funcionaria.**

**Solução:** `<style lang="scss">` sem `scoped`.

**Precedente:** DssBtnGroup NC-01 (Ciclo 1, Mar 2026) — mesma causa raiz.

### 3.3 Gate de Responsabilidade v2.4

O container `dss-btn-dropdown` **não captura** estados interativos (`:hover`, `:focus`, `:active`) dos elementos filhos via CSS. Todos os estados interativos do trigger pertencem ao QBtnDropdown interno.

---

## 4. API do Componente

### 4.1 Props Expostas

#### Conteúdo

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | `String` | `undefined` | Rótulo do trigger |
| `icon` | `String` | `undefined` | Ícone à esquerda (Material Icons) |
| `icon-right` | `String` | `undefined` | Ícone à direita do label |

#### Estilo Visual

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'elevated'\|'flat'\|'outline'\|'unelevated'` | `'elevated'` | Variante visual |
| `color` | `String` | `undefined` | Cor do trigger |
| `text-color` | `String` | `undefined` | Cor do texto |
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | `'md'` | Tamanho |
| `square` | `Boolean` | `false` | Remove border-radius |
| `rounded` | `Boolean` | `false` | Border-radius pill |
| `dense` | `Boolean` | `false` | Modo compacto |

#### Comportamento

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `split` | `Boolean` | `false` | Modo split (ação + seta separados) |
| `disable` | `Boolean` | `false` | Desabilita o componente |
| `loading` | `Boolean` | `false` | Indicador de carregamento |
| `close-on-esc` | `Boolean` | `true` | Fecha com Escape |
| `dropdown-icon` | `String` | `'arrow_drop_down'` | Ícone de seta |
| `menu-anchor` | `String` | `'bottom left'` | Âncora do painel |
| `menu-self` | `String` | `'top left'` | Self do painel |
| `menu-offset` | `[Number, Number]` | `[0, 0]` | Offset do painel |
| `stretch` | `Boolean` | `false` | Painel com largura do trigger |
| `persistent` | `Boolean` | `false` | Painel sempre montado |

#### Brandabilidade e Acessibilidade

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Acento de marca |
| `aria-label` | `String` | `undefined` | Label acessível do trigger |

### 4.2 Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `push` | Não faz parte da linguagem visual DSS v2.2 |
| `no-caps` | Casing gerenciado por tokens de tipografia |
| `no-wrap` | Controle de wrapping via CSS contextual |
| `ripple` | Gerenciado globalmente pelo Quasar |

### 4.3 Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do painel dropdown (tipicamente `<q-list>`) |
| `label` | Conteúdo personalizado do trigger (substitui `label` + `icon`) |

### 4.4 Eventos

| Evento | Payload | Condição |
|--------|---------|----------|
| `click` | `MouseEvent` | Sempre emitido; semanticamente relevante em modo `split` |
| `show` | — | Sempre |
| `hide` | — | Sempre |
| `before-show` | — | Sempre |
| `before-hide` | — | Sempre |

---

## 5. Arquitetura SCSS

### 5.1 Estrutura de Arquivos

```
DssBtnDropdown/
├── 2-composition/
│   └── _base.scss         ← Container + painel + split EXC-01
├── 3-variants/
│   ├── _elevated.scss     ← Placeholder intencional
│   ├── _flat.scss         ← Separador split flat
│   ├── _outline.scss      ← Colapso borda split outline
│   ├── _unelevated.scss   ← Separador split unelevated
│   └── index.scss         ← Orchestrador L3
├── 4-output/
│   ├── _states.scss       ← Dark mode, forced-colors, print
│   ├── _brands.scss       ← Hub, Water, Waste
│   └── index.scss         ← Orchestrador L4
└── DssBtnDropdown.module.scss  ← ORCHESTRADOR PRINCIPAL (L2 → L3 → L4)
```

### 5.2 Classes CSS Principais

| Classe | Elemento | Descrição |
|--------|----------|-----------|
| `.dss-btn-dropdown` | `<div>` wrapper | Container do trigger |
| `.dss-btn-dropdown__trigger` | `<q-btn-dropdown>` | O QBtnDropdown em si |
| `.dss-btn-dropdown__panel` | QMenu (teleportado) | Painel injetado via popup-content-class |

---

## 6. Tokens CSS Obrigatórios

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 | Background do painel |
| `--dss-elevation-2` | L2 | Sombra do painel |
| `--dss-radius-md` | L2 | Border-radius do painel |
| `--dss-border-width-thin` | L2, L3 | Separadores split, colapso outline |
| `--dss-border-width-thick` | L4 | Acento brand (inset box-shadow) |
| `--dss-border-width-md` | L4 | High contrast |
| `--dss-gray-200` | L3 | Separador split unelevated |
| `--dss-gray-300` | L3 | Separador split flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

---

## 7. Estados

### 7.1 Hierarquia DSS

```
error > disabled > loading > color > brand > default
```

### 7.2 Estados Aplicáveis

| Estado | Aplicável | Proprietário |
|--------|-----------|--------------|
| `default` | ✅ | DssBtnDropdown |
| `disabled` | ✅ | Delegado ao QBtnDropdown (prop `disable`) |
| `loading` | ✅ | Delegado ao QBtnDropdown (prop `loading`) |

### 7.3 Estados Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover`, `focus`, `active` | Pertencem ao QBtnDropdown/trigger interno |
| `error` | Componente de ação — erro não é um estado de dropdown |
| `indeterminate` | Não aplicável a botões de ação |
| `checked` | Não aplicável a botões de ação |

---

## 8. Acessibilidade

### 8.1 ARIA

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `button` | QBtnDropdown (automático) |
| `aria-haspopup` | `true` | QBtnDropdown (automático) |
| `aria-expanded` | `true`/`false` | QBtnDropdown (automático) |
| `aria-label` | prop `ariaLabel` | Quando fornecido |
| `aria-disabled` | `true` | Quando `disable="true"` |

### 8.2 Touch Target

**Opção B — Delegado ao QBtnDropdown interno.**

O DssBtnDropdown não é um Compact Control standalone. O trigger é renderizado pelo QBtnDropdown que já implementa touch target adequado. A adição de `::before` para touch target no container `.dss-btn-dropdown` seria redundante e conflitante.

### 8.3 Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Enter` / `Space` | Abre/fecha o dropdown (gerenciado pelo Quasar) |
| `Escape` | Fecha o dropdown (controlado por `closeOnEsc`) |
| `Tab` | Navega para o próximo elemento focusável |
| `Arrow Down` / `Arrow Up` | Navega entre itens do painel quando aberto |

### 8.4 Contraste e Acessibilidade Visual

- `prefers-contrast: more`: borda visível no painel
- `forced-colors: active`: system color keywords obrigatórios (EXC-04)
- `prefers-reduced-motion`: gerenciado pelo Quasar internamente

---

## 9. Brandabilidade

O DssBtnDropdown aplica acento visual de marca na borda inferior do trigger via `box-shadow` inset.

```vue
<!-- Hub (laranja) -->
<DssBtnDropdown label="Exportar" brand="hub" color="primary">
  <!-- ... -->
</DssBtnDropdown>

<!-- Water (azul) -->
<DssBtnDropdown label="Monitorar" brand="water" color="info">
  <!-- ... -->
</DssBtnDropdown>

<!-- Waste (verde) -->
<DssBtnDropdown label="Resíduos" brand="waste" color="positive">
  <!-- ... -->
</DssBtnDropdown>
```

**Nota:** Tokens de brand numéricos (`--dss-hub-600`, etc.) são usados intencionalmente — tokens semânticos de brand ainda não existem no catálogo DSS v2.2. Padrão idêntico ao DssCard e DssBtnGroup.

### 9.1 Comportamento Visual em Modo `elevated` + `brand`

Quando a variante `elevated` é combinada com a prop `brand`, o acento de marca (`box-shadow: inset`) é aplicado na classe `.dss-btn-dropdown__trigger` — o elemento raiz do QBtnDropdown. A elevação do Quasar é gerenciada internamente nos elementos filhos do QBtnDropdown (`.q-btn`), em camada DOM diferente. Os dois `box-shadow` **não conflitam** pois atuam em elementos DOM distintos:

| Elemento | box-shadow | Origem |
|----------|-----------|--------|
| `.dss-btn-dropdown__trigger` (raiz QBtnDropdown) | `inset 0 calc(-1 * --dss-border-width-thick) 0 --dss-hub-600` | DSS brand accent |
| `.q-btn` (interno do QBtnDropdown) | elevação Quasar | Quasar framework |

**Comportamento esperado:** Em `elevated` + `brand`, o botão exibe elevação padrão Quasar E acento de marca na borda inferior. Ambos são visíveis simultaneamente.

---

## 10. Modo Split

O modo split divide o trigger em dois fragmentos visuais independentes:
1. **Botão de ação** — executa a ação primária ao clicar, emite evento `click`
2. **Seta de dropdown** — abre o painel de opções secundárias

```vue
<DssBtnDropdown
  label="Salvar"
  :split="true"
  color="primary"
  @click="salvarDireto"
>
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>Salvar como rascunho</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>
```

### 10.1 Ajuste Visual em Modo Split

O DssBtnDropdown ajusta `border-radius: 0` na junção entre os dois fragmentos (EXC-01). Este é um ajuste semântico necessário para união visual — não é um valor hardcoded visual.

---

## 11. Exemplos

### 11.1 Básico

```vue
<DssBtnDropdown label="Exportar" icon="download" color="primary">
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>PDF</q-item-section>
    </q-item>
    <q-item clickable v-close-popup>
      <q-item-section>Excel</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>
```

### 11.2 Variantes

```vue
<DssBtnDropdown label="Flat" variant="flat" color="primary">...</DssBtnDropdown>
<DssBtnDropdown label="Outline" variant="outline" color="primary">...</DssBtnDropdown>
<DssBtnDropdown label="Unelevated" variant="unelevated" color="primary">...</DssBtnDropdown>
```

### 11.3 Split

```vue
<DssBtnDropdown label="Salvar" :split="true" color="primary" @click="salvar">
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>Salvar como rascunho</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>
```

### 11.4 Slot Label Customizado

```vue
<DssBtnDropdown>
  <template #label>
    <q-icon name="account_circle" /> Perfil
  </template>
  <q-list>
    <q-item clickable v-close-popup><q-item-section>Meu perfil</q-item-section></q-item>
  </q-list>
</DssBtnDropdown>
```

### 11.5 Brandabilidade

```vue
<DssBtnDropdown label="Hub" brand="hub" color="primary">...</DssBtnDropdown>
<DssBtnDropdown label="Water" brand="water" color="info">...</DssBtnDropdown>
<DssBtnDropdown label="Waste" brand="waste" color="positive">...</DssBtnDropdown>
```

---

## 12. Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `2-composition/_base.scss` | Modo split — junção visual entre fragmentos. Valor semântico. Padrão DssCard EXC-03. |
| EXC-02 | `border-radius: 0` | `2-composition/_base.scss` | Square variant — valor semântico. Padrão DssBtnGroup EXC-01. |
| EXC-03 | `rgba(255, 255, 255, 0.12)` | `4-output/_states.scss` | Dark mode dividers. Sem token DSS para white alpha. Padrão Material Design. |
| EXC-04 | `1px solid ButtonBorder` | `4-output/_states.scss` | Forced-colors — system keywords obrigatórios. Padrão DssCard EXC-04. |
| EXC-05 | `min-width: 160px` | `2-composition/_base.scss` | Valor de UX contextual para painéis dropdown. Sem token DSS de sizing genérico para largura mínima de painel flutuante. Convenção amplamente aceita (Material Design, Ant Design). Decisão arquitetural aprovada (Mar 2026). |

---

## 13. Gates v2.4 — Status

### Gate de Composição v2.4

| Regra | Status | Nota |
|-------|--------|------|
| Zero HTML nativo substituível | ✅ | Usa QBtnDropdown (Quasar), não `<button>` |
| Zero quebra de encapsulamento | ✅ | Sem `:deep()`, sem `::v-deep`, sem seletores em filhos DSS |
| Importação via wrappers | ✅ | index.js importa de `DssBtnDropdown.vue` |

### Gate de Responsabilidade v2.4

| Regra | Status | Nota |
|-------|--------|------|
| Sem captura de estados interativos dos filhos | ✅ | Container não define `:hover`, `:focus`, `:active` em filhos |
| Sem lógica de negócio | ✅ | Comportamento controlado por props genéricas |
| Limites documentados | ✅ | Seções 3, 7.3 e 8.2 declaram explicitamente o que é delegado |

---

## 14. Dependências

### 14.1 Dependências DSS

| Componente | Papel |
|-----------|-------|
| `DssButton` | Base visual do trigger (via QBtnDropdown internamente) |
| `DssIcon` | Ícones via prop ou slot label |

### 14.2 Dependências Quasar

| Componente | Papel |
|-----------|-------|
| `QBtnDropdown` | Base funcional (trigger + painel) |
| `QMenu` | Painel teleportado (interno ao QBtnDropdown) |

---

## 15. Anti-Patterns

### ❌ Estilizar o painel via seletor descendente

```scss
/* ERRADO — painel é teleportado para o body */
.dss-btn-dropdown {
  .q-menu { background: red; }
}
```

### ✅ Correto: via popup-content-class

```scss
/* CORRETO */
.dss-btn-dropdown__panel {
  background-color: var(--dss-surface-default);
}
```

### ❌ Usar `<style scoped>`

```vue
<!-- ERRADO — bloqueia seletores de painel teleportado -->
<style lang="scss" scoped>
```

### ✅ Correto: sem scoped

```vue
<!-- CORRETO -->
<style lang="scss">
```

---

## 16. Notas de Governança

### 16.1 Precedentes

| Decisão | Componente Precedente | Data |
|---------|----------------------|------|
| Wrapper QComponent (não rebuild) | DssSelect | Mar 2026 |
| popup-content-class para painel teleportado | DssSelect | Mar 2026 |
| `<style>` sem scoped para seletores globais | DssBtnGroup NC-01 | Mar 2026 |
| Tokens brand numéricos | DssCard, DssBtnGroup | Fev-Mar 2026 |

### 16.2 Reservas (Não Bloqueantes)

1. **Brand tokens numéricos**: `--dss-hub-600`, `--dss-water-500`, etc. são tokens numéricos. Tokens semânticos de brand ainda não existem no catálogo v2.2.
2. **Mixin dss-transition**: disponível mas não utilizado no container (sem transição própria).
3. **Sem unit tests**: componentes DSS não têm testes unitários automatizados em v2.2.

---

*Criado: 26 Mar 2026 — DSS v2.2 — Fase 2 (Componente Composto)*
