import { NextResponse } from 'next/server'
import { addBillFeedback } from '@/lib/feedbackStore'

export async function POST(req: Request) {
  const { billId, message } = (await req.json().catch(() => ({}))) as {
    billId?: string
    message?: string
  }
  if (!billId || !message) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
  await addBillFeedback({
    billId,
    rating: 0,
    message,
    timestamp: new Date().toISOString(),
  })
  return NextResponse.json({ success: true })
}
