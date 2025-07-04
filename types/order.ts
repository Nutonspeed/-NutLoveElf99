export interface OrderItem {
  id: string
  productName: string
  size: string
  pattern: string
  color: string
  price: number
  quantity: number
  notes?: string
  image?: string
}

export interface ManualOrder {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerAddress?: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shippingCost: number
  tax: number
  total: number
  status: "draft" | "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded"
  notes?: string
  attachments: string[]
  publicLink: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface OrderFormData {
  customerName: string
  customerPhone: string
  customerEmail: string
  customerAddress: string
  items: OrderItem[]
  discount: number
  shippingCost: number
  tax: number
  notes: string
  attachments: string[]
}
