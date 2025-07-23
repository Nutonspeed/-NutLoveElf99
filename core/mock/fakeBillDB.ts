export interface FakeBillItem {
  fabricName: string
  sofaType: string
  quantity: number
  unitPrice: number
  image?: string
}

export interface FakeBill {
  id: string
  customerName: string
  customerAddress: string
  customerPhone: string
  items: FakeBillItem[]
  statusStep: number
  lastUpdated: string
  note?: string
  estimatedTotal: number
}

const fakeBills: FakeBill[] = [
  {
    id: 'B001',
    customerName: 'สมชาย ใจดี',
    customerAddress: '123 ถนนสายม็อค กรุงเทพฯ',
    customerPhone: '0812345678',
    items: [
      {
        fabricName: 'Cotton',
        sofaType: 'L-Shape',
        quantity: 1,
        unitPrice: 2500,
        image: '/placeholder.svg',
      },
    ],
    statusStep: 1,
    lastUpdated: '2024-06-01',
    note: 'รอชำระหลังตรวจสอบขนาด',
    estimatedTotal: 2500,
  },
]

export async function getBillById(id: string): Promise<FakeBill | undefined> {
  return fakeBills.find(b => b.id === id)
}
