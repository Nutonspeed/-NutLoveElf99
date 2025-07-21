export interface NotificationLog {
  timestamp: string
  message: string
}

export const notifications: Record<string, NotificationLog[]> = {}
const KEY = 'mock.notifications'

export function loadNotificationLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(KEY)
    if (stored) {
      const obj = JSON.parse(stored) as Record<string, NotificationLog[]>
      Object.assign(notifications, obj)
    }
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(notifications))
  }
}

export function addNotificationLog(id: string, message: string) {
  if (!notifications[id]) notifications[id] = []
  notifications[id].push({ timestamp: new Date().toISOString(), message })
  save()
}
