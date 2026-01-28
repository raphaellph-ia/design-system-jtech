/* ==========================================================================
   DSS COMPONENTS - Exportação Central
   Sistema de Componentes Vue.js com Acessibilidade WCAG 2.1 AA

   USO:

   // Importar componentes individualmente
   import { DssButton, DssCard, DssInput } from '@sansys/design-system'

   // Ou usar como plugin Vue (registra todos globalmente)
   import DesignSystemSansys from '@sansys/design-system'
   app.use(DesignSystemSansys)
   ========================================================================== */

// ============================================================================
// COMPONENTES BASE
// ============================================================================

// Button
export { DssButton } from './base/DssButton'

// Badge
export { DssBadge } from './base/DssBadge'

// Avatar
export { DssAvatar } from './base/DssAvatar'

// Card e subcomponentes
export {
  DssCard,
  DssCardSection,
  DssCardActions
} from './base/DssCard'

// Input
export { DssInput } from './base/DssInput'

// Chip
export { DssChip } from './base/DssChip'

// ============================================================================
// IMPORTAÇÕES PARA PLUGIN VUE
// ============================================================================

import DssButton from './base/DssButton/1-structure/DssButton.vue'
import DssBadge from './base/DssBadge/1-structure/DssBadge.vue'
import DssAvatar from './base/DssAvatar/1-structure/DssAvatar.vue'
import DssCard from './base/DssCard/1-structure/DssCard.vue'
import DssCardSection from './base/DssCard/1-structure/DssCardSection.vue'
import DssCardActions from './base/DssCard/1-structure/DssCardActions.vue'
import DssInput from './base/DssInput/1-structure/DssInput.vue'
import DssChip from './base/DssChip/1-structure/DssChip.ts.vue'

// ============================================================================
// PLUGIN VUE - INSTALAÇÃO GLOBAL
// ============================================================================

const DesignSystemSansys = {
  install(app, options = {}) {
    // Registrar todos os componentes globalmente
    app.component('DssButton', DssButton)
    app.component('DssBadge', DssBadge)
    app.component('DssAvatar', DssAvatar)
    app.component('DssCard', DssCard)
    app.component('DssCardSection', DssCardSection)
    app.component('DssCardActions', DssCardActions)
    app.component('DssInput', DssInput)
    app.component('DssChip', DssChip)

    // Opções globais (se fornecidas)
    if (options.brand) {
      app.provide('dss-default-brand', options.brand)
    }

    if (options.theme) {
      app.provide('dss-default-theme', options.theme)
    }

    // Log de instalação (apenas em dev)
    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ Design System Sansys instalado com sucesso!')
      console.log('📦 Componentes registrados:', [
        'DssButton',
        'DssBadge',
        'DssAvatar',
        'DssCard',
        'DssCardSection',
        'DssCardActions',
        'DssInput',
        'DssChip'
      ])
      if (options.brand) {
        console.log('🎨 Brand padrão:', options.brand)
      }
    }
  }
}

// ============================================================================
// EXPORT DEFAULT (Plugin Vue)
// ============================================================================

export default DesignSystemSansys
