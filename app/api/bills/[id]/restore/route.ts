import { NextResponse } from 'next/server'
import { restoreBill } from '@/lib/deletedBills'
import { saveUndo } from '@/lib/undoStore'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const ok = await restoreBill(params.id)
  if (ok) {
    await saveUndo({ type: 'restore-bill', payload: { id: params.id } })
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'not found' }, { status: 404 })
}
