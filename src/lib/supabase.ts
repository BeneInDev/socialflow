import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY
)?.trim()

export const supabaseConfigError = !url || !key
  ? 'Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no arquivo .env local (ou use VITE_SUPABASE_ANON_KEY para uma chave legada).'
  : null

const client = url && key
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null

export function getSupabase() {
  if (!client) throw new Error(supabaseConfigError ?? 'Supabase indisponível.')
  return client
}
