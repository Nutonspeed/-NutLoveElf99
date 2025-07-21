import { NextRequest, NextResponse } from 'next/server'
import { addNotification } from '@/lib/notificationLog'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({})) as { phone?: string; message?: string; billId?: string; type?: string }
  const phone = data.phone || '0000000000'
  const message = data.message || 'Your order #123 has been delivered'
  console.log('SMS MOCK', { to: phone, message })
  await addNotification({
    billId: data.billId,
    recipient: phone,
    channel: 'sms',
    message,
    type: data.type,
    time: new Date().toISOString(),
  })
  return NextResponse.json({ success: true })
}
