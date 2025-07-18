export interface StoreBannerSettings {
  desktop: string
  mobile: string
}

const STORAGE_KEY = 'storeBannerSettings'

export let storeBannerSettings: StoreBannerSettings = {
  desktop: '/placeholder.svg',
  mobile: '/placeholder.svg',
}

export function loadStoreBannerSettings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) storeBannerSettings = JSON.parse(stored)
  }
}

export function setStoreBannerSettings(val: StoreBannerSettings) {
  storeBannerSettings = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
