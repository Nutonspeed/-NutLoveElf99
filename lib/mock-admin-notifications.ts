export interface AdminNotification {
  id: string
  message: string
  read: boolean
}

export let adminNotifications: AdminNotification[] = []

export function loadAdminNotifications() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminNotifications')
    if (stored) adminNotifications = JSON.parse(stored)
  }
}

export function addAdminNotification(message: string) {
  const notif: AdminNotification = { id: Date.now().toString(), message, read: false }
  adminNotifications = [notif, ...adminNotifications]
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications))
  }
}

export function markAdminNotificationRead(id: string) {
  adminNotifications = adminNotifications.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  )
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications))
  }
}
