import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import type { MediaListItem } from '../types/media'

type Props = {
  media: MediaListItem
  signedUrl: string | null
  loading: boolean
  error: string
  onClose: () => void
}

export function MediaPreviewDialog({ media, signedUrl, loading, error, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [playbackError, setPlaybackError] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => { if (dialog?.open) dialog.close() }
  }, [])

  return <dialog
    ref={dialogRef}
    aria-labelledby="preview-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}
    className="m-auto w-[calc(100%-2rem)] max-w-4xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-card border border-border bg-surface p-0 text-text-primary shadow-panel backdrop:bg-black/80"
  >
    <div className="flex min-w-0 items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
      <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wider text-accent">Preview privado</p><h2 id="preview-title" className="mt-1 truncate text-base font-extrabold sm:text-lg" title={media.file_name}>{media.file_name}</h2></div>
      <button type="button" autoFocus onClick={onClose} className="sf-button-secondary shrink-0 px-3" aria-label="Fechar visualização"><Icon name="close" /><span>Fechar</span></button>
    </div>
    <div className="p-4 sm:p-6">
      {loading && <p role="status" className="flex min-h-52 items-center justify-center gap-3 text-sm text-text-secondary"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />Preparando vídeo...</p>}
      {error && <p role="alert" className="sf-alert-error">{error}</p>}
      {signedUrl && !error && <div className="overflow-hidden rounded-xl bg-black">
        <video aria-label={`Reprodução de ${media.file_name}`} className="mx-auto block max-h-[70dvh] w-full object-contain" src={signedUrl} controls playsInline preload="metadata" onError={() => setPlaybackError(true)}>
          Seu navegador não suporta reprodução de vídeo.
        </video>
      </div>}
      {playbackError && <p role="alert" className="sf-alert-error mt-4">Não foi possível reproduzir este vídeo neste navegador. Feche e abra novamente para renovar o link, ou tente outro navegador.</p>}
      {signedUrl && <p className="mt-3 text-xs text-text-secondary">O link de acesso expira em 10 minutos.</p>}
    </div>
  </dialog>
}
