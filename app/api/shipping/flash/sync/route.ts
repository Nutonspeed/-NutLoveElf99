import { NextResponse } from 'next/server'
import { syncShippingStatuses } from '@/lib/shippingStatusStore'

export async function POST(req: Request) {
  const body = await req.json()
  const ids: string[] = Array.isArray(body?.ids) ? body.ids : []
  const records = await syncShippingStatuses(ids, 'Flash')
  return NextResponse.json({ statuses: records })
}
