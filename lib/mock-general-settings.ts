export interface GeneralSettings {
  storeName: string
  logoUrl: string
  language: string
}

const STORAGE_KEY = 'generalSettings'

export let generalSettings: GeneralSettings = {
  storeName: 'SofaCover Pro',
  logoUrl: '/logo.png',
  language: 'th',
}

export function loadGeneralSettings() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) generalSettings = JSON.parse(stored)
  }
}

export function setGeneralSettings(val: GeneralSettings) {
  generalSettings = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
