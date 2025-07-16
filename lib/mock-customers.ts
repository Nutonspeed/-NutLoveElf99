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
  /** mock reward points */
  points?: number
  /** membership tier */
  tier?: "Silver" | "Gold" | "VIP"
  /** mute notifications */
  muted?: boolean
  /** point change history */
  pointHistory?: PointLog[]
  createdAt: string
}

export interface PointLog {
  timestamp: string
  change: number
  reason?: string
}

import { mockOrders } from "./mock-orders"

const initialMockCustomers: Customer[] = [
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
    points: 120,
    tier: "Gold",
    pointHistory: [
      { timestamp: new Date().toISOString(), change: 120, reason: "สมัครสมาชิก" },
    ],
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
    points: 60,
    tier: "Silver",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 200,
    tier: "VIP",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 10,
    tier: "Silver",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    name: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 40,
    tier: "Gold",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 80,
    tier: "Gold",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export let mockCustomers: Customer[] = [...initialMockCustomers]

export function resetMockCustomers() {
  mockCustomers = []
}

export function regenerateMockCustomers() {
  mockCustomers = initialMockCustomers.map((c) => ({ ...c }))
}

export function addCustomer(data: Omit<Customer, 'id' | 'createdAt'>): Customer {
  const customer: Customer = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...data,
  }
  mockCustomers.push(customer)
  return customer
}

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

export function updateCustomerPoints(
  id: string,
  change: number,
  reason?: string,
) {
  const customer = mockCustomers.find((c) => c.id === id)
  if (!customer) return
  customer.points = (customer.points || 0) + change
  if (!customer.pointHistory) customer.pointHistory = []
  customer.pointHistory.push({
    timestamp: new Date().toISOString(),
    change,
    reason,
  })
}

export function setCustomerTier(id: string, tier: "Silver" | "Gold" | "VIP") {
  const customer = mockCustomers.find((c) => c.id === id)
  if (!customer) return
  customer.tier = tier
}

export function setCustomerMuted(id: string, muted: boolean) {
  const customer = mockCustomers.find((c) => c.id === id)
  if (!customer) return
  customer.muted = muted
}

export function checkCustomerInfo(id: string): string | null {
  const customer = mockCustomers.find((c) => c.id === id)
  if (!customer) return "ยังไม่สามารถตรวจสอบข้อมูลได้"
  const missing: string[] = []
  if (!customer.name) missing.push("ชื่อ")
  if (!customer.address) missing.push("ที่อยู่")
  if (!customer.phone) missing.push("เบอร์โทร")
  return missing.length > 0 ? `ข้อมูลลูกค้าไม่ครบ (${missing.join(", ")})` : null
}

export function getLastCustomerName(): string | null {
  const last = mockCustomers[mockCustomers.length - 1]
  return last ? last.name : null
}
