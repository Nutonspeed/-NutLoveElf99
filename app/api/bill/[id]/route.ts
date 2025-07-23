import { NextResponse } from 'next/server'
import { getBillById } from '@/core/fake/fakeBillStore'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const bill = await getBillById(params.id)
    if (!bill) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(bill)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
