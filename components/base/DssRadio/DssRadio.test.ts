/**
 * DssRadio — Testes Unitarios
 * Design System Sansys v2.2
 *
 * Suites:
 *   1. Renderizacao basica
 *   2. v-model e selecao
 *   3. Tamanhos
 *   4. Estados
 *   5. Acessibilidade
 *   6. Composable useRadioClasses
 *   7. Brands
 *   8. Slots
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DssRadio from './DssRadio.vue'

// =========================================================================
// Suite 1: Renderizacao basica
// =========================================================================
describe('DssRadio — Renderizacao', () => {
  it('renderiza com estrutura correta', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group' }
    })
    expect(wrapper.find('label.dss-radio').exists()).toBe(true)
    expect(wrapper.find('input.dss-radio__native[type="radio"]').exists()).toBe(true)
    expect(wrapper.find('.dss-radio__control').exists()).toBe(true)
  })

  it('renderiza label via prop', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', label: 'Opcao A' }
    })
    expect(wrapper.find('.dss-radio__label').text()).toBe('Opcao A')
  })

  it('renderiza label a esquerda quando leftLabel=true', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', label: 'Left', leftLabel: true }
    })
    expect(wrapper.find('.dss-radio__label--left').exists()).toBe(true)
    expect(wrapper.classes()).toContain('dss-radio--left-label')
  })

  it('nao renderiza dot quando nao selecionado', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'b' }
    })
    expect(wrapper.find('.dss-radio__dot').exists()).toBe(false)
  })

  it('renderiza dot quando selecionado', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'a' }
    })
    expect(wrapper.find('.dss-radio__dot').exists()).toBe(true)
  })
})

// =========================================================================
// Suite 2: v-model e selecao
// =========================================================================
describe('DssRadio — v-model', () => {
  it('emite update:modelValue ao clicar', async () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'b' }
    })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['a'])
  })

  it('nao emite quando desabilitado', async () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'b', disable: true }
    })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('marca checked quando modelValue === val', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'a' }
    })
    expect(wrapper.find('input').element.checked).toBe(true)
    expect(wrapper.find('.dss-radio__control--checked').exists()).toBe(true)
  })
})

// =========================================================================
// Suite 3: Tamanhos
// =========================================================================
describe('DssRadio — Tamanhos', () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const

  sizes.forEach(size => {
    it(`aplica classe dss-radio--${size}`, () => {
      const wrapper = mount(DssRadio, {
        props: { val: 'a', name: 'group', size }
      })
      expect(wrapper.classes()).toContain(`dss-radio--${size}`)
    })
  })

  it('usa md como tamanho padrao', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group' }
    })
    expect(wrapper.classes()).toContain('dss-radio--md')
  })
})

// =========================================================================
// Suite 4: Estados
// =========================================================================
describe('DssRadio — Estados', () => {
  it('aplica classe disabled', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', disable: true }
    })
    expect(wrapper.classes()).toContain('dss-radio--disabled')
  })

  it('aplica classe error', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', error: true }
    })
    expect(wrapper.classes()).toContain('dss-radio--error')
  })

  it('exibe mensagem de erro quando error=true com errorMessage', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', error: true, errorMessage: 'Campo obrigatorio' }
    })
    expect(wrapper.find('.dss-radio__error').text()).toBe('Campo obrigatorio')
    expect(wrapper.find('.dss-radio__error').attributes('role')).toBe('alert')
  })

  it('aplica classe dense', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', dense: true }
    })
    expect(wrapper.classes()).toContain('dss-radio--dense')
  })

  it('aplica classe checked', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'a' }
    })
    expect(wrapper.classes()).toContain('dss-radio--checked')
  })
})

// =========================================================================
// Suite 5: Acessibilidade
// =========================================================================
describe('DssRadio — Acessibilidade', () => {
  it('usa input type="radio" nativo', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group' }
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('radio')
  })

  it('define aria-checked', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', modelValue: 'a' }
    })
    expect(wrapper.find('input').attributes('aria-checked')).toBe('true')
  })

  it('define aria-disabled quando desabilitado', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', disable: true }
    })
    expect(wrapper.find('input').attributes('aria-disabled')).toBe('true')
  })

  it('define aria-invalid quando em erro', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', error: true }
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('define aria-label quando fornecido', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', ariaLabel: 'Selecionar opcao A' }
    })
    expect(wrapper.find('input').attributes('aria-label')).toBe('Selecionar opcao A')
  })

  it('define tabindex=-1 quando desabilitado', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', disable: true }
    })
    expect(wrapper.find('input').attributes('tabindex')).toBe('-1')
  })

  it('define tabindex=0 por padrao', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group' }
    })
    expect(wrapper.find('input').attributes('tabindex')).toBe('0')
  })

  it('associa erro via aria-describedby', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', error: true, errorMessage: 'Erro' }
    })
    const input = wrapper.find('input')
    const errorEl = wrapper.find('.dss-radio__error')
    expect(input.attributes('aria-describedby')).toBe(errorEl.attributes('id'))
  })

  it('expoe focus e blur via defineExpose', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group' }
    })
    expect(typeof (wrapper.vm as any).focus).toBe('function')
    expect(typeof (wrapper.vm as any).blur).toBe('function')
  })
})

// =========================================================================
// Suite 6: Composable useRadioClasses
// =========================================================================
describe('DssRadio — useRadioClasses', () => {
  it('gera classes corretas para estado padrao', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', color: 'primary', size: 'md' }
    })
    expect(wrapper.classes()).toContain('dss-radio')
    expect(wrapper.classes()).toContain('dss-radio--md')
  })

  it('adiciona classe de cor quando brand esta definido', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', color: 'primary', brand: 'hub' }
    })
    expect(wrapper.classes()).toContain('dss-radio--primary')
  })

  it('nao adiciona classe de cor quando brand NAO esta definido', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', color: 'primary' }
    })
    expect(wrapper.classes()).not.toContain('dss-radio--primary')
  })
})

// =========================================================================
// Suite 7: Brands
// =========================================================================
describe('DssRadio — Brands', () => {
  it('aplica data-brand no elemento raiz', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', brand: 'hub' }
    })
    expect(wrapper.attributes('data-brand')).toBe('hub')
  })

  it('nao aplica data-brand quando brand e null', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', brand: null }
    })
    expect(wrapper.attributes('data-brand')).toBeUndefined()
  })
})

// =========================================================================
// Suite 8: Slots
// =========================================================================
describe('DssRadio — Slots', () => {
  it('renderiza conteudo do slot default como label', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group' },
      slots: { default: '<strong>Custom Label</strong>' }
    })
    expect(wrapper.find('.dss-radio__label strong').text()).toBe('Custom Label')
  })

  it('prioriza slot sobre prop label', () => {
    const wrapper = mount(DssRadio, {
      props: { val: 'a', name: 'group', label: 'Prop Label' },
      slots: { default: 'Slot Label' }
    })
    expect(wrapper.find('.dss-radio__label').text()).toBe('Slot Label')
  })
})
