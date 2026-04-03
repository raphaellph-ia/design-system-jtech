/**
 * ==========================================================================
 * DssTabs — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssTabs.
 * Container de navegação por abas — wrapper DSS sobre QTabs.
 *
 * @version 1.0.0
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Marcas do sistema Sansys
 */
export type TabsBrand = 'hub' | 'water' | 'waste'

/**
 * Alinhamento das abas dentro do container.
 * Equivale à prop `align` do QTabs.
 */
export type TabsAlign = 'left' | 'center' | 'right' | 'justify'

// ==========================================================================
// INTERFACES — DssTabs
// ==========================================================================

/**
 * Props do componente DssTabs.
 *
 * A API espelha seletivamente a do QTabs, expondo apenas as props
 * semanticamente relevantes para o DSS.
 *
 * Props bloqueadas:
 * - active-color: cor da aba ativa governada por tokens no DssTab
 * - active-bg-color: cor de fundo da aba ativa governada por tokens no DssTab
 * - indicator-color: cor do indicador governada por tokens no DssTab
 * - ripple: desativado permanentemente (:ripple="false") — DSS governa feedback visual
 * - no-caps: governado por CSS/tokens DSS, não por prop
 */
export interface TabsProps {
  /**
   * Identificador da aba atualmente selecionada (v-model).
   * Deve corresponder ao `name` de um DssTab filho.
   */
  modelValue?: string | number

  /**
   * Alinhamento das abas no container.
   * - `left`: abas à esquerda (padrão)
   * - `center`: abas centralizadas
   * - `right`: abas à direita
   * - `justify`: abas distribuídas ocupando toda a largura
   *
   * @default 'left'
   */
  align?: TabsAlign

  /**
   * Largura mínima do container (em px) para exibir as setas de navegação.
   * Abaixo desse breakpoint, as setas aparecem para permitir scroll.
   *
   * @default 600
   */
  breakpoint?: number

  /**
   * Exibe as abas em layout vertical (coluna).
   * O indicador é exibido na lateral em vez de abaixo.
   *
   * @default false
   */
  vertical?: boolean

  /**
   * Modo compacto: reduz o padding interno do container de abas.
   * Não afeta o padding das abas individuais (DssTab).
   *
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca nas setas de navegação e
   * propaga [data-brand] para coloração dos filhos DssTab.
   *
   * @default null
   */
  brand?: TabsBrand | null

  /**
   * Label acessível para o grupo de abas (aria-label).
   * Recomendado quando o grupo não possui label visual visível.
   *
   * @example 'Configurações da conta'
   * @example 'Seções do painel'
   */
  ariaLabel?: string
}

// ==========================================================================
// EMITS
// ==========================================================================

/**
 * Emits do componente DssTabs.
 */
export interface TabsEmits {
  /**
   * Emitido quando o usuário seleciona uma aba.
   * Compatível com v-model.
   */
  (e: 'update:modelValue', value: string | number): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssTabs.
 */
export interface TabsSlots {
  /**
   * Conteúdo do grupo de abas.
   * Aceita: DssTab (principal).
   *
   * ⚠️ Regra de Composição v2.4:
   * Somente DssTab (ou DssRouteTab quando implementado) deve ser usado
   * dentro do DssTabs. O uso de <q-tab> diretamente é uma violação
   * arquitetural documentada no gate de composição.
   *
   * Nota: Elementos não-DSS dentro do slot não receberão
   * os estilos de indicador e navegação do DssTabs automaticamente.
   */
  default(): any
}
