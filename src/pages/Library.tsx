import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Icon } from '../components/Icon'
import { validateVideoFile, videoAccept } from '../lib/mediaValidation'
import { uploadVideo } from '../services/media'

function formatFileSize(bytes: number): string {
  const size = bytes >= 1024 * 1024 ? bytes / (1024 * 1024) : bytes / 1024
  const unit = bytes >= 1024 * 1024 ? 'MB' : 'KB'
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(size)} ${unit}`
}

export function Library() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const validationError = file ? validateVideoFile(file) : null

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null)
    setError('')
    setSuccess('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file || uploading || validationError) return
    setUploading(true)
    setError('')
    setSuccess('')
    try {
      await uploadVideo(file)
      setSuccess('Vídeo enviado com sucesso.')
      setFile(null)
      if (inputRef.current) inputRef.current.value = ''
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível enviar o vídeo.')
    } finally {
      setUploading(false)
    }
  }

  return <main>
    <span className="text-xs font-extrabold uppercase tracking-[.18em] text-accent">Seu espaço</span>
    <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Biblioteca de mídia</h1>
    <p className="mt-3 max-w-2xl leading-7 text-text-secondary">Um lugar para reunir seus vídeos. Comece enviando o primeiro arquivo.</p>

    <div className="mt-9 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(250px,1fr)]">
      <section className="sf-card p-5 sm:p-8" aria-labelledby="upload-title">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-[#8fc3ff]"><Icon name="upload" /></span>
          <div><h2 id="upload-title" className="font-bold">Enviar vídeo</h2><p className="text-xs text-text-secondary">O arquivo será salvo na sua biblioteca privada.</p></div>
        </div>
        <form onSubmit={submit}>
          <input ref={inputRef} id="video-file" className="peer sr-only" type="file" accept={videoAccept} onChange={selectFile} disabled={uploading} aria-describedby="video-help" />
          <label htmlFor="video-file" className={`flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-[#0b1629] px-5 py-10 text-center transition-colors duration-200 peer-focus-visible:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/30 ${uploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-primary hover:bg-surface-hover'}`}>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-[#8fc3ff]"><Icon name="video" className="h-8 w-8" /></span>
            <span className="mt-5 text-base font-extrabold text-text-primary">{file ? 'Trocar vídeo' : 'Selecione um vídeo'}</span>
            <span id="video-help" className="mt-2 text-sm text-text-secondary">MP4, WebM ou QuickTime</span>
            <span className="mt-4 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-bold text-text-primary">Procurar arquivo</span>
          </label>

          {file && <div className="mt-5 flex min-w-0 items-center gap-3 rounded-xl border border-border bg-[#0b1629] p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"><Icon name="video" /></span>
            <div className="min-w-0"><p className="truncate text-sm font-bold" title={file.name}>{file.name}</p><p className="mt-1 text-xs text-text-secondary">{formatFileSize(file.size)}</p></div>
          </div>}
          {validationError && <p role="alert" className="sf-alert-error mt-4">{validationError}</p>}
          {uploading && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-text-secondary"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Enviando vídeo e salvando o registro...</p>}
          {error && <p role="alert" className="sf-alert-error mt-4">{error}</p>}
          {success && <p role="status" className="sf-alert-success mt-4"><Icon name="check" className="mr-2 inline h-4 w-4" />{success}</p>}
          <button className="sf-button mt-6 w-full sm:w-auto" type="submit" disabled={!file || !!validationError || uploading}><Icon name="upload" />{uploading ? 'Enviando...' : 'Enviar vídeo'}</button>
        </form>
      </section>

      <aside className="sf-card h-fit p-6 sm:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent"><Icon name="lock" /></span>
        <h2 className="mt-5 font-bold">Seu conteúdo, seu espaço</h2>
        <p className="mt-3 text-sm leading-7 text-text-secondary">Seus vídeos ficam em armazenamento privado, vinculados à sua conta.</p>
        <div className="mt-6 border-t border-border pt-5">
          <span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-text-secondary">Em breve</span>
          <p className="mt-3 text-sm leading-7 text-text-secondary">Visualização, organização e novas ferramentas para seus vídeos estão a caminho.</p>
        </div>
      </aside>
    </div>
  </main>
}
