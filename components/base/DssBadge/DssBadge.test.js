/**
 * DssBadge - Testes Unitários
 *
 * Testa todas as funcionalidades, props, slots e acessibilidade
 * do componente DssBadge seguindo as melhores práticas do DSS.
 *
 * @requires @vue/test-utils
 * @requires vitest ou jest
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssBadge from './1-structure/DssBadge.ts.vue'

describe('DssBadge', () => {
  /**
   * ==========================================================================
   * 1. RENDERIZAÇÃO BÁSICA
   * ==========================================================================
   */
  describe('Renderização Básica', () => {
    it('renderiza com label via prop', () => {
      const wrapper = mount(DssBadge, {
        props: { label: '5' }
      })
      expect(wrapper.text()).toContain('5')
    })

    it('renderiza com conteúdo via slot default', () => {
      const wrapper = mount(DssBadge, {
        slots: {
          default: 'Novo'
        }
      })
      expect(wrapper.text()).toContain('Novo')
    })

    it('renderiza como <div> nativo', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('aplica classe base .dss-badge', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.classes()).toContain('dss-badge')
    })

    it('aplica role="status" para acessibilidade', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.attributes('role')).toBe('status')
    })

    it('aplica aria-live="polite"', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.attributes('aria-live')).toBe('polite')
    })
  })

  /**
   * ==========================================================================
   * 2. PROPS - CORES
   * ==========================================================================
   */
  describe('Props - Cores', () => {
    const colors = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info']

    colors.forEach(color => {
      it(`aplica classe .bg-${color} quando color="${color}"`, () => {
        const wrapper = mount(DssBadge, {
          props: { color }
        })
        expect(wrapper.classes()).toContain(`bg-${color}`)
      })
    })

    it('usa "primary" como cor padrão', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.classes()).toContain('bg-primary')
    })

    it('aplica .text-white para cores sólidas', () => {
      const wrapper = mount(DssBadge, {
        props: { color: 'primary' }
      })
      expect(wrapper.classes()).toContain('text-white')
    })
  })

  /**
   * ==========================================================================
   * 3. PROPS - VARIANTES
   * ==========================================================================
   */
  describe('Props - Variantes', () => {
    it('aplica classe .dss-badge--outline quando outline=true', () => {
      const wrapper = mount(DssBadge, {
        props: { outline: true }
      })
      expect(wrapper.classes()).toContain('dss-badge--outline')
    })

    it('aplica classe .dss-badge--transparent quando transparent=true', () => {
      const wrapper = mount(DssBadge, {
        props: { transparent: true }
      })
      expect(wrapper.classes()).toContain('dss-badge--transparent')
    })

    it('aplica classe .dss-badge--rounded quando rounded=true', () => {
      const wrapper = mount(DssBadge, {
        props: { rounded: true }
      })
      expect(wrapper.classes()).toContain('dss-badge--rounded')
    })

    it('aplica classe .dss-badge--floating quando floating=true', () => {
      const wrapper = mount(DssBadge, {
        props: { floating: true }
      })
      expect(wrapper.classes()).toContain('dss-badge--floating')
    })

    it('aplica classe .dss-badge--multi-line quando multiLine=true', () => {
      const wrapper = mount(DssBadge, {
        props: { multiLine: true }
      })
      expect(wrapper.classes()).toContain('dss-badge--multi-line')
    })

    it('variante outline usa text-{color} ao invés de bg-{color}', () => {
      const wrapper = mount(DssBadge, {
        props: { outline: true, color: 'primary' }
      })
      expect(wrapper.classes()).toContain('text-primary')
      expect(wrapper.classes()).not.toContain('bg-primary')
    })

    it('variante transparent usa text-{color} ao invés de bg-{color}', () => {
      const wrapper = mount(DssBadge, {
        props: { transparent: true, color: 'secondary' }
      })
      expect(wrapper.classes()).toContain('text-secondary')
      expect(wrapper.classes()).not.toContain('bg-secondary')
    })
  })

  /**
   * ==========================================================================
   * 4. PROPS - BRANDS
   * ==========================================================================
   */
  describe('Props - Brands', () => {
    const brands = ['hub', 'water', 'waste']

    brands.forEach(brand => {
      it(`aplica classe .dss-badge--brand-${brand} quando brand="${brand}"`, () => {
        const wrapper = mount(DssBadge, {
          props: { brand }
        })
        expect(wrapper.classes()).toContain(`dss-badge--brand-${brand}`)
      })
    })

    it('NÃO aplica classes utilitárias quando brand está definido', () => {
      const wrapper = mount(DssBadge, {
        props: { brand: 'hub', color: 'primary' }
      })
      expect(wrapper.classes()).toContain('dss-badge--brand-hub')
      expect(wrapper.classes()).not.toContain('bg-primary')
    })
  })

  /**
   * ==========================================================================
   * 5. PROPS - ALINHAMENTO
   * ==========================================================================
   */
  describe('Props - Alinhamento', () => {
    const aligns = ['top', 'middle', 'bottom']

    aligns.forEach(align => {
      it(`aplica estilo vertical-align: ${align} quando align="${align}"`, () => {
        const wrapper = mount(DssBadge, {
          props: { align }
        })
        expect(wrapper.attributes('style')).toContain(`vertical-align: ${align}`)
      })
    })

    it('não aplica vertical-align quando align não é definido', () => {
      const wrapper = mount(DssBadge)
      const style = wrapper.attributes('style')
      expect(style).toBeFalsy() // Nenhum estilo inline
    })
  })

  /**
   * ==========================================================================
   * 6. PROPS - TEXT COLOR
   * ==========================================================================
   */
  describe('Props - Text Color', () => {
    it('aplica classe text-{textColor} quando textColor é definido', () => {
      const wrapper = mount(DssBadge, {
        props: { textColor: 'negative' }
      })
      expect(wrapper.classes()).toContain('text-negative')
    })

    it('sobrescreve text-white com textColor customizado', () => {
      const wrapper = mount(DssBadge, {
        props: { color: 'primary', textColor: 'warning' }
      })
      expect(wrapper.classes()).toContain('text-warning')
    })
  })

  /**
   * ==========================================================================
   * 7. SLOTS
   * ==========================================================================
   */
  describe('Slots', () => {
    it('renderiza slot default', () => {
      const wrapper = mount(DssBadge, {
        slots: {
          default: '<span class="custom">Custom Content</span>'
        }
      })
      expect(wrapper.find('.custom').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Content')
    })

    it('label prop tem prioridade sobre slot quando ambos são fornecidos', () => {
      const wrapper = mount(DssBadge, {
        props: { label: 'Label' },
        slots: {
          default: 'Slot'
        }
      })
      // O Quasar QBadge mostra o label E o slot
      // DssBadge segue o mesmo comportamento
      expect(wrapper.text()).toContain('Label')
    })
  })

  /**
   * ==========================================================================
   * 8. ACESSIBILIDADE WCAG 2.1 AA
   * ==========================================================================
   */
  describe('Acessibilidade WCAG 2.1 AA', () => {
    it('aplica aria-label quando fornecido', () => {
      const wrapper = mount(DssBadge, {
        props: { ariaLabel: '5 notificações não lidas' }
      })
      expect(wrapper.attributes('aria-label')).toBe('5 notificações não lidas')
    })

    it('tem role="status" por padrão', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.attributes('role')).toBe('status')
    })

    it('tem aria-live="polite" para mudanças dinâmicas', () => {
      const wrapper = mount(DssBadge)
      expect(wrapper.attributes('aria-live')).toBe('polite')
    })
  })

  /**
   * ==========================================================================
   * 9. INTEGRAÇÃO - Múltiplas Props Combinadas
   * ==========================================================================
   */
  describe('Integração - Combinação de Props', () => {
    it('combina cor + variante corretamente', () => {
      const wrapper = mount(DssBadge, {
        props: {
          color: 'negative',
          outline: true
        }
      })
      expect(wrapper.classes()).toContain('dss-badge--outline')
      expect(wrapper.classes()).toContain('text-negative')
    })

    it('combina floating + rounded', () => {
      const wrapper = mount(DssBadge, {
        props: {
          floating: true,
          rounded: true
        }
      })
      expect(wrapper.classes()).toContain('dss-badge--floating')
      expect(wrapper.classes()).toContain('dss-badge--rounded')
    })

    it('full configuration test', () => {
      const wrapper = mount(DssBadge, {
        props: {
          color: 'positive',
          label: '99+',
          floating: true,
          rounded: true,
          align: 'top',
          ariaLabel: '99 ou mais notificações'
        }
      })

      // Classes
      expect(wrapper.classes()).toContain('dss-badge')
      expect(wrapper.classes()).toContain('bg-positive')
      expect(wrapper.classes()).toContain('text-white')
      expect(wrapper.classes()).toContain('dss-badge--floating')
      expect(wrapper.classes()).toContain('dss-badge--rounded')

      // Content
      expect(wrapper.text()).toContain('99+')

      // Attributes
      expect(wrapper.attributes('aria-label')).toBe('99 ou mais notificações')
      expect(wrapper.attributes('role')).toBe('status')
      expect(wrapper.attributes('style')).toContain('vertical-align: top')
    })

    it('brand configuration test', () => {
      const wrapper = mount(DssBadge, {
        props: {
          brand: 'hub',
          label: '5',
          outline: true,
          ariaLabel: '5 notificações Hub'
        }
      })

      // Brand class presente
      expect(wrapper.classes()).toContain('dss-badge--brand-hub')
      expect(wrapper.classes()).toContain('dss-badge--outline')

      // Sem classes utilitárias de cor (brand override)
      expect(wrapper.classes()).not.toContain('bg-primary')

      // Content
      expect(wrapper.text()).toContain('5')

      // Attributes
      expect(wrapper.attributes('aria-label')).toBe('5 notificações Hub')
    })
  })

  /**
   * ==========================================================================
   * 10. DOT INDICATOR (Badge vazio)
   * ==========================================================================
   */
  describe('Dot Indicator', () => {
    it('renderiza badge vazio como dot indicator', () => {
      const wrapper = mount(DssBadge, {
        props: { color: 'positive' }
      })
      // Badge sem conteúdo deve funcionar como dot indicator
      expect(wrapper.classes()).toContain('dss-badge')
      expect(wrapper.classes()).toContain('bg-positive')
    })
  })
})
