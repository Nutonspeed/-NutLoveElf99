import { USE_SUPABASE } from '../config'
import type { Customer } from '@/types/customer'
import { getCustomer, getCustomers } from '@/mockDB/customers'

export async function getAllCustomers(): Promise<Customer[]> {
  if (USE_SUPABASE) {
    // TODO connect to Supabase later
    return Promise.resolve([])
  }
  return Promise.resolve([...getCustomers()])
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  if (USE_SUPABASE) {
    return Promise.resolve(undefined)
  }
  return Promise.resolve(getCustomer(id))
}
