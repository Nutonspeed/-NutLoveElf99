import { describe, it, expect } from 'vitest'
import { getRevenueSummary } from '../lib/revenue'
import { generateMockData, resetStore, getBills } from '../core/mock/store'

resetStore()
generateMockData()

function billTotal(b: ReturnType<typeof getBills>[number]) {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + (b.shipping || 0)
}

describe('getRevenueSummary', () => {
  it('returns totals for paid bills', () => {
    const expected = getBills()
      .filter(b => b.status === 'paid')
      .reduce((s, b) => s + billTotal(b), 0)
    const summary = getRevenueSummary()
    expect(summary.thisYear).toBe(expected)
  })
})
