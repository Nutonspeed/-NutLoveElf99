import { USE_SUPABASE } from '../config'
import type { AdminBill } from '@/mock/bills'

// Public Bill interface for future real database
export type Bill = AdminBill
import { getBill, getBills } from '@/mockDB/bills'
import { getBillFromSupabase, getBillsFromSupabase } from '../supabase/billService'

export async function getBillById(id: string): Promise<AdminBill | null> {
  if (USE_SUPABASE) {
    return getBillFromSupabase(id)
  }
  return Promise.resolve(getBill(id) || null)
}

export async function getAllBills(): Promise<AdminBill[]> {
  if (USE_SUPABASE) {
    return getBillsFromSupabase()
  }
  return Promise.resolve([...getBills()])
}
