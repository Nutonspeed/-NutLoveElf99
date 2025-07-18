export interface AccessLog {
  id: string
  ip: string
  device: string
  time: string
}

const STORAGE_KEY = 'accessLogs'
export let accessLogs: AccessLog[] = []

export function loadAccessLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) accessLogs = JSON.parse(stored)
  }
}

export function addAccessLog(ip: string, device: string) {
  const log: AccessLog = { id: Date.now().toString(), ip, device, time: new Date().toISOString() }
  accessLogs.unshift(log)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accessLogs))
  }
}
