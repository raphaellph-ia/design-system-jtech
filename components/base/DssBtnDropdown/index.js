/**
 * DssBtnDropdown — Barrel Export
 *
 * Exporta o componente via Entry Point Wrapper (canônico),
 * além de types e composables para consumo externo.
 *
 * Conforme CLAUDE.md e precedente DssBtnGroup (NC-02 Ciclo 1):
 * - importar do wrapper canônico (DssBtnDropdown.vue), não de 1-structure/
 * - exportar types e composables
 */

import DssBtnDropdown from './DssBtnDropdown.vue'

export { DssBtnDropdown }
export default DssBtnDropdown

export type {
  BtnDropdownProps,
  BtnDropdownEmits,
  BtnDropdownSlots,
  BtnDropdownVariant,
  BtnDropdownSize,
  BtnDropdownBrand
} from './types/btn-dropdown.types'

export {
  useBtnDropdownClasses,
  useBtnDropdownVariantProps
} from './composables'
