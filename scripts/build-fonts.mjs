import { mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectGlyphs } from './lib/collect-glyphs.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONTENT_PATH = join(ROOT, 'src/data/content.json')
const GITHUB_PATH = join(ROOT, 'src/data/github-contributions.json')
const FONTS_DIR = join(ROOT, 'src/assets/fonts')
const CACHE_DIR = join(__dirname, '.font-cache')
const GLYPHS_DIR = join(CACHE_DIR, 'glyphs')
const FONTS_SCSS = join(ROOT, 'src/assets/scss/_fonts.scss')

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const SUBSET_ARGS = [
  '--flavor=woff2',
  '--layout-features=*',
  '--glyph-names',
  '--symbol-cmap',
  '--legacy-cmap',
  '--notdef-glyph',
  '--notdef-outline',
  '--recommended-glyphs',
  '--name-IDs=*',
  '--name-legacy',
  '--name-languages=*',
]

/** @type {Array<{ id: string; family: string; googleQuery: string; role: 'display' | 'body' | 'pixel'; weight: number; style: 'normal' | 'italic' }>} */
const FONT_SPECS = [
  {
    id: 'archivo-black',
    family: 'Archivo Black',
    googleQuery: 'Archivo+Black',
    role: 'display',
    weight: 400,
    style: 'normal',
  },
  {
    id: 'dm-sans-400',
    family: 'DM Sans',
    googleQuery: 'DM+Sans:wght@400',
    role: 'body',
    weight: 400,
    style: 'normal',
  },
  {
    id: 'dm-sans-400-italic',
    family: 'DM Sans',
    googleQuery: 'DM+Sans:ital,wght@1,400',
    role: 'body',
    weight: 400,
    style: 'italic',
  },
  {
    id: 'dm-sans-500',
    family: 'DM Sans',
    googleQuery: 'DM+Sans:wght@500',
    role: 'body',
    weight: 500,
    style: 'normal',
  },
  {
    id: 'dm-sans-700',
    family: 'DM Sans',
    googleQuery: 'DM+Sans:wght@700',
    role: 'body',
    weight: 700,
    style: 'normal',
  },
  {
    id: 'press-start-2p',
    family: 'Press Start 2P',
    googleQuery: 'Press+Start+2P',
    role: 'pixel',
    weight: 400,
    style: 'normal',
  },
]

function ensureFonttools() {
  const check = spawnSync('python3', ['-m', 'fontTools.subset', '--help'], {
    stdio: 'ignore',
  })
  if (check.status === 0) return

  console.log('未检测到 fonttools，正在安装…')
  const install = spawnSync('pip3', ['install', 'fonttools', 'brotli'], {
    stdio: 'inherit',
  })
  if (install.status !== 0) {
    throw new Error('请先安装 fonttools: pip3 install fonttools brotli')
  }
}

/** @param {string} text */
function glyphCacheKey(text) {
  return createHash('sha256').update(text).digest('hex').slice(0, 8)
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`下载失败 ${url}: ${res.status}`)
  return res.text()
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`下载失败 ${url}: ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

/**
 * @param {string} css
 * @returns {Array<{ weight: number; style: 'normal' | 'italic'; url: string; isLatin: boolean }>}
 */
function parseFontFaceBlocks(css) {
  const blocks = []
  for (const block of css.split(/@font-face\s*\{/).slice(1)) {
    const weightMatch = block.match(/font-weight:\s*(\d+)/)
    const styleMatch = block.match(/font-style:\s*(normal|italic)/)
    const urlMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)
    const rangeMatch = block.match(/unicode-range:\s*([^;]+)/)
    if (!urlMatch) continue

    blocks.push({
      weight: weightMatch ? Number(weightMatch[1]) : 400,
      style: /** @type {'normal' | 'italic'} */ (styleMatch?.[1] ?? 'normal'),
      url: urlMatch[1],
      isLatin: /U\+0000-00FF/.test(rangeMatch?.[1] ?? ''),
    })
  }
  return blocks
}

/**
 * @param {string} fontPath
 * @param {string} char
 */
function fontHasChar(fontPath, char) {
  const result = spawnSync(
    'python3',
    [
      '-c',
      `from fontTools.ttLib import TTFont; import sys; cmap=TTFont(sys.argv[1]).getBestCmap(); sys.exit(0 if ord(sys.argv[2]) in cmap else 1)`,
      fontPath,
      char,
    ],
    { stdio: 'ignore' },
  )
  return result.status === 0
}

/**
 * @param {string} googleQuery
 * @param {number} weight
 * @param {'normal' | 'italic'} style
 */
async function resolveWoff2Url(googleQuery, weight, style) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${googleQuery}&display=swap`
  const css = await fetchText(cssUrl)
  const matches = parseFontFaceBlocks(css).filter(
    (block) => block.weight === weight && block.style === style,
  )

  const latin = matches.find((block) => block.isLatin)
  if (latin) return latin.url
  if (matches[0]) return matches[0].url

  throw new Error(`未找到 woff2: ${googleQuery} (${weight}, ${style})`)
}

/**
 * @param {typeof FONT_SPECS[number]} spec
 */
async function loadSourceFont(spec) {
  mkdirSync(CACHE_DIR, { recursive: true })
  const cachePath = join(CACHE_DIR, `${spec.id}.woff2`)

  const cacheValid = existsSync(cachePath) && fontHasChar(cachePath, 'A')
  if (!cacheValid) {
    if (existsSync(cachePath)) unlinkSync(cachePath)
    const url = await resolveWoff2Url(spec.googleQuery, spec.weight, spec.style)
    const buf = await fetchBuffer(url)
    writeFileSync(cachePath, buf)
    if (!fontHasChar(cachePath, 'A')) {
      throw new Error(`源字体缺少基本拉丁字母: ${spec.id} (${url})`)
    }
  }

  return cachePath
}

/**
 * @param {string} sourcePath
 * @param {string} text
 * @param {string} outputPath
 */
function subsetWithFonttools(sourcePath, text, outputPath) {
  mkdirSync(GLYPHS_DIR, { recursive: true })
  const textPath = join(GLYPHS_DIR, `${glyphCacheKey(text)}.txt`)
  writeFileSync(textPath, text)

  const result = spawnSync(
    'python3',
    [
      '-m',
      'fontTools.subset',
      sourcePath,
      `--text-file=${textPath}`,
      `--output-file=${outputPath}`,
      ...SUBSET_ARGS,
    ],
    { stdio: 'inherit' },
  )

  if (result.status !== 0) {
    throw new Error(`fonttools 子集化失败: ${outputPath}`)
  }

  const sample = text.replace(/\s/g, '').charAt(0)
  if (sample && !fontHasChar(outputPath, sample)) {
    throw new Error(`子集字体缺少字符 "${sample}": ${outputPath}`)
  }
}

function buildFontsScss() {
  const lines = [
    '// 由 scripts/build-fonts.mjs 自动生成，请勿手动编辑',
    '// url 使用相对路径，构建时由 Vite 自动添加 content hash',
    '',
  ]

  for (const spec of FONT_SPECS) {
    lines.push('@font-face {')
    lines.push(`  font-family: '${spec.family}';`)
    lines.push(`  src: url('../fonts/${spec.id}.woff2') format('woff2');`)
    lines.push(`  font-weight: ${spec.weight};`)
    lines.push(`  font-style: ${spec.style};`)
    lines.push('  font-display: swap;')
    lines.push('}')
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * @param {typeof FONT_SPECS[number]} spec
 * @param {string} text
 */
async function buildFontFile(spec, text) {
  const sourcePath = await loadSourceFont(spec)
  const outPath = join(FONTS_DIR, `${spec.id}.woff2`)
  subsetWithFonttools(sourcePath, text, outPath)

  const size = readFileSync(outPath).length
  const kb = (size / 1024).toFixed(1)
  console.log(`${spec.id}.woff2 — ${kb} KB, ${text.length} glyphs`)
}

async function main() {
  ensureFonttools()

  const content = JSON.parse(readFileSync(CONTENT_PATH, 'utf8'))
  const github = existsSync(GITHUB_PATH)
    ? JSON.parse(readFileSync(GITHUB_PATH, 'utf8'))
    : null

  rmSync(FONTS_DIR, { recursive: true, force: true })
  mkdirSync(FONTS_DIR, { recursive: true })

  const glyphs = collectGlyphs(content, github)

  for (const spec of FONT_SPECS) {
    await buildFontFile(spec, glyphs[spec.role])
  }

  writeFileSync(FONTS_SCSS, buildFontsScss())
  console.log(`已写入 ${FONTS_SCSS}`)
  console.log('字体文件已输出到 src/assets/fonts/，构建时由 Vite 自动 hash')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
