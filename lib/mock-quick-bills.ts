export type QuickBillStatus = "รอชำระ" | "ชำระแล้ว" | "ยกเลิก"

export interface QuickBillItem {
  name: string
  qty: number
  price: number
}

export interface QuickBill {
  id: string
  customerName: string
  phone: string
  note: string
  items: QuickBillItem[]
  status: QuickBillStatus
  createdAt: string
}

export const quickBills: QuickBill[] = []
export const mockBillLinks: Record<string, string> = {}

export function addQuickBill(bill: Omit<QuickBill, "status" | "createdAt">): QuickBill {
  const newBill: QuickBill = {
    ...bill,
    status: "รอชำระ",
    createdAt: new Date().toISOString(),
  }
  quickBills.unshift(newBill)
  mockBillLinks[newBill.id] = `https://elfnity.app/bill/${newBill.id}`
  return newBill
}

export function getQuickBill(id: string): QuickBill | undefined {
  return quickBills.find((b) => b.id === id)
}

export function updateQuickBillStatus(id: string, status: QuickBillStatus) {
  const b = getQuickBill(id)
  if (b) b.status = status
}

export function getBillLink(id: string): string | undefined {
  return mockBillLinks[id]
}
