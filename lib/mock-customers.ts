export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  avatar?: string
  tags?: string[]
  note?: string
  createdAt: string
}

export const mockCustomers: Customer[] = [
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    phone: "081-234-5678",
    address: "123 ถนนสุขุมวิท",
    city: "กรุงเทพฯ",
    postalCode: "10110",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["ลูกค้าประจำ"],
    note: "ชอบผ้ากำมะหยี่",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "082-345-6789",
    address: "456 ถนนพหลโยธิน",
    city: "กรุงเทพฯ",
    postalCode: "10400",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["COD"],
    note: "เก็บเงินปลายทาง",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    name: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

import { mockOrders } from "./mock-orders"

export interface CustomerStats {
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string
}

export function getCustomerOrders(customerId: string) {
  return mockOrders.filter((o) => o.customerId === customerId)
}

export function getCustomerStats(customerId: string): CustomerStats {
  const orders = getCustomerOrders(customerId)
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)
  const lastOrder = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0]
  return {
    totalOrders: orders.length,
    totalSpent,
    lastOrderDate: lastOrder?.createdAt,
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  return Promise.resolve([...mockCustomers])
}

export async function fetchCustomerById(id: string): Promise<Customer | undefined> {
  return Promise.resolve(mockCustomers.find((c) => c.id === id))
}
