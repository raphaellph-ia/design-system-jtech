import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'DesignSystemSansys',
      formats: ['es', 'umd'],
      fileName: (format) => `dss.${format}.js`
    },
    rollupOptions: {
      // Externalize Vue - não incluir no bundle
      external: ['vue'],
      output: {
        // Global vars para uso em UMD build
        globals: {
          vue: 'Vue'
        },
        // Exportar CSS separado
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name
        }
      }
    },
    // Source maps para debug
    sourcemap: true,
    // Output dir
    outDir: 'dist',
    // Limpar dist antes de build
    emptyOutDir: true
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
