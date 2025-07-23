import { NextResponse } from 'next/server'
import { getBillById } from '@/core/mock/fakeBillDB'

export async function GET(req: Request, { params }: { params: { billId: string } }) {
  const bill = await getBillById(params.billId)
  if (!bill) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  return NextResponse.json(bill)
}
