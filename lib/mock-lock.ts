export let lockPassword = '1234'
const STORAGE_KEY = 'lockPassword'

export function loadLockPassword() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) lockPassword = stored
  }
}

export function setLockPassword(val: string) {
  lockPassword = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, val)
  }
}

export function verifyLockPassword(val: string) {
  return val === lockPassword
}
