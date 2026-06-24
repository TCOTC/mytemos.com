import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compressImageBuffer } from './compress-image.mjs'

export const IMAGE_CACHE_DIR = join(dirname(fileURLToPath(import.meta.url)), '../.image-cache')

/**
 * 读取或生成压缩缓存（按原图内容哈希，原图不变则跳过重压）
 * @param {string} sourcePath
 */
export async function resolveCompressedAsset(sourcePath) {
  const input = readFileSync(sourcePath)
  const ext = extname(sourcePath).toLowerCase()
  const key = createHash('sha256').update(input).digest('hex')
  const cacheFileName = `${key}${ext}`
  const cachePath = join(IMAGE_CACHE_DIR, cacheFileName)

  if (!existsSync(cachePath)) {
    const output = await compressImageBuffer(input, ext)
    const best = output.length < input.length ? output : input
    mkdirSync(IMAGE_CACHE_DIR, { recursive: true })
    writeFileSync(cachePath, best)
  }

  return { cachePath, cacheFileName, ext }
}

/**
 * @param {Buffer} input
 * @param {'.png' | '.jpg' | '.jpeg'} ext
 */
export async function compressIfSmaller(input, ext) {
  const output = await compressImageBuffer(input, ext)
  return output.length < input.length ? output : input
}
