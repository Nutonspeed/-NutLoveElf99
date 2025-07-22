import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonStore'
import type { FastBill } from '@/lib/mock-fast-bills'

const file = join(process.cwd(), 'mock', 'store', 'fast-bills.json')

export async function listFastBills(): Promise<FastBill[]> {
  return await readJson<FastBill[]>(file, [])
}

export async function createFastBill(
  data: Omit<FastBill, 'id' | 'depositPaid' | 'createdAt'>,
): Promise<FastBill> {
  const bills = await listFastBills()
  const bill: FastBill = {
    ...data,
    id: `FB-${Date.now()}`,
    depositPaid: false,
    createdAt: new Date().toISOString(),
  }
  bills.unshift(bill)
  await writeJson(file, bills)
  return bill
}

export async function getFastBill(id: string): Promise<FastBill | undefined> {
  const bills = await listFastBills()
  return bills.find(b => b.id === id)
}

export async function getTodayTotal(): Promise<number> {
  const bills = await listFastBills()
  const today = new Date().toISOString().slice(0, 10)
  return bills
    .filter(b => b.createdAt.slice(0, 10) === today)
    .reduce((sum, b) => sum + b.total, 0)
}


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

export async function updateBillAddress(id: string, address: string) {
  const idx = fakeBills.findIndex(b => b.id === id)
  if (idx === -1) return
  fakeBills[idx] = { ...fakeBills[idx], customerAddress: address }
  await writeJson(file, fakeBills as any)
}
