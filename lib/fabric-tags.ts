export function suggestFabricTags(name: string, color: string): string[] {
  const text = `${name} ${color}`.toLowerCase()
  return Array.from(new Set(text.split(/\s+/).filter(Boolean)))
}

export function suggestFabricCategory(name: string): string {
  const words = name.toLowerCase().split(/\s+/).filter(Boolean)
  return words[0] || ''
}

const STORAGE_KEY = 'fabric-recent-tags'

export function getRecentFabricTags(): string[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function addRecentFabricTags(tags: string[]) {
  if (typeof window === 'undefined') return
  const current = getRecentFabricTags()
  const merged = Array.from(new Set([...tags, ...current]))
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged.slice(0, 10)))
}
