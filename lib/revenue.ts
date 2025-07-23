import { getBills } from '@/core/mock/store'
import type { AdminBill } from '@/mock/bills'

function billTotal(b: AdminBill): number {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + (b.shipping || 0)
}

export interface RevenueSummary {
  today: number
  thisMonth: number
  thisYear: number
}

export function getRevenueSummary(): RevenueSummary {
  const bills = getBills().filter(b => b.status === 'paid')
  const now = new Date()
  const todayKey = now.toISOString().slice(0, 10)
  const monthKey = now.toISOString().slice(0, 7)
  const yearKey = String(now.getFullYear())
  return bills.reduce(
    (acc, b) => {
      const d = b.createdAt
      const total = billTotal(b)
      if (d.startsWith(todayKey)) acc.today += total
      if (d.startsWith(monthKey)) acc.thisMonth += total
      if (d.startsWith(yearKey)) acc.thisYear += total
      return acc
    },
    { today: 0, thisMonth: 0, thisYear: 0 } as RevenueSummary,
  )
}

export interface DailyRevenue {
  date: string
  total: number
}

export function getRevenueHistory(start: Date, end: Date): DailyRevenue[] {
  const bills = getBills().filter(b => b.status === 'paid')
  const days: DailyRevenue[] = []
  const cur = new Date(start)
  while (cur <= end) {
    const key = cur.toISOString().slice(0, 10)
    const total = bills
      .filter(b => b.createdAt.slice(0, 10) === key)
      .reduce((s, b) => s + billTotal(b), 0)
    days.push({ date: key, total })
    cur.setDate(cur.getDate() + 1)
  }
  return days
}
