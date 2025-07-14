import { mockClaims } from './mock-claims'
import { mockOrders } from './mock-orders'

export function getGlobalAlertCount(): number {
  const claimCount = mockClaims.filter(c => c.status === 'pending').length
  const orderCount = mockOrders.filter(o => o.shipping_status === 'pending').length
  return claimCount + orderCount
}
