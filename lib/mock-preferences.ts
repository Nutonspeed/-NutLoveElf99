export interface MockPreferences {
  showIds: boolean
  showEmotion: boolean
}

const STORAGE_KEY = 'mockPreferences'

export let mockPreferences: MockPreferences = { showIds: false, showEmotion: true }

export function loadMockPreferences() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) mockPreferences = JSON.parse(stored)
  }
}

export function setMockPreferences(val: MockPreferences) {
  mockPreferences = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}

export function setShowIds(show: boolean) {
  setMockPreferences({ ...mockPreferences, showIds: show })
}

export function setShowEmotion(show: boolean) {
  setMockPreferences({ ...mockPreferences, showEmotion: show })
}
