import { promises as fs } from 'fs'
import { dirname, join } from 'path'
import type { FastBill } from '@/lib/mock-fast-bills'

const file = join(process.cwd(), 'mock', 'store', 'fast-bills.json')

async function ensureFile() {
  try {
    await fs.access(file)
  } catch {
    await fs.mkdir(dirname(file), { recursive: true })
    await fs.writeFile(file, '[]', 'utf8')
  }
}

export async function readFastBills(): Promise<FastBill[]> {
  await ensureFile()
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as FastBill[]
  } catch {
    return []
  }
}

export async function writeFastBills(bills: FastBill[]): Promise<void> {
  await ensureFile()
  await fs.writeFile(file, JSON.stringify(bills, null, 2), 'utf8')
}

export async function addFastBill(
  data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt'>,
): Promise<FastBill> {
  const bills = await readFastBills()
  const bill: FastBill = {
    ...data,
    id: `FB-${Date.now()}`,
    depositPaid: false,
    createdAt: new Date().toISOString(),
  }
  bills.unshift(bill)
  await writeFastBills(bills)
  return bill
}

export async function findFastBill(id: string): Promise<FastBill | undefined> {
  const bills = await readFastBills()
  return bills.find(b => b.id === id)
}

export async function updateFastBillAddress(id: string, address: string) {
  const bills = await readFastBills()
  const idx = bills.findIndex(b => b.id === id)
  if (idx === -1) return
  bills[idx] = { ...bills[idx], customerAddress: address }
  await writeFastBills(bills)
}

export async function getTodayFastTotal(): Promise<number> {
  const bills = await readFastBills()
  const today = new Date().toISOString().slice(0, 10)
  return bills
    .filter(b => b.createdAt.slice(0, 10) === today)
    .reduce((sum, b) => sum + b.total, 0)
}
