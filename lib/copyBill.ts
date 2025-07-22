import type { AdminBill } from '@/mock/bills'

export function copyBill(bill: AdminBill): AdminBill {
  return {
    ...bill,
    id: `copy-${bill.id}-${Date.now()}`,
    status: 'unpaid',
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString(),
    followup_log: [],
  }
}
