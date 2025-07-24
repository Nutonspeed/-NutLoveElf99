import { create } from 'zustand'
import type { AdminBill } from '@/mock/bills'
import {
  getBills,
  getArchivedBills,
  addBill as add,
  updateBill as update,
  updateBillStatus as setStatus,
  updateProductionStatus as setProdStatus,
  updatePaymentStatus as setPayStatus,
  setBillFeedback as setFb,
  archiveBill as archive,
  restoreBill as restore,
  deleteBill,
  autoArchiveBills,
} from '@/core/mock/store'
import { recordShare as recordShareInternal } from '@/core/mock/store'

interface BillStore {
  bills: AdminBill[]
  archived: AdminBill[]
  refresh: () => void
  addBill: (
    data: Omit<AdminBill, 'id' | 'status' | 'paymentStatus' | 'createdAt'>,
  ) => void
  updateBill: (id: string, data: Partial<Omit<AdminBill, 'id' | 'createdAt'>>) => void
  updateStatus: (id: string, status: AdminBill['status']) => void
  updateProductionStatus: (
    id: string,
    status: AdminBill['productionStatus'],
    note?: string,
  ) => void
  updatePaymentStatus: (id: string, status: AdminBill['paymentStatus']) => void
  archive: (id: string) => void
  restore: (id: string) => void
  remove: (id: string) => void
  setFeedback: (id: string, fb: AdminBill['feedback']) => void
  recordShare: (id: string, user: string) => void
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
  updateProductionStatus: (id, status, note) => {
    setProdStatus(id, status, note)
    set({ bills: getBills() })
  },
  updatePaymentStatus: (id, status) => {
    setPayStatus(id, status)
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
  recordShare: (id, user) => {
    recordShareInternal(id, user)
    set({ bills: getBills() })
  },
}))
