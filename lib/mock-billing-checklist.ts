export interface BillingChecklistItem {
  id: string
  label: string
  description: string
  done: boolean
}

const STORAGE_KEY = 'billingChecklist'
const READY_KEY = 'billingReadyTime'

export let billingChecklist: BillingChecklistItem[] = [
  {
    id: 'templates',
    label: 'Templates configured',
    description: 'Email/SMS templates set up',
    done: false,
  },
  {
    id: 'notifications',
    label: 'Notification settings',
    description: 'Bill notifications enabled',
    done: false,
  },
  {
    id: 'backup',
    label: 'Backup completed',
    description: 'System config exported',
    done: false,
  },
  {
    id: 'permissions',
    label: 'Permissions reviewed',
    description: 'Admin roles verified',
    done: false,
  },
]

export function loadBillingChecklist() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const obj = JSON.parse(stored) as Record<string, boolean>
      billingChecklist = billingChecklist.map((c) => ({
        ...c,
        done: obj[c.id] ?? c.done,
      }))
    }
  }
}

function saveBillingChecklist() {
  if (typeof window !== 'undefined') {
    const obj: Record<string, boolean> = {}
    billingChecklist.forEach((c) => {
      obj[c.id] = c.done
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  }
}

export function setBillingChecklistItem(id: string, val: boolean) {
  const item = billingChecklist.find((c) => c.id === id)
  if (item) {
    item.done = val
    saveBillingChecklist()
  }
}

export function allBillingReady(): boolean {
  return billingChecklist.every((c) => c.done)
}

export function getReadyTimestamp(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(READY_KEY)
  }
  return null
}

export function setReadyTimestamp() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(READY_KEY, new Date().toISOString())
  }
}

import { addBill } from '@/mock/bills'

export function generateMockBills(count = 3) {
  for (let i = 0; i < count; i++) {
    addBill({
      customer: `Test Customer ${i + 1}`,
      items: [{ name: 'Service Fee', quantity: 1, price: 100 }],
      shipping: 0,
      note: 'mock',
    })
  }
}
