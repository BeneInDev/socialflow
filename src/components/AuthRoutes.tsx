import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function SessionLoading() {
  return <div className="flex min-h-dvh items-center justify-center px-6"><p role="status" className="flex items-center gap-3 text-sm text-text-secondary"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />Verificando sessão...</p></div>
}

export function RequireAuth() {
  const { session, loading } = useAuth()
  const location = useLocation()
  if (loading) return <SessionLoading />
  return session ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

export function GuestOnly() {
  const { session, loading } = useAuth()
  if (loading) return <SessionLoading />
  return session ? <Navigate to="/dashboard" replace /> : <Outlet />
}
