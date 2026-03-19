# DssTextarea

Campo de texto multilinhas do Design System Sansys. Wrapper do `QInput` com `type="textarea"` fixado internamente.

## Instalação

```javascript
import { DssTextarea } from '@dss/components/DssTextarea'
```

## Uso Básico

```vue
<!-- Textarea simples -->
<DssTextarea
  v-model="description"
  label="Descrição"
  hint="Descreva em poucas palavras"
/>

<!-- Autogrow com limite de altura -->
<DssTextarea
  v-model="notes"
  label="Notas"
  autogrow
  max-height="300px"
/>

<!-- Com erro -->
<DssTextarea
  v-model="message"
  label="Mensagem"
  :error="hasError"
  error-message="Mínimo de 20 caracteres"
/>
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `string` | `''` | Valor (v-model) |
| `variant` | `'outlined' \| 'filled' \| 'standout' \| 'borderless'` | `'outlined'` | Variante visual |
| `dense` | `boolean` | `false` | Versão compacta |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys |
| `label` | `string` | `''` | Label flutuante |
| `stackLabel` | `boolean` | `false` | Label sempre no topo |
| `placeholder` | `string` | `''` | Placeholder |
| `hint` | `string` | `''` | Texto de ajuda |
| `errorMessage` | `string` | `''` | Mensagem de erro |
| `error` | `boolean` | `false` | Estado de erro |
| `disabled` | `boolean` | `false` | Desabilitado |
| `readonly` | `boolean` | `false` | Somente leitura |
| `loading` | `boolean` | `false` | Loading |
| `required` | `boolean` | `false` | Obrigatório (aria-required) |
| `clearable` | `boolean` | `false` | Botão de limpar |
| `autogrow` | `boolean` | `false` | Cresce com o conteúdo |
| `rows` | `number \| string` | `3` | Linhas iniciais |
| `maxHeight` | `string` | — | Altura máxima (ex.: `'300px'`) |
| `ariaLabel` | `string` | — | Label de acessibilidade |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado |

## Quando NÃO usar

- Para inputs de linha única → use `DssInput`
- Quando `type` precisar variar → use `DssInput` (que aceita `type` como prop)
- Fora de formulários → prefira `<p>` para textos estáticos

## Links

- [Documentação completa](./DssTextarea.md)
- [API Reference](./DSSTEXTAREA_API.md)
- [Exemplos interativos](./DssTextarea.example.vue)
