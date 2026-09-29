import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthFormLayout } from '../components/AuthFormLayout'
import { getSupabase } from '../lib/supabase'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [retryAt, setRetryAt] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const secondsLeft = retryAt === null ? 0 : Math.max(0, Math.ceil((retryAt - now) / 1000))

  useEffect(() => {
    if (retryAt === null) return
    const interval = window.setInterval(() => {
      const currentTime = Date.now()
      setNow(currentTime)
      if (currentTime >= retryAt) setRetryAt(null)
    }, 250)
    return () => window.clearInterval(interval)
  }, [retryAt])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading || secondsLeft > 0) return
    setError('')
    setSent(false)
    setLoading(true)
    try {
      const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      const currentTime = Date.now()
      setNow(currentTime)
      setRetryAt(currentTime + 30_000)
      setSent(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível enviar o email. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return <AuthFormLayout title="Recupere sua senha">
    <p className="mb-6 text-sm leading-6 text-text-secondary">Digite seu email para receber um link de recuperação.</p>
    <form onSubmit={submit} className="flex flex-col gap-5">
      <label className="sf-label">Email<input className="sf-input" type="email" autoComplete="email" placeholder="seu@email.com" required value={email} onChange={event => setEmail(event.target.value)} /></label>
      {error && <p role="alert" className="sf-alert-error">{error}</p>}
      {sent && <p role="status" className="sf-alert-success">Se houver uma conta para este email, você receberá instruções para redefinir a senha.</p>}
      <button className="sf-button w-full" disabled={loading || secondsLeft > 0}>{loading ? 'Enviando...' : secondsLeft > 0 ? `Reenviar em ${secondsLeft}s` : sent ? 'Reenviar email' : 'Enviar email'}</button>
    </form>
    <Link className="sf-link mt-7 inline-block text-sm font-bold" to="/login">Voltar para login</Link>
  </AuthFormLayout>
}
