import type { Order } from '@/types/order'
import {
  mockOrders as seedOrders,
  regenerateMockOrders,
} from '@/lib/mock-orders'
import { loadFromStorage, saveToStorage } from './persist'
import fs from 'fs'
import path from 'path'

const KEY = 'mockStore_orders'

let orders: Order[] = loadFromStorage<Order[]>(KEY, [...seedOrders])

function persist() {
  saveToStorage(KEY, orders)
  if (typeof window === 'undefined') {
    try {
      const file = path.join(process.cwd(), 'mock/orders.json')
      fs.writeFileSync(file, JSON.stringify(orders, null, 2))
    } catch {}
  }
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
