import { describe, it, expect, beforeEach } from 'vitest'
import { GET, POST } from '@/app/api/mock/orders/route'
import { resetOrders } from '@/core/mock/store'
import { mockOrders } from '@/lib/mock-orders'

describe('orders API', () => {
  beforeEach(() => {
    resetOrders()
  })

  it('returns orders list', async () => {
    const res = await GET()
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it('adds order via POST', async () => {
    const res = await POST(new Request('http://test', {
      method: 'POST',
      body: JSON.stringify({ ...(mockOrders[0]), id: 'API-1' }),
    }))
    const out = await res.json()
    expect(out.success).toBe(true)
  })
})
