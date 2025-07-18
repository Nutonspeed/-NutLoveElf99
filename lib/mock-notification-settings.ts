export type NotificationCategory = 'order' | 'claim' | 'chat'

export interface CustomerAlertSettings {
  vip: boolean
  blacklist: boolean
  notify: boolean
}

let customerFlags: Record<string, CustomerAlertSettings> = {}

let settings: Record<NotificationCategory, boolean> = {
  order: true,
  claim: false,
  chat: true,
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminNotificationSettings', JSON.stringify(settings))
    localStorage.setItem('customerAlertSettings', JSON.stringify(customerFlags))
  }
}

export function loadNotificationSettings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminNotificationSettings')
    if (stored) settings = JSON.parse(stored)
    const flags = localStorage.getItem('customerAlertSettings')
    if (flags) customerFlags = JSON.parse(flags)
  }
}

export function getNotificationSettings() {
  return settings
}

export function setNotificationSetting(type: NotificationCategory, value: boolean) {
  settings = { ...settings, [type]: value }
  save()
}

export function getCustomerAlertSettings(id: string): CustomerAlertSettings | undefined {
  return customerFlags[id]
}

export function setCustomerAlertFlag(
  id: string,
  flag: keyof CustomerAlertSettings,
  value: boolean,
) {
  const current = customerFlags[id] || { vip: false, blacklist: false, notify: false }
  customerFlags[id] = { ...current, [flag]: value }
  save()
}
