import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/server/jsonFile'

export async function POST(req: Request) {
  const { billId, amountTransferred, transferDate, transferSlipUrl, customerNote } = (await req.json().catch(() => ({}))) as {
    billId?: string
    amountTransferred?: number
    transferDate?: string
    transferSlipUrl?: string
    customerNote?: string
  }
  if (!billId || !transferDate || !transferSlipUrl || typeof amountTransferred !== 'number') {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  const file = join(process.cwd(), 'mock', 'store', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  if (!bill) return NextResponse.json({ error: 'not found' }, { status: 404 })
  bill.confirmation = { amountTransferred, transferDate, transferSlipUrl, customerNote }
  if (Array.isArray(bill.productionTimeline)) {
    bill.productionTimeline.push({
      status: 'payment-confirmed-by-customer',
      timestamp: new Date().toISOString(),
      by: 'customer',
    })
  }
  await writeJson(file, bills)
  return NextResponse.json({ success: true })
}
