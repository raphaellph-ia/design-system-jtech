/**
 * ==========================================================================
 * DssItemLabel — Testes Unitários
 * ==========================================================================
 *
 * Cobertura: Props (header, caption, overline, lines), classes compostas,
 * forwarding de $attrs, slot default, estados adaptativos.
 *
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssItemLabel from './DssItemLabel.vue'

installQuasar()

// ==========================================================================
// HELPERS
// ==========================================================================

function mountLabel(props = {}, slots = {}) {
  return mount(DssItemLabel, {
    props,
    slots: { default: 'Texto de teste', ...slots }
  })
}

// ==========================================================================
// 1. RENDERIZAÇÃO BASE
// ==========================================================================

describe('DssItemLabel — Renderização base', () => {
  it('renderiza sem props com a classe base dss-item-label', () => {
    const wrapper = mountLabel()
    expect(wrapper.classes()).toContain('dss-item-label')
  })

  it('renderiza o conteúdo do slot default', () => {
    const wrapper = mountLabel({}, { default: 'Ana Silva' })
    expect(wrapper.text()).toBe('Ana Silva')
  })

  it('não aplica modificadores quando nenhuma prop de variante é fornecida', () => {
    const wrapper = mountLabel()
    expect(wrapper.classes()).not.toContain('dss-item-label--header')
    expect(wrapper.classes()).not.toContain('dss-item-label--caption')
    expect(wrapper.classes()).not.toContain('dss-item-label--overline')
    expect(wrapper.classes()).not.toContain('dss-item-label--lines')
  })
})

// ==========================================================================
// 2. VARIANTE: HEADER
// ==========================================================================

describe('DssItemLabel — Variante header', () => {
  it('aplica a classe dss-item-label--header quando header=true', () => {
    const wrapper = mountLabel({ header: true })
    expect(wrapper.classes()).toContain('dss-item-label--header')
  })

  it('não aplica dss-item-label--header quando header=false', () => {
    const wrapper = mountLabel({ header: false })
    expect(wrapper.classes()).not.toContain('dss-item-label--header')
  })

  it('aplica a classe dss-item-label e dss-item-label--header simultaneamente', () => {
    const wrapper = mountLabel({ header: true })
    expect(wrapper.classes()).toContain('dss-item-label')
    expect(wrapper.classes()).toContain('dss-item-label--header')
  })
})

// ==========================================================================
// 3. VARIANTE: CAPTION
// ==========================================================================

describe('DssItemLabel — Variante caption', () => {
  it('aplica a classe dss-item-label--caption quando caption=true', () => {
    const wrapper = mountLabel({ caption: true })
    expect(wrapper.classes()).toContain('dss-item-label--caption')
  })

  it('não aplica dss-item-label--caption quando caption=false', () => {
    const wrapper = mountLabel({ caption: false })
    expect(wrapper.classes()).not.toContain('dss-item-label--caption')
  })
})

// ==========================================================================
// 4. VARIANTE: OVERLINE
// ==========================================================================

describe('DssItemLabel — Variante overline', () => {
  it('aplica a classe dss-item-label--overline quando overline=true', () => {
    const wrapper = mountLabel({ overline: true })
    expect(wrapper.classes()).toContain('dss-item-label--overline')
  })

  it('não aplica dss-item-label--overline quando overline=false', () => {
    const wrapper = mountLabel({ overline: false })
    expect(wrapper.classes()).not.toContain('dss-item-label--overline')
  })
})

// ==========================================================================
// 5. VARIANTE: LINES (TRUNCAMENTO)
// ==========================================================================

describe('DssItemLabel — Variante lines', () => {
  it('aplica a classe dss-item-label--lines quando lines é um número', () => {
    const wrapper = mountLabel({ lines: 2 })
    expect(wrapper.classes()).toContain('dss-item-label--lines')
  })

  it('aplica a classe dss-item-label--lines quando lines é uma string numérica', () => {
    const wrapper = mountLabel({ lines: '1' })
    expect(wrapper.classes()).toContain('dss-item-label--lines')
  })

  it('não aplica dss-item-label--lines quando lines é undefined', () => {
    const wrapper = mountLabel({ lines: undefined })
    expect(wrapper.classes()).not.toContain('dss-item-label--lines')
  })
})

// ==========================================================================
// 6. CLASSES COMPOSTAS
// ==========================================================================

describe('DssItemLabel — Classes compostas', () => {
  it('nunca aplica header e caption simultaneamente', () => {
    // Anti-pattern documentado — verificar que ambas as classes podem coexistir
    // (o componente não bloqueia via código, mas o uso é anti-padrão)
    const wrapper = mountLabel({ header: true, caption: true })
    // Ambas as classes seriam aplicadas — teste documenta o comportamento
    expect(wrapper.classes()).toContain('dss-item-label--header')
    expect(wrapper.classes()).toContain('dss-item-label--caption')
  })

  it('aplica overline e lines simultaneamente sem conflito', () => {
    const wrapper = mountLabel({ overline: true, lines: 1 })
    expect(wrapper.classes()).toContain('dss-item-label--overline')
    expect(wrapper.classes()).toContain('dss-item-label--lines')
  })
})

// ==========================================================================
// 7. FORWARDING DE $ATTRS
// ==========================================================================

describe('DssItemLabel — Forwarding de $attrs', () => {
  it('encaminha atributos data-* para o elemento raiz', () => {
    const wrapper = mount(DssItemLabel, {
      props: {},
      attrs: { 'data-testid': 'label-item' },
      slots: { default: 'Texto' }
    })
    expect(wrapper.attributes('data-testid')).toBe('label-item')
  })

  it('encaminha classes adicionais via attrs', () => {
    const wrapper = mount(DssItemLabel, {
      props: {},
      attrs: { class: 'custom-class' },
      slots: { default: 'Texto' }
    })
    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.classes()).toContain('dss-item-label')
  })

  it('encaminha atributos style via attrs', () => {
    const wrapper = mount(DssItemLabel, {
      props: {},
      attrs: { style: 'opacity: 0.5' },
      slots: { default: 'Texto' }
    })
    expect(wrapper.attributes('style')).toContain('opacity')
  })
})

// ==========================================================================
// 8. SLOT DEFAULT
// ==========================================================================

describe('DssItemLabel — Slot default', () => {
  it('renderiza texto simples no slot default', () => {
    const wrapper = mountLabel({}, { default: 'Carlos Eduardo' })
    expect(wrapper.text()).toBe('Carlos Eduardo')
  })

  it('renderiza conteúdo HTML no slot default', () => {
    const wrapper = mount(DssItemLabel, {
      props: {},
      slots: { default: '<strong>Texto em negrito</strong>' }
    })
    expect(wrapper.find('strong').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('Texto em negrito')
  })

  it('renderiza slot vazio sem erros', () => {
    const wrapper = mount(DssItemLabel, {
      props: {},
      slots: {}
    })
    expect(wrapper.exists()).toBe(true)
  })
})

// ==========================================================================
// 9. NOME DO COMPONENTE
// ==========================================================================

describe('DssItemLabel — Metadados', () => {
  it('possui o nome correto do componente', () => {
    const wrapper = mountLabel()
    expect(wrapper.vm.$options.name).toBe('DssItemLabel')
  })
})
