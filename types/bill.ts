export type BillStatus = "unpaid" | "paid" | "pending" | "cancelled"

export type BillType = "normal" | "quote" | "cod"

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
  status: BillStatus
  payments: BillPayment[]
  createdAt: string
  dueDate?: string
  type?: BillType
  hidden?: boolean
  abandonReason?: string
}
