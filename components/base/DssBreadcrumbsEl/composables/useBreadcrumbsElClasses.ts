import { computed } from 'vue'
import type { BreadcrumbsElProps } from '../types/breadcrumbs-el.types'

/**
 * Retorna as classes de modificador BEM para o DssBreadcrumbsEl.
 *
 * Dualidade clicável/estático:
 * - `--clickable`: item possui `to` ou `href` — comportamento de link.
 * - `--current`: item sem `to` ou `href` — item atual (página corrente), não interativo.
 * - `--disabled`: item com `disable: true` — desabilitado.
 */
export function useBreadcrumbsElClasses(props: BreadcrumbsElProps) {
  const isClickable = computed(() => Boolean(props.to || props.href))

  const breadcrumbsElClasses = computed(() => ({
    'dss-breadcrumbs-el--clickable': isClickable.value,
    'dss-breadcrumbs-el--current': !isClickable.value,
    'dss-breadcrumbs-el--disabled': props.disable,
  }))

  return { breadcrumbsElClasses, isClickable }
}
