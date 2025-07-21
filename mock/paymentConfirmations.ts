export interface PaymentConfirmation {
  id: string
  billId: string
  date: string
  amount: number
  method: string
  slip?: string
  status: 'pending' | 'confirmed'
  verifiedBy?: string
  verifiedAt?: string
}

export const paymentConfirmations: Record<string, PaymentConfirmation[]> = {
  'BILL-001': [
    {
      id: 'PAYCONF-1',
      billId: 'BILL-001',
      date: new Date(Date.now() - 3600 * 1000).toISOString(),
      amount: 408,
      method: 'โอนเข้าธนาคาร',
      slip: '/placeholder.jpg',
      status: 'pending',
    },
  ],
}
