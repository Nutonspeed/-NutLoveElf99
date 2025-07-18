export interface DevLog {
  id: string
  message: string
  timestamp: string
}

export let mockLogs: DevLog[] = [
  {
    id: '1',
    message: 'ระบบเริ่มทำงาน',
    timestamp: new Date().toISOString(),
  },
]

export function addMockLog(message: string) {
  mockLogs.push({
    id: Date.now().toString(),
    message,
    timestamp: new Date().toISOString(),
  })
}
