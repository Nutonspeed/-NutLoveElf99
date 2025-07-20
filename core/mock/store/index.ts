export * from './orders'
export * from './customers'
export * from './fabrics'
export * from './products'
export * from './config'

import { resetOrders, regenerateOrders } from './orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'
import { resetProducts, regenerateProducts } from './products'

export function resetStore() {
  resetOrders()
  resetCustomers()
  resetFabrics()
  resetProducts()
}

export function generateMockData() {
  regenerateOrders()
  regenerateCustomers()
  regenerateFabrics()
  regenerateProducts()
}
