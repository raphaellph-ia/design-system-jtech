<template>
  <div :class="wrapperClasses">
    <!-- Before slot -->
    <div v-if="$slots.before" class="dss-input__before">
      <slot name="before" />
    </div>

    <!-- Main field wrapper -->
    <div class="dss-input__field">
      <!-- Prepend slot -->
      <div v-if="$slots.prepend" class="dss-input__prepend">
        <slot name="prepend" />
      </div>

      <!-- Input control -->
      <div class="dss-input__control">
        <!-- Label -->
        <label v-if="label || $slots.label" :class="labelClasses">
          <slot name="label">{{ label }}</slot>
        </label>

        <!-- Native input -->
        <input
          ref="inputRef"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="inputClasses"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>

      <!-- Append slot -->
      <div v-if="$slots.append || clearable" class="dss-input__append">
        <slot name="append" />
        <button
          v-if="clearable && modelValue"
          class="dss-input__clear"
          type="button"
          @click="handleClear"
          aria-label="Clear input"
        >
          ×
        </button>
      </div>
    </div>

    <!-- After slot -->
    <div v-if="$slots.after" class="dss-input__after">
      <slot name="after" />
    </div>

    <!-- Bottom slots (hint/error) -->
    <div v-if="hasBottomSlot" class="dss-input__bottom">
      <div v-if="error && errorMessage" class="dss-input__error">
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div v-else-if="hint" class="dss-input__hint">
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DssInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    variant: {
      type: String,
      default: 'outlined',
      validator: (value) => ['filled', 'outlined', 'standout', 'borderless'].includes(value)
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    stackLabel: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    brand: {
      type: String,
      default: null,
      validator: (value) => !value || ['hub', 'water', 'waste'].includes(value)
    }
  },

  data() {
    return {
      isFocused: false
    }
  },

  computed: {
    wrapperClasses() {
      return [
        'dss-input',
        `dss-input--${this.variant}`,
        {
          'dss-input--focused': this.isFocused,
          'dss-input--error': this.error,
          'dss-input--disabled': this.disabled,
          'dss-input--readonly': this.readonly,
          'dss-input--dense': this.dense,
          'dss-input--loading': this.loading,
          'dss-input--filled': this.hasValue,
          [`dss-input--brand-${this.brand}`]: this.brand
        }
      ]
    },

    labelClasses() {
      return [
        'dss-input__label',
        {
          'dss-input__label--stack': this.stackLabel,
          'dss-input__label--float': this.hasValue || this.isFocused
        }
      ]
    },

    inputClasses() {
      return 'dss-input__native'
    },

    hasValue() {
      return this.modelValue !== '' && this.modelValue !== null && this.modelValue !== undefined
    },

    hasBottomSlot() {
      return (this.error && this.errorMessage) || this.hint || this.$slots.error || this.$slots.hint
    }
  },

  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },

    handleFocus(event) {
      this.isFocused = true
      this.$emit('focus', event)
    },

    handleBlur(event) {
      this.isFocused = false
      this.$emit('blur', event)
    },

    handleClear() {
      this.$emit('update:modelValue', '')
      this.$refs.inputRef.focus()
    },

    focus() {
      this.$refs.inputRef?.focus()
    },

    blur() {
      this.$refs.inputRef?.blur()
    }
  }
}
</script>

<style src="../DssInput.module.scss" module></style>
