import { create } from 'zustand'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import type { AdminBill } from '@/mock/bills'
import { getBillById, updateProductionStatus } from '@/core/mock/fakeBillDB'

type Bill = FakeBill | AdminBill

interface BillState {
  bill: Bill | null
  setBill: (bill: Bill) => void
  updateStatus: (status: string) => void
  updateProduction: (step: string) => void
  fetch: (id: string) => Promise<void>
}

export const useBillStore = create<BillState>((set, get) => ({
  bill: null,
  setBill: (bill) => set({ bill }),
  updateStatus: (status) =>
    set(state => (state.bill ? { bill: { ...state.bill, status } } : state)),
  updateProduction: (step) => {
    const { bill } = get()
    if (!bill) return
    updateProductionStatus(bill.id, step)
    set({ bill: { ...bill, productionStatus: step } })
  },
  async fetch(id) {
    const bill = await getBillById(id)
    if (bill) set({ bill })
  },
}))
