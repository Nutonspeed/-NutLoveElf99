import type { Customer, PointLog } from '@/types/customer'
export type { Customer }

import { mockOrders } from "./mock-orders"
import customersData from "@/mock/customers.json"
import { randomUUID } from "crypto"

const initialMockCustomers: Customer[] = customersData as Customer[]

export let mockCustomers: Customer[] = [...initialMockCustomers]

export function resetMockCustomers() {
  mockCustomers = []
}

export function regenerateMockCustomers() {
  mockCustomers = initialMockCustomers.map((c) => ({ ...c }))
}

export function addCustomer(data: Omit<Customer, 'id' | 'createdAt'>): Customer {
  const customer: Customer = {
    id: randomUUID(),
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

export function updateCustomer(
  id: string,
  data: Partial<Omit<Customer, 'id' | 'createdAt'>>,
): Customer | undefined {
  const customer = mockCustomers.find((c) => c.id === id)
  if (customer) Object.assign(customer, data)
  return customer
}

export function removeCustomer(id: string) {
  const idx = mockCustomers.findIndex((c) => c.id === id)
  if (idx !== -1) mockCustomers.splice(idx, 1)
}
