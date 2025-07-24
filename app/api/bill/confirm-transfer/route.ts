import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonFile'

export async function POST(req: Request) {
  const { billId, bank, time, amount, note } = (await req.json().catch(() => ({}))) as {
    billId?: string
    bank?: string
    time?: string
    amount?: number
    note?: string
  }

  if (!billId || !bank || !time || typeof amount !== 'number') {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const file = join(process.cwd(), 'mock', 'store', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  if (!bill) return NextResponse.json({ error: 'not found' }, { status: 404 })

  bill.transferConfirmation = { bank, time, amount, note }
  bill.status = 'แจ้งโอนแล้ว'

  await writeJson(file, bills)

  return NextResponse.json({ success: true })
}
