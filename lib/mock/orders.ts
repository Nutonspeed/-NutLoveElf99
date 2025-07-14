import type { Order, OrderStatus } from "@/types/order"
import { mockOrders as baseOrders, setOrderStatus } from "../mock-orders"

export const mockOrders: Order[] = baseOrders

export function updateOrderStatus(id: string, status: OrderStatus) {
  setOrderStatus(id, status)
}
