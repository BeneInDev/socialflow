import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

const available = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/library', label: 'Biblioteca', icon: 'library' },
] as const

const upcoming = [
  { label: 'Criar conteúdo', icon: 'spark' },
  { label: 'Calendário', icon: 'calendar' },
  { label: 'Analytics', icon: 'analytics' },
  { label: 'Configurações', icon: 'settings' },
] as const

export function AppShell() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const email = session?.user.email ?? ''
  const avatar = email.charAt(0).toUpperCase() || 'S'

  async function logout() {
    setLogoutError('')
    setLoggingOut(true)
    try {
      const { error } = await getSupabase().auth.signOut()
      if (error) throw error
      navigate('/login', { replace: true })
    } catch (cause) {
      setLogoutError(cause instanceof Error ? cause.message : 'Não foi possível sair. Tente novamente.')
    } finally {
      setLoggingOut(false)
    }
  }

  return <div className="min-h-dvh bg-background lg:flex">
    {menuOpen && <button className="fixed inset-0 z-30 bg-black/70 lg:hidden" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-[#0c1629] px-4 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Navegação principal">
      <div className="flex items-center justify-between px-3">
        <Logo />
        <button type="button" className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover lg:hidden" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button>
      </div>
      <p className="mb-3 mt-12 px-3 text-[11px] font-extrabold uppercase tracking-[.17em] text-text-secondary">Workspace</p>
      <nav className="flex flex-col gap-1.5">
        {available.map(item => <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-colors duration-200 ${isActive ? 'bg-primary/15 text-[#8fc3ff]' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}`}><Icon name={item.icon} />{item.label}</NavLink>)}
        <div className="my-4 border-t border-border" />
        {upcoming.map(item => <div key={item.label} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-text-secondary/65" aria-label={`${item.label}, em breve`}><Icon name={item.icon} /><span className="flex-1">{item.label}</span><span className="rounded-md border border-border px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide">Em breve</span></div>)}
      </nav>
      <div className="mt-auto border-t border-border pt-5">
        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-surface px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-accent">{avatar}</div>
          <div className="min-w-0"><p className="text-xs font-bold text-text-primary">Minha conta</p><p className="truncate text-xs text-text-secondary" title={email}>{email}</p></div>
        </div>
        {logoutError && <p role="alert" className="sf-alert-error mt-3">{logoutError}</p>}
        <button type="button" onClick={logout} disabled={loggingOut} className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-text-secondary transition-colors duration-200 hover:bg-surface-hover hover:text-text-primary disabled:opacity-50"><Icon name="logout" />{loggingOut ? 'Saindo...' : 'Sair da conta'}</button>
      </div>
    </aside>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur-lg sm:px-8 lg:h-20 lg:px-10">
        <button type="button" className="rounded-lg p-2 text-text-primary hover:bg-surface-hover lg:hidden" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
        <span className="hidden text-xs font-bold uppercase tracking-[.16em] text-text-secondary lg:block">Seu espaço de criação</span>
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-text-secondary"><span className="h-1.5 w-1.5 rounded-full bg-success" />Workspace pessoal</div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><Outlet /></div>
    </div>
  </div>
}
