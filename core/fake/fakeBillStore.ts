import { promises as fs } from 'fs'
import { join } from 'path'
import type { FastBill } from '@/lib/mock-fast-bills'

const storeDir = join(process.cwd(), 'mock', 'store')
const fastBillPath = join(storeDir, 'fast-bills.json')
const billPath = join(process.cwd(), 'db', 'bill.json')

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as T
  } catch {
    return fallback
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(require('path').dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}

export async function getBill(id: string) {
  const bills = await readJson<any[]>(billPath, [])
  return bills.find(b => b.id === id)
}

export async function addBill(data: any) {
  const bills = await readJson<any[]>(billPath, [])
  const id = Date.now().toString()
  const bill = { id, ...data }
  bills.push(bill)
  await writeJson(billPath, bills)
  return bill
}

export async function listFastBills(): Promise<FastBill[]> {
  return readJson<FastBill[]>(fastBillPath, [])
}

export async function saveFastBills(bills: FastBill[]) {
  await writeJson(fastBillPath, bills)
}

export async function findFastBill(id: string) {
  const bills = await listFastBills()
  return bills.find(b => b.id === id)
}

export async function createFastBill(data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt'>) {
  const bills = await listFastBills()
  const bill: FastBill = {
    ...data,
    id: `FB-${Date.now()}`,
    depositPaid: false,
    createdAt: new Date().toISOString(),
  }
  bills.unshift(bill)
  await saveFastBills(bills)
  return bill
}

export async function updateFastBillDeposit(id: string, paid: boolean) {
  const bills = await listFastBills()
  const idx = bills.findIndex(b => b.id === id)
  if (idx === -1) return false
  bills[idx].depositPaid = paid
  await saveFastBills(bills)
  return true
}

export async function todayFastBillTotal() {
  const bills = await listFastBills()
  const today = new Date().toISOString().slice(0, 10)
  return bills
    .filter(b => b.createdAt.slice(0, 10) === today)
    .reduce((sum, b) => sum + b.total, 0)
}
