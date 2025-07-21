import { mockNotificationService } from './mock-notification-service'
import { sendSms } from './smsNotify'

export async function notifyCustomer(phone: string, trackingNumber: string): Promise<boolean> {
  const mode = process.env.NOTIFY_MODE
  const message = `\ud83d\ude9a \u0e1e\u0e31\u0e2a\u0e14\u0e38\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e16\u0e39\u0e01\u0e08\u0e31\u0e14\u0e2a\u0e48\u0e07\u0e41\u0e25\u0e49\u0e27 Tracking: ${trackingNumber} \u2013 \u0e02\u0e2d\u0e1a\u0e04\u0e38\u0e13\u0e04\u0e48\u0e30`

  if (mode === 'sms') {
    return sendSms(phone, message)
  }

  return mockNotificationService.sendNotification({
    type: 'order_updated',
    recipient: { phone },
    data: { trackingNumber },
    priority: 'normal',
  })
}
