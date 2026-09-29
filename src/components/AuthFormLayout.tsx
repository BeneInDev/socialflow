import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function AuthFormLayout({ title, children }: { title: string; children: ReactNode }) {
  return <main className="flex flex-1 flex-col justify-center">
    <Link to="/" className="mb-10 self-start" aria-label="Ir para a página inicial"><Logo /></Link>
    <h1 className="font-display text-3xl text-ink">{title}</h1>
    <div className="mt-6">{children}</div>
  </main>
}
