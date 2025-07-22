import { NextResponse } from 'next/server'
import { loadUndo, clearUndo } from '@/lib/undoStore'
import { restoreBill, softDeleteBill } from '@/lib/deletedBills'

export async function POST() {
  const entry = await loadUndo()
  if (!entry) return NextResponse.json({ error: 'no action' }, { status: 404 })
  if (entry.type === 'delete-bill') {
    await restoreBill(entry.payload.id)
  } else if (entry.type === 'restore-bill') {
    await softDeleteBill(entry.payload.id)
  }
  await clearUndo()
  return NextResponse.json({ success: true })
}
