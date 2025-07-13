export interface AdminLog {
  id: string
  action: string
  timestamp: string
  admin: string
}

export let mockAdminLogs: AdminLog[] = []

export function addAdminLog(action: string, admin: string) {
  mockAdminLogs.push({
    id: Date.now().toString(),
    action,
    admin,
    timestamp: new Date().toISOString(),
  })
}
