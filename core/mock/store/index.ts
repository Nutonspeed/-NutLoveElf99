export * from './orders'
export * from './customers'
export * from './fabrics'

import { resetOrders, regenerateOrders } from './orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'

export function resetStore() {
  resetOrders()
  resetCustomers()
  resetFabrics()
}

export function generateMockData() {
  regenerateOrders()
  regenerateCustomers()
  regenerateFabrics()
}
