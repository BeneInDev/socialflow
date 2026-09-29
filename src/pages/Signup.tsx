import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthFormLayout } from '../components/AuthFormLayout'
import { getSupabase } from '../lib/supabase'

export function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const { data, error } = await getSupabase().auth.signUp({
        email, password, options: { data: { full_name: fullName.trim() } },
      })
      if (error) throw error
      if (data.session) navigate('/dashboard', { replace: true })
      else setMessage('Cadastro enviado. Verifique seu email para confirmar a conta, se a confirmação estiver ativada.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível criar a conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return <AuthFormLayout title="Criar conta">
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">Nome<input className="rounded-lg border border-line bg-paper-raised p-3" autoComplete="name" required value={fullName} onChange={event => setFullName(event.target.value)} /></label>
      <label className="flex flex-col gap-1 text-sm">Email<input className="rounded-lg border border-line bg-paper-raised p-3" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label>
      <label className="flex flex-col gap-1 text-sm">Senha<input className="rounded-lg border border-line bg-paper-raised p-3" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={event => setPassword(event.target.value)} /></label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="text-sm text-flow-dim">{message}</p>}
      <button className="rounded-lg bg-flow p-3 font-medium text-white disabled:opacity-50" disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</button>
    </form>
    <p className="mt-5 text-sm">Já tem conta? <Link className="text-flow-dim underline" to="/login">Entrar</Link></p>
  </AuthFormLayout>
}
