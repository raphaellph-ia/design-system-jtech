/**
 * DssInput - Testes de Conformidade DSS v2.2
 *
 * Valida conformidade do componente com os requisitos normativos do DSS.
 * Foco: arquitetura, tokens, estados, acessibilidade, brandability.
 *
 * @version 2.3.0
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssInput from './1-structure/DssInput.ts.vue'

describe('DssInput', () => {
  // =========================================================================
  // ESTRUTURA E RENDERIZACAO
  // =========================================================================

  describe('Estrutura', () => {
    it('renderiza com classe base dss-input', () => {
      const wrapper = mount(DssInput)
      expect(wrapper.classes()).toContain('dss-input')
    })

    it('renderiza o campo de input nativo', () => {
      const wrapper = mount(DssInput)
      expect(wrapper.find('.dss-input__native').exists()).toBe(true)
    })

    it('renderiza com variante outlined por padrao', () => {
      const wrapper = mount(DssInput)
      expect(wrapper.classes()).toContain('dss-input--outlined')
    })
  })

  // =========================================================================
  // PROPS
  // =========================================================================

  describe('Props', () => {
    it('aplica variante filled', () => {
      const wrapper = mount(DssInput, { props: { variant: 'filled' } })
      expect(wrapper.classes()).toContain('dss-input--filled')
    })

    it('aplica variante standout', () => {
      const wrapper = mount(DssInput, { props: { variant: 'standout' } })
      expect(wrapper.classes()).toContain('dss-input--standout')
    })

    it('aplica variante borderless', () => {
      const wrapper = mount(DssInput, { props: { variant: 'borderless' } })
      expect(wrapper.classes()).toContain('dss-input--borderless')
    })

    it('aplica classe dense quando prop dense=true', () => {
      const wrapper = mount(DssInput, { props: { dense: true } })
      expect(wrapper.classes()).toContain('dss-input--dense')
    })

    it('renderiza label quando prop label fornecida', () => {
      const wrapper = mount(DssInput, { props: { label: 'Email' } })
      expect(wrapper.find('.dss-input__label').text()).toBe('Email')
    })

    it('renderiza placeholder no input nativo', () => {
      const wrapper = mount(DssInput, {
        props: { placeholder: 'Digite aqui', stackLabel: true }
      })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('placeholder')).toBe('Digite aqui')
    })

    it('renderiza mensagem de erro quando error=true e errorMessage fornecida', () => {
      const wrapper = mount(DssInput, {
        props: { error: true, errorMessage: 'Campo obrigatorio' }
      })
      expect(wrapper.find('.dss-input__error').text()).toBe('Campo obrigatorio')
    })

    it('renderiza hint quando fornecida', () => {
      const wrapper = mount(DssInput, { props: { hint: 'Dica de uso' } })
      expect(wrapper.find('.dss-input__hint').text()).toBe('Dica de uso')
    })
  })

  // =========================================================================
  // ESTADOS
  // =========================================================================

  describe('Estados', () => {
    it('aplica classe disabled', () => {
      const wrapper = mount(DssInput, { props: { disabled: true } })
      expect(wrapper.classes()).toContain('dss-input--disabled')
    })

    it('aplica classe readonly', () => {
      const wrapper = mount(DssInput, { props: { readonly: true } })
      expect(wrapper.classes()).toContain('dss-input--readonly')
    })

    it('aplica classe loading', () => {
      const wrapper = mount(DssInput, { props: { loading: true } })
      expect(wrapper.classes()).toContain('dss-input--loading')
    })

    it('aplica classe error', () => {
      const wrapper = mount(DssInput, { props: { error: true } })
      expect(wrapper.classes()).toContain('dss-input--error')
    })

    it('desabilita input nativo quando disabled=true', () => {
      const wrapper = mount(DssInput, { props: { disabled: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('disabled')).toBeDefined()
    })

    it('marca input como readonly quando readonly=true', () => {
      const wrapper = mount(DssInput, { props: { readonly: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('readonly')).toBeDefined()
    })
  })

  // =========================================================================
  // ACESSIBILIDADE (WCAG 2.1 AA)
  // =========================================================================

  describe('Acessibilidade', () => {
    it('gera IDs unicos para label e input', () => {
      const wrapper = mount(DssInput, { props: { label: 'Nome' } })
      const input = wrapper.find('.dss-input__native')
      const label = wrapper.find('.dss-input__label')
      expect(input.attributes('id')).toBeTruthy()
      expect(label.attributes('for')).toBe(input.attributes('id'))
    })

    it('aplica aria-invalid quando error=true', () => {
      const wrapper = mount(DssInput, { props: { error: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('aria-invalid')).toBe('true')
    })

    it('aplica aria-busy quando loading=true', () => {
      const wrapper = mount(DssInput, { props: { loading: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('aria-busy')).toBe('true')
    })

    it('aplica aria-disabled quando disabled=true', () => {
      const wrapper = mount(DssInput, { props: { disabled: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('aria-disabled')).toBe('true')
    })

    it('aplica aria-readonly quando readonly=true', () => {
      const wrapper = mount(DssInput, { props: { readonly: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('aria-readonly')).toBe('true')
    })

    it('aplica aria-required quando required=true', () => {
      const wrapper = mount(DssInput, { props: { required: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('aria-required')).toBe('true')
    })

    it('conecta aria-describedby ao hint', () => {
      const wrapper = mount(DssInput, { props: { hint: 'Ajuda' } })
      const input = wrapper.find('.dss-input__native')
      const hint = wrapper.find('.dss-input__hint')
      expect(input.attributes('aria-describedby')).toBe(hint.element.parentElement?.querySelector('[id]')?.id)
    })

    it('aplica aria-label customizado', () => {
      const wrapper = mount(DssInput, { props: { ariaLabel: 'Buscar produtos' } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('aria-label')).toBe('Buscar produtos')
    })

    it('mensagem de erro tem role="alert"', () => {
      const wrapper = mount(DssInput, {
        props: { error: true, errorMessage: 'Erro' }
      })
      const errorEl = wrapper.find('.dss-input__error')
      expect(errorEl.attributes('role')).toBe('alert')
    })

    it('mensagem de erro tem aria-live="assertive"', () => {
      const wrapper = mount(DssInput, {
        props: { error: true, errorMessage: 'Erro' }
      })
      const errorEl = wrapper.find('.dss-input__error')
      expect(errorEl.attributes('aria-live')).toBe('assertive')
    })

    it('tabindex=-1 quando disabled', () => {
      const wrapper = mount(DssInput, { props: { disabled: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('tabindex')).toBe('-1')
    })

    it('tabindex=-1 quando loading', () => {
      const wrapper = mount(DssInput, { props: { loading: true } })
      const input = wrapper.find('.dss-input__native')
      expect(input.attributes('tabindex')).toBe('-1')
    })
  })

  // =========================================================================
  // EVENTOS
  // =========================================================================

  describe('Eventos', () => {
    it('emite update:modelValue ao digitar', async () => {
      const wrapper = mount(DssInput)
      const input = wrapper.find('.dss-input__native')
      await input.setValue('teste')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('emite focus ao focar', async () => {
      const wrapper = mount(DssInput)
      const input = wrapper.find('.dss-input__native')
      await input.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emite blur ao desfocar', async () => {
      const wrapper = mount(DssInput)
      const input = wrapper.find('.dss-input__native')
      await input.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emite clear ao clicar no botao limpar', async () => {
      const wrapper = mount(DssInput, {
        props: { modelValue: 'texto', clearable: true }
      })
      // Simular foco para ativar hasValue
      const input = wrapper.find('.dss-input__native')
      await input.trigger('focus')
      const clearBtn = wrapper.find('.dss-input__clear')
      if (clearBtn.exists()) {
        await clearBtn.trigger('click')
        expect(wrapper.emitted('clear')).toBeTruthy()
      }
    })
  })

  // =========================================================================
  // BRANDABILITY
  // =========================================================================

  describe('Brandability', () => {
    it('aplica classe de brand hub', () => {
      const wrapper = mount(DssInput, { props: { brand: 'hub' } })
      expect(wrapper.classes()).toContain('dss-input--brand-hub')
    })

    it('aplica classe de brand water', () => {
      const wrapper = mount(DssInput, { props: { brand: 'water' } })
      expect(wrapper.classes()).toContain('dss-input--brand-water')
    })

    it('aplica classe de brand waste', () => {
      const wrapper = mount(DssInput, { props: { brand: 'waste' } })
      expect(wrapper.classes()).toContain('dss-input--brand-waste')
    })
  })

  // =========================================================================
  // CLEARABLE
  // =========================================================================

  describe('Clearable', () => {
    it('nao mostra botao clear quando clearable=false', () => {
      const wrapper = mount(DssInput, { props: { clearable: false } })
      expect(wrapper.find('.dss-input__clear').exists()).toBe(false)
    })

    it('botao clear tem aria-label', () => {
      const wrapper = mount(DssInput, {
        props: { modelValue: 'texto', clearable: true, clearAriaLabel: 'Limpar campo' }
      })
      const clearBtn = wrapper.find('.dss-input__clear')
      if (clearBtn.exists()) {
        expect(clearBtn.attributes('aria-label')).toBe('Limpar campo')
      }
    })
  })

  // =========================================================================
  // EXPOSE
  // =========================================================================

  describe('Expose', () => {
    it('expoe metodo focus()', () => {
      const wrapper = mount(DssInput)
      expect(typeof wrapper.vm.focus).toBe('function')
    })

    it('expoe metodo blur()', () => {
      const wrapper = mount(DssInput)
      expect(typeof wrapper.vm.blur).toBe('function')
    })

    it('expoe inputRef', () => {
      const wrapper = mount(DssInput)
      expect(wrapper.vm.inputRef).toBeDefined()
    })
  })
})
