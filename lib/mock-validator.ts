import { mockOrders } from '@/core/mock/orders'
import { mockSupply } from './mock-supply'
import { mockCustomers } from '@/core/mock/customers'

export function validateMockData() {
  const orderIds = new Set<string>()
  for (const o of mockOrders) {
    if (orderIds.has(o.id)) {
      console.warn('duplicate order id', o.id)
    }
    orderIds.add(o.id)
  }

  const supplyIds = new Set<string>()
  for (const s of mockSupply) {
    if (supplyIds.has(s.id)) {
      console.warn('duplicate supply id', s.id)
    }
    supplyIds.add(s.id)
    if (!orderIds.has(s.orderId)) {
      console.warn('supply references missing order', s.orderId)
    }
  }

  const customerIds = new Set<string>()
  for (const c of mockCustomers) {
    if (customerIds.has(c.id)) {
      console.warn('duplicate customer id', c.id)
    }
    customerIds.add(c.id)
  }
}
