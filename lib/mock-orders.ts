export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  total: number
  status: "pendingPayment" | "depositPaid" | "paid" | "cancelled"
  depositPercent?: number
  note?: string
  createdAt: string
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
}

import { supabase } from "./supabase"

export const mockOrders: Order[] = [
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
    createdAt: "2024-01-15T10:30:00Z",
    shippingAddress: {
      name: "John Doe",
      address: "123 ถนนสุขุมวิท",
      city: "กรุงเทพฯ",
      postalCode: "10110",
      phone: "081-234-5678",
    },
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
    createdAt: "2024-01-14T14:20:00Z",
    shippingAddress: {
      name: "Jane Smith",
      address: "456 ถนนพหลโยธิน",
      city: "กรุงเทพฯ",
      postalCode: "10400",
      phone: "082-345-6789",
    },
  },
]

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
