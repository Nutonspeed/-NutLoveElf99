import type { OrderStatus, ShippingStatus, Order, PackingStatus } from "@/types/order"

import { supabase } from "./supabase"
import { addChatMessage } from "./mock-chat-messages"
import { addAdminLog } from "./mock-admin-logs"
import { mockOrders as initialMockOrders } from "@/core/mock/orders"


export let mockOrders: Order[] = [...initialMockOrders]

export function resetMockOrders() {
  mockOrders = []
}

export function regenerateMockOrders() {
  mockOrders = initialMockOrders.map((o) => ({
    ...o,
    items: o.items.map((i) => ({ ...i })),
    packingStatus: o.packingStatus,
    timeline: o.timeline.map((t) => ({ ...t })),
  }))
}

export function setPackingStatus(orderId: string, status: PackingStatus) {
  const order = mockOrders.find((o) => o.id === orderId)
  if (order) order.packingStatus = status
}

export function setOrderStatus(orderId: string, status: OrderStatus) {
  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) return
  if (order.status !== status) {
    order.status = status
    order.timeline.push({
      timestamp: new Date().toISOString(),
      status,
      updatedBy: "admin@nutlove.co",
    })
    addChatMessage(orderId, 'status_' + status)
    addAdminLog(`update order ${orderId} ${status}`, 'mockAdminId')
  }
}

export async function fetchOrders(): Promise<Order[]> {
  if (!supabase) {
    return Promise.resolve(mockOrders)
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("createdAt", { ascending: false })

  if (error || !data) {
    console.error("Supabase fetchOrders error", error)
    return mockOrders
  }

  return data as Order[]
}

export function getOrdersInRange(start: Date, end: Date): Order[] {
  return mockOrders.filter((o) => {
    const d = new Date(o.createdAt)
    return d >= start && d <= end
  })
}

export function getDailySales(start: Date, end: Date) {
  const days: Array<{ date: string; total: number }> = []
  const cur = new Date(start)
  while (cur <= end) {
    const dateStr = cur.toISOString().slice(0, 10)
    const total = mockOrders
      .filter((o) => o.createdAt.slice(0, 10) === dateStr)
      .reduce((s, o) => s + o.total, 0)
    days.push({ date: dateStr, total })
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

export function getTopSellingItems(start: Date, end: Date, top = 5) {
  const counts: Record<string, number> = {}
  mockOrders.forEach((o) => {
    const d = new Date(o.createdAt)
    if (d >= start && d <= end) {
      o.items.forEach((i) => {
        counts[i.productName] = (counts[i.productName] || 0) + i.quantity
      })
    }
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([name, count]) => ({ name, count }))
}
