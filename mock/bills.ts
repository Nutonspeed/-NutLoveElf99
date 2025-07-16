import { defaultDeliveryMethod } from '@/lib/mock-settings'

export interface BillItem {
  name: string
  quantity: number
  price: number
}

export interface AdminBill {
  id: string
  customer: string
  items: BillItem[]
  deliveryMethod: string
  shipping: number
  note: string
  status: 'pending' | 'unpaid' | 'paid' | 'cancelled'
  createdAt: string
}

export const mockBills: AdminBill[] = [
  {
    id: 'BILL-001',
    customer: 'สมชาย ใจดี',
    items: [
      { name: 'ผ้าคลุมโซฟา', quantity: 1, price: 299 },
      { name: 'ปลอกหมอน', quantity: 2, price: 59 },
    ],
    deliveryMethod: 'เก็บปลายทาง',
    shipping: 50,
    note: '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
]

export function addBill(
  data: Omit<AdminBill, 'id' | 'status' | 'createdAt' | 'deliveryMethod'> & {
    deliveryMethod?: string
  },
): AdminBill {
  const { deliveryMethod = defaultDeliveryMethod, ...rest } = data
  const bill: AdminBill = {
    id: `BILL-${Math.random().toString(36).slice(2, 8)}`,
    status: 'unpaid',
    createdAt: new Date().toISOString(),
    deliveryMethod,
    ...rest,
  }
  mockBills.unshift(bill)
  return bill
}

export function updateBillStatus(id: string, status: AdminBill['status']) {
  const bill = mockBills.find((b) => b.id === id)
  if (bill) bill.status = status
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
