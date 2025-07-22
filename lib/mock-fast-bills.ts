export interface FastBill {
  id: string
  customerName: string
  phone: string
  items: string
  total: number
  deposit: number
  days: number
  fabricName: string
  fabricImage: string
  sofaType: string
  sofaSize: string
  quantity: number
  tags: string[]
  depositPaid: boolean
  createdAt: string
}

export const fastBills: FastBill[] = []

export function addFastBill(data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt'>): FastBill {
  const bill: FastBill = {
    ...data,
    id: `mock-${Math.random().toString(36).slice(2, 8)}`,
    depositPaid: false,
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
