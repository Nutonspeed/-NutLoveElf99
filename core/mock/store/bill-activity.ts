import data from '@/mock/store/bill-activity.json'
import { loadFromStorage, saveToStorage } from './persist'

export interface BillActivity {
  id: string
  billId: string
  action: string
  note?: string
  timestamp: string
}

const KEY = 'mockStore_bill_activity'
let activities: BillActivity[] = loadFromStorage<BillActivity[]>(KEY, data as BillActivity[])

function persist() {
  saveToStorage(KEY, activities)
}

export function getBillActivity(id: string) {
  return activities.filter(a => a.billId === id)
}

export function addBillActivity(entry: Omit<BillActivity, 'id' | 'timestamp'> & { timestamp?: string }) {
  const act: BillActivity = {
    id: Date.now().toString(),
    timestamp: entry.timestamp || new Date().toISOString(),
    ...entry,
  }
  activities.unshift(act)
  persist()
  return act
}
