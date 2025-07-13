export interface SupplyItem {
  id: string
  orderId: string
  item: string
  quantity: number
  eta: string
  received: boolean
}

import { getMockNow } from './mock-date'

export let mockSupply: SupplyItem[] = [
  {
    id: 'SUP-001',
    orderId: 'ORD-001',
    item: 'ผ้า Cotton สีครีม',
    quantity: 20,
    eta: new Date(getMockNow().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    received: false,
  },
  {
    id: 'SUP-002',
    orderId: 'ORD-002',
    item: 'ซิป YKK',
    quantity: 10,
    eta: new Date(getMockNow().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    received: false,
  },
]

export function addSupplyEntry(entry: Omit<SupplyItem, 'id' | 'received'>) {
  const newEntry: SupplyItem = {
    id: `SUP-${Math.random().toString(36).slice(2, 8)}`,
    received: false,
    ...entry,
  }
  mockSupply.push(newEntry)
  return newEntry
}

export function markSupplyReceived(id: string) {
  const s = mockSupply.find((m) => m.id === id)
  if (s) s.received = true
}

export function listSupplyForOrder(orderId: string) {
  return mockSupply.filter((s) => s.orderId === orderId)
}

export function listAllSupply() {
  return mockSupply
}
