import { NextResponse } from 'next/server'
import { findFastBill } from '@/core/fake/fakeBillStore'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  try {
    const found = await findFastBill(id)
    if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(found)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
