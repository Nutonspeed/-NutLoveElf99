import type { OrderStatus, ShippingStatus, Order, PackingStatus } from "@/types/order"

import { supabase } from "./supabase"
import { addChatMessage } from "./mock-chat-messages"
import { addAdminLog } from "./mock-admin-logs"

const initialMockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "2",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      {
        productId: "1",
        productName: "ผ้าคลุมโซฟา Premium Velvet",
        quantity: 1,
        price: 2990,
        size: "3 ที่นั่ง",
        color: "Navy Blue",
      },
    ],
    total: 2990,
    status: "depositPaid",
    depositPercent: 50,
    note: "Deposit received",
    chatNote: "",
    tag: "ด่วน",
    createdAt: "2024-01-15T10:30:00Z",
    shippingAddress: {
      name: "John Doe",
      address: "123 ถนนสุขุมวิท",
      city: "กรุงเทพฯ",
      postalCode: "10110",
      phone: "081-234-5678",
    },
    delivery_method: "TH Post",
    tracking_number: "TH1234567890",
    shipping_fee: 80,
    shipping_status: "pending",
    packingStatus: "packing",
    shipping_date: "2024-01-16T10:30:00Z",
    delivery_note: "-",
    scheduledDelivery: "2024-01-20T10:00",
    timeline: [
      {
        timestamp: "2024-01-15T10:30:00Z",
        status: "depositPaid",
        updatedBy: "admin@nutlove.co",
        note: "Order created",
        flag: "normal",
      },
      {
        timestamp: "2024-01-16T09:00:00Z",
        status: "packed",
        updatedBy: "admin@nutlove.co",
        note: "Package ready",
        flag: "urgent",
      },
    ],
  },
  {
    id: "ORD-002",
    customerId: "3",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      {
        productId: "2",
        productName: "ผ้าคลุมโซฟา Cotton Blend",
        quantity: 2,
        price: 1990,
        size: "2 ที่นั่ง",
        color: "Cream",
      },
    ],
    total: 3980,
    status: "paid",
    depositPercent: 100,
    chatNote: "",
    tag: "ติดตาม",
    createdAt: "2024-01-14T14:20:00Z",
    shippingAddress: {
      name: "Jane Smith",
      address: "456 ถนนพหลโยธิน",
      city: "กรุงเทพฯ",
      postalCode: "10400",
      phone: "082-345-6789",
    },
    delivery_method: "TH Post",
    tracking_number: "TH0987654321",
    shipping_fee: 80,
    shipping_status: "shipped",
    packingStatus: "packing",
    shipping_date: "2024-01-15T08:00:00Z",
    delivery_note: "ส่งตามเวลาทำการ",
    scheduledDelivery: "2024-01-18T10:00",
    timeline: [
      {
        timestamp: "2024-01-14T14:20:00Z",
        status: "paid",
        updatedBy: "admin@nutlove.co",
        note: "Order created",
        flag: "normal",
      },
    ],
  },
]

export let mockOrders: Order[] = [...initialMockOrders]

export function resetMockOrders() {
  mockOrders = []
}

export function regenerateMockOrders() {
  mockOrders = initialMockOrders.map((o) => ({
    ...o,
    items: o.items.map((i) => ({ ...i })),
    packingStatus: o.packingStatus,
    tag: o.tag,
    timeline: o.timeline.map((t) => ({ ...t })),
  }))
}

export function setPackingStatus(orderId: string, status: PackingStatus) {
  const order = mockOrders.find((o) => o.id === orderId)
  if (order) order.packingStatus = status
}

export function setOrderTag(orderId: string, tag: string) {
  const order = mockOrders.find((o) => o.id === orderId)
  if (order) order.tag = tag
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
