# DssItemLabel

**Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

Container tipográfico para itens de lista. Wrapper DSS governado sobre infraestrutura `QItemLabel`.

---

## Quick Start

```vue
<DssItemSection>
  <DssItemLabel>Ana Silva</DssItemLabel>
  <DssItemLabel caption>Administradora do sistema</DssItemLabel>
</DssItemSection>
```

---

## Quando usar

- Para estruturar hierarquia de texto dentro de um `DssItemSection`
- Para separar grupos de itens em uma lista com um cabeçalho (`header`)
- Para indicar categoria ou tipo acima do label principal (`overline`)
- Para exibir informação secundária abaixo do label principal (`caption`)
- Para truncar texto longo com número máximo de linhas (`lines`)

## Quando NÃO usar

- Fora de um `DssItemSection` (exceto `DssItemLabel[header]` direto em `q-list`)
- Como elemento interativo — use `DssButton` ou `DssItem[clickable]` para ações
- Para exibir badges, chips ou outros componentes — use os slots do `DssItemSection`
- Para aplicar cores customizadas via prop — a paleta de texto é governada pelos tokens DSS

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `header` | `Boolean` | `false` | Cabeçalho de grupo de lista. Tipografia compacta, uppercase, padding superior. |
| `caption` | `Boolean` | `false` | Texto secundário abaixo do label principal. Tipografia menor, cor mutada. |
| `overline` | `Boolean` | `false` | Texto de categoria acima do label principal. Tipografia muito compacta, uppercase. |
| `lines` | `Number \| String` | `undefined` | Número máximo de linhas antes de truncar com ellipsis. |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo de texto do label. Aceita texto simples ou elementos inline. |

---

## Eventos

Nenhum — componente estritamente não-interativo.

---

## Estados

| Estado | Aplicável | Justificativa |
|--------|-----------|---------------|
| hover | ❌ Não | Pertence ao DssItem pai |
| focus | ❌ Não | Pertence ao DssItem pai |
| active | ❌ Não | Pertence ao DssItem pai |
| disabled | ❌ Não | Pertence ao DssItem pai |
| loading | ❌ Não | Pertence ao consumidor |
| error | ❌ Não | Pertence ao consumidor |

---

## Exemplos de uso

### Label + Caption

```vue
<DssItemSection>
  <DssItemLabel>Carlos Eduardo Mendes</DssItemLabel>
  <DssItemLabel caption>Operador de campo · Zona Sul</DssItemLabel>
</DssItemSection>
```

### Overline + Label + Caption

```vue
<DssItemSection>
  <DssItemLabel overline>Ordem de Serviço</DssItemLabel>
  <DssItemLabel>Manutenção preventiva — Bomba P-042</DssItemLabel>
  <DssItemLabel caption>Vence em 3 dias</DssItemLabel>
</DssItemSection>
```

### Header de grupo

```vue
<q-list>
  <DssItemLabel header>Favoritos</DssItemLabel>
  <DssItem>...</DssItem>
  <DssItemLabel header>Recentes</DssItemLabel>
  <DssItem>...</DssItem>
</q-list>
```

### Truncamento por número de linhas

```vue
<DssItemSection>
  <DssItemLabel>Relatório de inspeção — Rede de distribuição</DssItemLabel>
  <DssItemLabel caption :lines="2">
    Inspeção completa nas tubulações da zona sul. Foram identificados
    3 pontos críticos e 12 conexões com desgaste acentuado.
  </DssItemLabel>
</DssItemSection>
```

---

## Tokens utilizados

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Família tipográfica base |
| `--dss-font-size-xs` | Tamanho para header e overline (12px) |
| `--dss-font-size-sm` | Tamanho para caption (14px) |
| `--dss-font-size-md` | Tamanho para label padrão (16px) |
| `--dss-font-weight-normal` | Peso para label padrão e caption (400) |
| `--dss-font-weight-medium` | Peso para overline (500) |
| `--dss-font-weight-semibold` | Peso para header (600) |
| `--dss-line-height-tight` | Altura de linha para overline (1.25) |
| `--dss-line-height-sm` | Altura de linha para caption (1.45) |
| `--dss-line-height-normal` | Altura de linha para label e header (1.5) |
| `--dss-letter-spacing-widest` | Espaçamento de letras para header e overline |
| `--dss-text-body` | Cor do label padrão |
| `--dss-text-subtle` | Cor para header, caption e overline |
| `--dss-text-inverse` | Cor em dark mode |
| `--dss-spacing-0_5` | Margin-top de caption e margin-bottom de overline |
| `--dss-spacing-1` | Padding-bottom do header |
| `--dss-spacing-3` | Padding-top do header |

---

## Hierarquia de composição

```
DssList
  └── DssItem
       └── DssItemSection [main]
             ├── DssItemLabel (overline, opcional)
             ├── DssItemLabel (padrão — label principal)
             └── DssItemLabel (caption, opcional)
```

---

## Documentação completa

- [DssItemLabel.md](./DssItemLabel.md) — Documentação normativa Template 13.1
- [DSSITEMLABEL_API.md](./DSSITEMLABEL_API.md) — Referência técnica completa da API
