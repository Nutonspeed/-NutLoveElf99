import type { Customer } from '@/types/customer'
import { getCustomers } from '@/core/mock/store'

export type CustomerSourceMode = 'mock' | 'real'

export async function loadCustomers(mode: CustomerSourceMode): Promise<Customer[]> {
  if (mode === 'real') {
    return []
  }
  return Promise.resolve(getCustomers())
}
