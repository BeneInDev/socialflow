import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthFormLayout } from '../components/AuthFormLayout'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export function ResetPassword() {
  const { session, loading: sessionLoading } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const linkError = new URLSearchParams(window.location.hash.slice(1)).get('error_description')
    ?? new URLSearchParams(window.location.search).get('error_description')

  useEffect(() => {
    if (!done) return
    const timeout = window.setTimeout(() => navigate('/dashboard', { replace: true }), 1500)
    return () => window.clearTimeout(timeout)
  }, [done, navigate])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await getSupabase().auth.updateUser({ password })
      if (error) throw error
      setPassword('')
      setDone(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível alterar a senha. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return <AuthFormLayout title="Definir nova senha">
    {sessionLoading ? <p role="status">Verificando link...</p> : done ? <p role="status">Senha atualizada. Redirecionando para o dashboard...</p> : linkError ? <p role="alert">Link inválido ou expirado: {linkError}. <Link className="text-flow-dim underline" to="/forgot-password">Solicite outro link.</Link></p> : !session ? <p>Link inválido ou expirado. <Link className="text-flow-dim underline" to="/forgot-password">Solicite outro link.</Link></p> :
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">Nova senha<input className="rounded-lg border border-line bg-paper-raised p-3" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={event => setPassword(event.target.value)} /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className="rounded-lg bg-flow p-3 font-medium text-white disabled:opacity-50" disabled={loading}>{loading ? 'Salvando...' : 'Salvar senha'}</button>
      </form>}
  </AuthFormLayout>
}
