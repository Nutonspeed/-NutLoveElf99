export type { AdminBill } from '@/mock/bills'
export {
  addBill,
  updateBill,
  updateBillStatus,
  updateProductionStatus,
  updatePaymentStatus,
  archiveBill,
  restoreBill,
  getArchivedBills,
} from '@/mock/bills'

import { mockBills } from '@/mock/bills'

export function getBills() {
  return mockBills
}

export function getBill(id: string) {
  return mockBills.find(b => b.id === id)
}
