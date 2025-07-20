import { NextResponse } from 'next/server'
import { getOrders, addOrder } from '@/core/mock/store'
import type { Order } from '@/types/order'

export async function GET() {
  return NextResponse.json(getOrders())
}

export async function POST(req: Request) {
  try {
    const data: Order = await req.json()
    addOrder(data)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Add order error', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
