import { describe, it, expect } from 'vitest'
import { groupByDay, groupByMonth } from '../aggregateReports'
import type { Order } from '@/types/order'

const orders: Order[] = [
  { id: '1', customerId: 'c1', customerName: '', customerEmail: '', items: [], total: 100, status: 'paid', createdAt: '2024-05-01T10:00:00Z', shippingAddress: { name: '', address: '', city: '', postalCode: '', phone: '' }, delivery_method: '', tracking_number: '', shipping_fee: 0, shipping_status: 'pending', packingStatus: 'packing', shipping_date: '', delivery_note: '', timeline: [] },
  { id: '2', customerId: 'c1', customerName: '', customerEmail: '', items: [], total: 200, status: 'paid', createdAt: '2024-05-01T12:00:00Z', shippingAddress: { name: '', address: '', city: '', postalCode: '', phone: '' }, delivery_method: '', tracking_number: '', shipping_fee: 0, shipping_status: 'pending', packingStatus: 'packing', shipping_date: '', delivery_note: '', timeline: [] },
  { id: '3', customerId: 'c1', customerName: '', customerEmail: '', items: [], total: 150, status: 'paid', createdAt: '2024-06-02T09:00:00Z', shippingAddress: { name: '', address: '', city: '', postalCode: '', phone: '' }, delivery_method: '', tracking_number: '', shipping_fee: 0, shipping_status: 'pending', packingStatus: 'packing', shipping_date: '', delivery_note: '', timeline: [] },
]

describe('aggregateReports', () => {
  it('groups orders by day', () => {
    const result = groupByDay(orders)
    expect(result).toEqual([
      { date: '2024-05-01', total: 300, count: 2 },
      { date: '2024-06-02', total: 150, count: 1 },
    ])
  })

  it('groups orders by month', () => {
    const result = groupByMonth(orders)
    expect(result).toEqual([
      { date: '2024-05', total: 300, count: 2 },
      { date: '2024-06', total: 150, count: 1 },
    ])
  })
})
