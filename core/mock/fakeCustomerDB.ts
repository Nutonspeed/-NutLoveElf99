import type { Customer } from '@/types/customer'

let customers: Customer[] | null = null

async function loadCustomers(): Promise<Customer[]> {
  if (!customers) {
    customers = (await import('../../mock/customers.json')).default as Customer[]
  }
  return customers
}

export async function getCustomers(): Promise<Customer[]> {
  return loadCustomers()
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  const list = await loadCustomers()
  return list.find(c => c.id === id)
}
