export type PaymentChannel = 'bank' | 'promptpay' | 'cash'

export interface Payment {
  orderId: string
  date: string
  amount: number
  method: PaymentChannel
  slip?: string
  verified?: boolean
}

export let paymentChannels: Record<PaymentChannel, boolean> = {
  bank: true,
  promptpay: true,
  cash: true,
}

const CHANNEL_KEY = 'paymentChannels'

export function loadPaymentChannels() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CHANNEL_KEY)
    if (stored) paymentChannels = JSON.parse(stored)
  }
}

export function setPaymentChannel(ch: PaymentChannel, enabled: boolean) {
  paymentChannels = { ...paymentChannels, [ch]: enabled }
  if (typeof window !== 'undefined') {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(paymentChannels))
  }
}

const payments: Payment[] = []

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
  const idx = payments.findIndex(p => p.orderId === orderId)
  if (idx !== -1) payments.splice(idx, 1)
}

export function getPayments() {
  return payments
}
