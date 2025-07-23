export type BillStatus =
  | 'waiting'
  | 'cutting'
  | 'sewing'
  | 'packing'
  | 'shipped'
  | 'delivered'

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
  status: BillStatus
  statusStep: number
  lastUpdated: string
  note?: string
  estimatedTotal: number
  delivered?: boolean
  deliveryDate?: string
  trackingNo?: string
}

interface RawBill {
  id: string
  name: string
  phone: string
  address: string
  delivered?: boolean
  status: BillStatus
  deliveryDate?: string
  trackingNo?: string
  notes?: string
}

let bills: FakeBill[] | null = null

async function loadBills(): Promise<FakeBill[]> {
  if (!bills) {
    const data = (await import('../../mock/bills.json')).default as RawBill[]
    const stepMap: Record<BillStatus, number> = {
      waiting: 0,
      cutting: 1,
      sewing: 2,
      packing: 3,
      shipped: 4,
      delivered: 5,
    }
    bills = data.map((b) => ({
      id: b.id,
      customerName: b.name,
      customerPhone: b.phone,
      customerAddress: b.address,
      delivered: b.delivered,
      status: b.status,
      deliveryDate: b.deliveryDate,
      trackingNo: b.trackingNo,
      note: b.notes,
      items: [],
      statusStep: stepMap[b.status] ?? 0,
      lastUpdated: '',
      estimatedTotal: 0,
    }))
  }
  return bills
}

export async function getBillById(id: string): Promise<FakeBill | undefined> {
  const list = await loadBills()
  return list.find((b) => b.id === id)
}

export async function updateBillAddress(
  id: string,
  data: { name: string; phone: string; address: string },
) {
  const list = await loadBills()
  const idx = list.findIndex((b) => b.id === id)
  if (idx === -1) return
  list[idx] = {
    ...list[idx],
    customerName: data.name,
    customerPhone: data.phone,
    customerAddress: data.address,
  }
}

