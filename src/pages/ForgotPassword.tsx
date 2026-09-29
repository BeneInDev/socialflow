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

  return <AuthFormLayout title="Recuperar senha">
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">Email<input className="rounded-lg border border-line bg-paper-raised p-3" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {sent && <p role="status" className="text-sm text-flow-dim">Se houver uma conta para este email, você receberá instruções para redefinir a senha.</p>}
      <button className="rounded-lg bg-flow p-3 font-medium text-white disabled:opacity-50" disabled={loading || secondsLeft > 0}>{loading ? 'Enviando...' : secondsLeft > 0 ? `Reenviar em ${secondsLeft}s` : sent ? 'Reenviar email' : 'Enviar email'}</button>
    </form>
    <Link className="mt-5 inline-block text-sm text-flow-dim underline" to="/login">Voltar para login</Link>
  </AuthFormLayout>
}
