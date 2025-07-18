export interface ActionEntry {
  action: string
  timestamp: number
}

const KEY = 'assistant-last-actions'

export function rememberAction(action: string) {
  if (typeof window === 'undefined') return
  try {
    const existing: ActionEntry[] = JSON.parse(localStorage.getItem(KEY) || '[]')
    existing.push({ action, timestamp: Date.now() })
    localStorage.setItem(KEY, JSON.stringify(existing.slice(-20)))
  } catch {}
}

export function getLastActions(): ActionEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as ActionEntry[]
  } catch {
    return []
  }
}
