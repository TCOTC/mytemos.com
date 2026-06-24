const DEFAULT_SIZE = 128

/** 将方形图片裁成圆形 PNG，透明区域保留 alpha 通道 */
export function createCircularFavicon(sourceUrl: string, size = DEFAULT_SIZE): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'))
        return
      }

      ctx.clearRect(0, 0, size, size)
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      const crop = Math.min(img.naturalWidth, img.naturalHeight)
      const sx = (img.naturalWidth - crop) / 2
      const sy = (img.naturalHeight - crop) / 2
      ctx.drawImage(img, sx, sy, crop, crop, 0, 0, size, size)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to encode circular favicon'))
            return
          }
          resolve(URL.createObjectURL(blob))
        },
        'image/png',
      )
    }

    img.onerror = () => reject(new Error('Failed to load favicon source image'))
    img.src = sourceUrl
  })
}

export async function applyCircularFavicon(sourceUrl: string, size = DEFAULT_SIZE): Promise<void> {
  const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!favicon) return

  try {
    const circularUrl = await createCircularFavicon(sourceUrl, size)
    const previous = favicon.dataset.circularFavicon
    if (previous) URL.revokeObjectURL(previous)

    favicon.href = circularUrl
    favicon.type = 'image/png'
    favicon.dataset.circularFavicon = circularUrl
  } catch {
    favicon.href = sourceUrl
    favicon.type = 'image/png'
  }
}
