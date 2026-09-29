import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GuestOnly, RequireAuth } from './components/AuthRoutes'
import { AuthProvider } from './hooks/AuthProvider'
import { AppShell } from './layouts/AppShell'
import { MainLayout } from './layouts/MainLayout'
import { supabaseConfigError } from './lib/supabase'
import { Dashboard } from './pages/Dashboard'
import { ForgotPassword } from './pages/ForgotPassword'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { Login } from './pages/Login'
import { ResetPassword } from './pages/ResetPassword'
import { Signup } from './pages/Signup'

function App() {
  if (supabaseConfigError) {
    return <MainLayout><main role="alert" className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6"><h1 className="font-display text-3xl font-extrabold">Configuração pendente</h1><p className="mt-4 text-text-secondary">{supabaseConfigError}</p></main></MainLayout>
  }
  return <BrowserRouter>
    <AuthProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<GuestOnly />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/library" element={<Library />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </AuthProvider>
  </BrowserRouter>
}

export default App
