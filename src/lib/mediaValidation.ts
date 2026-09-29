const videoFormats = {
  'video/mp4': ['.mp4', '.m4v'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov', '.qt'],
} as const

export const videoAccept = Object.entries(videoFormats)
  .flatMap(([mimeType, extensions]) => [mimeType, ...extensions])
  .join(',')

export function validateVideoFile(file: File): string | null {
  if (!file.name || file.name === '.' || file.name === '..' || /[/\\]/.test(file.name)) {
    return 'Escolha um arquivo com nome válido, sem barras.'
  }
  if (file.size === 0) return 'O arquivo está vazio.'

  const mimeType = file.type.toLowerCase()
  if (!(mimeType in videoFormats)) {
    return 'Formato não aceito. Use MP4, WebM ou QuickTime (MOV).'
  }

  const extensions: readonly string[] = videoFormats[mimeType as keyof typeof videoFormats]
  if (!extensions.some(extension => file.name.toLowerCase().endsWith(extension))) {
    return 'O tipo do vídeo não corresponde à extensão do arquivo.'
  }
  return null
}
