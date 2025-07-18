import type { Order, OrderStatus } from "@/types/order"
import {
  mockOrders as baseOrders,
  setOrderStatus,
  setOrderTag,
  getOrdersInRange,
  getDailySales,
  getTopSellingItems,
} from "../mock-orders"

export const mockOrders: Order[] = baseOrders

export function updateOrderStatus(id: string, status: OrderStatus) {
  setOrderStatus(id, status)
}

export function updateOrderTag(id: string, tag: string) {
  setOrderTag(id, tag)
}

export { getOrdersInRange, getDailySales, getTopSellingItems }
