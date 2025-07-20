import type { Order } from '@/types/order'

export interface AggregatedResult {
  date: string
  total: number
  count: number
}

export function groupByDay(orders: Order[]): AggregatedResult[] {
  const map = new Map<string, { total: number; count: number }>()
  for (const o of orders) {
    const key = o.createdAt.slice(0, 10)
    const agg = map.get(key) || { total: 0, count: 0 }
    agg.total += o.total
    agg.count += 1
    map.set(key, agg)
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, { total, count }]) => ({ date, total, count }))
}

export function groupByMonth(orders: Order[]): AggregatedResult[] {
  const map = new Map<string, { total: number; count: number }>()
  for (const o of orders) {
    const d = new Date(o.createdAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const agg = map.get(key) || { total: 0, count: 0 }
    agg.total += o.total
    agg.count += 1
    map.set(key, agg)
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, { total, count }]) => ({ date, total, count }))
}
