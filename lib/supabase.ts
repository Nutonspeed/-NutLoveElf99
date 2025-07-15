import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

try {
  if (
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'mock-mode' &&
    supabaseAnonKey !== 'mock-mode'
  ) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (err) {
  console.warn('Supabase init failed, falling back to mock mode', err)
  client = null
}

export const supabase = client
