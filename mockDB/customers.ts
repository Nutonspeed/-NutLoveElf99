import customers from '@/mock/store/customers.json'

export type CustomerRecord = (typeof customers)[number]

export const mockCustomers: readonly CustomerRecord[] = customers as CustomerRecord[]

export function getCustomer(id: string): CustomerRecord | undefined {
  return mockCustomers.find(c => c.id === id)
}

export function getCustomers(): readonly CustomerRecord[] {
  return mockCustomers
}
