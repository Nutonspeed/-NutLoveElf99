import { supabase } from './supabase'
import { mockProducts } from '@/data/mock-products'
import type { Product } from '@/types/product'

export { mockProducts }
export type { Product }

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    return Promise.resolve(mockProducts)
  }

  const { data, error } = await supabase.from('products').select('*')

  if (error || !data) {
    console.error('Supabase fetchProducts error', error)
    return mockProducts
  }

  return data as Product[]
}
