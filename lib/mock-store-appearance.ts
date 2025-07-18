export interface StoreAppearanceSettings {
  theme: 'light' | 'dark' | 'auto'
  font: string
  brandColor: string
}

const STORAGE_KEY = 'storeAppearanceSettings'

export let storeAppearanceSettings: StoreAppearanceSettings = {
  theme: 'light',
  font: 'Inter, sans-serif',
  brandColor: '#000000',
}

export function loadStoreAppearanceSettings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) storeAppearanceSettings = JSON.parse(stored)
  }
}

export function setStoreAppearanceSettings(val: StoreAppearanceSettings) {
  storeAppearanceSettings = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
