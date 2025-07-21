import { NextResponse } from 'next/server'
import { sendSms } from '@/lib/smsNotify'

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()
    const to = phone || '0890000000'
    const success = await sendSms(to, 'Test SMS from NutLoveStore')
    console.log('send-sms-test', to, success)
    return NextResponse.json({ success })
  } catch (e) {
    console.error('send-sms-test error', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
