import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonFile'

export async function POST(req: Request) {
  const { billId, newStatus } = (await req.json().catch(() => ({}))) as {
    billId?: string
    newStatus?: string
  }

  if (!billId || !newStatus) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const file = join(process.cwd(), 'mock', 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === billId)
  if (!bill) return NextResponse.json({ error: 'not found' }, { status: 404 })

  bill.status = newStatus
  await writeJson(file, bills)
  return NextResponse.json(bill)
}
