import { NextRequest, NextResponse } from 'next/server'
import {
  addBillFeedback,
  getBillFeedback,
  updateFeedback,
  getFeedbackById,
} from '@/lib/feedbackStore'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({})) as { billId?: string; rating?: number; message?: string }
  if (!data.billId || !data.rating) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
  await addBillFeedback({
    billId: data.billId,
    rating: Number(data.rating),
    message: data.message || undefined,
    timestamp: new Date().toISOString(),
  })
  return NextResponse.json({ success: true })
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id') || undefined
  const billId = url.searchParams.get('billId') || undefined
  if (id) {
    const entry = await getFeedbackById(id)
    return NextResponse.json({ success: true, feedback: entry })
  }
  const list = await getBillFeedback(billId)
  return NextResponse.json({ success: true, feedback: list })
}

export async function PUT(req: NextRequest) {
  const data = await req.json().catch(() => ({}))
  if (!data.id) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
  const fb = await updateFeedback(data.id, data)
  return NextResponse.json({ success: true, feedback: fb })
}
