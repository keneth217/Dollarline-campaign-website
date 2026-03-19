import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const hasConfig = Boolean(supabaseUrl && supabaseAnonKey)

if (!hasConfig) {
  console.warn(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and add your Supabase credentials to enable auth.'
  )
}

export const supabase: SupabaseClient | null = hasConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null
