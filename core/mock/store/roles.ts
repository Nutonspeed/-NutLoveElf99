import { loadFromStorage, saveToStorage } from './persist'
import data from '@/mock/store/roles.json'

export type RoleName = 'admin' | 'staff' | 'viewer'
export type RolePermissions = Record<RoleName, string[]>

const KEY = 'mockStore_roles'

let roles: RolePermissions = loadFromStorage<RolePermissions>(KEY, data as RolePermissions)

function persist() {
  saveToStorage(KEY, roles)
}

export function getRoles() {
  return roles
}

export function setRolePermissions(role: RoleName, perms: string[]) {
  roles[role] = perms
  persist()
}
