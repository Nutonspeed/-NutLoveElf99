export const TAG_HISTORY_KEY = 'fabricTagHistory'

export function suggestTags(name: string, color: string) {
  const base = `${name} ${color}`.trim().toLowerCase()
  if (!base) return []
  return Array.from(new Set(base.split(/\s+/)))
}

export function loadTagHistory(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(TAG_HISTORY_KEY)
  return stored ? JSON.parse(stored) as string[] : []
}

export function saveTagHistory(tags: string[]) {
  if (typeof window === 'undefined') return
  const history = loadTagHistory()
  const combined = Array.from(new Set([...tags, ...history]))
  localStorage.setItem(TAG_HISTORY_KEY, JSON.stringify(combined.slice(0, 10)))
}
