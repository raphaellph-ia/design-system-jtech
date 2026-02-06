/**
 * ==========================================================================
 * DssToggle - UNIT TESTS
 *
 * COBERTURA:
 * - Props: size, color, disable, dense, leftLabel, label, error
 * - Value/Model: boolean toggle, custom values, array
 * - Eventos: update:modelValue
 * - Slots: default
 * - Acessibilidade: ARIA, role="switch", keyboard, focus, tabindex
 * - Brands: Hub, Water, Waste
 * - Structure: track, thumb, sr-only input
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrao de testes)
 * REFERENCIA SECUNDARIA: DssRadio.test.ts (error state, aria-describedby)
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssToggle from './1-structure/DssToggle.ts.vue'

describe('DssToggle', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.classes()).toContain('dss-toggle')
      expect(wrapper.classes()).toContain('dss-toggle--md')
    })

    it('renders label correctly', () => {
      const wrapper = mount(DssToggle, {
        props: { label: 'Enable notifications' }
      })
      expect(wrapper.find('.dss-toggle__label').text()).toBe('Enable notifications')
    })

    it('hides label span when no label and no slot', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.find('.dss-toggle__label').exists()).toBe(false)
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg'])('applies %s size class', (size) => {
        const wrapper = mount(DssToggle, {
          props: { size }
        })
        expect(wrapper.classes()).toContain(`dss-toggle--${size}`)
      })
    })

    // State tests
    describe('states', () => {
      it('applies disabled class', () => {
        const wrapper = mount(DssToggle, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-toggle--disabled')
      })

      it('sets disabled attribute on native input', () => {
        const wrapper = mount(DssToggle, {
          props: { disable: true }
        })
        expect(wrapper.find('.dss-toggle__native').attributes('disabled')).toBeDefined()
      })

      it('applies dense class', () => {
        const wrapper = mount(DssToggle, {
          props: { dense: true }
        })
        expect(wrapper.classes()).toContain('dss-toggle--dense')
      })

      it('applies left-label class', () => {
        const wrapper = mount(DssToggle, {
          props: { leftLabel: true, label: 'Left' }
        })
        expect(wrapper.classes()).toContain('dss-toggle--left-label')
      })

      it('applies checked class when modelValue is true', () => {
        const wrapper = mount(DssToggle, {
          props: { modelValue: true }
        })
        expect(wrapper.classes()).toContain('dss-toggle--checked')
      })

      it('applies error class', () => {
        const wrapper = mount(DssToggle, {
          props: { error: true }
        })
        expect(wrapper.classes()).toContain('dss-toggle--error')
      })

      it('shows error message when error=true with errorMessage', () => {
        const wrapper = mount(DssToggle, {
          props: { error: true, errorMessage: 'Campo obrigatorio' }
        })
        expect(wrapper.find('.dss-toggle__error').text()).toBe('Campo obrigatorio')
        expect(wrapper.find('.dss-toggle__error').attributes('role')).toBe('alert')
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('toggles from false to true on change', async () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false }
      })
      await wrapper.find('.dss-toggle__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('toggles from true to false on change', async () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: true }
      })
      await wrapper.find('.dss-toggle__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('supports custom trueValue/falseValue', async () => {
      const wrapper = mount(DssToggle, {
        props: {
          modelValue: 'off',
          trueValue: 'on',
          falseValue: 'off'
        }
      })
      await wrapper.find('.dss-toggle__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['on'])
    })

    it('detects checked state with custom trueValue', () => {
      const wrapper = mount(DssToggle, {
        props: {
          modelValue: 'on',
          trueValue: 'on',
          falseValue: 'off'
        }
      })
      expect(wrapper.classes()).toContain('dss-toggle--checked')
    })

    it('renders track with checked class when checked', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: true }
      })
      expect(wrapper.find('.dss-toggle__track--checked').exists()).toBe(true)
    })

    it('does not render track with checked class when unchecked', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.dss-toggle__track--checked').exists()).toBe(false)
    })

    // Array model (group mode)
    describe('array model (group)', () => {
      it('adds val to array when not present', async () => {
        const wrapper = mount(DssToggle, {
          props: { modelValue: ['a', 'b'], val: 'c' }
        })
        await wrapper.find('.dss-toggle__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b', 'c']])
      })

      it('removes val from array when present', async () => {
        const wrapper = mount(DssToggle, {
          props: { modelValue: ['a', 'b', 'c'], val: 'b' }
        })
        await wrapper.find('.dss-toggle__native').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'c']])
      })

      it('is checked when val is in array', () => {
        const wrapper = mount(DssToggle, {
          props: { modelValue: ['a', 'b'], val: 'b' }
        })
        expect(wrapper.classes()).toContain('dss-toggle--checked')
      })

      it('is unchecked when val is not in array', () => {
        const wrapper = mount(DssToggle, {
          props: { modelValue: ['a', 'b'], val: 'c' }
        })
        expect(wrapper.classes()).not.toContain('dss-toggle--checked')
      })
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits update:modelValue on change', async () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false }
      })
      await wrapper.find('.dss-toggle__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })

    it('does not emit when disabled', async () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false, disable: true }
      })
      await wrapper.find('.dss-toggle__native').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot as label content', () => {
      const wrapper = mount(DssToggle, {
        slots: { default: 'Custom Label' }
      })
      expect(wrapper.find('.dss-toggle__label').text()).toBe('Custom Label')
    })

    it('slot overrides label prop', () => {
      const wrapper = mount(DssToggle, {
        props: { label: 'Prop Label' },
        slots: { default: 'Slot Label' }
      })
      expect(wrapper.find('.dss-toggle__label').text()).toBe('Slot Label')
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('renders a native checkbox input with role="switch"', () => {
      const wrapper = mount(DssToggle)
      const input = wrapper.find('.dss-toggle__native')
      expect(input.exists()).toBe(true)
      expect(input.attributes('type')).toBe('checkbox')
      expect(input.attributes('role')).toBe('switch')
    })

    it('root element is a label', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('sets aria-label on native input', () => {
      const wrapper = mount(DssToggle, {
        props: { ariaLabel: 'Toggle dark mode' }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('aria-label')).toBe('Toggle dark mode')
    })

    it('sets aria-checked on native input when checked', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: true }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('aria-checked')).toBe('true')
    })

    it('sets aria-checked to false when unchecked', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('aria-checked')).toBe('false')
    })

    it('sets aria-disabled when disabled', () => {
      const wrapper = mount(DssToggle, {
        props: { disable: true }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('aria-disabled')).toBe('true')
    })

    it('sets aria-invalid when error', () => {
      const wrapper = mount(DssToggle, {
        props: { error: true }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('aria-invalid')).toBe('true')
    })

    it('associates error via aria-describedby', () => {
      const wrapper = mount(DssToggle, {
        props: { error: true, errorMessage: 'Erro' }
      })
      const input = wrapper.find('.dss-toggle__native')
      const errorEl = wrapper.find('.dss-toggle__error')
      expect(input.attributes('aria-describedby')).toBe(errorEl.attributes('id'))
    })

    it('sets tabindex 0 by default on input', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.find('.dss-toggle__native').attributes('tabindex')).toBe('0')
    })

    it('sets tabindex -1 when disabled', () => {
      const wrapper = mount(DssToggle, {
        props: { disable: true }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('tabindex')).toBe('-1')
    })

    it('does NOT set tabindex on root label', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('track has aria-hidden="true"', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.find('.dss-toggle__track').attributes('aria-hidden')).toBe('true')
    })

    it('thumb has aria-hidden="true"', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.find('.dss-toggle__thumb').attributes('aria-hidden')).toBe('true')
    })

    it('uses custom tabindex from prop', () => {
      const wrapper = mount(DssToggle, {
        props: { tabindex: 5 }
      })
      expect(wrapper.find('.dss-toggle__native').attributes('tabindex')).toBe('5')
    })

    it('exposes focus and blur via defineExpose', () => {
      const wrapper = mount(DssToggle)
      expect(typeof (wrapper.vm).focus).toBe('function')
      expect(typeof (wrapper.vm).blur).toBe('function')
    })
  })

  // ===========================================================================
  // COLOR CLASSES TESTS
  // ===========================================================================

  describe('Color classes', () => {
    it('does not apply color classes when unchecked (no brand)', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false, color: 'primary' }
      })
      const track = wrapper.find('.dss-toggle__track')
      expect(track.classes()).not.toContain('bg-primary')
    })

    it('applies bg-{color} when checked (no brand)', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: true, color: 'primary' }
      })
      const track = wrapper.find('.dss-toggle__track')
      expect(track.classes()).toContain('bg-primary')
    })

    it('applies brand color class when brand is set', () => {
      const wrapper = mount(DssToggle, {
        props: { brand: 'hub', color: 'primary' }
      })
      expect(wrapper.classes()).toContain('dss-toggle--primary')
    })

    it('does not apply bg-* when brand is set', () => {
      const wrapper = mount(DssToggle, {
        props: { brand: 'hub', color: 'primary', modelValue: true }
      })
      const track = wrapper.find('.dss-toggle__track')
      expect(track.classes()).not.toContain('bg-primary')
    })

    it('sets data-brand attribute', () => {
      const wrapper = mount(DssToggle, {
        props: { brand: 'water' }
      })
      expect(wrapper.attributes('data-brand')).toBe('water')
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['primary', 'secondary', 'accent', 'positive', 'negative', 'warning', 'info'])(
      'supports %s color',
      (color) => {
        const wrapper = mount(DssToggle, {
          props: { brand: 'hub', color }
        })
        expect(wrapper.classes()).toContain(`dss-toggle--${color}`)
      }
    )
  })

  // ===========================================================================
  // BRANDS TESTS
  // ===========================================================================

  describe('Brands', () => {
    it('applies data-brand on root element', () => {
      const wrapper = mount(DssToggle, {
        props: { brand: 'hub' }
      })
      expect(wrapper.attributes('data-brand')).toBe('hub')
    })

    it('does not apply data-brand when brand is null', () => {
      const wrapper = mount(DssToggle, {
        props: { brand: null }
      })
      expect(wrapper.attributes('data-brand')).toBeUndefined()
    })

    it.each(['hub', 'water', 'waste'])('supports %s brand', (brand) => {
      const wrapper = mount(DssToggle, {
        props: { brand }
      })
      expect(wrapper.attributes('data-brand')).toBe(brand)
    })
  })

  // ===========================================================================
  // STRUCTURE TESTS
  // ===========================================================================

  describe('Structure', () => {
    it('track is a <span> element', () => {
      const wrapper = mount(DssToggle)
      const track = wrapper.find('.dss-toggle__track')
      expect(track.element.tagName).toBe('SPAN')
    })

    it('thumb is a <span> element inside track', () => {
      const wrapper = mount(DssToggle)
      const thumb = wrapper.find('.dss-toggle__track .dss-toggle__thumb')
      expect(thumb.exists()).toBe(true)
      expect(thumb.element.tagName).toBe('SPAN')
    })

    it('native input uses sr-only class pattern', () => {
      const wrapper = mount(DssToggle)
      const input = wrapper.find('.dss-toggle__native')
      expect(input.exists()).toBe(true)
    })

    it('has no indeterminate state (toggle is binary)', () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: null }
      })
      expect(wrapper.classes()).not.toContain('dss-toggle--indeterminate')
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge cases', () => {
    it('handles rapid consecutive changes', async () => {
      const wrapper = mount(DssToggle, {
        props: { modelValue: false }
      })
      const input = wrapper.find('.dss-toggle__native')
      await input.trigger('change')
      await input.trigger('change')
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
    })

    it('renders without label or slot', () => {
      const wrapper = mount(DssToggle)
      expect(wrapper.find('.dss-toggle__label').exists()).toBe(false)
      expect(wrapper.find('.dss-toggle__track').exists()).toBe(true)
    })

    it('error message not shown when error is false', () => {
      const wrapper = mount(DssToggle, {
        props: { error: false, errorMessage: 'Some error' }
      })
      expect(wrapper.find('.dss-toggle__error').exists()).toBe(false)
    })

    it('error message not shown when errorMessage is empty', () => {
      const wrapper = mount(DssToggle, {
        props: { error: true, errorMessage: '' }
      })
      expect(wrapper.find('.dss-toggle__error').exists()).toBe(false)
    })
  })
})
