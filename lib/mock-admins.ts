export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'read' | 'write' | 'manage'
}

let mockAdmins: AdminUser[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'manage' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'write' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'read' },
]

export function getAdmins() {
  return mockAdmins
}

export function getAdmin(id: string) {
  return mockAdmins.find(a => a.id === id)
}

export function addAdmin(data: Omit<AdminUser, 'id'>) {
  const admin: AdminUser = { id: Date.now().toString(), ...data }
  mockAdmins.push(admin)
  return admin
}

export function updateAdmin(id: string, data: Partial<Omit<AdminUser, 'id'>>) {
  const idx = mockAdmins.findIndex(a => a.id === id)
  if (idx !== -1) {
    mockAdmins[idx] = { ...mockAdmins[idx], ...data }
  }
}

export function deleteAdmin(id: string) {
  mockAdmins = mockAdmins.filter(a => a.id !== id)
}
