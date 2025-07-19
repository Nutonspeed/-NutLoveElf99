export interface StoreDomainSetting {
  domain: string
}

const STORAGE_KEY = 'storeDomainSetting'

export let storeDomainSetting: StoreDomainSetting = {
  domain: ''
}

export function loadStoreDomainSetting() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) storeDomainSetting = JSON.parse(stored)
  }
}

export function setStoreDomainSetting(val: StoreDomainSetting) {
  storeDomainSetting = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
