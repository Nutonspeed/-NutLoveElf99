import { NextRequest, NextResponse } from 'next/server'
import { addNotification } from '@/lib/notificationLog'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({})) as { recipient?: string; message?: string; billId?: string; type?: string }
  const recipient = data.recipient || 'mock-user'
  const message = data.message || 'Your order #123 has been delivered'
  console.log('LINE MOCK', { to: recipient, message })
  await addNotification({
    billId: data.billId,
    recipient,
    channel: 'line',
    message,
    type: data.type,
    time: new Date().toISOString(),
  })
  return NextResponse.json({ success: true })
}
