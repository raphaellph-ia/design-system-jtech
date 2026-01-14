/**
 * Vue Router type shims
 * Fornece tipos básicos quando vue-router não está instalado
 */

declare module 'vue-router' {
  export type RouteLocationRaw = string | {
    path?: string
    name?: string | symbol
    params?: Record<string, any>
    query?: Record<string, any>
    hash?: string
  }
}
