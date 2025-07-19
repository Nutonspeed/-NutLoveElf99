export * from './orders'
export * from './customers'
export * from './fabrics'
export * from './config'
export * from './reviews'
export * from './nps'

import { resetOrders, regenerateOrders } from './orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'
import { resetReviews } from './reviews'
import { resetNps } from './nps'

export function resetStore() {
  resetOrders()
  resetCustomers()
  resetFabrics()
  resetReviews()
  resetNps()
}

export function generateMockData() {
  regenerateOrders()
  regenerateCustomers()
  regenerateFabrics()
}
