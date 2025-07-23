import { NextResponse } from 'next/server'
import { updateFastBillAddress } from '@/core/fake/fakeBillStore'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { address } = (await req.json().catch(() => ({}))) as {
    address?: string
  }
  if (!address) {
    return NextResponse.json({ error: 'address required' }, { status: 400 })
  }
  try {
    await updateFastBillAddress(params.id, address)
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
