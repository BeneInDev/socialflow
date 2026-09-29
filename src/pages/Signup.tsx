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

  return <AuthFormLayout title="Crie sua conta">
    <form onSubmit={submit} className="flex flex-col gap-5">
      <label className="sf-label">Nome<input className="sf-input" autoComplete="name" placeholder="Como podemos chamar você?" required value={fullName} onChange={event => setFullName(event.target.value)} /></label>
      <label className="sf-label">Email<input className="sf-input" type="email" autoComplete="email" placeholder="seu@email.com" required value={email} onChange={event => setEmail(event.target.value)} /></label>
      <label className="sf-label">Senha<input className="sf-input" type="password" autoComplete="new-password" minLength={6} placeholder="Crie uma senha" required value={password} onChange={event => setPassword(event.target.value)} /></label>
      {error && <p role="alert" className="sf-alert-error">{error}</p>}
      {message && <p role="status" className="sf-alert-success">{message}</p>}
      <button className="sf-button w-full" disabled={loading}>{loading ? 'Criando...' : 'Criar minha conta'}</button>
    </form>
    <p className="mt-7 text-center text-sm text-text-secondary">Já tem conta? <Link className="sf-link font-bold" to="/login">Entrar</Link></p>
  </AuthFormLayout>
}
