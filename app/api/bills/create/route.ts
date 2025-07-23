import { NextResponse } from 'next/server'
import { createFastBill } from '@/core/fake/fakeBillStore'
import { getFabrics } from '@/core/mock/store'

const required = ['customerName', 'fabricName', 'sofaType', 'quantity', 'tags'] as const

export async function POST(req: Request) {
  let data: any
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  if (!data) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  for (const field of required) {
    if (data[field] === undefined || data[field] === null || (Array.isArray(data[field]) && data[field].length === 0) || data[field] === '') {
      return NextResponse.json({ error: `missing field: ${field}` }, { status: 400 })
    }
  }

  const fabric = getFabrics().find(
    f => f.name === data.fabricName || f.id === data.fabricId,
  )
  const price = fabric?.price ?? 0
  const bill = await createFastBill({ ...data, total: price * Number(data.quantity || 1) })
  return NextResponse.json(bill)
}
