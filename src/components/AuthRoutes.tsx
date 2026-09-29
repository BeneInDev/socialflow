import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function RequireAuth() {
  const { session, loading } = useAuth()
  const location = useLocation()
  if (loading) return <p role="status">Verificando sessão...</p>
  return session ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

export function GuestOnly() {
  const { session, loading } = useAuth()
  if (loading) return <p role="status">Verificando sessão...</p>
  return session ? <Navigate to="/dashboard" replace /> : <Outlet />
}
