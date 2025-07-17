export type Role = 'admin' | 'staff' | 'limited' | 'customer'

const roleAccess: Record<Role, string[]> = {
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
    'alerts',
    'reports',
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
    'alerts',
    'reports',
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
