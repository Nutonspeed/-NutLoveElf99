export * from './orders'
export * from './customers'
export * from './fabrics'
export * from './products'
export * from './config'
export * from './bills'

import { resetOrders, regenerateOrders } from './orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'
import { resetProducts, regenerateProducts } from './products'
import { resetBills, regenerateBills } from './bills'

export function resetStore() {
  resetOrders()
  resetCustomers()
  resetFabrics()
  resetProducts()
  resetBills()
}

export function generateMockData() {
  regenerateOrders()
  regenerateCustomers()
  regenerateFabrics()
  regenerateProducts()
  regenerateBills()
}
