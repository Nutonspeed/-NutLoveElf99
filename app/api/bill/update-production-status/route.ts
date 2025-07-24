import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/server/jsonFile'
import type { ProductionStatus } from '@/core/mock/fakeBillDB'

export async function PATCH(req: Request) {
  const { billId, newStatus } = (await req.json().catch(() => ({}))) as {
    billId?: string
    newStatus?: ProductionStatus
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
  bill.productionStatus = newStatus
  if (!bill.productionTimeline) bill.productionTimeline = []
  bill.productionTimeline.push({ step: newStatus, timestamp: new Date().toISOString() })
  await writeJson(file, bills)
  return NextResponse.json(bill)
}
