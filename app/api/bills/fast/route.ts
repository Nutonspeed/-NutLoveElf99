import { NextResponse } from 'next/server'
import { readFastBills } from '@/core/fake/fakeBillStore'

export async function GET(req: Request) {
  const bills = await readFastBills()
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const filtered = q
    ? bills.filter(b => b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q))
    : bills
  return NextResponse.json(filtered)
}
