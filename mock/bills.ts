import type { BillFeedback, BillItem } from '@/types/bill'

export interface AdminBill {
  id: string
  customer: string
  items: BillItem[]
  shipping: number
  note: string
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
    | 'waiting'
    | 'cutting'
    | 'sewing'
    | 'packing'
  paymentStatus: 'unpaid' | 'paid' | 'partial'
  paymentMethod?: 'cod' | 'bank_transfer' | 'promptpay' | 'credit_card'
  tags: string[]
  trackingNumber?: string
  trackingNo?: string
  deliveryDate?: string
  carrier?: string
  shippingMethod?: string
  shippingStatus?: 'shipped' | 'delivered' | 'returned' | 'cancelled'
  phone?: string
  contactChannel?: string
  createdAt: string
  feedback?: BillFeedback
  archived?: boolean
  /** timestamps for follow up contact */
  followup_log?: string[]
  sharedAt?: string | null
  sharedBy?: string | null
  customerNotes?: { message: string; createdAt: string; from: string }[]
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
    paymentStatus: 'paid',
    tags: ['flash'],
  trackingNumber: 'TH1234567890',
  trackingNo: 'TH1234567890',
  deliveryDate: new Date().toISOString(),
    carrier: 'Kerry',
      shippingMethod: 'Flash',
      shippingStatus: 'shipped',
      phone: '0812345678',
      createdAt: new Date().toISOString(),
      followup_log: [],
      sharedAt: null,
      sharedBy: null,
      customerNotes: [],
    },
  {
    id: 'BILL-002',
    customer: 'ทดสอบ ยกเลิก',
    items: [
      { name: 'ชุดโซฟา', quantity: 1, price: 500 },
    ],
    shipping: 50,
  note: 'ลูกค้าขอยกเลิก',
  status: 'cancelled',
  paymentStatus: 'unpaid',
  tags: [],
  deliveryDate: new Date().toISOString(),
    carrier: 'Flash',
      createdAt: new Date().toISOString(),
      followup_log: [],
      sharedAt: null,
      sharedBy: null,
      customerNotes: [],
    },
  {
    id: 'BILL-003',
    customer: 'Cancelled Order',
    items: [
      { name: 'ปลอกหมอน', quantity: 4, price: 59 },
    ],
    shipping: 30,
  note: 'cancel due to duplicate',
  status: 'cancelled',
  paymentStatus: 'unpaid',
  tags: ['test'],
  trackingNo: 'TH1111111111',
    carrier: 'JT',
      createdAt: new Date().toISOString(),
      followup_log: [],
      sharedAt: null,
      sharedBy: null,
      customerNotes: [],
    },
]

export function addBill(
  data: Omit<AdminBill, 'id' | 'status' | 'paymentStatus' | 'createdAt'>,
): AdminBill {
  const bill: AdminBill = {
    id: `bill-${Date.now()}`,
    status: 'unpaid',
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString(),
    followup_log: [],
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

export function updatePaymentStatus(
  id: string,
  status: AdminBill['paymentStatus'],
) {
  const bill = mockBills.find(b => b.id === id)
  if (bill) bill.paymentStatus = status
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
