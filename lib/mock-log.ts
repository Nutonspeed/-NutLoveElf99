export interface DevLog {
  id: string
  timestamp: string
  action: string
  user: string
}

export let mockLogs: DevLog[] = []

export function addDevLog(action: string, user: string) {
  mockLogs.unshift({
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    action,
    user,
  })
}
