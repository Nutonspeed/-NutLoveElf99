export type { Customer } from '@/lib/mock-customers'
export {
  addCustomer,
  updateCustomer,
  regenerateCustomers,
  resetCustomers,
} from '@/core/mock/store/customers'

import { getCustomers as storeGetCustomers } from '@/core/mock/store/customers'

export function getCustomers() {
  return storeGetCustomers()
}

export function getCustomer(id: string) {
  return storeGetCustomers().find(c => c.id === id)
}
