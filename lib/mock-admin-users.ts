export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  permissions: {
    read: boolean
    write: boolean
    manage: boolean
  }
}

const STORAGE_KEY = 'adminUsers'

export let adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'root@sofacover.com',
    role: 'owner',
    permissions: { read: true, write: true, manage: true },
  },
]

export function loadAdminUsers() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) adminUsers = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUsers))
  }
}

export function addAdmin(data: Omit<AdminUser, 'id'>): AdminUser {
  const user: AdminUser = { id: Date.now().toString(), ...data }
  adminUsers.push(user)
  save()
  return user
}

export function getAdminById(id: string) {
  return adminUsers.find((a) => a.id === id)
}

export function updateAdmin(id: string, data: Partial<Omit<AdminUser, 'id'>>) {
  const admin = adminUsers.find((a) => a.id === id)
  if (!admin) return
  Object.assign(admin, data)
  save()
  return admin
}

export function removeAdmin(id: string) {
  const idx = adminUsers.findIndex((a) => a.id === id)
  if (idx !== -1) {
    adminUsers.splice(idx, 1)
    save()
  }
}
