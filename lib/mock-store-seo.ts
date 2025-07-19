export interface StoreSEOSettings {
  title: string
  description: string
  keywords: string
}

const STORAGE_KEY = 'storeSEOSettings'

export let storeSEOSettings: StoreSEOSettings = {
  title: '',
  description: '',
  keywords: '',
}

export function loadStoreSEOSettings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) storeSEOSettings = JSON.parse(stored)
  }
}

export function setStoreSEOSettings(val: StoreSEOSettings) {
  storeSEOSettings = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
