import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export function Dashboard() {
  const { session } = useAuth()
  const [fullName, setFullName] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session) return
    let active = true
    void getSupabase().from('profiles').select('full_name').eq('id', session.user.id).maybeSingle().then(({ data, error }) => {
      if (active) {
        if (error) setError(`Não foi possível carregar o perfil: ${error.message}`)
        else setFullName(data?.full_name ?? null)
      }
    })
    return () => { active = false }
  }, [session])

  const displayName = fullName?.trim().split(' ')[0] || session?.user.email?.split('@')[0] || 'criador'

  return <main>
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-[.18em] text-accent">Visão geral</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Olá, {displayName} <span aria-hidden="true">✦</span></h1>
        <p className="mt-3 max-w-2xl leading-7 text-text-secondary">Seu espaço para começar, organizar e dar vida às próximas ideias.</p>
      </div>
      <Link className="sf-button" to="/library"><Icon name="upload" /> Adicionar vídeo</Link>
    </div>

    {error && <p role="alert" className="sf-alert-error mt-7">{error}</p>}

    <section className="mt-9 overflow-hidden rounded-card border border-primary/25 bg-gradient-to-br from-[#153664] via-[#122b4a] to-[#0d3843] p-6 shadow-panel sm:p-9">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent"><Icon name="spark" className="h-4 w-4" /> Comece por aqui</span>
        <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Dê o próximo passo no seu conteúdo.</h2>
        <p className="mt-3 max-w-xl leading-7 text-[#c1d4ea]">Envie um vídeo para sua biblioteca privada. Ele fica pronto para as próximas ferramentas do SocialFlow.</p>
        <Link to="/library" className="sf-button mt-6">Enviar meu vídeo <Icon name="arrow" className="h-4 w-4" /></Link>
      </div>
    </section>

    <section className="mt-10" aria-labelledby="spaces-title">
      <div className="mb-5"><h2 id="spaces-title" className="font-display text-xl font-extrabold">Seu workspace</h2><p className="mt-1 text-sm text-text-secondary">Explore o que já está disponível e o que vem a seguir.</p></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link to="/library" className="sf-card sf-card-interactive flex min-h-52 flex-col p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-[#8fc3ff]"><Icon name="library" /></span>
          <h3 className="mt-5 font-bold">Biblioteca de mídia</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">Envie seus vídeos e mantenha seus arquivos em um lugar só.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">Abrir biblioteca <Icon name="arrow" className="h-4 w-4" /></span>
        </Link>
        <div className="sf-card flex min-h-52 flex-col p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent"><Icon name="spark" /></span>
          <h3 className="mt-5 font-bold">Criar conteúdo</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">Ferramentas para transformar ideias em publicações.</p>
          <span className="mt-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Em breve</span>
        </div>
        <div className="sf-card flex min-h-52 flex-col p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-[#8fc3ff]"><Icon name="calendar" /></span>
          <h3 className="mt-5 font-bold">Calendário</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">Planeje seus próximos posts em um só lugar.</p>
          <span className="mt-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Em breve</span>
        </div>
      </div>
    </section>
    <p className="mt-10 text-xs text-text-secondary">Conectado como <span className="break-all text-text-primary">{session?.user.email}</span></p>
  </main>
}
