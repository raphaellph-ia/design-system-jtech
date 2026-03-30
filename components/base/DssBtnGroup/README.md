# DssBtnGroup — Grupo de Botões DSS

**Componente de agrupamento de botões** baseado no Quasar QBtnGroup, implementado com arquitetura DSS em 4 camadas.

> **📋 Documentação Completa:** [DssBtnGroup.md](./DssBtnGroup.md)
> **📘 API Reference:** [DSSBTNGROUP_API.md](./DSSBTNGROUP_API.md)
> Este README é um guia rápido. Para documentação normativa completa (Template 13.1), consulte **DssBtnGroup.md**.

---

## ⚠️ REGRA DE OURO: Prop Sync Obrigatório

> **WARNING oficial do Quasar**: "You must use same design props (flat, outline, push, …) on both the parent QBtnGroup and the children QBtn/QBtnDropdown."

O DssBtnGroup **NÃO propaga automaticamente** as props de estilo para os filhos. Declare a prop de estilo **em ambos** — no grupo e em cada botão filho.

```vue
<!-- ❌ INCORRETO: botões filhos não herdarão o estilo flat -->
<DssBtnGroup flat>
  <DssButton label="Primeiro" />
  <DssButton label="Segundo" />
</DssBtnGroup>

<!-- ✅ CORRETO: prop declarada no grupo E em cada filho -->
<DssBtnGroup flat>
  <DssButton flat label="Primeiro" />
  <DssButton flat label="Segundo" />
</DssBtnGroup>
```

---

## 🚀 Quick Start

### Instalação

```javascript
import { DssBtnGroup } from '@/dss/components/base/DssBtnGroup'
import { DssButton } from '@/dss/components/base/DssButton'
```

### Uso Básico

```vue
<DssBtnGroup unelevated>
  <DssButton unelevated color="primary" label="Editar" />
  <DssButton unelevated color="primary" label="Salvar" />
  <DssButton unelevated color="primary" label="Cancelar" />
</DssBtnGroup>
```

---

## 📁 Estrutura de Arquivos

```
DssBtnGroup/
├── 1-structure/
│   └── DssBtnGroup.ts.vue        (template + props + acessibilidade)
│
├── 2-composition/
│   └── _base.scss                (container base + grouping + shape variants)
│
├── 3-variants/
│   ├── _flat.scss                (separador para flat)
│   ├── _outline.scss             (colapso de borda dupla)
│   ├── _push.scss                (separador para push)
│   ├── _unelevated.scss          (separador para unelevated)
│   ├── _glossy.scss              (placeholder documentado)
│   └── index.scss                (orquestrador)
│
├── 4-output/
│   ├── _states.scss              (dark mode, forced-colors)
│   ├── _brands.scss              (Hub, Water, Waste)
│   └── index.scss                (orquestrador)
│
├── composables/
│   ├── useBtnGroupClasses.ts     (lógica de classes)
│   └── index.ts                  (barrel export)
│
├── types/
│   └── btn-group.types.ts        (TypeScript interfaces)
│
├── DssBtnGroup.module.scss       # Orquestrador principal (L2 → L3 → L4)
├── DssBtnGroup.vue               # Entry point wrapper (re-export puro)
├── DssBtnGroup.example.vue       # 6 cenários + anti-pattern demo
├── DssBtnGroup.md                # Documentação completa (Template 13.1)
├── DSSBTNGROUP_API.md            # API Reference
├── dss.meta.json                 # Metadados DSS
├── index.js                      # Barrel export
└── README.md                     # Este arquivo
```

---

## 🎯 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `flat` | Boolean | `false` | Sem elevação/borda. ⚠️ Replicar nos filhos. |
| `outline` | Boolean | `false` | Com borda visível. ⚠️ Replicar nos filhos. |
| `push` | Boolean | `false` | Estilo 3D. ⚠️ Replicar nos filhos. |
| `unelevated` | Boolean | `false` | Sem sombra. ⚠️ Replicar nos filhos. |
| `rounded` | Boolean | `false` | Cantos pill nas extremidades. |
| `square` | Boolean | `false` | Sem border-radius. ⚠️ Replicar nos filhos. |
| `glossy` | Boolean | `false` | Efeito glossy. ⚠️ Replicar nos filhos. |
| `spread` | Boolean | `false` | Preenche largura disponível. |
| `stretch` | Boolean | `false` | Estica para altura do pai (flexbox). |
| `brand` | String | `null` | `hub` \| `water` \| `waste` — acento de marca. |
| `ariaLabel` | String | `undefined` | Label acessível do grupo. |

**Props bloqueadas** (pertencem ao DssButton filho): `dark`, `color`, `text-color`, `size`, `dense`.

---

## 🔑 Exemplos

### Toolbar de Formatação (Flat)

```vue
<DssBtnGroup flat aria-label="Formatação de texto">
  <DssButton flat icon="format_bold" aria-label="Negrito" />
  <DssButton flat icon="format_italic" aria-label="Itálico" />
  <DssButton flat icon="format_underline" aria-label="Sublinhado" />
</DssBtnGroup>
```

### Seleção de Visualização (Outline + Ícones)

```vue
<DssBtnGroup outline aria-label="Modo de visualização">
  <DssButton outline icon="view_list" aria-label="Lista" />
  <DssButton outline icon="grid_view" aria-label="Grade" />
</DssBtnGroup>
```

### Spread (Ações de Formulário)

```vue
<DssBtnGroup unelevated spread>
  <DssButton unelevated label="Cancelar" />
  <DssButton unelevated color="primary" label="Salvar" />
</DssBtnGroup>
```

### Com Brand

```vue
<DssBtnGroup outline brand="hub" aria-label="Ações de documento">
  <DssButton outline icon="edit" aria-label="Editar" />
  <DssButton outline icon="file_copy" aria-label="Duplicar" />
  <DssButton outline icon="delete" aria-label="Excluir" />
</DssBtnGroup>
```

### Rounded (Pill)

```vue
<DssBtnGroup unelevated rounded>
  <DssButton unelevated rounded color="primary" label="Sim" />
  <DssButton unelevated rounded label="Não" />
</DssBtnGroup>
```

---

## ♿ Acessibilidade

| Recurso | Implementação |
|---------|--------------|
| Role semântico | `role="group"` no container |
| Label acessível | `aria-label` via prop `ariaLabel` |
| Touch target | Delegado a cada DssButton filho |
| Navegação por teclado | Via Tab em cada botão filho individualmente |
| Focus ring | Responsabilidade do DssButton filho |

---

## 🔧 Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-border-width-thin` | Separador entre botões / colapso outline |
| `--dss-border-width-thick` | Acento de marca (inset box-shadow) |
| `--dss-border-width-md` | High contrast outline |
| `--dss-gray-200` | Separador push/unelevated |
| `--dss-gray-300` | Separador flat |
| `--dss-radius-full` | Variante rounded (pill) |
| `--dss-hub-600`, `--dss-hub-400` | Brand Hub |
| `--dss-water-500`, `--dss-water-400` | Brand Water |
| `--dss-waste-600`, `--dss-waste-500` | Brand Waste |

---

**Criado:** 26 de Março de 2026
**Fase:** 2 (Componente Composto)
**Golden Reference:** DssChip | **Golden Context:** DssCard
