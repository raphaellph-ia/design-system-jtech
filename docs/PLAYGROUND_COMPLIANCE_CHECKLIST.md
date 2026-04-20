# ✅ PLAYGROUND COMPLIANCE CHECKLIST

> **Gate binário obrigatório.** Todo playground novo ou refatorado DEVE passar por esta checagem **antes** de ser declarado pronto. Marque cada item como ✅ ou ❌ explicitamente. Qualquer ❌ bloqueia a entrega.

**Versão:** 1.0 — alinhado a `docs/PLAYGROUND_STANDARD.md` v3.2

---

## 1. Layout Canônico

- [ ] Control Panel no topo, Content Area (Preview + Code) abaixo
- [ ] `ControlGrid` com **mínimo de 4 colunas** (quando houver espaço)
- [ ] Sem scroll vertical no Control Panel enquanto houver espaço horizontal
- [ ] Preview Panel ocupa **mais área** que Code Panel
- [ ] Preview e Code possuem **título obrigatório**

## 2. Color Application Domain (v3.2)

- [ ] Existe **apenas um domínio de cor ativa** (Color, Brand, Feedback)
- [ ] Seleção em uma fonte **substitui silenciosamente** as demais
- [ ] **Nenhum** seletor é desabilitado por exclusividade de cor
- [ ] **Nenhum** botão "Nenhum" / estado nulo na UI
- [ ] Estado selecionado usa semântica **POSITIVE (verde)** — nunca vermelho

## 3. Exhaustive API

- [ ] Toda prop visual/comportamental do componente possui seletor
- [ ] Props numéricas (offset, height-hint, etc.) possuem input/slider
- [ ] Booleans documentados possuem toggle (incl. variantes mutuamente exclusivas tratadas como grupo)

## 4. Composite Logic (componentes compostos)

> Aplica-se quando o componente orquestra ou contém filhos DSS (ex: `DssHeader > DssToolbar`, `DssBtnGroup > DssButton`, `DssCard > DssAvatar`).

- [ ] Identificado o(s) componente(s) filho(s) e suas props relevantes
- [ ] Seletores de **Color/Brand/Feedback** são **delegados ao filho** quando o pai é container puro
- [ ] Seletor de **Size/Density** delegado ao filho quando aplicável
- [ ] Estados interativos (`disabled`, `loading`) expostos via filho quando o pai não os possui
- [ ] Comportamento de propagação documentado no preview (não silencioso)

## 5. Estados Interativos

- [ ] `disabled` exposto quando o componente (ou seu filho relevante) suporta
- [ ] `loading` exposto quando aplicável
- [ ] Estados visuais documentados pelo DSS (hover/focus/active) são alcançáveis no preview

## 6. Preview Panel

- [ ] Componente **nunca desaparece** em nenhuma combinação de seletores
- [ ] Estados inválidos geram fallback visual (não crash, não vazio)
- [ ] Acompanha corretamente light/dark mode (texto, bordas, superfícies)

## 7. Code Panel

- [ ] Código gerado é **válido para produção**
- [ ] Código reflete **exatamente** o estado atual do playground
- [ ] **Sem** token labels, metadata, debug info, comentários explicativos ou placeholders

## 8. Golden Playground Comparison

- [ ] Identificado o **Golden Playground** da categoria (ver tabela abaixo)
- [ ] Comparado lado-a-lado: número de seletores, agrupamentos, delegação
- [ ] Justificada (em commit/PR) qualquer divergência intencional

### Golden Playgrounds por Categoria

| Categoria                     | Golden Playground            |
| ----------------------------- | ---------------------------- |
| Componente atômico            | `DssButtonPage.tsx`          |
| Composto de agrupamento       | `DssBtnGroupPage.tsx`        |
| Container estrutural          | `DssCardPage.tsx`            |
| Container de layout (Nível 3+)| `DssCardPage.tsx` (interim)  |
| Form control                  | `DssCheckboxPage.tsx`        |

---

## ⛔ Itens Proibidos (recap)

- Botão "Nenhum" em qualquer seletor
- UI representando estado nulo de cor
- Seletores desabilitados por exclusividade
- Layout com controles laterais ou empilhados verticalmente
- Preview ou Code sem título
- Token info abaixo do código
- API do componente como única fonte para o playground (ignorar composite-logic)

---

## 📌 Regra de Ouro

> Pré-prompt define **API do componente**.
> Playground é **superfície de demonstração** — sempre aplique composite-logic + exhaustive-api + Color Application Domain, mesmo quando a API do pai for enxuta.
