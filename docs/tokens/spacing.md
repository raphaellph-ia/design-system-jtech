# DSS - Tokens de Espaçamento

## Visão Geral

Os tokens de espaçamento do DSS fornecem uma escala harmônica para margins, paddings e gaps. O sistema é baseado em REM (1rem = 16px) e segue uma progressão definida para criar ritmo visual consistente.

**Arquivo fonte:** `tokens/semantic/_spacing.scss`

---

## 1. Escala Base

A escala base utiliza multiplicadores de 4px para criar uma progressão harmônica:

| Token               | REM         | Pixels | Uso Recomendado                                  |
|---------------------|-------------|--------|--------------------------------------------------|
| `--dss-spacing-0`   | 0           | 0px    | Sem espaçamento                                  |
| `--dss-spacing-px`  | 1px         | 1px    | Bordas finas                                     |
| `--dss-spacing-0_5` | 0.125rem    | 2px    | Espaçamento mínimo                               |
| `--dss-spacing-1`   | 0.25rem     | 4px    | Espaçamento mínimo entre elementos relacionados  |
| `--dss-spacing-1_5` | 0.375rem    | 6px    | Espaçamento pequeno                              |
| `--dss-spacing-2`   | 0.5rem      | 8px    | Espaçamento padrão entre elementos relacionados  |
| `--dss-spacing-2_5` | 0.625rem    | 10px   | Espaçamento médio-pequeno                        |
| `--dss-spacing-3`   | 0.75rem     | 12px   | Espaçamento entre elementos distintos            |
| `--dss-spacing-3_5` | 0.875rem    | 14px   | Espaçamento médio                                |
| `--dss-spacing-4`   | 1rem        | 16px   | Padding interno de componentes                   |
| `--dss-spacing-5`   | 1.25rem     | 20px   | Margens entre grupos de elementos                |
| `--dss-spacing-6`   | 1.5rem      | 24px   | Espaçamento padrão entre seções                  |
| `--dss-spacing-7`   | 1.75rem     | 28px   | Espaçamento médio entre seções                   |
| `--dss-spacing-8`   | 2rem        | 32px   | Espaçamento médio-grande entre seções            |
| `--dss-spacing-9`   | 2.25rem     | 36px   | Espaçamento grande                               |
| `--dss-spacing-10`  | 2.5rem      | 40px   | Espaçamento grande entre seções                  |
| `--dss-spacing-11`  | 2.75rem     | 44px   | Espaçamento muito grande                         |
| `--dss-spacing-12`  | 3rem        | 48px   | Espaçamento entre blocos de conteúdo maiores     |
| `--dss-spacing-14`  | 3.5rem      | 56px   | Espaçamento extra grande                         |
| `--dss-spacing-16`  | 4rem        | 64px   | Espaçamento entre seções principais              |
| `--dss-spacing-20`  | 5rem        | 80px   | Espaçamento entre módulos de página              |
| `--dss-spacing-24`  | 6rem        | 96px   | Espaçamento entre seções críticas                |
| `--dss-spacing-28`  | 7rem        | 112px  | Espaçamento especial                             |
| `--dss-spacing-32`  | 8rem        | 128px  | Espaçamento máximo padrão                        |
| `--dss-spacing-36`  | 9rem        | 144px  | Espaçamento especial grande                      |
| `--dss-spacing-40`  | 10rem       | 160px  | Espaçamento especial extra grande                |
| `--dss-spacing-44`  | 11rem       | 176px  | Espaçamento especial                             |
| `--dss-spacing-48`  | 12rem       | 192px  | Espaçamento de seção hero                        |
| `--dss-spacing-52`  | 13rem       | 208px  | Espaçamento especial                             |
| `--dss-spacing-56`  | 14rem       | 224px  | Espaçamento especial                             |
| `--dss-spacing-60`  | 15rem       | 240px  | Espaçamento especial                             |
| `--dss-spacing-64`  | 16rem       | 256px  | Espaçamento máximo                               |
| `--dss-spacing-72`  | 18rem       | 288px  | Espaçamento especial                             |
| `--dss-spacing-80`  | 20rem       | 320px  | Espaçamento especial                             |
| `--dss-spacing-96`  | 24rem       | 384px  | Espaçamento máximo especial                      |

---

## 2. Tokens Semânticos

### 2.1 Container e Layout

| Token                       | Valor Base          | Pixels | Descrição                           |
|-----------------------------|---------------------|--------|-------------------------------------|
| `--dss-container-padding`   | spacing-4           | 16px   | Padding padrão do container         |
| `--dss-section-spacing`     | spacing-12          | 48px   | Espaçamento entre seções            |
| `--dss-component-spacing`   | spacing-6           | 24px   | Espaçamento entre componentes       |

### 2.2 Grid Gap

| Token                | Valor Base   | Pixels | Descrição                    |
|----------------------|--------------|--------|------------------------------|
| `--dss-grid-gap-sm`  | spacing-2    | 8px    | Gap pequeno para grids       |
| `--dss-grid-gap-md`  | spacing-4    | 16px   | Gap médio para grids         |
| `--dss-grid-gap-lg`  | spacing-6    | 24px   | Gap grande para grids        |
| `--dss-grid-gap-xl`  | spacing-8    | 32px   | Gap extra grande para grids  |

### 2.3 Formulários

| Token                       | Valor Base   | Pixels | Descrição                    |
|-----------------------------|--------------|--------|------------------------------|
| `--dss-form-gap`            | spacing-4    | 16px   | Gap entre campos de form     |
| `--dss-label-margin-bottom` | spacing-1    | 4px    | Margem inferior de labels    |

---

## 3. Tokens de Layout Estrutural

Tokens para componentes de layout de página (definidos em `_spacing.scss`):

### 3.1 Sidebar

| Token                          | Valor  | Descrição                      |
|--------------------------------|--------|--------------------------------|
| `--dss-layout-sidebar-width`   | 240px  | Largura padrão de sidebar      |
| `--dss-layout-sidebar-width-mini` | 64px | Largura de sidebar minimizada  |
| `--dss-layout-sidebar-width-wide` | 320px | Largura de sidebar expandida  |

### 3.2 Header

| Token                            | Valor  | Descrição                      |
|----------------------------------|--------|--------------------------------|
| `--dss-layout-header-height`     | 64px   | Altura padrão do header        |
| `--dss-layout-header-height-dense` | 48px | Altura de header compacto      |

### 3.3 Footer

| Token                         | Valor       | Descrição                      |
|-------------------------------|-------------|--------------------------------|
| `--dss-layout-footer-height`  | 64px        | Altura padrão do footer        |
| `--dss-layout-footer-padding` | spacing-10  | Padding do footer (40px)       |

### 3.4 Content

| Token                               | Valor  | Descrição                           |
|-------------------------------------|--------|-------------------------------------|
| `--dss-layout-content-max-width`    | 720px  | Largura máxima para leitura         |
| `--dss-layout-content-max-width-wide` | 960px | Largura expandida para dashboards   |

### 3.5 Page Margins

| Token                       | Valor Base   | Descrição                           |
|-----------------------------|--------------|-------------------------------------|
| `--dss-layout-page-margin-x`| spacing-4    | Margem horizontal da página (16px)  |
| `--dss-layout-page-margin-y`| spacing-6    | Margem vertical da página (24px)    |

---

## 4. Tokens de Margin

Aliases semânticos para margins:

| Token              | Valor Base   | Pixels |
|--------------------|--------------|--------|
| `--dss-margin-auto`| auto         | auto   |
| `--dss-margin-0`   | spacing-0    | 0px    |
| `--dss-margin-1`   | spacing-1    | 4px    |
| `--dss-margin-2`   | spacing-2    | 8px    |
| `--dss-margin-3`   | spacing-3    | 12px   |
| `--dss-margin-4`   | spacing-4    | 16px   |
| `--dss-margin-6`   | spacing-6    | 24px   |
| `--dss-margin-8`   | spacing-8    | 32px   |
| `--dss-margin-12`  | spacing-12   | 48px   |
| `--dss-margin-16`  | spacing-16   | 64px   |

---

## 5. Tokens de Padding

Aliases semânticos para paddings:

| Token              | Valor Base   | Pixels |
|--------------------|--------------|--------|
| `--dss-padding-0`  | spacing-0    | 0px    |
| `--dss-padding-1`  | spacing-1    | 4px    |
| `--dss-padding-2`  | spacing-2    | 8px    |
| `--dss-padding-3`  | spacing-3    | 12px   |
| `--dss-padding-4`  | spacing-4    | 16px   |
| `--dss-padding-6`  | spacing-6    | 24px   |
| `--dss-padding-8`  | spacing-8    | 32px   |
| `--dss-padding-12` | spacing-12   | 48px   |
| `--dss-padding-16` | spacing-16   | 64px   |

---

## 6. Tokens de Gap (Flex/Grid)

Aliases semânticos para gaps:

| Token           | Valor Base   | Pixels |
|-----------------|--------------|--------|
| `--dss-gap-0`   | spacing-0    | 0px    |
| `--dss-gap-1`   | spacing-1    | 4px    |
| `--dss-gap-2`   | spacing-2    | 8px    |
| `--dss-gap-3`   | spacing-3    | 12px   |
| `--dss-gap-4`   | spacing-4    | 16px   |
| `--dss-gap-6`   | spacing-6    | 24px   |
| `--dss-gap-8`   | spacing-8    | 32px   |
| `--dss-gap-12`  | spacing-12   | 48px   |

---

## 7. Tokens de Border Radius

| Token               | Valor Base   | Pixels | Descrição              |
|---------------------|--------------|--------|------------------------|
| `--dss-radius-none` | 0            | 0px    | Sem arredondamento     |
| `--dss-radius-sm`   | spacing-1    | 4px    | Arredondamento pequeno |
| `--dss-radius-md`   | spacing-2    | 8px    | Arredondamento médio   |
| `--dss-radius-lg`   | spacing-3    | 12px   | Arredondamento grande  |
| `--dss-radius-xl`   | spacing-4    | 16px   | Arredondamento XL      |
| `--dss-radius-2xl`  | spacing-5    | 20px   | Arredondamento 2XL     |
| `--dss-radius-3xl`  | spacing-6    | 24px   | Arredondamento 3XL     |
| `--dss-radius-full` | 9999px       | 9999px | Circular               |
| `--dss-radius-badge`| radius-full  | 9999px | Específico para badges |

---

## 8. Tokens de Acessibilidade

| Token                    | Valor Base      | Descrição                          |
|--------------------------|-----------------|-------------------------------------|
| `--dss-touch-spacing`    | spacing-2 (8px) | Mínimo entre elementos tocáveis    |
| `--dss-line-height-spacing` | calc(...)    | Line height como spacing           |

---

## 9. Uso em CSS

### Exemplo de Aplicação

```scss
.dss-card {
  padding: var(--dss-spacing-6);         // 24px
  margin-bottom: var(--dss-spacing-4);   // 16px
  border-radius: var(--dss-radius-lg);   // 12px
}

.dss-section {
  padding-block: var(--dss-section-spacing);  // 48px
  gap: var(--dss-grid-gap-md);                // 16px
}

.dss-sidebar {
  width: var(--dss-layout-sidebar-width);     // 240px
}

.dss-header {
  height: var(--dss-layout-header-height);    // 64px
}
```

### Com Classes Quasar

O Quasar usa sua própria escala de espaçamento (`q-pa-*`, `q-ma-*`). Para integração, prefira tokens DSS para valores customizados:

```vue
<template>
  <!-- Usando classes Quasar padrão -->
  <q-card class="q-pa-md q-ma-sm">
    <!-- q-pa-md = 16px, q-ma-sm = 8px -->
  </q-card>

  <!-- Usando tokens DSS para valores específicos -->
  <q-card :style="{ padding: 'var(--dss-spacing-6)' }">
    <!-- padding: 24px (não disponível diretamente no Quasar) -->
  </q-card>
</template>
```

---

## 10. Princípio de Tokens

O DSS segue o princípio **"Tokens = Provedores, Componentes = Consumidores"**:

- ✅ **Tokens genéricos**: `--dss-spacing-*`, `--dss-radius-*`
- ❌ **Tokens component-specific removidos**: `--dss-button-padding-*`, `--dss-card-padding-*`

Os componentes devem consumir tokens genéricos livremente, sem depender de tokens específicos por componente.

**Benefícios:**
- **Escalabilidade**: 100 componentes = mesmos tokens
- **Flexibilidade**: Componentes escolhem livremente
- **Manutenibilidade**: Mudanças isoladas nos componentes

---

## 11. Referência Cruzada

- **Breakpoints**: Veja `docs/tokens/breakpoints.md` (se existir) ou `tokens/semantic/_breakpoints.scss`
- **Cores**: Veja `docs/tokens/colors.md`
- **Acessibilidade**: Veja `docs/tokens/accessibility.md`
- **Grid e Layout**: Veja `docs/guides/dss-grid-layout.md`
