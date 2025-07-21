import { mockNotificationService } from './mock-notification-service'
import { sendSms } from './smsNotify'
import { sendLineMessage } from './lineNotify'

export interface NotifyCustomerOptions {
  to?: string
  status: string
  tracking?: string
  provider?: 'Flash' | 'Kerry'
}

export async function notifyCustomer(opts: NotifyCustomerOptions): Promise<boolean> {
  const recipient = opts.to || process.env.LINE_DEFAULT_RECIPIENT_ID || ''
  const parts = [
    '📦 แจ้งเตือนสถานะคำสั่งซื้อ',
    `สถานะ: ${opts.status}`,
  ]

  if (opts.tracking) {
    parts.push(`🔎 Tracking: ${opts.tracking}`)
    if (opts.provider) {
      const url =
        opts.provider === 'Flash'
          ? `https://www.flashexpress.com/fle/tracking/${opts.tracking}`
          : `https://th.kerryexpress.com/th/track/?track=${opts.tracking}`
      parts.push(url)
    }
  }

  const message = parts.join('\n')
  const mode = process.env.NOTIFY_MODE
  if (mode === 'line') {
    return sendLineMessage(recipient, message)
  }
  if (mode === 'sms') {
    return sendSms(opts.to || '', message)
  }

  return mockNotificationService.sendNotification({
    type: 'order_updated',
    recipient: { phone: opts.to },
    data: { trackingNumber: opts.tracking },
    priority: 'normal',
  })
}
