// ==========================================================================
// DssLayout — Types
// ==========================================================================

/**
 * String de configuração estrutural do QLayout.
 *
 * Formato: "{header} {left-sidebar}{page}{right-sidebar} {footer}"
 * Letras minúsculas = responsivo (colapsa em telas menores).
 * Letras maiúsculas = fixo (sempre visível).
 *
 * Padrão DSS corporativo: 'hHh lpR fFf'
 *   - Header responsivo com linha de desktop fixa
 *   - Sidebar esquerdo responsivo, sidebar direito fixo
 *   - Footer responsivo com linha de desktop fixa
 */
export type LayoutView = string

export type LayoutProps = {
  /**
   * Configuração estrutural do layout (QLayout view).
   * Padrão DSS: 'hHh lpR fFf' (header + footer fixos, drawer esquerdo responsivo).
   */
  view?: LayoutView
  /**
   * Quando true, o layout renderiza dentro do elemento pai com dimensões
   * fixas em vez de ocupar a janela inteira. Útil para modais e iframes.
   */
  container?: boolean
}

export type LayoutSlots = {
  /**
   * Conteúdo do layout. Deve conter exclusivamente:
   * - DssHeader / q-header
   * - DssDrawer / q-drawer
   * - DssFooter / q-footer
   * - DssPageContainer / q-page-container (com DssPage / q-page interno)
   *
   * HTML nativo ou texto solto viola a governança de Nível 4.
   */
  default(): void
}
