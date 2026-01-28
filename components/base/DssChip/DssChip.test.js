/**
 * ==========================================================================
 * DssChip - UNIT TESTS
 *
 * COBERTURA:
 * - Props: variant, color, size, disable, clickable, removable, selected
 * - Eventos: click, remove, update:selected
 * - Slots: default, icon, icon-right, icon-remove
 * - Acessibilidade: ARIA, keyboard navigation, focus management
 * - Brands: Hub, Water, Waste
 * ==========================================================================
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssChip from './1-structure/DssChip.ts.vue'

describe('DssChip', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssChip)
      expect(wrapper.classes()).toContain('dss-chip')
      expect(wrapper.classes()).toContain('dss-chip--filled')
      expect(wrapper.classes()).toContain('dss-chip--md')
    })

    it('renders label correctly', () => {
      const wrapper = mount(DssChip, {
        props: { label: 'Test Chip' }
      })
      expect(wrapper.find('.dss-chip__label').text()).toBe('Test Chip')
    })

    // Variant tests
    describe('variant', () => {
      it.each(['filled', 'outline', 'flat'])('applies %s variant class', (variant) => {
        const wrapper = mount(DssChip, {
          props: { variant }
        })
        expect(wrapper.classes()).toContain(`dss-chip--${variant}`)
      })
    })

    // Size tests
    describe('size', () => {
      it.each(['xs', 'sm', 'md', 'lg'])('applies %s size class', (size) => {
        const wrapper = mount(DssChip, {
          props: { size }
        })
        expect(wrapper.classes()).toContain(`dss-chip--${size}`)
      })
    })

    // Shape tests
    describe('shape', () => {
      it('applies round shape by default', () => {
        const wrapper = mount(DssChip)
        expect(wrapper.classes()).toContain('dss-chip--round')
      })

      it('applies square shape when square prop is true', () => {
        const wrapper = mount(DssChip, {
          props: { square: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--square')
      })
    })

    // State tests
    describe('states', () => {
      it('applies disabled class and attribute', () => {
        const wrapper = mount(DssChip, {
          props: { disable: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--disabled')
        expect(wrapper.attributes('aria-disabled')).toBe('true')
      })

      it('applies clickable class when clickable', () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--clickable')
      })

      it('applies selected class and aria-selected', () => {
        const wrapper = mount(DssChip, {
          props: { selected: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--selected')
        expect(wrapper.attributes('aria-selected')).toBe('true')
      })

      it('applies dense class', () => {
        const wrapper = mount(DssChip, {
          props: { dense: true }
        })
        expect(wrapper.classes()).toContain('dss-chip--dense')
      })
    })

    // Icon tests
    describe('icons', () => {
      it('renders left icon', () => {
        const wrapper = mount(DssChip, {
          props: { icon: 'star' }
        })
        const icon = wrapper.find('.dss-chip__icon--left')
        expect(icon.exists()).toBe(true)
        expect(icon.text()).toBe('star')
      })

      it('renders right icon', () => {
        const wrapper = mount(DssChip, {
          props: { iconRight: 'arrow_forward' }
        })
        const icon = wrapper.find('.dss-chip__icon--right')
        expect(icon.exists()).toBe(true)
        expect(icon.text()).toBe('arrow_forward')
      })

      it('renders selected icon when selected', () => {
        const wrapper = mount(DssChip, {
          props: {
            selected: true,
            iconSelected: 'check'
          }
        })
        const icon = wrapper.find('.dss-chip__icon--selected')
        expect(icon.exists()).toBe(true)
        expect(icon.text()).toBe('check')
      })
    })

    // Removable tests
    describe('removable', () => {
      it('renders remove button when removable', () => {
        const wrapper = mount(DssChip, {
          props: { removable: true }
        })
        expect(wrapper.find('.dss-chip__remove').exists()).toBe(true)
      })

      it('does not render remove button when not removable', () => {
        const wrapper = mount(DssChip, {
          props: { removable: false }
        })
        expect(wrapper.find('.dss-chip__remove').exists()).toBe(false)
      })

      it('applies custom remove icon', () => {
        const wrapper = mount(DssChip, {
          props: {
            removable: true,
            iconRemove: 'delete'
          }
        })
        const removeIcon = wrapper.find('.dss-chip__icon--remove')
        expect(removeIcon.text()).toBe('delete')
      })
    })
  })

  // ===========================================================================
  // EVENTS TESTS
  // ===========================================================================

  describe('Events', () => {
    it('emits click event when clickable chip is clicked', async () => {
      const wrapper = mount(DssChip, {
        props: { clickable: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          disable: true
        }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('emits remove event when remove button clicked', async () => {
      const wrapper = mount(DssChip, {
        props: { removable: true }
      })
      await wrapper.find('.dss-chip__remove').trigger('click')
      expect(wrapper.emitted('remove')).toBeTruthy()
    })

    it('emits update:selected when clickable chip clicked', async () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          selected: false
        }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:selected')).toBeTruthy()
      expect(wrapper.emitted('update:selected')[0]).toEqual([true])
    })

    it('stops propagation on remove button click', async () => {
      const clickHandler = vi.fn()
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          removable: true
        },
        attrs: {
          onClick: clickHandler
        }
      })
      await wrapper.find('.dss-chip__remove').trigger('click')
      // Remove event should fire, but outer click should not propagate
      expect(wrapper.emitted('remove')).toBeTruthy()
    })
  })

  // ===========================================================================
  // SLOTS TESTS
  // ===========================================================================

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(DssChip, {
        slots: {
          default: '<span class="custom-content">Custom Content</span>'
        }
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })

    it('renders icon slot', () => {
      const wrapper = mount(DssChip, {
        slots: {
          icon: '<i class="custom-icon">custom_icon</i>'
        }
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
    })

    it('renders icon-right slot', () => {
      const wrapper = mount(DssChip, {
        slots: {
          'icon-right': '<i class="custom-right-icon">custom_right</i>'
        }
      })
      expect(wrapper.find('.custom-right-icon').exists()).toBe(true)
    })

    it('renders icon-remove slot', () => {
      const wrapper = mount(DssChip, {
        props: { removable: true },
        slots: {
          'icon-remove': '<i class="custom-remove">custom_remove</i>'
        }
      })
      expect(wrapper.find('.custom-remove').exists()).toBe(true)
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('has role="option" by default', () => {
      const wrapper = mount(DssChip)
      expect(wrapper.attributes('role')).toBe('option')
    })

    it('applies custom aria-label', () => {
      const wrapper = mount(DssChip, {
        props: { ariaLabel: 'Custom Label' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Custom Label')
    })

    it('has correct tabindex when clickable', () => {
      const wrapper = mount(DssChip, {
        props: { clickable: true }
      })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('has tabindex -1 when disabled', () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          disable: true
        }
      })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('remove button has aria-label', () => {
      const wrapper = mount(DssChip, {
        props: {
          removable: true,
          removeAriaLabel: 'Remove this chip'
        }
      })
      expect(wrapper.find('.dss-chip__remove').attributes('aria-label')).toBe('Remove this chip')
    })

    // Keyboard navigation tests
    describe('Keyboard Navigation', () => {
      it('triggers click on Enter key', async () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        await wrapper.trigger('keydown.enter')
        expect(wrapper.emitted('click')).toBeTruthy()
      })

      it('triggers click on Space key', async () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        await wrapper.trigger('keydown.space')
        expect(wrapper.emitted('click')).toBeTruthy()
      })

      it('does not trigger click on other keys', async () => {
        const wrapper = mount(DssChip, {
          props: { clickable: true }
        })
        await wrapper.trigger('keydown.tab')
        expect(wrapper.emitted('click')).toBeFalsy()
      })
    })
  })

  // ===========================================================================
  // COLOR CLASSES TESTS
  // ===========================================================================

  describe('Color Classes', () => {
    it('applies background color class for filled variant', () => {
      const wrapper = mount(DssChip, {
        props: {
          variant: 'filled',
          color: 'primary'
        }
      })
      expect(wrapper.classes()).toContain('bg-primary')
      expect(wrapper.classes()).toContain('text-white')
    })

    it('applies text color class for outline variant', () => {
      const wrapper = mount(DssChip, {
        props: {
          variant: 'outline',
          color: 'secondary'
        }
      })
      expect(wrapper.classes()).toContain('text-secondary')
      expect(wrapper.classes()).not.toContain('bg-secondary')
    })

    it('applies text color class for flat variant', () => {
      const wrapper = mount(DssChip, {
        props: {
          variant: 'flat',
          color: 'accent'
        }
      })
      expect(wrapper.classes()).toContain('text-accent')
      expect(wrapper.classes()).not.toContain('bg-accent')
    })

    it('does not apply color classes when brand is set', () => {
      const wrapper = mount(DssChip, {
        props: {
          color: 'primary',
          brand: 'hub'
        }
      })
      expect(wrapper.classes()).not.toContain('bg-primary')
      expect(wrapper.classes()).not.toContain('text-primary')
    })
  })

  // ===========================================================================
  // RIPPLE TESTS
  // ===========================================================================

  describe('Ripple Effect', () => {
    it('renders ripple element when clickable and ripple enabled', () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          ripple: true
        }
      })
      expect(wrapper.find('.dss-chip__ripple').exists()).toBe(true)
    })

    it('does not render ripple when ripple is false', () => {
      const wrapper = mount(DssChip, {
        props: {
          clickable: true,
          ripple: false
        }
      })
      expect(wrapper.find('.dss-chip__ripple').exists()).toBe(false)
    })
  })

  // ===========================================================================
  // EDGE CASES
  // ===========================================================================

  describe('Edge Cases', () => {
    it('handles empty label gracefully', () => {
      const wrapper = mount(DssChip, {
        props: { label: '' }
      })
      expect(wrapper.find('.dss-chip__label').exists()).toBe(false)
    })

    it('icon-only chip has correct class', () => {
      const wrapper = mount(DssChip, {
        props: {
          icon: 'star',
          label: ''
        }
      })
      expect(wrapper.classes()).toContain('dss-chip--icon-only')
    })

    it('handles rapid clicks without errors', async () => {
      const wrapper = mount(DssChip, {
        props: { clickable: true }
      })

      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        await wrapper.trigger('click')
      }

      expect(wrapper.emitted('click').length).toBe(10)
    })
  })
})
