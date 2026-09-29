import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { AuthContext } from '../lib/authContext'
import { getSupabase } from '../lib/supabase'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()
    let active = true
    let authEventReceived = false
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        authEventReceived = true
        setSession(nextSession)
        setLoading(false)
      }
    })

    // getSession also restores a locally persisted session after a refresh.
    void supabase.auth.getSession().then(({ data, error }) => {
      if (active && !authEventReceived) {
        if (error) console.error('Não foi possível restaurar a sessão:', error)
        setSession(data.session)
        setLoading(false)
      }
    }).catch((error: unknown) => {
      if (active && !authEventReceived) {
        console.error('Não foi possível restaurar a sessão:', error)
        setLoading(false)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>
}
