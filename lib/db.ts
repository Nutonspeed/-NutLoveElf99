import { config } from "./config"

export function getSafeSupabaseClient() {
  if (!config.useSupabase) throw new Error("Mock mode active")
  // return supabaseClient() // ยังไม่เชื่อมจริง
}
