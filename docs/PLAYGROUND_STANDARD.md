# 🎛️ PLAYGROUND STANDARD — DSS

## Version: v3.2 (Color Application Domain)

Este documento define o **contrato canônico, declarativo e não-interpretável** para a criação e refatoração de playgrounds de componentes no Design System Sansys (DSS).

Ele é a **fonte única de verdade** para a IA da plataforma Lovable.

---

## 🎯 Objetivo do Playground

Permitir a **exploração fiel, segura e previsível** de componentes DSS, garantindo que:

* o preview represente estados reais do componente
* os seletores reflitam a API verdadeira
* o código gerado seja confiável para produção
* todos os playgrounds tenham comportamento consistente

---

## 🧠 Princípios Fundamentais

* Playground é **declarativo**, não inferencial
* IA **não toma decisões de layout ou lógica**
* Estados inválidos **nunca quebram o preview**
* Refatorar significa **substituir**, nunca adaptar

---

## 📐 Layout Canônico (Único)

### Estrutura Obrigatória

1. **Control Panel (Topo)**
2. **Content Area (Abaixo)**

   * Preview Panel (prioritário)
   * Code Panel

---

### Control Panel — Regras

* Sempre posicionado no topo
* Usa layout **grid horizontal**
* Deve ocupar a largura disponível
* **Mínimo de 4 seletores por linha**, quando houver espaço
* Scroll vertical é proibido enquanto houver espaço horizontal

---

### Content Area — Regras

* Preview e Code são **painéis semânticos irmãos**
* Ambos **devem possuir título obrigatório**
* Ambos devem ser alinhados pelo topo
* Preview deve ter **mais área visual** que Code

---

## 🎨 Color Application Domain (NOVO)

### Definição

Existe **apenas UM domínio de aplicação de cor ativa** no playground.

Todos os seletores que aplicam cor visual ao componente **pertencem ao mesmo domínio**, independentemente de sua seção.

### Fontes de Cor (não-exclusivas na UI)

* Color
* Feedback
* Brand
* Outras fontes semânticas futuras

---

### Regra Canônica do Domínio

* Apenas **uma fonte de cor pode estar ativa por vez**
* A última seleção **substitui automaticamente** qualquer anterior
* Nenhum seletor é desabilitado por conflito de cor
* Não existe UI para estado nulo
* Não existe botão "Nenhum"

---

### Comportamento Esperado

* Selecionar Brand remove visualmente Color ou Feedback ativos
* Selecionar Feedback remove Color ou Brand ativos
* Selecionar Color remove Brand ou Feedback ativos

A substituição é **implícita e silenciosa**.

---

## 🟢 Seleção Visual (Global)

* Todo estado selecionado usa semântica **POSITIVE (verde)**
* Seleção única e múltipla **compartilham a mesma semântica visual**
* Vermelho **nunca** representa seleção

---

## 👁️ Preview Panel — Contrato

* O componente **nunca pode desaparecer**
* Sempre deve existir um estado renderizável
* Estados inválidos devem gerar fallback visual
* Preview é sempre maior que Code

---

## 🧾 Code Panel — Contrato

* Código deve ser **válido para produção**
* Código deve refletir **exatamente** o estado atual do playground
* Valores default reais podem ser omitidos

### Código **NÃO DEVE** conter:

* token labels
* metadata
* debug info
* comentários explicativos
* placeholders

---

## 🚫 Itens Proibidos (Globais)

* Botão "Nenhum" em qualquer seletor
* UI representando estado nulo
* Seletores desabilitados por exclusividade
* Layout com controles laterais
* Seletores empilhados verticalmente
* Preview ou Code sem título
* Informação de token abaixo do código
* Preservação de lógica ou UI legada

---

## ♿ Acessibilidade e Estados Visuais

* Estados como hover, focus, focus-visible, active e disabled
  devem ser expostos **quando documentados no DSS**
* Estados disabled só existem quando **o componente realmente não suporta a opção**

---

## 🧠 Regra de Ouro

> Em caso de dúvida entre preservar algo antigo ou aplicar o contrato atual:
> **aplicar o contrato atual**.

---

**Status:** Canônico
**Substitui:** v3.1
**Compatível com:** Refactor Prompt Addendum
