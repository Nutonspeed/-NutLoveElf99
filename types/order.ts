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

export type OrderStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "pendingPayment"
  | "depositPaid"
  | "paid"
  | "completed"
  | "archived"

export const orderStatusOptions: { value: OrderStatus; label: string }[] = [
  { value: "draft", label: "ร่าง" },
  { value: "pending", label: "รอยืนยัน" },
  { value: "confirmed", label: "ยืนยันแล้ว" },
  { value: "processing", label: "กำลังดำเนินการ" },
  { value: "shipped", label: "จัดส่งแล้ว" },
  { value: "delivered", label: "ส่งมอบแล้ว" },
  { value: "cancelled", label: "ยกเลิก" },
  { value: "pendingPayment", label: "รอชำระเงิน" },
  { value: "depositPaid", label: "มัดจำแล้ว" },
  { value: "paid", label: "ชำระแล้ว" },
  { value: "completed", label: "เสร็จสิ้น" },
  { value: "archived", label: "เก็บถาวร" },
]

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
  status: OrderStatus
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
