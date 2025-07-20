import type { Product } from '@/lib/mock-products'
import { mockProducts as seedProducts } from '@/lib/mock-products'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_products'

let products: Product[] = loadFromStorage<Product[]>(KEY, [...seedProducts])

function persist() {
  saveToStorage(KEY, products)
}

export function getProducts() {
  return products
}

export function addProduct(product: Omit<Product, 'id'>) {
  const newProduct: Product = { id: `prod-${Date.now()}`, ...product }
  products.push(newProduct)
  persist()
  return newProduct
}

export function updateProduct(id: string, data: Partial<Omit<Product, 'id'>>) {
  const idx = products.findIndex(p => p.id === id)
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...data }
    persist()
  }
}

export function resetProducts() {
  products = []
  persist()
}

export function regenerateProducts() {
  products = [...seedProducts]
  persist()
}
