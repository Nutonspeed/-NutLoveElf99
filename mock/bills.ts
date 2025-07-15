export interface AdminBill {
  id: string
  customer: string
  items: string
  note: string
  status: 'unpaid' | 'paid' | 'cancelled'
  createdAt: string
}

export const mockBills: AdminBill[] = [
  {
    id: 'BILL-001',
    customer: 'สมชาย ใจดี',
    items: 'ผ้าคลุมโซฟา 1 ชิ้น',
    note: '',
    status: 'unpaid',
    createdAt: new Date().toISOString(),
  },
]

export function addBill(data: Omit<AdminBill, 'id' | 'status' | 'createdAt'>): AdminBill {
  const bill: AdminBill = {
    id: `BILL-${Math.random().toString(36).slice(2, 8)}`,
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
