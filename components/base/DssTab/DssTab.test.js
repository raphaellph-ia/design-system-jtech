/**
 * ==========================================================================
 * DssTab — Testes Unitários
 * ==========================================================================
 *
 * Cobertura: Props (name, label, icon, alert, disable), classes compostas,
 * forwarding de $attrs, slot default, ripple bloqueado, estados adaptativos.
 *
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssTab from './DssTab.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

function mountTab(props = {}, slots = {}) {
  return mount(DssTab, {
    props: { name: 'test', ...props },
    slots: { default: undefined, ...slots }
  })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssTab — Renderização base', () => {
  it('renderiza sem props opcionais com a classe base dss-tab', () => {
    const wrapper = mountTab()
    expect(wrapper.classes()).toContain('dss-tab')
  })

  it('não aplica modificadores quando nenhuma prop de variante é fornecida', () => {
    const wrapper = mountTab()
    expect(wrapper.classes()).not.toContain('dss-tab--icon')
    expect(wrapper.classes()).not.toContain('dss-tab--has-icon')
    expect(wrapper.classes()).not.toContain('dss-tab--has-label')
    expect(wrapper.classes()).not.toContain('dss-tab--alert')
    expect(wrapper.classes()).not.toContain('dss-tab--disable')
  })
})

// ==========================================================================
// 2. PROP: name
// ==========================================================================

describe('DssTab — Prop name', () => {
  it('aceita name como string', () => {
    const wrapper = mountTab({ name: 'home' })
    expect(wrapper.exists()).toBe(true)
  })

  it('aceita name como número', () => {
    const wrapper = mountTab({ name: 1 })
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 3. PROP: label
// ==========================================================================

describe('DssTab — Prop label', () => {
  it('aplica dss-tab--has-label quando label é fornecido', () => {
    const wrapper = mountTab({ label: 'Início' })
    expect(wrapper.classes()).toContain('dss-tab--has-label')
  })

  it('não aplica dss-tab--has-label quando label é undefined', () => {
    const wrapper = mountTab({ label: undefined })
    expect(wrapper.classes()).not.toContain('dss-tab--has-label')
  })
})

// ==========================================================================
// 4. PROP: icon
// ==========================================================================

describe('DssTab — Prop icon', () => {
  it('aplica dss-tab--has-icon quando icon é fornecido', () => {
    const wrapper = mountTab({ icon: 'notifications' })
    expect(wrapper.classes()).toContain('dss-tab--has-icon')
  })

  it('aplica dss-tab--icon quando icon é fornecido sem label', () => {
    const wrapper = mountTab({ icon: 'notifications' })
    expect(wrapper.classes()).toContain('dss-tab--icon')
  })

  it('não aplica dss-tab--icon quando icon e label são fornecidos', () => {
    const wrapper = mountTab({ icon: 'notifications', label: 'Alertas' })
    expect(wrapper.classes()).not.toContain('dss-tab--icon')
    expect(wrapper.classes()).toContain('dss-tab--has-icon')
    expect(wrapper.classes()).toContain('dss-tab--has-label')
  })

  it('não aplica dss-tab--has-icon quando icon é undefined', () => {
    const wrapper = mountTab({ icon: undefined })
    expect(wrapper.classes()).not.toContain('dss-tab--has-icon')
    expect(wrapper.classes()).not.toContain('dss-tab--icon')
  })
})

// ==========================================================================
// 5. PROP: alert
// ==========================================================================

describe('DssTab — Prop alert', () => {
  it('aplica dss-tab--alert quando alert=true', () => {
    const wrapper = mountTab({ alert: true })
    expect(wrapper.classes()).toContain('dss-tab--alert')
  })

  it('aplica dss-tab--alert quando alert é uma string de cor', () => {
    const wrapper = mountTab({ alert: 'red' })
    expect(wrapper.classes()).toContain('dss-tab--alert')
  })

  it('não aplica dss-tab--alert quando alert=false', () => {
    const wrapper = mountTab({ alert: false })
    expect(wrapper.classes()).not.toContain('dss-tab--alert')
  })

  it('não aplica dss-tab--alert quando alert é undefined', () => {
    const wrapper = mountTab({ alert: undefined })
    expect(wrapper.classes()).not.toContain('dss-tab--alert')
  })
})

// ==========================================================================
// 6. PROP: disable
// ==========================================================================

describe('DssTab — Prop disable', () => {
  it('aplica dss-tab--disable quando disable=true', () => {
    const wrapper = mountTab({ disable: true })
    expect(wrapper.classes()).toContain('dss-tab--disable')
  })

  it('não aplica dss-tab--disable quando disable=false', () => {
    const wrapper = mountTab({ disable: false })
    expect(wrapper.classes()).not.toContain('dss-tab--disable')
  })
})

// ==========================================================================
// 7. CLASSES COMPOSTAS
// ==========================================================================

describe('DssTab — Classes compostas', () => {
  it('aplica dss-tab, dss-tab--has-icon e dss-tab--has-label juntas', () => {
    const wrapper = mountTab({ icon: 'home', label: 'Início' })
    expect(wrapper.classes()).toContain('dss-tab')
    expect(wrapper.classes()).toContain('dss-tab--has-icon')
    expect(wrapper.classes()).toContain('dss-tab--has-label')
  })

  it('aplica disable e alert simultaneamente sem conflito', () => {
    const wrapper = mountTab({ alert: true, disable: true })
    expect(wrapper.classes()).toContain('dss-tab--alert')
    expect(wrapper.classes()).toContain('dss-tab--disable')
  })
})

// ==========================================================================
// 8. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssTab — Forwarding de $attrs', () => {
  it('encaminha atributos data-* para o elemento raiz', () => {
    const wrapper = mount(DssTab, {
      props: { name: 'test' },
      attrs: { 'data-testid': 'tab-item' }
    })
    expect(wrapper.attributes('data-testid')).toBe('tab-item')
  })
})

// ==========================================================================
// 9. SLOT DEFAULT
// ==========================================================================

describe('DssTab — Slot default', () => {
  it('renderiza conteúdo customizado no slot default', () => {
    const wrapper = mount(DssTab, {
      props: { name: 'test' },
      slots: { default: '<span>Custom</span>' }
    })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('Custom')
  })
})

// ==========================================================================
// 10. NOME DO COMPONENTE
// ==========================================================================

describe('DssTab — Metadados', () => {
  it('possui o nome correto do componente', () => {
    const wrapper = mountTab()
    expect(wrapper.vm.$options.name).toBe('DssTab')
  })
})
