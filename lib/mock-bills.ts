import type { Bill, BillPayment, BillStatus } from "@/types/bill"

export let mockBills: Bill[] = []

export function createBill(
  orderId: string,
  status: BillStatus = "unpaid",
  dueDate?: string,
): Bill {
  const id = `bill-${Math.random().toString(36).slice(2, 8)}`
  const bill: Bill = {
    id,
    orderId,
    status,
    payments: [],
    createdAt: new Date().toISOString(),
    dueDate,
  }
  mockBills.push(bill)
  return bill
}

export function getBill(id: string): Bill | null {
  return mockBills.find((b) => b.id === id) || null
}

export function confirmBill(id: string) {
  const b = getBill(id)
  if (b) b.status = "paid"
}

export function addBillPayment(id: string, payment: BillPayment) {
  const b = getBill(id)
  if (b) b.payments.push(payment)
}

export function cleanupOldBills(days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  mockBills = mockBills.filter(
    (b) =>
      new Date(b.createdAt).getTime() >= cutoff ||
      (b.status !== "cancelled" && b.status !== "paid"),
  )
}
