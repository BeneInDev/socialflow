import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthFormLayout } from '../components/AuthFormLayout'
import { getSupabase } from '../lib/supabase'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await getSupabase().auth.signInWithPassword({ email, password })
      if (error) throw error
      const from = (location.state as { from?: string } | null)?.from
      navigate(from?.startsWith('/') && !from.startsWith('//') ? from : '/dashboard', { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível entrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return <AuthFormLayout title="Bem-vindo de volta">
    <form onSubmit={submit} className="flex flex-col gap-5">
      <label className="sf-label">Email<input className="sf-input" type="email" autoComplete="email" placeholder="seu@email.com" required value={email} onChange={event => setEmail(event.target.value)} /></label>
      <label className="sf-label">Senha<input className="sf-input" type="password" autoComplete="current-password" placeholder="Sua senha" required value={password} onChange={event => setPassword(event.target.value)} /></label>
      <Link className="sf-link -mt-1 self-end text-sm font-bold" to="/forgot-password">Esqueci minha senha</Link>
      {error && <p role="alert" className="sf-alert-error">{error}</p>}
      <button className="sf-button w-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar na minha conta'}</button>
    </form>
    <p className="mt-7 text-center text-sm text-text-secondary">Ainda não tem conta? <Link className="sf-link font-bold" to="/signup">Criar conta</Link></p>
  </AuthFormLayout>
}
