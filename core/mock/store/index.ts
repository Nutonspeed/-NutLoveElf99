export * from './orders'
export * from './customers'
export * from './fabrics'
export * from './config'
export * from './tiers'
export * from './pointPolicy'
export * from './redeems'

import { resetOrders, regenerateOrders } from './orders'
import { resetCustomers, regenerateCustomers } from './customers'
import { resetFabrics, regenerateFabrics } from './fabrics'
import { resetTiers, regenerateTiers } from './tiers'
import { resetPointPolicy } from './pointPolicy'
import { resetRedeems, regenerateRedeems } from './redeems'

export function resetStore() {
  resetOrders()
  resetCustomers()
  resetFabrics()
  resetTiers()
  resetPointPolicy()
  resetRedeems()
}

export function generateMockData() {
  regenerateOrders()
  regenerateCustomers()
  regenerateFabrics()
  regenerateTiers()
  regenerateRedeems()
}
