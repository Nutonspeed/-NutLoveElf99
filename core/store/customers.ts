import { create } from 'zustand'
import type { Customer } from '@/lib/mock-customers'
import { getCustomers, addCustomer as add, updateCustomer as update } from '@/core/mock/store'

interface CustomerStore {
  customers: Customer[]
  addCustomer: (c: Customer) => void
  updateCustomer: (id: string, data: Partial<Customer>) => void
  refresh: () => void
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: getCustomers(),
  addCustomer: (c) => {
    add(c)
    set({ customers: getCustomers() })
  },
  updateCustomer: (id, data) => {
    update(id, data)
    set({ customers: getCustomers() })
  },
  refresh: () => set({ customers: getCustomers() }),
}))
