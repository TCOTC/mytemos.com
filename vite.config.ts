import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import type { ResolvedConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-expect-error -- 本地 .mjs 构建插件无类型声明
import { compressImagesPlugin } from './scripts/vite-plugin-compress-images.mjs'

const content = JSON.parse(
  readFileSync(new URL('./src/data/content.json', import.meta.url), 'utf8'),
)

const avatarFilename = content.profile.avatar.split('/').pop() as string
const avatarStem = avatarFilename.replace(/\.[^.]+$/, '')
const avatarDevHref = `/src/assets/images/${avatarFilename}`

function isAvatarAsset(fileName: string): boolean {
  const base = fileName.split('/').pop() ?? ''
  return base === avatarFilename || base.startsWith(`${avatarStem}-`)
}

function siteHtmlPlugin() {
  let avatarAssetName: string | undefined
  let indexHtmlPath: string | undefined

  return {
    name: 'site-html',
    configResolved(config: ResolvedConfig) {
      indexHtmlPath = join(config.root, config.build.outDir, 'index.html')
    },
    generateBundle(_options: unknown, bundle: Record<string, unknown>) {
      avatarAssetName = Object.keys(bundle).find(isAvatarAsset)
    },
    closeBundle() {
      if (!avatarAssetName || !indexHtmlPath || !existsSync(indexHtmlPath)) return

      const faviconHref = `/${avatarAssetName}`
      const html = readFileSync(indexHtmlPath, 'utf8').replace(
        /<link rel="icon"[^>]*\/?>/,
        `<link rel="icon" type="image/png" href="${faviconHref}" />`,
      )
      writeFileSync(indexHtmlPath, html)
    },
    transformIndexHtml(html: string) {
      return html
        .replace(/<title>.*?<\/title>/, `<title>${content.meta.title}</title>`)
        .replace(
          /<meta name="description" content="[^"]*"\s*\/>/,
          `<meta name="description" content="${content.meta.description}" />`,
        )
        .replace(
          /<link rel="icon"[^>]*\/?>/,
          `<link rel="icon" type="image/png" href="${avatarDevHref}" />`,
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
