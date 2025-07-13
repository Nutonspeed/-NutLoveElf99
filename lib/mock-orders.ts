import type { OrderStatus, ShippingStatus, Order, PackingStatus } from "@/types/order"

import { supabase } from "./supabase"

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
    timeline: o.timeline.map((t) => ({ ...t })),
  }))
}

export function setPackingStatus(orderId: string, status: PackingStatus) {
  const order = mockOrders.find((o) => o.id === orderId)
  if (order) order.packingStatus = status
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
