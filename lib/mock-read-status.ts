export interface NotificationStatus {
  read: boolean
  pinned: boolean
}

let status: Record<string, NotificationStatus> = {}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminNotificationStatus', JSON.stringify(status))
  }
}

export function loadNotificationStatus() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminNotificationStatus')
    if (stored) status = JSON.parse(stored)
  }
}

export function getStatus(id: string): NotificationStatus {
  return status[id] || { read: false, pinned: false }
}

export function markRead(id: string) {
  status[id] = { ...getStatus(id), read: true }
  save()
}

export function togglePin(id: string) {
  const cur = getStatus(id)
  status[id] = { ...cur, pinned: !cur.pinned }
  save()
}

export function markAllRead(ids: string[]) {
  ids.forEach((id) => {
    status[id] = { ...getStatus(id), read: true }
  })
  save()
}

export function unreadCount(ids: string[]): number {
  return ids.filter((id) => !getStatus(id).read).length
}
