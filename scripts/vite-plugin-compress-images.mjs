import { existsSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { compressIfSmaller, IMAGE_CACHE_DIR, resolveCompressedAsset } from './lib/image-cache.mjs'

const IMAGE_EXT_RE = /\.(png|jpe?g)$/i
const CACHE_URL_PREFIX = '/@image-cache/'

/** 开发 / 构建时压缩图片；源码保持原图，仅输出压缩结果 */
export function compressImagesPlugin() {
  /** @type {boolean} */
  let isBuild = false

  return {
    name: 'compress-images',
    enforce: 'pre',

    configResolved(config) {
      isBuild = config.command === 'build'
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith(CACHE_URL_PREFIX)) return next()

        const fileName = req.url.slice(CACHE_URL_PREFIX.length).split('?')[0]
        if (!fileName || fileName.includes('..') || !IMAGE_EXT_RE.test(fileName)) {
          res.statusCode = 400
          res.end()
          return
        }

        const cachePath = join(IMAGE_CACHE_DIR, fileName)
        if (!existsSync(cachePath)) {
          res.statusCode = 404
          res.end()
          return
        }

        const ext = extname(fileName).toLowerCase()
        res.setHeader('Content-Type', ext === '.png' ? 'image/png' : 'image/jpeg')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(readFileSync(cachePath))
      })
    },

    async load(id) {
      if (isBuild) return null

      const path = id.split('?')[0]
      if (!IMAGE_EXT_RE.test(path) || !path.includes('/assets/images/')) return null

      const { cacheFileName } = await resolveCompressedAsset(path)
      return `export default ${JSON.stringify(`${CACHE_URL_PREFIX}${cacheFileName}`)}`
    },

    async generateBundle(_options, bundle) {
      let optimized = 0
      let savedBytes = 0

      for (const [fileName, item] of Object.entries(bundle)) {
        if (item.type !== 'asset' || !IMAGE_EXT_RE.test(fileName)) continue

        const ext = extname(fileName).toLowerCase()
        const input = Buffer.isBuffer(item.source) ? item.source : Buffer.from(item.source)
        const output = await compressIfSmaller(input, ext)

        if (output.length >= input.length) continue

        item.source = output
        optimized += 1
        savedBytes += input.length - output.length
      }

      if (optimized > 0) {
        const kb = (savedBytes / 1024).toFixed(1)
        this.info(`图片压缩：优化 ${optimized} 个产物，节省 ${kb} KB`)
      }
    },
  }
}
