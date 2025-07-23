import { promises as fs } from 'fs'
import { dirname, join } from 'path'

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

const file = join(process.cwd(), 'mock', 'bills.json')

async function ensureFile() {
  try {
    await fs.access(file)
  } catch {
    await fs.mkdir(dirname(file), { recursive: true })
    await fs.writeFile(file, '[]', 'utf8')
  }
}

async function readBills(): Promise<FakeBill[]> {
  await ensureFile()
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as FakeBill[]
  } catch {
    return []
  }
}

async function writeBills(bills: FakeBill[]): Promise<void> {
  await ensureFile()
  await fs.writeFile(file, JSON.stringify(bills, null, 2), 'utf8')
}

export async function getBillById(id: string): Promise<FakeBill | undefined> {
  const bills = await readBills()
  return bills.find(b => b.id === id)
}

export async function updateBillAddress(
  id: string,
  data: { name: string; phone: string; address: string },
) {
  const bills = await readBills()
  const idx = bills.findIndex(b => b.id === id)
  if (idx === -1) return
  bills[idx] = {
    ...bills[idx],
    customerName: data.name,
    customerPhone: data.phone,
    customerAddress: data.address,
  }
  await writeBills(bills)
}
