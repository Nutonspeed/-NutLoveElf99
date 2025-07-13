export type FlagStatus = 'flagged' | 'blacklist'

export let flaggedUsers: Record<string, FlagStatus> = {}

export function loadFlaggedUsers() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('flaggedUsers')
    if (stored) flaggedUsers = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('flaggedUsers', JSON.stringify(flaggedUsers))
  }
}

export function setFlagStatus(id: string, status: FlagStatus) {
  flaggedUsers[id] = status
  save()
}

export function clearFlag(id: string) {
  delete flaggedUsers[id]
  save()
}

export function getFlagStatus(id: string): FlagStatus | undefined {
  return flaggedUsers[id]
}
