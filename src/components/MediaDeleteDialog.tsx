import { useEffect, useRef } from 'react'
import { Icon } from './Icon'
import type { MediaListItem } from '../types/media'

type Props = {
  media: MediaListItem
  busy: boolean
  error: string
  onCancel: () => void
  onConfirm: () => void
}

export function MediaDeleteDialog({ media, busy, error, onCancel, onConfirm }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => { if (dialog?.open) dialog.close() }
  }, [])

  const guidance = media.status === 'failed'
    ? 'O envio falhou. Depois de remover este registro, selecione o arquivo original para enviar novamente.'
    : media.status === 'uploading'
      ? 'Este registro ainda indica envio em andamento. Exclua apenas se o envio foi interrompido; confira outras abas antes de continuar.'
      : 'O vídeo e seu registro serão removidos permanentemente.'

  return <dialog
    ref={dialogRef}
    aria-labelledby="delete-title"
    aria-describedby="delete-description"
    onCancel={event => { event.preventDefault(); if (!busy) onCancel() }}
    className="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-card border border-border bg-surface p-0 text-text-primary shadow-panel backdrop:bg-black/80"
  >
    <div className="border-b border-border px-5 py-5 sm:px-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-error/30 bg-error/10 text-error"><Icon name="video" /></span>
      <h2 id="delete-title" className="mt-4 text-xl font-extrabold">Excluir vídeo?</h2>
      <p id="delete-description" className="mt-3 break-words text-sm leading-6 text-text-secondary">
        Você está prestes a excluir <strong className="text-text-primary">{media.file_name}</strong>. {guidance}
      </p>
    </div>
    <div className="px-5 py-5 sm:px-6">
      {busy && <p role="status" className="mb-4 flex items-center gap-2 text-sm text-text-secondary"><span className="h-2 w-2 animate-pulse rounded-full bg-error" />Excluindo arquivo e registro...</p>}
      {error && <p role="alert" className="sf-alert-error mb-4">{error}</p>}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" autoFocus disabled={busy} onClick={onCancel} className="sf-button-secondary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">Cancelar</button>
        <button type="button" disabled={busy} onClick={onConfirm} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-error/40 bg-error/15 px-5 py-3 text-sm font-extrabold text-error transition-colors duration-200 hover:bg-error/25 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">{busy ? 'Excluindo...' : 'Excluir vídeo'}</button>
      </div>
    </div>
  </dialog>
}
