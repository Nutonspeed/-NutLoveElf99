import { NextResponse } from 'next/server'
import { getBill } from '@/core/fake/fakeBillStore'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const bill = await getBill(params.id)
  if (!bill) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(bill)
}
