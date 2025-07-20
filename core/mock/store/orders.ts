import type { Order } from '@/types/order'
import {
  mockOrders as seedOrders,
  regenerateMockOrders,
} from '@/core/mock/orders'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_orders'

let orders: Order[] = loadFromStorage<Order[]>(KEY, [...seedOrders])

function persist() {
  saveToStorage(KEY, orders)
}

export function getOrders() {
  return orders
}

export function addOrder(order: Order) {
  orders.push(order)
  persist()
}

export function updateOrder(id: string, data: Partial<Order>) {
  const idx = orders.findIndex(o => o.id === id)
  if (idx !== -1) {
    orders[idx] = { ...orders[idx], ...data }
    persist()
  }
}

export function resetOrders() {
  orders = []
  persist()
}

export function regenerateOrders() {
  regenerateMockOrders()
  orders = [...seedOrders]
  persist()
}
