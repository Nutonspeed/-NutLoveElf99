"use client"
import { useMemo } from 'react'
import { useBillStore } from '@/core/store'
import { mockCustomers } from '@/lib/mock-customers'

export interface DailyBillSummary {
  date: string
  amount: number
  count: number
}

export interface TagCount { tag: string; count: number }

export interface BillInsights {
  todayTotal: number
  todayCount: number
  daily: DailyBillSummary[]
  tags: TagCount[]
  newCustomerTags: TagCount[]
  highestBill?: { id: string; total: number }
}

export function useBillInsights(): BillInsights {
  const bills = useBillStore(state => state.bills)

  const todayISO = new Date().toISOString().slice(0, 10)

  const dailyMap = useMemo(() => {
    const map: Record<string, { amount: number; count: number }> = {}
    bills.forEach(b => {
      const day = b.createdAt.slice(0, 10)
      const total = b.items.reduce((s, i) => s + i.price * i.quantity, 0) +
        b.shipping
      if (!map[day]) map[day] = { amount: 0, count: 0 }
      map[day].amount += total
      map[day].count += 1
    })
    return map
  }, [bills])

  const todayTotal = dailyMap[todayISO]?.amount ?? 0
  const todayCount = dailyMap[todayISO]?.count ?? 0

  const tags = useMemo(() => {
    const counts: Record<string, number> = {}
    bills.forEach(b => {
      b.tags.forEach(t => {
        counts[t] = (counts[t] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [bills])

  const newCustomerTags = useMemo(() => {
    const counts: Record<string, number> = {}
    const today = new Date().toDateString()
    mockCustomers
      .filter(c => new Date(c.createdAt).toDateString() === today)
      .forEach(c => {
        c.tags?.forEach(t => {
          counts[t] = (counts[t] || 0) + 1
        })
      })
    return Object.entries(counts).map(([tag, count]) => ({ tag, count }))
  }, [])

  const highestBill = useMemo(() => {
    let max = 0
    let id: string | undefined
    bills.forEach(b => {
      const total = b.items.reduce((s, i) => s + i.price * i.quantity, 0) +
        b.shipping
      if (new Date(b.createdAt).toISOString().slice(0, 10) === todayISO && total > max) {
        max = total
        id = b.id
      }
    })
    return id ? { id, total: max } : undefined
  }, [bills, todayISO])

  const daily: DailyBillSummary[] = useMemo(() => {
    const arr: DailyBillSummary[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      const mapEntry = dailyMap[key]
      arr.push({
        date: d.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
        amount: mapEntry?.amount ?? Math.floor(Math.random() * 5000),
        count: mapEntry?.count ?? 0,
      })
    }
    return arr
  }, [dailyMap])

  return { todayTotal, todayCount, daily, tags, newCustomerTags, highestBill }
}
