<template>
  <div
    :class="cardClasses"
    :style="cardStyles"
    v-bind="cardAttrs"
    @click="handleClick"
    @keydown.enter="handleKeydown"
    @keydown.space.prevent="handleKeydown"
  >
    <!-- Card content slot -->
    <slot />
  </div>
</template>

<script>
/**
 * DssCard - LAYER 1: STRUCTURE
 *
 * Componente de card baseado no Quasar q-card
 * Filosofia DSS: Este componente APENAS define estrutura e props.
 * Estilos são aplicados via tokens genéricos nas camadas 2-4.
 *
 * @component
 * @example
 * <DssCard variant="elevated" clickable>
 *   <DssCardSection>Content here</DssCardSection>
 *   <DssCardActions>
 *     <DssButton>Action</DssButton>
 *   </DssCardActions>
 * </DssCard>
 */
export default {
  name: 'DssCard',

  props: {
    /**
     * Visual variant of the card
     * @values elevated, flat, bordered, outlined
     */
    variant: {
      type: String,
      default: 'elevated',
      validator: (value) => ['elevated', 'flat', 'bordered', 'outlined'].includes(value)
    },

    /**
     * Remove border-radius (square corners)
     */
    square: {
      type: Boolean,
      default: false
    },

    /**
     * Make card clickable (adds hover effects)
     */
    clickable: {
      type: Boolean,
      default: false
    },

    /**
     * Dark mode variant
     */
    dark: {
      type: Boolean,
      default: false
    },

    /**
     * Brand variant (Hub, Water, Waste)
     * @values null, hub, water, waste
     */
    brand: {
      type: String,
      default: null,
      validator: (value) => !value || ['hub', 'water', 'waste'].includes(value)
    }
  },

  emits: ['click'],

  computed: {
    cardClasses() {
      return [
        'dss-card',
        `dss-card--${this.variant}`,
        {
          'dss-card--square': this.square,
          'dss-card--clickable': this.clickable,
          'dss-card--dark': this.dark,
          [`dss-card--brand-${this.brand}`]: this.brand
        }
      ]
    },

    cardStyles() {
      // Future: dynamic styles if needed
      return {}
    },

    /**
     * Adiciona atributos de acessibilidade quando clickable
     */
    cardAttrs() {
      const attrs = { ...this.$attrs }

      if (this.clickable) {
        attrs.tabindex = attrs.tabindex ?? '0'
        attrs.role = attrs.role ?? 'article'
      }

      return attrs
    }
  },

  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    },

    /**
     * Handler para navegação por teclado (Enter e Space)
     * Conforme WCAG 2.1 AA
     */
    handleKeydown(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Import final compiled styles (Layer 4)
@import '../DssCard.module.scss';
</style>
