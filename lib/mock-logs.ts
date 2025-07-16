export interface MockLog {
  id: string
  action: string
  admin: string
  timestamp: string
}

export let mockLogs: MockLog[] = []

export function addMockLog(action: string, admin: string) {
  mockLogs.push({
    id: Date.now().toString(),
    action,
    admin,
    timestamp: new Date().toISOString(),
  })
}
