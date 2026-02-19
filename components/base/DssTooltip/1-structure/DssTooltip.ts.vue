<template>
  <div
    v-show="visible"
    :class="tooltipClasses"
    role="tooltip"
    :aria-label="ariaLabel"
  >
    <!-- Conteudo do tooltip -->
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssTooltip - Design System Sansys Tooltip Component
 * ==========================================================================
 *
 * Componente de tooltip para informacao contextual.
 * Classificacao: Elemento Informativo Contextual (NAO interativo).
 *
 * Golden Context: DssBadge
 *
 * COMPORTAMENTOS EXPLICITOS:
 * - inheritAttrs: true (default). Atributos HTML (id, class, style, data-*)
 *   encaminhados ao elemento raiz <div>. O atributo 'id' e essencial para
 *   associacao via aria-describedby no elemento disparador.
 * - Elementos decorativos: NENHUM. Nao ha aria-hidden="true".
 * - Estados NAO aplicaveis: hover, active, checked, loading, disabled, focus.
 *   DssTooltip e passivo. Interatividade pertence ao elemento disparador.
 * - Visibilidade: Controlada EXTERNAMENTE via prop 'visible'.
 *   O componente NAO controla eventos, NAO captura input,
 *   NAO governa abertura/fechamento.
 * - Touch target: NAO implementado (Opcao B — componente nao interativo).
 *   Responsabilidade do elemento disparador (WCAG 2.5.5).
 * - ::before: PROIBIDO (decisao congelada).
 * - ::after: Permitido apenas para efeitos visuais passivos.
 *
 * @see DssBadge (Golden Context)
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { TooltipProps } from '../types/tooltip.types'
import { useTooltipClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssTooltip'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<TooltipProps>(), {
  // Content
  label: '',

  // Visual
  color: 'dark',
  textColor: null,
  multiLine: false,

  // Visibility
  visible: false,

  // Brand
  brand: null,

  // Accessibility
  ariaLabel: undefined
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { tooltipClasses } = useTooltipClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
