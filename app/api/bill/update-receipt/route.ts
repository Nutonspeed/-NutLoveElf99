import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/server/jsonFile'

export async function POST(req: Request) {
  const { billId, receiptUrl, receiptNote } = (await req.json().catch(() => ({}))) as {
    billId?: string
    receiptUrl?: string
    receiptNote?: string
  }
  if (!billId || !receiptUrl) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  const file = join(process.cwd(), 'mock', 'store', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  if (!bill) return NextResponse.json({ error: 'not found' }, { status: 404 })

  bill.receiptUrl = receiptUrl
  bill.receiptNote = receiptNote
  if (Array.isArray(bill.productionTimeline)) {
    bill.productionTimeline.push({
      status: 'receipt-attached',
      timestamp: new Date().toISOString(),
      by: 'admin',
    })
  }
  await writeJson(file, bills)

  return NextResponse.json({ success: true })
}
