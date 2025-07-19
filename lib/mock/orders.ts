import type { Order, OrderStatus } from "@/types/order"
import {
  mockOrders as baseOrders,
  setOrderStatus,
  getOrdersInRange,
  getDailySales,
  getTopSellingItems,
} from "@/core/mock/orders"

export const mockOrders: Order[] = baseOrders

export function updateOrderStatus(id: string, status: OrderStatus) {
  setOrderStatus(id, status)
}

export { getOrdersInRange, getDailySales, getTopSellingItems }
