"use client"

import { useMemo } from "react"
import { getBills, getCustomers } from "@/core/mock/store"
import type { Customer } from "@/types/customer"

export interface CustomerGroup {
  customer: Customer
  totalBills: number
  tags: { tag: string; count: number }[]
}

export function useCustomerGroups() {
  const bills = getBills()
  const customers = getCustomers()

  const groups = useMemo(() => {
    const map = new Map<string, { customer: Customer; total: number; tags: Record<string, number> }>()

    bills.forEach(bill => {
      const name = bill.customer
      let entry = map.get(name)
      if (!entry) {
        const customer = customers.find(c => c.name === name) || {
          id: name,
          name,
          email: "",
          createdAt: "",
        }
        entry = { customer, total: 0, tags: {} }
        map.set(name, entry)
      }
      entry.total += 1
      bill.tags.forEach(tag => {
        entry!.tags[tag] = (entry!.tags[tag] || 0) + 1
      })
    })

    return Array.from(map.values()).map(v => ({
      customer: v.customer,
      totalBills: v.total,
      tags: Object.entries(v.tags)
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => ({ tag, count })),
    }))
  }, [bills, customers])

  const topTags = useMemo(() => {
    const counts: Record<string, number> = {}
    bills.forEach(b => b.tags.forEach(t => {
      counts[t] = (counts[t] || 0) + 1
    }))
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag)
  }, [bills])

  return { groups, topTags }
}
