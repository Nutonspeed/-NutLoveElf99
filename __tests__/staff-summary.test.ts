import { describe, it, expect } from 'vitest'
import { summarizeByStaff, billTotal } from '../lib/report'

const bills = [
  { items: [{ quantity: 1, price: 100 }], shipping: 0, status: 'paid', createdAt: '2024-01-01', createdBy: 'A' },
  { items: [{ quantity: 2, price: 50 }], shipping: 0, status: 'unpaid', createdAt: '2024-01-01', createdBy: 'B' },
  { items: [{ quantity: 1, price: 200 }], shipping: 0, status: 'paid', createdAt: '2024-01-02', createdBy: 'A' },
] as any

describe('summarizeByStaff', () => {
  const summary = summarizeByStaff(bills)
  it('groups counts', () => {
    const a = summary.find(s => s.staff === 'A')!
    expect(a.count).toBe(2)
    expect(a.paid).toBe(2)
  })
  it('calculates totals', () => {
    const total = bills.filter(b => b.createdBy === 'A').reduce((s, b) => s + billTotal(b), 0)
    const a = summary.find(s => s.staff === 'A')!
    expect(a.total).toBe(total)
  })
})
