import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/server/jsonFile'
import type { BillStatus } from '@/core/mock/fakeBillDB'

export async function PATCH(req: Request) {
  const { billId, newStatus } = (await req.json().catch(() => ({}))) as {
    billId?: string
    newStatus?: BillStatus
  }
  if (!billId || !newStatus) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  const file = join(process.cwd(), 'mock', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  if (!bill) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  bill.status = newStatus
  await writeJson(file, bills)
  return NextResponse.json(bill)
}
