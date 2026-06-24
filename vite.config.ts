import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-expect-error -- 本地 .mjs 构建插件无类型声明
import { compressImagesPlugin } from './scripts/vite-plugin-compress-images.mjs'

const content = JSON.parse(
  readFileSync(new URL('./src/data/content.json', import.meta.url), 'utf8'),
)

function siteHtmlPlugin() {
  return {
    name: 'site-html',
    transformIndexHtml(html: string) {
      return html
        .replace(/<title>.*?<\/title>/, `<title>${content.meta.title}</title>`)
        .replace(
          /<meta name="description" content="[^"]*"\s*\/>/,
          `<meta name="description" content="${content.meta.description}" />`,
        )
    },
  }
}

export default defineConfig({
  plugins: [
    vue({
      features: {
        // 仅使用 Composition API，减小生产包体积
        optionsAPI: false,
      },
    }),
    siteHtmlPlugin(),
    compressImagesPlugin(),
  ],
  build: {
    // 图片全部输出为独立文件，便于在 generateBundle 阶段统一压缩
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
