export interface BillItem {
  name: string
  quantity: number
  price: number
}

export interface Bill {
  id: string
  shortCode: string
  customerId: string
  customer?: string
  items: BillItem[]
  shipping: number
  discount?: number
  status:
    | 'draft'
    | 'pending'
    | 'unpaid'
    | 'paid'
    | 'packed'
    | 'shipped'
    | 'delivered'
    | 'failed'
    | 'cancelled'
  productionStatus?:
    | 'waiting'
    | 'cutting'
    | 'sewing'
    | 'packing'
    | 'shipped'
    | 'done'
}

import type { Customer as BaseCustomer } from '@/types/customer'
export type Customer = BaseCustomer

export function generateBillId() {
  return `BILL-${Date.now().toString(36)}`
}

export function calculateTotal(bill: Pick<Bill, 'items' | 'shipping'> & { discount?: number }) {
  const subtotal = bill.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const total = subtotal - (bill.discount || 0) + bill.shipping
  return { subtotal, total }
}

const statusLabels: Record<Bill['status'], string> = {
  draft: 'ร่าง',
  pending: 'รอตรวจสอบ',
  unpaid: 'ค้างชำระ',
  paid: 'ชำระแล้ว',
  packed: 'แพ็คแล้ว',
  shipped: 'จัดส่งแล้ว',
  delivered: 'ส่งสำเร็จ',
  failed: 'ล้มเหลว',
  cancelled: 'ยกเลิก',
}

export function getBillStatus(status: Bill['status']): string {
  return statusLabels[status] || status
}

export function formatBillDisplay(bill: Bill) {
  const { subtotal, total } = calculateTotal(bill)
  return {
    ...bill,
    subtotal,
    total,
    statusLabel: getBillStatus(bill.status),
  }
}
