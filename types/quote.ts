export type QuoteStatus = 'pending' | 'quoted' | 'rejected'

export interface QuoteItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface Quote {
  id: string
  customerId: string
  items: QuoteItem[]
  status: QuoteStatus
  estimatedTotal?: number
  note?: string
  createdAt: string
}
