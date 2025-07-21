export type BillStatus = "unpaid" | "paid" | "pending" | "cancelled"

export interface BillPayment {
  id: string
  date: string
  amount: number
  slip?: string
  approved?: boolean
}

export interface Bill {
  id: string
  orderId: string
  phone?: string
  pin?: string
  paymentMethod?: 'cod' | 'bank_transfer' | 'promptpay' | 'credit_card'
  status: BillStatus
  payments: BillPayment[]
  createdAt: string
  dueDate?: string
  hidden?: boolean
  abandonReason?: string
  /** notification for delivery reminder sent */
  reminderSent?: boolean
}
