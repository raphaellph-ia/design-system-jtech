// ==========================================================================
// DssDrawer — Types
// ==========================================================================

/** Lado de ancoramento do drawer na página. */
export type DrawerSide = 'left' | 'right'

export type DrawerProps = {
  /**
   * Controla a visibilidade do drawer (v-model).
   * true = aberto; false = fechado. Padrão: true.
   */
  modelValue?: boolean
  /**
   * Lado de ancoramento do drawer.
   * 'left' (padrão) = ancora à esquerda; 'right' = ancora à direita.
   */
  side?: DrawerSide
  /**
   * Força o drawer a sobrepor o conteúdo da página em todos os breakpoints,
   * ignorando o comportamento padrão de empurrar conteúdo em desktop.
   */
  overlay?: boolean
  /**
   * Aplica sombra de elevação (--dss-elevation-2) para destacar o drawer
   * do conteúdo principal da página.
   */
  elevated?: boolean
  /**
   * Aplica borda lateral sutil separando o drawer do conteúdo.
   * side="left" → border-right. side="right" → border-left.
   */
  bordered?: boolean
  /**
   * Modo minimizado: reduz a largura do drawer para exibir apenas ícones.
   * O conteúdo completo pode ser revelado ao expandir.
   */
  mini?: boolean
  /**
   * Largura do drawer em pixels.
   * Padrão: 256 (equivalente ao token --dss-spacing-64).
   */
  width?: number
}

export type DrawerEmits = {
  /**
   * Emitido quando o estado de visibilidade do drawer muda.
   * Compatível com v-model.
   */
  'update:modelValue': [value: boolean]
}

export type DrawerSlots = {
  /**
   * Conteúdo do drawer.
   * Deve conter exclusivamente DssList, DssMenu ou cabeçalhos de seção DSS.
   * Uso de HTML nativo ou texto solto é violação arquitetural (Gate v2.4).
   */
  default(): void
}
