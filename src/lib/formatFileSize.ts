export function formatFileSize(bytes: number | null): string {
  if (bytes === null) return 'Tamanho não informado'
  if (bytes < 1024) return `${bytes} B`
  const size = bytes >= 1024 * 1024 ? bytes / (1024 * 1024) : bytes / 1024
  const unit = bytes >= 1024 * 1024 ? 'MB' : 'KB'
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(size)} ${unit}`
}
