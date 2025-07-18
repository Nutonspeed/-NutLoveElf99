export interface NotificationStatus {
  read: boolean
  pinned: boolean
}

let status: Record<string, NotificationStatus> = {}
let chatLastSeen: Record<string, string> = {}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminNotificationStatus', JSON.stringify(status))
  }
}

function saveLastSeen() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatLastSeen', JSON.stringify(chatLastSeen))
  }
}

export function loadNotificationStatus() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminNotificationStatus')
    if (stored) status = JSON.parse(stored)
  }
}

export function loadChatLastSeen() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatLastSeen')
    if (stored) chatLastSeen = JSON.parse(stored)
  }
}

export function getStatus(id: string): NotificationStatus {
  return status[id] || { read: false, pinned: false }
}

export function markRead(id: string) {
  status[id] = { ...getStatus(id), read: true }
  save()
}

export function setChatLastSeen(id: string, ts: string = new Date().toISOString()) {
  chatLastSeen[id] = ts
  saveLastSeen()
}

export function getChatLastSeen(id: string): string | undefined {
  return chatLastSeen[id]
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
