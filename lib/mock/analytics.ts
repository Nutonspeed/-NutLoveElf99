import type { Order } from "@/types/order"
import { mockOrders } from "./orders"

export interface AnalyticsSummary {
  ordersToday: number
  revenueToday: number
  unpaidOrders: number
  readyToShip: number
}

function calculate(orders: Order[]): AnalyticsSummary {
  const today = new Date().toDateString()
  return orders.reduce(
    (acc, o) => {
      if (new Date(o.createdAt).toDateString() === today) {
        acc.ordersToday += 1
        acc.revenueToday += o.total
      }
      if (o.status === "pendingPayment") acc.unpaidOrders += 1
      if (o.status === "paid" && o.shipping_status === "pending") acc.readyToShip += 1
      return acc
    },
    { ordersToday: 0, revenueToday: 0, unpaidOrders: 0, readyToShip: 0 },
  )
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  return Promise.resolve(calculate(mockOrders))
}
