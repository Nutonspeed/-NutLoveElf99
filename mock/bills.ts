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
    shipping: 50,
    note: '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
]

export const invoiceLinks: Record<string, string> = {}

export function generateInvoiceLink(id: string): string {
  const bill = getBill(id)
  if (!bill) throw new Error('bill not found')
  const link = `https://elfnity.app/invoice-bill/${id}`
  invoiceLinks[id] = link
  return link
}

export function getInvoiceLink(id: string): string | undefined {
  return invoiceLinks[id]
}

export function addBill(data: Omit<AdminBill, 'id' | 'status' | 'createdAt'>): AdminBill {
  const bill: AdminBill = {
    id: generateMockId('bill'),
    status: 'unpaid',
    createdAt: new Date().toISOString(),
    ...data,
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
