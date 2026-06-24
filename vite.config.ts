import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // 全局默认启用 Vapor Mode 编译
      script: {
        vapor: true,
      },
      features: {
        // 仅使用 Composition API，减小生产包体积
        optionsAPI: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
