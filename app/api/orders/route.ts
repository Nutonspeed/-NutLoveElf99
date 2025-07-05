import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_name, customer_contact, items, discount = 0, deposit = 0, note = '' } = body

    if (!customer_name || !customer_contact || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'invalid data' }, { status: 400 })
    }

    const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0)
    const total = subtotal - Number(discount) - Number(deposit)

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name,
        customer_contact,
        items,
        subtotal,
        discount,
        deposit,
        total,
        note
      })
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json({ error: error?.message || 'insert failed' }, { status: 500 })
    }

    return NextResponse.json({ order: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
