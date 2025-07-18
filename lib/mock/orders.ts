import type { Order, OrderStatus } from "@/types/order"
import {
  mockOrders as baseOrders,
  setOrderStatus,
  getOrdersInRange,
  getDailySales,
  getDailyOrders,
  getTopSellingItems,
} from "../mock-orders"

export const mockOrders: Order[] = baseOrders

export function updateOrderStatus(id: string, status: OrderStatus) {
  setOrderStatus(id, status)
}

export { getOrdersInRange, getDailySales, getDailyOrders, getTopSellingItems }
