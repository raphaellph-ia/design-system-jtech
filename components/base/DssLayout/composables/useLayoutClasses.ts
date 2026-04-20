// ==========================================================================
// DssLayout — useLayoutClasses
// ==========================================================================

import { computed } from 'vue'
import type { LayoutProps } from '../types/layout.types'

export function useLayoutClasses(props: Readonly<LayoutProps>) {
  const layoutClasses = computed(() => [
    'dss-layout',
    {
      'dss-layout--container': props.container
    }
  ])

  return { layoutClasses }
}
