import type { OrderItem } from "@/types/order"

export interface Invoice {
  id: string
  orderId: string
  invoiceNumber: string
  issuedAt: string
  dueAt: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shippingCost: number
  tax: number
  total: number
  status: "unpaid" | "paid" | "overdue" | "void"
  notes?: string
  createdAt: string
  updatedAt: string
}
