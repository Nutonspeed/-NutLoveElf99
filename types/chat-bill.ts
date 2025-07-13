export interface ChatBillItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export type ChatBillStatus = 'draft' | 'sent' | 'paid'

export interface ChatBill {
  billId: string
  createdAt: string
  fbName: string
  fbLink: string
  sessionId: string
  items: ChatBillItem[]
  discount: number
  total: number
  status: ChatBillStatus
}
