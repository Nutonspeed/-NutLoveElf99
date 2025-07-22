export interface PasswordPolicy {
  minLength: boolean
  specialChar: boolean
}

const STORAGE_KEY = 'passwordPolicy'
export let passwordPolicy: PasswordPolicy = { minLength: true, specialChar: false }

export function loadPasswordPolicy() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) passwordPolicy = JSON.parse(stored)
  }
}

export function setPasswordPolicy(val: PasswordPolicy) {
  passwordPolicy = val
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
