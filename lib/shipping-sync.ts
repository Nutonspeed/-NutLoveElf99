import { shippingOrders, updateDeliveryStatus } from '@/mock/shipping'
import { mockNotificationService } from './mock-notification-service'

export interface ShippingSyncLog {
  id: string
  time: string
  result: string
}

const LOG_KEY = 'shipping_sync_logs'

export let shippingSyncLogs: ShippingSyncLog[] = []

export function loadShippingSyncLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LOG_KEY)
    if (stored) shippingSyncLogs = JSON.parse(stored)
  }
}

function saveLogs() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOG_KEY, JSON.stringify(shippingSyncLogs))
  }
}

export function runShippingSync(): ShippingSyncLog {
  let updated = 0
  shippingOrders.forEach(o => {
    if (o.deliveryStatus === 'shipping' && Math.random() > 0.6) {
      updateDeliveryStatus(o.id, 'delivered')
      mockNotificationService.sendNotification({
        type: 'order_updated',
        recipient: { phone: o.phone },
        data: { orderId: o.id, status: 'delivered' },
        priority: 'normal',
      })
      updated++
    }
  })
  const log: ShippingSyncLog = {
    id: Date.now().toString(),
    time: new Date().toISOString(),
    result: `Updated ${updated} orders`,
  }
  shippingSyncLogs.unshift(log)
  saveLogs()
  return log
}
