export interface SimpleOrder {
  id: string
  customer: string
  status: 'รอชำระ' | 'ส่งแล้ว' | 'กำลังแพ็ค'
  total: number
  date: string
}

export const orders: SimpleOrder[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    status: 'ส่งแล้ว',
    total: 2990,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    status: 'รอชำระ',
    total: 3980,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    status: 'กำลังแพ็ค',
    total: 1500,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
