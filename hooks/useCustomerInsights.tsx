import { useMemo } from 'react'
import { mockBills, type AdminBill } from '@/mock/bills'

export interface CustomerInsights {
  billCount: number
  lastPurchase?: string
  commonTags: string[]
  commonStatus?: AdminBill['status']
}

const cache = new Map<string, CustomerInsights>()

export function useCustomerInsights(name: string): CustomerInsights {
  return useMemo(() => {
    if (cache.has(name)) return cache.get(name)!
    const bills = mockBills.filter(b => b.customer === name)
    const billCount = bills.length
    let lastPurchase: string | undefined
    const tagCount: Record<string, number> = {}
    const statusCount: Record<AdminBill['status'], number> = {
      unpaid: 0,
      paid: 0,
      pending: 0,
      shipped: 0,
      cancelled: 0,
    }
    for (const b of bills) {
      if (!lastPurchase || new Date(b.createdAt) > new Date(lastPurchase)) {
        lastPurchase = b.createdAt
      }
      for (const t of b.tags) {
        tagCount[t] = (tagCount[t] || 0) + 1
      }
      statusCount[b.status] = (statusCount[b.status] || 0) + 1
    }
    const commonTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([t]) => t)
    const commonStatus = (Object.entries(statusCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] as AdminBill['status']) || undefined
    const insight = { billCount, lastPurchase, commonTags, commonStatus }
    cache.set(name, insight)
    return insight
  }, [name])
}
