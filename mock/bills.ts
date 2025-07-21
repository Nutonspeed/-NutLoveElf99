import type { BillFeedback, BillItem } from '@/types/bill'

export interface AdminBill {
  id: string
  customer: string
  items: BillItem[]
  shipping: number
  note: string
  status: 'pending' | 'unpaid' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod?: 'cod' | 'bank_transfer' | 'promptpay' | 'credit_card'
  tags: string[]
  trackingNumber?: string
  shippingMethod?: string
  shippingStatus?: 'shipped' | 'delivered' | 'returned' | 'cancelled'
  createdAt: string
  feedback?: BillFeedback
  archived?: boolean
}

export const mockBills: AdminBill[] = [
  {
    id: 'BILL-001',
    customer: 'สมชาย ใจดี',
    items: [
      { name: 'ผ้าคลุมโซฟา', quantity: 1, price: 299 },
      { name: 'ปลอกหมอน', quantity: 2, price: 59 },
    ],
    shipping: 50,
    note: '',
    status: 'paid',
    tags: ['flash'],
    trackingNumber: 'TH1234567890',
    shippingMethod: 'Flash',
    shippingStatus: 'shipped',
    createdAt: new Date().toISOString(),
  },
]

export function addBill(
  data: Omit<AdminBill, 'id' | 'status' | 'createdAt'>,
): AdminBill {
  const bill: AdminBill = {
    id: `bill-${Date.now()}`,
    status: 'unpaid',
    createdAt: new Date().toISOString(),
    ...data,
  }
  mockBills.unshift(bill)
  return bill
}

export function updateBill(
  id: string,
  data: Partial<Omit<AdminBill, 'id' | 'createdAt'>>,
): AdminBill | undefined {
  const bill = mockBills.find(b => b.id === id)
  if (bill) Object.assign(bill, data)
  return bill
}

export function updateBillStatus(id: string, status: AdminBill['status']) {
  const bill = mockBills.find(b => b.id === id)
  if (bill) bill.status = status
}

export function archiveBill(id: string) {
  const bill = mockBills.find(b => b.id === id)
  if (bill) bill.archived = true
}

export function restoreBill(id: string) {
  const bill = mockBills.find(b => b.id === id)
  if (bill) bill.archived = false
}

export function getArchivedBills() {
  return mockBills.filter(b => b.archived)
}
