import type { Bill, BillPayment } from "@/types/bill"

export let mockBills: Bill[] = []

export function createBill(orderId: string): Bill {
  const id = `bill-${Math.random().toString(36).slice(2, 8)}`
  const bill: Bill = { id, orderId, status: "unpaid", payments: [] }
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
