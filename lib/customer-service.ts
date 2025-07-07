import { mockCustomers, getCustomerOrders, getCustomerStats } from '@/data/mock-customers'
import type { Customer } from '@/data/mock-customers'

export { mockCustomers, getCustomerOrders, getCustomerStats }
export type { Customer }

export async function fetchCustomers(): Promise<Customer[]> {
  return Promise.resolve([...mockCustomers])
}

export async function fetchCustomerById(id: string): Promise<Customer | undefined> {
  return Promise.resolve(mockCustomers.find((c) => c.id === id))
}
