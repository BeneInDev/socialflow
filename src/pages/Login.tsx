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

  return <AuthFormLayout title="Entrar">
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">Email<input className="rounded-lg border border-line bg-paper-raised p-3" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label>
      <label className="flex flex-col gap-1 text-sm">Senha<input className="rounded-lg border border-line bg-paper-raised p-3" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button className="rounded-lg bg-flow p-3 font-medium text-white disabled:opacity-50" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
    </form>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-flow-dim">
      <Link to="/forgot-password">Esqueci minha senha</Link><Link to="/signup">Criar conta</Link>
    </div>
  </AuthFormLayout>
}
