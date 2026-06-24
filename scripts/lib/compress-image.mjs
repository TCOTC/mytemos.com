import sharp from 'sharp'

const PNG_ALPHA_QUALITY = 80
const PNG_OPAQUE_QUALITY = 85
const JPEG_QUALITY = 82

/**
 * @param {Buffer} input
 * @param {'.png' | '.jpg' | '.jpeg'} ext
 */
export async function compressImageBuffer(input, ext) {
  const image = sharp(input, { failOn: 'none' })
  const meta = await image.metadata()

  if (ext === '.png') {
    return image
      .png({
        palette: true,
        quality: meta.hasAlpha ? PNG_ALPHA_QUALITY : PNG_OPAQUE_QUALITY,
        effort: 10,
        compressionLevel: 9,
      })
      .toBuffer()
  }

  return image
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
    })
    .toBuffer()
}
