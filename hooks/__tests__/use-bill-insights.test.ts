import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useBillInsights } from '../useBillInsights'
import { resetBills, regenerateBills } from '@/core/mock/store'

describe('useBillInsights', () => {
  beforeEach(() => {
    resetBills()
    regenerateBills()
    localStorage.clear()
  })

  it('summarizes today bills', () => {
    const { result } = renderHook(() => useBillInsights())
    expect(result.current.todayCount).toBe(1)
    expect(result.current.todayTotal).toBeGreaterThan(0)
    expect(result.current.tags.length).toBeGreaterThan(0)
    expect(result.current.highestBill?.id).toBeDefined()
  })
})
