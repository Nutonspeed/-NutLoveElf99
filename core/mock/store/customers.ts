import type { Customer } from '@/lib/mock-customers'
import {
  mockCustomers as seedCustomers,
  regenerateMockCustomers,
} from '@/lib/mock-customers'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_customers'

let customers: Customer[] = loadFromStorage<Customer[]>(KEY, [...seedCustomers])

function persist() {
  saveToStorage(KEY, customers)
}

export function getCustomers() {
  return customers
}

export function addCustomer(customer: Customer) {
  customers.push(customer)
  persist()
}

export function updateCustomer(id: string, data: Partial<Customer>) {
  const idx = customers.findIndex(c => c.id === id)
  if (idx !== -1) {
    customers[idx] = { ...customers[idx], ...data }
    persist()
  }
}

export function resetCustomers() {
  customers = []
  persist()
}

export function regenerateCustomers() {
  regenerateMockCustomers()
  customers = [...seedCustomers]
  persist()
}
