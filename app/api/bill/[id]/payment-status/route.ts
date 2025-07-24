import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/server/jsonFile'
import { addNotification } from '@/lib/notificationLog'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json().catch(() => ({ status: '' })) as {
    status?: 'paid' | 'unpaid' | 'partial'
  }
  if (!status) {
    return NextResponse.json({ error: 'status required' }, { status: 400 })
  }
  const dir = join(process.cwd(), 'mock', 'store')
  const file = join(dir, 'bills.json')
  const bills = await readJson<any[]>(file, [])
  const bill = bills.find(b => b.id === params.id)
  if (!bill) return NextResponse.json({ error: 'not found' }, { status: 404 })
  bill.paymentStatus = status
  await writeJson(file, bills)

  await addNotification({
    billId: params.id,
    recipient: bill.customer || 'unknown',
    channel: 'line',
    message: `Payment status updated to ${status}`,
    type: 'payment',
    time: new Date().toISOString(),
  })

  // trigger followup mock
  try {
    await fetch(`${process.env.APP_URL || 'http://localhost:3000'}/api/notify/followup`, { method: 'POST' })
  } catch {
    // ignore
  }

  return NextResponse.json({ success: true })
}
