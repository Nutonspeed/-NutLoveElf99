import { create } from 'zustand'
import type { AdminBill } from '@/mock/bills'
import {
  getBills,
  getArchivedBills,
  addBill as add,
  updateBill as update,
  updateBillStatus as setStatus,
  setBillFeedback as setFb,
  archiveBill as archive,
  restoreBill as restore,
  deleteBill,
  autoArchiveBills,
} from '@/core/mock/store'

interface BillStore {
  bills: AdminBill[]
  archived: AdminBill[]
  refresh: () => void
  addBill: (data: Omit<AdminBill, 'id' | 'status' | 'createdAt'>) => void
  updateBill: (id: string, data: Partial<Omit<AdminBill, 'id' | 'createdAt'>>) => void
  updateStatus: (id: string, status: AdminBill['status']) => void
  archive: (id: string) => void
  restore: (id: string) => void
  remove: (id: string) => void
  setFeedback: (id: string, fb: AdminBill['feedback']) => void
}

export const useBillStore = create<BillStore>((set) => ({
  bills: getBills(),
  archived: getArchivedBills(),
  refresh: () => {
    autoArchiveBills()
    set({ bills: getBills(), archived: getArchivedBills() })
  },
  addBill: (data) => {
    add(data)
    set({ bills: getBills() })
  },
  updateBill: (id, data) => {
    update(id, data)
    set({ bills: getBills() })
  },
  updateStatus: (id, status) => {
    setStatus(id, status)
    set({ bills: getBills() })
  },
  archive: (id) => {
    archive(id)
    set({ bills: getBills(), archived: getArchivedBills() })
  },
  restore: (id) => {
    restore(id)
    set({ bills: getBills(), archived: getArchivedBills() })
  },
  remove: (id) => {
    deleteBill(id)
    set({ bills: getBills() })
  },
  setFeedback: (id, fb) => {
    setFb(id, fb)
    set({ bills: getBills() })
  },
}))
