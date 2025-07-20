import type { Bill, BillPayment, BillStatus } from "@/types/bill"
import { mockOrders } from "./mock-orders"
import { mockCustomers } from "./mock-customers"
import { addAdminLog } from "./mock-admin-logs"
import { addChatMessage } from "./mock-chat-messages"
import { mockBills } from "./bills"
import { logBillAction } from "./mock-bill-audit"
import { generateMockId } from "./mock-uid"
export { mockBills } from "./bills"


export function createBill(
  orderId: string,
  status: BillStatus = "unpaid",
  dueDate?: string,
): Bill {
  const order = mockOrders.find((o) => o.id === orderId)
  const customer = order && mockCustomers.find((c) => c.id === order.customerId)
  const id = generateMockId('bill')
  const bill: Bill = {
    id,
    orderId,
    status,
    payments: [],
    createdAt: new Date().toISOString(),
    dueDate,
  }
  if (customer?.muted) {
    bill.hidden = true
  }
  mockBills.push(bill)
  addAdminLog(`create bill ${bill.id}`, 'mockAdminId')
  logBillAction(bill.id, 'create', { ip: '127.0.0.1', device: 'browser', role: 'admin' })
  addChatMessage(orderId, 'bill_created')
  return bill
}

export function getBill(id: string): Bill | null {
  return mockBills.find((b) => b.id === id) || null
}

export function confirmBill(id: string) {
  const b = getBill(id)
  if (b) {
    b.status = "paid"
    addAdminLog(`confirm bill ${id}`, 'mockAdminId')
    logBillAction(id, 'confirm', { ip: '127.0.0.1', device: 'browser', role: 'admin' })
  }
}

export function cancelBill(id: string) {
  const b = getBill(id)
  if (b) {
    b.status = "cancelled"
    addAdminLog(`cancel bill ${id}`, 'mockAdminId')
    logBillAction(id, 'cancel', { ip: '127.0.0.1', device: 'browser', role: 'admin' })
  }
}

export function addBillPayment(id: string, payment: BillPayment) {
  const b = getBill(id)
  if (b) {
    b.payments.push(payment)
    logBillAction(id, 'pay', { ip: '127.0.0.1', device: 'browser', role: 'user' })
  }
}

export function cleanupOldBills(days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  mockBills = mockBills.filter(
    (b) =>
      new Date(b.createdAt).getTime() >= cutoff ||
      (b.status !== "cancelled" && b.status !== "paid"),
  )
}
