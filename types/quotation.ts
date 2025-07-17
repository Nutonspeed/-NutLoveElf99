export type QuotationStatus = 'sent' | 'viewed' | 'expired'

export interface QuotationItem {
  name: string
  quantity: number
  price: number
}

export interface Quotation {
  id: string
  customer: string
  items: QuotationItem[]
  status: QuotationStatus
  createdAt: string
}
