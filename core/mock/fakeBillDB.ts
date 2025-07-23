export type BillStatus =
  | 'waiting'
  | 'cutting'
  | 'sewing'
  | 'packing'
  | 'shipped'
  | 'delivering'
  | 'delivered'

export type ProductionStatus =
  | 'waiting'
  | 'cutting'
  | 'sewing'
  | 'packing'
  | 'shipped'
  | 'done'

export interface FakeBillItem {
  fabricName: string
  sofaType: string
  quantity: number
  unitPrice: number
  image?: string
}

export interface FakeBill {
  id: string
  shortCode: string
  customerId: string
  customerName: string
  customerAddress: string
  customerPhone: string
  items: FakeBillItem[]
  status: BillStatus
  productionStatus: ProductionStatus
  productionTimeline: { step: ProductionStatus; timestamp: string }[]
  statusStep: number
  lastUpdated: string
  note?: string
  estimatedTotal: number
  delivered?: boolean
  deliveryDate?: string
  deliveredAt?: string
  trackingNo?: string
  carrier?: string
  customerNotes?: { message: string; createdAt: string; from: string }[]
}

interface RawBill {
  id: string
  shortCode?: string
  customerId: string
  delivered?: boolean
  status: BillStatus
  productionStatus?: ProductionStatus
  productionTimeline?: { step: ProductionStatus; timestamp: string }[]
  deliveryDate?: string
  deliveredAt?: string
  trackingNo?: string
  carrier?: string
  notes?: string
  customerNotes?: { message: string; createdAt: string; from: string }[]
}

let bills: FakeBill[] | null = null
const shortMap: Record<string, string> = {}

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
      delivering: 4,
      delivered: 5,
    }
    bills = data.map((b) => {
      const c = customerMap.get(b.customerId)
      const shortCode = b.shortCode || `BILL${Date.now()}`
      shortMap[shortCode] = b.id
      return {
        id: b.id,
        shortCode,
        customerId: b.customerId,
        customerName: c?.name || '',
        customerPhone: c?.phone || '',
        customerAddress: c?.address || '',
        delivered: b.delivered,
        status: b.status,
        productionStatus: b.productionStatus ?? 'waiting',
        productionTimeline: b.productionTimeline ?? [],
        deliveryDate: b.deliveryDate,
        deliveredAt: b.deliveredAt,
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

export async function getBillIdByShortCode(code: string): Promise<string | undefined> {
  await loadBills()
  return shortMap[code]
}

export async function getBillByShortCode(code: string): Promise<FakeBill | undefined> {
  const id = await getBillIdByShortCode(code)
  return id ? getBillById(id) : undefined
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

export async function updateProductionStatus(
  id: string,
  status: ProductionStatus,
) {
  const list = await loadBills()
  const idx = list.findIndex((b) => b.id === id)
  if (idx === -1) return
  list[idx] = {
    ...list[idx],
    productionStatus: status,
    productionTimeline: [
      ...list[idx].productionTimeline,
      { step: status, timestamp: new Date().toISOString() },
    ],
  }
}

