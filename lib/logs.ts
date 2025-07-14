export interface LogEntry {
  id: string
  action: string
  payload?: any
  timestamp: string
}

const STORAGE_KEY = 'appLogs'

export let logs: LogEntry[] = []

export function loadLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) logs = JSON.parse(stored)
  }
}

export function logEvent(action: string, payload?: any) {
  const entry: LogEntry = {
    id: Date.now().toString(),
    action,
    payload,
    timestamp: new Date().toISOString(),
  }
  logs.push(entry)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  }
}

export function exportLogsTxt(entries: LogEntry[], filename: string) {
  const text = entries
    .map((e) => `[${e.timestamp}] ${e.action} ${JSON.stringify(e.payload)}`)
    .join('\n')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportLogsJson(entries: LogEntry[], filename: string) {
  const blob = new Blob([JSON.stringify(entries, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
