import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonFile'

export async function POST(req: Request) {
  const { billId, message } = (await req.json().catch(() => ({}))) as {
    billId?: string
    message?: string
  }
  if (!billId || !message || !message.trim()) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const file = join(process.cwd(), 'mock', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  if (!bill) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  if (!Array.isArray(bill.customerNotes)) bill.customerNotes = []
  bill.customerNotes.push({
    message: message.trim(),
    createdAt: new Date().toISOString(),
    from: 'customer',
  })
  await writeJson(file, bills)
  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const billId = searchParams.get('billId')
  if (!billId) return NextResponse.json({ error: 'missing billId' }, { status: 400 })
  const file = join(process.cwd(), 'mock', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  return NextResponse.json(bill?.customerNotes || [])
}
