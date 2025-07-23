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
  delivered?: boolean
}

interface RawBill {
  id: string
  name: string
  phone: string
  address: string
  delivered?: boolean
}

let bills: FakeBill[] | null = null

async function loadBills(): Promise<FakeBill[]> {
  if (!bills) {
    const data = (await import('../../mock/bills.json')).default as RawBill[]
    bills = data.map((b) => ({
      id: b.id,
      customerName: b.name,
      customerPhone: b.phone,
      customerAddress: b.address,
      delivered: b.delivered,
      items: [],
      statusStep: 1,
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

