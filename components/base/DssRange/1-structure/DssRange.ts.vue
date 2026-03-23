<script setup lang="ts">
/**
 * DssRange — Implementação Canônica
 *
 * Wrapper DSS para QRange do Quasar.
 * Segue a mesma arquitetura do DssSlider (Golden Reference).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA — CLAUDE.md §7.1) ────
 *
 * inheritAttrs: false
 *   $attrs (classe extra, id, data-*, aria-* adicionais) são encaminhados
 *   explicitamente para o QRange via v-bind="$attrs". O wrapper div externo
 *   NÃO recebe $attrs.
 *
 * Delegação total ao QRange:
 *   Lógica de drag, cálculo de porcentagem e colisão entre thumbs são
 *   responsabilidade exclusiva do QRange. Não há reimplementação.
 *
 * Wrapper div externo:
 *   Necessário porque QRange não é um QField e não suporta hint/errorMessage
 *   nativamente. O hint e errorMessage são renderizados como irmãos do QRange.
 *
 * Elementos decorativos:
 *   Nenhum. Todos os elementos têm semântica ou texto visível.
 *
 * Estados NÃO APLICÁVEIS:
 *   - indeterminate: range é numérico contínuo com dois pontos definidos
 *   - loading: Fase 1 é síncrona; delegue ao wrapper de formulário se necessário
 *
 * @see ../DssRange.vue (entry point wrapper)
 * @see ../../DssSlider (Golden Reference — mesma arquitetura)
 */
import { computed, ref, getCurrentInstance } from 'vue'
import { QRange } from 'quasar'
import type { RangeProps, RangeEmits, RangeExpose, RangeValue } from '../types/range.types'
import { useRangeClasses } from '../composables/useRangeClasses'
import { useRangeState }   from '../composables/useRangeState'
import { useRangeActions } from '../composables/useRangeActions'

defineOptions({ name: 'DssRange', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<RangeProps>(), {
  min:          0,
  max:          100,
  step:         1,
  label:        false,
  markers:      false,
  dragRange:    false,
  dense:        false,
  disabled:     false,
  readonly:     false,
  error:        false,
  errorMessage: '',
  hint:         '',
  brand:        null,
  tabindex:     null,
  ariaLabel:    undefined
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<RangeEmits>()

// ─── Composables ─────────────────────────────────────────────────────────────

const { isFocused, handleFocusIn, handleFocusOut } = useRangeState()
const { wrapperClasses } = useRangeClasses(props, { isFocused })

// ─── Refs ────────────────────────────────────────────────────────────────────

const qRangeRef = ref<{ $el: HTMLElement } | null>(null)
const { focus, blur } = useRangeActions(qRangeRef)

// ─── IDs para acessibilidade ─────────────────────────────────────────────────
//
// getCurrentInstance().uid garante unicidade por instância de componente,
// evitando colisões de id em múltiplas instâncias na mesma página.

const uid = getCurrentInstance()?.uid ?? 0
const errorId = `dss-range-error-${uid}`

// ─── Computed ────────────────────────────────────────────────────────────────

const computedTabindex = computed<number | string>(() => {
  if (props.disabled) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) return props.tabindex
  return 0
})

const errorDescribedBy = computed<string | undefined>(() => {
  if (props.error && props.errorMessage) return errorId
  return undefined
})

// ─── Dev Warnings ────────────────────────────────────────────────────────────

if (process.env.NODE_ENV !== 'production' && !props.ariaLabel) {
  console.warn(
    '[DssRange] A prop `ariaLabel` é fortemente recomendada para acessibilidade.' +
    ' Range sliders sem rótulo verbal violam WCAG 1.3.1 (Name, Role, Value).'
  )
}

// ─── Expose ──────────────────────────────────────────────────────────────────

defineExpose<RangeExpose>({ focus, blur })
</script>

<template>
  <!--
    Wrapper externo necessário pois QRange não é QField.
    Hint e errorMessage são filhos diretos do wrapper, abaixo do QRange.
    data-brand é aplicado ao wrapper para habilitar cascata de brand tokens no SCSS.
  -->
  <div
    :class="wrapperClasses"
    :data-brand="brand ?? undefined"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <!--
      QRange: delegação 100% de drag, cálculo de posição e colisão de thumbs.
      $attrs encaminhado aqui (não no wrapper) — inheritAttrs: false.
    -->
    <QRange
      ref="qRangeRef"
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :label="label"
      :markers="markers"
      :drag-range="dragRange"
      :dense="dense"
      :disable="disabled"
      :readonly="readonly"
      :tabindex="computedTabindex"
      :aria-label="ariaLabel"
      :aria-describedby="errorDescribedBy"
      v-bind="$attrs"
      @update:model-value="(val: RangeValue) => emit('update:modelValue', val)"
      @change="(val: RangeValue) => emit('change', val)"
    />

    <!-- Mensagem de erro — role="alert" notifica leitores de tela imediatamente -->
    <span
      v-if="error && errorMessage"
      :id="errorId"
      class="dss-range__error"
      role="alert"
      aria-live="polite"
    >{{ errorMessage }}</span>

    <!-- Hint — exibido apenas quando não há erro ativo -->
    <span
      v-else-if="hint"
      class="dss-range__hint"
    >{{ hint }}</span>
  </div>
</template>
