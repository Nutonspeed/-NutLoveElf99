import { NextResponse } from 'next/server'
import type { AdminBill } from '@/mock/bills'
import { addBill } from '@/mock/bills'

export async function POST(request: Request) {
  try {
    const data = await request.json() as Omit<AdminBill, 'id' | 'status' | 'createdAt'>
    if (!data.customer || !data.items || !Array.isArray(data.items)) {
      return NextResponse.json({ success: false, error: 'invalid data' }, { status: 400 })
    }
    const bill = addBill(data)
    return NextResponse.json({ success: true, bill })
  } catch (e) {
    console.error('Create invoice error', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
