const imageModules = import.meta.glob('../assets/images/jeff/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

/** 将 content.json 中的逻辑路径解析为 Vite 处理后的 URL */
export function resolveImage(logicalPath: string): string {
  const filename = logicalPath.split('/').pop()
  if (!filename) return logicalPath

  const entry = Object.entries(imageModules).find(([path]) => path.endsWith(`/${filename}`))
  return entry?.[1] ?? logicalPath
}
