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
  customerId: string
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
  carrier?: string
  customerNotes?: { message: string; createdAt: string; from: string }[]
}

interface RawBill {
  id: string
  customerId: string
  delivered?: boolean
  status: BillStatus
  deliveryDate?: string
  trackingNo?: string
  carrier?: string
  notes?: string
  customerNotes?: { message: string; createdAt: string; from: string }[]
}

let bills: FakeBill[] | null = null

async function loadBills(): Promise<FakeBill[]> {
  if (!bills) {
    const data = (await import('../../mock/bills.json')).default as RawBill[]
    const customers = (await import('../../mock/customers.json')).default as any[]
    const customerMap = new Map(customers.map((c: any) => [c.id, c]))
    const stepMap: Record<BillStatus, number> = {
      waiting: 0,
      cutting: 1,
      sewing: 2,
      packing: 3,
      shipped: 4,
      delivered: 5,
    }
    bills = data.map((b) => {
      const c = customerMap.get(b.customerId)
      return {
        id: b.id,
        customerId: b.customerId,
        customerName: c?.name || '',
        customerPhone: c?.phone || '',
        customerAddress: c?.address || '',
        delivered: b.delivered,
        status: b.status,
        deliveryDate: b.deliveryDate,
        trackingNo: b.trackingNo,
        carrier: b.carrier,
        note: b.notes,
        customerNotes: b.customerNotes || [],
        items: [],
        statusStep: stepMap[b.status] ?? 0,
        lastUpdated: '',
        estimatedTotal: 0,
      }
    })
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

