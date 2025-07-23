import { NextResponse } from 'next/server'
import { updateFastBillDeposit } from '@/core/fake/fakeBillStore'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { paid } = await req.json().catch(() => ({ paid: undefined })) as { paid?: boolean }
  if (typeof paid !== 'boolean') {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  const ok = await updateFastBillDeposit(params.id, paid)
  if (!ok) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
