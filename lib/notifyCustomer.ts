import type { ShippingOrder } from '@/mock/shipping'
import { addNotificationLog } from '@/mock/notifications'

export type NotifyEvent = 'delivered' | 'shipped' | 'cancelled'

export function notifyCustomer(bill: ShippingOrder, event: NotifyEvent) {
  const message = `สวัสดีค่ะ คุณ ${bill.name} พัสดุของคุณถูกจัดส่งเรียบร้อยแล้ว 🎉\nTracking: ${bill.tracking || '-'} โดย ${bill.provider || '-'}`
  console.log('[LINE OA]', message)
  console.log('[SMS]', message)
  console.log('[Email]', message)
  addNotificationLog(bill.id, message)
}
