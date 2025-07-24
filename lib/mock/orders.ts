import type { Order, OrderStatus } from "@/types/order"
import {
  mockOrders as baseOrders,
  setOrderStatus,
  getOrdersInRange,
  getDailySales,
  getTopSellingItems,
} from "../mock-orders"

export const mockOrders: Order[] = baseOrders

export function updateOrderStatus(id: string, status: OrderStatus) {
  setOrderStatus(id, status)
}

export function addOrderTimelineEntry(
  id: string,
  entry: { status: OrderStatus; timestamp: string; note?: string; updatedBy: string }
) {
  const order = mockOrders.find(o => o.id === id)
  if (order) order.timeline.push(entry)
}

export function attachReceipt(id: string, url: string, note?: string) {
  const order = mockOrders.find(o => o.id === id)
  if (order) {
    ;(order as any).receiptUrl = url
    ;(order as any).receiptNote = note
  }
}

export { getOrdersInRange, getDailySales, getTopSellingItems }
