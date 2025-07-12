export interface OrderItem {
  id?: string
  productId?: string
  productName: string
  size?: string
  pattern?: string
  color?: string
  price: number
  quantity: number
  /** Percent discount for this item */
  discount?: number
  notes?: string
  image?: string
}

export type OrderStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "processing"
  | "producing"
  | "done"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "pendingPayment"
  | "depositPaid"
  | "paid"
  | "completed"
  | "archived"

export type ShippingStatus = "pending" | "shipped" | "delivered"

export const shippingStatusOptions: { value: ShippingStatus; label: string }[] = [
  { value: "pending", label: "รอจัดส่ง" },
  { value: "shipped", label: "จัดส่งแล้ว" },
  { value: "delivered", label: "ส่งมอบแล้ว" },
]

export const orderStatusOptions: { value: OrderStatus; label: string }[] = [
  { value: "draft", label: "ร่าง" },
  { value: "pending", label: "รอยืนยัน" },
  { value: "confirmed", label: "ยืนยันแล้ว" },
  { value: "processing", label: "กำลังดำเนินการ" },
  { value: "producing", label: "กำลังผลิต" },
  { value: "done", label: "ผลิตเสร็จแล้ว" },
  { value: "shipped", label: "จัดส่งแล้ว" },
  { value: "delivered", label: "ส่งมอบแล้ว" },
  { value: "cancelled", label: "ยกเลิก" },
  { value: "pendingPayment", label: "รอชำระเงิน" },
  { value: "depositPaid", label: "มัดจำแล้ว" },
  { value: "paid", label: "ชำระแล้ว" },
  { value: "completed", label: "เสร็จสิ้น" },
  { value: "archived", label: "เก็บถาวร" },
]

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  depositPercent?: number
  note?: string
  createdAt: string
  updatedAt?: string
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
  delivery_method: string
  tracking_number: string
  shipping_fee: number
  shipping_status: ShippingStatus
  shipping_date: string
  delivery_note: string
  timeline: Array<{
    timestamp: string
    status: OrderStatus
    note?: string
    updatedBy: string
  }>
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
  status: OrderStatus
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded"
  notes?: string
  attachments: string[]
  publicLink: string
  createdAt: string
  updatedAt: string
  createdBy: string
  timeline: Array<{
    timestamp: string
    status: OrderStatus
    note?: string
    updatedBy: string
  }>
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
