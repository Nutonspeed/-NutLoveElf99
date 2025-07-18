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

export const logEvent = (event: string, detail?: any) => {
  console.log(`[LOG] ${event}`, detail)
  const entry: LogEntry = {
    id: Date.now().toString(),
    action: event,
    payload: detail,
    timestamp: new Date().toISOString(),
  }
  logs.push(entry)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  }
  // in real: POST /api/logs
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

export function exportLogsCsv(entries: LogEntry[], filename: string) {
  const header = ['id', 'timestamp', 'action', 'payload'].join(',')
  const rows = entries.map(e => {
    const payload = e.payload ? JSON.stringify(e.payload).replace(/"/g, '""') : ''
    return [e.id, e.timestamp, e.action, `"${payload}"`].join(',')
  })
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

