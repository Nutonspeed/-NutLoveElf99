import { mockOrders } from '@/core/mock/orders'
import { mockCustomers } from '@/core/mock/customers'
import { mockProducts } from '@/lib/mock-products'
import type { OrderType, OrderItemSchema } from '@/lib/schema/order'

let orders: OrderType[] = mockOrders as unknown as OrderType[]

export function getOrders(): OrderType[] {
  return orders
}

export function getOrderById(id: string): OrderType | undefined {
  return orders.find(o => o.id === id)
}

export function saveOrder(order: OrderType): void {
  const idx = orders.findIndex(o => o.id === order.id)
  if (idx !== -1) orders[idx] = order
  else orders.push(order)
}

export function getOrderDetailsById(id: string) {
  const order = getOrderById(id)
  if (!order) return undefined
  const customer = mockCustomers.find(c => c.id === order.customerId)
  const items = order.items.map(i => {
    const product = mockProducts.find(p => p.id === i.productId)
    return {
      ...i,
      name: product?.name,
      price: product?.price ?? i.price,
    }
  })
  return { ...order, customer, items }
}
