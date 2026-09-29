import { Logo } from '../components/Logo'
import { StatusCard } from '../components/StatusCard'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <Logo />

      <main className="mt-14 flex flex-1 flex-col justify-center sm:mt-20">
        <h1 className="font-display text-4xl leading-[1.15] text-ink sm:text-5xl">
          Seu conteúdo.
          <br />
          Suas redes.
          <br />
          Seu horário.
        </h1>

        <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-ink-soft">
          Um só lugar para organizar, agendar e acompanhar tudo o que você
          publica — antes de sair do rascunho para o feed.
        </p>

        <div className="mt-10">
          <StatusCard
            milestone="Autenticação preparada"
            detail="entre ou crie uma conta para acessar sua área."
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-flow-dim">
          <Link className="underline" to="/login">Entrar</Link>
          <Link className="underline" to="/signup">Criar conta</Link>
          <Link className="underline" to="/dashboard">Dashboard</Link>
        </div>
      </main>

      <footer className="mt-10 border-t border-line pt-5">
        <p className="text-xs leading-relaxed text-ink-soft">
          Instagram, Facebook, YouTube e TikTok chegam em marcos futuros.
        </p>
      </footer>
    </>
  )
}
