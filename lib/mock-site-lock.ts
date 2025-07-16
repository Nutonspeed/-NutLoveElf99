export interface SiteLock {
  enabled: boolean
  code: string
}

export let siteLock: SiteLock = { enabled: false, code: '' }

export function loadSiteLock() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('siteLock')
    if (stored) siteLock = JSON.parse(stored)
  }
}

export function setSiteLock(lock: SiteLock) {
  siteLock = lock
  if (typeof window !== 'undefined') {
    localStorage.setItem('siteLock', JSON.stringify(lock))
  }
}

export function clearSiteUnlock() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('siteUnlocked')
  }
}
