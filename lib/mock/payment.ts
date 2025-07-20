export interface Payment {
  orderId: string
  date: string
  amount: number
  slip?: string
  verified?: boolean
}

import { mockPayments as payments } from '@/core/mock/payments'

export function getPayment(orderId: string): Payment | undefined {
  return payments.find(p => p.orderId === orderId)
}

export function addPayment(orderId: string, data: Omit<Payment, 'orderId' | 'verified'>): Payment | null {
  if (!orderId) return null
  const payment: Payment = { orderId, verified: false, ...data }
  payments.push(payment)
  return payment
}

export function verifyPayment(orderId: string) {
  const p = getPayment(orderId)
  if (p) p.verified = true
}
