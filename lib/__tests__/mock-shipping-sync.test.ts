import { describe, it, expect, beforeEach } from 'vitest'
import { syncShippingStatus, shippingSyncLogs } from '../mock-shipping-sync'
import { regenerateMockOrders } from '../mock-orders'

describe('shipping sync', () => {
  beforeEach(() => {
    shippingSyncLogs.length = 0
    regenerateMockOrders()
  })

  it('adds a log entry after sync', async () => {
    await syncShippingStatus()
    expect(shippingSyncLogs.length).toBe(1)
  })
})
