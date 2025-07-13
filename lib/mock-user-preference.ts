export type FabricPreference = Record<string, number>

const STORAGE_KEY = 'fabric-preference'

export function recordFabricClick(slug: string) {
  if (typeof window === 'undefined') return
  const raw = localStorage.getItem(STORAGE_KEY)
  const data: FabricPreference = raw ? JSON.parse(raw) : {}
  data[slug] = (data[slug] || 0) + 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getFabricPreference(): FabricPreference {
  if (typeof window === 'undefined') return {}
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}
