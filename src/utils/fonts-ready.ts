/** 与页面实际使用的 font-family / weight / size 保持一致 */
const FONT_LOAD_SPECS = [
  '400 32px "Archivo Black"',
  '400 15px "DM Sans"',
  '500 12px "DM Sans"',
  '700 14px "DM Sans"',
  'italic 400 13px "DM Sans"',
  '400 8px "Press Start 2P"',
] as const

const READY_TIMEOUT_MS = 3000

export function revealWhenFontsReady(): void {
  const root = document.documentElement

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('fonts-loading')
    root.classList.add('fonts-ready')
    return
  }

  const ready = (async () => {
    if (!document.fonts) return

    await Promise.all([
      document.fonts.ready,
      ...FONT_LOAD_SPECS.map((spec) => document.fonts!.load(spec).catch(() => undefined)),
    ])
  })()

  const timeout = new Promise<void>((resolve) => {
    window.setTimeout(resolve, READY_TIMEOUT_MS)
  })

  void Promise.race([ready, timeout]).finally(() => {
    root.classList.remove('fonts-loading')
    root.classList.add('fonts-ready')
  })
}
