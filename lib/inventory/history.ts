export interface StockRefillEntry {
  id: string
  productId: string
  quantity: number
  timestamp: string
  note?: string
}

export const stockHistory: StockRefillEntry[] = []

export function logStockRefill(productId: string, quantity: number, note?: string) {
  stockHistory.push({
    id: Date.now().toString(),
    productId,
    quantity,
    timestamp: new Date().toISOString(),
    note,
  })
}
