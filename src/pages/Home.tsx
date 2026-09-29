import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'

export function Home() {
  return <div className="min-h-dvh overflow-hidden">
    <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-7 sm:px-10">
      <Logo />
      <div className="flex w-full flex-wrap items-center gap-3 text-sm sm:w-auto"><Link className="sf-button-secondary" to="/login">Entrar</Link><Link className="sf-button" to="/signup">Criar conta</Link></div>
    </header>
    <main className="relative mx-auto grid min-w-0 grid-cols-[minmax(0,1fr)] max-w-7xl items-center gap-12 px-6 pb-20 pt-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold text-accent"><Icon name="spark" className="h-4 w-4" /> O seu espaço para criar</span>
        <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl xl:text-6xl">Sua criação em <span className="bg-gradient-to-r from-[#77afff] to-accent bg-clip-text text-transparent">movimento.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">Um lugar para guardar seus vídeos e preparar o próximo passo do seu conteúdo. Simples, privado e feito para acompanhar seu ritmo.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link to="/signup" className="sf-button">Começar agora <Icon name="arrow" className="h-4 w-4" /></Link><Link to="/login" className="sf-button-secondary">Já tenho conta</Link></div>
        <p className="mt-6 text-xs text-text-secondary">A biblioteca de vídeos já está disponível. Novas ferramentas chegam em breve.</p>
      </div>
      <div className="relative mx-auto min-w-0 w-full max-w-lg" aria-hidden="true">
        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
        <div className="sf-card relative overflow-hidden p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-border pb-5"><span className="text-sm font-extrabold">Seu workspace</span><span className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-primary" /><i className="h-2 w-2 rounded-full bg-accent" /><i className="h-2 w-2 rounded-full bg-border" /></span></div>
          <div className="mt-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-[#174475] to-[#0d3f4b] p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><Icon name="video" /></div><p className="mt-6 text-lg font-extrabold">Suas ideias merecem espaço.</p><p className="mt-2 text-sm text-[#d1e4f3]">Envie seu primeiro vídeo e comece a construir.</p></div>
          <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl border border-border bg-[#0b1629] p-4"><Icon name="library" className="h-5 w-5 text-accent" /><p className="mt-4 text-sm font-bold">Biblioteca</p><p className="mt-1 text-xs text-text-secondary">Vídeos em um só lugar</p></div><div className="rounded-xl border border-border bg-[#0b1629] p-4"><Icon name="spark" className="h-5 w-5 text-[#8fc3ff]" /><p className="mt-4 text-sm font-bold">Mais recursos</p><p className="mt-1 text-xs text-text-secondary">Em breve</p></div></div>
        </div>
      </div>
    </main>
    <footer className="mx-auto max-w-7xl border-t border-border px-6 py-7 text-xs text-text-secondary sm:px-10">© {new Date().getFullYear()} SocialFlow. Crie no seu ritmo.</footer>
  </div>
}
