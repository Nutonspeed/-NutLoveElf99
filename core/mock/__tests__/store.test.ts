import { describe, it, expect, beforeEach } from 'vitest'
import { getOrders, addOrder, resetOrders } from '../store'
import type { Order } from '@/types/order'

const sample: Order = {
  id: 'T-1',
  customerId: 'c',
  customerName: 'test',
  customerEmail: 'x@test',
  items: [],
  total: 0,
  status: 'paid',
  depositPercent: 100,
  createdAt: new Date().toISOString(),
  shippingAddress: { name: 'n', address: '', city: '', postalCode: '', phone: '' },
  delivery_method: '',
  tracking_number: '',
  shipping_fee: 0,
  shipping_status: 'pending',
  shipping_date: '',
  delivery_note: '',
  timeline: [],
}

describe('mock store orders', () => {
  beforeEach(() => {
    resetOrders()
  })

  it('adds order to store', () => {
    const prev = getOrders().length
    addOrder(sample)
    expect(getOrders().length).toBe(prev + 1)
  })
})
