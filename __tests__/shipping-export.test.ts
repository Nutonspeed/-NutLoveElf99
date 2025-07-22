import { describe, it, expect, vi } from 'vitest'
import { submitFlashShipments } from '../lib/shipping-export'
import { mockOrders } from '../lib/mock-orders'
import * as flashApi from '../lib/flashApi'
import type { Bill } from '../types/bill'

vi.mock('../lib/flashApi')

describe('submitFlashShipments', () => {
  it('calls Flash API when order uses Flash', async () => {
    const bill: Bill = {
      id: 'test-bill',
      orderId: 'ORDER-FLASH',
      status: 'paid',
      payments: [],
      createdAt: new Date().toISOString(),
    }
    mockOrders.push({
      id: 'ORDER-FLASH',
      orderNumber: 'ORDER-FLASH',
      customerId: '1',
      customerInfo: { id: '1', name: 'A', email: 'a@example.com' },
      customerName: 'A',
      customerEmail: 'a@example.com',
      items: [],
      total: 0,
      status: 'paid',
      shippingAddress: { name: 'A', address: 'x', city: 'c', postalCode: '0', phone: '0' },
      delivery_method: 'Flash',
      tracking_number: '',
      shipping_fee: 0,
      shipping_status: 'pending',
      packingStatus: 'packing',
      shipping_date: '',
      delivery_note: '',
      timeline: [],
    } as any)

    const spy = vi.spyOn(flashApi, 'submitFlashShipment').mockResolvedValue({ success: true })
    await submitFlashShipments([bill])
    expect(spy).toHaveBeenCalled()
  })

  it('skips non-Flash orders', async () => {
    const bill: Bill = {
      id: 'test-bill2',
      orderId: 'ORDER-POST',
      status: 'paid',
      payments: [],
      createdAt: new Date().toISOString(),
    }
    mockOrders.push({
      id: 'ORDER-POST',
      orderNumber: 'ORDER-POST',
      customerId: '1',
      customerInfo: { id: '1', name: 'A', email: 'a@example.com' },
      customerName: 'A',
      customerEmail: 'a@example.com',
      items: [],
      total: 0,
      status: 'paid',
      shippingAddress: { name: 'A', address: 'x', city: 'c', postalCode: '0', phone: '0' },
      delivery_method: 'TH Post',
      tracking_number: '',
      shipping_fee: 0,
      shipping_status: 'pending',
      packingStatus: 'packing',
      shipping_date: '',
      delivery_note: '',
      timeline: [],
    } as any)

    const spy = vi.spyOn(flashApi, 'submitFlashShipment').mockResolvedValue({ success: true })
    await submitFlashShipments([bill])
    expect(spy).not.toHaveBeenCalled()
  })
})
