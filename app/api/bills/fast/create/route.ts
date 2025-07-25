import { NextResponse } from 'next/server'
import { addFastBill } from '@/core/fake/fakeBillStore'

export async function POST(req: Request) {
  const data = await req.json()
  if (!data) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const bill = await addFastBill(data)
  return NextResponse.json(bill)
}
