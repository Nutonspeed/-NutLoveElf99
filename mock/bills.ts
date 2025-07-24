import type { BillFeedback, BillItem } from '@/types/bill'

export interface AdminBill {
  id: string
  shortCode: string
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
  productionStatus?:
    | 'waiting'
    | 'cutting'
    | 'sewing'
    | 'packing'
    | 'shipped'
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
  packedBy?: string
}

export const mockBills: AdminBill[] = [
  {
    id: 'BILL-001',
    shortCode: 'B001',
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
  productionStatus: 'shipped',
  phone: '0812345678',
  createdAt: new Date().toISOString(),
  followup_log: [],
  sharedAt: null,
  sharedBy: null,
  customerNotes: [],
  packedBy: 'เมีย',
  },
  {
    id: 'BILL-002',
    shortCode: 'B002',
    customer: 'ทดสอบ ยกเลิก',
    items: [
      { name: 'ชุดโซฟา', quantity: 1, price: 500 },
    ],
    shipping: 50,
  note: 'ลูกค้าขอยกเลิก',
  status: 'cancelled',
  paymentStatus: 'unpaid',
  tags: [],
  productionStatus: 'waiting',
  deliveryDate: new Date().toISOString(),
  carrier: 'Flash',
  createdAt: new Date().toISOString(),
  followup_log: [],
  sharedAt: null,
  sharedBy: null,
  customerNotes: [],
  packedBy: 'แพ็คแล้วแต่รอเย็บผ้า',
  },
  {
    id: 'BILL-003',
    shortCode: 'B003',
    customer: 'Cancelled Order',
    items: [
      { name: 'ปลอกหมอน', quantity: 4, price: 59 },
    ],
    shipping: 30,
  note: 'cancel due to duplicate',
  status: 'cancelled',
  paymentStatus: 'unpaid',
  tags: ['test'],
  productionStatus: 'waiting',
  trackingNo: 'TH1111111111',
  carrier: 'JT',
  createdAt: new Date().toISOString(),
  followup_log: [],
  sharedAt: null,
  sharedBy: null,
  customerNotes: [],
  packedBy: 'แพ็คโดยเมีย',
  },
]

export function addBill(
  data: Omit<AdminBill, 'id' | 'status' | 'paymentStatus' | 'createdAt'>,
): AdminBill {
  const bill: AdminBill = {
    id: `bill-${Date.now()}`,
    shortCode: data.shortCode || `BILL${Date.now()}`,
    status: 'unpaid',
    paymentStatus: 'unpaid',
    productionStatus: 'waiting',
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

export function updateProductionStatus(
  id: string,
  status: NonNullable<AdminBill['productionStatus']>,
) {
  const bill = mockBills.find(b => b.id === id)
  if (bill) {
    bill.productionStatus = status
  }
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
