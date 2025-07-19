export interface Invite {
  token: string
  expires: string
}

const STORAGE_KEY = 'adminInvites'

export let invites: Invite[] = []

export function loadInvites() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) invites = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invites))
  }
}

export function createInvite(days: number) {
  const token = Math.random().toString(36).slice(2)
  const invite: Invite = { token, expires: new Date(Date.now() + days * 864e5).toISOString() }
  invites.push(invite)
  save()
  return invite
}

export function removeInvite(token: string) {
  const idx = invites.findIndex(i => i.token === token)
  if (idx !== -1) {
    invites.splice(idx, 1)
    save()
  }
}
