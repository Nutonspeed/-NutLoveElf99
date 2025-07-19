import type { OrderStatus } from '@/types/order'

export interface OrderItemSchema {
  productId: string
  quantity: number
  price: number
}

export interface OrderType {
  id: string
  customerId: string
  items: OrderItemSchema[]
  status: OrderStatus | string
  createdAt: string
  updatedAt: string
  slipUrl?: string
  [key: string]: any
}
