import { NextResponse } from 'next/server'
import { listFastBills } from '@/core/mock/fakeBillDB'

export async function GET(req: Request) {
  const bills = await listFastBills()
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const filtered = q
    ? bills.filter(b => b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q))
    : bills
  return NextResponse.json(filtered)
}
