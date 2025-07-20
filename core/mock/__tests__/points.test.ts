import { describe, it, expect, beforeEach } from 'vitest'
import { updateCustomerPoints, getCustomers, resetCustomers, generateMockData } from '../store'

describe('customer points', () => {
  beforeEach(() => {
    resetCustomers()
    generateMockData()
  })

  it('updates customer points', () => {
    const customer = getCustomers()[0]
    const prev = customer.points || 0
    updateCustomerPoints(customer.id, 10)
    const updated = getCustomers()[0]
    expect(updated.points).toBe(prev + 10)
  })
})
