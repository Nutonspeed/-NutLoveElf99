import { NextResponse } from 'next/server'
import { updateBillContact } from '@/core/mock/fakeBillDB'

export async function POST(
  req: Request,
  { params }: { params: { billId: string } },
) {
  const { name, phone, address } = (await req.json().catch(() => ({}))) as {
    name?: string
    phone?: string
    address?: string
  }
  if (!name || !phone || !address) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  try {
    await updateBillContact(params.billId, { name, phone, address })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
