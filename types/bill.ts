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
  /** Reference code displayed to customer */
  referenceCode: string
  phone?: string
  pin?: string
  status: BillStatus
  payments: BillPayment[]
  createdAt: string
  dueDate?: string
  hidden?: boolean
  abandonReason?: string
}
