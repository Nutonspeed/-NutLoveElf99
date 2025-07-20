export * from './orders'
export * from './customers'
export * from './fabrics'
export * from './coupons'
export * from './config'

import { resetOrders, regenerateOrders } from './orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'
import { resetCoupons, regenerateCoupons } from './coupons'

export function resetStore() {
  resetOrders()
  resetCustomers()
  resetFabrics()
  resetCoupons()
}

export function generateMockData() {
  regenerateOrders()
  regenerateCustomers()
  regenerateFabrics()
  regenerateCoupons()
}
