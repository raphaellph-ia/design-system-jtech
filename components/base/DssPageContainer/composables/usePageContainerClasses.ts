/**
 * ==========================================================================
 * DssPageContainer — Composable de Classes
 * ==========================================================================
 */

import { computed } from 'vue'

export function usePageContainerClasses() {
  const pageContainerClasses = computed(() => ({
    'dss-page-container': true
  }))

  return { pageContainerClasses }
}
