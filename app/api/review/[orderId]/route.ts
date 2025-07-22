import { NextRequest, NextResponse } from 'next/server'
import { addReview, getReviews } from '@/lib/reviewStore'

export async function GET(_req: NextRequest, { params }: { params: { orderId: string } }) {
  const list = await getReviews(params.orderId)
  return NextResponse.json(list[0] || {})
}

export async function POST(req: NextRequest, { params }: { params: { orderId: string } }) {
  const data = await req.json().catch(() => null)
  if (!data || typeof data.rating !== 'number') {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }
  const ok = await addReview({
    orderId: params.orderId,
    rating: data.rating,
    comment: data.comment || '',
    image: data.image || undefined,
    createdAt: new Date().toISOString(),
  })
  return NextResponse.json({ success: ok })
}
