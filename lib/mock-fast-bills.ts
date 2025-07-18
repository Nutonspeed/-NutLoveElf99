export interface FastBill {
  id: string
  customerName: string
  phone: string
  items: string
  total: number
  deposit: number
  days: number
  depositPaid: boolean
  createdAt: string
}

export const fastBills: FastBill[] = []

export function addFastBill(data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt'>): FastBill {
  const bill: FastBill = {
    ...data,
    id: `mock-${Math.random().toString(36).slice(2, 8)}`,
    depositPaid: false,
    createdAt: new Date().toISOString(),
  }
  fastBills.unshift(bill)
  return bill
}

export function getFastBill(id: string): FastBill | undefined {
  return fastBills.find((b) => b.id === id)
}

import type { Order } from "@/types/order"
import { addMockOrder } from "./mock-orders"

export function markDepositPaid(id: string) {
  const b = getFastBill(id)
  if (b) b.depositPaid = true
}

export function convertFastBillToOrder(id: string): Order | null {
  const bill = getFastBill(id)
  if (!bill) return null
  const order: Order = {
    id: `ORD-${Math.random().toString(36).slice(2, 8)}`,
    customerId: "guest",
    customerName: bill.customerName,
    customerEmail: "",
    items: [
      {
        productId: "custom",
        productName: bill.items,
        quantity: 1,
        price: bill.total,
      },
    ],
    total: bill.total,
    status: "pendingPayment",
    depositPercent: Math.round((bill.deposit / bill.total) * 100),
    createdAt: new Date().toISOString(),
    shippingAddress: {
      name: bill.customerName,
      address: "",
      city: "",
      postalCode: "",
      phone: bill.phone,
    },
    delivery_method: "",
    tracking_number: "",
    shipping_fee: 0,
    shipping_status: "pending",
    packingStatus: "packing",
    shipping_date: "",
    delivery_note: "",
    timeline: [
      {
        timestamp: new Date().toISOString(),
        status: "pendingPayment",
        updatedBy: "system",
      },
    ],
  }
  addMockOrder(order)
  return order
}
