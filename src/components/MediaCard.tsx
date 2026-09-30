import { Icon } from './Icon'
import { formatFileSize } from '../lib/formatFileSize'
import type { MediaListItem, MediaStatus } from '../types/media'

const statusLabels: Record<MediaStatus, string> = {
  uploading: 'Enviando',
  ready: 'Pronto',
  failed: 'Falhou',
}

const statusClasses: Record<MediaStatus, string> = {
  uploading: 'border-warning/30 bg-warning/10 text-warning',
  ready: 'border-success/30 bg-success/10 text-success',
  failed: 'border-error/30 bg-error/10 text-error',
}

function formatMediaType(mimeType: string | null): string {
  switch (mimeType) {
    case 'video/mp4': return 'MP4'
    case 'video/webm': return 'WebM'
    case 'video/quicktime': return 'QuickTime'
    default: return mimeType || 'Formato não informado'
  }
}

function formatUploadDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Data não informada'
    : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date)
}

export function MediaCard({ media, onPreview }: { media: MediaListItem; onPreview: (media: MediaListItem) => void }) {
  return <article className="sf-card sf-card-interactive flex min-w-0 flex-col overflow-hidden">
    <div className="flex h-40 items-center justify-center border-b border-border bg-gradient-to-br from-[#112b4c] via-[#0d203b] to-[#0b2d39] text-accent" aria-hidden="true">
      <Icon name="video" className="h-12 w-12 opacity-75" />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h3 className="min-w-0 break-words text-base font-extrabold leading-6" title={media.file_name}>{media.file_name}</h3>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusClasses[media.status]}`}>{statusLabels[media.status]}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-xs">
        <div><dt className="text-text-secondary">Formato</dt><dd className="mt-1 break-words font-semibold text-text-primary">{formatMediaType(media.mime_type)}</dd></div>
        <div><dt className="text-text-secondary">Tamanho</dt><dd className="mt-1 font-semibold text-text-primary">{formatFileSize(media.file_size)}</dd></div>
        <div className="col-span-2"><dt className="text-text-secondary">Enviado em</dt><dd className="mt-1 font-semibold text-text-primary">{formatUploadDate(media.created_at)}</dd></div>
      </dl>
      {media.status === 'ready'
        ? <button type="button" onClick={() => onPreview(media)} className="sf-button-secondary mt-6 w-full"><Icon name="video" className="h-4 w-4" /> Visualizar vídeo</button>
        : <p className="mt-6 border-t border-border pt-4 text-xs text-text-secondary">{media.status === 'uploading' ? 'O vídeo ainda está sendo enviado.' : 'Este vídeo não está disponível para reprodução.'}</p>}
    </div>
  </article>
}
