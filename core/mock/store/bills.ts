import type { AdminBill } from '@/mock/bills'
import {
  mockBills as seedBills,
  addBill as baseAdd,
  updateBillStatus as baseUpdateStatus,
  updateBill as baseUpdate,
  getBill as baseGet,
} from '@/mock/bills'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_bills'
let bills: AdminBill[] = loadFromStorage<AdminBill[]>(KEY, [...seedBills])

function persist() {
  saveToStorage(KEY, bills)
}

export function getBills() {
  return bills
}

export function getBill(id: string) {
  return baseGet(id)
}

export function addBill(data: Omit<AdminBill, 'id' | 'status' | 'createdAt'>) {
  const bill = baseAdd(data)
  bills = [...seedBills]
  persist()
  return bill
}

export function updateBill(id: string, data: Partial<Omit<AdminBill,'id'|'createdAt'>>) {
  baseUpdate(id, data)
  bills = [...seedBills]
  persist()
}

export function updateBillStatus(id: string, status: AdminBill['status']) {
  baseUpdateStatus(id, status)
  bills = [...seedBills]
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
