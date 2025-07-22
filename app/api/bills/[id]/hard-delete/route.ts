import { NextResponse } from 'next/server'
import { hardDeleteBill } from '@/lib/deletedBills'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const ok = await hardDeleteBill(params.id)
  if (ok) return NextResponse.json({ success: true })
  return NextResponse.json({ error: 'not found' }, { status: 404 })
}
