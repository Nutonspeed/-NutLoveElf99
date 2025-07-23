export interface FakeBillItem {
  fabricName: string
  sofaType: string
  quantity: number
  unitPrice: number
  image?: string
}

export interface BillComment {
  id: string
  message: string
  timestamp: string
}

export interface FakeBill {
  id: string
  customerName: string
  customerAddress: string
  customerPhone: string
  items: FakeBillItem[]
  status: 'draft' | 'cutting' | 'sewing' | 'packed' | 'shipped'
  lastUpdated: string
  note?: string
  estimatedTotal: number
  comments?: BillComment[]
}
