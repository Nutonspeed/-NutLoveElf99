import { NextRequest, NextResponse } from 'next/server'
import { sendLineMessage } from '@/lib/lineNotify'

export async function POST(req: NextRequest) {
  try {
    const { to, message } = await req.json()
    const recipient = to || process.env.LINE_DEFAULT_RECIPIENT_ID
    const ok = await sendLineMessage(recipient || '', message || 'test')
    return NextResponse.json({ success: ok })
  } catch (err) {
    console.error('send-line-test error', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
