import { NextResponse } from 'next/server'
import { updateBillAddress } from '@/core/mock/fakeBillDB'

export async function POST(req: Request) {
  const { billId, name, phone, address } = (await req.json().catch(() => ({}))) as {
    billId?: string
    name?: string
    phone?: string
    address?: string
  }

  if (!billId || !name || !phone || !address) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  try {
    await updateBillAddress(billId, { name, phone, address })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
