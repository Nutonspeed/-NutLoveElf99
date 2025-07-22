import data from '@/mock/store/schedule.json'
import { loadFromStorage, saveToStorage } from './persist'
import { addBill } from './bills'
import type { AdminBill } from '@/mock/bills'

export interface BillSchedule {
  id: string
  bill: Omit<AdminBill, 'id' | 'status' | 'createdAt'>
  time: string
  created?: boolean
  billId?: string
}

const KEY = 'mockStore_bill_schedule'
let schedule: BillSchedule[] = loadFromStorage<BillSchedule[]>(KEY, data as BillSchedule[])

function persist() { saveToStorage(KEY, schedule) }

export function getSchedule() { return schedule }

export function addSchedule(entry: Omit<BillSchedule, 'id' | 'created' | 'billId'>) {
  const s: BillSchedule = { id: Date.now().toString(), created: false, ...entry }
  schedule.push(s)
  persist()
  return s
}

export function runBillSchedule() {
  schedule.forEach(s => {
    if (!s.created && new Date(s.time).getTime() <= Date.now()) {
      const b = addBill(s.bill)
      s.created = true
      s.billId = b.id
    }
  })
  persist()
}
