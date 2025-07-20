import type { Payment } from '@/types/payment'

export const payments: Payment[] = []

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

export function rejectPayment(orderId: string) {
  const p = getPayment(orderId)
  if (p) p.rejected = true
}

export function listPayments() {
  return payments
}
