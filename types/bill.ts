export type BillStatus = "unpaid" | "paid"

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
}
