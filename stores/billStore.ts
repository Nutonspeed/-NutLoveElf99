import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BillStatus = 'draft' | 'paid' | 'overdue'

export interface BillRecord {
  id: string
  customerId?: string
  customer: string
  items: string
  amount: number
  status: BillStatus
}

interface BillState {
  bills: BillRecord[]
  addBill: (bill: BillRecord) => void
  updateBill: (id: string, data: Partial<BillRecord>) => void
}

export const useBillStore = create<BillState>()(
  persist(
    (set, get) => ({
      bills: [],
      addBill: (bill) => set({ bills: [...get().bills, bill] }),
      updateBill: (id, data) =>
        set({
          bills: get().bills.map((b) =>
            b.id === id ? { ...b, ...data } : b,
          ),
        }),
    }),
    { name: 'bills-v1' },
  ),
)
