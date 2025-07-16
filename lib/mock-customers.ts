export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  province?: string
  region?: string
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
    province: "กรุงเทพมหานคร",
    region: "ภาคกลาง",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["ลูกค้าประจำ", "กรุงเทพมหานคร", "ภาคกลาง"],
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
    province: "กรุงเทพมหานคร",
    region: "ภาคกลาง",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["COD", "กรุงเทพมหานคร", "ภาคกลาง"],
    note: "เก็บเงินปลายทาง",
    points: 60,
    tier: "Silver",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    province: "เชียงใหม่",
    region: "ภาคเหนือ",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["เชียงใหม่", "ภาคเหนือ"],
    points: 200,
    tier: "VIP",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    province: "ขอนแก่น",
    region: "ภาคตะวันออกเฉียงเหนือ",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["ขอนแก่น", "ภาคตะวันออกเฉียงเหนือ"],
    points: 10,
    tier: "Silver",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    name: "David Brown",
    email: "david@example.com",
    province: "ภูเก็ต",
    region: "ภาคใต้",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["ภูเก็ต", "ภาคใต้"],
    points: 40,
    tier: "Gold",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    province: "ชลบุรี",
    region: "ภาคตะวันออก",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["ชลบุรี", "ภาคตะวันออก"],
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
  if (customer.province) {
    customer.tags = [...(customer.tags || []), customer.province]
  }
  if (customer.region) {
    customer.tags = [...(customer.tags || []), customer.region]
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

export function getCustomerLocation(id: string): string {
  const c = mockCustomers.find((cust) => cust.id === id)
  if (!c) return "ยังไม่มีข้อมูลตำแหน่ง"
  if (c.province && c.region) return `${c.province} (${c.region})`
  if (c.province) return c.province
  if (c.region) return c.region
  return "ยังไม่มีข้อมูลตำแหน่ง"
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
  if (!customer.province) missing.push("จังหวัด")
  if (!customer.region) missing.push("ภูมิภาค")
  if (!customer.phone) missing.push("เบอร์โทร")
  return missing.length > 0 ? `ข้อมูลลูกค้าไม่ครบ (${missing.join(", ")})` : null
}
