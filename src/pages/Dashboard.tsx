import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { getSupabase } from '../lib/supabase'

export function Dashboard() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (!session) return
    let active = true
    void getSupabase().from('profiles').select('full_name').eq('id', session.user.id).maybeSingle().then(({ data, error }) => {
      if (active) {
        if (error) setError(`Não foi possível carregar o perfil: ${error.message}`)
        else setFullName(data?.full_name ?? null)
      }
    })
    return () => { active = false }
  }, [session])

  async function logout() {
    setError('')
    setLoggingOut(true)
    try {
      const { error } = await getSupabase().auth.signOut()
      if (error) throw error
      navigate('/login', { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível sair. Tente novamente.')
    } finally {
      setLoggingOut(false)
    }
  }

  return <main className="flex flex-1 flex-col">
    <Logo />
    <div className="mt-14">
      <h1 className="font-display text-4xl text-ink">Dashboard</h1>
      <p className="mt-5 text-ink-soft">Sua sessão está ativa.</p>
      {fullName && <p className="mt-3">Nome: {fullName}</p>}
      <p className="mt-3 break-all">Email: {session?.user.email}</p>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      <button className="mt-8 rounded-lg bg-flow px-5 py-3 font-medium text-white disabled:opacity-50" onClick={logout} disabled={loggingOut}>{loggingOut ? 'Saindo...' : 'Sair'}</button>
    </div>
  </main>
}
