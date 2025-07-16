import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { supabaseDown, loadSupabaseDown } from './mock-settings'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

loadSupabaseDown()

if (supabaseUrl && supabaseAnonKey && !supabaseDown) {
  client = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = client
