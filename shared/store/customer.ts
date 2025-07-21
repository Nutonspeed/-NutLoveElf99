import type { Customer } from '@/types/customer'
import { loadCustomers, type CustomerSourceMode } from '@/shared/adapter/customerSource'

export const CustomerStore = {
  mode: 'mock' as CustomerSourceMode,
  async getAll(): Promise<Customer[]> {
    return loadCustomers(this.mode)
  },
}
