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
