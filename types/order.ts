export interface OrderItem {
  id: string
  productName: string
  size: string
  pattern: string
  color: string
  price: number
  quantity: number
  /** Percent discount for this item */
  discount?: number
  notes?: string
  image?: string
}

import type { OrderStatus, PackingStatus } from './order-status'
import { orderStatusOptions, packingStatusOptions } from './order-status'

export { orderStatusOptions, packingStatusOptions } from './order-status'
import type { Address } from './address'
import type { CustomerInfo } from './customer-info'
import type { Payment } from './payment'
export type { OrderStatus, PackingStatus } from './order-status'
export type ShippingStatus = "pending" | "shipped" | "delivered"

export const shippingStatusOptions: { value: ShippingStatus; label: string }[] = [
  { value: "pending", label: "รอจัดส่ง" },
  { value: "shipped", label: "จัดส่งแล้ว" },
  { value: "delivered", label: "ส่งมอบแล้ว" },
]

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerInfo: CustomerInfo
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  /** duplicate of total for new structure */
  totalAmount?: number
  status: OrderStatus
  depositPercent?: number
  note?: string
  chatNote?: string
  createdAt: string
  shippingAddress: Address
  delivery_method: string
  tracking_number: string
  shipping_fee: number
  shipping_status: ShippingStatus
  /** Status of packing before shipment */
  packingStatus: PackingStatus
  shipping_date: string
  delivery_note: string
  /** Base64 label image */
  labelImage?: string
  /** Scheduled date and time for delivery */
  scheduledDelivery?: string
  reorderedFromId?: string
  validated?: boolean
  demo?: boolean
  guest?: boolean
  checklist?: {
    items: string[]
    passed: boolean
  }
  timeline: Array<{
    timestamp: string
    status: OrderStatus
    note?: string
    flag?: "urgent" | "normal"
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
  payments?: Payment[]
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
    flag?: "urgent" | "normal"
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
