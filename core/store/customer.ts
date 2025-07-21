import type { CustomerSchema } from '@/lib/schema/customer'

const mockData: CustomerSchema[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '0812345678',
    address: '123 Main St',
    tags: ['VIP'],
    createdAt: new Date().toISOString(),
    email: 'john@example.com',
    note: 'Frequent buyer',
  },
]

let customers = [...mockData]

export const CustomerStore = {
  getById(id: string) {
    return customers.find(c => c.id === id)
  },

  searchByName(name: string) {
    return customers.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
  },

  filterByTag(tag: string) {
    return customers.filter(c => c.tags.includes(tag))
  },

  create(data: Omit<CustomerSchema, 'id' | 'createdAt'>) {
    const customer: CustomerSchema = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    customers.push(customer)
    return customer
  },

  update(id: string, data: Partial<Omit<CustomerSchema, 'id' | 'createdAt'>>) {
    const idx = customers.findIndex(c => c.id === id)
    if (idx === -1) return undefined
    customers[idx] = { ...customers[idx], ...data }
    return customers[idx]
  },
}

export function loadMockCustomers(data: CustomerSchema[]) {
  customers = [...data]
}
