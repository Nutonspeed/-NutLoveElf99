import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCustomerGroups } from '../useCustomerGroups'
import { resetStore, generateMockData } from '@/core/mock/store'

describe('useCustomerGroups', () => {
  beforeEach(() => {
    resetStore()
    generateMockData()
    localStorage.clear()
  })

  it('returns grouped customers', () => {
    const { result } = renderHook(() => useCustomerGroups())
    expect(result.current.groups.length).toBeGreaterThan(0)
    expect(result.current.topTags.length).toBeGreaterThan(0)
  })
})
