import { mockProducts } from './mock-products'

export interface FlashSale {
  id: string
  productId: string
  price: number
  start: string
  end: string
}

export let flashSales: FlashSale[] = [
  {
    id: '1',
    productId: mockProducts[0].id,
    price: mockProducts[0].price * 0.8,
    start: new Date().toISOString(),
    end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function addFlashSale(data: Omit<FlashSale, 'id'>) {
  const fs: FlashSale = { id: Date.now().toString(), ...data }
  flashSales.push(fs)
  return fs
}

export function removeFlashSale(id: string) {
  flashSales = flashSales.filter(f => f.id !== id)
}

export function getActiveFlashSale(productId: string) {
  const now = new Date()
  return flashSales.find(
    f =>
      f.productId === productId &&
      new Date(f.start) <= now &&
      new Date(f.end) >= now,
  )
}
