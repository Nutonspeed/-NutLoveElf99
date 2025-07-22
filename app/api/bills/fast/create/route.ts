import { NextResponse } from 'next/server'
import { createFastBill } from '@/core/mock/fakeBillDB'

export async function POST(req: Request) {
  const data = await req.json()
  if (!data) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const bill = await createFastBill(data)
  return NextResponse.json(bill)
}
