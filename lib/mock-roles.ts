export type Role =
  | 'owner'
  | 'manager'
  | 'superadmin'
  | 'admin'
  | 'staff'
  | 'limited'
  | 'customer'

const roleAccess: Record<Role, string[]> = {
  owner: [
    'dev',
    'logs',
    'inventory',
    'inventorySettings',
    'claims',
    'media',
    'dashboard',
    'chat',
    'analytics',
    'broadcast',
    'collections',
    'reviews',
    'supply',
    'unpaid',
    'faq',
    'feedback',
    'campaigns',
    'fastBills',
    'users',
  ],
  manager: [
    'dev',
    'logs',
    'inventory',
    'inventorySettings',
    'claims',
    'media',
    'dashboard',
    'chat',
    'analytics',
    'broadcast',
    'collections',
    'reviews',
    'supply',
    'unpaid',
    'faq',
    'feedback',
    'campaigns',
    'fastBills',
    'users',
  ],
  superadmin: [
    'dev',
    'logs',
    'inventory',
    'inventorySettings',
    'claims',
    'media',
    'dashboard',
    'chat',
    'analytics',
    'broadcast',
    'collections',
    'reviews',
    'supply',
    'unpaid',
    'faq',
    'feedback',
    'campaigns',
    'fastBills',
    'users',
  ],
  admin: [
    'dev',
    'logs',
    'inventory',
    'inventorySettings',
    'claims',
    'media',
    'dashboard',
    'chat',
    'analytics',
    'broadcast',
    'collections',
    'reviews',
    'supply',
    'unpaid',
    'faq',
    'feedback',
    'campaigns',
    'fastBills',
    'users',
  ],
  staff: [
    'inventory',
    'claims',
    'media',
    'dashboard',
    'chat',
    'analytics',
    'broadcast',
    'collections',
    'reviews',
    'supply',
    'unpaid',
    'faq',
    'feedback',
    'campaigns',
    'fastBills',
    'users',
  ],
  limited: ['dashboard', 'chat'],
  customer: [],
}

export function canAccess(role: Role | undefined, feature: string): boolean {
  if (!role) return false
  return roleAccess[role].includes(feature)
}

import rolePermData from '@/mock/store/roles.json'
import { loadFromStorage, saveToStorage } from '@/core/mock/store/persist'

export type ActionPermission = 'delete' | 'export'

const PERM_KEY = 'role_permissions'
let rolePerms: Record<string, string[]> = loadFromStorage<Record<string,string[]>>(PERM_KEY, rolePermData as any)

function persistPerms() { saveToStorage(PERM_KEY, rolePerms) }

export function getRolePerms() { return rolePerms }

export function setRolePerms(role: string, perms: string[]) {
  rolePerms[role] = perms
  persistPerms()
}

export function hasPermission(role: string | undefined, action: string) {
  if (!role) return false
  return (rolePerms[role] || []).includes(action)
}
