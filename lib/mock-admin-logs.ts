export interface AdminLog {
  id: string
  action: string
  timestamp: string
  admin: string
}

export let mockAdminLogs: AdminLog[] = []

const STORAGE_KEY = 'adminLogs'

export function loadAdminLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) mockAdminLogs = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAdminLogs))
  }
}

export function addAdminLog(action: string, admin: string) {
  mockAdminLogs.unshift({
    id: Date.now().toString(),
    action,
    admin,
    timestamp: new Date().toISOString(),
  })
  save()
}

