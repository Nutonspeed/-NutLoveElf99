import { supabase } from './supabase'
import { mockOrders, resetMockOrders, regenerateMockOrders } from '@/data/mock-orders'
import type { Order } from '@/data/mock-orders'

export { mockOrders, resetMockOrders, regenerateMockOrders }
export type { Order }

export async function fetchOrders(): Promise<Order[]> {
  if (!supabase) {
    return Promise.resolve(mockOrders)
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error || !data) {
    console.error('Supabase fetchOrders error', error)
    return mockOrders
  }

  return data as Order[]
}
