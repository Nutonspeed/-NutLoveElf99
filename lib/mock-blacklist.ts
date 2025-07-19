export interface BlacklistEntry {
  customerId: string
  reason: string
}

export let blacklist: BlacklistEntry[] = []

export function loadBlacklist() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('blacklist')
    if (stored) blacklist = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blacklist', JSON.stringify(blacklist))
  }
}

export function addToBlacklist(customerId: string, reason: string) {
  if (!blacklist.some((b) => b.customerId === customerId)) {
    blacklist.push({ customerId, reason })
    save()
  }
}

export function removeFromBlacklist(customerId: string) {
  blacklist = blacklist.filter((b) => b.customerId !== customerId)
  save()
}

export function listBlacklist() {
  return blacklist
}
