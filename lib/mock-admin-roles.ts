export interface AdminRole {
  id: string
  name: string
  permissions: Record<string, 'view' | 'edit'>
}

const STORAGE_KEY = 'adminRoles'

export let roles: AdminRole[] = [
  { id: 'owner', name: 'Owner', permissions: {} },
  { id: 'manager', name: 'Manager', permissions: {} },
  { id: 'staff', name: 'Staff', permissions: {} },
]

export function loadRoles() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) roles = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles))
  }
}

export function addRole(data: Omit<AdminRole, 'id'>) {
  const role: AdminRole = { id: Date.now().toString(), ...data }
  roles.push(role)
  save()
  return role
}

export function updateRole(id: string, data: Partial<Omit<AdminRole, 'id'>>) {
  const role = roles.find(r => r.id === id)
  if (!role) return
  Object.assign(role, data)
  save()
}

export function removeRole(id: string) {
  const idx = roles.findIndex(r => r.id === id)
  if (idx !== -1) {
    roles.splice(idx, 1)
    save()
  }
}
