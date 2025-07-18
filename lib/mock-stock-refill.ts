export interface StockRefill {
  id: string
  productId: string
  quantity: number
  timestamp: string
}

export const mockStockRefills: StockRefill[] = []

export function addStockRefill(productId: string, quantity: number) {
  mockStockRefills.push({
    id: Date.now().toString(),
    productId,
    quantity,
    timestamp: new Date().toISOString(),
  })
}
