export * from './orders'
export * from './simple-orders'
export * from './customers'
export * from './fabrics'
export * from './products'
export * from './config'

import { resetOrders, regenerateOrders } from './orders'
import { resetSimpleOrders, regenerateSimpleOrders } from './simple-orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'
import { resetProducts, regenerateProducts } from './products'

export function resetStore() {
  resetOrders()
  resetSimpleOrders()
  resetCustomers()
  resetFabrics()
  resetProducts()
}

export function generateMockData() {
  regenerateOrders()
  regenerateSimpleOrders()
  regenerateCustomers()
  regenerateFabrics()
  regenerateProducts()
}
