import { NextResponse } from 'next/server'
import { addBillComment } from '@/core/fake/fakeBillStore'

export async function POST(
  req: Request,
  { params }: { params: { billId: string } },
) {
  const { message } = (await req.json().catch(() => ({}))) as { message?: string }
  if (!message) {
    return NextResponse.json({ error: 'message required' }, { status: 400 })
  }
  try {
    const comment = await addBillComment(params.billId, message)
    if (!comment) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json(comment)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
