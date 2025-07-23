import type { AdminBill, BillItem } from '@/mock/bills'
import {
  mockBills as seedBills,
  addBill as baseAdd,
  updateBill as baseUpdate,
  updateBillStatus as baseStatus,
  updateProductionStatus as baseProdStatus,
  updatePaymentStatus as basePayStatus,
  archiveBill as baseArchive,
  restoreBill as baseRestore,
  getArchivedBills as baseGetArchived,
} from '@/mock/bills'
import { loadFromStorage, saveToStorage } from './persist'
import { autoArchive } from '@/lib/mock-settings'

const KEY = 'mockStore_bills'

let bills: AdminBill[] = loadFromStorage<AdminBill[]>(KEY, [...seedBills])

function persist() {
  saveToStorage(KEY, bills)
}

export function getBills() {
  return bills
}

export function getBill(id: string) {
  return bills.find((b) => b.id === id)
}

export function getArchivedBills() {
  return bills.filter((b) => b.archived)
}

export function addBill(
  data: Omit<AdminBill, 'id' | 'status' | 'paymentStatus' | 'createdAt'>,
) {
  const bill = baseAdd(data)
  bills = [...seedBills]
  persist()
  return bill
}

export function updateBill(id: string, data: Partial<Omit<AdminBill, 'id' | 'createdAt'>>) {
  baseUpdate(id, data)
  bills = [...seedBills]
  persist()
}

export function updateBillStatus(id: string, status: AdminBill['status']) {
  baseStatus(id, status)
  bills = [...seedBills]
  persist()
}

export function updateProductionStatus(
  id: string,
  status: NonNullable<AdminBill['productionStatus']>,
) {
  baseProdStatus(id, status)
  bills = [...seedBills]
  persist()
}

export function updatePaymentStatus(
  id: string,
  status: AdminBill['paymentStatus'],
) {
  basePayStatus(id, status)
  bills = [...seedBills]
  persist()
}

export function archiveBill(id: string) {
  baseArchive(id)
  bills = [...seedBills]
  persist()
}

export function deleteBill(id: string) {
  const idx = bills.findIndex((b) => b.id === id)
  if (idx !== -1) {
    bills.splice(idx, 1)
    persist()
  }
}

export function restoreBill(id: string) {
  baseRestore(id)
  bills = [...seedBills]
  persist()
}

export function autoArchiveBills(days = 14) {
  if (!autoArchive) return
  const cutoff = Date.now() - days * 86400000
  bills.forEach((b) => {
    if (!b.archived && b.status === 'unpaid' && new Date(b.createdAt).getTime() < cutoff) {
      b.archived = true
    }
  })
  persist()
}

export function resetBills() {
  bills = []
  persist()
}

export function regenerateBills() {
  bills = [...seedBills]
  persist()
}

export function setBillFeedback(id: string, feedback: AdminBill['feedback']) {
  const idx = bills.findIndex(b => b.id === id)
  if (idx !== -1) {
    bills[idx] = { ...bills[idx], feedback }
    persist()
  }
}

export function recordShare(id: string, user: string) {
  const idx = bills.findIndex(b => b.id === id)
  if (idx !== -1) {
    bills[idx] = { ...bills[idx], sharedAt: new Date().toISOString(), sharedBy: user }
    persist()
  }
}
