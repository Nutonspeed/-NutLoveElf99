import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCustomerSelector } from '../useCustomerSelector'
import { resetStore, generateMockData } from '@/core/mock/store'

describe('useCustomerSelector', () => {
  beforeEach(() => {
    resetStore()
    generateMockData()
    localStorage.clear()
  })

  it('filters customers by name', async () => {
    const { result } = renderHook(() => useCustomerSelector('Jane'))
    await waitFor(() => {
      expect(result.current.customerList.length).toBeGreaterThan(0)
    })
    expect(result.current.customerList.some(c => c.name.includes('Jane'))).toBe(true)
  })
})
