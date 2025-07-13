export type QuoteStatus = 'new' | 'reviewed' | 'accepted' | 'rejected'

export interface QuoteItem {
  productId: string
  productName: string
  quantity: number
  price: number
  size?: string
  color?: string
}

export interface QuoteRequest {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: QuoteItem[]
  status: QuoteStatus
  createdAt: string
}
