import { mockClaims } from './mock-claims'
import { mockOrders } from './mock-orders'

export function getGlobalAlertCount(): number {
  const claimCount = mockClaims.filter(
    (c) => c.status === 'pending' || c.status === 'claim_waiting',
  ).length
  const orderCount = mockOrders.filter((o) => o.status === 'pending').length
  return claimCount + orderCount
}
