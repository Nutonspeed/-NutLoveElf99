export type FastBillStatus = "รอชำระ" | "สำเร็จ"

export interface FastBill {
  id: string
  customerName: string
  phone: string
  items: string
  total: number
  deposit: number
  days: number
  depositPaid: boolean
  status: FastBillStatus
  createdAt: string
}

export const fastBills: FastBill[] = []

export function addFastBill(
  data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt' | 'status'>,
): FastBill {
  const bill: FastBill = {
    ...data,
    id: `mock-${Math.random().toString(36).slice(2, 8)}`,
    depositPaid: false,
    status: "รอชำระ",
    createdAt: new Date().toISOString(),
  }
  fastBills.unshift(bill)
  return bill
}

export function getFastBill(id: string): FastBill | undefined {
  return fastBills.find((b) => b.id === id)
}

export function markDepositPaid(id: string) {
  const b = getFastBill(id)
  if (b) b.depositPaid = true
}

export function markBillSuccess(id: string) {
  const b = getFastBill(id)
  if (b) {
    b.depositPaid = true
    b.status = "สำเร็จ"
  }
}
