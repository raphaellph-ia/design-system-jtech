/**
 * ==========================================================================
 * DssTooltip - Test Suite
 * ==========================================================================
 *
 * Testes unitarios para o componente DssTooltip
 * Golden Context: DssBadge
 * Classificacao: Elemento Informativo Contextual (NAO interativo)
 *
 * @version 2.2.0
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssTooltip from './1-structure/DssTooltip.ts.vue'

describe('DssTooltip', () => {
  // ==========================================================================
  // RENDERING
  // ==========================================================================

  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssTooltip)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders label prop as text content', () => {
      const wrapper = mount(DssTooltip, {
        props: { label: 'Texto de ajuda', visible: true }
      })
      expect(wrapper.text()).toBe('Texto de ajuda')
    })

    it('renders slot content over label', () => {
      const wrapper = mount(DssTooltip, {
        props: { label: 'Fallback', visible: true },
        slots: { default: 'Conteudo do slot' }
      })
      expect(wrapper.text()).toBe('Conteudo do slot')
    })

    it('renders rich slot content', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true },
        slots: { default: '<strong>Bold</strong> text' }
      })
      expect(wrapper.html()).toContain('<strong>Bold</strong>')
    })
  })

  // ==========================================================================
  // VISIBILITY
  // ==========================================================================

  describe('Visibility', () => {
    it('is hidden by default (visible=false)', () => {
      const wrapper = mount(DssTooltip, {
        props: { label: 'Hidden' }
      })
      // v-show sets display: none
      expect(wrapper.element.style.display).toBe('none')
    })

    it('is visible when visible=true', () => {
      const wrapper = mount(DssTooltip, {
        props: { label: 'Visible', visible: true }
      })
      expect(wrapper.element.style.display).not.toBe('none')
    })

    it('toggles visibility when prop changes', async () => {
      const wrapper = mount(DssTooltip, {
        props: { label: 'Toggle', visible: false }
      })
      expect(wrapper.element.style.display).toBe('none')

      await wrapper.setProps({ visible: true })
      expect(wrapper.element.style.display).not.toBe('none')

      await wrapper.setProps({ visible: false })
      expect(wrapper.element.style.display).toBe('none')
    })

    it('keeps element in DOM when hidden (v-show, not v-if)', () => {
      const wrapper = mount(DssTooltip, {
        props: { label: 'In DOM', visible: false }
      })
      // Element should exist in DOM even when hidden
      expect(wrapper.find('.dss-tooltip').exists()).toBe(true)
    })
  })

  // ==========================================================================
  // ACCESSIBILITY
  // ==========================================================================

  describe('Accessibility', () => {
    it('has role="tooltip"', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      expect(wrapper.attributes('role')).toBe('tooltip')
    })

    it('applies aria-label when provided', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, ariaLabel: 'Dica de ajuda' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Dica de ajuda')
    })

    it('does not have aria-label when not provided', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('accepts id via attrs for aria-describedby association', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, label: 'Help' },
        attrs: { id: 'my-tooltip' }
      })
      expect(wrapper.attributes('id')).toBe('my-tooltip')
    })

    it('does NOT have aria-live (unlike DssBadge)', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      expect(wrapper.attributes('aria-live')).toBeUndefined()
    })

    it('does NOT have interactive states', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      // No hover, focus, active, disabled attributes
      expect(wrapper.attributes('tabindex')).toBeUndefined()
      expect(wrapper.attributes('disabled')).toBeUndefined()
    })
  })

  // ==========================================================================
  // CSS CLASSES
  // ==========================================================================

  describe('CSS Classes', () => {
    it('has base class dss-tooltip', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      expect(wrapper.classes()).toContain('dss-tooltip')
    })

    it('applies default color classes (bg-dark text-white)', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      expect(wrapper.classes()).toContain('bg-dark')
      expect(wrapper.classes()).toContain('text-white')
    })

    it('applies custom color classes', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, color: 'primary' }
      })
      expect(wrapper.classes()).toContain('bg-primary')
      expect(wrapper.classes()).toContain('text-white')
    })

    it('applies negative color classes', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, color: 'negative' }
      })
      expect(wrapper.classes()).toContain('bg-negative')
    })

    it('applies textColor override', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, color: 'dark', textColor: 'primary' }
      })
      expect(wrapper.classes()).toContain('text-primary')
    })

    it('applies multi-line class', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, multiLine: true }
      })
      expect(wrapper.classes()).toContain('dss-tooltip--multi-line')
    })

    it('does not apply multi-line class by default', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true }
      })
      expect(wrapper.classes()).not.toContain('dss-tooltip--multi-line')
    })
  })

  // ==========================================================================
  // BRAND
  // ==========================================================================

  describe('Brand', () => {
    it('applies brand hub class', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, brand: 'hub' }
      })
      expect(wrapper.classes()).toContain('dss-tooltip--brand-hub')
    })

    it('applies brand water class', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, brand: 'water' }
      })
      expect(wrapper.classes()).toContain('dss-tooltip--brand-water')
    })

    it('applies brand waste class', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, brand: 'waste' }
      })
      expect(wrapper.classes()).toContain('dss-tooltip--brand-waste')
    })

    it('does not apply color utility classes when brand is set', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, brand: 'hub', color: 'primary' }
      })
      // Brand overrides color utility classes
      expect(wrapper.classes()).not.toContain('bg-primary')
      expect(wrapper.classes()).toContain('dss-tooltip--brand-hub')
    })

    it('does not apply brand class when brand is null', () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, brand: null }
      })
      expect(wrapper.classes()).not.toContain('dss-tooltip--brand-hub')
      expect(wrapper.classes()).not.toContain('dss-tooltip--brand-water')
      expect(wrapper.classes()).not.toContain('dss-tooltip--brand-waste')
    })
  })

  // ==========================================================================
  // COMPONENT NAME
  // ==========================================================================

  describe('Component Name', () => {
    it('has correct component name', () => {
      const wrapper = mount(DssTooltip)
      expect(wrapper.vm.$options.name).toBe('DssTooltip')
    })
  })

  // ==========================================================================
  // NON-INTERACTIVE VERIFICATION
  // ==========================================================================

  describe('Non-Interactive Verification', () => {
    it('does not emit any events', async () => {
      const wrapper = mount(DssTooltip, {
        props: { visible: true, label: 'Test' }
      })

      await wrapper.trigger('click')
      await wrapper.trigger('mouseenter')
      await wrapper.trigger('mouseleave')
      await wrapper.trigger('focus')
      await wrapper.trigger('blur')

      // DssTooltip should not emit any events
      expect(wrapper.emitted()).toEqual({})
    })
  })
})
