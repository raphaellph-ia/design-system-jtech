// ==========================================================================
// DssPage — usePageClasses
// ==========================================================================

import { computed } from 'vue'
import type { PageProps } from '../types/page.types'

export function usePageClasses(props: Readonly<PageProps>) {
  const pageClasses = computed(() => [
    'dss-page',
    {
      'dss-page--padding': props.padding
    }
  ])

  return { pageClasses }
}
