import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/static_web',
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom'))  return 'vendor-dom'
          if (id.includes('node_modules/react'))      return 'vendor-react'
          if (id.includes('node_modules/axios'))      return 'vendor-http'
          if (id.includes('node_modules/@headlessui')) return 'vendor-ui'
          if (id.includes('node_modules/@heroicons')) return 'vendor-icons'
          if (id.includes('node_modules'))            return 'vendor-other'
        },
      },
    },
    chunkSizeWarningLimit: 300,
  },
})
