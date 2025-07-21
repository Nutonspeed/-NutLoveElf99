import { create } from 'zustand'
import type { Customer } from '@/lib/mock-customers'
import { getCustomers, addCustomer as add, updateCustomer as update } from '@/core/mock/store'

interface CustomerStore {
  customers: Customer[]
  addCustomer: (c: Customer) => void
  updateCustomer: (id: string, data: Partial<Customer>) => void
  /**
   * Create a new customer with automatic id and timestamp
   */
  create: (data: Omit<Customer, 'id' | 'createdAt'>) => Customer
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
  create: (data) => {
    const customer: Customer = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    add(customer)
    set({ customers: getCustomers() })
    return customer
  },
  refresh: () => set({ customers: getCustomers() }),
}))
