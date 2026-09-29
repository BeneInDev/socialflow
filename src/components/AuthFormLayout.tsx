import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { Logo } from './Logo'

export function AuthFormLayout({ title, children }: { title: string; children: ReactNode }) {
  return <main className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(380px,48%)]">
    <section className="flex min-h-dvh flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
      <Link to="/" className="self-start" aria-label="Ir para a página inicial"><Logo /></Link>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
        <span className="mb-4 text-xs font-extrabold uppercase tracking-[.2em] text-accent">Sua conta SocialFlow</span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-text-secondary">Tudo para criar e organizar seu conteúdo em um só lugar.</p>
        <div className="mt-8">{children}</div>
      </div>
      <p className="text-xs text-text-secondary">© {new Date().getFullYear()} SocialFlow</p>
    </section>
    <aside className="relative hidden overflow-hidden border-l border-border bg-[#0d1b33] p-12 lg:flex lg:flex-col lg:justify-between" aria-label="Sobre o SocialFlow">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <span className="relative inline-flex self-start items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold text-accent"><Icon name="spark" className="h-4 w-4" /> Crie no seu ritmo</span>
      <div className="relative max-w-lg">
        <div className="mb-9 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-accent"><Icon name="video" className="h-8 w-8" /></div>
        <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">Seu próximo conteúdo começa <span className="text-accent">aqui.</span></h2>
        <p className="mt-6 max-w-md text-base leading-8 text-text-secondary">Uma base simples para transformar ideias em conteúdo. Envie seus vídeos e mantenha tudo em movimento.</p>
        <div className="mt-12 grid grid-cols-3 gap-3" aria-hidden="true">
          <div className="h-24 rounded-2xl border border-primary/25 bg-primary/10" />
          <div className="h-32 -translate-y-4 rounded-2xl border border-accent/30 bg-accent/10" />
          <div className="h-20 translate-y-2 rounded-2xl border border-primary/25 bg-primary/10" />
        </div>
      </div>
      <p className="relative text-xs text-text-secondary">Um espaço seu para criar mais.</p>
    </aside>
  </main>
}
