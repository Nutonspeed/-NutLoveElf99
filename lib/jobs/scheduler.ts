import { mockBills } from '../mock-bills'
import { markReminderSent } from '../mock-bills'
import { mockNotificationService } from '../mock-notification-service'
import { addNotification } from '../mock-notifications'

export type Job = () => Promise<void> | void

const jobs: Job[] = []

export function registerJob(job: Job) {
  jobs.push(job)
}

export async function runJobs() {
  for (const job of jobs) {
    await job()
  }
}

export async function remindUnreceivedParcels() {
  const now = Date.now()
  for (const bill of mockBills) {
    const shipped = bill.status === 'shipped' || bill.tags?.includes('kerry-status:shipped')
    const delivered = bill.tags?.includes('kerry-status:delivered')
    if (!shipped || delivered || bill.reminderSent) continue
    const created = new Date(bill.createdAt).getTime()
    if (now - created < 2 * 86400000) continue
    await mockNotificationService.sendNotification({
      type: 'order_updated',
      recipient: { phone: bill.phone },
      data: { billId: bill.id },
      priority: 'normal',
    })
    addNotification({
      id: `remind-${bill.id}-${Date.now()}`,
      type: 'order',
      message: `ติดตามพัสดุสำหรับบิล ${bill.id}`,
      link: `/admin/bill/${bill.id}`,
    })
    markReminderSent(bill.id)
  }
}

registerJob(remindUnreceivedParcels)

// mock interval trigger
if (typeof window !== 'undefined') {
  setInterval(runJobs, 6 * 60 * 60 * 1000)
}
