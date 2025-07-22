import { NextResponse } from 'next/server'
import { addNotification } from '@/lib/notificationLog'

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({})) as { count?: number }
  const count = data.count ?? 0
  if (count > 0) {
    await addNotification({
      recipient: 'admin',
      channel: 'line',
      message: `พบบิลค้างชำระ ${count} รายการยังไม่ได้ติดตามภายใน 48 ชม.`,
      type: 'unpaid-followup',
      time: new Date().toISOString(),
    })
  }
  return NextResponse.json({ success: true })
}
