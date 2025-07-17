export interface Payment {
  orderId: string
  date: string
  amount: number
  slip?: string
  channel: string
  note?: string
  verified?: boolean
}

const payments: Payment[] = []

export function getPayment(orderId: string): Payment | undefined {
  return payments.find(p => p.orderId === orderId)
}

export function addPayment(
  orderId: string,
  data: Omit<Payment, 'orderId' | 'verified'>,
): Payment | null {
  if (!orderId) return null
  const payment: Payment = { orderId, verified: false, ...data }
  payments.push(payment)
  return payment
}

export function verifyPayment(orderId: string) {
  const p = getPayment(orderId)
  if (p) p.verified = true
}
