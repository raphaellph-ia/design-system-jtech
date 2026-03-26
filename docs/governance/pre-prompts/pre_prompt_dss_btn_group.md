# 🎯 PRÉ-PROMPT ESPECÍFICO: DssBtnGroup (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssBtnGroup`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssBtnGroup` |
| **Equivalente Quasar** | `QBtnGroup` |
| **Fase** | Fase 2 (Componente Composto) |
| **Nível de Execução** | Nível 1 — Independente (sem dependências de outros componentes da Fase 2) |
| **Classificação** | Container de composição — Agrupa instâncias de `DssButton` |
| **Golden Reference** | `DssChip` (interativo, por ser um container de controles interativos) |
| **Golden Context** | `DssCard` (componente composto de Fase 2 mais próximo semanticamente) |

**Justificativa da Fase 2:** O `DssBtnGroup` não é um wrapper simples de um único componente Quasar. Ele gerencia **estado visual compartilhado entre múltiplos `DssButton` filhos**, aplicando borda compartilhada, remoção de gap entre botões e propagação de props de estilo. Isso caracteriza composição interna, critério da Fase 2.

---

## 2. O GRANDE RISCO ARQUITETURAL: PROP SYNC OBRIGATÓRIO

### 2.1 A Regra de Ouro do QBtnGroup

> **WARNING oficial do Quasar:** "You must use same design props (flat, outline, push, …) on both the parent QBtnGroup and the children QBtn/QBtnDropdown."

O `DssBtnGroup` **NÃO propaga automaticamente** suas props de estilo para os filhos. O Quasar exige que as props sejam declaradas tanto no `QBtnGroup` quanto em cada `QBtn` filho. Isso é um comportamento **intencional do Quasar** — o `QBtnGroup` usa as props apenas para gerar as classes CSS corretas no container (ex: `q-btn-group--outline`), enquanto os botões filhos precisam das mesmas props para renderizar seu próprio estilo.

**Na documentação (Anti-patterns), você DEVE incluir:**

❌ **Anti-pattern:** Declarar `flat` apenas no `DssBtnGroup` esperando que os filhos herdem o estilo.
```html
<!-- ERRADO: botões filhos não herdarão o estilo flat -->
<DssBtnGroup flat>
  <DssButton label="Primeiro" />
  <DssButton label="Segundo" />
</DssBtnGroup>
```

✅ **Padrão correto:** Declarar a prop de estilo em ambos — no grupo e em cada botão filho.
```html
<!-- CORRETO: prop declarada no grupo E em cada filho -->
<DssBtnGroup flat>
  <DssButton flat label="Primeiro" />
  <DssButton flat label="Segundo" />
</DssBtnGroup>
```

### 2.2 Implicação para a API DSS

O `DssBtnGroup` deve **documentar explicitamente** que é um container de layout e agrupamento visual, não um propagador de estado. A responsabilidade de consistência visual é **compartilhada** entre o grupo e os botões filhos.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

O `DssBtnGroup` expõe **todas as 9 props do QBtnGroup**, pois todas são relevantes para o DSS. Não há props a bloquear neste componente.

| Prop DSS | Prop Quasar | Tipo | Default | Descrição |
|---|---|---|---|---|
| `flat` | `flat` | Boolean | `false` | Estilo flat (sem elevação, sem borda). Deve ser replicado nos filhos. |
| `outline` | `outline` | Boolean | `false` | Estilo com borda visível. Deve ser replicado nos filhos. |
| `push` | `push` | Boolean | `false` | Estilo 3D com sombra inferior. Deve ser replicado nos filhos. |
| `unelevated` | `unelevated` | Boolean | `false` | Remove a sombra (elevation). Deve ser replicado nos filhos. |
| `rounded` | `rounded` | Boolean | `false` | Aplica border-radius arredondado no grupo inteiro. |
| `square` | `square` | Boolean | `false` | Remove border-radius (cantos retos). |
| `glossy` | `glossy` | Boolean | `false` | Efeito glossy (gradiente). Deve ser replicado nos filhos. |
| `spread` | `spread` | Boolean | `false` | Distribui os botões horizontalmente, ocupando todo o espaço disponível. |
| `stretch` | `stretch` | Boolean | `false` | Em contexto flexbox, os botões esticam até a altura do elemento pai. |

**Props Proibidas / Não Suportadas:**
- `dark` → O DSS gerencia dark mode via CSS global (`body.body--dark`), não via prop.
- `color`, `text-color`, `size`, `dense` → Estas props pertencem ao `DssButton` filho, não ao grupo.

---

## 4. GOVERNANÇA DE TOKENS

### 4.1 Tokens de Border (Divisor Interno)

O `DssBtnGroup` cria uma **borda compartilhada** entre os botões filhos (sem gap, sem borda dupla). O Quasar gerencia isso via CSS interno, mas o DSS deve garantir que os tokens corretos sejam usados para o divisor entre botões.

**Token para o divisor entre botões (borda interna):**
- Estilo `outline`: `var(--dss-border-gray-300)` — borda padrão entre botões
- Estilo `flat`: sem borda visível entre botões
- Estilo `push`/`unelevated`: `var(--dss-border-gray-200)` — borda sutil

### 4.2 Tokens de Border-Radius

O `DssBtnGroup` aplica border-radius apenas nas extremidades do grupo (primeiro e último botão). Os botões internos têm `border-radius: 0`.

- **Padrão:** `var(--dss-radius-button)` → `var(--dss-radius-md)` (8px) nas extremidades
- **Prop `rounded`:** `var(--dss-radius-full)` (9999px) nas extremidades
- **Prop `square`:** `var(--dss-radius-none)` (0) — exceção documentada como EXC-01

### 4.3 Tokens de Espaçamento

O `DssBtnGroup` não adiciona gap entre os botões filhos — o efeito visual de "grupo" é obtido pela remoção do gap e pela borda compartilhada.

- Gap interno: `0` (sem token — valor semântico "ausência de gap")

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

### 5.1 Role ARIA

O `DssBtnGroup` deve renderizar como `role="group"` com `aria-label` obrigatório quando o grupo não possui um label visual visível.

```html
<DssBtnGroup aria-label="Opções de formatação de texto">
  <DssButton flat icon="format_bold" aria-label="Negrito" />
  <DssButton flat icon="format_italic" aria-label="Itálico" />
</DssBtnGroup>
```

**Prop adicional obrigatória para acessibilidade:**
- `aria-label` (string, opcional mas recomendado) → Descrição do grupo para leitores de tela

### 5.2 Touch Target

O `DssBtnGroup` é um container — o touch target é responsabilidade de cada `DssButton` filho. Declarar **"Opção B: Touch target delegado ao contexto"** na documentação.

### 5.3 Navegação por Teclado

Os botões dentro do grupo devem ser navegáveis individualmente via Tab. O grupo em si não captura foco — apenas os filhos.

---

## 6. ESTADOS DO COMPONENTE

O `DssBtnGroup` é um **container estrutural** — não possui estados próprios de hover, focus ou active. Esses estados pertencem exclusivamente aos `DssButton` filhos.

**Estados aplicáveis ao DssBtnGroup:**
- `default` — Apenas estado de renderização padrão do container

**Estados não aplicáveis (com justificativa obrigatória):**
- `hover` → Pertence ao DssButton filho
- `focus` → Pertence ao DssButton filho
- `active` → Pertence ao DssButton filho
- `disabled` → Deve ser aplicado em cada DssButton filho individualmente
- `loading` → Pertence ao DssButton filho
- `error` → Não aplicável a grupos de botões

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

O `DssBtnGroup` aceita como filhos **exclusivamente**:
- `DssButton` (principal)
- `DssBtnDropdown` (quando criado na Fase 2 — registrar como dependência futura)

**Não aceita:**
- Componentes não-DSS diretamente
- Elementos HTML sem wrapper DSS

**Declarar no `dss.meta.json`:**
```json
{
  "subcomponents": [],
  "compositionRequirements": ["DssButton"],
  "compositionFuture": ["DssBtnDropdown"]
}
```

---

## 8. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 5)

Os exemplos devem cobrir os seguintes cenários:

1. **Básico com texto** — Três botões com labels, estilo padrão (unelevated)
2. **Outline com ícones** — Grupo de botões com ícones e estilo outline
3. **Flat para toolbar** — Grupo flat para uso em barras de ferramentas (ex: formatação de texto)
4. **Spread (largura total)** — Grupo que ocupa toda a largura disponível (ex: ações de formulário)
5. **Com brand** — Grupo com `data-brand="hub"` e `data-brand="water"`
6. **Rounded** — Grupo com bordas completamente arredondadas (pill)

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Square variant
- **Valor:** `border-radius: 0`
- **Local:** `2-composition/_base.scss` (variante square)
- **Justificativa:** Square variant. Valor 0 é semanticamente "sem radius", não hardcoded visual. Padrão idêntico ao DssCard EXC-03.

### EXC-02: Dark mode border (se aplicável)
- **Valor:** `rgba(255, 255, 255, 0.12)`
- **Local:** `4-output/_states.scss`
- **Justificativa:** Dark mode divider entre botões. Nenhum token DSS fornece white com alpha parcial. Padrão Material Design.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, você deve:

1. **Confirmar** o entendimento da regra de prop sync (props de estilo devem ser declaradas no grupo E em cada filho).
2. **Confirmar** que o `DssBtnGroup` é um container de layout, não um propagador de estado.
3. **Confirmar** o Golden Context: `DssCard` como baseline de componente composto de Fase 2.
4. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
5. Ao gerar o `dss.meta.json`, declarar `"phase": 2` e `"goldenContext": "DssCard"`.
