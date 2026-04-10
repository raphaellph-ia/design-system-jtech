import type { VNode } from 'vue'

/**
 * Props do DssBreadcrumbsEl.
 *
 * Props bloqueadas (não expostas):
 * - ripple     → DSS não usa ripple em elementos de navegação estrutural.
 * - exact      → Gerenciado pelo DssBreadcrumbs pai, não pelo elemento individual.
 * - active-class / exact-active-class → DSS governa classes de estado ativo via CSS/tokens.
 */
export interface BreadcrumbsElProps {
  /** Texto do item de breadcrumb */
  label?: string
  /** Nome do ícone Material Icons exibido antes do conteúdo */
  icon?: string
  /** Destino de roteamento Vue Router — torna o item clicável */
  to?: string | Record<string, unknown>
  /** URL externa — alternativa ao `to` para links externos */
  href?: string
  /** Desabilita a interação com o item */
  disable?: boolean
  /** Sobrescreve a tag HTML renderizada (padrão QBreadcrumbsEl: `a` quando clicável, `div` quando estático) */
  tag?: string
}

/** DssBreadcrumbsEl não emite eventos próprios — navegação gerenciada via `to`/`href` e $attrs. */
export interface BreadcrumbsElEmits {}

export interface BreadcrumbsElSlots {
  /**
   * Conteúdo personalizado do item.
   * Sobrepõe a prop `label` quando fornecido.
   * O ícone (`icon`) é sempre renderizado antes do slot/label quando definido.
   */
  default?: () => VNode[]
}
