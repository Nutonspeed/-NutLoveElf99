export interface Payment {
  orderId: string
  date: string
  amount: number
  slip?: string
  verified?: boolean
}

export const mockPayments: Payment[] = []
