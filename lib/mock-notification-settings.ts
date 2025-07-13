export type NotificationCategory = 'order' | 'claim' | 'chat'

let settings: Record<NotificationCategory, boolean> = {
  order: true,
  claim: false,
  chat: true,
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminNotificationSettings', JSON.stringify(settings))
  }
}

export function loadNotificationSettings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminNotificationSettings')
    if (stored) settings = JSON.parse(stored)
  }
}

export function getNotificationSettings() {
  return settings
}

export function setNotificationSetting(type: NotificationCategory, value: boolean) {
  settings = { ...settings, [type]: value }
  save()
}
