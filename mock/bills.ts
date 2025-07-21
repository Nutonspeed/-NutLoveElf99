import { generateMockId } from '../lib/mock-uid'

export interface BillItem {
  name: string
  quantity: number
  price: number
}

export interface AdminBill {
  id: string
  customer: string
  items: BillItem[]
  shipping: number
  note: string
  status: 'pending' | 'unpaid' | 'paid' | 'shipped' | 'cancelled'
  tags: string[]
  trackingNumber?: string
  shippingMethod?: string
  shippingStatus?: 'shipped' | 'delivered' | 'returned' | 'cancelled'
  createdAt: string
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
    status: 'pending',
    tags: ['COD', 'VIP', 'flash-status:shipped'],
    trackingNumber: 'TH123456789012',
    shippingMethod: 'flash',
    shippingStatus: 'shipped',
    createdAt: new Date().toISOString(),
    archived: false,
  },
]

export function addBill(data: Omit<AdminBill, 'id' | 'status' | 'createdAt'>): AdminBill {
  const bill: AdminBill = {
    id: generateMockId('bill'),
    status: 'unpaid',
    createdAt: new Date().toISOString(),
    ...data,
    archived: false,
  }
  mockBills.unshift(bill)
  return bill
}

export function updateBillStatus(id: string, status: AdminBill['status']) {
  const bill = mockBills.find((b) => b.id === id)
  if (bill) bill.status = status
}

export function archiveBill(id: string) {
  const bill = mockBills.find((b) => b.id === id)
  if (bill) bill.archived = true
}

export function restoreBill(id: string) {
  const bill = mockBills.find((b) => b.id === id)
  if (bill) bill.archived = false
}

export function getArchivedBills() {
  return mockBills.filter((b) => b.archived)
}

export function getBill(id: string): AdminBill | undefined {
  return mockBills.find((b) => b.id === id)
}

export function updateBill(
  id: string,
  data: Partial<Omit<AdminBill, 'id' | 'createdAt'>>,
): AdminBill | undefined {
  const bill = mockBills.find((b) => b.id === id)
  if (bill) Object.assign(bill, data)
  return bill
}
