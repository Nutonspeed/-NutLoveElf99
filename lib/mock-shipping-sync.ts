export interface ShippingSyncLog {
  id: string
  timestamp: string
  result: string
}

import { mockOrders } from './mock-orders'
import { mockNotificationService } from './mock-notification-service'

export let shippingSyncLogs: ShippingSyncLog[] = []

const KEY = 'shippingSyncLogs'

export function loadShippingSyncLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(KEY)
    if (stored) shippingSyncLogs = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(shippingSyncLogs))
  }
}

export async function syncShippingStatus() {
  const updates: string[] = []
  for (const order of mockOrders) {
    if (order.shipping_status === 'pending') {
      order.shipping_status = 'shipped'
      updates.push(`${order.id} -> shipped`)
      await mockNotificationService.sendNotification({
        type: 'order_updated',
        recipient: { email: order.customerEmail || undefined },
        data: { orderId: order.id, status: 'shipped' },
        priority: 'normal',
      })
    } else if (order.shipping_status === 'shipped') {
      order.shipping_status = 'delivered'
      updates.push(`${order.id} -> delivered`)
      await mockNotificationService.sendNotification({
        type: 'order_updated',
        recipient: { email: order.customerEmail || undefined },
        data: { orderId: order.id, status: 'delivered' },
        priority: 'normal',
      })
    }
  }
  const result = updates.length ? updates.join(', ') : 'No change'
  shippingSyncLogs.unshift({
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    result,
  })
  if (shippingSyncLogs.length > 100) shippingSyncLogs = shippingSyncLogs.slice(0, 100)
  save()
}
