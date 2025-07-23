import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonStore'
import type { FakeBill, BillComment } from './types'
import type { FastBill } from '@/lib/mock-fast-bills'

const fastFile = join(process.cwd(), 'mock', 'store', 'fast-bills.json')
const billFile = join(process.cwd(), 'mock', 'store', 'fake-bills.json')

async function readFast(): Promise<FastBill[]> {
  return readJson<FastBill[]>(fastFile, [])
}
async function writeFast(data: FastBill[]) {
  await writeJson(fastFile, data)
}

export async function listFastBills(): Promise<FastBill[]> {
  return readFast()
}

export async function createFastBill(
  data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt'>,
): Promise<FastBill> {
  const bills = await readFast()
  const bill: FastBill = {
    ...data,
    id: `FB-${Date.now()}`,
    depositPaid: false,
    createdAt: new Date().toISOString(),
  }
  bills.unshift(bill)
  await writeFast(bills)
  return bill
}

export async function getFastBill(id: string): Promise<FastBill | undefined> {
  const bills = await readFast()
  return bills.find(b => b.id === id)
}

export async function getTodayTotal(): Promise<number> {
  const bills = await readFast()
  const today = new Date().toISOString().slice(0, 10)
  return bills
    .filter(b => b.createdAt.slice(0, 10) === today)
    .reduce((sum, b) => sum + b.total, 0)
}

async function readBills(): Promise<FakeBill[]> {
  return readJson<FakeBill[]>(billFile, [])
}
async function writeBills(data: FakeBill[]) {
  await writeJson(billFile, data)
}

export async function getBillById(id: string): Promise<FakeBill | undefined> {
  const bills = await readBills()
  return bills.find(b => b.id === id)
}

export async function updateBillAddress(
  id: string,
  info: { name?: string; phone?: string; address?: string },
) {
  const bills = await readBills()
  const idx = bills.findIndex(b => b.id === id)
  if (idx === -1) return
  bills[idx] = {
    ...bills[idx],
    customerName: info.name ?? bills[idx].customerName,
    customerPhone: info.phone ?? bills[idx].customerPhone,
    customerAddress: info.address ?? bills[idx].customerAddress,
  }
  await writeBills(bills)
}

export async function addBillComment(id: string, message: string): Promise<BillComment | undefined> {
  const bills = await readBills()
  const idx = bills.findIndex(b => b.id === id)
  if (idx === -1) return
  const comment: BillComment = {
    id: `${Date.now()}`,
    message,
    timestamp: new Date().toISOString(),
  }
  bills[idx].comments = bills[idx].comments || []
  bills[idx].comments!.push(comment)
  await writeBills(bills)
  return comment
}
