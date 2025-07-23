import { promises as fs } from 'fs'
import { join } from 'path'

export interface TopProduct {
  name: string
  quantity: number
  count: number
  subtotal: number
  billIds: string[]
}

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfMonth() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function getTopProducts(range: 'day' | 'month' | 'all' = 'all'): Promise<TopProduct[]> {
  const file = join(process.cwd(), 'mock', 'store', 'bills.json')
  const txt = await fs.readFile(file, 'utf8')
  const bills = JSON.parse(txt) as any[]

  const start = range === 'day' ? startOfToday() : range === 'month' ? startOfMonth() : new Date(0)
  const now = new Date()

  const map = new Map<string, TopProduct>()

  for (const b of bills) {
    const created = new Date(b.createdAt)
    if (created < start || created > now) continue

    for (const item of b.items || []) {
      const curr = map.get(item.name) || { name: item.name, quantity: 0, count: 0, subtotal: 0, billIds: [] }
      curr.quantity += item.quantity
      curr.subtotal += item.quantity * item.price
      if (!curr.billIds.includes(b.id)) {
        curr.count += 1
        curr.billIds.push(b.id)
      }
      map.set(item.name, curr)
    }
  }

  return Array.from(map.values()).sort((a, b) => b.subtotal - a.subtotal)
}
