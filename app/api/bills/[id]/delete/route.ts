import { NextResponse } from 'next/server'
import { softDeleteBill } from '@/lib/deletedBills'
import { saveUndo } from '@/lib/undoStore'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { reason } = await req.json().catch(() => ({ reason: '' }))
  const ok = await softDeleteBill(params.id, reason)
  if (ok) {
    await saveUndo({ type: 'delete-bill', payload: { id: params.id } })
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'not found' }, { status: 404 })
}
