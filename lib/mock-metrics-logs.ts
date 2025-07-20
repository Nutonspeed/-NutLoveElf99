export interface MetricsLog {
  id: string
  path: string
  origin: string
  timestamp: string
}

const STORAGE_KEY = 'metricsLogs'

export let metricsLogs: MetricsLog[] = []

export function loadMetricsLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) metricsLogs = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metricsLogs))
  }
}

export function addMetricsLog(path: string, origin: string) {
  metricsLogs.unshift({
    id: Date.now().toString(),
    path,
    origin,
    timestamp: new Date().toISOString(),
  })
  save()
}
