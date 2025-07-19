export interface ImportLogEntry {
  id: string
  file: string
  time: string
  count: number
}

const KEY = 'importExportLog'
export let importExportLog: ImportLogEntry[] = []

export function loadImportExportLog() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(KEY)
    if (stored) importExportLog = JSON.parse(stored)
  }
}

export function addImportExportLog(file: string, count: number) {
  const entry: ImportLogEntry = {
    id: Date.now().toString(),
    file,
    time: new Date().toISOString(),
    count,
  }
  importExportLog.unshift(entry)
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(importExportLog))
  }
}
