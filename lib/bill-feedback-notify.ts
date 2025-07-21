import { sendSms } from './smsNotify'
import { mockNotificationService } from './mock-notification-service'

export async function sendFeedbackRequest(billId: string, phone: string) {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/receipt/${billId}#feedback`
  const message = `ขอบคุณที่ใช้บริการ หากสะดวก ฝากรีวิวให้เราได้ที่นี่ 🙏 ${url}`
  const mode = process.env.NOTIFY_MODE
  if (mode === 'sms') {
    return sendSms(phone, message)
  }
  return mockNotificationService.sendNotification({
    type: 'feedback_request',
    recipient: { phone },
    data: { billId },
    priority: 'normal',
  })
}
