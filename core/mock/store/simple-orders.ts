import type { SimpleOrder } from '@/mock/orders'
import { orders as seedOrders } from '@/mock/orders'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_simpleOrders'
let orders: SimpleOrder[] = loadFromStorage<SimpleOrder[]>(KEY, [...seedOrders])

function persist() { saveToStorage(KEY, orders) }

export function getSimpleOrders() { return orders }

export function addSimpleOrder(order: SimpleOrder) {
  orders.unshift(order)
  seedOrders.unshift(order)
  persist()
}

export function updateSimpleOrder(id: string, data: Partial<SimpleOrder>) {
  const idx = orders.findIndex(o => o.id === id)
  if (idx !== -1) {
    orders[idx] = { ...orders[idx], ...data }
    seedOrders[idx] = orders[idx]
    persist()
  }
}

export function resetSimpleOrders() {
  orders = []
  persist()
}

export function regenerateSimpleOrders() {
  orders = [...seedOrders]
  persist()
}
