import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthFormLayout } from '../components/AuthFormLayout'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export function ResetPassword() {
  const { session, loading: sessionLoading } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await getSupabase().auth.updateUser({ password })
      if (error) throw error
      setDone(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível alterar a senha. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return <AuthFormLayout title="Definir nova senha">
    {sessionLoading ? <p role="status">Verificando link...</p> : !session ? <p>Link inválido ou expirado. <Link className="text-flow-dim underline" to="/forgot-password">Solicite outro link.</Link></p> : done ? <p role="status">Senha atualizada. <Link className="text-flow-dim underline" to="/dashboard">Ir para o dashboard.</Link></p> :
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">Nova senha<input className="rounded-lg border border-line bg-paper-raised p-3" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={event => setPassword(event.target.value)} /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className="rounded-lg bg-flow p-3 font-medium text-white disabled:opacity-50" disabled={loading}>{loading ? 'Salvando...' : 'Salvar senha'}</button>
      </form>}
  </AuthFormLayout>
}
