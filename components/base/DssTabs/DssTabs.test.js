/**
 * ==========================================================================
 * DssTabs — Testes Unitários e Comportamentais
 * ==========================================================================
 *
 * Cobertura: props, emits, slots, acessibilidade, forwarding, estados.
 *
 * @version 1.0.0
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssTabs from './DssTabs.vue'

// ==========================================================================
// ESTRUTURA E RENDERIZAÇÃO
// ==========================================================================

describe('DssTabs — Estrutura', () => {
  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe base dss-tabs', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1' }
    })
    expect(wrapper.find('.dss-tabs').exists()).toBe(true)
  })

  it('usa DssTabs como nome do componente', () => {
    expect(DssTabs.name).toBe('DssTabs')
  })
})

// ==========================================================================
// PROPS
// ==========================================================================

describe('DssTabs — Props', () => {
  it('aplica prop align como classe modificadora', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', align: 'center' }
    })
    expect(wrapper.find('.dss-tabs--align-center').exists()).toBe(true)
  })

  it('NÃO aplica classe de align para valor padrão left', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', align: 'left' }
    })
    expect(wrapper.find('.dss-tabs--align-left').exists()).toBe(false)
  })

  it('aplica classe dss-tabs--vertical quando vertical=true', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', vertical: true }
    })
    expect(wrapper.find('.dss-tabs--vertical').exists()).toBe(true)
  })

  it('aplica classe dss-tabs--dense quando dense=true', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', dense: true }
    })
    expect(wrapper.find('.dss-tabs--dense').exists()).toBe(true)
  })

  it('aplica classe dss-tabs--brand-hub quando brand=hub', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', brand: 'hub' }
    })
    expect(wrapper.find('.dss-tabs--brand-hub').exists()).toBe(true)
  })

  it('aplica atributo data-brand quando brand está definido', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', brand: 'water' }
    })
    expect(wrapper.find('[data-brand="water"]').exists()).toBe(true)
  })

  it('NÃO aplica data-brand quando brand é null', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', brand: null }
    })
    expect(wrapper.find('[data-brand]').exists()).toBe(false)
  })

  it('aplica aria-label quando ariaLabel está definido', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1', ariaLabel: 'Navegação principal' }
    })
    expect(wrapper.find('[aria-label="Navegação principal"]').exists()).toBe(true)
  })

  it('NÃO aplica aria-label quando ariaLabel é undefined', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1' }
    })
    const el = wrapper.find('.dss-tabs')
    expect(el.attributes('aria-label')).toBeUndefined()
  })
})

// ==========================================================================
// PROPS BLOQUEADAS
// ==========================================================================

describe('DssTabs — Props Bloqueadas', () => {
  it('NÃO expõe prop active-color no template', () => {
    // Verificar que a prop não está declarada no componente
    const props = Object.keys(DssTabs.props || {})
    expect(props).not.toContain('activeColor')
    expect(props).not.toContain('active-color')
  })

  it('NÃO expõe prop indicator-color no template', () => {
    const props = Object.keys(DssTabs.props || {})
    expect(props).not.toContain('indicatorColor')
  })

  it('NÃO expõe prop active-bg-color no template', () => {
    const props = Object.keys(DssTabs.props || {})
    expect(props).not.toContain('activeBgColor')
  })
})

// ==========================================================================
// EMITS / V-MODEL
// ==========================================================================

describe('DssTabs — Emits', () => {
  it('emite update:modelValue quando aba é selecionada', async () => {
    const wrapper = mount(DssTabs, {
      props: {
        modelValue: 'tab1',
        'onUpdate:modelValue': (val) => wrapper.setProps({ modelValue: val })
      }
    })

    // Simula emissão interna do q-tabs
    await wrapper.findComponent({ name: 'QTabs' }).vm.$emit('update:modelValue', 'tab2')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['tab2'])
  })
})

// ==========================================================================
// SLOTS
// ==========================================================================

describe('DssTabs — Slots', () => {
  it('renderiza conteúdo do slot default', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1' },
      slots: {
        default: '<div class="test-tab-child">Tab filho</div>'
      }
    })
    expect(wrapper.find('.test-tab-child').exists()).toBe(true)
    expect(wrapper.find('.test-tab-child').text()).toBe('Tab filho')
  })
})

// ==========================================================================
// ACESSIBILIDADE
// ==========================================================================

describe('DssTabs — Acessibilidade', () => {
  it('herda role tablist do QTabs nativo', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1' }
    })
    // QTabs renderiza role="tablist" nativamente
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
  })

  it('aplica aria-label correto para leitores de tela', () => {
    const wrapper = mount(DssTabs, {
      props: {
        modelValue: 'tab1',
        ariaLabel: 'Seções do relatório'
      }
    })
    expect(wrapper.find('[aria-label="Seções do relatório"]').exists()).toBe(true)
  })
})

// ==========================================================================
// FORWARDING DE ATTRS
// ==========================================================================

describe('DssTabs — Forwarding', () => {
  it('encaminha atributos HTML adicionais (v-bind="$attrs")', () => {
    const wrapper = mount(DssTabs, {
      props: { modelValue: 'tab1' },
      attrs: { 'data-testid': 'meu-grupo-tabs' }
    })
    expect(wrapper.find('[data-testid="meu-grupo-tabs"]').exists()).toBe(true)
  })
})

// ==========================================================================
// CLASSES COMPUTADAS
// ==========================================================================

describe('DssTabs — Classes computadas (useTabsClasses)', () => {
  it('combina múltiplas classes corretamente', () => {
    const wrapper = mount(DssTabs, {
      props: {
        modelValue: 'tab1',
        align: 'justify',
        vertical: true,
        dense: true,
        brand: 'waste'
      }
    })
    const el = wrapper.find('.dss-tabs')
    expect(el.classes()).toContain('dss-tabs')
    expect(el.classes()).toContain('dss-tabs--align-justify')
    expect(el.classes()).toContain('dss-tabs--vertical')
    expect(el.classes()).toContain('dss-tabs--dense')
    expect(el.classes()).toContain('dss-tabs--brand-waste')
  })
})

// ==========================================================================
// ENTRY POINT WRAPPER
// ==========================================================================

describe('DssTabs — Entry Point Wrapper', () => {
  it('entry point wrapper re-exporta a implementação canônica', async () => {
    const wrapper = await import('./DssTabs.vue')
    const implementation = await import('./1-structure/DssTabs.ts.vue')
    // O wrapper deve ser o mesmo componente que a implementação
    expect(wrapper.default).toBe(implementation.default)
  })
})
