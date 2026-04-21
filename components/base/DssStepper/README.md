# DssStepper

Container de navegação em etapas (wizard) do Design System Sansys.

## Quick Start

```vue
<DssStepper v-model="currentStep" animated>
  <DssStep name="1" title="Informações" caption="Dados pessoais" :done="currentStep > 1">
    <p>Conteúdo do passo 1.</p>
    <q-stepper-navigation>
      <q-btn color="primary" label="Próximo" @click="currentStep = 2" />
    </q-stepper-navigation>
  </DssStep>

  <DssStep name="2" title="Confirmação">
    <p>Revise e confirme.</p>
    <q-stepper-navigation>
      <q-btn color="primary" label="Finalizar" @click="currentStep = 1" />
      <q-btn flat label="Anterior" class="q-ml-sm" @click="currentStep = 1" />
    </q-stepper-navigation>
  </DssStep>
</DssStepper>
```

## Quando usar

- Fluxos de trabalho em múltiplas etapas (onboarding, checkout, configuração)
- Processos com ordem definida onde o usuário avança passo a passo
- Wizards que precisam indicar progresso visual claro

## Quando NÃO usar

- Navegação entre conteúdos sem ordem definida → use `DssTabs`
- Listas de itens sem estado de progresso → use `DssList`
- Etapas simples com 2 opções → use `DssToggle` ou botões

## Props Principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `v-model` | `string \| number` | — | Passo atualmente ativo |
| `vertical` | `boolean` | `false` | Layout vertical |
| `headerNav` | `boolean` | `false` | Clicar no cabeçalho para navegar |
| `animated` | `boolean` | `false` | Anima transição entre painéis |
| `flat` | `boolean` | `false` | Remove sombra (use dentro de cards) |
| `bordered` | `boolean` | `false` | Adiciona borda ao container |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Acento visual de marca |

## Props Bloqueadas

| Prop | Razão |
|------|-------|
| `dark` | Governado por `[data-theme='dark']` via tokens DSS |
| `color` / `active-color` / `done-color` / `error-color` / `inactive-color` | Governados por tokens DSS no `DssStep` filho |

## Modos

### Horizontal (padrão)
```vue
<DssStepper v-model="step">
  <DssStep name="1" title="Passo 1"> ... </DssStep>
  <DssStep name="2" title="Passo 2"> ... </DssStep>
</DssStepper>
```

### Vertical
```vue
<DssStepper v-model="step" vertical>
  <DssStep name="1" title="Passo 1"> ... </DssStep>
</DssStepper>
```

### Com navegação livre
```vue
<DssStepper v-model="step" header-nav>
  <DssStep name="1" title="Passo 1" header-nav> ... </DssStep>
</DssStepper>
```

### Com marca
```vue
<DssStepper v-model="step" brand="hub">
  <DssStep name="1" title="Passo 1"> ... </DssStep>
</DssStepper>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background do container |
| `--dss-text-body` | Cor de texto base herdada pelos filhos |
| `--dss-radius-md` | Borda arredondada do container |
| `--dss-gray-200` | Cor da borda (bordered=true) |
| `--dss-gray-300` | Linha conectora entre passos (fallback container) |
| `--dss-border-width-thin` | Espessura da borda (bordered=true) |

## Links

- [Documentação Completa](./DssStepper.md)
- [API Reference](./DSSSTEPPER_API.md)
- [Exemplos](./DssStepper.example.vue)
- [DssStep](../DssStep/README.md) — componente filho obrigatório
