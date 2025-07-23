import { NextResponse } from 'next/server'
import { updateBillAddress } from '@/core/fake/fakeBillStore'

export async function POST(
  req: Request,
  { params }: { params: { billId: string } },
) {
  const data = (await req.json().catch(() => ({}))) as {
    name?: string
    phone?: string
    address?: string
  }
  if (!data.address) {
    return NextResponse.json({ error: 'address required' }, { status: 400 })
  }
  try {
    await updateBillAddress(params.billId, data)
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
