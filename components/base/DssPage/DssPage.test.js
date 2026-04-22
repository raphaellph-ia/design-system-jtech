import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssPage from './DssPage.vue'

installQuasar()

describe('DssPage', () => {
  // -------------------------------------------------------------------------
  // Estrutura
  // -------------------------------------------------------------------------

  it('renderiza o componente corretamente', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('aplica a classe .dss-page ao elemento raiz', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.classes()).toContain('dss-page')
  })

  it('renderiza o conteúdo do slot default', () => {
    const wrapper = mount(DssPage, {
      slots: { default: '<div data-testid="conteudo">Conteúdo</div>' }
    })
    expect(wrapper.find('[data-testid="conteudo"]').exists()).toBe(true)
  })

  it('exibe nome de componente correto via defineOptions', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.vm.$options.name).toBe('DssPage')
  })

  // -------------------------------------------------------------------------
  // role="main"
  // -------------------------------------------------------------------------

  it('aplica role="main" por padrão', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.attributes('role')).toBe('main')
  })

  it('permite sobrescrever role via $attrs', () => {
    const wrapper = mount(DssPage, {
      attrs: { role: 'complementary' }
    })
    expect(wrapper.attributes('role')).toBe('complementary')
  })

  // -------------------------------------------------------------------------
  // Prop: padding
  // -------------------------------------------------------------------------

  it('não aplica .dss-page--padding por padrão (padding=false)', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.classes()).not.toContain('dss-page--padding')
  })

  it('aplica .dss-page--padding quando padding=true', () => {
    const wrapper = mount(DssPage, {
      props: { padding: true }
    })
    expect(wrapper.classes()).toContain('dss-page--padding')
  })

  it('remove .dss-page--padding quando padding=false', () => {
    const wrapper = mount(DssPage, {
      props: { padding: false }
    })
    expect(wrapper.classes()).not.toContain('dss-page--padding')
  })

  // -------------------------------------------------------------------------
  // Forwarding de Atributos
  // -------------------------------------------------------------------------

  it('repassa atributos extras ao elemento raiz via v-bind="$attrs"', () => {
    const wrapper = mount(DssPage, {
      attrs: { 'data-testid': 'main-page', 'aria-label': 'Conteúdo principal' }
    })
    expect(wrapper.attributes('data-testid')).toBe('main-page')
    expect(wrapper.attributes('aria-label')).toBe('Conteúdo principal')
  })

  // -------------------------------------------------------------------------
  // Comportamentos Implícitos
  // -------------------------------------------------------------------------

  it('não é interativo — sem tabindex próprio', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('não interfere com o foco de elementos filhos interativos', () => {
    const wrapper = mount(DssPage, {
      slots: { default: '<button>Ação</button>' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('é utilizável sem conteúdo no slot (estrutura mínima)', () => {
    const wrapper = mount(DssPage)
    expect(wrapper.classes()).toContain('dss-page')
  })

  // -------------------------------------------------------------------------
  // Composição
  // -------------------------------------------------------------------------

  it('aceita múltiplos filhos no slot default', () => {
    const wrapper = mount(DssPage, {
      slots: { default: '<div id="a">A</div><div id="b">B</div>' }
    })
    expect(wrapper.find('#a').exists()).toBe(true)
    expect(wrapper.find('#b').exists()).toBe(true)
  })
})
