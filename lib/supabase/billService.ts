import type { AdminBill } from '@/mock/bills'

export async function getBillFromSupabase(id: string): Promise<AdminBill | null> {
  // TODO: connect to Supabase
  return Promise.resolve(null)
}

export async function getBillsFromSupabase(): Promise<AdminBill[]> {
  // TODO: connect to Supabase
  return Promise.resolve([])
}

export async function saveBillToSupabase(_bill: AdminBill): Promise<void> {
  // TODO: connect to Supabase
  return Promise.resolve()
}
