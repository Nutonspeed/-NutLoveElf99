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
  addCustomerNote: (note: { message: string; createdAt: string; from: string }) => void
  fetch: (id: string) => Promise<void>
}

export const useBillStore = create<BillState>((set, get) => ({
  bill: null,
  setBill: (bill) => set({ bill }),
  updateStatus: (status) =>
    set(state => (state.bill ? { bill: { ...state.bill, status } } : state)),
  updateProduction: (step, note) => {
    const { bill } = get()
    if (!bill) return
    updateProductionStatus(bill.id, step, note)
    set({
      bill: {
        ...bill,
        productionStatus: step,
        productionTimeline: [
          ...(bill.productionTimeline || []),
          {
            status: step,
            timestamp: new Date().toISOString(),
            by: 'admin',
            note,
          },
        ],
      },
    })
  },
  addCustomerNote: (note) =>
    set((state) =>
      state.bill
        ? {
            bill: {
              ...state.bill,
              customerNotes: [...(state.bill.customerNotes || []), note],
            },
          }
        : state,
    ),
  async fetch(id) {
    const bill = await getBillById(id)
    if (bill) set({ bill })
  },
}))
