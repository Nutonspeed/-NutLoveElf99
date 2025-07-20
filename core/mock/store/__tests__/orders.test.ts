import { describe, it, expect, beforeEach } from 'vitest'
import { getOrders, addOrder, resetOrders } from '@/core/mock/store'
import { mockOrders } from '@/lib/mock-orders'

describe('orders store', () => {
  beforeEach(() => {
    resetOrders()
    localStorage.clear()
  })

  it('adds order to store', () => {
    const initial = getOrders().length
    addOrder({ ...(mockOrders[0]), id: 'NEW-1' } as any)
    expect(getOrders().length).toBe(initial + 1)
  })
})
